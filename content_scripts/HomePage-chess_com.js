let key = "better_chess_com_marketing_banner"

chrome.storage.local.get([key], function(result) {
    result = result[key]
    if (result == "YES") {
        var checkExist = setInterval(function() { 
            if (document.getElementById('main-banner') != undefined) {
                document.getElementById('main-banner').remove()
                clearInterval(checkExist)
            }
        }, 100)
    }
})