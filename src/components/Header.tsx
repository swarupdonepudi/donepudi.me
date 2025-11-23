'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  className?: string;
}

const navItems = [
  { label: 'Journey', href: '/#journey' },
  { label: 'Arsenal', href: '/#arsenal' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Talks', href: '/talks' },
];

export default function Header({ className = '' }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-cyan-500/20 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <Link href="/" className="flex items-center gap-3">
            <Image 
              src="/swarup-donepudi.png" 
              alt="Swarup Donepudi" 
              width={48}
              height={48}
              className="w-12 h-12 rounded-full border-2 border-cyan-400/30 object-cover"
              priority
            />
            <span className="text-xl font-bold text-cyan-400">Swarup Donepudi</span>
          </Link>
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
  );
}


