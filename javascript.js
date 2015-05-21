
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
          alert('There was a problem with the request. Please try again. ');
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
    
    // document.getElementById('labelTab1').innerHTML = response[0].webTitle;
    
    // var elem = document.getElementById("#results");
    //   elem.display = "initial";
    // document.getElementById("results").style.display = 'inherit';

    if (response.length == 0) {
      alert("Looks like there aren't any results to display! Try a different search term!")
    }

    else {
      // cleanContent(response);
      for (var i = 0; i < 3; i++) {
        document.getElementsByClassName('tab-labels')[i].innerHTML = shorten(response[i].webTitle);
        document.getElementsByClassName('tab-content')[i].innerHTML = response[i].fields.body;
        // document.getElementById('tab-title')[i].innerHTML = response[i].webTitle;
        // document.getElementById('tab-author')[i].innerHTML = "by " + response[i].fields.byline;
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

    /*
    $('go-button').click(function(){
      $('div').toggleClass('opa');
    });
    */
  };

  function makeurl (searchterm, year) {
    return ('http://content.guardianapis.com/search?' + 'from-date=' + 
      year + '-01-01' + '&to-date=' + year + '-12-31' + '&order-by-relevance'+'&show-tags=keyword'+'&q=' + 
      searchterm + '&api-key=2crhgqs3wjpe4vkh9x5j86yt' + "&show-fields=all" + "&show-most-viewed=true");
  };

  function runAjax () {
    var searchterm = multipleInputs(document.getElementById('searchTermInput').value.toString());
    // console.log(searchterm);
    var year = document.getElementById('yearInput').value.toString();
    var requestUrl = gapi.makeurl(searchterm, year);
    // console.log(requestUrl);
    gapi.AjaxGetRequest(requestUrl, gapi.displayResults);
  };

  function multipleInputs (searchinput) {
    //converts multiple word inputs into a single string with the space replaced by %20
    return searchinput.replace(" ", "%20");

  };

  function shorten (string) {
    return string.length > 20 ? string.substring(0, 17) + '...' : string;
  };
  
  function clearInputs () {
    document.getElementById('searchTermInput').value = "";
    document.getElementById('yearInput').value = "";
    for (var i=0; i<3; i++) {
      document.getElementsByClassName('tab-labels')[i].innerHTML = "";
      document.getElementsByClassName('tab-content')[i].innerHTML = "";
    }

  };

  function changePlaceholder (){
    var suggestTopic = ["Kangaroo", "Computer", "Penguins", "Narwhal", "3D Printing", "Honolulu", "Apple", "French People", "Llama", "Aubergine", "Christmas", "Ireland", "Technology", "Helicopter", "Beard", "Beer", "Pork", "Travel", "Fireworks", "Podcast"];
    var suggestYear = ["1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015"];

    setInterval( function() {
      document.getElementById('searchTermInput').setAttribute('placeholder', suggestTopic[Math.floor((Math.random()*10) + 1)]);
      document.getElementById('yearInput').setAttribute('placeholder', suggestYear[Math.floor((Math.random()*10) + 1)]);
      console.log(document.getElementById('searchTermInput').placeholder);
      console.log(document.getElementById('yearInput').placeholder);
     }, 1000);
  };

  return {
    AjaxGetRequest: AjaxGetRequest,
    displayResults: displayResults,
    makeurl: makeurl,
    runAjax: runAjax,
    shorten: shorten,
    clearInputs: clearInputs,
    changePlaceholder: changePlaceholder
  };

}());
