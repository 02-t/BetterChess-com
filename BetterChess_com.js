let url = window.location.href


function simulateKey (keyCode, type, modifiers) {
	var evtName = (typeof(type) === "string") ? "key" + type : "keydown";	
	var modifier = (typeof(modifiers) === "object") ? modifier : {};

	var event = document.createEvent("HTMLEvents");
	event.initEvent(evtName, true, false);
	event.keyCode = keyCode;
	
	for (var i in modifiers) {
		event[i] = modifiers[i];
	}

	document.dispatchEvent(event);
}


function sendPGNToLichess (pgn, player_color) {
    window.open("https://lichess.org/paste?run?" + player_color + pgn, 'blankPage')
}


window.addEventListener('load', function () { 
    if (url.indexOf("https://www.chess.com/analysis/game/live/") > -1) { // waits for when there are more than 2 elements with the class "move-node svelte-nkpmj2"
        var checkExist = setInterval(function() {
            if ((document.getElementsByClassName("move-node svelte-nkpmj2")).length > 1) {
               setTimeout(addLichessAnalysisButton_analysis, 100) // inserts "analyze with lichess" button after another 100 ms (I added all this cooldown so all the values load)
               clearInterval(checkExist)
            }
         }, 100)
    }
    else if (url.indexOf("https://www.chess.com/members/") > -1) addLichessAnalysisButton_members_row();
    else if (url.indexOf("https://lichess.org/paste?run?") > -1) loadLichessPGN();
    else if (url.indexOf("https://lichess.org/") > -1) setTimeout(flipLichessBoard(), 4000);
})