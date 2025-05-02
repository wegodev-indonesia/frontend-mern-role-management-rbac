"use client";

import Link from "next/link";
import axiosClient from "@/app/lib/axiosClient";
import { useState } from "react";

interface Role {
  name: string;
}

interface User {
  _id: string;
  fullname: string;
  roles: Role[];
}

interface UserTableProps {
  users: User[];
}

const UserTable = ({ users }: UserTableProps) => {
  if (users.length === 0) {
    return <div>No users available</div>;
  }

  const [loadingId, setLoadingId] = useState<string | null>(null);

  return (
    <table className="min-w-full table-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <thead className="bg-gray-100">
        <tr className="bg-gray-100 text-gray-700">
          <th className="w-10 py-2 px-4 text-left text-sm font-semibold text-gray-600">
            No
          </th>
          <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">
            Full Name
          </th>
          <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">
            Roles
          </th>
          <th className="py-2 px-4 text-right text-sm font-semibold text-gray-600">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={user._id} className="hover:bg-gray-50">
            <td className="py-2 px-4 text-sm text-gray-800">{index + 1}</td>
            <td className="py-2 px-4 text-sm text-gray-800">{user.fullname}</td>
            <td className="py-2 px-4 text-sm text-gray-800">
              {user.roles.map((role) => role.name).join(", ")}
            </td>
            <td className="px-6 py-4 space-x-2">
              <div className="flex justify-end gap-2">
                <Link
                  href={`/dashboard/users/edit/${user._id}`}
                  className="hover:opacity-70"
                >
                  ✏️
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
