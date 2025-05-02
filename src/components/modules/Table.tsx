// components/ModuleTable.tsx

import { FC } from "react";

interface Module {
  _id: string;
  name: string;
}

interface ModuleTableProps {
  modules: Module[];
  deleteModule: (id: string) => void;
}

const ModuleTable: FC<ModuleTableProps> = ({ modules, deleteModule }) => {
  if (modules.length === 0) {
    return <div>No modules available</div>;
  }

  return (
    <table className="min-w-full table-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <thead className="bg-gray-100">
        <tr>
          <th className="w-10 py-2 px-4 text-left text-sm font-semibold text-gray-600">
            No
          </th>
          <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">
            Name
          </th>
          <th className="py-2 px-4 text-right text-sm font-semibold text-gray-600">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {modules.map((module, index) => (
          <tr key={module._id} className="hover:bg-gray-50">
            <td className="py-2 px-4 text-sm text-gray-800">{index + 1}</td>
            <td className="py-2 px-4 text-sm text-gray-800">{module.name}</td>
            <td className="py-2 px-4 text-right">
              <button
                title="Hapus module"
                onClick={() => deleteModule(module._id)}
                className="bg-red-500 cursor-pointer text-sm text-white py-1 px-3 rounded-lg hover:bg-red-600 transition"
              >
                X
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ModuleTable;
