"use client";

import { useEffect, useState } from "react";
import axiosClient from "@/app/lib/axiosClient";
import Loading from "../Loading";

interface Module {
  _id: string;
  name: string;
  permissionCode: string;
}

const CheckboxPermissions: React.FC<{
  initialSelectedData: string[];
  handleCheckbox: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ initialSelectedData, handleCheckbox }) => {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosClient
      .get("/modules")
      .then((response) => {
        setModules(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching modules:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (modules.length === 0) {
    return <Loading />;
  } else {
    return (
      <>
        {modules.map((mod: any, index: any) => (
          <div key={index}>
            <label className="font-bold">{mod.name}</label>
            <div className="flex gap-4 mb-4">
              <div>
                <input
                  type="checkbox"
                  value={`${mod.permissionCode}:create`}
                  id={`${mod.permissionCode}:create`}
                  className="mr-1"
                  checked={initialSelectedData.includes(
                    `${mod.permissionCode}:create`
                  )}
                  onChange={handleCheckbox}
                />
                <label
                  htmlFor={`${mod.permissionCode}:create`}
                  className="text-sm font-medium text-gray-700"
                >
                  Create
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  value={`${mod.permissionCode}:read`}
                  id={`${mod.permissionCode}:read`}
                  className="mr-1"
                  checked={initialSelectedData.includes(
                    `${mod.permissionCode}:read`
                  )}
                  onChange={handleCheckbox}
                />
                <label
                  htmlFor={`${mod.permissionCode}:read`}
                  className="text-sm font-medium text-gray-700"
                >
                  Read
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  value={`${mod.permissionCode}:update`}
                  id={`${mod.permissionCode}:update`}
                  className="mr-1"
                  checked={initialSelectedData.includes(
                    `${mod.permissionCode}:update`
                  )}
                  onChange={handleCheckbox}
                />
                <label
                  htmlFor={`${mod.permissionCode}:update`}
                  className="text-sm font-medium text-gray-700"
                >
                  Update
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  value={`${mod.permissionCode}:delete`}
                  id={`${mod.permissionCode}:delete`}
                  className="mr-1"
                  checked={initialSelectedData.includes(
                    `${mod.permissionCode}:delete`
                  )}
                  onChange={handleCheckbox}
                />
                <label
                  htmlFor={`${mod.permissionCode}:delete`}
                  className="text-sm font-medium text-gray-700"
                >
                  Delete
                </label>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }
};

export default CheckboxPermissions;
