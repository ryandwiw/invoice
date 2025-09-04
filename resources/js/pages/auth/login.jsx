"use client"

import { Head, Link, useForm } from "@inertiajs/react"
import { LoaderCircle, Mail, Lock } from "lucide-react"
import { motion } from "framer-motion"
import InputError from "@/components/input-error"
import AuthLayout from "@/layouts/auth-layout"

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    })

    const submit = (e) => {
        e.preventDefault()
        post(route("login"), {
            onFinish: () => reset("password"),
        })
    }

    return (
        <AuthLayout
            title="Selamat Datang"
            description="Masukkan email dan password Anda untuk melanjutkan"
        >
            <Head title="Log in" />

            {/* Card form responsif */}
            <motion.form
                onSubmit={submit}
                className="mx-auto w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl flex flex-col gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                {/* Email */}
                <div className="form-control w-full">
                    <label htmlFor="email" className="label mb-1">
                        <span className="label-text font-medium">Email Address</span>
                    </label>
                    <div className="input input-bordered flex items-center gap-2 rounded-md h-12 w-full">
                        <Mail className="w-5 h-5 opacity-60" />
                        <input
                            id="email"
                            type="email"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            placeholder="you@example.com"
                            className="grow text-base"
                        />
                    </div>
                    <InputError message={errors.email} />
                </div>

                {/* Password */}
                <div className="form-control w-full">
                    <div className="flex items-center justify-between mb-1">
                        <label htmlFor="password" className="label p-0">
                            <span className="label-text font-medium">Password</span>
                        </label>
                        {canResetPassword && (
                            <Link
                                href={route("password.request")}
                                className="text-xs sm:text-sm text-primary hover:underline"
                                tabIndex={5}
                            >
                                Forgot your password?
                            </Link>
                        )}
                    </div>
                    <div className="input input-bordered flex items-center gap-2 rounded-md h-12 w-full">
                        <Lock className="w-5 h-5 opacity-60" />
                        <input
                            id="password"
                            type="password"
                            required
                            tabIndex={2}
                            autoComplete="current-password"
                            value={data.password}
                            onChange={(e) => setData("password", e.target.value)}
                            placeholder="••••••••"
                            className="grow text-base"
                        />
                    </div>
                    <InputError message={errors.password} />
                </div>

                {/* Remember me */}
                <div className="form-control mt-1">
                    <label className="cursor-pointer label justify-start gap-2 sm:gap-3 text-xs sm:text-sm">
                        <input
                            type="checkbox"
                            className="checkbox checkbox-primary checkbox-xs sm:checkbox-sm"
                            id="remember"
                            name="remember"
                            checked={data.remember}
                            onChange={() => setData("remember", !data.remember)}
                            tabIndex={3}
                        />
                        <span className="label-text text-xs sm:text-sm">Remember me</span>
                    </label>
                </div>

                {/* Submit */}
                <motion.button
                    type="submit"
                    className="btn btn-primary w-full h-12 font-semibold mt-1"
                    disabled={processing}
                    whileTap={{ scale: 0.97 }}
                >
                    {processing && (
                        <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />
                    )}
                    Log in
                </motion.button>

                {/* Footer */}
                <div className="divider my-3 text-xs sm:text-sm opacity-70">Or</div>
                <div className="text-xs sm:text-sm text-center">
                    Don&apos;t have an account?{" "}
                    <Link
                        href={route("register")}
                        className="text-primary font-medium hover:underline"
                        tabIndex={5}
                    >
                        Sign up
                    </Link>
                </div>
            </motion.form>

            {status && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-3 text-xs sm:text-sm font-medium text-center text-success"
                >
                    {status}
                </motion.div>
            )}
        </AuthLayout>
    )
}
