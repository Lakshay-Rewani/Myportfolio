import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import CustomCursor from "@/components/CustomCursor";
import DevOpsTerminal from "@/components/DevOpsTerminal";
import IacShowcase from "@/components/IacShowcase";
import CloudArchitectureDiagram from "@/components/CloudArchitectureDiagram";
import GithubActivityWidget from "@/components/GithubActivityWidget";
import DevOpsQuiz from "@/components/DevOpsQuiz";

export default function Home() {
  return (
    <main className="w-full relative selection:bg-indigo-500/30">
      <CustomCursor />
      <Header />
      <ScrollyCanvas>
        <Overlay />
      </ScrollyCanvas>
      <About />
      <Projects />
      <IacShowcase />
      <CloudArchitectureDiagram />
      <GithubActivityWidget />
      <DevOpsQuiz />
      <DevOpsTerminal />
      <Contact />
      <Footer />
    </main>
  );
}
