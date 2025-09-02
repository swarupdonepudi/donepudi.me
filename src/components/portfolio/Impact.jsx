import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Users, Zap, Clock, Award } from 'lucide-react';

const metrics = [
  {
    label: 'Hours Saved',
    value: 100,
    suffix: 's',
    color: 'from-green-400 to-emerald-500',
    icon: DollarSign,
    description: 'Through JIRA migration automation & CI/CD optimization'
  },
  {
    label: 'Salary Growth',
    value: 7,
    suffix: 'x',
    color: 'from-blue-400 to-cyan-500',
    icon: TrendingUp,
    description: 'From $45K to $350K in 4 years'
  },
  {
    label: 'Engineers Led',
    value: 20,
    suffix: '+',
    color: 'from-purple-400 to-pink-500',
    icon: Users,
    description: 'Across multiple continents and time zones'
  },
  {
    label: 'Crypto Transactions',
    value: 1000000,
    prefix: '',
    suffix: 's',
    color: 'from-orange-400 to-red-500',
    icon: Zap,
    description: 'Millions in crypto transactions securely handled'
  },
  {
    label: 'Microservices Deployed',
    value: 1000,
    suffix: '+',
    color: 'from-yellow-400 to-orange-500',
    icon: Award,
    description: '1000+ microservices deployed in production'
  },
  {
    label: 'System Uptime',
    value: 99,
    suffix: '%',
    color: 'from-cyan-400 to-blue-500',
    icon: Clock,
    description: '24/7 systems with 99.99% uptime'
  }
];

function AnimatedCounter({ value, duration = 2000 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      setCount(Math.floor(value * progress));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  return count;
}

export default function Impact() {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl md:text-6xl font-bold mb-6">
          Numbers{' '}
          <span className="bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent">
            Don't Lie
          </span>
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Impact measured in millions. Growth measured in multiples. 
          Results that speak louder than words.
        </p>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
              className="group"
            >
              <div className="bg-gradient-to-br from-gray-900/80 to-black/60 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-8 text-center hover:border-cyan-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/20 relative overflow-hidden">
                {/* Background Glow */}
                <div className={`absolute inset-0 bg-gradient-to-r ${metric.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="flex justify-center mb-4">
                    <div className={`p-4 rounded-full bg-gradient-to-r ${metric.color} bg-opacity-20`}>
                      <Icon className={`w-8 h-8 bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`} />
                    </div>
                  </div>

                  {/* Value */}
                  <div className="mb-2">
                    <span className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                      {metric.prefix}
                      <AnimatedCounter value={metric.value} />
                      {metric.suffix}
                    </span>
                  </div>

                  {/* Label */}
                  <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {metric.label}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {metric.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quote Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-purple-900/30 via-blue-900/20 to-cyan-900/30 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-12 text-center relative overflow-hidden"
      >
        {/* Quote Background Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent" />
        
        <div className="relative z-10">
          <div className="text-6xl text-purple-400/30 font-bold mb-4">"</div>
          <blockquote className="text-2xl md:text-3xl font-medium text-white leading-relaxed mb-8">
            I don't just write code, I{' '}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent font-bold">
              architect ecosystems
            </span>
            . From zero to Silicon Valley in 7 years. 
            Why settle for good when you can be{' '}
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent font-bold">
              exceptional
            </span>
            ?
          </blockquote>
          <div className="text-gray-400 text-lg">
            — Building at the intersection of ambition and execution
          </div>
        </div>
      </motion.div>

      {/* Timeline Highlight */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16 text-center"
      >
        <div className="inline-flex items-center gap-4 bg-gradient-to-r from-gray-900/80 to-black/60 backdrop-blur-sm border border-cyan-500/20 rounded-full px-8 py-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-full" />
            <span className="text-gray-300">2008</span>
          </div>
          <div className="w-24 h-px bg-gradient-to-r from-orange-500 via-yellow-500 via-green-500 via-blue-500 via-purple-500 to-cyan-500" />
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full animate-pulse" />
            <span className="text-cyan-400 font-semibold">2024 & Beyond</span>
          </div>
        </div>
        <p className="text-gray-400 mt-4">16 years of relentless execution</p>
      </motion.div>
    </div>
  );
}