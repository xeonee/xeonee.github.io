# Amardeep Chaubey — Portfolio & Blog

A personal portfolio and technical blog with a terminal-inspired theme, built with
[Jekyll](https://jekyllrb.com/) and deployed on GitHub Pages.

## Publishing a blog post

1. Create a file in `_posts/` named `YYYY-MM-DD-title.md`.
2. Add front matter, then write in Markdown:

   ```markdown
   ---
   layout: post
   title: "Your Post Title"
   date: 2026-07-20 09:00:00 +0100
   category: Spark
   read_time: "5 min read"
   description: "One-line summary used for SEO and the blog list."
   ---

   Your content here. Fenced code blocks get syntax highlighting:

   ` ``scala
   val df = spark.read.parquet("s3://bucket/events")
   ` ``
   ```

3. Commit and push. GitHub Pages rebuilds automatically, and the post appears
   at `/blog/your-post-title/` and in the list on `/blog.html` — no HTML to edit.

## Project structure

```
├── _config.yml          # Site config (title, author, URLs, build settings)
├── _includes/           # Shared partials: head, nav, footer
├── _layouts/            # default.html (page shell) + post.html (blog posts)
├── _posts/              # Blog posts as Markdown — add files here
├── index.html           # Home
├── about.html           # About
├── resume.html          # Resume  (Download PDF -> Amardeep_Chaubey_CV_2026.pdf)
├── blog.html            # Blog index (auto-lists _posts)
├── css/style.css        # Terminal theme + post/syntax-highlight styles
├── js/script.js         # Mobile nav + scroll reveal
└── images/              # favicon.svg, avatar.svg
```

## Running locally

Requires Ruby 3.0+ (the system Ruby on older macOS is too old for current Jekyll).

```bash
bundle install
bundle exec jekyll serve
# open http://localhost:4000
```

## Deploying to GitHub Pages

- Push to a GitHub repo. In **Settings → Pages**, set **Source: Deploy from a branch**
  (`main` / root). GitHub builds the Jekyll site automatically.
- If the repo is named `xeonee.github.io`, the site serves at the domain root and
  `baseurl` stays empty in `_config.yml`.
- For a project repo (e.g. `portfolio`), set `baseurl: "/portfolio"` in `_config.yml`
  so asset and page links resolve correctly.
