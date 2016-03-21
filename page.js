function generateTable(oldWidth, oldRatio, oldWheel, newWheel) {
    // Wipe out the table...
    $("#results").empty();

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
    var html = getTable(calculations);
    $("#results").append(html);
}

function getTable(assoc) {
    // Probably breaks old browsers...
    var tireWidths = Object.keys(assoc);

    var rowCount = tireWidths.length;
    var columnCount = Object.keys(assoc[tireWidths[0]]).length;

    var t = $("<table>").addClass('results-table');

    // Write the hed
    var r = $("<tr>");
    $("<td>").html("&nbsp;").appendTo(r);
    $.each(assoc[tireWidths[0]], function(section, item) {
        $("<td>").text(section).appendTo(r);
    });
    r.appendTo(t);

    // Write the table body
    $.each(assoc, function(i, tireWidth) {
        var r = $("<tr>");
        // First column tire width
        $("<td>").text(i).appendTo(r);
        // Second.. nth columns, the results
        $.each(tireWidth, function(j, differential) {
            var rounded = differential.ToFixed(2);
            $("<td>").text(rounded).appendTo(r);
        });
        r.appendTo(t);
    });

    return t;
}

$("#goButton").on("click", function(e) {
    var oldWidth = parseInt($("#oldWidth").val());
    var oldRatio = parseInt($("#oldProfile").val());
    var oldWheel = parseInt($("#oldWheelInches").val());
    var newWheel = parseInt($("#newWheelInches").val());
    generateTable(oldWidth, oldRatio, oldWheel, newWheel);
});
