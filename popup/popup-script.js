let storage = chrome.storage.local

let defaults = {
    'hide_names': "NO",
    'hide_opponent_name':"NO",
    'hide_my_name': "NO",

    'hide_rating':"NO",
    'hide_opponent_rating': "NO",
    'hide_my_rating': "NO",

    'lichess': "YES",
    'live': "YES",
    'analy': "YES",
    'history': "YES",
    'enter': "NO",
    'flip': "YES"
}

let options = document.getElementsByTagName("div")

function main() {
    for (i = 0; i < options.length; i ++) {
        let element = options[i]
        let text = element.getElementsByTagName("span")[0]
        let id = element.id

        storage.get(["better_chess_com_" + id], function(result) {
            result = result["better_chess_com_" + id]
            console.log(result)
            if (!result) {
                storage.set({["better_chess_com_" + id]: defaults[id]})
                result = defaults[id]
            }

            if (result == "NO") {
                text.textContent = "NO"
                text.style = "color: darkred"
            }
            else {
                text.textContent = "YES"
                text.style = "color: darkcyan"
            }
        })

        let debounce = false

        element.onclick = function() {
            if (debounce) return
            debounce = true
            async = "NO"
            if (text.textContent == "NO") async = "YES"
            storage.set({["better_chess_com_" + id]: async})
            main()
        }
    }
}

main()