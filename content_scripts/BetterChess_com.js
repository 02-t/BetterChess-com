let url = window.location.href
let storage = chrome.storage.local
let bcc = "better_chess_com_"


function pressEnterToOpenLichessAnalysis (pgn, player_color, div) {
    let storage_id1 = "enter"

    function press_enter() {
        window.addEventListener('keydown', (event) => {
            if (event.key == "Enter") {
                storage.get([bcc + storage_id1], function(result) {
                    if (result[bcc + storage_id1] == "YES") sendPGNToLichess(pgn, player_color)
                })
            }
        })
    }

    storage.get([bcc + storage_id1], function(result) {
        if (result[bcc + storage_id1] == "NO") {
            console.log(div)
            div.textContent = ""
            div.className = ""
            return
        }
        press_enter()
    })
}


function getPieceType(piece) {
    let piece_type = piece.className.replace("icon-font-chess ", "")
    piece_type = piece_type.replace("-white", "")
    piece_type =  piece_type.replace("-black", "")

    switch(piece_type) {
        case "knight":
            return "N";
        case "rook":
            return "R";
        case "queen":
            return "Q";
        case "bishop":
            return "B";
        case "king":
            return "K";
        default:
            return "-";
    }
}


function convertMoveToText(move) {
    game_string = ""
    let move_text = move.textContent
    move_text = move_text.replace("+", "").replace("#", "")
    if (move_text.endsWith("=")) game_string += move_text;

    let piece = move.getElementsByTagName("span")
    if (piece.length > 0) game_string += getPieceType(piece[0]) // gets the piece text from the piece icon

    if (!move_text.endsWith("=")) game_string += move_text
    game_string += "*"

    return game_string
}


function getDate() {
    var date = new Date();
    var dd = String(date.getDate()).padStart(2, '0')
    var mm = String(date.getMonth() + 1).padStart(2, '0')
    var yyyy = date.getFullYear()

    date = mm + '/' + dd + '/' + yyyy
    return (date)
}


function getHeader(my_name, opponent_name, white_name) {
    let ratings = document.getElementsByClassName("user-tagline-rating user-tagline-dark")
    let opponent_rating = ratings[0].textContent.replace(")", "").replace("(", "").trim()
    let my_rating = ratings[1].textContent.replace(")", "").replace("(", "").trim()

    let white_rating = my_rating
    let black_rating = opponent_rating

    let black_name = opponent_name
    let player_color = "W"

    var date = getDate()

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
    return {header, player_color}
}


function main() {
    if (url.indexOf("www.chess.com") > -1) disableRatings()

    if (url.indexOf("www.chess.com/analysis/game/") > -1) { // waits for when there are more than 2 elements with the class "move-node svelte-nkpmj2" then calls function
        var checkExist = setInterval(function() { 
            if ((document.getElementsByClassName("move-node svelte-nkpmj2")).length > 1) {
            setTimeout(addLichessAnalysisButton_analysis, 300)
            clearInterval(checkExist)
            }
        }, 100)
    }

    else if (url.indexOf("www.chess.com/game/") > -1)  { // same thing as above, waits for some elements to load then proceeds to call the function
        var checkExist = setInterval(function() {
            if ((document.getElementsByClassName("game-over-player-component game-over-modal-player")).length > 0 && document.getElementsByClassName("move").length > 0) {
                setTimeout(addLichessAnalysisButton_livegame, 10)
                clearInterval(checkExist)
            }
        }, 100)
    }

    else if (url.indexOf("www.chess.com/member/") > -1 || url.indexOf("www.chess.com/home") > -1) {
        var checkExist = setInterval(function() {
            if ((document.getElementsByClassName("archived-games-user-cell")).length > 0) {
                addLichessAnalysisButton_row("archived-games-user-cell")
                clearInterval(checkExist)
            }
        }, 100)
    }

    else if (url.indexOf("www.chess.com/games/archive/") > -1) {
        var checkExist = setInterval(function() {
            if ((document.getElementsByClassName("archive-games-user-cell")).length > 0) {
                addLichessAnalysisButton_row("archive-games-user-cell")
                clearInterval(checkExist)
            }
        }, 100)
    }

    else if (url.indexOf("lichess.org/paste?run?") > -1) loadLichessPGN()
    else if (url.indexOf("lichess.org/") > -1) flipLichessBoard()
}


window.addEventListener('load', main)
setInterval(function() {
    if (window.location.href != url) {
        url = window.location.href
        main()
    }
}, 100)