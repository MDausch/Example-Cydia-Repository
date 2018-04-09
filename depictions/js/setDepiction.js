
$(function(){
    var bundle = getQueryVariable('p');

    if(bundle != undefined){
        //Now fetch the appropriate file from this query string
    }


    console.log(getQueryVariable('p'));
    console.log("Fetching XML");
    var getUrl = window.location;
    var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
    console.log(baseUrl + "/"+ bundle + "/info.xml");

    $.ajax({
        type: "GET",
        url: baseUrl + "/" + bundle + "/info.xml",
        dataType: "xml",
        success: function (xml) {
            console.log("Beginning XML Parsing");

            // Parse the xml file and get data
            $(xml).find('packageInfo').each(function(){
                  // document.getElementById("packageTitle").innerHTML = $(this).find("name").text();
                   //document.getElementById("bundleId").innerHTML = $(this).find("bundleId").text();
                   //document.getElementById("version").innerHTML = $(this).find("version").text();
                   document.getElementById("miniOS").innerHTML = $(this).find("miniOS").text();
                   document.getElementById("maxiOS").innerHTML = $(this).find("maxiOS").text();

                   $(xml).find('description').each(function(){
                       $("#description" ).append('<li>' +$(this).text()+ '</li>');
                   });

                   $(xml).find('dependency').each(function(){
                       $("#dependencies" ).append('<li>' +$(this).text()+ '</li>');
                   });

                   $(xml).find('linkName').each(function(){
                       $("#dependencies" ).append('<li>' +$(this).text()+ '</li>');
                   });

                   $(xml).find('change').each(function(){
                       $("#changeLog" ).append('<li>' + '<h1>' + $(this).find("changeVersion").text() + '</h1>');
                       $(this).find('changeDescription').each(function(){
                            $("#changeLog" ).append('<h2>' + $(this).text()+ '<h2>');
                       });
                       $("#changeLog" ).append('<li>');
                   });


            });

        }
    });


});


function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
}
