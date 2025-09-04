"use client"

import { Head, Link, useForm } from "@inertiajs/react"
import { LoaderCircle, User, Mail, Lock, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

import InputError from "@/components/input-error"
import AuthLayout from "@/layouts/auth-layout"

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  })

  const submit = (e) => {
    e.preventDefault()
    post(route("register"), {
      onFinish: () => reset("password", "password_confirmation"),
    })
  }

  return (
    <AuthLayout
      title="Create an account"
      description="Enter your details below to create your account"
    >
      <Head title="Register" />

      <motion.form
        onSubmit={submit}
        className="mx-auto w-full max-w-sm sm:max-w-md md:max-w-lg flex flex-col gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Name */}
        <div className="form-control w-full">
          <label htmlFor="name" className="label mb-1">
            <span className="label-text font-medium">Full name</span>
          </label>
          <div className="input input-bordered flex items-center gap-2 rounded-md h-12 w-full">
            <User className="w-5 h-5 opacity-60" />
            <input
              id="name"
              type="text"
              required
              autoFocus
              tabIndex={1}
              autoComplete="name"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
              placeholder="Your name"
              className="grow text-base"
              disabled={processing}
            />
          </div>
          <InputError message={errors.name} />
        </div>

        {/* Email */}
        <div className="form-control w-full">
          <label htmlFor="email" className="label mb-1">
            <span className="label-text font-medium">Email address</span>
          </label>
          <div className="input input-bordered flex items-center gap-2 rounded-md h-12 w-full">
            <Mail className="w-5 h-5 opacity-60" />
            <input
              id="email"
              type="email"
              required
              tabIndex={2}
              autoComplete="email"
              value={data.email}
              onChange={(e) => setData("email", e.target.value)}
              placeholder="you@example.com"
              className="grow text-base"
              disabled={processing}
            />
          </div>
          <InputError message={errors.email} />
        </div>

        {/* Password */}
        <div className="form-control w-full">
          <label htmlFor="password" className="label mb-1">
            <span className="label-text font-medium">Password</span>
          </label>
          <div className="input input-bordered flex items-center gap-2 rounded-md h-12 w-full">
            <Lock className="w-5 h-5 opacity-60" />
            <input
              id="password"
              type="password"
              required
              tabIndex={3}
              autoComplete="new-password"
              value={data.password}
              onChange={(e) => setData("password", e.target.value)}
              placeholder="••••••••"
              className="grow text-base"
              disabled={processing}
            />
          </div>
          <InputError message={errors.password} />
        </div>

        {/* Confirm Password */}
        <div className="form-control w-full">
          <label htmlFor="password_confirmation" className="label mb-1">
            <span className="label-text font-medium">Confirm password</span>
          </label>
          <div className="input input-bordered flex items-center gap-2 rounded-md h-12 w-full">
            <CheckCircle className="w-5 h-5 opacity-60" />
            <input
              id="password_confirmation"
              type="password"
              required
              tabIndex={4}
              autoComplete="new-password"
              value={data.password_confirmation}
              onChange={(e) =>
                setData("password_confirmation", e.target.value)
              }
              placeholder="••••••••"
              className="grow text-base"
              disabled={processing}
            />
          </div>
          <InputError message={errors.password_confirmation} />
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          className="btn btn-primary w-full h-12 font-semibold mt-1"
          disabled={processing}
          whileTap={{ scale: 0.97 }}
          tabIndex={5}
        >
          {processing && (
            <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />
          )}
          Create account
        </motion.button>

        {/* Footer */}
        <div className="divider my-3 text-xs sm:text-sm opacity-70">Or</div>
        <div className="text-xs sm:text-sm text-center">
          Already have an account?{" "}
          <Link
            href={route("login")}
            className="text-primary font-medium hover:underline"
            tabIndex={6}
          >
            Log in
          </Link>
        </div>
      </motion.form>
    </AuthLayout>
  )
}
