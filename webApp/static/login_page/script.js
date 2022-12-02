function make_req() {
    const email = document.getElementById("email_r");
    const passwr = document.getElementById("pass_r");
    const confirm_pass = document.getElementById("confirm_pass");
    $.ajax({
        type: "POST",
        url: "/request",
        data: "",
        dataType: "dataType",
        success: function (response) {
            
        }
    });
}