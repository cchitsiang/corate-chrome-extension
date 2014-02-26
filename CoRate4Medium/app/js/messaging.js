// Message Passing
//////////////////
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {

        if (request.method === "getSelection") {
            sendResponse({ data: getSelectionText() });
        }

        // load storage
        if (request.action === "storage:load") {
            chrome.storage.sync.get(request.key, function () {
            });
        }

        // save storage
        if (request.action === "storage:save") {
            chrome.storage.sync.set({
                "value": request.value
            }, function () {
                sendResponse(true);
            });
        }

        // watch for iframe commands
        if (request.action === "inject:commandWatcher") {
            chrome.tabs.executeScript(sender.tab.id, {
                file: "javascript/watcher.js",
                allFrames: true
            });
        }

        // pass to iframe's parent
        if (request.action === "coRate:close") {
            chrome.tabs.sendMessage(sender.tab.id, {
                id: request.action
            });
        }

        // open dialog if not already open, refresh otherwise
        if (request.action === "coRate:openAndRefresh") {
            chrome.tabs.query({
                url: "*://app.corate.us/*"
            }, function (tabs) {
                if (tabs.length === 0) {
                    chrome.tabs.create({
                        url: "https://app.corate.us"
                    });
                } else {
                    var gistBoxTab = tabs[0];
                    chrome.tabs.update(gistBoxTab.id, {
                        active: true
                    });

                    var script = 'var evt = document.createEvent("HTMLEvents");' +
                        'evt.initEvent("click", true, true );' +
                        'document.getElementsByClassName("refresh-page")[0].dispatchEvent(evt);';

                    chrome.tabs.executeScript(gistBoxTab.id, {
                        code: script
                    });
                }
            });
        }
    }
);