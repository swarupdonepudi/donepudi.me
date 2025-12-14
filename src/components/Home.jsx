'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Calendar,
  ArrowRight,
  Terminal,
  Zap,
  Code,
  Cloud,
  Rocket,
  Star,
  Globe,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';

import Hero from '@/components/portfolio/Hero';
import Journey from '@/components/portfolio/Journey';
import Arsenal from '@/components/portfolio/Arsenal';
import Empire from '@/components/portfolio/Empire';
import Impact from '@/components/portfolio/Impact';
import Vision from '@/components/portfolio/Vision';
import Contact from '@/components/portfolio/Contact';

const navItems = [
  { label: 'Journey', href: '#journey' },
  { label: 'Arsenal', href: '#arsenal' },
  { label: 'Projects', href: '#projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Talks', href: '/talks' },
  { label: 'Courses', href: '/courses' },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <Image 
              src="/swarup-donepudi.png" 
              alt="Swarup Donepudi" 
              width={48}
              height={48}
              className="w-12 h-12 rounded-full border-2 border-cyan-400/30 object-cover"
              priority
            />
            <span className="text-xl font-bold text-cyan-400">Swarup Donepudi</span>
          </motion.div>
          
          {/* Desktop Navigation */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex space-x-8"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </motion.div>
          
          {/* Desktop Social Links */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="hidden md:flex space-x-3"
          >
            <Button
              variant="ghost" 
              size="icon"
              className="text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/10"
              onClick={() => typeof window !== 'undefined' && window.open('https://github.com/swarupdonepudi', '_blank')}
            >
              <Github className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon" 
              className="text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/10"
              onClick={() => typeof window !== 'undefined' && window.open('https://linkedin.com/in/swarupdonepudi', '_blank')}
            >
              <Linkedin className="w-5 h-5" />
            </Button>
          </motion.div>

          {/* Mobile Hamburger Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="md:hidden"
          >
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-black/95 backdrop-blur-lg border-b border-cyan-500/20 overflow-hidden"
            >
              <div className="px-6 py-4 space-y-4">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="block text-gray-300 hover:text-cyan-400 transition-colors duration-300 py-2 border-b border-cyan-500/10"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </motion.a>
                ))}
                
                {/* Mobile Social Links */}
                <div className="flex space-x-3 pt-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/10"
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        window.open('https://github.com/swarupdonepudi', '_blank');
                      }
                    }}
                  >
                    <Github className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/10"
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        window.open('https://linkedin.com/in/swarupdonepudi', '_blank');
                      }
                    }}
                  >
                    <Linkedin className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <Hero />
      
      {/* Journey Section */}
      <section id="journey" className="py-20">
        <Journey />
      </section>
      
      {/* Arsenal Section */}
      <section id="arsenal" className="py-20 bg-gradient-to-r from-gray-900/50 to-blue-900/20">
        <Arsenal />
      </section>
      
      {/* Empire Section */}
      <section id="projects" className="py-20">
        <Empire />
      </section>
      
      {/* Impact Section */}
      <section id="impact" className="py-20 bg-gradient-to-r from-purple-900/20 to-gray-900/50">
        <Impact />
      </section>
      
      {/* Vision Section */}
      <section id="vision" className="py-20">
        <Vision />
      </section>
      
      {/* Contact Section */}
      <Contact />
      
      {/* Footer */}
      <footer className="py-12 border-t border-cyan-500/20 bg-black/40">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <h3 className="text-2xl font-bold text-cyan-400 mb-2">
              Engineering the Future, One System at a Time
            </h3>
            <div className="flex justify-center space-x-8 text-gray-400">
              <a href="/blog" className="hover:text-cyan-400 transition-colors">Blog</a>
              <a href="/talks" className="hover:text-cyan-400 transition-colors">Talks</a>
              <a href="https://github.com/project-planton" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">Open Source</a>
              <a href="https://planton.cloud" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">Planton Cloud</a>
            </div>
          </motion.div>
          <div className="text-gray-500">
            © 2025 Swarup Donepudi. Built with React & deployed on the future of cloud.
          </div>
        </div>
      </footer>
    </div>
  );
}


