"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosClient from "@/app/lib/axiosClient";
import CheckboxRoles from "@/components/users/CheckboxRoles";

interface UserFormProps {
  initialData?: {
    _id: string;
    fullname: string;
    roles: string[];
  };
}

const UserForm = ({ initialData }: UserFormProps) => {
  const router = useRouter();

  const [fullname, setFullname] = useState(initialData?.fullname || "");
  const [roles, setSelectedRoles] = useState<string[]>(
    initialData?.roles || []
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (initialData) {
        // EDIT user
        await axiosClient.put(`/users/${initialData._id}`, {
          fullname,
          roles,
        });
        alert("User berhasil diperbarui");
      }
      router.push("/dashboard/users");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  //select / deselect module
  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    setSelectedRoles((prevSelected) =>
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
          Full Name
        </label>
        <input
          type="text"
          id="name"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="roles"
          className="block text-sm font-medium text-gray-700"
        >
          Roles
        </label>
        <div className="border border-gray-200 rounded-md p-2">
          <CheckboxRoles
            initialSelectedData={roles}
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

export default UserForm;
