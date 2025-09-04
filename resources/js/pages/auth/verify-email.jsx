import { Head, Link, useForm } from '@inertiajs/react'
import { LoaderCircle } from 'lucide-react'

import AuthLayout from '@/layouts/auth-layout'

export default function VerifyEmail({ status }) {
  const { post, processing } = useForm({})

  const submit = (e) => {
    e.preventDefault()
    post(route('verification.send'))
  }

  return (
    <AuthLayout
      title="Verify Email"
      description="Please verify your email address by clicking on the link we just emailed to you."
    >
      <Head title="Email Verification" />

      {status === 'verification-link-sent' && (
        <div className="mb-4 text-center text-sm font-medium text-green-600">
          A new verification link has been sent to the email address you provided during registration.
        </div>
      )}

      <form onSubmit={submit} className="space-y-6 text-center">
        {/* Resend Button */}
        <button
          type="submit"
          disabled={processing}
          className="btn btn-primary w-full h-12 font-semibold flex items-center justify-center"
        >
          {processing && <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />}
          Resend Verification Email
        </button>

        {/* Logout */}
        <Link
          href={route('logout')}
          method="post"
          className="mx-auto block text-sm font-medium text-green-600 hover:text-green-700"
        >
          Log out
        </Link>
      </form>
    </AuthLayout>
  )
}
