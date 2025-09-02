import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Rocket, Users, TrendingUp, Zap, Target, Globe } from 'lucide-react';

const opportunities = [
  {
    title: 'Early Adopters',
    description: 'Shape the future of Planton.ai and get first-mover advantage',
    icon: Rocket,
    action: 'Try Planton.ai',
    color: 'from-purple-500 to-pink-500',
    cta: 'Deploy your first app in 60 seconds'
  },
  {
    title: 'Investors',
    description: 'Get in early on the $100B cloud opportunity',
    icon: TrendingUp,
    action: 'View Pitch Deck',
    color: 'from-green-500 to-emerald-500',
    cta: 'Exclusive investment opportunity'
  },
  {
    title: 'Engineers',
    description: 'Join the mission to solve hard problems that matter',
    icon: Users,
    action: 'Explore Careers',
    color: 'from-blue-500 to-cyan-500',
    cta: 'Work on the future of infrastructure'
  },
  {
    title: 'Companies',
    description: '10x your deployment velocity with Leftbin consulting',
    icon: Zap,
    action: 'Scale Your Team',
    color: 'from-orange-500 to-red-500',
    cta: 'Battle-tested engineers ready'
  }
];

export default function Vision() {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl md:text-6xl font-bold mb-6">
          I'm Just{' '}
          <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Getting Started
          </span>
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          The next chapter is being written. The question isn't if I'll succeed—it's how big the impact will be.
        </p>
      </motion.div>

      {/* Current Mission */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <div className="bg-gradient-to-br from-gray-900/80 to-black/60 backdrop-blur-sm border-2 border-cyan-500/30 rounded-2xl p-12 text-center relative overflow-hidden">
          {/* Background Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10" />
          
          <div className="relative z-10">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 bg-opacity-20">
                <Target className="w-12 h-12 text-cyan-400" />
              </div>
            </div>
            
            <h3 className="text-3xl font-bold text-cyan-400 mb-4">Current Mission</h3>
            <p className="text-xl text-gray-200 leading-relaxed mb-6 max-w-4xl mx-auto">
              "Making Planton.ai the default choice for every developer who's tired of cloud complexity. 
              If you're still writing Terraform, you're living in the past."
            </p>
            
            <div className="inline-flex items-center gap-2 bg-cyan-400/10 border border-cyan-400/30 rounded-full px-4 py-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <span className="text-cyan-400 font-semibold">Active Development</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Opportunities Grid */}
      <div className="mb-16">
        <h3 className="text-3xl font-bold text-center mb-12 text-purple-400">Ready to Build Something Extraordinary?</h3>
        
        <div className="grid md:grid-cols-2 gap-8">
          {opportunities.map((opp, index) => {
            const Icon = opp.icon;
            return (
              <motion.div
                key={opp.title}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
                className="group"
              >
                <div className="bg-gradient-to-br from-gray-900/80 to-black/60 backdrop-blur-sm border border-gray-600/30 rounded-xl p-8 hover:border-cyan-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/20 relative overflow-hidden">
                  {/* Background Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${opp.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${opp.color} bg-opacity-20`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {opp.title}
                      </h4>
                    </div>

                    <p className="text-gray-300 leading-relaxed mb-6">
                      {opp.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button className={`bg-gradient-to-r ${opp.color} hover:opacity-90 flex-1`}>
                        {opp.action}
                      </Button>
                      <div className="text-sm text-gray-400 flex items-center justify-center">
                        {opp.cta}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <div className="bg-gradient-to-r from-purple-900/30 via-blue-900/20 to-cyan-900/30 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-12 relative overflow-hidden">
          {/* Background Effect */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent animate-pulse" />
          </div>
          
          <div className="relative z-10">
            <h3 className="text-4xl font-bold text-white mb-4">
              The Future Won't Build Itself
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              I'm looking for the next generation of builders, dreamers, and executors. 
              Together, we'll make the impossible inevitable.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 px-8 py-4 text-lg font-semibold"
              >
                <Globe className="mr-2 w-5 h-5" />
                Let's Connect
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black px-8 py-4 text-lg font-semibold"
              >
                <Rocket className="mr-2 w-5 h-5" />
                Book Strategy Call
              </Button>
            </div>
            
            <p className="text-gray-500 text-sm mt-6">
              30-minute strategy call • No sales pitch • Pure value
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}