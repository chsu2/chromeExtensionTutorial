let color = '#3aa757';
let color2 = '#000000';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color, color2 });
});