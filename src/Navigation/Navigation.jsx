import { Routes, Route } from "react-router-dom";
import {
  AboutMe,
  Academic,
  IndustrialExp,
  Research,
  TrainingAndMember,
  AwardsAndHonors,
  Home,
} from "../pages/index";
import LogIn from "../components/LogIn/LogIn";

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/aboutMe" element={<AboutMe />} />
      <Route path="/academicExp" element={<Academic />} />
      <Route path="/research" element={<Research />} />
      <Route path="/awards" element={<AwardsAndHonors />} />
      <Route path="/training" element={<TrainingAndMember />} />
      <Route path="/login" element={<LogIn />} />
    </Routes>
  );
};

export default Navigation;
