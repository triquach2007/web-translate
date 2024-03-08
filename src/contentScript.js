const translate = async (text) => {
  const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&dt=bd&dj=1&q=${text}`, {
    method: 'POST'
  });
  const myJson = await response.json(); //extract JSON from the http response
  // do something with myJson
  return JSON.stringify(myJson['sentences'][0]["trans"], null, '\t');
}

async function modifyText(node) {
  if (node.nodeType === 3) { // Text node
      var originalText = node.nodeValue;
      
      if (originalText.trim() !== '') {
          // Add the letter "a" to the end of non-empty text content
          var modifiedText = await translate(originalText).then();
          
          // Replace the original text content with the modified text
          node.nodeValue = modifiedText.replace(/['"]+/g, '');
      }
  } else if (node.nodeType === 1) { // Element node
      // Recursively modify text content for child elements
      node.childNodes.forEach(modifyText);
  }

  await new Promise(r => setTimeout(r, 200));
}

var observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
      if (mutation.type === 'childList') {
          // If child nodes are added, modify their text content
          mutation.addedNodes.forEach(modifyText);
      }
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  modifyText(document.body);
  observer.observe(document.body, { childList: true, subtree: true });

  return true;
});