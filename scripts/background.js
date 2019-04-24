chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  switch (request.method) {
    case 'getLength':
      sendResponse({ data: localStorage.length });
      break;
    case 'getKeyName':
      sendResponse({ data: localStorage.key(request.number) });
      break;
    case 'getItem':
      sendResponse({ data: localStorage.getItem(request.key) });
      break;
    case 'setItem':
      sendResponse({ data: localStorage.setItem(request.key, request.value) });
      break;
    case 'removeItem':
      sendResponse({ data: localStorage.removeItem(request.key) });
      break;
    case 'clearAll':
      sendResponse({ data: localStorage.clear() });
      break;
    default:
      console.log('no method');
      break;
  }
});