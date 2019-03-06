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

// Save dark mode across executions
const isDarkMode = !!localStorage.getItem("darkMode");
if (isDarkMode) {
	document.body.classList.add("dark-mode");
	document.getElementById("dark-mode-toggle").checked = true;
}
$("#dark-mode-toggle").click(e => {
	if (e.target.checked) {
		document.body.classList.add("dark-mode");
		localStorage.setItem("darkMode", "1");
	} else {
		document.body.classList.remove("dark-mode");
		localStorage.removeItem("darkMode");
	}
});

// Sync lyrics status scroll with textarea
$("#lyricsInputArea").scroll(e => {
	document.getElementById("lyrics-status").scrollTop = e.target.scrollTop;
});