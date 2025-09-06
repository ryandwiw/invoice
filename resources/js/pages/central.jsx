import ModernDashboardLayout from "@/layouts/DashboardLayout";
import GlassCard from "@/components/auth/GlassCard";
import Stat from "@/components/auth/Stat";

export default function DashboardPage() {
  return (
    <ModernDashboardLayout>
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
    </ModernDashboardLayout>
  );
}
