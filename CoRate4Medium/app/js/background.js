(function () {
    var MediumClipper = {
        codeBlockIndex: 0,
        initialize: function () {
            var self = this;
            self.injectButtons();

            //setInterval(function () {
            // for ajax-y applications
            //     self.injectButtons();
            //}, 1000);
        },
        injectButtons: function () {
          
        },
        wireMouseEvents: function () {

        },
        wireTooltip: function () {

        },
        wireClick: function ($codeGrabber) {

        }
    };
    // Context Menu
    //////////////////
    function createPageContextMenu() {
        chrome.contextMenus.create({
            type: "normal",
            title: "Save to CoRate",
            contexts: ["page"],
            onclick: function (info, tab) {
                chrome.tabs.sendMessage(tab.id, {
                    id: "contextMenu:saveToCoRate",
                    data: {
                        url: info.pageUrl,
                        content: ""
                    }
                });
            }
        });
    }

    function createSelectionContextMenu() {
        chrome.contextMenus.create({
            type: "normal",
            title: "Save to CoRate",
            contexts: ["selection"],
            onclick: function (info, tab) {
                chrome.tabs.sendMessage(tab.id, {
                    id: "contextMenu:saveToCoRate",
                    data: {
                        url: info.pageUrl,
                        content: info.selectionText
                    }
                });
            }
        });
    }
    
    createPageContextMenu();
    createSelectionContextMenu();
    
    var app = app || {};
    var $body = $("body");

    if ($body.attr("data-corate-initialized"))
        return;

    $body.attr("data-corate-initialized", true);

    //app.mediumClipper = new MediumClipper();

    // Browser Action
    //////////////////
    chrome.browserAction.onClicked.addListener(function (tab) {
        chrome.tabs.sendRequest(tab.id, { method: "getSelection" }, function (response) {
            chrome.tabs.executeScript(tab.id, {
                code: "alert('" + response.data + "');"
            });
        });
    });
    
    // Tutorial
    //////////////////
    function startClipperTutorial() {
        // only happens once per install
        if (!localStorage["clipperTutorialStarted"]) {
            localStorage["clipperTutorialStarted"] = true;
            chrome.tabs.create({
                url: "http://www.corate.us/clipper-tutorial"
            });
        }
    }

    startClipperTutorial();
})();
