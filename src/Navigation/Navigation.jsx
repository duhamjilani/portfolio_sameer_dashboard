import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
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
        {/* Redirect the root URL ("/") to the login page */}
        <Route path="/" element={<Navigate to="/dashboardaAzZdashboard/login" />} />

        <Route path="/dashboardaAzZdashboard" element={<Home />} />
        <Route path="/dashboardaAzZdashboard/aboutMe" element={<AboutMe />} />
        <Route path="/dashboardaAzZdashboard/academicExp" element={<Academic />} />
        <Route path="/dashboardaAzZdashboard/research" element={<Research />} />
        <Route path="/dashboardaAzZdashboard/awards" element={<AwardsAndHonors />} />
        <Route path="/dashboardaAzZdashboard/training" element={<TrainingAndMember />} />
        <Route path="/dashboardaAzZdashboard/industrialExp" element={<IndustrialExp />} />

        <Route path="/dashboardaAzZdashboard/login" element={<LogIn />} />
      </Routes>
    
  );
};

export default Navigation;
