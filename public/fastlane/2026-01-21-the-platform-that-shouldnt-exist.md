---
title: "The Platform That Shouldn't Exist"
date: "2026-01-21"
tags: ["planton", "startup", "reflection"]
---

I had a conversation with three Gemini models last night out of pure curiosity. I wanted to understand: why were we able to build such a platform when someone else with more resources wouldn't have already built it—given how big of a deal this is for organizations across the globe?

The answer might come down to a unique combination of factors. Not everyone who has the level of expertise I do at the ground level—doing these hard things every day, collaborating with developers—also has full-stack development experience and the passion to build a product. There might be people as obsessed about this problem as I am, but those people may not have the opportunity or desire to build a startup.

It's a lot of things coming together.

I've decided not to approach this with imposter syndrome. I don't want to feel like "maybe I'm not the guy who should have built this kind of thing." I want to start believing that we indeed built a platform that doesn't exist anywhere else. It's been almost two and a half years in development. It is extremely complicated to build, but we did it. And it checks a lot of boxes.

The market research confirmed what I suspected: Internal Developer Platforms are projected to be a $7.8 billion market by 2033. Gartner says 80% of software engineering organizations will establish platform teams by 2026. The problem is real, the market is desperate for a solution, and most existing tools are just "Kubernetes wrappers" that don't solve the actual problem.

We built something different. Not because we're smarter, but because we had the right combination of expertise, experience, obsession, and opportunity.

---

## Here is the conversation

**Me:**

Why isn't there a single DevOps automation platform that allows anyone to deploy infrastructure and applications to any cloud provider? Like, why isn't there something as simple as GitHub to push code, but for deploying any cloud infrastructure with a unified interface?

The platform should provide a Vercel-like backend experience for services deploying to the customer's own cloud account. Same experience on any cloud and any target platform—whether it's Cloud Run, ECS, Kubernetes, or even deploying databases and message queues on Kubernetes.

It would be super useful for developers to move fast, right? Are there any platforms like this at all?

**Gemini:**

You're describing the "Holy Grail" of DevOps: a **Universal Control Plane**. It feels like a massive gap—we have "one-click" deploys for frontends (Vercel, Netlify) and "push-to-deploy" for code (GitHub), but backend infrastructure remains a complex mess of YAML files, cloud-specific consoles, and fragmented tools.

**The short answer:** While no perfect single standard exists yet, a new category called **BYOC (Bring Your Own Cloud) PaaS** has emerged to solve exactly this problem. These platforms provide a Vercel-like dashboard but deploy into *your* AWS/GCP account. You own the data and the cloud bill; they provide the "Easy Button."

However, the reason a "single platform" doesn't dominate yet comes down to fundamental hurdles:

**Why It's So Hard to Build:**

1. **The "Lowest Common Denominator" Problem** - AWS has "ALB" load balancers, Google has "Global Forwarding Rules," Azure has "App Gateway." A unified tool can only expose features they all share, meaning you lose 50% of each cloud's power.

2. **Leaky Abstractions** - When things work, it's magic. When they break, you get errors like `AWS IAM Role Arn:aws:iam::12345 cannot assume role due to Trust Policy constraint`. Suddenly you need to be an AWS expert to debug the "simple" tool.

3. **The Networking Spiderweb** - It's not just about code—it's VPCs, Subnets, IAM roles, Load Balancers. GCP Cloud Run is request-driven (scales to zero), while AWS ECS is resource-driven (stays running). Unifying these requires complex translation layers.

4. **The Velocity Problem** - AWS releases hundreds of new features per year. A third-party platform has to constantly chase three different giants moving in different directions.

5. **The Security Wall** - To provide a "Vercel experience" on your account, the platform needs deep access to your IAM, networking, and VPCs. Managing that securely across thousands of customers is a massive liability.

6. **Business Incentives** - Cloud providers want vendor lock-in. They have zero incentive to support a standard "Deploy Button" that makes it easy to switch clouds.

**Current Landscape:**

There are platforms trying to solve this problem today. Here's what exists:

**Camp A: "Interface Only" Platforms**
- **Backstage** - Spotify's open-source IDP portal. Creates a catalog where developers click "Create Service," but it triggers scripts you write. Safe for enterprises (no cloud access needed), but you still build the engine yourself.
- **Port** - Similar to Backstage. Provides the unified dashboard, you provide the automation.
- **Cortex** - Another IDP catalog tool focused on service ownership and documentation.
- **Humanitec** - Platform orchestrator that sits on top of your existing tools.

