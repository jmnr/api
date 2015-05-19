test("check that the header exists", function() {
    var header = document.getElementById('heading');
    equal(header.innerHTML, 'TIME MACHINE', 'header is correct');
});

test("check that the css exists", function() {
    var header = getComputedStyle(document.getElementById('heading'), null).textAlign;
    equal(header, 'center', 'css is present');
});
