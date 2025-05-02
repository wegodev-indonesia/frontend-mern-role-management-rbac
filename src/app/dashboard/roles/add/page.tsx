import RoleForm from "@/components/roles/Form";

export default function AddRolePage() {
  return (
    <div className="max-w-md mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Tambah Role</h1>
      <RoleForm />
    </div>
  );
}
