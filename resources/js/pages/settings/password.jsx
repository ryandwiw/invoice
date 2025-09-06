import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';
import { Lock, ShieldCheck } from 'lucide-react';

export default function Password() {
  const passwordInput = useRef(null);
  const currentPasswordInput = useRef(null);

  const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
  });

  const updatePassword = (e) => {
    e.preventDefault();

    put(route('password.update'), {
      preserveScroll: true,
      onSuccess: () => reset(),
      onError: (errors) => {
        if (errors.password) {
          reset('password', 'password_confirmation');
          passwordInput.current?.focus();
        }

        if (errors.current_password) {
          reset('current_password');
          currentPasswordInput.current?.focus();
        }
      },
    });
  };

  return (
    <AppLayout>
      <SettingsLayout>
        <div>
          <h2 className="flex items-center gap-2 text-lg font-semibold card-title">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            Update Password
          </h2>
          <p className="text-sm text-gray-500">
            Ensure your account is using a long, random password to stay secure.
          </p>

          <form onSubmit={updatePassword} className="mt-4 space-y-5">
            {/* Current Password */}
            <div className="form-control">
              <label className="label" htmlFor="current_password">
                <span className="label-text">Password Saat Ini</span>
              </label>
              <label className="flex items-center gap-2 input input-bordered">
                <Lock className="w-4 h-4 opacity-60" />
                <input
                  id="current_password"
                  ref={currentPasswordInput}
                  value={data.current_password}
                  onChange={(e) => setData('current_password', e.target.value)}
                  type="password"
                  placeholder="Current password"
                  autoComplete="current-password"
                  className="grow"
                />
              </label>
              {errors.current_password && (
                <span className="text-sm text-red-500">{errors.current_password}</span>
              )}
            </div>

            {/* New Password */}
            <div className="form-control">
              <label className="label" htmlFor="password">
                <span className="label-text">New Password</span>
              </label>
              <label className="flex items-center gap-2 input input-bordered">
                <Lock className="w-4 h-4 opacity-60" />
                <input
                  id="password"
                  ref={passwordInput}
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                  type="password"
                  placeholder="New password"
                  autoComplete="new-password"
                  className="grow"
                />
              </label>
              {errors.password && (
                <span className="text-sm text-red-500">{errors.password}</span>
              )}
            </div>

            {/* Confirm Password */}
            <div className="form-control">
              <label className="label" htmlFor="password_confirmation">
                <span className="label-text">Confirm Password</span>
              </label>
              <label className="flex items-center gap-2 input input-bordered">
                <Lock className="w-4 h-4 opacity-60" />
                <input
                  id="password_confirmation"
                  value={data.password_confirmation}
                  onChange={(e) => setData('password_confirmation', e.target.value)}
                  type="password"
                  placeholder="Confirm password"
                  autoComplete="new-password"
                  className="grow"
                />
              </label>
              {errors.password_confirmation && (
                <span className="text-sm text-red-500">{errors.password_confirmation}</span>
              )}
            </div>

            {/* Button + Success Message */}
            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={processing}
                className="btn btn-primary rounded-xl"
              >
                Save Password
              </button>

              <Transition
                show={recentlySuccessful}
                enter="transition ease-in-out"
                enterFrom="opacity-0"
                leave="transition ease-in-out"
                leaveTo="opacity-0"
              >
                <p className="text-sm font-medium text-green-600">✓ Saved</p>
              </Transition>
            </div>
          </form>
        </div>
      </SettingsLayout>
    </AppLayout>
  );
}
