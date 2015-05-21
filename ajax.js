 var gapi = {};

gapi.AjaxGetRequest = function(searchurl, callback){
  //console.log(searchurl);
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

gapi.displayResults = function(response) {
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
  for ( var i=0; i<3; i++) {
    // console.log(document.getElementsByClassName('tab-labels')[i]);
    document.getElementsByClassName('tab-labels')[i].innerHTML = gapi.shorten(response[i].webTitle);
    // console.log(document.getElementsByClassName('tab-labels')[i]);
    document.getElementsByClassName('tab-content')[i].innerHTML = response[i].fields.body;
  }

};

gapi.makeurl = function(searchterm, year) {
  return (
    'http://content.guardianapis.com/search?' + 'from-date=' + year + '-01-01' + '&to-date=' + 
    year + '-12-31' + '&order-by-relevance'+'&show-tags=keyword'+'&q=' + searchterm + '&api-key=2crhgqs3wjpe4vkh9x5j86yt' + 
    "&show-fields=all"
  );
};

gapi.runAjax = function() {
  var searchterm = document.getElementById('searchTermInput').value.toString();
  var year = document.getElementById('yearInput').value.toString();
  var requestUrl = gapi.makeurl(searchterm, year);
  gapi.AjaxGetRequest(requestUrl, gapi.displayResults);
  return requestUrl;
};

gapi.shorten = function(string) {
  return string.length > 25 ? string.substring(0, 25) + "..." : string;
};

gapi.clearInputs = function(){
  document.getElementById('searchTermInput').value = "";
  document.getElementById('yearInput').value = "";
  for (var i=0; i<3; i++) {
    document.getElementsByClassName('tab-labels')[i].innerHTML = "";
    document.getElementsByClassName('tab-content')[i].innerHTML = "";
  }
  
};

//////
/*
function AjaxGetRequest(searchurl,callback){
  console.log(searchurl);
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function(){
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        var response1 = JSON.parse(httpRequest.responseText).response.results;
        callback(response1);
        } else {
        console.log('There was a problem with the request.');
      }
    }
  };
  httpRequest.open("GET", searchurl, true);
  httpRequest.send();
}

var displayresults = function(responseT) {
  var list = document.getElementsByTagName('a');
  alert(list);
  for (var i =0; i<list.length; i++) {
           list[i].innerHTML  =   responseT[i].webTitle.toString();
           list[i].setAttribute('href', responseT[i].webUrl.toString());
        };
  };


var makeurl = function(searchterm, year) {
  var url = 'http://content.guardianapis.com/search?' + 'from-date=' + year + '-01-01' + '&to-date=' + year + '-12-31' + '&q=' + searchterm + '&api-key=2crhgqs3wjpe4vkh9x5j86yt' + "&show-fields=all";
  return url;
};

var runAjax = function() {
  var searchterm = document.getElementById('searcht').value.toString();
  var year = document.getElementById('year').value.toString();
  var url1 = makeurl(searchterm, year);
  AjaxGetRequest(url1, displayresults);
};
*/


