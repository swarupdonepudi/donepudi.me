'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import TalkLayout from '@/components/talks/TalkLayout';

// Slide 1: Title
function Slide01Title() {
  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-5xl"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-8 leading-tight">
          Consistency Without Abstraction
        </h1>
        <p className="text-2xl md:text-3xl text-cyan-400 mb-8">
          Building a Multi-Cloud Infrastructure Framework with Project Planton
        </p>
        <div className="flex flex-col items-center gap-3 text-gray-400">
          <p className="text-xl">Swarup Donepudi</p>
          <p className="text-lg">Founder, PlantonCloud | Creator, Project Planton</p>
          <p className="text-sm mt-4">Hyderabad CNCF Meetup • November 29, 2025</p>
        </div>
      </motion.div>
    </div>
  );
}

// Slide 2: About Me
function Slide02AboutMe() {
  return (
    <div className="w-full h-full flex items-center justify-center p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl"
      >
        <h2 className="text-5xl font-bold text-white mb-8">About Me</h2>
        <div className="space-y-6 text-gray-200 text-xl">
          <p className="text-2xl text-cyan-400">
            Platform Engineering Entrepreneur
          </p>
          <div className="space-y-4">
            <p>
              🏢 <strong className="text-white">Founder:</strong> PlantonCloud - "DevOps-in-a-Box" Internal Developer Platform
            </p>
            <p>
              🔧 <strong className="text-white">Creator:</strong> Project Planton - Open-source multi-cloud framework
            </p>
            <p>
              📈 <strong className="text-white">Experience:</strong> 10+ years in DevOps (1-person startups → 500-dev enterprises)
            </p>
            <p>
              🎯 <strong className="text-white">Mission:</strong> Making enterprise-grade platform engineering accessible
            </p>
          </div>
          <p className="text-lg text-gray-400 pt-4">
            🌐 github.com/project-planton/project-planton
          </p>
        </div>
      </motion.div>
    </div>
  );
}

// Slide 3: The Problem
function Slide03Problem() {
  return (
    <div className="w-full h-full flex items-center justify-center p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl"
      >
        <h2 className="text-5xl font-bold text-white mb-12">The Multi-Cloud Challenge</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-6">
            <h3 className="text-red-400 text-2xl font-bold mb-4">Abstract Too Much</h3>
            <div className="text-gray-300 space-y-3">
              <p>❌ Lowest common denominator</p>
              <p>❌ Lose cloud-specific power</p>
              <p>❌ Limited functionality</p>
            </div>
          </div>
          <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-6">
            <h3 className="text-red-400 text-2xl font-bold mb-4">Abstract Too Little</h3>
            <div className="text-gray-300 space-y-3">
              <p>❌ No consistency</p>
              <p>❌ Different tools per cloud</p>
              <p>❌ Constant context switching</p>
            </div>
          </div>
          <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-6">
            <h3 className="text-red-400 text-2xl font-bold mb-4">Complex Setup</h3>
            <div className="text-gray-300 space-y-3">
              <p>❌ Requires K8s clusters</p>
              <p>❌ Operators, CRDs, reconcilers</p>
              <p>❌ High barrier to entry</p>
            </div>
          </div>
        </div>
        <p className="text-center text-2xl text-gray-300 mt-8">
          💭 How do we provide consistency <strong className="text-cyan-400">without</strong> losing power?
        </p>
      </motion.div>
    </div>
  );
}

// Slide 4: Opening Hook
function Slide04Hook() {
  return (
    <div className="w-full h-full flex items-center justify-center p-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-6xl text-center"
      >
        <h2 className="text-6xl font-bold text-white mb-12">
          What if...
        </h2>
        <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/50 rounded-lg p-12">
          <p className="text-3xl text-gray-200 leading-relaxed mb-6">
            Deploying a PostgreSQL database to <strong className="text-orange-400">AWS</strong>, <strong className="text-blue-400">GCP</strong>, or <strong className="text-cyan-400">Kubernetes</strong> felt the same?
          </p>
          <p className="text-2xl text-cyan-400 font-semibold">
            Same YAML structure • Same CLI command • Same validation workflow
          </p>
          <p className="text-xl text-gray-400 mt-6">
            Without hiding cloud-specific power?
          </p>
        </div>
      </motion.div>
    </div>
  );
}

