# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static terminal-style personal website for Vedant Jumle, an AI researcher. The site simulates a Unix terminal interface with command-line interactions, while also providing a traditional list view and progressive enhancement for accessibility and SEO.

**Domain**: vedantjumle.com (configured via CNAME)
**Hosting**: GitHub Pages

## Architecture

### Three-File Core Architecture

1. **[index.html](index.html)** - Structure and SEO
   - Contains semantic HTML with fallback navigation for no-JS scenarios
   - Includes meta tags for SEO and social sharing (Open Graph, Twitter Cards)
   - References Plausible Analytics for privacy-focused tracking
   - Defines both terminal UI and list view container
   - Progressive enhancement: works without JavaScript via hash navigation

2. **[content.js](content.js)** - Data layer
   - Single source of truth for all site content
   - Structured data object with sections: about, cv, projects, research, blog, contact
   - Projects and research items have slugs for URL routing
   - To update content, edit this file only

3. **[script.js](script.js)** - Terminal emulator and UI logic
   - Implements terminal command parser and command history
   - Tab completion for commands and arguments
   - Arrow key navigation through command history
   - Hash-based routing (#/section/slug) for deep linking
   - Two view modes: terminal and list view
   - Theme toggle (dark/light)

### Command System

Available terminal commands:
- `help` - List all commands
- `ls [section]` - List sections or items within a section
- `open <name>` - Open a section, project, research paper, or blog post by slug
- `clear` - Clear terminal output
- `feedback` - Opens email to send feedback
- `list` - Toggle between terminal and list view
- `theme` - Toggle dark/light theme

### Content Structure

Content sections:
- `about` - String bio
- `cv` - Object with description and PDF link
- `projects` - Array of objects with: slug, title, desc, stack, repo, demo
- `research` - Array of objects with: slug, title, desc, link
- `blog` - Array of objects with: slug, title, link
- `contact` - Object with: email, github, linkedin

### Hybrid View System

The site supports two viewing modes:

1. **Terminal Mode** (default): Command-line interface with Unix-style interaction
2. **List View**: Traditional card-based layout with all content visible, rendered via `renderListView()` function

Both views share the same data from [content.js](content.js).

## Development Workflow

### Making Content Changes

1. Edit [content.js](content.js) to update bio, add/remove projects, update contact info
2. Test locally by opening [index.html](index.html) in a browser
3. Commit and push to deploy (GitHub Pages auto-deploys from main branch)

### Testing

No build process required. Test by:
1. Opening [index.html](index.html) in a web browser
2. Testing terminal commands: help, ls, open, clear
3. Testing hash navigation: visit URLs like `#about`, `#projects/buzztrends`
4. Testing list view toggle
5. Testing theme toggle
6. Testing with JavaScript disabled (should show fallback navigation)

### Deployment

This is a static site hosted on GitHub Pages:
- Push to main branch to deploy
- GitHub Pages serves the site at the custom domain configured in CNAME
- No build step required

### Adding New Content Types

To add a new content section:
1. Add the section name to `content.sections` array in [content.js](content.js)
2. Add the section data to the `content` object in [content.js](content.js)
3. Add command handling logic in the `handleCommand()` switch statement in [script.js](script.js)
4. Update `renderListView()` to display the new section in list view

## Files

- [index.html](index.html) - Main HTML structure
- [content.js](content.js) - Content data (edit this to update site content)
- [script.js](script.js) - Terminal emulator and interaction logic
- [style.css](style.css) - Styling for terminal and list views
- [cv.pdf](cv.pdf) - CV file (replace to update)
- [CNAME](CNAME) - Custom domain configuration
- [sitemap.xml](sitemap.xml) - SEO sitemap

## Key Features

- **Terminal emulation**: Command history, tab completion, arrow key navigation
- **URL routing**: Hash-based routing allows direct links to specific content
- **Progressive enhancement**: Works without JavaScript via semantic HTML
- **Accessibility**: ARIA labels, keyboard navigation, semantic HTML
- **SEO optimized**: Meta tags, sitemap, fallback navigation, semantic structure
- **Privacy-focused analytics**: Plausible Analytics (not Google Analytics)
- **Responsive**: Works on mobile and desktop
- **Theme toggle**: Dark/light mode support
