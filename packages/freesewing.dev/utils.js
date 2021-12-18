const taglines = [
  "Come in, we're open",
  "This website does not track you",
  "Developer documentation",
  "Documentation for contributors",
  "API reference",
  "Tutorials to get you started",
]

export const getTagline = () => taglines[Math.floor(Math.random()*taglines.length)];

