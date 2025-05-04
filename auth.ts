
import CredentialsProvider from "next-auth/providers/credentials";

import { compare } from "bcryptjs";
import Google from "next-auth/providers/google";
import NextAuth, { CredentialsSignin } from "next-auth";
import { DefaultSession } from "@auth/core/types";

// Extend the default session types
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      role: string;
      firstName?: string;
      lastName?: string;
    } & DefaultSession["user"];
  }
}

// Custom error for authentication failures
class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthenticationError";
  }
}

// Types for better type safety
interface ConvexUser {
  _id: string;
  email: string;
  firstname?: string;
  lastname?: string;
  password?: string;
  role: string;
  image?: string;
}

// Centralized logging utility
const logger = {
  error: (context: string, error: unknown) => {
    console.error(
      `[AUTH ERROR - ${context}]`,
      error instanceof Error
        ? { message: error.message, stack: error.stack }
        : error
    );
  },
  info: (context: string, message: string) => {
    console.log(`[AUTH INFO - ${context}]`, message);
  },
};

// Utility for safe fetch with improved error handling
async function safeFetch(
  url: string,
  options: RequestInit = {},
  context: string = "Fetch"
): Promise<any> {
  try {
    const response = await fetch(url, {
      ...options,
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new AuthenticationError(
        `${context} failed: ${response.status} ${errorBody}`
      );
    }

    return await response.json();
  } catch (error) {
    logger.error(context, error);
    throw error;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    // Google OAuth Provider
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "select_account", // Avoid repeated consent screen
          access_type: "offline",
          scope: "openid profile email", // Explicit scopes
        },
      },
    }),

    // Credentials Provider with Enhanced Security
    CredentialsProvider({
        name: "credentials",
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" },
        },
      async authorize(credentials) {
        // Validate input
        if (!credentials?.email || !credentials?.password) {
          logger.error("Authorize", "Missing email or password");
          throw new CredentialsSignin("Email and password are required");
        }

        try {
          // Fetch user by email
          const user: ConvexUser = await safeFetch(
            `${process.env.CONVEX_SITE_URL}/getUserByEmail?email=${credentials.email}`,
            {},
            "User Lookup"
          );

          // Validate user existence and password
          if (!user) {
            throw new CredentialsSignin("Invalid credentials");
          }

          // Secure password comparison
          const isPasswordValid = await compare(
            credentials.password as string,
            user.password || ""
          );

          if (!isPasswordValid) {
            throw new CredentialsSignin("Invalid credentials");
          }

          // Return user info for session
          return {
            id: user._id,
            email: user.email,
            firstName: user.firstname,
            lastName: user.lastname,
            role: user.role || "user",
          };
        } catch (error) {
          // Log detailed error while returning null to prevent information leakage
          logger.error("Authorize", error);
          return null;
        }
      },
    }),
  ],

  // Custom pages for authentication flow
  pages: {
    signIn: "/login",
    error: "/error",
    signOut: "/logout",
  },

  // Advanced callbacks for token and session management
  callbacks: {
    // Enhance JWT with user information
    async jwt({ token, user }) {
      try {
        // Initial sign-in: attach user data
        if (user) {
          token.sub = user.id;
          token.role = "user";
          token.email = user.email;
          token.firstName = user.name;
          token.lastName = user.name;
        }
        // On subsequent requests: refresh token data
        else if (token.email) {
          const updatedUser = await safeFetch(
            `${process.env.CONVEX_SITE_URL}/getUserByEmail?email=${token.email}`,
            {},
            "Token Refresh"
          );

          // Update token with fresh user info
          if (updatedUser) {
            token.role = updatedUser.role || token.role;
          }
        }

        return token;
      } catch (error) {
        logger.error("JWT Callback", error);
        return token;
      }
    },

    // Populate session with token data
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub as string;
        session.user.role = token.role as string;
        session.user.email = token.email as string;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
      }
      return session;
    },

    // Enhanced sign-in callback with user creation for OAuth
    async signIn({ user, account }) {
      try {
        if (account?.provider === "google") {
          const { email, name: firstname, image } = user;

          if (!email) {
            logger.error("SignIn", "No email provided by Google");
            return false;
          }

          let existingUser;
          try {
            // Wrap the user lookup in a try-catch to handle 404 specifically
            existingUser = await safeFetch(
              `${process.env.CONVEX_SITE_URL}/getUserByEmail?email=${encodeURIComponent(email)}`,
              {},
              "Google User Lookup"
            );
          } catch (lookupError) {
            // If the error is a 404 (user not found), set existingUser to null
            if (
              lookupError instanceof AuthenticationError &&
              lookupError.message.includes("404")
            ) {
              existingUser = null;
              logger.info(
                "SignIn",
                `No existing user found for ${email}, will create new user`
              );
            } else {
              // For other errors, rethrow
              throw lookupError;
            }
          }

          // Create user if not exists
          if (!existingUser) {
            const newUser = await safeFetch(
              `${process.env.CONVEX_SITE_URL}/createUser`,
              {
                method: "POST",
                body: JSON.stringify({
                  email,
                  firstname,
                  role: "user",
                  image,
                }),
              },
              "Create Google User"
            );

            logger.info("SignIn", `Created new user: ${email}`);
          }

          return true;
        }

        // For credentials provider, return true if provider is credentials
        return account?.provider === "credentials";
      } catch (error) {
        logger.error("SignIn Callback", error);
        return false;
      }
    },

    // Redirect handling with logging
    async redirect({ url, baseUrl }) {
      try {
        // Ensure redirect is within the same domain
        if (url.startsWith("/")) return `${baseUrl}${url}`;
        if (new URL(url).origin === baseUrl) return url;
        return baseUrl;
      } catch (error) {
        logger.error("Redirect", error);
        return baseUrl;
      }
    },
  },

  // Session and security configurations
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // Use a strong, environment-based secret
  secret: process.env.NEXTAUTH_SECRET,

  // Optional: Debug mode for development
  debug: process.env.NODE_ENV === "development",
});