// Updates dynamic content based on the fragment identifier.
function navigate() {
  // Get a reference to the "content" div.
  const contentDiv = document.querySelector("#content") as HTMLDivElement;

  // Set the "content" div to contain the current hash value.
  contentDiv.textContent = location.hash.substr(1);
}

// If no fragment identifier is provided.
if (!location.hash) {
  location.hash = "#home";
}

// Navigate once to the initial hash value.
navigate();

// Navigate whenever the fragment identifier value changes.
window.addEventListener("hashchange", navigate);
