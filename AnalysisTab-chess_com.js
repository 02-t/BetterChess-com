function getPGN() {
    let table = document.getElementsByTagName("horizontal-move-list")[0]
    let game_string = ""
            let table_contents = table.getElementsByTagName("span")

            for (let i = 0; i < table_contents.length; i += 1) {
                let element = table_contents[i]
                if (element.className == "move-node svelte-nkpmj2") {
                    let number = element.getElementsByClassName("move-number svelte-nkpmj2")
                    if (number.length > 0) game_string += number[0].textContent + "*"

                    let move = element.getElementsByClassName("move-text svelte-nkpmj2")[0]
                    let piece = move.getElementsByTagName("span")
                    let move_text = move.textContent
                    move_text = move_text.replace("+", "").replace("#", "")

                    if (move_text.endsWith("=")) game_string += move_text

                    if (piece.length > 0) {
                        let piece_type = piece[0].className.replace("icon-font-chess ", "")
                        piece_type = piece_type.replace("-white", "")
                        piece_type =  piece_type.replace("-black", "")

                        switch(piece_type) {
                            case "knight":
                                game_string += "N"; break
                            case "rook":
                                game_string += "R"; break
                            case "queen":
                                game_string += "Q"; break
                            case "bishop":
                                game_string += "B"; break
                            case "king":
                                game_string += "K"; break
                            default:
                                game_string += "-"; break
                        }
                    }

                    if (!move_text.endsWith("=")) game_string += move_text
                    game_string += "*"
                }
            }
            
    return(game_string)
}


function addLichessAnalysisButton_analysis() {
    let ratings = document.getElementsByClassName("user-tagline-rating user-tagline-dark")
    let opponent_rating = ratings[0].textContent.replace(")", "").replace("(", "")
    let my_rating = ratings[1].textContent.replace(")", "").replace("(", "")

    let white_rating = my_rating.trim()
    let black_rating = opponent_rating.trim()

    let names = document.getElementsByClassName("user-username-component user-username-dark user-username-link user-tagline-username")

    let opponent_name = names[0].textContent
    let my_name = names[1].textContent

    let analysis_view = document.getElementsByClassName("analysis-view-players")[0]

    let white_name = analysis_view.getElementsByTagName("span")[0].textContent
    let black_name = opponent_name
    let player_color = "W"
    let date = analysis_view.getElementsByTagName("div")[1].innerHTML.split(":")[2].trim()

    if (white_name == opponent_name) {
        black_name = my_name
        black_rating = my_rating
        white_rating = opponent_rating
        white_name = opponent_name
        player_color = "B"
    }
    
    let header = '[White "' + white_name + '"] [Black "' + black_name + '"] [WhiteElo "' + white_rating +
    '"] [BlackElo "' + black_rating + '"] [Event "Live Chess at chess.com"] [Date "' + date + '"] '

    header = header.replaceAll(" ", "*").replaceAll('"', '%')

    let pgn = getPGN()
    pgn = header + pgn
    console.log(pgn)

    analysis_view.innerHTML += `<div style="color:red;"><br> You can also press "ENTER" to open lichess analysis!</div><br>`

    var button = document.createElement("button")
    button.innerHTML = `<img src=https://images.prismic.io/lichess/5cfd2630-2a8f-4fa9-8f78-04c2d9f0e5fe_lichess-box-1024.png?auto=compress,format class="lichess-img-style">&nbsp;&nbsp;Analyze with Lichess`
    button.className = "lichess-button-style"
    button.onclick = function() {sendPGNToLichess(pgn, player_color)}

    analysis_view.appendChild(button)


    window.addEventListener('keydown', (event) => {
        if (event.key == "Enter") {
            sendPGNToLichess(pgn, player_color)
        }
    })
}