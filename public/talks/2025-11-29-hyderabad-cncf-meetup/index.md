---
title: "Consistency Without Abstraction: Building a Multi-Cloud Infrastructure Framework with Project Planton"
event: "Hyderabad CNCF Meetup"
date: "2025-11-29"
location: "Hyderabad, India"
audience_size: "50-100"
excerpt: "What if deploying a PostgreSQL database to AWS RDS, GCP Cloud SQL, or a Kubernetes cluster felt the same—without hiding cloud-specific power?"
has_presentation: true
status: "upcoming"
---

# Consistency Without Abstraction: Building a Multi-Cloud Infrastructure Framework with Project Planton

## Overview

What if deploying a PostgreSQL database to AWS RDS, GCP Cloud SQL, or a Kubernetes cluster felt the same—same YAML structure, same CLI command, same validation workflow—without hiding cloud-specific power?

This talk introduces **Project Planton**, an open-source multi-cloud infrastructure framework that brings Kubernetes-style consistency to infrastructure deployments. Through live demos, we'll deploy different infrastructure components (Postgres, Redis, Kafka) across multiple clouds using a single CLI, then dive into the architectural decisions behind the framework.

## What You'll Learn

### 1. Value Through Live Demos (10 minutes)
- Deploy PostgreSQL to Kubernetes, AWS RDS, and GCP Cloud SQL
- Same CLI command, same workflow, different clouds
- Validation catching errors before deployment
- Compare deployment times and developer experience

### 2. The Backstory (5 minutes)
- 10 years of DevOps: constantly rebuilding the same patterns
- The insight: 80% of use cases need only 20% of cloud capabilities
- Why build an open-source framework instead of more one-off scripts

### 3. Architectural Deep Dive (10 minutes)
- Why Protocol Buffers over raw YAML (validation, multi-language SDKs)
- Why simple CLI + Pulumi/Terraform over Kubernetes operators
- Why dual Pulumi/Terraform support (choice > dogma)
- The "deployment component" concept (API + IaC + docs + examples)

### 4. Crossplane Comparison (5 minutes)
- Crossplane: YAML-driven, requires Kubernetes cluster, reconciler loops
- Project Planton: YAML-driven, works anywhere, uses Pulumi/Terraform
- When to use each (spoiler: both have valid use cases)

## Key Takeaways

Attendees will leave understanding:

- ✅ How to provide consistent multi-cloud experience without losing provider-specific power
- ✅ Why validation-first deployments catch 90%+ of errors before cloud APIs
- ✅ The tradeoffs between Kubernetes-operator-based vs CLI-based infrastructure frameworks
- ✅ How Project Planton's 100+ deployment components work
- ✅ When to use Crossplane vs Project Planton vs raw IaC
- ✅ How to contribute to Project Planton (it's open source!)

## Target Audience

**Primary:** Platform engineers building internal developer platforms  
**Secondary:** DevOps engineers, SREs, cloud architects  
**Tertiary:** Developers interested in infrastructure tooling

**Assumed knowledge:**
- Basic understanding of cloud infrastructure (AWS/GCP/Azure)
- Familiarity with Kubernetes concepts
- Awareness of IaC tools (Terraform/Pulumi)
- No Crossplane experience required

## Format

- **Duration:** 25-30 minutes (20 min talk + 5-10 min Q&A)
- **Style:** Demo-first approach with live deployments
- **Interactive:** Q&A and discussion encouraged

## Key Philosophy

**Consistency ≠ Abstraction**

You can have unified experience without hiding provider differences. The manifests are provider-specific (AWS RDS configuration ≠ GCP Cloud SQL configuration), but the experience is identical.

**Core Principles:**
- **Consistency over clever abstractions** → Don't hide cloud providers, unify the experience
- **Pragmatic defaults over blank slates** → Battle-tested configurations that work
- **Developer experience as a first-class feature** → One click, one platform, no archaeology
- **Validation-first deployments** → Catch 90%+ of errors before calling cloud APIs

## Links

- **GitHub:** [github.com/project-planton/project-planton](https://github.com/project-planton/project-planton)
- **Website:** [project-planton.org](https://project-planton.org)

## About the Speaker

**Swarup Donepudi** is a platform engineering entrepreneur and founder of PlantonCloud, a multi-cloud Internal Developer Platform serving production customers today. As creator of Project Planton—an open-source multi-cloud framework with 100+ deployment components—Swarup is passionate about reducing cognitive overhead in modern cloud deployments.

With 10+ years architecting DevOps infrastructure at scale, he believes in "consistency without abstraction": providing unified developer experience while preserving provider-specific power. His work focuses on making enterprise-grade platform engineering accessible to teams of all sizes through validation-first deployments, Protocol Buffers-based APIs, and the 80/20 principle applied to infrastructure.

**Connect:**
- **GitHub:** [github.com/project-planton/project-planton](https://github.com/project-planton/project-planton)
- **Website:** [project-planton.org](https://project-planton.org)
- **LinkedIn:** [linkedin.com/in/swarupdonepudi](https://linkedin.com/in/swarupdonepudi)

---

**Why This Talk Matters:**

1. **Demo-first approach** → Immediate value, not abstract concepts
2. **Clear differentiation** → Explains how it's different from Crossplane
3. **Architectural depth** → Appeals to technical CNCF audience
4. **Open source angle** → Invites community participation
5. **Practical lessons** → Based on real-world experience (10 years)
6. **No vendor pitch** → Educational, not sales-y
