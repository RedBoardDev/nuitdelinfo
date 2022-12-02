function error(err)
{

}

function get(url, data, suc, err)
{
    $.ajax({
        type: "GET",
        url: url,
        data: data,
        contentType: "application/json; charset=utf-8",
        dataType :"json",
        headers: {
            "Authorization":"Bearer " + sessionStorage.getItem("AccessToken")
        },
        success: function(result) {
            console.log(result)
            suc(result)
        },
        error: function(e){
            console.log(e)
            if (e.status == 418) {
                getAccessToken(sessionStorage.getItem("RefreshToken"), () => {

                })
            }
            err("invalid form")
        }
      });
}


function refreshAccessToken(refreshToken)
{
    getAccessToken(refreshToken, (token) => {
        sessionStorage.setItem("AccessToken" , token)
    })
}

function getAccessToken(refreshToken, callback)
{
    $.ajax({url: "/AccessToken", 
            data: {"refreshToken": refreshToken},
            success: function(result){
                callback(result)
            },
            error : function(err) {
                window.location.href = "/login.html"
            }
    })
}

function init(refreshToken)
{
    sessionStorage.setItem("RefreshToken" , refreshToken)
    getAccessToken(refreshToken, (token) => {
        sessionStorage.setItem("AccessToken" , token)
    })
    window.location.href = "/game.html"
}

function sendRegister() {
    if (document.getElementById("pass").value != document.getElementById("confirm_pass").value)
        console.log("error")
    else {
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const pass = document.getElementById("pass").value;
    
        $.ajax({
            type: "POST",
            url: "/register",
            data: JSON.stringify ({"email" : email, "password" : pass, "username" : username}),
            contentType: "application/json; charset=utf-8",
            dataType :"json",
            success: function(result) {
                if (!result.refreshToken)
                    error("invalid form")
                else 
                    init(result.refreshToken)
            },
            error: function(err){
                error("invalid form")
            }
          });
    }
}

function sendLogin() {
    const email = document.getElementById("email").value;
    const pass = document.getElementById("pass").value;

    $.ajax({
        url: "/login", 
        data: {"email": email,
        "password" : pass},
        success: function(result){
            if (!result.refreshToken)
                error("invalid form")
            else 
                init(result.refreshToken)
        },
        error: function(err){
            error("invalid form")
        }
    })
}