// Slide 5: Project Planton Introduction
function Slide05ProjectPlanton() {
  return (
    <div className="w-full h-full flex items-center justify-center p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl"
      >
        <h2 className="text-5xl font-bold text-white mb-8">Project Planton</h2>
        <p className="text-2xl text-cyan-400 mb-8">
          Open-Source Multi-Cloud Infrastructure Framework
        </p>
        <div className="space-y-6 text-gray-200 text-xl">
          <p>
            ✅ <strong className="text-white">Kubernetes-style consistency</strong> across AWS, GCP, Azure, Kubernetes
          </p>
          <p>
            ✅ <strong className="text-white">100+ deployment components</strong> - Production-ready modules
          </p>
          <p>
            ✅ <strong className="text-white">Protocol Buffers validation</strong> - Catch 90%+ errors before cloud APIs
          </p>
          <p>
            ✅ <strong className="text-white">Dual Pulumi/Terraform support</strong> - Your choice, not ours
          </p>
          <p>
            ✅ <strong className="text-white">Simple CLI</strong> - No K8s cluster required
          </p>
        </div>
          <p className="text-xl text-gray-400 pt-6">
          🌐 project-planton.org • github.com/project-planton/project-planton
          </p>
      </motion.div>
    </div>
  );
}

// Slide 6: Example Walkthrough
function Slide06DemoPreview() {
  return (
    <div className="w-full h-full flex items-center justify-center p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl text-center"
      >
        <h2 className="text-5xl font-bold text-white mb-12">
          Comparing Deployments
        </h2>
        <p className="text-2xl text-gray-300 mb-12">
          Let's examine how PostgreSQL deploys to three different clouds
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-cyan-900/20 border border-cyan-500/50 rounded-lg p-6">
            <h3 className="text-cyan-400 text-3xl font-bold mb-2">1</h3>
            <p className="text-xl text-white">Postgres on Kubernetes</p>
          </div>
          <div className="bg-orange-900/20 border border-orange-500/50 rounded-lg p-6">
            <h3 className="text-orange-400 text-3xl font-bold mb-2">2</h3>
            <p className="text-xl text-white">Postgre on AWS</p>
          </div>
          <div className="bg-blue-900/20 border border-blue-500/50 rounded-lg p-6">
            <h3 className="text-blue-400 text-3xl font-bold mb-2">3</h3>
            <p className="text-xl text-white">Postgre on GCP</p>
          </div>
        </div>
        <p className="text-xl text-cyan-400 mt-12 font-semibold">
          Same structure. Same workflow. Different clouds.
        </p>
      </motion.div>
    </div>
  );
}

