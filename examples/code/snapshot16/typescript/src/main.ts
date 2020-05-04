// FragmentId type to constrain acceptable has values.
type FragmentId = "home" | "about" | "contact";

// Gets the appropriate content for the given fragment identifier.
function getContent(fragmentId: FragmentId) {
  // Content for each navigation link.
  const partials = {
    home: "This is the Home page. Welcome to my site.",
    about: "This is the About page.",
    contact: "This is the Contact page.",
  };

  // Look up the partial for the given fragment identifier.
  return partials[fragmentId];
}

// Updates dynamic content based on the fragment identifier.
function navigate() {
  // Get a reference to the "content" div.
  const contentDiv = document.querySelector("#content") as HTMLDivElement;

  // Isolate the fragment indentifier using substr.
  // This gets rid of the "#" character.
  const fragmentId = location.hash.substr(1) as FragmentId;

  // Set the "content" div content based on the fragment identifier
  contentDiv.textContent = getContent(fragmentId);
}

// If no fragment identifier is provided.
if (!location.hash) {
  location.hash = "#home";
}

// Navigate once to the initial hash value.
navigate();

// Navigate whenever the fragment identifier value changes.
window.addEventListener("hashchange", navigate);
