import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Code, Database, Zap, Shield, Globe } from 'lucide-react';

const skillCategories = [
  {
    title: 'Cloud Platforms',
    icon: Cloud,
    description: 'I speak all dialects fluently',
    skills: ['AWS', 'GCP', 'Azure', 'Kubernetes', 'Docker'],
    level: 95,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Languages',
    icon: Code,
    description: 'Polyglot by necessity',
    skills: ['Go', 'Java', 'Python', 'TypeScript', 'C++'],
    level: 92,
    color: 'from-green-500 to-emerald-500'
  },
  {
    title: 'Infrastructure',
    icon: Shield,
    description: 'I automate everything',
    skills: ['Terraform', 'Ansible', 'Helm', 'ArgoCD', 'Jenkins'],
    level: 98,
    color: 'from-purple-500 to-pink-500'
  },
  {
    title: 'APIs & Protocols',
    icon: Globe,
    description: 'Built them all at scale',
    skills: ['gRPC', 'GraphQL', 'REST', 'WebSockets', 'Kafka'],
    level: 90,
    color: 'from-orange-500 to-red-500'
  },
  {
    title: 'Databases',
    icon: Database,
    description: 'From COBOL to Cloud SQL',
    skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'BigQuery'],
    level: 88,
    color: 'from-yellow-500 to-orange-500'
  },
  {
    title: 'Orchestration',
    icon: Zap,
    description: 'Since 2017 - before EKS existed',
    skills: ['Kubernetes', 'Istio', 'Prometheus', 'Grafana', 'ELK Stack'],
    level: 96,
    color: 'from-cyan-500 to-blue-500'
  }
];

const proofPoints = [
  'Managed Kubernetes clusters serving millions of requests',
  'Built CI/CD pipelines that saved CDK $1M+',
  'Architected systems processing real-time crypto transactions',
  'Deployed 100+ microservices in production',
  'Maintained 99.99% uptime across global infrastructure'
];

export default function Arsenal() {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl md:text-6xl font-bold mb-6">
          Technologies I've{' '}
          <span className="bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent">
            Conquered
          </span>
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Every technology mastered. Every challenge overcome. 
          This is my arsenal for building the impossible.
        </p>
      </motion.div>

      {/* Skills Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {skillCategories.map((category, index) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-gradient-to-br from-gray-900/80 to-black/60 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-8 h-full hover:border-cyan-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/20">
                {/* Header */}
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${category.color} bg-opacity-20`}>
                    <Icon className={`w-6 h-6 text-transparent bg-gradient-to-r ${category.color} bg-clip-text`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-sm text-gray-400">{category.description}</p>
                  </div>
                </div>

                {/* Skill Level Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Mastery Level</span>
                    <span className="text-sm font-bold text-white">{category.level}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${category.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: index * 0.1 }}
                      className={`h-full bg-gradient-to-r ${category.color} rounded-full relative`}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse" />
                    </motion.div>
                  </div>
                </div>

                {/* Skills List */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${category.color} bg-opacity-20 text-white border border-current border-opacity-30`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Proof Points */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-gray-900/80 to-black/60 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8"
      >
        <h3 className="text-3xl font-bold text-center mb-8 text-purple-400">
          Proof of Mastery
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {proofPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex-shrink-0" />
              <span className="text-gray-300">{point}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}