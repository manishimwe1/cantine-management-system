"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "convex/react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useSession } from "next-auth/react";
import { api } from "@/convex/_generated/api";
import SignInButton from "@/components/SignInButton";

const formSchema = z.object({
  firstname: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),

  lastname: z.string().min(2, {
    message: "must be at least 2 characters.",
  }),
  email: z.string().email(),
  password: z.string(),
  role: z.string(),
});

export default function SignIn() {
  const { data: session } = useSession();
  if (session) {
    redirect("/");
  }
  // console.log(session);

  const [errorInRegister, setErrorInRegister] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const registerUser = useAction(api.user.registerUser);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      role: "user",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const { success, error } = await registerUser({
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.email,
      password: values.password,
      role: "user",
    });

    if (error !== null) {
      setErrorInRegister(error);
      setLoading(false);
    }
    if (success) {
      form.reset();
      setLoading(false);
      router.push("/");
    }
  }
  return (
    <section className="flex items-center justify-center w-full h-screen">
      <div className="bg-[url('/banner.png')] bg-cover bg-center bg-no-repeat h-full w-full -z-50" />
      <div className="bg-indigo-950/40 h-full w-12 blur-3xl -z-50"/>
      <div className="md:w-[70%] w-full h-screen flex items-center flex-col space-y-4 justify-center bg-gradient-to-r from-transparent  via-indigo-400/40 to-indigo-700/40  px-10 lg:px-20 z-50">
        <div className="flex gap-2 flex-col">
          <h2 className=" text-balance text-xl md:text-3xl font-bold tracking-tighter text-indigo-950">
            Create an account
          </h2>
        </div>
        <Form {...form} >
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full "
          >
            {/* <form
          action={async (formData: FormData) => {
            
          }} */}
            {/* className="space-y-8 py-5 rounded-md " */}
            {/* > */}
            <div className="flex items-center justify-center gap-2 lg:gap-8 text-indigo-950  w-full">
              <div className="flex items-start flex-col justify-center gap-2 w-full">
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>First Name</FormLabel>
                      <FormControl className="w-full">
                        <Input
                          className="text-indigo-950 border-indigo-950 border-2 !w-full"
                          type="text"
                          placeholder="first name.."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-start flex-col justify-center gap-2 w-full">
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Last Name</FormLabel>
                      <FormControl className="w-full">
                        <Input
                          className="text-indigo-95 border-indigo-950 border-2  !w-full"
                          type="text"
                          placeholder="last name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-indigo-950 ">Email</FormLabel>
                  <FormControl>
                    <Input
                      className="text-indigo-950 border-indigo-950 border-2"
                      type="email"
                      placeholder="john@gmail.com"
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
                  <FormLabel className="text-indigo-950 ">Password</FormLabel>
                  <FormControl>
                    <Input className="text-indigo-950 border-indigo-950 border-2" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={loading}
              className="w-full bg-indigo-600 disabled:bg-stone-700 disabled:cursor-wait hover:bg-indigo-700 shadow-lg shadow-black"
              type="submit"
            >
              {loading ? (
                <p className="flex items-center gap-2 justify-center">
                  <Loader2 className="animate-spin h-4 w-4 " /> Sign up &rarr;
                </p>
              ) : (
                <p>Sign up &rarr;</p>
              )}
            </Button>
            {errorInRegister ? (
              <p className="flex items-center gap-1 justify-center text-red-500 font-thin text-sm">
                {errorInRegister} try to{" "}
                <Link
                  href="/login"
                  className="text-red-200 underline cursor-pointer underline-offset-2"
                >
                  Login
                </Link>
              </p>
            ) : (
              <p className="flex items-end gap-1 justify-end text-indigo-950  font-thin text-sm">
                Already have an account{" "}
                <Link href="/login" className="underline ml-2 cursor-pointer">
                  Login
                </Link>
              </p>
            )}
          </form>
        </Form>
        <SignInButton />
      </div>
    </section>
  );
}
