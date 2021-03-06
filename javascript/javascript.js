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

    return httpRequest;
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
          authors[i].innerHTML = response[i].fields.byline;
        }

        var text = response[i].fields.body;
        content[i].innerHTML = text.length > 1000 ? text.substring(0, 1000) + '...' : text;

        readmore[i].setAttribute('href', response[i].webUrl);
        }
      }

      document.getElementsByClassName('nav-dots')[1].style.border = "";
      document.getElementsByClassName('nav-dots')[2].style.border = "";
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

  function jsonp(callback) {
    var searchterm = document.getElementById('searchTermInput').value.toString() || document.getElementById('searchTermInput').placeholder;
    var url = 'https://api.instagram.com/v1/tags/' + searchterm + '/media/recent?access_token=337128822.3210389.55a4db088dcf438bad39ec9a4eb34390';
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    window[callbackName] = function(data) {
      delete window[callbackName];
      document.body.removeChild(script);
      callback(data);
    };

    var script = document.createElement('script');
    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
  }

  function displayImages(instaImages) {
    var imageBox = document.getElementsByClassName('instagram');
    for(var i = 0; i < imageBox.length; i++) {
      console.log(instaImages.data[i].images.low_resolution.url);
      imageBox[i].src = instaImages.data[i].images.low_resolution.url;
    }
  }

  function clickHandle (func) {
    return function(){
      return gapi.jsonp(func);
    };
  }

  function placeholderStop () {
    document.getElementById('searchTermInput').setAttribute('placeholder', " ");
    document.getElementById('yearInput').setAttribute('placeholder', " ");
  }

  function toggleSlide (direction) {
      var elements = document.getElementsByClassName("hideable");
      var navdots = document.getElementsByClassName('nav-dots');
      var visibleID = getVisible(elements,navdots);
      elements[visibleID].style.display = "none";
      var makeVisible;
      if(!direction) {
          navdots[visibleID].style.border = "";
          makeVisible = prev(visibleID, elements.length);
      } else {
          navdots[visibleID].style.border = "";
          makeVisible = next(visibleID, elements.length);
      }
      elements[makeVisible].style.display = "block";
      navdots[makeVisible].style.border = "solid black 3px";
  }

  function getVisible (elements,navdots) {
      var visibleID = -1;
      for(var i = 0; i < elements.length; i++) {
          if(elements[i].style.display == "block") {
              visibleID = i;
          }
      }
      return visibleID;
  }

  function prev (num, arrayLength) {
      if(num === 0) {
        return arrayLength-1;
      } else {
        return num-1;
      }
  }

  function next (num, arrayLength) {
      if(num == arrayLength-1) {
        return 0;
      } else {
        return num+1;
      }
  }

  return {
    ajaxGetRequest: ajaxGetRequest,
    displayResults: displayResults,
    makeurl: makeurl,
    clearInputs: clearInputs,
    runAjax: runAjax,
    shorten: shorten,
    multipleInputs: multipleInputs,
    changePlaceholder: changePlaceholder,
    jsonp: jsonp,
    displayImages: displayImages,
    clickHandle: clickHandle,
    placeholderStop: placeholderStop,
    toggleSlide: toggleSlide,
    getVisible: getVisible,
    prev: prev,
    next: next

  };

}());

$(document).ready(function () {
  //hide result and input divs
  gapi.changePlaceholder();

  document.getElementById('go-button').addEventListener( "click", gapi.runAjax);
  document.getElementById('go-button').addEventListener( "click", gapi.clickHandle(gapi.displayImages));

  document.getElementById('search-box-container').addEventListener( "click", gapi.placeholderStop);
  document.getElementById('year').addEventListener( "click", gapi.placeholderStop);

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
      $('html, body').animate({
        scrollTop: $("#results").offset().top
      }, 1000);
  });
});
