import { Routes, Route } from "react-router-dom";
import {
  AboutMe,
  Academic,
  IndustrialExp,
  Research,
  TrainingAndMember,
  AwardsAndHonors,
  Home
  
} from "../pages/index";

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/aboutMe" element={<AboutMe />} />
      <Route path="/academicExp" element={< Academic />} />
      <Route path="/research" element={<Research />} />
      <Route path="/awards" element={< AwardsAndHonors/>} />
      <Route path="/training" element={< TrainingAndMember />} />
      {/* <Route path="/industrialExp" element={<IndustrialExp />} /> */}
    </Routes>
  );
};

export default Navigation;
