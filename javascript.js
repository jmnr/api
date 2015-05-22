//document.getElementById('go-button').addEventListener( "click", gapi.runAjax() });
// onclick="gapi.runAjax()"
var gapi = (function(){
  "use strict";

  function ajaxGetRequest (searchurl, callback){
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function(){
      if (httpRequest.readyState === 4) {
        if (httpRequest.status === 200) {
          var JSONresponse = JSON.parse(httpRequest.responseText).response.results;
          callback(JSONresponse);
        } else {
          console.log('There was a problem with the request.');
        }
      }
    };
    httpRequest.open("GET", searchurl, true);
    httpRequest.send();
  }

  function displayResults (response) {

    if (response.length === 0) {
      alert("Looks like there aren't any results to display! Try a different search term!");
    }

    else {

        var titles = document.getElementsByClassName('titles');
        var authors = document.getElementsByClassName('article-author');
        var content = document.getElementsByClassName('article-content');
        var readmore = document.getElementsByClassName('read-more');
        
      for (var i = 0; i < 3; i++) {
        titles[i].innerHTML = response[i].webTitle;

        if (response[i].fields.byline !== undefined) {
          if (response[i].fields.byline.substring(0,2) === "By") {
            authors[i].innerHTML = response[i].fields.byline; }
          else { authors[i].innerHTML = "By " + response[i].fields.byline; }
        }

        var text = response[i].fields.body;
        content[i].innerHTML = text.length > 1000 ? text.substring(0, 1000) + '...' : text;

        readmore[i].setAttribute('href', response[i].webUrl);
        }
      }

      document.getElementsByClassName('nav-dots')[0].style.border = "solid black 3px";

  }

  function makeurl (searchterm, year) {
    return ('http://content.guardianapis.com/search?' + 'from-date=' +
      year + '-01-01' + '&to-date=' + year + '-12-31' + '&order-by-relevance'+'&show-tags=keyword'+'&q=' +
      searchterm + '&api-key=2crhgqs3wjpe4vkh9x5j86yt' + "&show-fields=all" + "&show-most-viewed=true");
  }

  function runAjax () {
    var searchterm = document.getElementById('searchTermInput').value.toString();
    var year = document.getElementById('yearInput').value.toString();
    if (searchterm === "" || year === "") {
      searchterm = document.getElementById('searchTermInput').placeholder;
      year = document.getElementById('yearInput').placeholder;
    }
    var requestUrl = gapi.makeurl(searchterm, year);
    gapi.ajaxGetRequest(requestUrl, gapi.displayResults);
    return requestUrl;
  }

  function clearInputs (){
    document.getElementById('searchTermInput').value = "";
    document.getElementById('yearInput').value = "";
    for (var i = 0; i < 3; i++) {
      document.getElementsByClassName('tab-labels')[i].innerHTML = "";
      document.getElementsByClassName('tab-content')[i].innerHTML = "";
    }
  }

  function multipleInputs (searchinput) {
    //converts multiple word inputs into a single string with the space replaced by %20
    return searchinput.replace(" ", "%20");
  }

  function shorten (string) {
    return string.length > 20 ? string.substring(0, 17) + '...' : string;
  }

  function changePlaceholder (){
    var suggestTopic = ["kangaroo", "computer", "penguins", "narwhal", "3D printing", "honolulu", "apple", "french people", "llama", "aubergine", "christmas", "ireland", "technology", "helicopter", "beard", "beer", "pork", "travel", "fireworks", "podcast"];
    var suggestYear = ["1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015"];

    setInterval( function() {
      document.getElementById('searchTermInput').setAttribute('placeholder', suggestTopic[Math.floor((Math.random()*10) + 1)]);
      document.getElementById('yearInput').setAttribute('placeholder', suggestYear[Math.floor((Math.random()*10) + 1)]);
     }, 5000);
  }

  return {
    ajaxGetRequest: ajaxGetRequest,
    displayResults: displayResults,
    makeurl: makeurl,
    clearInputs: clearInputs,
    runAjax: runAjax,
    shorten: shorten,
    multipleInputs: multipleInputs,
    changePlaceholder: changePlaceholder
  };

}());

$(document).ready(function () {
  //hide result and input divs
  document.getElementById('go-button').addEventListener( "click", gapi.runAjax );
  gapi.changePlaceholder();
  // document.getElementById('go-button').addEventListener( "click", gapi.runAjax );

  $("#results").hide();

  //enter key support
  $('#searchTermInput').keypress(function(e){
    if(e.keyCode == 13) $('#go-button').click();
  });
  $('#yearInput').keypress(function(e){
    if(e.keyCode === 13) $('#go-button').click();
  });

  $("#go-button").click(function() {
      $("#results").fadeIn("slow");
  });
});
