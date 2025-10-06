"use server";

import { signIn } from "@/auth";

export async function login(formData) {
  try {
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    return response;
  } catch (error) {
    const errorMessage =
      error.cause?.err?.message || error.message || "Authentication failed";
    if (errorMessage.includes("Email or password mismatch")) {
      return { error: "Email or password mismatch!" };
    }
    if (errorMessage.includes("User not found!")) {
      return { error: "User not found!" };
    }

    return { error: "Authentication failed! Please try again." };
  }
}
