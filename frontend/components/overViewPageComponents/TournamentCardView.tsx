import React from "react";
import { FlexLayout } from "../../styles/commonStyles/FlexLayout";
import { Wrapper } from "../../styles/commonStyles/Wrapper";
interface Prop {
  displayTournaments: any;
}

const TournamentCardView = ({ displayTournaments }: Prop) => {
  return (
    <Wrapper margin="3rem 0 0 0">
      <FlexLayout>{displayTournaments}</FlexLayout>
    </Wrapper>
  );
};

export default TournamentCardView;
