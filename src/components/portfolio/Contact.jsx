import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, Calendar, Globe, MessageSquare } from 'lucide-react';

const contactOptions = [
  {
    icon: Github,
    label: 'GitHub',
    value: '@swarupdonepudi',
    href: 'https://github.com/swarupdonepudi',
    color: 'from-gray-500 to-gray-600',
    description: 'Explore my code and contributions'
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: '/in/swarupdonepudi',
    href: 'https://linkedin.com/in/swarupdonepudi',
    color: 'from-blue-500 to-blue-600',
    description: 'Professional network and updates'
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'swarup@donepudi.me',
    href: 'mailto:swarup@donepudi.me',
    color: 'from-red-500 to-red-600',
    description: 'Direct communication'
  },
  {
    icon: Calendar,
    label: 'Schedule',
    value: 'Book a 30-min call',
    href: '#',
    color: 'from-green-500 to-green-600',
    description: 'Strategy session'
  }
];

export default function Contact() {
  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Ready to Build{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Something Extraordinary
            </span>
            ?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Whether you're looking to revolutionize your infrastructure, scale your team, 
            or invest in the future of cloud, let's make it happen.
          </p>
        </motion.div>

        {/* Contact Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactOptions.map((contact, index) => {
            const Icon = contact.icon;
            return (
              <motion.div
                key={contact.label}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <a
                  href={contact.href}
                  target={contact.href.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="bg-gradient-to-br from-gray-900/80 to-black/60 backdrop-blur-sm border border-gray-600/30 rounded-xl p-6 text-center hover:border-cyan-400/50 transition-all duration-500 hover:shadow-xl hover:shadow-cyan-500/20 relative overflow-hidden">
                    {/* Background Glow */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${contact.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
                    
                    <div className="relative z-10">
                      <div className="flex justify-center mb-4">
                        <div className={`p-4 rounded-full bg-gradient-to-r ${contact.color} bg-opacity-20`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                        {contact.label}
                      </h3>
                      
                      <p className="text-cyan-400 font-semibold mb-2">
                        {contact.value}
                      </p>
                      
                      <p className="text-sm text-gray-400">
                        {contact.description}
                      </p>
                    </div>
                  </div>
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-900/80 to-black/60 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8"
        >
          <h3 className="text-3xl font-bold text-center text-purple-400 mb-8">Choose Your Adventure</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 p-6 h-auto flex-col group">
              <Globe className="w-8 h-8 mb-3 group-hover:rotate-12 transition-transform" />
              <div className="text-lg font-semibold mb-1">Try Planton.ai</div>
              <div className="text-sm opacity-80">Deploy in 60 seconds</div>
            </Button>
            
            <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 p-6 h-auto flex-col group">
              <MessageSquare className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-lg font-semibold mb-1">Hire Leftbin</div>
              <div className="text-sm opacity-80">Scale your team</div>
            </Button>
            
            <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 p-6 h-auto flex-col group">
              <Calendar className="w-8 h-8 mb-3 group-hover:bounce transition-transform" />
              <div className="text-lg font-semibold mb-1">Collaborate</div>
              <div className="text-sm opacity-80">Build together</div>
            </Button>
            
            <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 p-6 h-auto flex-col group">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Globe className="w-8 h-8 mb-3" />
              </motion.div>
              <div className="text-lg font-semibold mb-1">Invest</div>
              <div className="text-sm opacity-80">Join the future</div>
            </Button>
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-2 bg-cyan-400/10 border border-cyan-400/30 rounded-full px-6 py-3 mb-6">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
            <span className="text-cyan-400 font-semibold">Available for new opportunities</span>
          </div>
          
          <p className="text-2xl font-medium text-white mb-4">
            Your infrastructure shouldn't be harder than your product.
          </p>
          <p className="text-gray-400">
            Let's build the future of cloud together.
          </p>
        </motion.div>
      </div>
    </section>
  );
}