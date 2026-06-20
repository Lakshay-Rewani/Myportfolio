"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Award, MapPin, Mail, Phone, Globe, BookOpen, Trophy } from "lucide-react";
import K8sDashboard from "./K8sDashboard";

const skillCategories = [
  {
    title: "DevOps & Cloud Infrastructure",
    skills: ["OpenShift", "Kubernetes (Basic)", "AWS EC2", "Auto Scaling Groups", "Application Load Balancer (ALB)", "CloudWatch", "Launch Templates", "SSH"],
    color: "border-indigo-500/30 text-indigo-300 bg-indigo-500/5 hover:bg-indigo-500/10"
  },
  {
    title: "CI/CD, Containers & IaC",
    skills: ["Jenkins", "Docker", "Docker Compose", "Docker Agent", "Ansible (Basic)", "Terraform (Basic)", "GitHub Webhooks", "CI/CD Pipelines", "Shell Scripting", "Bash", "GitHub Actions (Basic)"],
    color: "border-fuchsia-500/30 text-fuchsia-300 bg-fuchsia-500/5 hover:bg-fuchsia-500/10"
  },
  {
    title: "Programming Languages",
    skills: ["Java", "Python", "C++", "C", "SQL", "JavaScript", "HTML", "CSS"],
    color: "border-cyan-500/30 text-cyan-300 bg-cyan-500/5 hover:bg-cyan-500/10"
  },
  {
    title: "Databases, Web Servers & OS",
    skills: ["Linux RHEL 9", "Ubuntu", "MySQL", "PostgreSQL", "MongoDB", "Apache HTTP Server", "Nginx", "LAMP Stack"],
    color: "border-emerald-500/30 text-emerald-300 bg-emerald-500/5 hover:bg-emerald-500/10"
  },
  {
    title: "ML, Frameworks & Developer Tools",
    skills: ["Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Logistic Regression", "Decision Tree", "Random Forest", "JavaFX", "FXML", "JDBC", "Maven", "Git", "GitHub", "VS Code", "IntelliJ IDEA", "Eclipse", "VMware Workstation"],
    color: "border-amber-500/30 text-amber-300 bg-amber-500/5 hover:bg-amber-500/10"
  }
];

const certifications = [
  { name: "Red Hat Certified System Administrator (RHCSA)", issuer: "Red Hat", link: "https://www.credly.com/badges/e93bfbba-3b3e-4e3d-8ec1-9e05ecdd9fec/public_url" },
  { name: "AWS Cloud Practitioner", issuer: "GFG", link: "https://www.linkedin.com/posts/lakshay-rewani-89924233b_aws-cloud-practitioners-certificate-activity-7361821275024965632-VuDf?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFVJXnUB4mX9jTcu6DBMDvxbiRNcJte0D4Q" },
  { name: "MongoDB Basics for Students", issuer: "MongoDB University", link: "https://www.credly.com/badges/33529836-a42b-4aac-8392-a8e302c8446d/public_url" },
  { name: "Salesforce Certified System Administrator", issuer: "GeeksForGeeks", link: "https://www.linkedin.com/posts/lakshay-rewani-89924233b_salesforce-certified-administrator-certificate-activity-7357796295719198720-61Yo?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFVJXnUB4mX9jTcu6DBMDvxbiRNcJte0D4Q" },
  { name: "Problem Solving Through Programming in C", issuer: "NPTEL", link: "https://www.linkedin.com/posts/lakshay-rewani-89924233b_excited-to-share-that-i-have-successfully-activity-7267780804049547265-ousu?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFVJXnUB4mX9jTcu6DBMDvxbiRNcJte0D4Q" },
  { name: "Deloitte Data Analytics Virtual Internship", issuer: "Deloitte", link: "https://www.linkedin.com/posts/lakshay-rewani-89924233b_deloitte-data-analytics-job-simulaton-activity-7348359824717312000-jNUP?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFVJXnUB4mX9jTcu6DBMDvxbiRNcJte0D4Q" },
  { name: "Deloitte Virtual Job Simulation Internship in Cyber Security", issuer: "Forage", link: "https://www.linkedin.com/posts/lakshay-rewani-89924233b_deloitte-cyber-job-simulation-certificate-activity-7346870139365015552-TMLo?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFVJXnUB4mX9jTcu6DBMDvxbiRNcJte0D4Q" }
];

