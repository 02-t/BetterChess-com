let storage = chrome.storage.local

let defaults = {
    'hide_names': "NO",
    'hide_opponent_name':"NO",

    'hide_rating': "NO",
    'hide_opponent_rating': "NO",

    'hide_avatar': "NO",
    'hide_opponent_avatar': "NO",
    
    'hide_flag': "NO",
    'hide_opponent_flag': "NO",

    'lichess': "YES",
    'live': "YES",
    'analy': "YES",
    'history': "YES",
    'enter': "YES",
    'flip': "YES",

    'marketing_banner': "NO",

    'membership' : "YES",
    'flairs' : "NO",
    'default_theme' : "YES"
}

let options = document.getElementsByTagName("div")


function hideExtras (extras, show) {
    for (let extra of extras) {

        console.log(extra)
        let div = document.getElementById(extra)

        if (!show && !div.classList.contains("hidden"))
            div.classList.add("hidden")

        else if (show && div.classList.contains("hidden"))
            div.classList.remove("hidden")
    }
}


function main () {
    for (i = 0; i < options.length; i ++) {
        let element = options[i]
        let text = element.getElementsByTagName("span")
        if (text.length == 1) text = text[0]; else continue

        let id = element.id

        storage.get(["better_chess_com_" + id], function(result) {
            result = result["better_chess_com_" + id]
            if (!result) {
                storage.set({["better_chess_com_" + id]: defaults[id]})
                result = defaults[id]
            }

            if (result == "NO") {
                text.textContent = "NO"
                text.style = "color: darkred"

                if (id == "hide_names")
                    hideExtras(["hide_opponent_name"], true)

                else if (id == "hide_rating") 
                    hideExtras(["hide_opponent_rating"], true)

                else if (id == "hide_avatar") 
                hideExtras(["hide_opponent_avatar", "hide_others_avatar"], true)

                else if (id == "hide_flag") 
                    hideExtras(["hide_opponent_flag"], true)

                else if (id == "lichess")
                    hideExtras(["live", "analy", "history", "enter", "flip"])
            }

            else {
                text.textContent = "YES"
                text.style = "color: darkcyan"

                if (id == "hide_names")
                    hideExtras(["hide_opponent_name"], false)

                else if (id == "hide_rating") 
                    hideExtras(["hide_opponent_rating"], false)

                else if (id == "hide_avatar") 
                hideExtras(["hide_opponent_avatar", "hide_others_avatar"], false)

                else if (id == "hide_flag") 
                    hideExtras(["hide_opponent_flag"], false)

                else if (id == "lichess")
                    hideExtras(["live", "analy", "history", "enter", "flip"], true)
            }
        })

        let debounce = false

        element.onclick = function() {
            console.log(element)
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