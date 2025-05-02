"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axiosClient from "@/app/lib/axiosClient";

export default function ModuleForm() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Nama module wajib diisi");
      return;
    }

    try {
      setLoading(true);
      await axiosClient.post("/modules", { name });
      alert("Module berhasil ditambahkan");
      router.push("/dashboard/modules");
    } catch (error) {
      console.error("Error adding module:", error);
      alert("Gagal menambahkan module");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Nama Module
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Masukkan nama module"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white cursor-pointer text-sm py-2 px-4 rounded-lg hover:bg-gray-900  transition disabled:opacity-50"
      >
        {loading ? "Menyimpan..." : "Simpan Module"}
      </button>
    </form>
  );
}
