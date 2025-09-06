import { Transition } from "@headlessui/react";
import { Link, useForm, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import SettingsLayout from "@/layouts/settings/layout";
import { useRef } from "react";

export default function Profile({ mustVerifyEmail, status }) {
  const { auth } = usePage().props;

  const {
    data,
    setData,
    patch,
    errors,
    processing,
    recentlySuccessful,
  } = useForm({
    name: auth.user.name,
    email: auth.user.email,
  });

  const submit = (e) => {
    e.preventDefault();
    patch(route("profile.update"), { preserveScroll: true });
  };

  // Delete User
  const passwordInput = useRef(null);
  const {
    data: deleteData,
    setData: setDeleteData,
    delete: destroy,
    processing: deleteProcessing,
    reset,
    errors: deleteErrors,
    clearErrors,
  } = useForm({ password: "" });

  const deleteUser = (e) => {
    e.preventDefault();
    destroy(route("profile.destroy"), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => passwordInput.current?.focus(),
      onFinish: () => reset(),
    });
  };

  const closeModal = () => {
    clearErrors();
    reset();
  };

  return (
    <AppLayout>
      <SettingsLayout>
        <div className="space-y-10">
          {/* Profile Form */}
          <div className="space-y-6">
            <header>
              <h3 className="mb-0.5 text-base font-medium">
                Profile information
              </h3>
              <p className="text-sm text-gray-500">
                Update your name and email address
              </p>
            </header>

            <form onSubmit={submit} className="space-y-6">
              {/* Name */}
              <div className="form-control">
                <label className="label" htmlFor="name">
                  <span className="label-text">Name</span>
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full input input-bordered"
                  value={data.name}
                  onChange={(e) => setData("name", e.target.value)}
                  required
                  autoComplete="name"
                  placeholder="Full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div className="form-control">
                <label className="label" htmlFor="email">
                  <span className="label-text">Email address</span>
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full input input-bordered"
                  value={data.email}
                  onChange={(e) => setData("email", e.target.value)}
                  required
                  autoComplete="username"
                  placeholder="Email address"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Email Verification */}
              {mustVerifyEmail && auth.user.email_verified_at === null && (
                <div>
                  <p className="-mt-4 text-sm text-gray-500">
                    Your email address is unverified.{" "}
                    <Link
                      href={route("verification.send")}
                      method="post"
                      as="button"
                      className="text-blue-600 underline underline-offset-4 hover:text-blue-800"
                    >
                      Click here to resend the verification email.
                    </Link>
                  </p>
                  {status === "verification-link-sent" && (
                    <div className="mt-2 text-sm font-medium text-green-600">
                      A new verification link has been sent to your email
                      address.
                    </div>
                  )}
                </div>
              )}

              {/* Button */}
              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  disabled={processing}
                  className="btn btn-primary"
                >
                  Save
                </button>

                <Transition
                  show={recentlySuccessful}
                  enter="transition ease-in-out"
                  enterFrom="opacity-0"
                  leave="transition ease-in-out"
                  leaveTo="opacity-0"
                >
                  <p className="text-sm text-gray-500">Saved</p>
                </Transition>
              </div>
            </form>
          </div>

          {/* Delete User */}
          <div className="p-4 space-y-4 border border-red-200 rounded-lg bg-red-50">
            <header>
              <h3 className="mb-0.5 text-base font-medium text-red-600">
                Delete account
              </h3>
              <p className="text-sm text-gray-500">
                Delete your account and all of its resources
              </p>
            </header>

            <div className="text-red-600">
              <p className="font-medium">Warning</p>
              <p className="text-sm">
                Please proceed with caution, this cannot be undone.
              </p>
            </div>

            {/* Trigger modal */}
            <button
              className="text-white btn btn-error"
              onClick={() => document.getElementById("delete_modal").showModal()}
            >
              Delete account
            </button>

            {/* Modal */}
            <dialog id="delete_modal" className="modal">
              <div className="modal-box">
                <h3 className="text-lg font-bold">
                  Are you sure you want to delete your account?
                </h3>
                <p className="py-2 text-sm">
                  Once your account is deleted, all of its resources and data
                  will also be permanently deleted. Please enter your password
                  to confirm you would like to permanently delete your account.
                </p>

                <form onSubmit={deleteUser} className="space-y-4">
                  <input
                    id="password"
                    type="password"
                    ref={passwordInput}
                    value={deleteData.password}
                    onChange={(e) => setDeleteData("password", e.target.value)}
                    placeholder="Password"
                    autoComplete="current-password"
                    className="w-full input input-bordered"
                  />
                  {deleteErrors.password && (
                    <p className="text-sm text-red-500">
                      {deleteErrors.password}
                    </p>
                  )}

                  <div className="modal-action">
                    <button
                      type="button"
                      onClick={() => {
                        document.getElementById("delete_modal").close();
                        closeModal();
                      }}
                      className="btn"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={deleteProcessing}
                      className="text-white btn btn-error"
                    >
                      Delete account
                    </button>
                  </div>
                </form>
              </div>
            </dialog>
          </div>
        </div>
      </SettingsLayout>
    </AppLayout>
  );
}