// Slide 7: Example 1 - Postgres on Kubernetes
function Slide07DemoK8s() {
  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl"
      >
        <h2 className="text-4xl font-bold text-white mb-6">Example 1: PostgreSQL on Kubernetes</h2>
        
        {/* Manifest Section */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-cyan-400 mb-2">Manifest</h3>
          <div className="bg-gray-900 rounded-lg border border-gray-700 p-4">
            <pre className="text-gray-300 text-xs font-mono overflow-x-auto leading-relaxed">
{`apiVersion: kubernetes.project-planton.org/v1
kind: KubernetesPostgres
metadata:
  name: kubernetes-postgres-example
  labels:
    project-planton.org/provisioner: pulumi
spec:
  namespace:
    value: kubernetes-postgres-example
  container:
    replicas: 1
    resources:
      requests:
        cpu: 100m
        memory: 256Mi
      limits:
        cpu: 2000m
        memory: 2Gi
    diskSize: 1Gi
  ingress:
    enabled: false`}
            </pre>
          </div>
        </div>

        {/* Terminal Section */}
        <div>
          <h3 className="text-lg font-semibold text-cyan-400 mb-2">Terminal</h3>
          <div className="bg-gray-950 rounded-lg border border-gray-700 p-4">
            <pre className="text-sm font-mono overflow-x-auto leading-relaxed">
              <span className="text-cyan-400">$</span> <span className="text-white">project-planton apply -f --manifest kubernetes-postgres.yaml</span>
              {'\n\n'}
              <span className="text-cyan-400">✓</span> <span className="text-gray-300">Validating manifest with proto rules...</span>
              {'\n'}
              <span className="text-cyan-400">✓</span> <span className="text-gray-300">Planning infrastructure changes...</span>
              {'\n'}
              <span className="text-cyan-400">✓</span> <span className="text-gray-300">Creating PostgreSQL cluster...</span>
              {'\n'}
              <span className="text-cyan-400">✓</span> <span className="text-gray-300">Deployment complete!</span>
              {'\n\n'}
              <span className="text-yellow-400">Outputs:</span>
              {'\n'}
              <span className="text-gray-500">  connection_string: </span><span className="text-white">postgres://user:pass@postgres.example.com:5432/db</span>
              {'\n'}
              <span className="text-gray-500">  pod_count: </span><span className="text-white">1</span>
            </pre>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Slide 8: Example 2 - Postgres on AWS
function Slide08DemoAWS() {
  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl"
      >
        <h2 className="text-4xl font-bold text-white mb-6">Example 2: PostgreSQL on AWS RDS</h2>
        
        {/* Manifest Section */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-orange-400 mb-2">Manifest</h3>
          <div className="bg-gray-900 rounded-lg border border-gray-700 p-4">
            <pre className="text-gray-300 text-xs font-mono overflow-x-auto leading-relaxed">
{`apiVersion: aws.project-planton.org/v1
kind: AwsRdsInstance
metadata:
  name: aws-postgres-example
  labels:
    project-planton.org/provisioner: pulumi
spec:
  subnetIds:
    - value: subnet-abc123
    - value: subnet-def456
  securityGroupIds:
    - value: sg-xyz789
  engine: postgres
  engineVersion: "15.4"
  instanceClass: db.t3.micro
  allocatedStorageGb: 20
  storageEncrypted: true
  username: postgres
  password: my-secure-password
  port: 5432
  publiclyAccessible: false
  multiAz: false`}
            </pre>
          </div>
        </div>

        {/* Terminal Section */}
        <div>
          <h3 className="text-lg font-semibold text-orange-400 mb-2">Terminal</h3>
          <div className="bg-gray-950 rounded-lg border border-gray-700 p-4">
            <pre className="text-sm font-mono overflow-x-auto leading-relaxed">
              <span className="text-orange-400">$</span> <span className="text-white">project-planton apply -f --manifest aws-postgres.yaml</span>
              {'\n\n'}
              <span className="text-orange-400">✓</span> <span className="text-gray-300">Validating manifest with proto rules...</span>
              {'\n'}
              <span className="text-orange-400">✓</span> <span className="text-gray-300">Planning infrastructure changes...</span>
              {'\n'}
              <span className="text-orange-400">✓</span> <span className="text-gray-300">Creating RDS instance...</span>
              {'\n'}
              <span className="text-orange-400">✓</span> <span className="text-gray-300">Deployment complete!</span>
              {'\n\n'}
              <span className="text-yellow-400">Outputs:</span>
              {'\n'}
              <span className="text-gray-500">  connection_string: </span><span className="text-white">postgres://admin:pass@mydb.abc.us-east-1.rds.amazonaws.com:5432/db</span>
              {'\n'}
              <span className="text-gray-500">  instance_id: </span><span className="text-white">mydb-20251129</span>
            </pre>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Slide 9: Example 3 - Postgres on GCP
function Slide09DemoGCP() {
  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl"
      >
        <h2 className="text-4xl font-bold text-white mb-6">Example 3: PostgreSQL on GCP Cloud SQL</h2>
        
        {/* Manifest Section */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-blue-400 mb-2">Manifest</h3>
          <div className="bg-gray-900 rounded-lg border border-gray-700 p-4">
            <pre className="text-gray-300 text-xs font-mono overflow-x-auto leading-relaxed">
{`apiVersion: gcp.project-planton.org/v1
kind: GcpCloudSql
metadata:
  name: gcp-postgres-example
  labels:
    project-planton.org/provisioner: pulumi
spec:
  databaseEngine: POSTGRESQL
  databaseVersion: POSTGRES_15
  network:
    authorizedNetworks:
    - 0.0.0.0/0
  projectId: project-planton-demo
  region: asia-south1
  rootPassword: my-secure-password
  storageGb: 10
  tier: db-f1-micro`}
            </pre>
          </div>
        </div>

        {/* Terminal Section */}
        <div>
          <h3 className="text-lg font-semibold text-blue-400 mb-2">Terminal</h3>
          <div className="bg-gray-950 rounded-lg border border-gray-700 p-4">
            <pre className="text-sm font-mono overflow-x-auto leading-relaxed">
              <span className="text-blue-400">$</span> <span className="text-white">project-planton apply -f --manifest gcp-postgres.yaml</span>
              {'\n\n'}
              <span className="text-blue-400">✓</span> <span className="text-gray-300">Validating manifest with proto rules...</span>
              {'\n'}
              <span className="text-blue-400">✓</span> <span className="text-gray-300">Planning infrastructure changes...</span>
              {'\n'}
              <span className="text-blue-400">✓</span> <span className="text-gray-300">Creating Cloud SQL instance...</span>
              {'\n'}
              <span className="text-blue-400">✓</span> <span className="text-gray-300">Deployment complete!</span>
              {'\n\n'}
              <span className="text-yellow-400">Outputs:</span>
              {'\n'}
              <span className="text-gray-500">  connection_string: </span><span className="text-white">postgres://user:pass@10.1.2.3:5432/db</span>
              {'\n'}
              <span className="text-gray-500">  instance_name: </span><span className="text-white">my-postgres-gcp-abc123</span>
            </pre>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Slide 10: Key Point
function Slide10KeyPoint() {
  return (
    <div className="w-full h-full flex items-center justify-center p-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-6xl text-center"
      >
        <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/50 rounded-lg p-16">
          <p className="text-5xl text-white font-bold mb-8">
            Same structure. Same workflow. Different clouds.
          </p>
          <p className="text-3xl text-cyan-400 font-semibold">
            That's <strong>consistency without abstraction</strong>.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

// Slide 11: The Backstory
function Slide11Backstory() {
  return (
    <div className="w-full h-full flex items-center justify-center p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl"
      >
        <h2 className="text-5xl font-bold text-white mb-12">The Backstory</h2>
        <div className="space-y-8 text-gray-200 text-xl">
          <p>
            📊 <strong className="text-cyan-400">10 years as DevOps engineer</strong> (1-person startups → 500-developer enterprises)
          </p>
          <p>
            🔄 <strong className="text-white">Same pattern everywhere:</strong> Rebuilding Terraform modules, relearning cloud quirks
          </p>
          <p>
            💡 <strong className="text-white">The insight:</strong> 80% of teams use only 20% of cloud features
          </p>
          <p>
            ❓ <strong className="text-yellow-400">The question:</strong> Why do we keep starting from scratch?
          </p>
          <p>
            ✅ <strong className="text-green-400">The answer:</strong> We need standardized building blocks, not blank canvases
          </p>
        </div>
      </motion.div>
    </div>
  );
}

// Slide 12: The Turning Point
function Slide12TurningPoint() {
  return (
    <div className="w-full h-full flex items-center justify-center p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl text-center"
      >
        <h2 className="text-5xl font-bold text-white mb-12">The Turning Point</h2>
        <div className="space-y-8 text-gray-200 text-2xl">
          <div className="bg-purple-900/20 border border-purple-500/50 rounded-lg p-8">
            <p className="text-3xl mb-4">🏢 Started building <strong className="text-purple-400">PlantonCloud</strong></p>
            <p className="text-lg text-gray-400">(commercial IDP for production workloads)</p>
          </div>
          <div className="text-4xl text-cyan-400">↓</div>
          <div className="bg-green-900/20 border border-green-500/50 rounded-lg p-8">
            <p className="text-3xl mb-4">🔓 Extracted the infrastructure layer as <strong className="text-green-400">open source</strong></p>
            <p className="text-lg text-gray-400">The "20%" encoded as reusable components</p>
          </div>
          <div className="text-4xl text-cyan-400">↓</div>
          <p className="text-4xl font-bold text-white">
            <strong className="text-cyan-400">Project Planton</strong> was born
          </p>
        </div>
      </motion.div>
    </div>
  );
}

// Slide 13: Architecture - Protocol Buffers
function Slide13ProtoBufs() {
  return (
    <div className="w-full h-full flex items-center justify-center p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl"
      >
        <h2 className="text-4xl font-bold text-white mb-8">Decision 1: Protocol Buffers as Schema Layer</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-6">
            <h3 className="text-red-400 text-2xl font-bold mb-4">Why NOT raw YAML?</h3>
            <div className="text-gray-300 space-y-3">
              <p>❌ Stringly-typed (everything is text)</p>
              <p>❌ Errors at deployment time (expensive, slow)</p>
              <p>❌ No IDE autocomplete</p>
              <p>❌ No type safety</p>
            </div>
          </div>
          <div className="bg-green-900/20 border border-green-500/50 rounded-lg p-6">
            <h3 className="text-green-400 text-2xl font-bold mb-4">Why Protocol Buffers?</h3>
            <div className="text-gray-300 space-y-3">
              <p>✅ Field-level validation rules</p>
              <p>✅ Multi-language SDK generation</p>
              <p>✅ Catch 90%+ errors before cloud APIs</p>
              <p>✅ Beautiful documentation</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Slide 14: Proto Example
function Slide14ProtoExample() {
  return (
    <div className="w-full h-full flex items-center justify-center p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl"
      >
        <h2 className="text-4xl font-bold text-white mb-6">Protocol Buffers Validation</h2>
        <div className="bg-gray-900 rounded-lg border border-green-500/30 p-6">
          <pre className="text-green-400 text-sm font-mono overflow-x-auto">
{`// spec.proto
message PostgresKubernetesSpec {
  string cpu = 1 [
    (buf.validate.field).string.pattern = "^[0-9]+m$"
  ];
  
  int32 replicas = 2 [
    (buf.validate.field).int32 = {gte: 1, lte: 10}
  ];
  
  string memory = 3 [
    (buf.validate.field).string.pattern = "^[0-9]+(Mi|Gi)$"
  ];
}

// Validation happens BEFORE cloud API calls
$ project-planton validate --manifest postgres.yaml

❌ Error: spec.cpu: value "invalid" does not match pattern "^[0-9]+m$"
❌ Error: spec.replicas: value 20 is greater than maximum 10

// Fix locally, zero cloud API cost for validation errors!`}
          </pre>
        </div>
      </motion.div>
    </div>
  );
}

// Slide 15: SDK Generation
function Slide15SDKs() {
  return (
    <div className="w-full h-full flex items-center justify-center p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl text-center"
      >
        <h2 className="text-4xl font-bold text-white mb-12">Multi-Language SDKs from Proto</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-blue-900/20 border border-blue-500/50 rounded-lg p-6">
            <p className="text-4xl mb-2">🐹</p>
            <p className="text-xl text-white font-semibold">Go</p>
          </div>
          <div className="bg-yellow-900/20 border border-yellow-500/50 rounded-lg p-6">
            <p className="text-4xl mb-2">🐍</p>
            <p className="text-xl text-white font-semibold">Python</p>
          </div>
          <div className="bg-cyan-900/20 border border-cyan-500/50 rounded-lg p-6">
            <p className="text-4xl mb-2">📘</p>
            <p className="text-xl text-white font-semibold">TypeScript</p>
          </div>
          <div className="bg-orange-900/20 border border-orange-500/50 rounded-lg p-6">
            <p className="text-4xl mb-2">☕</p>
            <p className="text-xl text-white font-semibold">Java</p>
          </div>
        </div>
        <p className="text-2xl text-gray-300 mt-12">
          One proto definition → Type-safe clients in all languages
        </p>
      </motion.div>
    </div>
  );
}

// Slide 16: CLI vs Operators
function Slide16CLIvsOperators() {
  return (
    <div className="w-full h-full flex items-center justify-center p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl"
      >
        <h2 className="text-4xl font-bold text-white mb-8">Decision 2: CLI + Pulumi/Terraform (Not K8s Operators)</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-purple-900/20 border border-purple-500/50 rounded-lg p-6">
            <h3 className="text-purple-400 text-2xl font-bold mb-4">Crossplane Approach</h3>
            <div className="text-gray-300 space-y-3">
              <p>• Requires K8s cluster upfront</p>
              <p>• Uses CRDs and reconciler loops</p>
              <p>• K8s-native (great if all-in on K8s)</p>
              <p>• Complex troubleshooting (operator logs, CRD status)</p>
            </div>
          </div>
          <div className="bg-cyan-900/20 border border-cyan-500/50 rounded-lg p-6">
            <h3 className="text-cyan-400 text-2xl font-bold mb-4">Project Planton Approach</h3>
            <div className="text-gray-300 space-y-3">
              <p>✅ Works on laptop, CI/CD, server</p>
              <p>✅ Uses battle-tested IaC engines</p>
              <p>✅ Simple: read manifest → run IaC → outputs</p>
              <p>✅ Faster feedback, simpler debugging</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Slide 17: When to Use Each
function Slide17WhenToUse() {
  return (
    <div className="w-full h-full flex items-center justify-center p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl text-center"
      >
        <h2 className="text-4xl font-bold text-white mb-12">When to Use Each?</h2>
        <div className="space-y-8 text-xl">
          <div className="bg-purple-900/20 border border-purple-500/50 rounded-lg p-8">
            <p className="text-2xl font-bold text-purple-400 mb-4">Choose Crossplane if:</p>
            <div className="text-gray-300 space-y-2">
              <p>✓ K8s everywhere and want K8s-native control plane</p>
              <p>✓ Love operators and reconciler loops</p>
              <p>✓ GitOps-centric workflow</p>
            </div>
          </div>
          <div className="bg-cyan-900/20 border border-cyan-500/50 rounded-lg p-8">
            <p className="text-2xl font-bold text-cyan-400 mb-4">Choose Project Planton if:</p>
            <div className="text-gray-300 space-y-2">
              <p>✓ Want simpler model and faster local dev</p>
              <p>✓ Need multi-IaC engine support (Pulumi + Terraform)</p>
              <p>✓ Lower barrier to entry (no K8s required)</p>
            </div>
          </div>
        </div>
        <p className="text-2xl text-gray-400 mt-8">
          Both are valid! Different design philosophies, not competitors.
        </p>
      </motion.div>
    </div>
  );
}

// Slide 18: Dual IaC Support
function Slide18DualIaC() {
  return (
    <div className="w-full h-full flex items-center justify-center p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl"
      >
        <h2 className="text-4xl font-bold text-white mb-12">Decision 3: Dual Pulumi/Terraform Support</h2>
        <div className="space-y-8 text-gray-200 text-xl">
          <p className="text-2xl">
            <strong className="text-cyan-400">Why both?</strong>
          </p>
          <p>
            🏢 <strong className="text-white">Teams have different investments</strong>
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-orange-900/20 border border-orange-500/50 rounded-lg p-6">
              <h3 className="text-orange-400 text-xl font-bold mb-3">Terraform</h3>
              <p className="text-gray-300">Mature, HCL, familiar to many</p>
            </div>
            <div className="bg-purple-900/20 border border-purple-500/50 rounded-lg p-6">
              <h3 className="text-purple-400 text-xl font-bold mb-3">Pulumi</h3>
              <p className="text-gray-300">Real languages, type safety, easier testing</p>
            </div>
          </div>
          <p>
            ⚖️ <strong className="text-white">We maintain feature parity</strong> (same functionality, same defaults)
          </p>
          <p className="text-2xl text-cyan-400 text-center pt-4">
            Choose based on team preference, not framework limitation
          </p>
        </div>
      </motion.div>
    </div>
  );
}

// Slide 19: Deployment Component Concept
function Slide19DeploymentComponent() {
  return (
    <div className="w-full h-full flex items-center justify-center p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl"
      >
        <h2 className="text-4xl font-bold text-white mb-8">The "Deployment Component" Concept</h2>
        <p className="text-xl text-gray-300 mb-6">Every component is a complete package:</p>
        <div className="bg-gray-900 rounded-lg border border-cyan-500/30 p-6">
          <pre className="text-green-400 text-sm font-mono overflow-x-auto">
{`postgreskubernetes/v1/
├── api.proto           # KRM structure
├── spec.proto          # Configuration schema
├── spec_test.go        # Validation tests
├── stack_outputs.proto # What you get back
├── README.md           # User documentation
├── examples.md         # Real-world examples
└── iac/
    ├── pulumi/         # Pulumi module
    └── terraform/      # Terraform module`}
          </pre>
        </div>
        <p className="text-2xl text-cyan-400 mt-8">
          📦 100+ components • AWS, GCP, Azure, Kubernetes • Production-ready
        </p>
      </motion.div>
    </div>
  );
}

// Slide 20: Crossplane Comparison Table
function Slide20CrossplaneTable() {
  return (
    <div className="w-full h-full flex items-center justify-center p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl"
      >
        <h2 className="text-4xl font-bold text-white mb-8 text-center">Crossplane vs Project Planton</h2>
        <div className="bg-gray-900 rounded-lg border border-cyan-500/30 p-6 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-cyan-500/30">
                <th className="p-3 text-gray-400 font-semibold">Aspect</th>
                <th className="p-3 text-purple-400 font-semibold">Crossplane</th>
                <th className="p-3 text-cyan-400 font-semibold">Project Planton</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-cyan-500/10">
                <td className="p-3 font-semibold">Prerequisites</td>
                <td className="p-3">K8s cluster required</td>
                <td className="p-3 text-green-400">Just a CLI binary</td>
              </tr>
              <tr className="border-b border-cyan-500/10">
                <td className="p-3 font-semibold">Execution Model</td>
                <td className="p-3">Reconciler loops (operators)</td>
                <td className="p-3 text-green-400">Direct IaC execution</td>
              </tr>
              <tr className="border-b border-cyan-500/10">
                <td className="p-3 font-semibold">API Definition</td>
                <td className="p-3">CRDs (YAML schemas)</td>
                <td className="p-3 text-green-400">Protocol Buffers</td>
              </tr>
              <tr className="border-b border-cyan-500/10">
                <td className="p-3 font-semibold">Validation</td>
                <td className="p-3">At reconciliation time</td>
                <td className="p-3 text-green-400">Before deployment (local)</td>
              </tr>
              <tr className="border-b border-cyan-500/10">
                <td className="p-3 font-semibold">IaC Engine</td>
                <td className="p-3">Provider-specific</td>
                <td className="p-3 text-green-400">Pulumi OR Terraform (choice)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Feedback Loop</td>
                <td className="p-3">Async (check CRD status)</td>
                <td className="p-3 text-green-400">Sync (immediate output)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

// Slide 21: Key Takeaways
function Slide21KeyTakeaways() {
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
        <div className="space-y-6 text-gray-200 text-xl">
          <p>
            1️⃣ <strong className="text-cyan-400">Consistency ≠ Abstraction</strong> - Unified experience without hiding power
          </p>
          <p>
            2️⃣ <strong className="text-green-400">Validation First</strong> - Catch errors before expensive cloud API calls
          </p>
          <p>
            3️⃣ <strong className="text-purple-400">Simple {'>'} Sophisticated</strong> - CLI + IaC simpler than K8s operators
          </p>
          <p>
            4️⃣ <strong className="text-yellow-400">80/20 Principle</strong> - Focus on the 20% that 80% of teams need
          </p>
          <p>
            5️⃣ <strong className="text-pink-400">Open Source Community</strong> - This is OSS, please contribute!
          </p>
        </div>
      </motion.div>
    </div>
  );
}

// Slide 22: Get Involved
function Slide22GetInvolved() {
  return (
    <div className="w-full h-full flex items-center justify-center p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl"
      >
        <h2 className="text-5xl font-bold text-white mb-12">Get Involved! 🚀</h2>
        <p className="text-2xl text-cyan-400 mb-8">Project Planton is open source</p>
        <div className="space-y-6 text-gray-200 text-xl">
          <p>
            ⭐ <strong className="text-white">Star the repo:</strong> github.com/project-planton/project-planton
          </p>
          <p>
            🔨 <strong className="text-white">Add deployment components</strong> for your favorite cloud services
          </p>
          <p>
            📚 <strong className="text-white">Improve documentation</strong> and examples
          </p>
          <p>
            🐛 <strong className="text-white">Report issues</strong> / fix bugs
          </p>
          <p>
            💬 <strong className="text-white">Join discussions</strong> and share feedback
          </p>
        </div>
        <p className="text-xl text-gray-400 mt-8">
          🌟 Preparing for public launch • Building community • Looking for early adopters
        </p>
      </motion.div>
    </div>
  );
}

// Slide 23: Roadmap
function Slide23Roadmap() {
  return (
    <div className="w-full h-full flex items-center justify-center p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl"
      >
        <h2 className="text-5xl font-bold text-white mb-12">What's Next? 🚀</h2>
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-purple-900/30 to-cyan-900/30 border border-purple-500/50 rounded-lg p-8">
            <h3 className="text-3xl font-bold text-purple-400 mb-6">Project Planton Web App</h3>
            <div className="space-y-4 text-gray-200 text-xl">
              <p>
                🌐 <strong className="text-white">Self-hosted web interface</strong> for your infrastructure
              </p>
              <p>
                💾 <strong className="text-white">Built-in database</strong> to store configurations and state
              </p>
              <p>
                ⚙️ <strong className="text-white">Backend execution engine</strong> runs infrastructure modules
              </p>
              <p>
                📜 <strong className="text-white">Deployment history</strong> and audit trails
              </p>
              <p>
                🏢 <strong className="text-white">Deploy in your own infrastructure</strong> - complete control
              </p>
            </div>
          </div>
          
          <div className="bg-green-900/20 border border-green-500/50 rounded-lg p-8 text-center">
            <p className="text-2xl text-green-400 font-bold mb-4">
              🧪 Beta Testing Now Open!
            </p>
            <p className="text-xl text-gray-300">
              Testing the open source web app with early adopters
            </p>
            <p className="text-lg text-gray-400 mt-4">
              📧 Interested? Reach out: <strong className="text-white">swarup@donepudi.me</strong>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Slide 24: Thank You
function Slide24ThankYou() {
  return (
    <div className="w-full h-full flex items-center justify-center p-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-5xl"
      >
        <h2 className="text-6xl font-bold text-white mb-12">Thank You! 🙏</h2>
        <div className="space-y-8">
          <p className="text-3xl text-cyan-400 font-semibold mb-12">Questions?</p>
          <div className="grid md:grid-cols-2 gap-6 text-gray-300 text-lg">
            <div className="bg-white/5 rounded-lg p-6">
              <p className="text-white font-semibold mb-2">Project Planton (OSS)</p>
              <p>project-planton.org</p>
              <p>github.com/project-planton/project-planton</p>
            </div>
            <div className="bg-white/5 rounded-lg p-6">
              <p className="text-white font-semibold mb-2">Connect</p>
              <p>linkedin.com/in/swarupdonepudi</p>
              <p>swarup@donepudi.me</p>
            </div>
          </div>
          <p className="text-2xl text-cyan-400 pt-8">
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
    <Slide02AboutMe key="slide-2" />,
    <Slide03Problem key="slide-3" />,
    <Slide04Hook key="slide-4" />,
    <Slide05ProjectPlanton key="slide-5" />,
    <Slide06DemoPreview key="slide-6" />,
    <Slide07DemoK8s key="slide-7" />,
    <Slide08DemoAWS key="slide-8" />,
    <Slide09DemoGCP key="slide-9" />,
    <Slide10KeyPoint key="slide-10" />,
    <Slide11Backstory key="slide-11" />,
    <Slide12TurningPoint key="slide-12" />,
    <Slide13ProtoBufs key="slide-13" />,
    <Slide14ProtoExample key="slide-14" />,
    <Slide15SDKs key="slide-15" />,
    <Slide16CLIvsOperators key="slide-16" />,
    <Slide17WhenToUse key="slide-17" />,
    <Slide18DualIaC key="slide-18" />,
    <Slide19DeploymentComponent key="slide-19" />,
    <Slide20CrossplaneTable key="slide-20" />,
    <Slide21KeyTakeaways key="slide-21" />,
    <Slide22GetInvolved key="slide-22" />,
    <Slide23Roadmap key="slide-23" />,
    <Slide24ThankYou key="slide-24" />,
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
        case 'Home':
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
