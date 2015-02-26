$(document).ready(function() {


    // Get URL Paramater
    function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam) {
                return sParameterName[1];
            }
        }
    }

    // Load JSON File
    function loadJSON(callback) {
        var xobj = new XMLHttpRequest();
        if (xobj.overrideMimeType) {
            xobj.overrideMimeType("application/json");
        }
        xobj.open('GET', '../js/regions.json', true);
        xobj.onreadystatechange = function() {
            if (xobj.readyState == 4 && xobj.status == "200") {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                callback(xobj.responseText);
            }
        };
        xobj.send(null);
    }

    // Show region stats based on parameter
    var regionAbb = getUrlParameter('region');
    var regionTitle;
    var regionThreshold;

    loadJSON(function(response) {
        // Parse JSON string into object
        var data = $.parseJSON(response);

        regionTitle = data.daocloudRegionThresholds.regions[regionAbb] || 'local';
        regionThreshold = data.daocloudRegionThresholds.thresholds[regionAbb] || 'a minimum number of';

        $('.regionTitle').html(regionTitle);
        $('.regionThreshold').html(regionThreshold);
    });


});
