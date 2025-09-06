import ModernDashboardLayout from "@/layouts/DashboardLayout";

export default ({ children, breadcrumbs, ...props }) => (
    <ModernDashboardLayout breadcrumbs={breadcrumbs} {...props}>
        {children}
    </ModernDashboardLayout>
);
