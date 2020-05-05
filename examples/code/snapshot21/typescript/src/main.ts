// A global variable for storing the cached partial HTML pages.
let partialsCache: { [fragmentId: string]: string } = {};

// Interface for XMLHttpRequest content
interface Content {
  (content: string): void;
}

// Encapsulates a HTTP GET request using XMLHttpRequest.
// Fetches the file at the given path, then
// calls the callback with the text content of the file.
function fetchFile(path: string, callback: Content) {
  // Create a new AJAX request for fetching the partial HTML file.
  const request = new XMLHttpRequest();

  // Call the callback with the content loaded from the file.
  request.addEventListener("load", () => {
    callback(request.responseText);
  });
  // This also works.
  // request.onload = () => {
  //   callback(request.responseText);
  // };

  // Fetch the partial HTML file for the given fragment identifier.
  request.open("GET", path);
  request.send();
}

// FragmentId type to constrain acceptable values.
type FragmentId = "home" | "about" | "contact";

// Gets the appropriate content for the given fragment identifier.
// This function implements a simple cache.
function getContent(fragmentId: FragmentId, callback: Content) {
  // If the page has been fetched before,
  if (fragmentId in partialsCache) {
    // pass the previously fetched page to the callback.
    callback(partialsCache[fragmentId]);
  } else {
    // If the page has not been fetched before, fetch it.
    const path = `../${fragmentId}.html`;
    fetchFile(path, (content: string) => {
      // Store the fetched content in the cache.
      partialsCache[fragmentId] = content;

      // Pass the newly fetched content to the callback.
      callback(content);
    });
  }
}

// Sets the "active" class on the active navigation link.
function setActiveLink(fragmentId: FragmentId) {
  const links = document.querySelectorAll("#navbar a");
  for (let i = 0; i < links.length; i++) {
    const pageName = links[i].getAttribute("href")!.substr(1);
    if (pageName === fragmentId) {
      links[i].classList.add("active");
    } else {
      links[i].removeAttribute("class");
    }
  }
}

// Updates dynamic content based on the fragment identifier.
function navigate() {
  // Get a reference to the "content" div.
  const contentDiv = document.querySelector("#content") as HTMLDivElement;

  // Isolate the fragment indentifier using substr.
  // This gets rid of the "#" character.
  const fragmentId = location.hash.substr(1) as FragmentId;

  // Set the "content" div content based on the fragment identifier
  getContent(fragmentId, (content: string) => {
    contentDiv.innerHTML = content;
  });

  // Toggle the "active" class on the link currently navigated to.
  setActiveLink(fragmentId);
}

// If no fragment identifier is provided.
if (!location.hash) {
  location.hash = "#home";
}

// Navigate once to the initial hash value.
navigate();

// Navigate whenever the fragment identifier value changes.
window.addEventListener("hashchange", navigate);
