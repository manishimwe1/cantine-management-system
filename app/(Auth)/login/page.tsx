"use client";

import SignInButton from "@/components/SignInButton";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { handleSignIn } from "@/lib/actions/signinActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Move schema outside component to prevent recreating on each render
const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export default function LoginPage() {
  const { data: session, status } = useSession();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Redirect if already authenticated
  if (status !== "loading" && session) {
    redirect("/");
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: FormValues) {
    try {
      setLoading(true);
      setError(null);

      const response = await handleSignIn(values.email, values.password);

      if (response.success) {
        // Success case
        form.reset();
        router.push("/");
        return;
      }

      // Error case
      setError(response.error || "Failed to sign in");
      form.reset({ email: values.email, password: "" }); // Keep email, clear password
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex items-center justify-between w-full h-screen">
      <div className="bg-[url('/banner.png')] bg-cover bg-center bg-no-repeat h-full w-full -z-50" />
      <div className="bg-indigo-950/40 h-full w-12 blur-3xl -z-50"/>
      <div className="md:w-[70%] w-full h-screen flex items-center flex-col space-y-4 justify-center bg-gradient-to-r from-transparent  via-indigo-400/40 to-indigo-700/40  px-10 lg:px-20 z-50">
        <div className="flex gap-2 flex-col">
          <h2 className="text-balance text-xl md:text-3xl font-bold tracking-tighter text-indigo-950 ">
            Welcome back
          </h2>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-indigo-950">Email</FormLabel>
                  <FormControl>
                    <Input
                      className="text-indigo-950 border-indigo-950 border-2"
                      type="email"
                      placeholder="john@gmail.com"
                      autoComplete="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-indigo-950">Password</FormLabel>
                  <FormControl>
                    <Input
                      className="text-indigo-950 border-indigo-950 border-2"
                      type="password"
                      autoComplete="current-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <Button
              disabled={loading}
              className="w-full bg-indigo-600 disabled:bg-stone-700 disabled:cursor-wait hover:bg-indigo-700 shadow-lg shadow-black"
              type="submit"
            >
              {loading ? (
                <span className="flex items-center gap-2 justify-center">
                  <Loader2 className="animate-spin h-4 w-4" />
                  Signing in...
                </span>
              ) : (
                "Sign in"
              )}
            </Button>

            <p className="flex items-end gap-1 justify-end text-indigo-950  font-thin text-sm">
              Dont have an account?{" "}
              <Link
                href="/register"
                className="underline ml-2 hover:text-blue-300 transition-colors"
              >
                Register
              </Link>
            </p>
          </form>
        </Form>

        <SignInButton />
      </div>
    </section>
  );
}
