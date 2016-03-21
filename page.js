function generateTable(oldWidth, oldRatio, oldWheel, newWheel) {
    // Wipe out the table...
    $("results").empty();

    // TODO: Maybe just auto generate these instead of hardcoding
    var widths = [ 155, 165, 175, 185, 195, 205, 215, 225, 235, 245, 255 ];
    var sections = [ 40, 45, 50, 55, 60, 65, 70, 75, 80, 85 ];

    var calculations = {};
    var oldCircumference = calculateTireCircumference(oldWidth, oldRatio, oldWheel);

    // Build a 2D associative array
    for(var newWidth in widths) {
        calculations[newWidth] = {};
        for(var newSection in sections) {
            var newCircumference = calculateTireCircumference(newWidth, newSection, newWheel);
            var difference = calculateCircumferenceDifferential(oldCircumference, newCircumference);
            calculations[newWidth][newSection] = difference;
        }
    }

    // Write it out to the dom
    var html = getTableHtml(calculations);
    $("results").append(html);
}

function getTableHtml(assoc) {
}

$("#goButton").on("click", function(e) {
    generateTable();
});
