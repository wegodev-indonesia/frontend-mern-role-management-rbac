import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import "../globals.css";
import { auth } from "@/auth";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <>
      <SessionProviderWrapper session={session}>
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6 bg-gray-50">{children}</main>
        </div>
      </SessionProviderWrapper>
    </>
  );
}
