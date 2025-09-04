import { Head, useForm } from '@inertiajs/react'
import { LoaderCircle, Mail } from 'lucide-react'

import InputError from '@/components/input-error'
import AuthLayout from '@/layouts/auth-layout'

export default function ForgotPassword({ status }) {
  const { data, setData, post, processing, errors } = useForm({ email: '' })

  const submit = (e) => {
    e.preventDefault()
    post(route('password.email'))
  }

  return (
    <AuthLayout
      title="Forgot Password"
      description="Enter your email to receive a password reset link."
    >
      <Head title="Forgot Password" />

      <form onSubmit={submit} className="flex flex-col gap-6">
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
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              placeholder="you@example.com"
              required
              autoFocus
              disabled={processing}
              className="grow text-base"
            />
          </div>
          <InputError message={errors.email} />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={processing}
          className="btn btn-primary w-full h-12 font-semibold mt-1 flex items-center justify-center"
        >
          {processing && <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />}
          Email Password Reset Link
        </button>

        {status && (
          <div className="text-center text-sm font-medium text-success mt-3">
            {status}
          </div>
        )}
      </form>
    </AuthLayout>
  )
}