export default function About() {
  return (
    <section id="about" className="bg-[#0a0a0a] text-white py-32 px-4 md:px-12 relative z-20 border-b border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto flex flex-col gap-24">
        
        {/* About Me & Personal Details */}
        <div className="flex flex-col lg:flex-row gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 flex flex-col justify-center"
          >
            <span className="text-xs font-semibold tracking-widest text-indigo-400 uppercase mb-4 block">About Me</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">Lakshay Rewani</h2>
            <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed mb-8">
              I am an aspiring DevOps Engineer and AI & Data Science student with hands-on experience in OpenShift administration, AWS EC2 cloud infrastructure, Docker containerization, and Ansible automation. Proficient in Linux system administration (RHCSA-certified), CI/CD scripting, and Java full-stack development, I am passionate about building reliable, automated, and scalable infrastructure.
            </p>
            
            {/* Quick Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-white/5 pt-8">
              <div className="flex items-center gap-3 text-gray-400 font-light">
                <MapPin className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                <span>Jaipur, Rajasthan, India</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 font-light">
                <Mail className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                <a href="mailto:lakshayrewani7@gmail.com" className="hover:text-white transition-colors">lakshayrewani7@gmail.com</a>
              </div>
              <div className="flex items-center gap-3 text-gray-400 font-light">
                <Phone className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                <span>+91 9571407840</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 font-light">
                <Globe className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                <a href="https://devopswithlakshay.online" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">devopswithlakshay.online</a>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 flex flex-col justify-center glass-card p-8 md:p-12 rounded-[2rem] border border-white/5"
          >
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3 text-indigo-300">
              <BookOpen className="w-6 h-6" /> Personal Profile
            </h3>
            <div className="flex flex-col gap-6 text-gray-300 font-light">
              <div>
                <span className="text-gray-500 font-mono text-xs block mb-1">LANGUAGES</span>
                <span className="text-base font-medium">English, Hindi</span>
              </div>
              <div>
                <span className="text-gray-500 font-mono text-xs block mb-1">HOBBIES</span>
                <span className="text-base font-medium">Gym Workouts, Cricket</span>
              </div>
              <div>
                <span className="text-gray-500 font-mono text-xs block mb-1">STATEMENT OF BELIEF</span>
                <span className="text-sm italic leading-relaxed text-gray-400">
                  &quot;I hereby declare that the information provided is true and correct to the best of my knowledge and belief.&quot;
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Technical Skills Section */}
        <div className="flex flex-col gap-12 border-t border-white/5 pt-20">
          <div>
            <span className="text-xs font-semibold tracking-widest text-indigo-400 uppercase mb-4 block">Expertise</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Technical Skills</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card p-8 rounded-[2rem] border border-white/5 flex flex-col gap-6"
              >
                <h3 className="text-lg font-semibold tracking-tight text-white">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, sIdx) => (
                    <span 
                      key={sIdx} 
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${category.color}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <K8sDashboard />

        {/* Experience, Education & Certs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 border-t border-white/5 pt-20">
          
          {/* Left Column: Education & Experience */}
          <div className="flex flex-col gap-16">
            
            {/* Experience */}
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-4">
                <Briefcase className="w-8 h-8 text-indigo-400" />
                <h3 className="text-2xl font-bold tracking-tight">Work Experience</h3>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="border-l-2 border-indigo-500/20 pl-6 ml-4 relative"
              >
                {/* Timeline Dot */}
                <div className="absolute w-4 h-4 bg-indigo-400 rounded-full -left-[9px] top-1.5 border-4 border-[#0a0a0a]" />
                
                <span className="text-xs font-mono text-gray-500">Jun 2025 – Aug 2025</span>
                <h4 className="text-xl font-semibold mt-1">Game Programming & Salesforce Architect Intern</h4>
                <p className="text-indigo-300 text-sm font-medium">TechForce Academy Australia | Remote</p>
                <a href="https://www.linkedin.com/posts/lakshay-rewani-89924233b_salesforce-game-programming-with-unity-certificate-activity-7444299075392401408-XvWQ?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFVJXnUB4mX9jTcu6DBMDvxbiRNcJte0D4Q" target="_blank" rel="noreferrer" className="text-xs text-indigo-400 hover:text-indigo-300 block mt-0.5 transition-colors">Credential ID: RlpCld • View Certificate</a>
                
                <ul className="list-disc list-outside text-gray-400 text-sm font-light mt-4 ml-4 flex flex-col gap-2">
                  <li>Engineered 3 interactive game modules using Unity 3D and C#, applying OOP design patterns to improve code reusability by 40%.</li>
                  <li>Developed physics-based gameplay systems and mechanics, reducing bug count by 30% through structured debugging cycles.</li>
                  <li>Collaborated in an agile remote team, delivering all milestones on schedule across an 8-week programme.</li>
                </ul>
              </motion.div>
            </div>

            {/* Education */}
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-4">
                <GraduationCap className="w-8 h-8 text-indigo-400" />
                <h3 className="text-2xl font-bold tracking-tight">Education</h3>
              </div>

              <div className="flex flex-col gap-8 border-l-2 border-indigo-500/20 pl-6 ml-4 relative">
                
                {/* B.Tech */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="absolute w-4 h-4 bg-indigo-400 rounded-full -left-[33px] top-1.5 border-4 border-[#0a0a0a]" />
                  <span className="text-xs font-mono text-gray-500">Aug 2023 – May 2027</span>
                  <a href="/btech-result.pdf" target="_blank" rel="noreferrer" className="hover:text-indigo-300 transition-colors">
                    <h4 className="text-lg font-semibold mt-1">B.Tech in Artificial Intelligence & Data Science</h4>
                  </a>
                  <p className="text-indigo-300 text-sm">Arya College of Engineering & IT</p>
                  <p className="text-xs text-gray-500">Affiliated to Rajasthan Technical University | CGPA: 9.11 / 10</p>
                  <a href="/btech-result.pdf" target="_blank" rel="noreferrer" className="text-xs text-indigo-400 hover:text-indigo-300 mt-1 inline-block transition-colors">View Result →</a>
                </motion.div>

                {/* 12th */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="absolute w-4 h-4 bg-indigo-400 rounded-full -left-[33px] top-1.5 border-4 border-[#0a0a0a]" />
                  <span className="text-xs font-mono text-gray-500">Mar 2022 – May 2023</span>
                  <a href="/class12-result.pdf" target="_blank" rel="noreferrer" className="hover:text-indigo-300 transition-colors">
                    <h4 className="text-lg font-semibold mt-1">12th Grade (CBSE) - 86%</h4>
                  </a>
                  <p className="text-indigo-300 text-sm">Govt. Boys Sr. Sec. School No. 2</p>
                  <a href="/class12-result.pdf" target="_blank" rel="noreferrer" className="text-xs text-indigo-400 hover:text-indigo-300 mt-1 inline-block transition-colors">View Result →</a>
                </motion.div>

                {/* 10th */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="absolute w-4 h-4 bg-indigo-400 rounded-full -left-[33px] top-1.5 border-4 border-[#0a0a0a]" />
                  <span className="text-xs font-mono text-gray-500">Mar 2020 – Aug 2021</span>
                  <a href="/class10-result.pdf" target="_blank" rel="noreferrer" className="hover:text-indigo-300 transition-colors">
                    <h4 className="text-lg font-semibold mt-1">10th Grade (RBSE) - 82.22%</h4>
                  </a>
                  <p className="text-indigo-300 text-sm">I.G.M Sr. Sec. School</p>
                  <a href="/class10-result.pdf" target="_blank" rel="noreferrer" className="text-xs text-indigo-400 hover:text-indigo-300 mt-1 inline-block transition-colors">View Result →</a>
                </motion.div>
              </div>
            </div>

          </div>

          {/* Right Column: Certifications & Achievements */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-4">
                <Award className="w-8 h-8 text-indigo-400" />
                <h3 className="text-2xl font-bold tracking-tight">Certifications</h3>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {certifications.map((cert, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className={`glass-card p-6 rounded-2xl border border-white/5 hover:border-indigo-500/20 transition-all flex items-start gap-4 ${cert.link ? 'cursor-pointer' : ''}`}
                  >
                    <div className="w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      {cert.link ? (
                        <a href={cert.link} target="_blank" rel="noreferrer" className="hover:text-indigo-300 transition-colors">
                          <h4 className="text-base font-semibold leading-snug">{cert.name}</h4>
                          <span className="text-xs text-gray-500 font-mono mt-1 block">{cert.issuer}</span>
                          <span className="text-xs text-indigo-400 mt-1 inline-block">View Certificate →</span>
                        </a>
                      ) : (
                        <>
                          <h4 className="text-base font-semibold leading-snug">{cert.name}</h4>
                          <span className="text-xs text-gray-500 font-mono mt-1 block">{cert.issuer}</span>
                        </>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Achievements & Competitions */}
            <div className="flex flex-col gap-8 mt-8 border-t border-white/5 pt-12">
              <div className="flex items-center gap-4">
                <Trophy className="w-8 h-8 text-indigo-400" />
                <h3 className="text-2xl font-bold tracking-tight">Achievements & Hackathons</h3>
              </div>
              
              <div className="flex flex-col gap-8">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="border-l-2 border-indigo-500/20 pl-6 ml-4 relative"
                >
                  {/* Dot */}
                  <div className="absolute w-4 h-4 bg-indigo-400 rounded-full -left-[9px] top-1.5 border-4 border-[#0a0a0a]" />
                  <span className="text-xs font-mono text-gray-500">Apr 2025</span>
                  <h4 className="text-xl font-semibold mt-1">UPI Fraud Detection System</h4>
                  <p className="text-indigo-300 text-sm font-medium">Participant | Hack Arya Verse 2.0 (Jaipur)</p>
                  <a href="https://www.linkedin.com/posts/lakshay-rewani-89924233b_hackathon-hackaryaverse-devops-activity-7474060676349571072-jUk0?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFVJXnUB4mX9jTcu6DBMDvxbiRNcJte0D4Q" target="_blank" rel="noreferrer" className="text-xs text-indigo-400 hover:text-indigo-300 mt-1 inline-block transition-colors">View Certificate →</a>
                  
                  <ul className="list-disc list-outside text-gray-400 text-sm font-light mt-4 ml-4 flex flex-col gap-2">
                    <li>Built a UPI Fraud Detection System on a dataset of 10,000+ transactions using Logistic Regression, Decision Tree, and Random Forest.</li>
                    <li>Achieved 95% model accuracy; reduced false positives by 20% through feature engineering and hyperparameter tuning.</li>
                    <li>Evaluated with precision, recall, and F1-score metrics; presented findings to a panel of industry judges.</li>
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="border-l-2 border-indigo-500/20 pl-6 ml-4 relative"
                >
                  {/* Dot */}
                  <div className="absolute w-4 h-4 bg-indigo-400 rounded-full -left-[9px] top-1.5 border-4 border-[#0a0a0a]" />
                  <span className="text-xs font-mono text-gray-500">Apr 2025</span>
                  <h4 className="text-xl font-semibold mt-1">Textile Management System</h4>
                  <p className="text-indigo-300 text-sm font-medium">Participant | Hack Arya Verse 1.0 (Jaipur)</p>
                  <a href="https://www.linkedin.com/posts/lakshay-rewani-89924233b_hackathon-hackaryaverse-microsoftazure-activity-7327244239325597696-mkUl?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFVJXnUB4mX9jTcu6DBMDvxbiRNcJte0D4Q" target="_blank" rel="noreferrer" className="text-xs text-indigo-400 hover:text-indigo-300 mt-1 inline-block transition-colors">View Certificate →</a>
                  
                  <ul className="list-disc list-outside text-gray-400 text-sm font-light mt-4 ml-4 flex flex-col gap-2">
                    <li>Designed and delivered a full-stack Textile Management System managing 500+ SKUs, orders, and customer records within 24 hours.</li>
                    <li>Boosted operational efficiency by 40% through automated inventory tracking and real-time data visualisation dashboard.</li>
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
