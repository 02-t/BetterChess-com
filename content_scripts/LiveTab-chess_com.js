function addLichessAnalysisButton_livegame () {
    let storage_id1 = "lichess"
    let storage_id2 = "live"

    function add_button() {
        let moves = document.getElementsByClassName("move")
        let white_name = document.title.replace("Chess:", "").trimStart().split(" ")[0]
        if (white_name == "Play") white_name = document.getElementsByClassName("user-username username")[0].textContent.trim()

        let names = document.getElementsByClassName("user-username-component")
        let oponent_name = names[0].textContent
        let my_name = names[1].textContent

        let {header, player_color} = getHeader(my_name, oponent_name, white_name)
        
        let game_string = ""

        for (let i = 0; i < moves.length; i += 1) {
            element = moves[i]

            let move_nr = element.textContent.split(".")[0]
            game_string += (move_nr + ".*")

            if (move_nr.indexOf("-") > -1) break // returns if finds game results (0-1, 1-1 or 1/2-1/2)

            let white = element.getElementsByClassName("white node")[0]
            let black = element.getElementsByClassName("black node")[0]

            game_string += convertMoveToText(white)
            game_string += convertMoveToText(black)
        }

        let pgn = header + game_string
        console.log(pgn)
        
        if (url.indexOf("?open*in*lichess") > -1) sendPGNToLichess(pgn, player_color, true)

        let button_parent = document.getElementsByClassName("daily-game-footer-game-over")
        if (button_parent.length > 0) button_parent = button_parent[0]
        else {
            button_parent = document.getElementsByClassName("daily-game-footer-component daily-game-footer-isFinished undefined")
            if (button_parent.length > 0) button_parent = button_parent[0]
            else {
                button_parent = document.getElementsByClassName("live-game-buttons-game-over")
                if (button_parent.length > 0) button_parent = button_parent[0]
                else {
                    setTimeout(addLichessAnalysisButton_livegame, 1000)
                    return
                }
            }
        }

        var button = document.createElement("button")
        button.innerHTML = `<img src=https://images.prismic.io/lichess/5cfd2630-2a8f-4fa9-8f78-04c2d9f0e5fe_lichess-box-1024.png?auto=compress,format class="lichess-img-style">&nbsp;&nbsp;Analyze with Lichess`
        button.className = "lichess-button-style extras__"
        button.id = "lichess_button1"
        button.onclick = function() {sendPGNToLichess(pgn, player_color)}

        var div = document.createElement("div")
        div.innerHTML = `You can also press "ENTER" to open lichess analysis!`
        div.className = "extras__div"
        div.id = "keybind_enter_text"

        button_parent.appendChild(button)
        button_parent.appendChild(div)

        pressEnterToOpenLichessAnalysis (pgn, player_color, div)
    }

    if (document.getElementById("lichess_button1")) return

    storage.get([bcc + storage_id1], function(result) {
        if (result[bcc + storage_id1] == "NO") return
        storage.get([bcc + storage_id2], function(result) {
            if (result[bcc + storage_id2] == "NO") return
            add_button()
        })
    })
}