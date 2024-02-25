function sendMessageToTab(tabId, message) {
  return new Promise((resolve) => {
      chrome.tabs.sendMessage(tabId, message, resolve)
  })
}

const replace_text = () => {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    sendMessageToTab(tabs[0].id, "")
    });
}

chrome.runtime.onInstalled.addListener(() => {
  
  chrome.contextMenus.create({
    id: "translate",
    title: "Translate: %s",
    contexts: ["all"]
  });
  
})


chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId == "translate"){
    replace_text()
  }
});