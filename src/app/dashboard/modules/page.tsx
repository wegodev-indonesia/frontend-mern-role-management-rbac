"use client";

import { useEffect, useState } from "react";
import axiosClient from "@/app/lib/axiosClient";
import ModuleTable from "@/components/modules/Table";
import Loading from "@/components/Loading";
import errorHandler from "@/app/lib/errorHandler";
import axios, { AxiosError } from "axios";

interface Module {
  _id: string;
  name: string;
}

export default function ModulesPage() {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosClient
      .get("/modules")
      .then((response) => setModules(response.data.data))
      .catch((error) => console.error("Error fetching modules:", error))
      .finally(() => setLoading(false));
  }, []);

  const deleteModule = async (id: string) => {
    const confirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus module ini?"
    );

    if (!confirmed) return;

    try {
      await axiosClient.delete(`/modules/${id}`);
      setModules((prevModules) =>
        prevModules.filter((module) => module._id !== id)
      );
    } catch (error) {
      const res = errorHandler(error);
      alert(res);
    }
  };

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-between">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">Modules</h1>

          {/* Link Tambah Module */}
          <div className="mb-4">
            <a
              href="/dashboard/modules/add"
              className="inline-block text-sm bg-black button-sm text-white py-2 px-6 rounded-lg hover:bg-gray-900 transition"
            >
              + Module
            </a>
          </div>
        </div>

        <ModuleTable modules={modules} deleteModule={deleteModule} />
      </div>
    );
  }
}
