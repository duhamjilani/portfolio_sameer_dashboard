import React from 'react'
import './Home.css'
import {
    AwardsHome,
    Hero,
    MyProjectsSection,
    ResearchHome,
    TrainingHome,
    WorkExpHome
  } from "../index";
const Home = () => {
  return (
    <div className='home-container'>
      <Hero/>
      <MyProjectsSection/>
      {/* <WorkExpHome/> */}
      <ResearchHome/>
      <AwardsHome/>
      <TrainingHome/>
    </div>
  )
}

export default Home
