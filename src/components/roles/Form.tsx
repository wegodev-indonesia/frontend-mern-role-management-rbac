"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axiosClient from "@/app/lib/axiosClient";
import CheckboxPermissions from "@/components/roles/CheckboxPermissions";

interface Module {
  _id: string;
  name: string;
  permissionCode: string;
}

interface RoleFormProps {
  initialData?: {
    _id: string;
    name: string;
    permissions: string[]; // Array of module IDs
  };
}

const RoleForm: React.FC<RoleFormProps> = ({ initialData }) => {
  const router = useRouter();

  const [name, setName] = useState(initialData?.name || "");
  const [permissions, setSelectedPermission] = useState<string[]>(
    initialData?.permissions || []
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (initialData) {
        // EDIT role
        await axiosClient.put(`/roles/${initialData._id}`, {
          name,
          permissions,
        });
        alert("Role berhasil diperbarui");
      } else {
        // CREATE role
        await axiosClient.post("/roles", { name, permissions });
        alert("Role berhasil ditambahkan");
      }
      router.push("/dashboard/roles");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  //select / deselect module
  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    setSelectedPermission((prevSelected) =>
      checked
        ? [...prevSelected, value]
        : prevSelected.filter((item) => item !== value)
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Role Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="modules"
          className="block text-sm font-medium text-gray-700"
        >
          Modules
        </label>
        <div className="border border-gray-200 rounded-md p-2">
          <CheckboxPermissions
            initialSelectedData={permissions}
            handleCheckbox={handleCheckbox}
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white cursor-pointer text-sm py-2 px-4 rounded-lg hover:bg-gray-900  transition disabled:opacity-50"
        >
          {loading ? "Menyimpan..." : "Simpan"}
        </button>
      </div>
    </form>
  );
};

export default RoleForm;
