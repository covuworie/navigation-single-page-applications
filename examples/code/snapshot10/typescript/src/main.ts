// Listen for fragment identifier value changes.
window.addEventListener("hashchange", () => {
  // Get a reference to the "content" div.
  const contentDiv = document.querySelector("#content") as HTMLDivElement;

  // Set the "content" div to contain the current hash value.
  contentDiv.textContent = location.hash;
});
