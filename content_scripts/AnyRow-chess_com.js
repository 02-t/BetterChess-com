function addLichessAnalysisButton_row(class_name) {
    let storage_id1 = "lichess"
    let storage_id2 = "history"

    function add_buttons() {
        let games = document.getElementsByClassName(class_name)

        for (let i = 0; i < games.length; i += 1) {
            let element = games[i]
            
            let link = element.getElementsByTagName("a")[0].href + "?open*in*lichess"
            
            var button = document.createElement("button")
            button.id = "lichess_button1"
            button.innerHTML = `<img src=https://images.prismic.io/lichess/5cfd2630-2a8f-4fa9-8f78-04c2d9f0e5fe_lichess-box-1024.png?auto=compress,format class="lichess-img-style">&nbsp;&nbsp;Analyze with Lichess`
            button.className = "lichess-button-style"
            button.style = "margin-top: 8px;"
            button.onclick = function() {window.open(link, "blank" + i)}

            element.appendChild(button)
        }
    }

    if (document.getElementById("lichess_button1")) return

    storage.get([bcc + storage_id1], function(result) {
        if (result[bcc + storage_id1] == "NO") return
        storage.get([bcc + storage_id2], function(result) {
            if (result[bcc + storage_id2] == "NO") return
            add_buttons()
        })
    })
}