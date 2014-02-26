function hook(original, wrapper) {
    return function() {
        wrapper.apply(this, arguments);
        return original.apply(this, arguments);
    };
}
var HightlightMenuActivatedFn = "z.uB";

var MediumClipper = {
    codeBlockIndex: 0,
    initialize: function () {
        var self = this;

        self.injectButtons();
        
        document.onmouseup = function () { self.injectButtons(); };
        $('div.footer-post-preview').on('click', '*', function () {
            var lastIcon = $('div.surface:last-child').find(".post-footer-secondary-actions .icons-facebook").parent();
            $('<a class="btn btn-chromeless corate-button" title="Share this post on CoRate"><span class="corate-icon"></span></a>')
           .insertAfter(lastIcon);
        });
        //setInterval(function () {
        //    //console.log(self);
        //    self.injectButtons();
        //}, 500);
        //if (z && z.UB) {
        //    z.UB = hook(z.UB, function() { self.injectButtons(); });
        //}
    },
    injectButtons: function () {

        var activeSurface = $('div.surface:visible');
        if (activeSurface.find('.highlight-menu-corate').length > 0)
            return;

        activeSurface.find('.highlight-menu-buttons').append('<li class="highlight-menu-button highlight-menu-corate"><button class="btn-highlight-menu corate-button"><span class="corate-icon">CoRate</span></button></li>');

        var lastIcon = activeSurface.find(".post-footer-secondary-actions .icons-facebook").parent();
        $('<a class="btn btn-chromeless corate-button" title="Share this post on CoRate"><span class="corate-icon"></span></a>')
            .insertAfter(lastIcon);
            

        $('.corate-button').on('click', function () {
            var selectionText = getSelectionText();
            if (selectionText.length > 140) {
                selectionText = selectionText.substring(0, 137) + "...";
            }
            alert(selectionText);
        });
        //console.log('check button: ' + $('.highlight-menu-corate').length > 0 ? 'exists' : 'not-exists');
    },
    wireMouseEvents: function () {

    },
    wireTooltip: function () {

    },
    wireClick: function () {

    }
};

function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type !== "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}

$(function () {

    MediumClipper.initialize();
});