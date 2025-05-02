"use client";

import RoleTable from "@/components/roles/Table";
import { useEffect, useState } from "react";
import axiosClient from "@/app/lib/axiosClient";
import Loading from "@/components/Loading";
import errorHandler from "@/app/lib/errorHandler";
import { error } from "console";

interface Role {
  _id: string;
  name: string;
  permissions: string[];
}

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    axiosClient
      .get("/roles")
      .then((response) => setRoles(response.data.roles))
      .catch((error) => {
        const err = errorHandler(error);
        alert(err);
      })
      .finally(() => setLoading(false));
  }, []);

  const deleteRole = async (id: string) => {
    const confirmed = window.confirm("Yakin ingin menghapus role ini?");
    if (!confirmed) return;

    try {
      await axiosClient.delete(`/roles/${id}`);
      setRoles((prev) => prev.filter((role) => role._id !== id));
      alert("Role berhasil dihapus.");
    } catch (error) {
      errorHandlerClient(error);
    }
  };

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-between">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">Roles</h1>

          {/* Link Tambah Module */}
          <div className="mb-4">
            <a
              href="/dashboard/roles/add"
              className="inline-block text-sm bg-black button-sm text-white py-2 px-6 rounded-lg hover:bg-gray-900 transition"
            >
              + Role
            </a>
          </div>
        </div>

        <RoleTable roles={roles} deleteRole={deleteRole} />
      </div>
    );
  }
}
