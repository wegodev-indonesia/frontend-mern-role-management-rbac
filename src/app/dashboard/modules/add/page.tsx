import ModuleForm from "@/components/modules/Form";

export default function AddModulePage() {
  return (
    <div className="max-w-md mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Tambah Module</h1>
      <ModuleForm />
    </div>
  );
}
