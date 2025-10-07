"use client";

import { login } from "@/app/actions";

import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [error, setError] = useState("");
  const router = useRouter();

  async function onSubmit(event) {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const response = await login(formData);
      if (!!response.error) {
        setError(response.error);
      } else {
        router.push("/bookings");
      }
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      {error && (
        <div className="text-lg text-red-500 text-center mt-3 mb-[-20px]">
          {error}
        </div>
      )}
      <form className="login-form" onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" id="email" required />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            minLength={4}
          />
        </div>

        <button type="submit" className="btn-primary w-full mt-4">
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
