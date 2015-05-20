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


test( "make sure runAjax() is working properly (which means makeurl is also working)", function() {
	
	var searchterm = "tennis";
	document.getElementById('searchTermInput').value = "tennis";
	var year = "1999";
	document.getElementById('yearInput').value = year;
	var testRequestUrl = gapi.runAjax();

  equal(testRequestUrl, 'http://content.guardianapis.com/search?' + 'from-date=' + year + '-01-01' + '&to-date=' + year + '-12-31' + '&order-by-relevance'+'&show-tags=keyword'+'&q=' + searchterm + '&api-key=2crhgqs3wjpe4vkh9x5j86yt' + "&show-fields=all");
   gapi.clearInputs();
});

