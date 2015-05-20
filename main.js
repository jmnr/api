function AjaxGetRequest(url){
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function(){
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        // callback(httpRequest.responseText
        console.log('reached here')
          console.log(JSON.parse(httpRequest.responseText).response.results[0].fields);
        } else {
        console.log('There was a problem with the request.');
      }
    }
  };
  httpRequest.open("GET", url, true);
  httpRequest.send(null);
}

var makeurl = function(searchterm, year) {
  var url = 'http://content.guardianapis.com/search?' + 'from-date=' + year +
            '-01-01' + '&to-date=' + year + '-12-31' + '&q=' + searchterm +
            '&api-key=2crhgqs3wjpe4vkh9x5j86yt' + "&show-fields=all";
  //console.log(url);
  return url;
};

url1 = makeurl('Cricket', '1991');
AjaxGetRequest(url1);
