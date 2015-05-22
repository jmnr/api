test("check that the icon exists", function() {
    var header = document.getElementById('logo');
    equal(header.alt, 'The Guardian: Time Machine', 'icon is correct');
});


test("check that the css loads up properly", function() {
    var header = getComputedStyle(document.getElementById('logo'), null).textAlign;
    equal(header, 'center', 'css is present');
});


test ("test to make sure makeurl is working", function() {
	var searchterm = "tennis";
	var year = "1999";
	var makeUrlTest = gapi.makeurl(searchterm, year);
	equal(makeUrlTest, 'http://content.guardianapis.com/search?' + 'from-date=' + year + '-01-01' + '&to-date=' + year + '-12-31' +
  	'&order-by-relevance'+'&show-tags=keyword'+'&q=' + searchterm + '&api-key=2crhgqs3wjpe4vkh9x5j86yt' + "&show-fields=all" + "&show-most-viewed=true" );
});

test( "make sure runAjax() is working properly", function() {
	var searchterm = "tennis";
	document.getElementById('searchTermInput').value = "tennis";
	var year = "1999";
	document.getElementById('yearInput').value = year;
	var testRequestUrl = gapi.runAjax();
  	equal(testRequestUrl, 'http://content.guardianapis.com/search?' + 'from-date=' + year + '-01-01' + '&to-date=' + year + '-12-31' +
  		'&order-by-relevance'+'&show-tags=keyword'+'&q=' + searchterm + '&api-key=2crhgqs3wjpe4vkh9x5j86yt' + "&show-fields=all" + "&show-most-viewed=true");
});

test("check that the guardian is returning content", function(assert) {
  var done = assert.async();
  document.getElementById('searchTermInput').value = "orange";
  document.getElementById('yearInput').value = "2001";
  $( "#go-button" ).trigger( "click" );
	  setTimeout(function() {
	    equal(document.getElementsByClassName('titles')[0].innerHTML, "Theatre review: Blue Orange");
	    done();
	  }, 1000);
});

test("content is diplayed in the second tab", function(assert){
   var done = assert.async();
   document.getElementById('searchTermInput').value = "orange";
   document.getElementById('yearInput').value = "2001";
   $( "#go-button" ).trigger( "click" );
    // waits for the next page to load
   setTimeout(function() {
   		$("#next-button").trigger( "click" );
   		 		setTimeout(function() {
	    			var hello = document.getElementsByClassName('titles')[1].innerHTML;
	      			equal(hello,'Nigel Slater: Orange squash');
	      			done();
	      		}, 200);
   		}, 200);
  });





