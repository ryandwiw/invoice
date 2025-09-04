import { Head, useForm } from '@inertiajs/react'
import { LoaderCircle, Lock } from 'lucide-react'

import InputError from '@/components/input-error'
import AuthLayout from '@/layouts/auth-layout'

export default function ConfirmPassword() {
  const { data, setData, post, processing, errors, reset } = useForm({
    password: '',
  })

  const submit = (e) => {
    e.preventDefault()
    post(route('password.confirm'), {
      onFinish: () => reset('password'),
    })
  }

  return (
    <AuthLayout
      title="Confirm Password"
      description="Please confirm your password before continuing."
    >
      <Head title="Confirm Password" />

      <form onSubmit={submit} className="flex flex-col gap-6">
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
              autoComplete="current-password"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              disabled={processing}
              placeholder="••••••••"
              className="grow text-base"
            />
          </div>
          <InputError message={errors.password} />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={processing}
          className="btn btn-primary w-full h-12 font-semibold mt-1 flex items-center justify-center"
        >
          {processing && <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />}
          Confirm
        </button>
      </form>
    </AuthLayout>
  )
}
