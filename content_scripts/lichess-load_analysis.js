

function loadLichessPGN() {  // LOADS THE PGN

    let pgn = url.split("/paste?run?")[1]
    let color = pgn[0]
    if (color == "B") chrome.storage.sync.set({key: "B"});

    pgn = pgn.substring(1).replaceAll("*", " ").replaceAll('%', '"')

    let form = document.getElementsByClassName("form-control")

    form[0].innerHTML = pgn
    form[1].click()
    document.getElementsByClassName("submit button text")[0].click()
}


function flipLichessBoard() { // FLIPS BOARD IF BLACK (can't seem to make the board flip, so I added a "PRESS F CONTINUE" message instead)
    chrome.storage.sync.get(['key'], function(result) {
      if (result.key == "B") {
        chrome.storage.sync.set({key: "W"})
        var board = document.getElementsByClassName("cg-wrap cgv1 orientation-white manipulable")[0]
        var press_f = document.createElement("div")
        press_f.innerHTML = `Press "F"`
        press_f.className = "press-f-div"

        board.append(press_f)
      }
    });
}