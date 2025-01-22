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
import TeachingExp from "./TeachingExp";
import IndExp from "./IndExp.jsx";
const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const isLogin = localStorage.getItem("token");

    if (!isLogin) {
      navigate("/dashboardaAzZdashboard/login");
    }
  }, []);

  return (
    <div className="home-container">



      <Hero />
      <MyProjectsSection />
      {/* <WorkExpHome/> */}
      <TeachingExp/>
      <IndExp/>
      <ResearchHome />
      <AwardsHome />
      <TrainingHome />
    </div>
  );
};

export default Home;
