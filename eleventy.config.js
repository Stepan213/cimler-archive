export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/CNAME");
  eleventyConfig.addPassthroughCopy("src/css");

  // Skip posts marked `draft: true`
  eleventyConfig.addPreprocessor("drafts", "*", (data) => {
    if (data.draft) return false;
  });

  // A line like "12. května …" is a Czech date, not an ordered list item.
  // Escape the dot when a lowercase word follows; "1. Capitalised" stays a list.
  eleventyConfig.addPreprocessor("czech-dates", "md", (data, content) =>
    content.replace(/^( {0,3})(\d{1,4})\.(?= +\p{Ll})/gmu, "$1$2\\.")
  );

  eleventyConfig.addFilter("readableDate", (d, lang = "en") =>
    new Date(d).toLocaleDateString(lang === "cs" ? "cs-CZ" : "en-GB", {
      day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
    })
  );
  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString());
  eleventyConfig.addFilter("readingTime", (html, lang = "en") => {
    const words = String(html).replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
    const min = Math.max(1, Math.round(words / 200));
    return lang === "cs" ? `${min} min čtení` : `${min} min read`;
  });

  return {
    dir: { input: "src", includes: "_includes", output: "_site" },
    markdownTemplateEngine: "njk",
  };
}
