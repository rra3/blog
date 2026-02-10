---
title: "new blog!"
date: 2026-02-10T00:00:00Z
tags:
  - announcement
  - site-update
image: /images/claude.png
image_description: frollicking with claude
---

## hey hey hey

Aren't personal blogs so... early 2000's or something? Nevertheless, here I am. The truth is I had some down time and needed a project. The original plan was to construct this site using Next.js/React, maybe write some posts about "learnings" (a term from an old workpace) on LinkedIn as a means to hopefully garner some recruiter or network attention (I was out of work for much of 2024).

## architecture, such as it is

I started doing that, and was enjoying it, really. I discovered the Vercel platform which is where the site is currently. I liked how seamless it hooked into my github repo and automatically deployed my updates. Absolutely brain dead simple to set up. Everything with the site configuration has been impressively smooth. And I'm on the current "hobbyist" tier, so it's not costing me anything.

Recently though, this project has picked up steam since I've been playing with Claude Code to implement new site features. I have to admit, it's been fun to do - though the sheer ease and speed with which I'm able to complete site features and updates scares me a little as a developer. I had worked a little bit with AI assistants in my last job, but these new agentic assistants somehow bring the point home for me that it really is a brave new world now for us coders ...

For some reason I had this obstinate desire to not use a database backend. It just seemed needlessly complicated for a first iteration. So currently all posts are just simple markdown files that are included in my github repo. The initial index reads my list of markdown files and generates list of links with dates and titles from metadata held in some YAML based frontmatter embedded in each markdown file (one per post). Then I use the remark-html javascript tools to handle html'ifying each markdown file for the article view path.

In terms of the look and feel - I wannted something simple and raw, reminiscent of the old internet days of yore. Mark Fisher's k-punk site was a heavy influence.

## what is this about? audience?

What am I going to write here? Initially I just copied over a couple of posts I wrote a few years ago back when I was healing from wife's death - just some creative writing type projects that helped me process through those difficult years. I suppose that is what I will do going forward - not so much grief processing (though there may be that) but creative writing ideas - musings etc. Whatever floats my boat.

I had some thoughts to write about specific areas of interest - enneagram, meditation - but I'm considering spinning up something different and more focused for that.

Anyways this has been fun. Hopefully it doesn't become yet another abandoned project. As skeptical (if not fearful) as I find our current AI moment, it has allowed me to overcome some inertia that was starting to build in terms of delivering on this idea.

Hopefully the momentum continues!

## Notes

- [site code repo](https://github.com/rra3/blog)
- [Claude Code — AI coding assistant](https://claude.com/product/claude-code)
- [Next.js](https://nextjs.org/)
- [Vercel](https://vercel.com/)
- [remark-html](https://github.com/remarkjs/remark-html)
- [k-punk](https://k-punk.org/)
