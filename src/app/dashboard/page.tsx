import SessionInfo from "@/components/SessionInfo";

export default function DashboardPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="text-gray-700">Welcome to your dashboard!</p>
      <SessionInfo />
    </>
  );
}
