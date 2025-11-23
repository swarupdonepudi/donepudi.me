---
title: "Organizer Notes - Hyderabad CNCF Meetup"
---

# Organizer Notes for Rohit

**Talk:** Consistency Without Abstraction: Building a Multi-Cloud Infrastructure Framework with Project Planton  
**Date:** November 29, 2025  
**Speaker:** Swarup Donepudi

---

## Speaker Bio for Announcements

### Primary Bio (Recommended)

**Swarup Donepudi** is the founder of PlantonCloud, a "DevOps-in-a-Box" Internal Developer Platform, and the creator of Project Planton, an open-source multi-cloud infrastructure framework that brings Kubernetes-style consistency to AWS, GCP, Azure, and Kubernetes deployments.

With over 10 years of experience in DevOps and platform engineering, Swarup has architected cloud-native infrastructure at scale—from one-person startups to 500-developer enterprises. He's passionate about reducing cognitive overhead in modern cloud deployments through validation-first infrastructure, Protocol Buffers-based APIs, and treating infrastructure as composable building blocks.

Project Planton features 100+ deployment components with dual Pulumi/Terraform support, enabling teams to deploy production-ready infrastructure in minutes instead of weeks. PlantonCloud currently serves paying customers in production.

**GitHub:** github.com/project-planton/project-planton  
**Website:** planton.cloud

### Alternate Bio (More Concise)

**Swarup Donepudi** is a platform engineering entrepreneur and creator of Project Planton, an open-source multi-cloud framework that brings Kubernetes Resource Model patterns to infrastructure deployments across any cloud provider. With a decade of DevOps experience, he's passionate about making enterprise-grade platform engineering accessible to teams of all sizes through "consistency without abstraction"—unified developer experience while preserving provider-specific power. He's currently preparing to launch Project Planton publicly and serves production customers through PlantonCloud.

**GitHub:** github.com/project-planton/project-planton

### Ultra-Short Bio (If space is limited)

**Swarup Donepudi** is the founder of PlantonCloud and creator of Project Planton, an open-source multi-cloud infrastructure framework. With 10+ years in DevOps, he's passionate about bringing Kubernetes-style consistency to multi-cloud deployments and making platform engineering accessible to teams of all sizes.

### One-Liner (For social media/tweets)

Platform engineering entrepreneur | Creator of Project Planton (open-source multi-cloud framework) | Founder of PlantonCloud | Making infra-as-code feel like pushing to Git

---

## Introduction Snippet

**For Rohit to say when introducing Swarup:**

> "Our next speaker is Swarup Donepudi, founder of PlantonCloud and creator of Project Planton—an open-source framework he's building to solve a problem many of us face: the chaos of managing deployments across different clouds. With over 10 years in DevOps, Swarup believes in 'consistency without abstraction' and is preparing to launch Project Planton publicly. Please welcome Swarup!"

---

## Technical Requirements

### Projector/Screen
- HDMI connection (speaker will bring adapters)
- 16:9 aspect ratio preferred
- Minimum 1080p resolution

### Audio
- Microphone for Q&A
- Room audio for video demos (if applicable)

### Internet
- Wi-Fi access for live demonstrations
- **Backup plan:** Pre-recorded demos if connectivity is poor

### Setup Time
- Speaker will arrive 30 minutes before talk
- 10 minutes needed for tech check
- Prefer to test projector and screen resolution

---

## Talk Format

**Duration:** 25-30 minutes
- 20 minutes presentation
- 5-10 minutes Q&A

**Style:**
- Demo-first approach (live deployments across clouds)
- Live demos: Deploy Postgres to Kubernetes, AWS RDS, GCP Cloud SQL
- Architectural deep dive
- Crossplane comparison

**Materials:**
- Slides will be web-based (no file needed)
- QR codes for GitHub repos and demo links
- Contact information for follow-up

---

## Demo Prerequisites

### Infrastructure Needed
- Laptop with Project Planton CLI installed
- Pre-configured cloud credentials (AWS, GCP)
- Local Kubernetes cluster (kind/minikube) OR use existing K8s
- Pre-prepared manifest files
- Demo environment tested beforehand

### Backup Plan
- Pre-recorded video of deployments (if live demo fails)
- Screenshots of each step
- Code samples in slides

---

## Audience Engagement

### Questions to Seed Discussion

