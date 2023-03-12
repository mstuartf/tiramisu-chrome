import React from "react";
import TeamMember from "../atoms/TeamMember";
import AddTeamMember from "./AddTeamMember";

const Team = ({ ids }: { ids: string[] }) => (
  <div className="grid gap-4">
    <div className="pb-2 border-b uppercase">Team</div>
    <div className="grid gap-2">
      {ids.map((id) => (
        <TeamMember key={id} id={id} />
      ))}
    </div>
    <AddTeamMember />
  </div>
);

export default Team;
