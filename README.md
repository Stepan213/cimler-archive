# archive.cimler.net

Static site built with [Eleventy](https://www.11ty.dev/), deployed to GitHub Pages on every push to `main`.

## Publish an article

1. Create `src/articles/YYYY-MM-DD-slug.md`:

   ```markdown
   ---
   title: My note
   date: 2026-10-15
   description: Optional one-line summary.
   ---
   Text in Markdown…
   ```

   It will be served at `https://archive.cimler.net/articles/slug/` (the date prefix is dropped from the URL).
   Add `draft: true` to keep it out of the build.

2. `git add . && git commit -m "Add my note" && git push` — live in about a minute.

## Preview locally

```sh
npm install
npm start   # http://localhost:8080/articles/
```
