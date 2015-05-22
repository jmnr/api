
// test("check that the header exists", function() {
//     equal(document.getElementById('intro-text').innerHTML, "<p>Put a topic and year into our Time Machine to read news IN THE PAST.</p>");
// });


// test("check that the css exists", function() {
//     var header = getComputedStyle(document.getElementById('heading'), null).textAlign;
//     equal(header, 'center', 'css is present');
// });

// test("is div invisible when page loads", function() {

// });

// test("is div visible when guardian api request comes back", function() {

// });

// test("is content being displayed from the guardian in div", function() {
//   var content = onclick is content returned;

// });

// test("asynchonrous test for is new tab correct guardian page", function() {

// });
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

// test("check that the icon exists", function() {
//     var header = document.getElementById('icon');
//     equal(header.alt, 'The Guardian: Time Machine', 'icon is correct');
// });


// test("check that the css exists", function() {
//     var header = getComputedStyle(document.getElementById('logo'), null).textAlign;
//     equal(header, 'center', 'css is present');
// });

// test("make sure runAjax() is working properly (which means makeurl is also working)", function() {

// 	var searchterm = "tennis";
//   var year = "1999";

// 	document.getElementById('searchTermInput').value = "tennis";
// 	document.getElementById('yearInput').value = "1999";

//   equal(gapi.runAjax(), 'http://content.guardianapis.com/search?' + 'from-date=' + year + '-01-01' + '&to-date=' + year + '-12-31' + '&order-by-relevance'+'&show-tags=keyword'+'&q=' + searchterm + '&api-key=2crhgqs3wjpe4vkh9x5j86yt' + "&show-fields=all" + "&show-most-viewed=true" );
//   gapi.clearInputs();
// });

// test( "test to make sure results are being displayed", function(assert) {
//   		var done = assert.async();
//   		var searchterm = "tennis";
//   		document.getElementById('searchTermInput').value = searchterm;
//   		var year = "1999";
//   		document.getElementById('yearInput').value = year;
//   		gapi.runAjax();

//   	setTimeout(function() {
//     		equal( document.getElementsByClassName('article-content')[0].innerHTML, "<p>Stubbord traditionalists - such as the Daily Telegraph - still refer to the Monte Carlo Open as a lawn tennis event, even though it is played on clay. It makes as much sense as calling Prince Charles's favourite recreation water polo.</p><p>In fact, many tennis players, including our own Tim Henman, probably regard the grass-court game as being as far removed from the clay-court variety as playing polo on a horse is from the version that requires swimming trunks and a rubber hat. Henman has won only seven of his 26 matches on clay - his latest failure coming in his opening match in Monte Carlo last Tuesday when he lost to the Brazilian Fernando Meligeni - and has still to register a win in the French Open, the premier clay-court event, although he has followed each of his three first-round defeats in Paris  by reaching at least the last eight at Wimbledon.</p><p>Apart from Wimbledon, though, the men's tour stages only five other tournaments on grass - two of them in Britain - and it is partly because we have been so obsessed with grass, while the rest of the world has either ignored it or turned away from it, that we have performed so abysmally on the international scene.</p><p>Tennis first moved outdoors - and on to grass - in England in the middle of the last century when the introduction of closely cropped garden lawns and bouncing rubber balls meant the game no longer had to stay inside, where variations such as real or royal tennis had been played for centuries.</p><p>The game was to spread with bewildering speed, certainly surprising the first Wimbledon champion, Spencer Gore, who wrote after his historic triumph in 1877 that 'want of variety' would prevent tennis from ever ranking among the great games.</p><p>How wrong he was. By the early 1880s the game had taken hold around the world, including in places where nurturing an English lawn was a vain hope, and there were numerous experiments with alternative surfaces: gravel, concrete, asphalt, basalt and, of course, clay, although clay only really works if it is mixed with something else. In South Africa in the early days, giant termite ant heaps, made up of sand and clay masticated by the insects, provided the ideal material for rolling out into a tennis court.</p><p>Nowadays, clay courts have little or no clay in them at all, the term being used generically to describe a type of court that is constructed of loose material bound together into a smooth, firm surface.</p><p>Only now is Britain finally accepting that tennis is no longer a grass-court game - the International Tennis Federation dropped Lawn from their title long ago - and waking up to the benefits of bringing up players on clay, whose slowness promotes the development of technique and shot-making and whose springiness is gentle with young limbs.</p><p>The programme of putting down clay courts in Britain has been dramatic. Five years ago there were fewer than 10 of tournament standard, now there are 130 and the target is 350. Unlike the rest of Europe, where red clay courts made of local materials are the norm, Britain has opted for American green clay, whose basic ingredient is degraded granite.</p><p>And I am assured that we have selected the green courts for practical reasons - they can be used for far more weeks of the year than red clay - and not to retain a last, defiant link with the English lawn.</p>");
//     		gapi.clearInputs();
//     		done();
//    	}, 200);

//   });

// test ("test to make sure makeurl is working", function() {
// 	var searchterm = "tennis";
// 	var year = "1999";
// 	var makeUrlTest = gapi.makeurl(searchterm, year);
// 	equal(makeUrlTest, 'http://content.guardianapis.com/search?' + 'from-date=' + year + '-01-01' + '&to-date=' + year + '-12-31' +
//   	'&order-by-relevance'+'&show-tags=keyword'+'&q=' + searchterm + '&api-key=2crhgqs3wjpe4vkh9x5j86yt' + "&show-fields=all" + "&show-most-viewed=true" );
//   	gapi.clearInputs();
// });


// test( "make sure runAjax() is working properly", function() {

// 	var searchterm = "tennis";
// 	document.getElementById('searchTermInput').value = "tennis";
// 	var year = "1999";
// 	document.getElementById('yearInput').value = year;
// 	var testRequestUrl = gapi.runAjax();

//   equal(testRequestUrl, 'http://content.guardianapis.com/search?' + 'from-date=' + year + '-01-01' + '&to-date=' + year + '-12-31' +
//   	'&order-by-relevance'+'&show-tags=keyword'+'&q=' + searchterm + '&api-key=2crhgqs3wjpe4vkh9x5j86yt' + "&show-fields=all");
//    gapi.clearInputs();
// });

// test("check that the guardian is returning content", function(assert) {

//   var done = assert.async();

// 	document.getElementById('searchTermInput').value = "orange";
// 	document.getElementById('yearInput').value = "2001";

//   $( "#go-button" ).trigger( "click" ); //or gapi.runAjax();

//   setTimeout(function() {
//     equal(titles[0].innerHTML, "Theatre review: B...", 'shorten function and api content return is working');
//     done();
//   }, 1000);
// });
