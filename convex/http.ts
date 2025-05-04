import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";

const http = httpRouter();

http.route({
  path: "/getUserByEmail",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    const email = new URL(request.url).searchParams.get("email");

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email parameter is required" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const user = await ctx.runQuery(internal.user.getUser, {
      email,
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new Response(JSON.stringify(user), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }),
});

http.route({
  path: "/createUser",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    // Parse the request body
    const body = await request.json();
    console.log("boody", body);

    // Validate required fields
    if (!body.email) {
      return new Response(
        JSON.stringify({
          error: "Email and password are required",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    try {
      // Check if user already exists
      const existingUser = await ctx.runQuery(internal.user.getUser, {
        email: body.email,
      });

      if (existingUser) {
        return new Response(
          JSON.stringify({
            error: "User already exists",
          }),
          {
            status: 409,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }

      // Create new user
      const newUser = await ctx.runMutation(internal.user.createUser, {
        email: body.email,
        // Add any other fields you need
        firstname: body.firstname,
        lastname: body.lastname,
        role: body.role,
        image: body.image,
      });

      return new Response(
        JSON.stringify({
          message: "User created successfully",
          user: newUser,
        }),
        {
          status: 201,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error: any) {
      return new Response(
        JSON.stringify({
          error: "Failed to create user",
          details: error.message,
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  }),
});

export default http;
