---
title: "37Signals in Datacenter"
date: "2025-03-18"
excerpt: "37signals moved their apps out of the cloud and back to datacenters in 2023. Their journey and the open-source tool Kamal offer interesting insights for platform builders."
featured_image: "/blog/images/2025-03-18-37-signals-de-cloud.cover.png"
author: "Swarup Donepudi"
tags: ["cloud", "datacenter", "infrastructure", "37signals", "kamal"]
---

I knew this. Considering the emphasis Jason put on being cost-effective, it is imperative for them to operate in a datacenter. I was right. Their ops team published [37signals Dev — De-cloud and de-k8s — bringing our apps back home](https://dev.37signals.com/bringing-our-apps-back-home/), explaining their journey to move out of cloud in 2023.

![37signals de-cloud journey](/blog/images/2025-03-18-37-signals-de-cloud.png)

While reading up that blog post, I came across a potential open source version of PlantonCloud that they have built internally to orchestrate their deployments to the VMs in the datacenter the old school way. It's called [github.com/basecamp/kamal](https://github.com/basecamp/kamal). Gaining traction for any initiative started by the creator of Rails would obviously be far easier as he already has a ton of audience.

## Ansible Provisioner in ProjectPlanton

After reading up about 37signals' journey of migrating off of cloud and back into the data center, I gave a few minutes to think about how we can make sure that the platform we're building supports such migrations back into the data center. 

Inherently, there is nothing that ties Planton Cloud to any of the cloud providers per se. This system is designed to work with any provisioners and provide the ability to map templates or modules for the provisioners and also capture inputs from the users and kick off the provisioning workflows with the inputs to the right module. This remains to be the central design behind the provisioning automation that we have today. 

So, we could very well add Ansible as another provisioner to provision virtual machines in a data center and also configure the operating system to install packages using Ansible modules. And then probably provide features around maintaining the inventory of the static virtual machine infrastructure as another API resource on our system. Also add the ability or support storing SSH credentials in our credential system. In a way, this emulates the Ansible Tower design. 

While we do not intend to rebuild or support every tiny feature that Ansible Tower already does, our approach is to provide the basic tools that 80% of the people would need in a single platform. This is definitely an exciting idea that I would like to pursue in the future. 

If I can figure out a way to capture the events that Ansible emits during its execution and figure out a way to transmit those events into our system, and figure out the data model to be able to finally display that information on the UI. These are the things that I need to figure out, and these are the things that I have already done for Pulumi and Terraform.
