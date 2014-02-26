(function () {
    
    var $body = $("body");

    if ($body.attr("data-corate-initialized"))
        return;

    $body.attr("data-corate-initialized", true);
    
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
