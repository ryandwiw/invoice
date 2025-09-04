import { Head, useForm } from '@inertiajs/react'
import { LoaderCircle, Mail, Lock } from 'lucide-react'

import InputError from '@/components/input-error'
import AuthLayout from '@/layouts/auth-layout'

export default function ResetPassword({ token, email }) {
  const { data, setData, post, processing, errors } = useForm({
    token,
    email,
    password: '',
    password_confirmation: '',
  })

  const submit = (e) => {
    e.preventDefault()
    post(route('password.store'))
  }

  return (
    <AuthLayout
      title="Reset Password"
      description="Set a new password for your account."
    >
      <Head title="Reset Password" />

      <form onSubmit={submit} className="flex flex-col gap-6">
        {/* Email */}
        <div className="form-control w-full">
          <label htmlFor="email" className="label mb-1">
            <span className="label-text font-medium">Email Address</span>
          </label>
          <div className="input input-bordered flex items-center gap-2 rounded-md h-12 w-full bg-gray-100">
            <Mail className="w-5 h-5 opacity-60" />
            <input
              id="email"
              type="email"
              value={data.email}
              readOnly
              className="grow text-base bg-gray-100"
            />
          </div>
          <InputError message={errors.email} />
        </div>

        {/* Password */}
        <div className="form-control w-full">
          <label htmlFor="password" className="label mb-1">
            <span className="label-text font-medium">New Password</span>
          </label>
          <div className="input input-bordered flex items-center gap-2 rounded-md h-12 w-full">
            <Lock className="w-5 h-5 opacity-60" />
            <input
              id="password"
              type="password"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              disabled={processing}
              placeholder="••••••••"
              required
              className="grow text-base"
            />
          </div>
          <InputError message={errors.password} />
        </div>

        {/* Confirm Password */}
        <div className="form-control w-full">
          <label htmlFor="password_confirmation" className="label mb-1">
            <span className="label-text font-medium">Confirm New Password</span>
          </label>
          <div className="input input-bordered flex items-center gap-2 rounded-md h-12 w-full">
            <Lock className="w-5 h-5 opacity-60" />
            <input
              id="password_confirmation"
              type="password"
              value={data.password_confirmation}
              onChange={(e) => setData('password_confirmation', e.target.value)}
              disabled={processing}
              placeholder="••••••••"
              required
              className="grow text-base"
            />
          </div>
          <InputError message={errors.password_confirmation} />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={processing}
          className="btn btn-primary w-full h-12 font-semibold mt-1 flex items-center justify-center"
        >
          {processing && <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />}
          Reset Password
        </button>
      </form>
    </AuthLayout>
  )
}
