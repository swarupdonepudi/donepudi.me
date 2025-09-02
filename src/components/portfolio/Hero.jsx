
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Terminal, ArrowRight, Zap, Code, Globe } from 'lucide-react';

const codeLines = [
  "$ kubectl apply -f future.yaml",
  "deployment.apps/innovation created",  
  "service/disruption exposed",
  "$ terraform plan -target=silicon_valley",
  "Plan: 350k in salary increases, 0 to destroy",
  "$ docker run --rm swarup/ambition:latest",
  "Building planton.ai...",
  "Revolutionizing cloud deployment...",
  "$ git push origin main",
  "Enumerating objects: 100M+, done.",
  "Total 100M+ (delta 0), reused 0 (delta 0)"
];

export default function Hero() {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (!isTyping) return;

    const line = codeLines[currentLine];
    let charIndex = 0;

    const typeInterval = setInterval(() => {
      setDisplayText(line.substring(0, charIndex + 1));
      charIndex++;

      if (charIndex >= line.length) {
        clearInterval(typeInterval);
        setTimeout(() => {
          setCurrentLine((prev) => (prev + 1) % codeLines.length);
          setDisplayText('');
        }, 1500);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, [currentLine, isTyping]);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Floating Particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-cyan-400 text-lg font-semibold tracking-wider uppercase"
            >
              Engineer • Founder
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
            >
              I Build the{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Infrastructure
              </span>
              <br />
              That Powers Tomorrow
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-300 leading-relaxed"
            >
              From zero to <span className="text-green-400 font-semibold">$350K in Silicon Valley</span>.
              <br />
              From microservices to <span className="text-cyan-400 font-semibold">millions in transactions</span>.
              <br />
              Now building the future of cloud deployment at{' '}
              <span className="text-purple-400 font-semibold">planton.ai</span>
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button 
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-4 text-lg font-semibold group"
            >
              See My Impact
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline"
              size="lg"
              className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black px-8 py-4 text-lg font-semibold group"
            >
              Build With Me
              <Zap className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-6 text-gray-400"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>Available for collaboration</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-gray-600" />
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>Silicon Valley • Remote</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Terminal Animation */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="bg-black/80 backdrop-blur-sm border border-cyan-500/30 rounded-lg overflow-hidden shadow-2xl shadow-cyan-500/20">
            {/* Terminal Header */}
            <div className="bg-gray-900/80 px-4 py-3 border-b border-cyan-500/20 flex items-center gap-3">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <div className="w-3 h-3 bg-green-500 rounded-full" />
              </div>
              <div className="text-gray-300 text-sm font-mono">swarup@future:~$</div>
            </div>
            
            {/* Terminal Content */}
            <div className="p-6 font-mono text-sm min-h-[400px]">
              {codeLines.slice(0, currentLine).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`mb-2 ${
                    line.includes('$') ? 'text-cyan-400' : 
                    line.includes('created') || line.includes('exposed') || line.includes('done') ? 'text-green-400' : 
                    line.includes('Building') || line.includes('Revolutionizing') ? 'text-purple-400' :
                    'text-gray-300'
                  }`}
                >
                  {line}
                </motion.div>
              ))}
              
              <div className={`mb-2 ${
                displayText.includes('$') ? 'text-cyan-400' : 
                displayText.includes('Building') || displayText.includes('Revolutionizing') ? 'text-purple-400' :
                'text-gray-300'
              }`}>
                {displayText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="text-cyan-400"
                >
                  |
                </motion.span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
