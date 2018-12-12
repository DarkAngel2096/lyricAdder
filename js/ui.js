function hideAll() {
    $(".pane").addClass("hidden");
};

$(".sideButton").click(function (e) {
    var target = e.currentTarget.name;
    if (target) {
        hideAll();
        $("#" + target).toggleClass("hidden");
    }

    // Add line numbers when displaying the actual lyric adder window
    // (i.e. when the textarea is actually here)
    if (target.name == "lyricsInputPage") {
        $("#lyricsInputArea").linedtextarea();
    }
});

