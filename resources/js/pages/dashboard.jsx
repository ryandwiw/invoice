import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        className: 'text-gray-500 hover:text-blue-500 font-extrabold',
    },
];

export default function Dashboard() {
    const { auth } = usePage().props;
    const user = auth?.user;

    return (
        <AppLayout breadcrumbs={breadcrumbs} >
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Admin view */}
                {user?.role === 'admin' && (
                    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                        <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border flex items-center justify-center">
                            <span className="text-lg font-semibold">📊 Laporan Keuangan</span>
                        </div>
                        <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border flex items-center justify-center">
                            <span className="text-lg font-semibold">👥 Kelola User</span>
                        </div>
                        <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border flex items-center justify-center">
                            <span className="text-lg font-semibold">⚙️ Pengaturan</span>
                        </div>
                    </div>
                )}

                {/* Finance view */}
                {user?.role === 'finance' && (
                    <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                        <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border flex items-center justify-center">
                            <span className="text-lg font-semibold">🧾 Kelola Invoice</span>
                        </div>
                        <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border flex items-center justify-center">
                            <span className="text-lg font-semibold">📂 Arsip Transaksi</span>
                        </div>
                    </div>
                )}

                {/* Fallback kalau role belum ada */}
                {!user?.role && (
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[200px] flex items-center justify-center rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                        <span className="relative z-10 text-neutral-600 dark:text-neutral-300">
                            Belum ada role
                        </span>
                    </div>
                )}
            </div>

        </AppLayout>
    );
}
