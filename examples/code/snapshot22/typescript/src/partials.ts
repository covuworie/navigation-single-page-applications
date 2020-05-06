// FragmentId type to constrain acceptable values.
export type FragmentId = "home" | "about" | "contact";

// Stores the cached partial HTML pages.
// Keys correspond to the fragment identifiers.
// Values are the text content of each loaded partial HTML file.
export const partialsCache: { [fragmentId: string]: string } = {};
