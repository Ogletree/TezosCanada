// To connect js scripts used plugin rigger included
// Connection occurs through the design //= folder-name/file-name.js
//-------- -------- -------- --------
//-------- included js libs end
//-------- -------- -------- --------
//-------- -------- -------- --------
//-------- js custom start
//-------- -------- -------- --------
function copyClipboard() {
    document.querySelector(".js-textareacopybtn").addEventListener("click", function(event) {
        var copyTextarea = document.querySelector(".js-copytextarea");
        copyTextarea.focus(), copyTextarea.select();
        try {
            var successful = document.execCommand("copy");
            alert("Copying text command was " + (successful ? "successful" : "unsuccessful"));
        } catch (err) {
            alert("Oops, unable to copy");
        }
    });
}

function collapseBlock() {
    $(".collapse-block .block-header").click(function() {
        $(this).parent(".collapse-block").toggleClass("close");
    });
}

function header(scrollPos) {
    1 < scrollPos ? $("header").addClass("fixed") : $("header").removeClass("fixed");
}

function scrollAnimation() {
    jQuery(".section").addClass("hidden").viewportChecker({
        classToAdd: "visible animated fadeInUp",
        offset: 300
    });
}

//-------- -------- -------- --------
//-------- js custom end
//-------- -------- -------- --------
jQuery(document).ready(function() {
    collapseBlock(), header($(window).scrollTop()), scrollAnimation(), copyClipboard(), 
    $(window).scroll(function() {
        header($(window).scrollTop());
    });
}), 
//-------- -------- -------- --------
//-------- included js libs start
//-------- -------- -------- --------
// just an example - how to connect library files such as slider, picturefill и other large js files
// It is not necessary to work with js as before just keep in mind there is such an opportunity
/*
The MIT License (MIT)

Copyright (c) 2014 Dirk Groenen

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
*/
function($) {
    $.fn.viewportChecker = function(useroptions) {
        // Define options and extend with user
        var options = {
            classToAdd: "visible",
            classToRemove: "invisible",
            classToAddForFullView: "full-visible",
            removeClassAfterAnimation: !1,
            offset: 100,
            repeat: !1,
            invertBottomOffset: !0,
            callbackFunction: function(elem, action) {},
            scrollHorizontal: !1,
            scrollBox: window
        };
        $.extend(options, useroptions);
        // Cache the given element and height of the browser
        var $elem = this, boxSize = {
            height: $(options.scrollBox).height(),
            width: $(options.scrollBox).width()
        };
        /*
		 * Main method that checks the elements and adds or removes the class(es)
		 */        
        // Default jquery plugin behaviour
        return this.checkElements = function() {
            var viewportStart, viewportEnd;
            // Set some vars to check with
                        viewportEnd = options.scrollHorizontal ? (viewportStart = Math.max($("html").scrollLeft(), $("body").scrollLeft(), $(window).scrollLeft())) + boxSize.width : (viewportStart = Math.max($("html").scrollTop(), $("body").scrollTop(), $(window).scrollTop())) + boxSize.height, 
            // Loop through all given dom elements
            $elem.each(function() {
                var $obj = $(this), objOptions = {}, attrOptions = {};
                //  Get any individual attribution data
                                // If class already exists; quit
                if ($obj.data("vp-add-class") && (attrOptions.classToAdd = $obj.data("vp-add-class")), 
                $obj.data("vp-remove-class") && (attrOptions.classToRemove = $obj.data("vp-remove-class")), 
                $obj.data("vp-add-class-full-view") && (attrOptions.classToAddForFullView = $obj.data("vp-add-class-full-view")), 
                $obj.data("vp-keep-add-class") && (attrOptions.removeClassAfterAnimation = $obj.data("vp-remove-after-animation")), 
                $obj.data("vp-offset") && (attrOptions.offset = $obj.data("vp-offset")), $obj.data("vp-repeat") && (attrOptions.repeat = $obj.data("vp-repeat")), 
                $obj.data("vp-scrollHorizontal") && (attrOptions.scrollHorizontal = $obj.data("vp-scrollHorizontal")), 
                $obj.data("vp-invertBottomOffset") && (attrOptions.scrollHorizontal = $obj.data("vp-invertBottomOffset")), 
                // Extend objOptions with data attributes and default options
                $.extend(objOptions, options), $.extend(objOptions, attrOptions), !$obj.data("vp-animated") || objOptions.repeat) {
                    // Check if the offset is percentage based
                    0 < String(objOptions.offset).indexOf("%") && (console.log("if string"), objOptions.offset = parseInt(objOptions.offset) / 100 * boxSize.height);
                    // Get the raw start and end positions
                                        var rawStart = objOptions.scrollHorizontal ? $obj.offset().left : $obj.offset().top, rawEnd = objOptions.scrollHorizontal ? rawStart + $obj.width() : rawStart + $obj.height(), elemStart = Math.round(rawStart) + objOptions.offset, elemEnd = objOptions.scrollHorizontal ? elemStart + $obj.width() : elemStart + $obj.height();
                    // Add the defined offset
                                        objOptions.invertBottomOffset && (elemEnd -= 2 * objOptions.offset), 
                    // Add class if in viewport
                    elemStart < viewportEnd && viewportStart < elemEnd ? (
                    // Remove class
                    $obj.removeClass(objOptions.classToRemove), $obj.addClass(objOptions.classToAdd), 
                    // Do the callback function. Callback wil send the jQuery object as parameter
                    objOptions.callbackFunction($obj, "add"), 
                    // Check if full element is in view
                    rawEnd <= viewportEnd && viewportStart <= rawStart ? $obj.addClass(objOptions.classToAddForFullView) : $obj.removeClass(objOptions.classToAddForFullView), 
                    // Set element as already animated
                    $obj.data("vp-animated", !0), objOptions.removeClassAfterAnimation && $obj.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                        $obj.removeClass(objOptions.classToAdd);
                    })) : $obj.hasClass(objOptions.classToAdd) && objOptions.repeat && ($obj.removeClass(objOptions.classToAdd + " " + objOptions.classToAddForFullView), 
                    // Do the callback function.
                    objOptions.callbackFunction($obj, "remove"), 
                    // Remove already-animated-flag
                    $obj.data("vp-animated", !1));
                }
            });
        }, 
        /**
		 * Binding the correct event listener is still a tricky thing.
		 * People have expierenced sloppy scrolling when both scroll and touch
		 * events are added, but to make sure devices with both scroll and touch
		 * are handles too we always have to add the window.scroll event
		 *
		 * @see  https://github.com/dirkgroenen/jQuery-viewport-checker/issues/25
		 * @see  https://github.com/dirkgroenen/jQuery-viewport-checker/issues/27
		 */
        // Select the correct events
        ("ontouchstart" in window || "onmsgesturechange" in window) && 
        // Device with touchscreen
        $(document).bind("touchmove MSPointerMove pointermove", this.checkElements), 
        // Always load on window load
        $(options.scrollBox).bind("load scroll", this.checkElements), 
        // On resize change the height var
        $(window).resize(function(e) {
            boxSize = {
                height: $(options.scrollBox).height(),
                width: $(options.scrollBox).width()
            }, $elem.checkElements();
        }), 
        // trigger inital check if elements already visible
        this.checkElements(), this;
    };
}(jQuery);