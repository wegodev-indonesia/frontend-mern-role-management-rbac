"use client";

import { useEffect, useState } from "react";
import axiosClient from "@/app/lib/axiosClient";
import Loading from "../Loading";

interface Role {
  _id: string;
  name: string;
}

const CheckboxRoles: React.FC<{
  initialSelectedData: string[];
  handleCheckbox: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ initialSelectedData, handleCheckbox }) => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosClient
      .get("/roles")
      .then((response) => {
        setRoles(response.data.roles);
      })
      .catch((error) => {
        console.error("Error fetching modules:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (roles.length === 0) {
    return <Loading />;
  } else {
    return (
      <>
        {roles.map((role: any, index: any) => (
          <div key={index}>
            <input
              type="checkbox"
              value={`${role._id}`}
              id={`${role._id}`}
              className="mr-1"
              checked={initialSelectedData.includes(`${role._id}`)}
              onChange={handleCheckbox}
            />
            <label htmlFor={`${role._id}`}>{role.name}</label>
          </div>
        ))}
      </>
    );
  }
};

export default CheckboxRoles;
