import RoleForm from "@/components/roles/Form";
import axiosServer from "@/app/lib/axiosServer";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function EditRolePage({ params }: PageProps) {
  const { id } = await params;

  const roles = await axiosServer.get(`/roles/${id}`);

  return (
    <div className="max-w-md mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Edit Role</h1>
      <RoleForm initialData={roles.data.role} />
    </div>
  );
}
