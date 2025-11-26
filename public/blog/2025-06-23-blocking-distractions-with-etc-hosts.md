---
title: "Get rid of distractions w/ /etc/hosts and uninstalling apps on mobile"
date: "2025-06-23"
excerpt: "It has been a while since I published my last blog post. I have recently succumbed to the temptation of watching YouTube videos both on my phone and on the laptop. Here's how I reclaimed my focus using /etc/hosts and mobile app management."
featured_image: "/blog/images/2025-06-23-blocking-distractions-with-etc-hosts.cover.png"
author: "Swarup Donepudi"
tags: ["productivity", "personal", "focus", "discipline", "reflection"]
---

It has been a while since I published my last blog post. I have recently succumbed to the temptation of watching YouTube videos both on my phone and on the laptop. With all of the dedication and hard work that I'm putting into building out the product and going to market, I find myself glorifying all of my efforts and self-reward myself with some slack time. And I can't think of anything else to do other than two options:

1. Reading books
2. Watching YouTube videos

## The Problem: YouTube Replaced Books

I replaced book reading with YouTube video watching. Unlike reading books before going to bed, which actually helps with falling asleep more quickly, replacing that with watching YouTube videos before going to bed would actually delay your ability to fall asleep. Off late, it has gotten slightly difficult for me to get good quality of sleep because I sleep late, but I am trying to stick to my 3am schedule in the morning. Also, even during the breaks during the day, I replaced reading books with watching YouTube videos. And also YouTube has gotten a lot more interesting for me off-grid because of all the regional conflicts in various parts of the world, especially the conflict between Israel and Iran and the role of America because of my interest in geopolitics.

And yesterday I realized that I'm wasting all of this precious time by diverting my focus and energy on things that I absolutely have no control over and absolutely has zero value in learning about all of that stuff. In fact, watching all those bad things happen in different parts of the world takes away a lot of my focus time from what really matters - that is, making progress on finding traction vs. stuff that I have no control over and I have zero ability to create any impact.

## Learning from Past Success: The Chess.com Story

Having realized that yesterday being a fresh start to the week I wanted to address this somehow. In the past, I had built a pretty bad habit of opening up [chess.com](https://chess.com) and playing a quick 5-minute or even 1-minute game whenever I am under some sort of stress. So chess used to be a stress buster for me, but then it has also gotten to a point where I played more chess than I did work. What I did was add chess.com to the `/etc/hosts` file on my Mac, making it difficult for me to start a new game of chess. I did this almost a year ago. And the end result was that I have never played chess ever again after that. It's been almost a year since my last game.

## The Solution: Block YouTube Everywhere

I wanted to apply the same technique, but one difference is that YouTube is also on the mobile, and that's where I actually watch most of it. So, I did two things:

1. I added youtube.com to host file, so whenever I open up or type youtube.com in any of the browsers, it would simply redirect to the local host.
2. I removed or uninstalled YouTube from the mobile phone.

Here's what my `/etc/hosts` file looks like now:

![/etc/hosts file blocking distracting websites](/blog/images/2025-06-23-blocking-distractions-with-etc-hosts-1.png)

And when I try to visit YouTube in my browser, this is what I see:

![YouTube blocked in browser](/blog/images/2025-06-23-blocking-distractions-with-etc-hosts-2.png)

## The Results After 48 Hours

It's been close to 48 hours since I did that, and I don't have any cravings. I never felt like I want to watch a YouTube video because I know that it is difficult to do so, and the temptation is not high enough to go through those extra 2 steps to actually savor that temptation.

I have even resumed my book reading before going to bed last night, and I did that the choice was pretty effortless because I don't really have a second one. I resumed reading the "Sapiens" book and I actually started enjoying reading it. So I'm going to continue reading that book during the breaks that I take during the day time. I want to finish that book since I have been wanting to do so for a very very long time.

![Sapiens book - my current reading](/blog/images/2025-06-23-blocking-distractions-with-etc-hosts-3.png)

## A Testament to Removing Distractions

The fact that I am able to also publish this blog post is another testament to the benefits of removing the distractions from life which will naturally make place for more important things. So I'm really glad and proud of the choices and actions that I've taken to remove this useless habit of watching YouTube videos.

