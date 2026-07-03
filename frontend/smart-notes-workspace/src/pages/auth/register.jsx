import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ValidateMessage from "../../components/Shared/ValidateMessage";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "../../services/auth";
import { useState } from "react";



export default function Register() {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");

  const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(schema),
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      setSuccessMessage(
        "User created successfully! Redirecting to login page...",
      );  
      new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
        navigate("/login");
      });
    },
    onError: (error) => {
      setSuccessMessage("");
    }
  });

  const handleRegister = (data) => {
    mutate(data);
  };

  return (
    <>
      <div className="text-center mb-8">
        <div className="w-12 h-12 bg-black dark:bg-white text-white dark:text-black rounded-xl flex items-center justify-center mx-auto mb-5 font-bold text-2xl shadow-lg">
          N
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Create an account
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          Start organizing your thoughts today.
        </p>
      </div>
      <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">
            Full Name
          </label>
          <input
            type="text"
            {...register("name")}
            className="w-full px-4 py-2.5 border border-gray-300 dark:border-white/10 rounded-xl bg-gray-50/50 dark:bg-white/5 focus:ring-2 focus:ring-black dark:focus:ring-white transition-shadow"
            placeholder="Jane Doe"
          />
          <ValidateMessage field={errors.name} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            className="w-full px-4 py-2.5 border border-gray-300 dark:border-white/10 rounded-xl bg-gray-50/50 dark:bg-white/5 focus:ring-2 focus:ring-black dark:focus:ring-white transition-shadow"
            placeholder="jane@example.com"
          />
          <ValidateMessage field={errors.email} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">
            Password
          </label>
          <input
            type="password"
            {...register("password")}
            className="w-full px-4 py-2.5 border border-gray-300 dark:border-white/10 rounded-xl bg-gray-50/50 dark:bg-white/5 focus:ring-2 focus:ring-black dark:focus:ring-white transition-shadow"
            placeholder="••••••••"
          />
          <ValidateMessage field={errors.password} />
        </div>
        <button
          disabled={isPending}
          type="submit"
          className="w-full bg-black dark:bg-white text-white dark:text-black font-medium py-2.5 rounded-xl hover:opacity-90 transition-opacity mt-2"
        >
          {isPending ? "Loading..." : "Register"}
        </button>
        {isError &&  (
          <div className="mt-4 flex items-center gap-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl p-3 text-red-600 dark:text-red-400 text-sm animate-fade-in">
            <svg
              className="w-5 h-5 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="font-medium text-start flex-1">
              {error.response?.data?.message ||
                error.message ||
                "An error occurred. Please try again."}
            </span>
          </div>
        )}

        {successMessage &&  (
          <div className="mt-4 flex items-center gap-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-xl p-3 text-emerald-600 dark:text-emerald-400 text-sm animate-fade-in">
            <svg
              className="w-5 h-5 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="font-medium text-start flex-1">
              {successMessage}
            </span>
          </div>
        )}
      </form>
      <p className="text-center text-sm text-gray-500 mt-8">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-black dark:text-white font-medium hover:underline"
        >
          Log in
        </Link>
      </p>
    </>
  );
}
