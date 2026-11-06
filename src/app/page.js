import portfolioData from "@/data/portfolio.json";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/context/LanguageContext";

export default function Home() {
  const { profile, skills, projects, experiences, education, certifications } = portfolioData;

  return (
    <LanguageProvider>
      <div className="flex flex-col min-h-screen">
        {/* Fixed Navigation Bar with Language Toggle */}
        <Navbar profile={profile} />

        {/* Main Content Sections */}
        <main className="flex-1">
          <Hero profile={profile} />
          <About profile={profile} />
          <Projects initialProjects={projects} />
          <Skills skills={skills} />
          <Experience
            experiences={experiences}
            education={education}
            certifications={certifications}
          />
          <Contact profile={profile} />
        </main>

        {/* Footer */}
        <Footer profile={profile} />
      </div>
    </LanguageProvider>
  );
}