If the audience is quiet during Q&A, consider these prompts:

- "How many teams here are currently managing Kubernetes clusters?"
- "What's your biggest pain point with infrastructure provisioning?"
- "Anyone dealing with multi-cloud challenges?"
- "Has anyone used Crossplane or similar tools?"

### Interactive Elements

The talk includes:
- Live demonstrations (can be skipped if time is tight)
- Architecture diagrams
- Real code examples from production systems
- Comparison tables (Crossplane vs Project Planton)

---

## Key Messages to Emphasize

1. **Consistency ≠ Abstraction** - You can have unified experience without hiding provider differences
2. **Validation First** - Catch errors before expensive cloud API calls (Protocol Buffers)
3. **Simple > Sophisticated** - CLI + Pulumi/Terraform simpler than K8s operators
4. **80/20 Principle** - Focus on the 20% that 80% of teams need
5. **Open Source Community** - This is OSS, please contribute!

---

## Talk Adaptations

### If Time is Short (20 minutes)
- Skip detailed architecture deep-dives
- Focus on problem statement and high-level solutions
- Abbreviated Q&A

### If Time is Extended (45+ minutes)
- Include more live demonstrations
- Deeper technical details on implementation
- Extended case studies
- More Crossplane comparison details

### For Different Audiences

**More DevOps-focused:**
- Emphasize operational patterns
- Discuss observability and reliability
- Cover day-2 operations

**More Developer-focused:**
- Show developer experience improvements
- API design patterns
- Self-service workflows

**More Architecture-focused:**
- Deep-dive on system design
- Multi-tenancy patterns
- Scalability considerations

---

## Post-Talk

### Recording
- Happy to have the talk recorded
- Can share slides and materials openly
- Will promote recording on social media

### Follow-Up
- Available for 1-on-1 conversations after the talk
- Can stay for extended Q&A if there's interest
- Open to connecting attendees with relevant resources

### Materials to Share
- **GitHub:** github.com/project-planton/project-planton
- **Website:** planton.cloud
- **LinkedIn:** linkedin.com/in/swarupdonepudi

---

## Expected Outcomes

### For Attendees
- ✅ Understand Project Planton's value proposition
- ✅ See live demos of multi-cloud deployments
- ✅ Learn architectural patterns for platform engineering
- ✅ Compare different approaches (operators vs CLI)
- ✅ Know when to use what tool

### For Project Planton
- ✅ Generate awareness (50+ people learn about it)
- ✅ Drive GitHub stars (10+ within 1 week)
- ✅ Attract contributors (2-3 meaningful conversations)
- ✅ Get feedback on positioning and messaging

### For Personal Brand
- ✅ Establish credibility in CNCF community
- ✅ Create reusable content (recording, slides)
- ✅ Build network in Hyderabad tech ecosystem

---

## Logistics

### Travel
- Based in Hyderabad (local speaker)
- Can arrive early if needed for setup
- Flexible with timing

### Dietary Restrictions
- Vegetarian

### Contact
- **Email:** swarup@planton.cloud
- **LinkedIn:** linkedin.com/in/swarupdonepudi
- **Response time:** Usually within 24 hours

---

## Notes for Rohit

Hey Rohit! Looking forward to this event. A few things:

- This is my first CNCF meetup talk, so any advice on audience expectations would be helpful
- Happy to adjust content based on what the community is most interested in
- If there are specific topics folks have requested recently (Crossplane, multi-cloud, IaC), I can emphasize those
- The demos will be impressive if Wi-Fi works - but I have backups ready
- Let me know if you need anything else from me for the announcement or promotion

Thanks for organizing this event and giving me the opportunity to share Project Planton with the community!

---

**Why This Talk Works:**

1. **Demo-first approach** → Immediate value, not abstract concepts
2. **Clear differentiation** → Explains how it's different from Crossplane
3. **Architectural depth** → Appeals to technical CNCF audience
4. **Open source angle** → Invites community participation
5. **Practical lessons** → Based on real-world experience (10 years)
6. **No vendor pitch** → Educational, not sales-y
7. **Perfect timing** → OSS launch awareness

---

_Copy the version of the bio that fits best for the meetup announcement. The "Primary Bio" is recommended for full event pages, while the "Ultra-Short" works for social media._

_Last updated: November 23, 2025_
