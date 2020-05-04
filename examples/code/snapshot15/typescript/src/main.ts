// Gets the appropriate content for the given fragment identifier.
function getContent(fragmentId: string) {
  return fragmentId;
}

// Updates dynamic content based on the fragment identifier.
function navigate() {
  // Get a reference to the "content" div.
  const contentDiv = document.querySelector("#content") as HTMLDivElement;

  // Isolate the fragment indentifier using substr.
  // This gets rid of the "#" character.
  const fragmentId = location.hash.substr(1);

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
