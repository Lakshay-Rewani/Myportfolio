"use client";

import { Github, ExternalLink } from "lucide-react";
import PipelineVisualizer from "./PipelineVisualizer";

const projects = [
  {
    title: "Automated Multi-Server CI/CD Pipeline",
    category: "DevOps & CI/CD",
    description: "Architected a multi-server CI/CD pipeline on AWS EC2. Integrated GitHub Webhooks to auto-trigger Jenkins builds, deploying containerized WordPress and MySQL via Docker Compose on dedicated Docker Agent EC2 instances with zero manual effort.",
    tags: ["AWS EC2", "Jenkins", "Docker", "Docker Compose", "GitHub Webhooks", "Shell Scripting"],
    github: null,
    demo: null
  },
  {
    title: "Automated Static Website Deployment",
    category: "CI/CD & Cloud",
    description: "Built a CI/CD pipeline on AWS EC2 where GitHub Webhooks trigger Jenkins to auto-deploy static sites to production Nginx web servers using SSH file transfers and Bash scripting, reducing deployment time to under 60 seconds.",
    tags: ["AWS EC2", "Jenkins", "GitHub Webhooks", "Nginx", "SSH", "Bash Scripting"],
    github: "https://github.com/Lakshay-Rewani/jenkins-project",
    demo: null
  },
  {
    title: "Highly Available Static Website",
    category: "Cloud Infrastructure",
    description: "Designed fault-tolerant AWS infrastructure with Auto Scaling Groups, Launch Templates, and Application Load Balancers running Apache. Validated zero-downtime horizontal scaling and automatic replacement of unhealthy nodes.",
    tags: ["AWS EC2", "Auto Scaling", "ALB", "Launch Templates", "CloudWatch", "Apache"],
    github: null,
    demo: null
  },
  {
    title: "BloodMate — Blood Bank Management System",
    category: "Java Full Stack",
    description: "Developed a JavaFX desktop application managing 1,000+ donor records with real-time blood inventory tracking, emergency response coordination, and role-based access controls across 5+ user roles.",
    tags: ["Java", "JavaFX", "FXML", "JDBC", "MySQL", "Maven", "CSS"],
    github: null,
    demo: null
  },
  {
    title: "Hospital Management System",
    category: "Desktop GUI Application",
    description: "Developed a GUI desktop application handling 500+ patient records, billing operations, appointment scheduling, and staff data with full JDBC/MySQL database integration.",
    tags: ["Java (Core)", "JDBC", "MySQL"],
    github: "https://github.com/Lakshay-Rewani/Hospital-Management-System",
    demo: null
  },
  {
    title: "WordPress Deployment on AWS (Ubuntu 22.04)",
    category: "Cloud & SysAdmin",
    description: "Deployed and configured a production-grade WordPress site on AWS EC2. Configured the LAMP stack, hardened SSH access, and applied security group rules to achieve 99.9% uptime over a 30-day monitoring period.",
    tags: ["AWS EC2", "Ubuntu 22.04", "Apache", "MySQL", "PHP (LAMP)", "SSH Hardening"],
    github: null,
    demo: null
  },
  {
    title: "WordPress on Kubernetes (Minikube)",
    category: "DevOps & Kubernetes",
    description: "Advanced evolution from traditional LAMP deployment to container orchestration. Deployed WordPress and MySQL on Kubernetes using Minikube on AWS EC2, with PV/PVC for persistence, Kubernetes Secrets for secure credentials, and Kustomize for manifest management.",
    tags: ["Kubernetes", "Minikube", "Docker", "Kustomize", "Persistent Volumes", "Kubernetes Secrets", "AWS EC2"],
    github: null,
    demo: null
  },
  {
    title: "Django Social Media App on AWS (Production)",
    category: "DevOps & Cloud Deployment",
    description: "Successfully deployed a Django-based Social Media application in production on AWS EC2 Ubuntu using Gunicorn as WSGI server and Nginx as reverse proxy. Implemented systemd for service management, virtual environments, static file configuration, and AWS Security Groups for secure access.",
    tags: ["Python", "Django", "Gunicorn", "Nginx", "SQLite", "AWS EC2", "Ubuntu", "systemd", "venv"],
    github: null,
    demo: null
  },
  {
    title: "Lost & Found — Campus Connect",
    category: "Full Stack Web App",
    description: "A mobile-first web application that helps college students report lost items and post found items so that owners and finders can reconnect easily. Features include authentication, search/filter, image upload, and dark mode.",
    tags: ["React", "Firebase", "Vite", "React Router", "Lucide React"],
    github: "https://github.com/Lakshay-Rewani/Lost-and-Found-Campus",
    demo: null
  },
  {
    title: "Docker CI/CD Pipeline",
    category: "DevOps & CI/CD",
    description: "Automated CI/CD Pipeline for Dockerized Application Deployment Using Jenkins, GitHub, Docker Compose & Docker.",
    tags: ["Docker", "Docker Compose", "Jenkins", "GitHub", "CI/CD"],
    github: "https://github.com/Lakshay-Rewani/Docker-Project",
    demo: null
  },
  {
    title: "Multi-Server Jenkins CI/CD with Docker Agent",
    category: "DevOps & CI/CD",
    description: "End-to-end automated CI/CD pipeline deploying Dockerized WordPress on AWS EC2 using Jenkins, Docker Agent, Docker Compose, and GitHub Webhooks. Every push to GitHub triggers automatic build and deployment with zero manual intervention.",
    tags: ["Jenkins", "Docker", "Docker Compose", "GitHub Webhooks", "AWS EC2", "Ubuntu", "WordPress", "MySQL", "CI/CD"],
    github: null,
    demo: null
  },
  {
    title: "Agency-MS (Textile Agency Management System)",
    category: "Full Stack Web App",
    description: "A complete full-stack web application for managing raw cloth agency businesses. Features include client management, transaction tracking, inventory monitoring, payment processing, reports with Recharts, and role-based access control (Admin/Staff) with JWT authentication.",
    tags: ["React", "Node.js", "Express", "PostgreSQL", "Supabase", "JWT", "Recharts"],
    github: "https://github.com/Lakshay-Rewani/Agency-MS",
    demo: null
  },
  {
    title: "Clinic Website Template",
    category: "Web Design & UI/UX",
    description: "A responsive clinic website template with modern, clean UI design built with HTML, CSS, and JavaScript.",
    tags: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/Lakshay-Rewani/Clinic-website-",
    demo: null
  },
  {
    title: "FinFence - Financial Fraud Detector",
    category: "AI & Machine Learning",
    description: "A cutting-edge web application for real-time UPI transaction fraud detection. Features ML-powered predictions (scikit-learn DecisionTree), live transaction simulation via WebSocket, AI explanations with Hugging Face, advanced analytics dashboard, dark/light mode, and browser notifications.",
    tags: ["Python", "Flask", "Flask-SocketIO", "scikit-learn", "Tailwind CSS", "Chart.js", "Leaflet"],
    github: "https://github.com/Lakshay-Rewani/FinFence",
    demo: null
  },
  {
    title: "Employee Management System",
    category: "Full Stack Web App",
    description: "A comprehensive full-stack employee management system with JWT authentication, role-based access control (Admin/HR/Employee), attendance tracking, department management, performance reviews, and analytics. Built with React + TypeScript, Node.js + Express + TypeScript, and MySQL.",
    tags: ["TypeScript", "React", "Node.js", "Express", "MySQL", "Material-UI", "JWT"],
    github: "https://github.com/Lakshay-Rewani/Employee-Management-system-",
    demo: null
  },
  {
    title: "MyChatBot",
    category: "AI & Chatbot",
    description: "My first AI chat bot built with Next.js, TypeScript, and assistant-ui framework, powered by OpenAI API.",
    tags: ["TypeScript", "Next.js", "OpenAI", "assistant-ui"],
    github: "https://github.com/Lakshay-Rewani/MyChatBot",
    demo: null
  },
  {
    title: "Endless Runner Game (Unity)",
    category: "Game Development",
    description: "An exciting endless runner game developed using Unity game engine with C# scripting.",
    tags: ["C#", "Unity", "ShaderLab"],
    github: "https://github.com/Lakshay-Rewani/Endless-Runner-Game-Unity",
    demo: null
  },
  {
    title: "EduNest - EdTech Platform",
    category: "EdTech & Web App",
    description: "An educational technology platform with multiple projects including EduNest-EdTech, LangLearn AI Dashboard, and Voice Vista, built with JavaScript, TypeScript, and Python.",
    tags: ["JavaScript", "TypeScript", "Python", "EdTech"],
    github: "https://github.com/Lakshay-Rewani/EduNest",
    demo: null
  }
];

