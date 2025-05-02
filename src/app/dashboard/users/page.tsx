import Table from "@/components/users/Table";
import axiosServer from "@/app/lib/axiosServer";
import errorHandler from "@/app/lib/errorHandler";
import { User } from "@/app/interfaces/user";

interface UsersResponse {
  users: User[];
}

export default async function UsersPage() {
  const fetchUser = async () => {
    const res = await axiosServer
      .get<UsersResponse>("/users")
      .catch(errorHandler);

    if (!res.data) {
      return `${res}`;
    } else {
      return <Table users={res.data.users} />;
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Users</h1>
      {fetchUser()}
    </main>
  );
}
