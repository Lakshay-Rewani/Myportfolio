"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Code, FileCode, Settings2, GitBranch } from "lucide-react";

type IaCTool = "terraform" | "ansible" | "docker-compose";

const iacExamples = {
  terraform: {
    title: "Terraform AWS VPC Module",
    code: `# main.tf
provider "aws" {
  region = "us-east-1"
}

module "vpc" {
  source = "terraform-aws-modules/vpc/aws"
  
  name = "devops-vpc"
  cidr = "10.0.0.0/16"
  
  azs             = ["us-east-1a", "us-east-1b", "us-east-1c"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]
  
  enable_nat_gateway = true
  single_nat_gateway = true
  
  tags = {
    Environment = "dev"
    Project     = "devops-portfolio"
  }
}

output "vpc_id" {
  value = module.vpc.vpc_id
}`,
    description: "Provisions a complete AWS VPC with public/private subnets and NAT gateway."
  },
  ansible: {
    title: "Ansible Docker Playbook",
    code: `---
- name: Configure Docker Host
  hosts: docker_servers
  become: true
  tasks:
    - name: Update apt cache
      apt:
        update_cache: yes
    
    - name: Install Docker dependencies
      apt:
        name:
          - apt-transport-https
          - ca-certificates
          - curl
          - software-properties-common
        state: present
    
    - name: Add Docker GPG key
      apt_key:
        url: https://download.docker.com/linux/ubuntu/gpg
        state: present
    
    - name: Add Docker repository
      apt_repository:
        repo: "deb [arch=amd64] https://download.docker.com/linux/ubuntu {{ ansible_distribution_release }} stable"
        state: present
    
    - name: Install Docker
      apt:
        name: docker-ce
        state: present
    
    - name: Start and enable Docker
      service:
        name: docker
        state: started
        enabled: yes`,
    description: "Installs and configures Docker on Ubuntu hosts using Ansible."
  },
  "docker-compose": {
    title: "Docker Compose Stack",
    code: `version: '3.8'
services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/conf:/etc/nginx/conf.d
      - ./logs/nginx:/var/log/nginx
    depends_on:
      - app
    networks:
      - frontend
  
  app:
    build: .
    environment:
      - NODE_ENV=production
      - DB_HOST=postgres
    volumes:
      - ./app:/app
    depends_on:
      - postgres
    networks:
      - frontend
      - backend
  
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: devops_db
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: secret123
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - backend

volumes:
  postgres_data:

networks:
  frontend:
  backend:`,
    description: "Multi-service stack with Nginx, Node.js app, and PostgreSQL."
  }
};

export default function IacShowcase() {
  const [activeTool, setActiveTool] = useState<IaCTool>("terraform");

  return (
    <section id="iac" className="bg-[#0a0a0a] text-white py-32 px-4 md:px-12 relative z-20 border-b border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto flex flex-col gap-20">
        <div className="flex flex-col gap-6">
          <span className="text-xs font-semibold tracking-widest text-indigo-400 uppercase">Infrastructure as Code</span>
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter">IaC Showcase</h2>
          <p className="text-gray-400 text-lg md:text-2xl max-w-2xl font-light">
            Interactive code examples for Terraform, Ansible, and Docker Compose.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Tool Selector */}
          <div className="flex flex-col gap-4 lg:w-72 flex-shrink-0">
            {(Object.keys(iacExamples) as IaCTool[]).map((tool) => (
              <motion.button
                key={tool}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                onClick={() => setActiveTool(tool)}
                className={`p-6 rounded-2xl border text-left transition-all cursor-pointer ${
                  activeTool === tool
                    ? "bg-indigo-500/10 border-indigo-500/30"
                    : "bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-white/10"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  {tool === "terraform" && <GitBranch className="w-5 h-5 text-indigo-400" />}
                  {tool === "ansible" && <Settings2 className="w-5 h-5 text-emerald-400" />}
                  {tool === "docker-compose" && <FileCode className="w-5 h-5 text-cyan-400" />}
                  <h3 className="font-bold text-lg capitalize">{tool.replace("-", " ")}</h3>
                </div>
                <p className="text-xs text-gray-500">
                  {iacExamples[tool].description}
                </p>
              </motion.button>
            ))}
          </div>

          {/* Code Display */}
          <div className="flex-1">
            <motion.div
              key={activeTool}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="glass-card rounded-2xl border border-white/5 overflow-hidden"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4 text-gray-500" />
                  <span className="text-xs font-mono text-gray-400">{activeTool}.{activeTool === "ansible" ? "yml" : "tf"}</span>
                </div>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/30 border border-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/30 border border-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/30 border border-green-500/50" />
                </div>
              </div>
              <div className="p-6 overflow-x-auto">
                <pre className="font-mono text-xs text-gray-300 leading-relaxed">
                  {iacExamples[activeTool].code}
                </pre>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
