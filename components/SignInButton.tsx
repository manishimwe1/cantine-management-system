import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { handleSignInWithGoogle } from "@/lib/actions/signinActions";

const SignInButton = () => {
  return (
    <div>
      <form action={handleSignInWithGoogle}>
        <Button variant={"secondary"} type="submit" className="cursor-pointer w-full">
          <Image
            src={"/google.svg"}
            className="size-4"
            alt="google logo"
            width={3}
            height={3}
          />
          Signin with Google
        </Button>
      </form>
    </div>
  );
};

export default SignInButton;
