function generateTable(oldWidth, oldRatio, oldWheel, newWheel) {
    // Wipe out the table...
    $("results").empty();

    // TODO: Maybe just auto generate these instead of hardcoding
    var widths = [ 155, 165, 175, 185, 195, 205, 215, 225, 235, 245, 255 ];
    var sections = [ 40, 45, 50, 55, 60, 65, 70, 75, 80, 85 ];

    var calculations = {};
    var oldCircumference = calculateTireCircumference(oldWidth, oldRatio, oldWheel);

    // Build a 2D associative array
    for(var i in widths) {
        var newWidth = widths[i];
        calculations[newWidth] = {};
        for(var j in sections) {
            var newSection = sections[j];
            var newCircumference = calculateTireCircumference(newWidth, newSection, newWheel);
            var difference = calculateCircumferenceDifferential(oldCircumference, newCircumference);
            calculations[newWidth][newSection] = difference - 1.0;
        }
    }

    // Write it out to the dom
    var html = getTableHtml(calculations);
    $("results").append(html);
}

function getTableHtml(assoc) {
    // Probably breaks old browsers...
    var tireWidths = Object.keys(assoc);

    var rowCount = tireWidths.length;
    var columnCount = Object.keys(assoc[tireWidths[0]]).length;

    var t = $("<table>");

    $.each(assoc, function(i, tireWidth) {
        var r = $("<tr>");
        $("td").text(tireWidth).appendTo(r);
        r.appendTo(t);
    });

    return t.html();
}

$("#goButton").on("click", function(e) {
    var oldWidth = parseInt($("#oldWidth").val());
    var oldRatio = parseInt($("#oldProfile").val());
    var oldWheel = parseInt($("#oldWheelInches").val());
    var newWheel = parseInt($("#newWheelInches").val());
    generateTable(oldWidth, oldRatio, oldWheel, newWheel);
});
