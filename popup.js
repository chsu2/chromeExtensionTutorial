// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");
let changeColor2 = document.getElementById("changeColor2");

chrome.storage.sync.get(["color", "color2"], ({ color, color2 }) => {
  changeColor.style.backgroundColor = color;
  changeColor2.style.backgroundColor = color2;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true});

  changeBackgroundColor(tab, changeColor);
});

changeColor2.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true});

  changeBackgroundColor(tab, changeColor2);
});

function changeBackgroundColor(tab, selector) {
  let color = selector.style.backgroundColor;

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
    args: [ color ]
  });
}

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor(color) {
    document.body.style.backgroundColor = color;
}