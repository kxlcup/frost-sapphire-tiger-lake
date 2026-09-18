import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { AdminDashboard } from "@/components/admin-dashboard";

export const Route = createFileRoute("/admin")({ component: AdminPage });

function AdminPage() {
  return (
    <div className="min-h-screen">
      <SiteNav />
      <AdminDashboard />
    </div>
  );
}
