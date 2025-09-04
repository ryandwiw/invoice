import InputError from '@/components/input-error';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { useRef } from 'react';

import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, ShieldCheck } from 'lucide-react';

const breadcrumbs = [
  {
    title: 'Pengaturan Kata Sandi',
    href: '/settings/password',
  },
];

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
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Profile settings" />

      <SettingsLayout>
        <Card className="shadow-md border rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <ShieldCheck className="h-5 w-5 text-blue-600" />
              Update Password
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Ensure your account is using a long, random password to stay secure.
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={updatePassword} className="space-y-5">
              {/* Current Password */}
              <div className="grid gap-2">
                <Label htmlFor="current_password">Password Saat Ini</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="current_password"
                    ref={currentPasswordInput}
                    value={data.current_password}
                    onChange={(e) => setData('current_password', e.target.value)}
                    type="password"
                    className="pl-9"
                    autoComplete="current-password"
                    placeholder="Current password"
                  />
                </div>
                <InputError message={errors.current_password} />
              </div>

              {/* New Password */}
              <div className="grid gap-2">
                <Label htmlFor="password">New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    ref={passwordInput}
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    type="password"
                    className="pl-9"
                    autoComplete="new-password"
                    placeholder="New password"
                  />
                </div>
                <InputError message={errors.password} />
              </div>

              {/* Confirm Password */}
              <div className="grid gap-2">
                <Label htmlFor="password_confirmation">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password_confirmation"
                    value={data.password_confirmation}
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                    type="password"
                    className="pl-9"
                    autoComplete="new-password"
                    placeholder="Confirm password"
                  />
                </div>
                <InputError message={errors.password_confirmation} />
              </div>

              {/* Button + Success Message */}
              <div className="flex items-center gap-4">
                <Button disabled={processing} className="rounded-xl">
                  Save Password
                </Button>

                <Transition
                  show={recentlySuccessful}
                  enter="transition ease-in-out"
                  enterFrom="opacity-0"
                  leave="transition ease-in-out"
                  leaveTo="opacity-0"
                >
                  <p className="text-sm text-green-600 font-medium">✓ Saved</p>
                </Transition>
              </div>
            </form>
          </CardContent>
        </Card>
      </SettingsLayout>
    </AppLayout>
  );
}
