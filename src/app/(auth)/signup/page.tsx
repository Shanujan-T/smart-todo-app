"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { addUser, getUsers, setCurrentUser } from "@/utils/localStorage";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const users = getUsers();
    const userExists = users.some(
      (user) => user.email.toLowerCase() === email.toLowerCase(),
    );

    if (userExists) {
      setError("Email already exists. Please login.");
      return;
    }

    const newUser = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: email.trim(),
      password,
      createdAt: new Date().toISOString(),
    };

    addUser(newUser);
    setCurrentUser(newUser);
    router.push("/");
  };

  return (
    <section>
      <h1 className="text-2xl font-semibold">Sign Up</h1>
      <p className="mt-1 text-sm text-slate-600">Create your account to manage tasks.</p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-indigo-400 focus:ring"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-indigo-400 focus:ring"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-indigo-400 focus:ring"
            minLength={6}
            required
          />
        </div>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button
          type="submit"
          className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white transition hover:bg-indigo-700"
        >
          Sign Up
        </button>
      </form>
      <p className="mt-4 text-sm text-slate-600">
        Already have an account?{" "}
        <Link href="/Login" className="font-medium text-indigo-600 hover:underline">
          Login
        </Link>
      </p>
    </section>
  );
}
