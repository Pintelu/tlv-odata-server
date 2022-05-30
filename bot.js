// ==UserScript==
// @name         TLV open data
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://opendata.tel-aviv.gov.il/he/pages/item.aspx?ids=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gov.il
// @grant        none
// ==/UserScript==

(function() {
    jsons=[]
    const category = $('[aria-label="Breadcrumb"]').find('li').eq(1).text().trim()
    const subject = $('[aria-label="Breadcrumb"]').find('li').eq(2).text().trim()
    jsonObj = {}
    jsonObj.category = category
    jsonObj.subject = subject
    jsonObj.location = location.href
    jsonObj.api = $('#api4a')
        .clone()    //clone the element
        .children() //select all the children
        .remove()   //remove all the children
        .end()  //again go back to selected element
        .text()
        .trim();

    $('#1a').find('.row').each(function(){
        var first = $(this).find('div').first().text().trim().replace(':', '');
        var second = $(this).find('div').last().text().trim().replace(':', '');

        if ($(this).find('div').last().find('a').length>0) {
            second = $(this).find('div').last().find('a').attr('href');
        }


        //obj = {}
        //obj[first] = second

        jsonObj[first] = second
        //jsons.push(jsonObj)
    })
    console.log((jsonObj))

    $.ajax({
        type: "POST",
        url: 'http://127.0.0.1:4040/bot',
        dataType: 'json',
        async: true,
        //json object to sent to the authentication url
        data: JSON.stringify(jsonObj),
        contentType: 'application/json',
        success: function (data) {
            if (data.result=="no-data"){
                console.log("no-data");
                window.close()
            }
            else
                window.close()
        }
    })
})();