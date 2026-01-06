import React from "react";
import Hero from "../components/Hero";
import ProjectsGrid from "../components/ProjectsGrid";
import Skills from "../components/Skills";

const Home = () => {
  return (
    <div className="flex flex-col gap-0 sm:gap-20">
      <Hero />
      <ProjectsGrid />
      <Skills />
    </div>
  );
};

export default Home;
