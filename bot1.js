//to run from the chrome console after all the bot scripts (via temperMonkey) are done
//this script will create an excel file
$.ajax({
    type: "POST",
    url: 'http://127.0.0.1:4040/bot2',
    dataType: 'json',
    async: true,
    //json object to sent to the authentication url
    success: function () {

        console.log("Thanks!");
        window.close()
    }
})