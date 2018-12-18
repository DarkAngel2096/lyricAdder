/**
 * jQuery Lined Textarea Plugin
 *   https://github.com/aw20/JQueryLinedText
 *
 * Copyright (c) 2010 Alan Williamson
 *
 * Version:
 *    $Id: jquery-linedtextarea.js 464 2010-01-08 10:36:33Z alan $
 *
 * Released under the MIT License:
 *    http://www.opensource.org/licenses/mit-license.php
 *
 * Usage:
 *   Displays a line number count column to the left of the textarea
 *
 *   Class up your textarea with a given class, or target it directly
 *   with JQuery Selectors
 *
 *   $(".lined").linedtextarea({
 *    selectedLine: 10,
 *    selectedClass: 'lineselect'
 *   });
 *
 * History:
 *   - 2010.01.08: Fixed a Google Chrome layout problem
 *   - 2010.01.07: Refactored code for speed/readability; Fixed horizontal sizing
 *   - 2010.01.06: Initial Release
 *
 */
(function($) {

  $.fn.linedtextarea = function(options) {

    // Get the Options
    var opts = $.extend({}, $.fn.linedtextarea.defaults, options);


    /*
     * Helper function to make sure the line numbers are always
     * kept up to the current system
     */
    const lines = [];
    const fillOutLines = (codeLines, h, lineNo, textarea) => {
      const textLines = textarea.val().split("\n");
      for (let i = lineNo; i <= textLines.length; i++) {
        const line = $(`<div class="lineno">&nbsp;</div>`);
        lines.push(line);
        codeLines.append(line);
        if (!textLines[i]) continue;
        if (~opts.selectedLines.indexOf(lineNo)) line.addClass("lineselect");
        line.html(lineNo++);
        if (codeLines.height() >= h) break;
      }
      let l = 1;
      lines.forEach((line, i) => {
        if (~opts.selectedLines.indexOf(l)) {
          line.addClass("lineselect");
        } else {
          line.removeClass("lineselect");
        }
        if (textLines[i]) line.html(l++);
        else line.html("&nbsp;");
      });
      return lineNo;
    };

    /*
     * Iterate through each of the elements are to be applied to
     */
    return this.each(function() {
      var lineNo = 1;
      var textarea = $(this);

      /* Turn off the wrapping of as we don't want to screw up the line numbers */
      textarea.attr("wrap", "off");
      textarea.css({resize:'none'});
      var originalTextAreaWidth = textarea.outerWidth();

      /* Wrap the text area in the elements we need */
      textarea.wrap("<div class='linedtextarea'></div>");
      var linedTextAreaDiv  = textarea.parent().wrap("<div class='linedwrap' style='width:" + originalTextAreaWidth + "px'></div>");
      var linedWrapDiv      = linedTextAreaDiv.parent();

      linedWrapDiv.prepend("<div class='lines' style='width:35px'></div>");

      var linesDiv  = linedWrapDiv.find(".lines");
      linesDiv.height( textarea.height() + 6 );


      /* Draw the number bar; filling it out where necessary */
      linesDiv.append( "<div class='codelines'></div>" );
      var codeLinesDiv  = linesDiv.find(".codelines");
      lineNo = fillOutLines( codeLinesDiv, linesDiv.height(), 1, textarea);

      /* Move the textarea to the selected line */
      if ( opts.selectedLine != -1 && !isNaN(opts.selectedLine) ){
        var fontSize = parseInt( textarea.height() / (lineNo-2) );
        var position = parseInt( fontSize * opts.selectedLine ) - (textarea.height()/2);
        textarea[0].scrollTop = position;
      }


      /* Set the width */
      var sidebarWidth          = linesDiv.outerWidth();
      var paddingHorizontal     = parseInt( linedWrapDiv.css("border-left-width") ) + parseInt( linedWrapDiv.css("border-right-width") ) + parseInt( linedWrapDiv.css("padding-left") ) + parseInt( linedWrapDiv.css("padding-right") );
      var linedWrapDivNewWidth  = originalTextAreaWidth - paddingHorizontal;
      var textareaNewWidth      = originalTextAreaWidth - sidebarWidth - paddingHorizontal - 20;

      textarea.width( textareaNewWidth );
      linedWrapDiv.width( linedWrapDivNewWidth );



      /* React to the scroll event */
      const update = function(args){
        if (args.selectedLines) opts.selectedLines = args.selectedLines;
        var domTextArea   = $(this)[0];
        var scrollTop     = domTextArea.scrollTop;
        var clientHeight  = domTextArea.clientHeight;
        codeLinesDiv.css( {'margin-top': (-1*scrollTop) + "px"} );
        lineNo = fillOutLines( codeLinesDiv, scrollTop + clientHeight, lineNo, textarea);
      };
      textarea.on("input propertychange", update);
      textarea.scroll(update);
      // Awful hack: add "update" to global so it can be reached from
      // mainScripts.js/testLyricEventsAndSyllables()
      // (there's only one linedtextarea so it should be fine, I guess)
      global.updateLinedTextArea = update;


      /* Should the textarea get resized outside of our control */
      textarea.resize( function(tn){
        var domTextArea = $(this)[0];
        linesDiv.height( domTextArea.clientHeight + 6 );
      });

    });
  };

  // default options
  $.fn.linedtextarea.defaults = {
    selectedLine: -1,
    selectedLines: [],
    selectedClass: 'lineselect'
  };
})($);
