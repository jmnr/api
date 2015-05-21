test("check that the header exists", function() {
    var header = document.getElementById('heading');
    equal(header.innerHTML, 'TIME MACHINE', 'header is correct');
});

test("check that the css exists", function() {
    var header = getComputedStyle(document.getElementById('heading'), null).textAlign;
    equal(header, 'center', 'css is present');
});

test("is div invisible when page loads", function() {

});

test("is div visible when guardian api request comes back", function() {

});

test("is content being displayed from the guardian in div", function() {
  var content = onclick is content returned;

});

test("asynchonrous test for is new tab correct guardian page", function() {

});
