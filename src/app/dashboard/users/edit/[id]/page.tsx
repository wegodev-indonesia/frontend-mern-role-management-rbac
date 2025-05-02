import UserForm from "@/components/users/Form";
import axiosServer from "@/app/lib/axiosServer";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function EditUserPage({ params }: PageProps) {
  const { id } = await params;

  const res = await axiosServer.get(`/users/${id}`);

  return (
    <div className="max-w-md mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Edit User</h1>
      <UserForm initialData={res.data.user} />
    </div>
  );
}
