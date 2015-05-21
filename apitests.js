// // test( "clicking submit runs the ajax function", function() {
// // 	document.getElementById("#submitbutton").trigger("click");
// //   equal( something that we want to happen, what we excpected);
// // });

// setTimeout(function() { // this is only here so you can see the page change!
// test("content is diplayed in the default tab", function(assert){
//     var done = assert.async();
//     set search field one to tennis
//     set setachfireld two to 2000  // done is actually a function that we will call later to confirm the test has finished
//     document.getElementById('#submitbutton').click(); // invoking a mock click event in the browser

//     // waits for the next page to load
//     setTimeout(function() {
//     	var hello = document.getElementsByTag('h3').innerHTML;
//       	equal(hello,'title of article we were expecting');
//       	done();
//     }, 200);
//   });
// }, 2000);

// setTimeout(function() { // this is only here so you can see the page change!
// test("content is displayed on a seperate tab", function(assert){
//     var done = assert.async();  // done is actually a function that we will call later to confirm the test has finished
//     document.getElementById('clickme').click(); // invoking a mock click event in the browser

//     // waits for the next page to load
//     setTimeout(function() {
//    		document.getElementById('#secondaryTab').click()
//       	var hello = document.getElementsTag('h1').innerHTML;
//       	equal(hello,'title of article');
//       	done();
//      	// click default tab again to go back to the way things were.
//      	document.getElementById('#defaultTab').click()
//     }, 200);
//   });
// }, 2000);
/*
test("check that the icon exists", function() {
    var header = document.getElementById('icon');
    equal(header.alt, 'The Guardian: Time Machine', 'icon is correct');
});
*/
test("check that the css exists", function() {
    var header = getComputedStyle(document.getElementById('logo'), null).textAlign;
    equal(header, 'center', 'css is present');
});

test("make sure runAjax() is working properly (which means makeurl is also working)", function() {

	var searchterm = "tennis";
  var year = "1999";

	document.getElementById('searchTermInput').value = "tennis";
	document.getElementById('yearInput').value = "1999";

  equal(gapi.runAjax(), 'http://content.guardianapis.com/search?' + 'from-date=' + year + '-01-01' + '&to-date=' + year + '-12-31' + '&order-by-relevance'+'&show-tags=keyword'+'&q=' + searchterm + '&api-key=2crhgqs3wjpe4vkh9x5j86yt' + "&show-fields=all");

});

test("check that the guardian is returning content", function(assert) {

  var done = assert.async();

	document.getElementById('searchTermInput').value = "orange";
	document.getElementById('yearInput').value = "2001";

  $( "#go-button" ).trigger( "click" ); //or gapi.runAjax();

  setTimeout(function() {
    equal(document.getElementById('labelTab1').textContent, "Theatre review: B...", 'shorten function and api content return is working');
    done();
  }, 1000);
});