export default function Projects() {
  return (
    <section id="projects" className="bg-[#0a0a0a] text-white py-32 px-4 md:px-12 relative z-20 border-b border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto flex flex-col gap-20">
        <div className="flex flex-col gap-6">
          <span className="text-xs font-semibold tracking-widest text-indigo-400 uppercase">Selected Work</span>
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter">My Projects</h2>
          <p className="text-gray-400 text-lg md:text-2xl max-w-2xl font-light">
            A comprehensive showcase of automated CI/CD pipelines, highly available AWS architectures, and Java-based full-stack software.
          </p>
        </div>

        <PipelineVisualizer />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((p, i) => (
            <div
              key={i}
              className="glass-card group relative p-8 md:p-12 rounded-[2rem] flex flex-col justify-between overflow-hidden transition-all duration-700 hover:bg-white/[0.02] min-h-[480px] border border-white/5 hover:border-indigo-500/20"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="text-xs md:text-sm font-semibold tracking-widest text-indigo-300 uppercase">
                    {p.category}
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 text-white group-hover:text-indigo-200 transition-colors">
                  {p.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed font-light text-sm mb-6">
                  {p.description}
                </p>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-1.5 mb-8">
                  {p.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono px-2.5 py-1 bg-white/[0.02] border border-white/5 rounded-full text-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 relative z-10 border-t border-white/5 pt-6 mt-auto">
                {p.github ? (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 text-xs font-semibold rounded-xl border border-indigo-500/20 hover:border-indigo-500/40 transition-all cursor-pointer"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                ) : (
                  <button
                    disabled
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white/[0.01] text-gray-600 text-xs font-semibold rounded-xl border border-white/5 cursor-not-allowed"
                    title="Repository is private"
                  >
                    <Github className="w-4 h-4 opacity-30" />
                    <span>Private Repo</span>
                  </button>
                )}

                {p.demo ? (
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-fuchsia-500/10 hover:bg-fuchsia-500/20 text-fuchsia-300 text-xs font-semibold rounded-xl border border-fuchsia-500/20 hover:border-fuchsia-500/40 transition-all cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                ) : (
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white/[0.02] hover:bg-white/[0.06] text-gray-400 hover:text-white text-xs font-semibold rounded-xl border border-white/5 hover:border-white/10 transition-all cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4 opacity-50" />
                    <span>Request Demo</span>
                  </a>
                )}
              </div>

              {/* Hover Glow effect */}
              <div className="absolute -inset-px bg-gradient-to-br from-indigo-500/10 to-fuchsia-500/10 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700 pointer-events-none rounded-[2rem]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
