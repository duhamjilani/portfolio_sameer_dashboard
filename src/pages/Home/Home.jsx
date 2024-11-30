import React, { useEffect } from "react";
import "./Home.css";
import {
  AwardsHome,
  Hero,
  MyProjectsSection,
  ResearchHome,
  TrainingHome,
  WorkExpHome,
} from "../index";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const isLogin = localStorage.getItem("token");

    if (!isLogin) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="home-container">
      <Hero />
      <MyProjectsSection />
      {/* <WorkExpHome/> */}
      <ResearchHome />
      <AwardsHome />
      <TrainingHome />
    </div>
  );
};

export default Home;
