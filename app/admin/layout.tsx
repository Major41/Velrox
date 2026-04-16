import { redirect } from "next/navigation";

export const metadata = {
  title: "Admin | Velrox",
  description: "Admin dashboard for Velrox blog",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Simple check - in production, use proper authentication
  const adminKey = process.env.ADMIN_SECRET_KEY;

  if (!adminKey) {
    console.warn("[v0] ADMIN_SECRET_KEY not set in environment variables");
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Velrox Admin</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
