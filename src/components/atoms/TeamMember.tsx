import React from "react";
import { useSelector } from "react-redux";
import { createSelectTeamMember } from "../../redux/user/selectors";

const TeamMember = ({ id }: { id: string }) => {
  const { email, admin } = useSelector(createSelectTeamMember(id));
  return (
    <div className="border p-2 rounded shadow">
      <div className="flex items-center justify-between mb-2 h-4">
        <div className="font-semibold">{email}</div>
        {admin && <div className="text-xs uppercase">Admin</div>}
      </div>
    </div>
  );
};

export default TeamMember;
