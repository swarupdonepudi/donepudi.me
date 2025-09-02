import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, TrendingUp, Award } from 'lucide-react';

const milestones = [
  {
    year: '2008',
    title: 'The Beginning',
    company: 'Third-Tier College',
    description: 'Started with C and a library management system when others partied',
    salary: null,
    location: 'India',
    color: 'from-red-500 to-orange-500'
  },
  {
    year: '2012',
    title: 'First Big Break',
    company: 'United Healthcare',
    description: 'Cracked into UHG at 3.6 lakhs INR - my first corporate victory',
    salary: '₹3.6L',
    location: 'India',
    color: 'from-orange-500 to-yellow-500'
  },
  {
    year: '2015',
    title: 'Silicon Valley Bound',
    company: 'Student + RTB Platforms',
    description: 'Landed in the US, built RTB platforms while still studying',
    salary: '$45K',
    location: 'San Francisco',
    color: 'from-yellow-500 to-green-500'
  },
  {
    year: '2016',
    title: 'Kubernetes Pioneer',
    company: 'CDK Global',
    description: 'Pioneered CDK\'s cloud platform with Kubernetes (before it was cool)',
    salary: '$98K',
    location: 'Seattle',
    color: 'from-green-500 to-blue-500'
  },
  {
    year: '2019',
    title: 'The Jump',
    company: 'Senior Architect',
    description: 'Jumped from $98K to $350K - because I bet on myself',
    salary: '$350K',
    location: 'Silicon Valley',
    color: 'from-blue-500 to-purple-500'
  },
  {
    year: '2020',
    title: 'Founder Era',
    company: 'Leftbin',
    description: 'Founded Leftbin, built crypto exchanges handling millions',
    salary: 'Equity',
    location: 'Remote',
    color: 'from-purple-500 to-pink-500'
  },
  {
    year: '2024',
    title: 'The Culmination',
    company: 'Planton.ai',
    description: 'Launched Planton.ai - the culmination of everything I\'ve learned',
    salary: 'Disruption',
    location: 'Everywhere',
    color: 'from-pink-500 to-cyan-500'
  }
];

export default function Journey() {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl md:text-6xl font-bold mb-6">
          From{' '}
          <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
            Third-Tier College
          </span>
          <br />
          to{' '}
          <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Silicon Valley Elite
          </span>
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Every rejection was redirection. Every challenge was preparation. 
          Here's how I compressed decades of learning into relentless execution.
        </p>
      </motion.div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-cyan-400 via-purple-500 to-pink-500" />

        {/* Milestones */}
        {milestones.map((milestone, index) => (
          <motion.div
            key={milestone.year}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`relative mb-16 ${index % 2 === 0 ? 'pr-1/2' : 'pl-1/2 ml-auto'}`}
          >
            {/* Timeline Dot */}
            <div className={`absolute top-8 ${index % 2 === 0 ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'} w-6 h-6 rounded-full bg-gradient-to-r ${milestone.color} border-4 border-black z-10`} />

            {/* Content Card */}
            <div className={`bg-gradient-to-br from-gray-900/80 to-black/60 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-8 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 group ${index % 2 === 0 ? 'mr-8' : 'ml-8'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`text-4xl font-bold bg-gradient-to-r ${milestone.color} bg-clip-text text-transparent`}>
                  {milestone.year}
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{milestone.location}</span>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                {milestone.title}
              </h3>
              
              <div className="text-cyan-400 font-semibold mb-3">
                {milestone.company}
              </div>

              <p className="text-gray-300 leading-relaxed mb-4">
                {milestone.description}
              </p>

              {milestone.salary && (
                <div className="flex items-center gap-2 text-green-400 font-bold">
                  <TrendingUp className="w-5 h-5" />
                  <span>{milestone.salary}</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-20 grid md:grid-cols-3 gap-8 text-center"
      >
        <div className="bg-gradient-to-br from-gray-900/80 to-black/60 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-8">
          <div className="text-4xl font-bold text-cyan-400 mb-2">16 Years</div>
          <div className="text-gray-300">From Code to Cloud</div>
        </div>
        <div className="bg-gradient-to-br from-gray-900/80 to-black/60 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-8">
          <div className="text-4xl font-bold text-green-400 mb-2">350%</div>
          <div className="text-gray-300">Salary Growth</div>
        </div>
        <div className="bg-gradient-to-br from-gray-900/80 to-black/60 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-8">
          <div className="text-4xl font-bold text-purple-400 mb-2">∞</div>
          <div className="text-gray-300">Potential Unlocked</div>
        </div>
      </motion.div>
    </div>
  );
}