// Stores the cached partial HTML pages.
// Keys correspond to the page URL.
// Values are the text content of each loaded partial HTML file.
export const pageCache: { [pageURL: string]: string } = {};
