function getPGN_analysis() {
    let table = document.getElementsByTagName("horizontal-move-list")[0]
    let game_string = ""
        let table_contents = table.getElementsByTagName("span")

        for (let i = 0; i < table_contents.length; i += 1) {
            let element = table_contents[i]
            if (element.className == "move-node svelte-nkpmj2") {
                let number = element.getElementsByClassName("move-number svelte-nkpmj2")
                if (number.length > 0) game_string += number[0].textContent + "*"

                let move = element.getElementsByClassName("move-text svelte-nkpmj2")[0]

                game_string += convertMoveToText(move)
            }
        }
     
    game_string += document.getElementsByClassName("game-result-node")[0].textContent
    
    return(game_string)
}


function addLichessAnalysisButton_analysis() {
    let storage_id1 = "lichess"
    let storage_id2 = "analy"

    function add_button() {
        let names = document.getElementsByClassName("user-username-component user-username-dark user-username-link user-tagline-username")
        let opponent_name = names[0].textContent
        let my_name = names[1].textContent

        let analysis_view = document.getElementsByClassName("analysis-view-players")[0]

        let white_name = analysis_view.getElementsByTagName("span")[0].textContent

        let {header, player_color} = getHeader(my_name, opponent_name, white_name) // PGN header and player color

        let pgn = getPGN_analysis()
        pgn = header + pgn
        console.log(pgn)

        var button = document.createElement("button")
        button.id = "lichess_button1"
        button.innerHTML = `<img src=https://images.prismic.io/lichess/5cfd2630-2a8f-4fa9-8f78-04c2d9f0e5fe_lichess-box-1024.png?auto=compress,format class="lichess-img-style">&nbsp;&nbsp;Analyze with Lichess`
        button.className = "lichess-button-style extras__2"
        button.onclick = function() {sendPGNToLichess(pgn, player_color)}

        var div = document.createElement("div")
        div.innerHTML = `You can also press "ENTER" to open lichess analysis!`
        div.className = "extras__div2"

        analysis_view.appendChild(button)
        analysis_view.appendChild(div)

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