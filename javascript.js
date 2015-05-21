var gapi = (function() {
  "use strict";

  function AjaxGetRequest (searchurl, callback){
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function(){
      if (httpRequest.readyState === 4) {
        if (httpRequest.status === 200) {
          var JSONresponse = JSON.parse(httpRequest.responseText).response.results;
          //console.log(response1);
          callback(JSONresponse);
          } else {
          console.log('There was a problem with the request.');
        }
      }
    };
    httpRequest.open("GET", searchurl, true);
    httpRequest.send();
  };

  function displayResults (response) {
    /*
    var list = document.getElementById('demo');
    for(var i = 0; i < 3; i++) {
      var title = response[i].webTitle.toString();
      var entry = document.createElement('li');
      entry.appendChild(document.createTextNode(title));
      list.appendChild(entry);
      //list[i].innerHTML = response[i].webTitle.toString();
      list.setAttribute('href', response[i].webUrl.toString());
    };

    document.getElementById('resultHead').innerHTML = response[0].webTitle;
    document.getElementById('resultBody').innerHTML = response[0].fields.body;
    document.getElementById('resultAuthor').innerHTML = "by " + response[0].fields.byline;
    */
    document.getElementById('labelTab1').innerHTML = response[0].webTitle;
    /*
    var elem = document.getElementById("#results");
      elem.display = "initial";*/
    document.getElementById("results").style.display = 'inherit';
    /*
    $('go-button').click(function(){
      $('div').toggleClass('opa');
    });
    */
  };

  function makeurl (searchterm, year) {
    return 'http://content.guardianapis.com/search?' + 'from-date=' + year + '-01-01' + '&to-date=' + year + '-12-31' + '&order-by-relevance'+'&show-tags=keyword'+'&q=' + searchterm + '&api-key=2crhgqs3wjpe4vkh9x5j86yt' + "&show-fields=all";
  };

  function runAjax () {
    var searchterm = document.getElementById('searchTermInput').value.toString();
    var year = document.getElementById('yearInput').value.toString();
    var requestUrl = gapi.makeurl(searchterm, year);
    gapi.AjaxGetRequest(requestUrl, gapi.displayResults);
  };

  function shorten (string) {
    return string.length > 20 ? string.substring(0, 17) : string;
  };

  return {
    AjaxGetRequest: AjaxGetRequest,
    displayResults: displayResults,
    makeurl: makeurl,
    runAjax: runAjax,
    shorten: shorten
  };

}());
