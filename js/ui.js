function hideAll() {
	$(".pane").addClass("hidden");
};

let linesAreAdded = false;

if (!$("#lyricsInputPage").hasClass("hidden")) {
  $("#lyricsInputArea").linedtextarea();
  linesAreAdded = true;
}

$(".sideButton").click(function (e) {
	var target = e.currentTarget.name;
	if (target) {
		hideAll();
		$("#" + target).toggleClass("hidden");
	}

	// Add line numbers when displaying the actual lyric adder window
	// (i.e. when the textarea is actually here)
	if (!linesAreAdded && target == "lyricsInputPage") {
		$("#lyricsInputArea").linedtextarea();
		linesAreAdded = true;
	}
});
