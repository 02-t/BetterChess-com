

function loadLichessPGN() {  // LOADS THE PGN

    let pgn = url.split("/paste?run?")[1]
    let color = pgn[0]
    if (color == "B") chrome.storage.sync.set({key: "B"});

    pgn = pgn.substring(1).replaceAll("*", " ").replaceAll('%', '"')

    let form = document.getElementsByClassName("form-control")

    form[0].innerHTML = pgn
    //form[1].click()
    document.getElementsByClassName("submit button text")[0].click()
}


function eventFire(el, etype){
    if (el.fireEvent) {
      el.fireEvent('on' + etype);
    } else {
      var evObj = document.createEvent('Events');
      evObj.initEvent(etype, true, false);
      el.dispatchEvent(evObj);
    }
  }


function flipLichessBoard() { // FLIPS BOARD IF BLACK
    console.log("flip!")

    function flipBoard() {
        
    }
    
    chrome.storage.sync.get(['key'], function(result) {
        console.log(result.key)
        if (result.key == "B") {
            var fbt = document.getElementsByClassName("fbt")[7]
            $('.fbt').trigger('click');

            var checkExist = setInterval(function() {
                if ((document.getElementsByClassName("button button-empty")).length > 1) {
                    document.getElementsByClassName("button button-empty")[0].click()
                    document.getElementsByClassName("fbt active")[0].click()
                    chrome.storage.sync.set({key: "W"})
                    clearInterval(checkExist)
                }
            }, 100)

            console.log("asdasddfdfdfdfdfdf")
        }
      });
}