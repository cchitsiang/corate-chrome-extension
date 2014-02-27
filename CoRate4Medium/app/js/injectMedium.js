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
        
        //document.onmouseup = function () { self.injectButtons(); };
        document.addEventListener("DOMSubtreeModified", function (event) {
            self.injectButtons();
            
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
        var needInject = false;
        var activeSurface = $('div.surface:visible');
        if (activeSurface.find('.highlight-corate-button').length === 0)
        {
            needInject = true;
            activeSurface.find('.highlight-menu-buttons').append('<li class="highlight-menu-button highlight-menu-corate"><button class="btn-highlight-menu highlight-corate-button"><span class="corate-icon">CoRate</span></button></li>');
            $('.highlight-corate-button').click(function () {
                var selectionText = getSelectionText();
                if (selectionText.length > 140) {
                    selectionText = selectionText.substring(0, 137) + "...";
                }
                alert(selectionText);
            });
        }

        if (activeSurface.find('.post-footer-secondary-actions .footer-corate-button').length === 0)
        {
            needInject = true;
            var lastIcon = activeSurface.find(".post-footer-secondary-actions .icons-facebook").parent();
            $('<a class="btn btn-chromeless footer-corate-button" title="Share this post on CoRate"><span class="corate-icon"></span></a>')
                .insertAfter(lastIcon);
            $('.footer-corate-button').click(function () {
                var selectionText = getSelectionText();
                if (selectionText.length > 140) {
                    selectionText = selectionText.substring(0, 137) + "...";
                }
                alert(selectionText);
            });
        }

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

   
    //$('a.post-item-snippet').on("click", function () { alert('test'); });
    //$('div.footer-post-preview').on('click', '*', function () {
    //    var lastIcon = $('div.surface:last-child').find(".post-footer-secondary-actions .icons-facebook").parent();
    //    $('<a class="btn btn-chromeless corate-button" title="Share this post on CoRate"><span class="corate-icon"></span></a>')
    //   .insertAfter(lastIcon);
    //});

    //var actualCode = '(' + function () {
    //    $(document).ajaxComplete(function () {
    //        alert('content has just been changed, you should change href tag again');
    //        // chaging href tag code will be here      
    //    });
    //} + ')();';
    //var script = document.createElement('script');
    //script.textContent = actualCode;
    //(document.head || document.documentElement).appendChild(script);
    //script.parentNode.removeChild(script);

});