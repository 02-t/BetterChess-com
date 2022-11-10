function addLichessAnalysisButton_row(class_name) {
    let games = document.getElementsByClassName(class_name)

    for (let i = 0; i < games.length; i += 1) {
        let element = games[i]
        let link = element.getElementsByTagName("a")[0].href + "?open*in*lichess"
        
        var button = document.createElement("button")
        button.innerHTML = `<img src=https://images.prismic.io/lichess/5cfd2630-2a8f-4fa9-8f78-04c2d9f0e5fe_lichess-box-1024.png?auto=compress,format class="lichess-img-style">&nbsp;&nbsp;Analyze with Lichess`
        button.className = "lichess-button-style"
        button.onclick = function() {window.open(link, "blank" + i)}

        element.appendChild(button)
    }
}