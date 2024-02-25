const replace_text = () => {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, "");  
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