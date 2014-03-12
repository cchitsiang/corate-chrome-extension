function hook(original, wrapper) {
    return function () {
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
    },
    injectButtons: function () {

        var activeSurface = $('div.surface:visible');
        if (activeSurface.find('.highlight-menu-corate').length > 0)
            return;

        activeSurface.find('.highlight-menu-buttons').append('<li class="highlight-menu-button highlight-menu-corate"><button class="btn-highlight-menu corate-button"><span class="corate-icon">CoRate</span></button></li>');

        if (activeSurface.find('.share-on-corate').length == 0) {
            var lastIcon = activeSurface.find(".post-footer-secondary-actions .icons-facebook").parent();
            $('<a class="btn btn-chromeless share-on-corate" title="Share this post on CoRate"><span class="corate-icon"></span></a>')
                .insertAfter(lastIcon);
        }

        $('.corate-button').on('click', function () {
            var selectionText = getSelectionText();
            if (selectionText.length > 140) {
                selectionText = selectionText.substring(0, 137) + "...";
            }
            alert(selectionText);
        });

        $('.post-footer, .post-to-post, .post-to-post-icon').on('click', function () {
            var lastSurface = $('div.surface:last-child');
            if (lastSurface.find('.share-on-corate').length > 0) return;
            var lastIcon = lastSurface.find(".post-footer-secondary-actions .icons-facebook").parent();
            $('<a class="btn btn-chromeless share-on-corate" title="Share this post on CoRate"><span class="corate-icon"></span></a>')
                .insertAfter(lastIcon);
        });
        
        //Footer Share Button
        $('.share-on-corate').on('click', function () {
            var overlay = $('<div class="overlay"><button class="overlay-close" data-action="overlay-close">×</button></div>')
                .append('<div class="overlay-dialog  overlay-dialog-form" tabindex="-1"><h3 class="overlay-title">CoRate this article</h3><div class="overlay-content">' + getShareDlgContent() + '</div><div class="overlay-actions"><button class="btn btn-primary btn-overlay-confirm yellow" data-action="overlay-submit">CoRate</button><button class="btn overlay-cancel" data-action="overlay-cancel">Cancel</button></div></div>')
                .on('click', function (e) { e.target == this && $(this).remove(); });
            overlay.find('.overlay-close, .overlay-cancel').on('click', function () {
                $(this).closest('.overlay').remove();
            });
            overlay.appendTo('body');
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

function getShareDlgContent() {
    return '<div class="email-share-form">' +
        '<div class="email-address-error-message"></div>' +
        '<div class="share-comment"><textarea class="textarea-seamless sender-comment overlay-form-text-input" placeholder="Do you want to add notes?"></textarea><div class="share-post-data">' + getPostData() + '</div>' +
        '</div>' +
        '</div>';
}

function getPostData() {
    var activeSurface = $('div.surface:visible');
    var authorHyperlink = activeSurface.find('.card-user > .card-image a').parent().html().replace(/190/g, "40").replace('class="card-avatar"', '');
    var title = activeSurface.find('.post-header .post-title').html();
    var subtitle = activeSurface.find('.post-header .subtitle').html();
    return '<div class="post-author-image-container">' + authorHyperlink + '</div>'
        + '<div class="share-post-text-container"><div class="share-post-text">'
        + '<div class="share-post-title">' + title + '</div>'
        + '<div class="share-post-subtitle">' + subtitle + '</div>'
        + '</div></div>';
}

function submitCoRate() {

}

function cancelCoRate() {
    $('.overlay').remove();
}

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
    //setTimeout(function () {
    //    $('.post-to-post-icon').on('click', function () {
    //        var lastIcon = $('div.surface:last-child').find(".post-footer-secondary-actions .icons-facebook").parent();
    //        $('<a class="btn btn-chromeless corate-button" title="Share this post on CoRate"><span class="corate-icon"></span></a>')
    //            .insertAfter(lastIcon);
    //    });
    //}, 1000);

});