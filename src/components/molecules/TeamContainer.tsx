import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import { selectTeamIds, selectTeamLoading } from "../../redux/user/selectors";
import Team from "./Team";
import { createListTeam } from "../../redux/user/actions";

const TeamContainer = () => {
  const dispatch = useDispatch();
  const teamIds = useSelector(selectTeamIds);
  const teamLoading = useSelector(selectTeamLoading);

  useEffect(() => {
    if (!teamIds && !teamLoading) {
      dispatch(createListTeam());
    }
  });

  if (!teamIds) {
    return <Loading />;
  }

  return <Team ids={teamIds} />;
};

export default TeamContainer;
