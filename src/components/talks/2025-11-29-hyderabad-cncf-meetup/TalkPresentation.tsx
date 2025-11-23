'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import TalkLayout from '@/components/talks/TalkLayout';

// Slide components
function Slide01Title() {
  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-4xl"
      >
        <h1 className="text-6xl font-extrabold text-white mb-6 leading-tight">
          From DevOps Chaos to Platform Engineering
        </h1>
        <p className="text-2xl text-gray-300 mb-8">
          Building Self-Service Infrastructure at Scale
        </p>
        <div className="flex flex-col items-center gap-2 text-gray-400">
          <p className="text-lg">Swarup Donepudi</p>
          <p>Founder, Planton Cloud</p>
          <p className="text-sm">Hyderabad CNCF Meetup • November 29, 2025</p>
        </div>
      </motion.div>
    </div>
  );
}

function Slide02Problem() {
  return (
    <div className="w-full h-full flex items-center justify-center p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl"
      >
        <h2 className="text-5xl font-bold text-white mb-12">The Problem</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-red-500/50 p-6">
            <h3 className="text-white text-2xl font-bold mb-4">Traditional DevOps</h3>
            <div className="text-gray-300 space-y-3">
              <p>❌ Developers submit tickets</p>
              <p>❌ Wait for DevOps team</p>
              <p>❌ Manual configuration</p>
              <p>❌ Knowledge silos</p>
              <p>❌ Doesn't scale</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-green-500/50 p-6">
            <h3 className="text-white text-2xl font-bold mb-4">Platform Engineering</h3>
            <div className="text-gray-300 space-y-3">
              <p>✅ Developer self-service</p>
              <p>✅ Instant provisioning</p>
              <p>✅ Automated workflows</p>
              <p>✅ Shared knowledge</p>
              <p>✅ Scales infinitely</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Slide03WhatIsPlatformEngineering() {
  return (
    <div className="w-full h-full flex items-center justify-center p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl"
      >
        <h2 className="text-5xl font-bold text-white mb-8 text-center">
          What is Platform Engineering?
        </h2>
        <div className="bg-white rounded-lg p-12">
          <blockquote className="text-3xl text-gray-800 italic font-medium text-center leading-relaxed">
            "Platform Engineering is the discipline of designing and building toolchains and workflows that enable self-service capabilities for software engineering teams."
          </blockquote>
          <p className="text-center mt-6 text-gray-600">
            - Platform Engineering is Not Just DevOps
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function Slide04PlantonCloud() {
  return (
    <div className="w-full h-full flex items-center justify-center p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl"
      >
        <h2 className="text-5xl font-bold text-white mb-8">Planton Cloud</h2>
        <div className="space-y-6 text-gray-200 text-xl">
          <p className="text-2xl">
            🚀 Platform-as-a-Service for modern engineering teams
          </p>
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-blue-400">Infrastructure Hub</h3>
              <ul className="space-y-2">
                <li>• 500+ deployment components</li>
                <li>• 10+ cloud providers</li>
                <li>• Unified API across clouds</li>
                <li>• Production-ready modules</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-purple-400">Service Hub</h3>
              <ul className="space-y-2">
                <li>• Git-based deployment</li>
                <li>• Auto-containerization</li>
                <li>• Zero Docker knowledge needed</li>
                <li>• Deploy to any infrastructure</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Slide05ProjectPlanton() {
  return (
    <div className="w-full h-full flex items-center justify-center p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl"
      >
        <h2 className="text-5xl font-bold text-white mb-8">Project Planton</h2>
        <p className="text-2xl text-gray-300 mb-8">
          Open-Source Deployment Orchestration Framework
        </p>
        <div className="bg-white/5 backdrop-blur-sm border border-green-500/30 rounded-lg p-8">
          <div className="space-y-6 text-gray-200 text-lg">
            <p>
              <strong className="text-green-400">Protocol Buffers</strong> for infrastructure schemas
            </p>
            <p>
              <strong className="text-green-400">Pulumi Modules</strong> for IaC implementation
            </p>
            <p>
              <strong className="text-green-400">CLI Tools</strong> for deployment workflows
            </p>
            <p className="text-xl pt-4 border-t border-white/10">
              💡 Use it independently or as the foundation for Planton Cloud
            </p>
            <p className="text-gray-400">
              github.com/project-planton • project-planton.org
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Slide06Architecture() {
  return (
    <div className="w-full h-full flex items-center justify-center p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl"
      >
        <h2 className="text-5xl font-bold text-white mb-8 text-center">
          Multi-Cloud Architecture
        </h2>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-orange-900/30 border border-orange-500/50 rounded-lg p-6">
            <h3 className="text-white text-center text-2xl font-bold mb-4">AWS</h3>
            <div className="text-gray-300 text-sm space-y-2">
              <p>• EKS</p>
              <p>• RDS</p>
              <p>• ElastiCache</p>
              <p>• S3</p>
              <p>• and 100+ more...</p>
            </div>
          </div>
          <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-6">
            <h3 className="text-white text-center text-2xl font-bold mb-4">GCP</h3>
            <div className="text-gray-300 text-sm space-y-2">
              <p>• GKE</p>
              <p>• Cloud SQL</p>
              <p>• Memorystore</p>
              <p>• GCS</p>
              <p>• and 100+ more...</p>
            </div>
          </div>
          <div className="bg-blue-900/30 border border-cyan-500/50 rounded-lg p-6">
            <h3 className="text-white text-center text-2xl font-bold mb-4">Azure</h3>
            <div className="text-gray-300 text-sm space-y-2">
              <p>• AKS</p>
              <p>• Azure DB</p>
              <p>• Redis Cache</p>
              <p>• Blob Storage</p>
              <p>• and 100+ more...</p>
            </div>
          </div>
        </div>
        <p className="text-center text-2xl text-gray-300 mt-8">
          ✨ Same API • Different Clouds
        </p>
      </motion.div>
    </div>
  );
}

function Slide07DeveloperExperience() {
  return (
    <div className="w-full h-full flex items-center justify-center p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl"
      >
        <h2 className="text-5xl font-bold text-white mb-12 text-center">
          Developer Experience
        </h2>
        <div className="bg-gray-900 rounded-lg border border-gray-700 p-8">
          <pre className="text-green-400 text-sm font-mono overflow-x-auto">
{`# Deploy PostgreSQL on any Kubernetes cluster
apiVersion: planton.cloud/v1
kind: PostgresKubernetes
metadata:
  name: my-database
spec:
  version: "15"
  replicas: 3
  storage: 100Gi
  backup:
    enabled: true
    schedule: "0 2 * * *"

# Deploy with one command
$ project-planton pulumi up --manifest postgres.yaml

✅ Validating manifest...
✅ Planning infrastructure...
✅ Creating PostgreSQL cluster...
✅ Deployment complete!

Connection string: postgres://user:pass@postgres.example.com:5432/db`}
          </pre>
        </div>
      </motion.div>
    </div>
  );
}

function Slide08InfraCharts() {
  return (
    <div className="w-full h-full flex items-center justify-center p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl"
      >
        <h2 className="text-5xl font-bold text-white mb-8">Infra Charts</h2>
        <p className="text-2xl text-gray-300 mb-8">
          Helm for Infrastructure • Dependency Management for Cloud Resources
        </p>
        <div className="space-y-6 text-gray-200 text-xl">
          <p>
            🎯 <strong>Problem:</strong> Production apps need 10+ infrastructure resources
          </p>
          <p>
            💡 <strong>Solution:</strong> Bundle resources with dependencies
          </p>
          <p className="text-lg text-gray-400 pl-8">
            Example: ECS service needs VPC, subnets, load balancer, security groups, IAM roles, CloudWatch logs, and more
          </p>
          <p>
            ⚡ <strong>Result:</strong> Deploy complete environment with one command
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function Slide09KeyTakeaways() {
  return (
    <div className="w-full h-full flex items-center justify-center p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl"
      >
        <h2 className="text-5xl font-bold text-white mb-12 text-center">
          Key Takeaways
        </h2>
        <div className="space-y-8 text-gray-200 text-2xl">
          <p>
            1️⃣ <strong className="text-blue-400">Self-service is the goal</strong> - Remove DevOps bottlenecks
          </p>
          <p>
            2️⃣ <strong className="text-purple-400">Abstractions matter</strong> - Hide complexity, keep power
          </p>
          <p>
            3️⃣ <strong className="text-green-400">Multi-cloud is real</strong> - Build once, deploy anywhere
          </p>
          <p>
            4️⃣ <strong className="text-yellow-400">Open source foundation</strong> - Build on proven tools
          </p>
          <p>
            5️⃣ <strong className="text-pink-400">Developer experience wins</strong> - Easy things should be easy
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function Slide10ThankYou() {
  return (
    <div className="w-full h-full flex items-center justify-center p-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-4xl"
      >
        <h2 className="text-6xl font-bold text-white mb-8">Thank You! 🙏</h2>
        <div className="space-y-6 text-gray-300 text-xl">
          <p className="text-3xl mb-8">Questions?</p>
          <div className="space-y-4">
            <p>
              <strong>Planton Cloud:</strong> planton.cloud
            </p>
            <p>
              <strong>Project Planton:</strong> project-planton.org
            </p>
            <p>
              <strong>GitHub:</strong> github.com/project-planton
            </p>
            <p>
              <strong>LinkedIn:</strong> linkedin.com/in/swarupdonepudi
            </p>
            <p>
              <strong>Email:</strong> swarup@planton.cloud
            </p>
          </div>
          <p className="text-2xl pt-8 text-blue-400">
            Let's build better platforms together! 🚀
          </p>
        </div>
      </motion.div>
    </div>
  );
}

// Main presentation component
export default function TalkPresentation() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    <Slide01Title key="slide-1" />,
    <Slide02Problem key="slide-2" />,
    <Slide03WhatIsPlatformEngineering key="slide-3" />,
    <Slide04PlantonCloud key="slide-4" />,
    <Slide05ProjectPlanton key="slide-5" />,
    <Slide06Architecture key="slide-6" />,
    <Slide07DeveloperExperience key="slide-7" />,
    <Slide08InfraCharts key="slide-8" />,
    <Slide09KeyTakeaways key="slide-9" />,
    <Slide10ThankYou key="slide-10" />,
  ];

  const goToNext = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
  }, [currentSlide, slides.length]);

  const goToPrevious = useCallback(() => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  }, [currentSlide]);

  const goHome = useCallback(() => {
    router.push('/talks/2025-11-29-hyderabad-cncf-meetup');
  }, [router]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          e.preventDefault();
          goToNext();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          goToPrevious();
          break;
        case 'Escape':
          e.preventDefault();
          goHome();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [goToNext, goToPrevious, goHome]);

  return (
    <TalkLayout
      currentSlide={currentSlide}
      totalSlides={slides.length}
      onNext={goToNext}
      onPrevious={goToPrevious}
      onHome={goHome}
      talkSlug="2025-11-29-hyderabad-cncf-meetup"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full"
        >
          {slides[currentSlide]}
        </motion.div>
      </AnimatePresence>
    </TalkLayout>
  );
}

