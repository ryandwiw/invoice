import { Head, usePage } from "@inertiajs/react";
import ModernDashboardLayout from "@/layouts/DashboardLayout";
import GlassCard from "@/components/auth/GlassCard";
import Stat from "@/components/auth/Stat";
import { PlaceholderPattern } from "@/components/ui/placeholder-pattern";

export default function DashboardPage() {
  const { auth } = usePage().props;
  const user = auth?.user;

  return (
    <ModernDashboardLayout>
      <Head title="Dashboard" />

      {/* Admin view */}
      {user?.role === "admin" && (
        <div className="grid gap-4 md:gap-6 md:grid-cols-2 xl:grid-cols-3">
          <GlassCard title="Active Users" subtitle="Live in the last 5 min">
            <Stat value="2,431" diff="+3.2%" />
          </GlassCard>
          <GlassCard title="Revenue" subtitle="Today">
            <Stat value="$12,840" diff="+5.4%" />
          </GlassCard>
          <GlassCard title="Errors" subtitle="Today">
            <Stat value="14" diff="-1.1%" negative />
          </GlassCard>
          <GlassCard className="xl:col-span-2" title="Overview" subtitle="This week">
            <div className="h-48 rounded-xl bg-base-300/50" />
          </GlassCard>
          <GlassCard title="Quick Tips" subtitle="Improve your metrics">
            <ul className="text-sm leading-relaxed list-disc list-inside opacity-80">
              <li>Reduce bundle size using code-splitting.</li>
              <li>Enable HTTP caching for static assets.</li>
              <li>Preload critical fonts above the fold.</li>
            </ul>
          </GlassCard>
        </div>
      )}

      {/* Finance view */}
      {user?.role === "finance" && (
        <div className="grid gap-4 md:gap-6 md:grid-cols-2">
          <GlassCard title="Invoices" subtitle="Processed today">
            <Stat value="182" diff="+5.4%" />
          </GlassCard>
          <GlassCard title="Archived Transactions" subtitle="Total saved">
            <Stat value="2,341" diff="+2.1%" />
          </GlassCard>
          <GlassCard className="md:col-span-2" title="Overview" subtitle="This week">
            <div className="h-48 rounded-xl bg-base-300/50" />
          </GlassCard>
        </div>
      )}

      {/* Fallback kalau user belum punya role */}
      {!user?.role && (
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[200px] flex items-center justify-center rounded-xl border">
          <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
          <span className="relative z-10 text-neutral-600 dark:text-neutral-300">
            Belum ada role
          </span>
        </div>
      )}
    </ModernDashboardLayout>
  );
}
