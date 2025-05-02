"use client";

import Link from "next/link";

interface Role {
  _id: string;
  name: string;
  permissions: string[];
}

interface RoleTableProps {
  roles: Role[];
  deleteRole: (id: string) => void;
}

const RoleTable = ({ roles, deleteRole }: RoleTableProps) => {
  if (roles.length === 0) {
    return <div>No roles available</div>;
  }

  return (
    <table className="min-w-full table-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <thead className="bg-gray-100">
        <tr className="bg-gray-100 text-gray-700">
          <th className="w-10 py-2 px-4 text-left text-sm font-semibold text-gray-600">
            No
          </th>
          <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">
            Role
          </th>
          <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">
            Permissions
          </th>
          <th className="py-2 px-4 text-right text-sm font-semibold text-gray-600">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {roles.map((role, index) => (
          <tr key={role._id} className="hover:bg-gray-50">
            <td className="py-2 px-4 text-sm text-gray-800">{index + 1}</td>
            <td className="py-2 px-4 text-sm text-gray-800">{role.name}</td>
            <td className="py-2 px-4 text-sm text-gray-800">
              {role.permissions.join(", ")}
            </td>
            <td className="px-6 py-4 space-x-2">
              <div className="flex justify-end gap-2">
                <Link
                  href={`/dashboard/roles/edit/${role._id}`}
                  className="hover:opacity-70"
                >
                  ✏️
                </Link>
                <button
                  onClick={() => deleteRole(role._id)}
                  className="cursor-pointer hover:invert-20"
                >
                  🗑️
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RoleTable;