**Camp B: "Universal Deployers" (BYOC Platforms)**
- **Zeet** - Connects to AWS/GCP/Azure/DigitalOcean. Supports K8s, ECS, Cloud Run, and Lambda. Closest to true multi-cloud, multi-target flexibility.
- **Qovery** - Turns a Kubernetes cluster into "Heroku" on your cloud account. Strong on preview environments (full infrastructure copy for every PR). AWS, Azure, GCP, Scaleway support.
- **Northflank** - Polished UI for deploying containers, builds, and managed databases. Excellent support for stateful workloads (DBs, Redis, MinIO). AWS/GCP/Azure.
- **Porter** - Kubernetes-native but hidden. Sets up and manages K8s clusters in your account, gives you a Heroku-like experience on top. AWS/GCP/Azure.
- **Flightcontrol** - AWS-only, ECS/Fargate focused. By restricting to AWS, avoids the "lowest common denominator" problem. Best UX for pure AWS deployments.

**IaC & Framework Tools**
- **Crossplane** - Turns your Kubernetes cluster into a "universal control plane" that can provision resources from any cloud using K8s manifests. Framework for building your own platform, not a ready-made product.
- **Pulumi** - Infrastructure-as-Code using real programming languages (TypeScript, Python, Go). Not a platform with UI, but the only code-based way to deploy to ECS and Cloud Run using the same language.

**Backend-as-a-Service (Alternative Approach)**
- **Supabase** - Postgres, Auth, Storage as a service. Can be self-hosted on your own infrastructure.
- **Appwrite** - Backend functions, databases, auth unified. Hosted or self-hosted.
- **Railway** - Simple "push to deploy" for backends, but hosted on their infrastructure (not BYOC).
- **Render** - Similar to Railway—simple deploys but on their cloud, not yours.

**Niche/Emerging**
- **Coherence** - Abstracts Cloud Run and ECS with YAML config files.
- **Kuberns** - AI-driven automation, primarily AWS in 2026.

**The Pattern:**

Two camps exist because the market is fighting over *how* to solve it:
- Camp A is safe but requires you to build the deployment engine
- Camp B does the actual work but needs admin access to your cloud accounts (trust barrier)

**The Kubernetes Problem:**

Most Camp B platforms are essentially "Kubernetes wrappers." They hide K8s complexity but force you to pay the "K8s Tax"—high base costs, slow startup times, rigid networking. Very few support ECS and Cloud Run as first-class citizens without hidden Kubernetes underneath.

**Me:**

If a platform that does what I described exists, would it find good market traction? Assuming incredible UX. Be honest.

**Gemini:**

**Yes, absolutely.** In fact, this is one of the hottest and fastest-growing sectors in tech. It's called **Platform Engineering**.

Gartner predicts that **by 2026, 80% of software engineering organizations** will establish platform teams to build exactly what you're describing. The demand is massive:

**Why the Market Traction Would Be Astronomical:**

1. **The Talent Gap** - Finding engineers who are great at both React/Node and Kubernetes/IAM/VPC-Peering is like finding a unicorn. A platform that removes this requirement lets companies hire 5 "Product Devs" instead of 4 Devs + 1 expensive DevOps Engineer.

2. **The Market Size** - Internal Developer Portals (IDPs) are projected to be a **$7.8 billion market by 2033**.

3. **The Multi-Cloud Pressure** - Regulatory requirements (especially in EU with DORA and Gaia-X) are forcing companies to prove they aren't locked into AWS. A platform that makes switching clouds as easy as a dropdown would be an instant buy for every CTO in Fintech and Healthcare.

4. **The Shift Happening** - Moving from "DevOps" (you build it, you run it, you suffer) to "Platform Engineering" (the platform team builds the 'Golden Path', you just drive).

**The Brutal Obstacles:**

Even with incredible UX, you'd face three challenges that have killed many startups:

1. **The "Black Box" Trust Issue** - Senior Architects are terrified of "Magic." To win, your platform must be "ejectable"—it must write clean, standard code (Terraform/Pulumi) into the user's account that they can take over if your company disappears.

2. **The Pricing "Double-Tax"** - Users hate paying twice. At $1M/year cloud spend, a 20% platform fee is $200k/year—the price of a full-time DevOps engineer. Most platforms struggle because they become more expensive than hiring someone.

3. **The "90/10" Customization Trap** - 90% of apps are easy (container + DB + cache). But the last 10% (custom VPC peering, GPU clusters, LDAP integration) makes or breaks enterprise deals. If your platform says "No," teams abandon it.

**The Verdict:**

If you built this today with **AI-driven troubleshooting** (the platform doesn't just fail—it uses an LLM to explain *why* the AWS IAM role failed and fixes it in natural language), you'd likely lead the next generation of DevOps.

The market is desperate for it. The "Single Platform" is inevitable. Cloud providers are becoming "Utilities" (like electricity), and platforms will become the "Appliances" developers actually interact with.

Companies realize they can't replicate Vercel's UX by hiring 50 DevOps engineers. It's cheaper to pay for a platform than to build a bad internal version with Jenkins and Terraform.

**This is not a question of "if" but "when" and "who."**
