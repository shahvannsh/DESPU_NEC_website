import Hero from "../components/Hero";
import About from "../components/About";
import Story from "../components/Story";
import ScrollExpand from "../components/reactbits/ScrollExpand";
import eurekaImg from "../assets/events/eureka-2026.webp";
import WhatWereBuilding from "../components/WhatWereBuilding";
import ProblemSolutionImpact from "../components/ProblemSolutionImpact";
import WhyDespu from "../components/WhyDespu";
import Manifesto from "../components/Manifesto";
import Values from "../components/Values";
import Journey from "../components/Journey";
import Team from "../components/Team";
import TeamCapabilities from "../components/TeamCapabilities";
import MemberVoices from "../components/MemberVoices";
import Events from "../components/Events";
import BehindTheBuild from "../components/BehindTheBuild";
import Reels from "../components/Reels";
import LearningLog from "../components/LearningLog";
import Testimonials from "../components/Testimonials";
import Outcomes from "../components/Outcomes";
import Sponsors from "../components/Sponsors";
import Resources from "../components/Resources";
import Vision from "../components/Vision";
import CTA from "../components/CTA";
import Contact from "../components/Contact";
import Connect from "../components/Connect";

export default function Home() {
  return (
    <>
      <Hero />
      <section className="relative bg-base-950 px-6 py-12 lg:px-10">
        <div className="mx-auto h-[70vh] max-w-6xl overflow-hidden rounded-3xl" style={{ height: "70vh" }}>
          <ScrollExpand
            src={eurekaImg}
            alt="DESPU at Eureka 2026"
            title="Built on the ground"
            scrollHint="Scroll inside"
            useWindowScroll={false}
          >
            <h3 className="font-display text-2xl font-semibold text-white sm:text-3xl">
              Every session, every pitch, every late night.
            </h3>
            <p className="mt-3 max-w-md text-sm text-white/70">
              This is DESPU in motion — building toward the National Entrepreneurship Challenge.
            </p>
          </ScrollExpand>
        </div>
      </section>
      <About />
      <Story />
      <WhatWereBuilding />
      <ProblemSolutionImpact />
      <WhyDespu />
      <Manifesto />
      <Values />
      <Journey />
      <Team />
      <TeamCapabilities />
      <MemberVoices />
      <Events />
      <BehindTheBuild />
      <Reels />
      <LearningLog />
      <Testimonials />
      <Outcomes />
      <Sponsors />
      <Resources />
      <Vision />
      <CTA />
      <Contact />
      <Connect />
    </>
  );
}
