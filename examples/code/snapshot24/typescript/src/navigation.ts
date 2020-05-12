// This module implements simple routing by loading partial HTML files
// named corresponding to the page names.

// Put everything in modules so that no global variables are introduced.
import { pageCache } from "./page.js";
import { Content } from "./content.js";

// Store the document title
const TITLE = document.querySelector("title")!.textContent;

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

// Gets the appropriate content for the given page identifier.
// This function implements a simple cache.
function getContent(page: string, callback: Content) {
  // If the page has been fetched before,
  if (page in pageCache) {
    // pass the previously fetched page to the callback.
    callback(pageCache[page]);
  } else {
    // If the page has not been fetched before, fetch it.
    fetchFile(page, (content: string) => {
      // Store the fetched content in the cache.
      pageCache[page] = content;

      // Pass the newly fetched content to the callback.
      callback(content);
    });
  }
}

// Sets the "active" class on the active navigation link.
function setActiveLink(href: string) {
  const links = document.querySelectorAll("#navbar a");
  for (let i = 0; i < links.length; i++) {
    const pageName = links[i].getAttribute("href");
    if (pageName === href) {
      links[i].classList.add("active");
    } else {
      links[i].removeAttribute("class");
    }
  }
}

// Add event listeners to each navigation link.
function addEventListeners() {
  const links = document.querySelectorAll("#navbar a");
  links.forEach((link) => {
    link.addEventListener("click", navigate);
  });
}

// Updates dynamic content based on the href identifier.
function navigate(event: Event) {
  // Prevent default behavior which is to refresh the page
  event.preventDefault();

  // Isolate the href attribute
  const href = (event.target as HTMLLinkElement).getAttribute("href")!;

  // Swap the page
  swapPage(href);

  // Add a state to the browser's session history stack
  pushState(href);
}

// Add a state to the browser's session history stack
function pushState(href: string) {
  const url = href.split(".html")[0];
  const state = { url: url };
  history.pushState(state, state.url, url);
}

function swapPage(href: string) {
  // Get a reference to the "content" div.
  const contentDiv = document.querySelector("#content") as HTMLDivElement;

  // Set the "content" div content based on the href
  getContent(href, (content: string) => {
    contentDiv.innerHTML = content;
  });

  // Toggle the "active" class on the link currently navigated to.
  setActiveLink(href);

  // Add some "sugar" by excluding the file extension and adding the title
  const path = href.split(".html")[0];
  document.title =
    TITLE + ": " + path.substr(0, 1).toUpperCase() + path.substr(1);
}

// Add event listeners
addEventListeners();

// Navigate whenever a page is loaded (handles initial loading and direct URL navigation)
window.addEventListener("load", function (event: Event) {
  // Navigate once to the initial home page.
  if (location.pathname === "/") {
    // Swap the page
    const href = "home.html";
    swapPage(href);

    // Add a state to the browser's session history stack
    pushState(href);
    return;
  }

  // Direct navigation.

  // Prevent default behavior which is to refresh the page
  event.preventDefault();

  // Swap the page
  swapPage(`${location.pathname}.html`);
});

// Navigate when a browser action is taken such as pressing the back or forward buttons
window.addEventListener("popstate", (event: PopStateEvent) => {
  // Ignore if we are at the root
  if (location.pathname === "/") {
    return;
  }

  // Prevent default behavior which is to refresh the page
  event.preventDefault();

  // Swap the page
  swapPage(`${location.pathname}.html`);
});
