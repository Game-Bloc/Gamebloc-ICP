import React from "react";
import { Container } from "../styles/commonStyles/Container.styles";
import Header from "../components/headerComponents/Header";
import Hero from "../components/heroSection/Hero";
import GameBloc from "../components/homepageBody/GameBloc";
import TechStack from "../components/homepageBody/TechStack";
import FeatureList from "../components/homepageBody/FeatureList";
import RoadMap from "../components/homepageBody/RoadMap";
import { Footer } from "../components/homepageBody/Footer";
interface Props {
  isSignedIn: any;
  wallet: any;
  gamebloc: any;
}
const HomePage = () => {
  return (
    <Container>
      <Header />
      <Hero />
      <GameBloc />
      <TechStack />
      <FeatureList />
      <RoadMap />
      <Footer />
    </Container>
  );
};

export default HomePage;
