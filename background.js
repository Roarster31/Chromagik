chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    
    if (request.action == "remove_cookies") {
      chrome.cookies.getAll({domain: ".chromatik.com"}, function(cookies) {
          console.log(cookies);
          for(var i=0; i<cookies.length;i++) {
              chrome.cookies.remove({url: "https://www.chromatik.com" + cookies[i].path, name: cookies[i].name});
          }
          console.log(sender.tab);
          chrome.tabs.sendMessage(sender.tab.id, {action: "cookies_removed", id: request.id});
      });
    }

  });