
function disableUserInfo() {

    function toDisable (class_, hide) {
        let obj = document.getElementsByClassName(class_)
    
        for (let i = 0; i < obj.length; i ++)  {
    
            let element = obj[i]
    
            if (hide) {
                element.innerHTML = ""
                element.classList.add("hidden")
            }
            else {
                if (element.classList.contains("visible")) continue
                element.classList.add("visible")
            }
        }
    }


    function modifyAllRatings (hide) {
        toDisable("user-tagline-popover-rating", hide)
        toDisable("user-tagline-rating", hide)
        toDisable("stat-section-stats-section", hide)
        toDisable("stat-section-expanded", hide)
        toDisable("user-rating", hide)
        toDisable("user-popover-ratings", hide)
        toDisable("live-game-over-component", hide)
        toDisable("game-over-rating-component", hide)
        toDisable("playerbox-row", hide)
    }


    function modifyAllFlags (hide) {
        toDisable("country-flags-component", hide)
    }


    function modifyAllAvatars (hide) {
        toDisable("home-user-img", hide)
        toDisable("avatar-component", hide)
        toDisable("versus-avatar", hide)
        toDisable("post-view-meta-image", hide)
        toDisable("profile-header-avatar", hide)
        toDisable("user-avatar-image", hide)
        toDisable("player-image", hide)
        toDisable("playerbox-avatar", hide)
    }


    function modifyAllNames (hide) {
        toDisable("profile-card-username", hide)
        toDisable("user-username-component", hide)
        toDisable("username", hide)
        toDisable("playerbox-username", hide)
        if (hide && document.title.indexOf("Chess: ") > -1) document.title = "Chess: _ vs _ - Chess.com"
    }


    function modiyAllFlairs (hide) {
        toDisable("user-flair-icon-component", hide)
    }


    function disableMembershipAds (hide) {
        toDisable("diamond-top", hide)
        toDisable("diamond", hide)
        toDisable("analysis-upgrade-button-component", hide)
        toDisable("modal-upgrade-game-review-component", hide)
        toDisable("coach-summary-button", hide)
        toDisable("modal-trial-component", hide)
    }


    function hideSpecificElements() {
        function removeOneElement(class_, index) {
            var debounce = 0
            var checkExist = setInterval(function() { 
                debounce++
                if (debounce > 50) clearInterval(checkExist)
                if ((document.getElementsByClassName(class_)).length > 0) {
                    let element = document.getElementsByClassName(class_)[index]
            
                    element.innerHTML = ""
                    element.classList.add("hidden")
                    clearInterval(checkExist)
                }
            }, 100)
        }

        storage.get([bcc + "hide_opponent_name"], function(result) {
            result = result[bcc + "hide_opponent_name"]
            if (result == "YES") {
                if (url.indexOf("chess.com/game/") > -1)
                    removeOneElement("user-username-component", 0)
                else if (url.indexOf("chess.com/variants/") > -1)
                    removeOneElement("playerbox-username", 0)
            }
        })

        storage.get([bcc + "hide_opponent_avatar"], function(result) {
            result = result[bcc + "hide_opponent_avatar"]
            if (result == "YES") {
                if (url.indexOf("chess.com/game/") > -1)
                    removeOneElement("player-image", 0)
                else if (url.indexOf("chess.com/variants/") > -1)
                    removeOneElement("playerbox-avatar", 0)
            }
        })
        
        storage.get([bcc + "hide_opponent_flag"], function(result) {
            result = result[bcc + "hide_opponent_flag"]
            if (result == "YES")
                if (url.indexOf("chess.com/game/") > -1)
                    removeOneElement("country-flags-component", 0)
                else if (url.indexOf("chess.com/variants/") > -1)
                    removeOneElement("country-flags-component",01)
        })
        
        storage.get([bcc + "hide_opponent_rating"], function(result) {
            result = result[bcc + "hide_opponent_rating"]
            if (result == "YES") {
                if (url.indexOf("chess.com/game/") > -1)
                    removeOneElement("user-tagline-rating", 0)
                else if (url.indexOf("chess.com/variants/") > -1)
                    removeOneElement("playerbox-row", 0)
            }
        })

        storage.get([bcc + "membership"], function(result) {
            result = result[bcc + "membership"]
            if (result == "YES") disableMembershipAds(true)
            else disableMembershipAds(false)
        })

        storage.get([bcc + "default_theme"], function(result) {
            result = result[bcc + "default_theme"]
            if (result == "YES" && url.indexOf("chess.com/member/") > -1) {
                console.log("subpula")
                document.body.classList.add("default-body-theme")
            }
        })
    }


    function modifyAllElements() {

        hideSpecificElements()

        storage.get([bcc + "hide_rating"], function(result) {
            result = result[bcc + "hide_rating"]
            if (result == "YES") modifyAllRatings(true)
            else modifyAllRatings(false)
        })
        
        storage.get([bcc + "hide_flag"], function(result) {
            result = result[bcc + "hide_flag"]
            if (result == "YES") modifyAllFlags(true)
            else modifyAllFlags(false)
        })
        
        storage.get([bcc + "hide_avatar"], function(result) {
            result = result[bcc + "hide_avatar"]
            if (result == "YES") modifyAllAvatars(true)
            else modifyAllAvatars(false)
        })
        
        storage.get([bcc + "hide_names"], function(result) {
            result = result[bcc + "hide_names"]
            if (result == "YES") hideOponentName(true)
            else modifyAllNames(false)
        })
        
        storage.get([bcc + "flairs"], function(result) {
            result = result[bcc + "flairs"]
            if (result == "YES") modiyAllFlairs(true)
            else modiyAllFlairs(false)
        })
    }

    modifyAllElements()

    let observer = new MutationObserver(function(mutations_list) {
        mutations_list.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(added_node) {
                if(added_node.className && typeof added_node.className == 'string') {
                    modifyAllElements()
                }
            })
        })
    })
    
    observer.observe(document, { subtree: true, childList: true });
}