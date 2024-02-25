const translate = async (text) => {
  const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&dt=bd&dj=1&q=${text}`, {
    method: 'POST'
  });
  const myJson = await response.json(); //extract JSON from the http response
  // do something with myJson
  return JSON.stringify(myJson['sentences'][0]["trans"], null, '\t');
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  selection = document.getSelection();

  if (selection) {
    for (i=0; i<selection.rangeCount; i++)  {
        range = selection.getRangeAt(i);
        if (range) {
            translate(range.startContainer.parentNode.textContent).then((x) => {
              range.startContainer.parentNode.textContent = x.replace(/['"]+/g, '')
            })
        }
    }
}

  return true;
});