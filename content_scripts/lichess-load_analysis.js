function sendPGNToLichess (pgn, player_color, stay_in_tab) {
  let link = "https://lichess.org/paste?run?" + player_color + pgn
  if (stay_in_tab) window.location.href = link
  else window.open(link, 'blankPage')
}


function loadLichessPGN() {  // LOADS THE PGN
  console.log("nihuia")
  let pgn = url.split("/paste?run?")[1]
  let color = pgn[0]
  if (color == "B") storage.set({better_chess_com_color: "B"});

  pgn = pgn.substring(1).replaceAll("*", " ").replaceAll('%', '"')

  let form = document.getElementsByClassName("form-control")

  form[0].innerHTML = pgn
  form[1].click()
  document.getElementsByClassName("submit button text")[0].click()
}


function flipLichessBoard() { // FLIPS BOARD IF BLACK (can't seem to make the board flip, so I added a "PRESS F CONTINUE" message instead)
  let storage_id1 = "color"
  let storage_id2 = "flip"

  function do_the_FLIP() {
    var board = document.getElementsByClassName("cg-wrap cgv1 orientation-white manipulable")[0]
    var press_f = document.createElement("div")
    press_f.innerHTML = `Press "F"`
    press_f.className = "press-f-div"

    board.append(press_f)
  }
  
  
  storage.get([bcc + storage_id1], function(result) {
    if (result[bcc + storage_id1] == "B") {
      storage.set({[bcc + storage_id1]: "W"})

      storage.get([bcc + storage_id2], function(result) {
        if (result[bcc + storage_id2] == "YES") do_the_FLIP()
      })
    }
  })
}