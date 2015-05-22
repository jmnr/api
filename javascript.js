//document.getElementById('go-button').addEventListener( "click", gapi.runAjax() });
// onclick="gapi.runAjax()"
var gapi = (function(){
  "use strict";

  function AjaxGetRequest (searchurl, callback){
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
      alert("Looks like there aren't any results to display! Try a different search term!")
    }

    else {
        // cleanContent(response);

        var titles = document.getElementsByClassName('titles');
        var authors = document.getElementsByClassName('article-author');
        var content = document.getElementsByClassName('article-content');
        var readmore = document.getElementsByClassName('read-more');
      for (var i = 0; i < 3; i++) {
        titles[i].innerHTML = response[i].webTitle;
        authors[i].innerHTML = "By " + response[i].fields.byline;
        content[i].innerHTML = response[i].fields.body;
        readmore[i].setAttribute('href', response[i].webUrl);
        }
      };

  }

    // function cleanContent (responseunclean) {
    //   for (var j =0; j< responseunclean.length; j++)
    //     for (var i = [webTitle, body, byLine, webUrl]) {
    //       if (response[j].i == undefined)
    //       {

    //       }
    //     }

    // }

  function makeurl (searchterm, year) {
    return ('http://content.guardianapis.com/search?' + 'from-date=' +
      year + '-01-01' + '&to-date=' + year + '-12-31' + '&order-by-relevance'+'&show-tags=keyword'+'&q=' +
      searchterm + '&api-key=2crhgqs3wjpe4vkh9x5j86yt' + "&show-fields=all" + "&show-most-viewed=true");
    };

  function runAjax () {
    var searchterm = document.getElementById('searchTermInput').value.toString();
    var year = document.getElementById('yearInput').value.toString();
    var requestUrl = gapi.makeurl(searchterm, year);
    gapi.AjaxGetRequest(requestUrl, gapi.displayResults);
    return requestUrl;
  };

  function clearInputs (){
    document.getElementById('searchTermInput').value = "";
    document.getElementById('yearInput').value = "";
    for (var i = 0; i < 3; i++) {
      document.getElementsByClassName('tab-labels')[i].innerHTML = "";
      document.getElementsByClassName('tab-content')[i].innerHTML = "";
    }
  };

  function multipleInputs (searchinput) {
    //converts multiple word inputs into a single string with the space replaced by %20
    return searchinput.replace(" ", "%20");
  };

  function shorten (string) {
    return string.length > 20 ? string.substring(0, 17) + '...' : string;
  };

  function changePlaceholder (){
    var suggestTopic = ["Kangaroo", "Computer", "Penguins", "Narwhal", "3D Printing", "Honolulu", "Apple", "French People", "Llama", "Aubergine", "Christmas", "Ireland", "Technology", "Helicopter", "Beard", "Beer", "Pork", "Travel", "Fireworks", "Podcast"];
    var suggestYear = ["1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015"];

    setInterval( function() {
      document.getElementById('searchTermInput').setAttribute('placeholder', suggestTopic[Math.floor((Math.random()*10) + 1)]);
      document.getElementById('yearInput').setAttribute('placeholder', suggestYear[Math.floor((Math.random()*10) + 1)]);
     }, 1000);
  };


  return {
    AjaxGetRequest: AjaxGetRequest,
    displayResults: displayResults,
    makeurl: makeurl,
    clearInputs: clearInputs,
    runAjax: runAjax,
    shorten: shorten,
    multipleInputs: multipleInputs,
    changePlaceholder: changePlaceholder
  }

}());

$(document).ready(function () {
  //hide result and input divs
  document.getElementById('go-button').addEventListener( "click", gapi.runAjax );
  gapi.changePlaceholder();

  $("#results").hide();

  //enter key support
  $('#searchTermInput').keypress(function(e){
    if(e.keyCode === 13) $('#go-button').click();
  });
  $('#yearInput').keypress(function(e){
    if(e.keyCode === 13) $('#go-button').click();
  });

  $("#go-button").click(function() {
      $("#results").fadeIn("slow");
  });
});
