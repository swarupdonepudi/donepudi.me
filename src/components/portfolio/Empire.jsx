import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Star, Users, Zap, Code, Globe, Rocket } from 'lucide-react';

const projects = [
  {
    name: 'Planton.ai',
    type: 'Flagship Product',
    description: 'The AWS/Heroku killer I\'m building. One YAML file to rule all clouds. Making deployment so simple, it\'s almost criminal.',
    tech: ['Go', 'Kubernetes', 'gRPC', 'React', 'TypeScript'],
    status: 'Live & Scaling',
    impact: 'Revolutionizing deployment',
    color: 'from-purple-500 to-pink-500',
    icon: Rocket,
    links: {
      demo: 'https://planton.ai',
      docs: 'https://docs.planton.ai'
    }
  },
  {
    name: 'gitr.dev',
    type: 'Open Source',
    description: 'Git supercharged - because vanilla git is for mortals. Advanced git workflows made simple.',
    tech: ['Go', 'CLI', 'Git'],
    status: 'Production Ready',
    impact: '10K+ developers using',
    color: 'from-green-500 to-emerald-500',
    icon: Code,
    links: {
      github: 'https://github.com/project-planton/gitr',
      website: 'https://gitr.dev'
    }
  },
  {
    name: 'karayaml.dev',
    type: 'Developer Tool',
    description: 'YAML tooling that actually makes sense. Because life\'s too short for broken YAML.',
    tech: ['Go', 'YAML', 'CLI'],
    status: 'Active Development',
    impact: 'Developer productivity++',
    color: 'from-blue-500 to-cyan-500',
    icon: Zap,
    links: {
      github: 'https://github.com/project-planton/karayaml',
      website: 'https://karayaml.dev'
    }
  },
  {
    name: 'mactl',
    type: 'Productivity Tool',
    description: 'Mac automation for power users. Control your entire macOS environment programmatically.',
    tech: ['Go', 'macOS', 'Automation'],
    status: 'Beta',
    impact: 'Mac productivity unleashed',
    color: 'from-orange-500 to-red-500',
    icon: Globe,
    links: {
      github: 'https://github.com/swarupdonepudi/mactl'
    }
  }
];

const consulting = {
  name: 'Leftbin Consulting',
  description: 'Where startups come when they need to scale yesterday. 20+ engineers, multiple continents, zero compromises.',
  achievements: [
    'Built crypto exchanges processing millions in transactions',
    'Scaled teams across 3 continents seamlessly',
    'Delivered enterprise-grade solutions in startup timelines',
    'Maintained 99.99% uptime for financial applications'
  ],
  color: 'from-cyan-500 to-purple-500'
};

export default function Empire() {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl md:text-6xl font-bold mb-6">
          What I've Built{' '}
          <span className="bg-gradient-to-r from-purple-400 to-cyan-500 bg-clip-text text-transparent">
            From Scratch
          </span>
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Every line of code with purpose. Every project solving real problems. 
          This is my empire of innovation.
        </p>
      </motion.div>

      {/* Flagship Project */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <div className="bg-gradient-to-br from-gray-900/80 to-black/60 backdrop-blur-sm border-2 border-purple-500/30 rounded-2xl p-8 relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-pink-500/10" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 bg-opacity-20">
                  <Rocket className="w-8 h-8 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white mb-1">Planton.ai</h3>
                  <p className="text-purple-400 font-semibold">The Future of Cloud Deployment</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400">Status</div>
                <div className="text-green-400 font-semibold">Live & Scaling</div>
              </div>
            </div>

            <p className="text-xl text-gray-300 leading-relaxed mb-6">
              "The AWS/Heroku killer I'm building. One YAML file to rule all clouds. 
              Making deployment so simple, it's almost criminal."
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {['Go', 'Kubernetes', 'gRPC', 'React', 'TypeScript'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full text-sm font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-4">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400">
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </Button>
              <Button variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black">
                <Github className="w-4 h-4 mr-2" />
                Documentation
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Open Source Projects */}
      <div className="mb-16">
        <h3 className="text-3xl font-bold text-center mb-8 text-cyan-400">Open Source Dominance</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.slice(1).map((project, index) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-gradient-to-br from-gray-900/80 to-black/60 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 h-full hover:border-cyan-400/50 transition-all duration-500 hover:shadow-xl hover:shadow-cyan-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${project.color} bg-opacity-20`}>
                      <Icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {project.name}
                      </h4>
                      <p className="text-sm text-gray-400">{project.type}</p>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 rounded text-xs font-semibold bg-gray-700 text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-green-400 font-semibold">
                      {project.impact}
                    </div>
                    <div className="flex gap-2">
                      {project.links.github && (
                        <Button variant="ghost" size="icon" className="w-8 h-8">
                          <Github className="w-4 h-4" />
                        </Button>
                      )}
                      {project.links.website && (
                        <Button variant="ghost" size="icon" className="w-8 h-8">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Consulting */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-gray-900/80 to-black/60 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-8"
      >
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-cyan-400 mb-4">{consulting.name}</h3>
          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            {consulting.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {consulting.achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex-shrink-0" />
              <span className="text-gray-300">{achievement}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}