
var tableData = data;


var filterType = d3.select("#filter-type");

var filterTypeValue = d3.select("#filter-type-value");


var submit = d3.select("#filter-btn");


var tbody = d3.select("tbody");

console.log(tableData);
autoPopulate(tableData);

function autoPopulate(tableData) {

    

tableData.forEach((alients) => {
    
    var row = tbody.append("tr");
    
    Object.entries(alients).forEach(([key, value]) => {
        
        var cell = row.append("td");
        cell.text(value);
    });
});

}

filterType.on("change", function() {
    var filterValue = filterType.property("value");
    d3.select("#filtertype").node().value = '';
    
    switch (filterValue) {
        case 'datetime':
            placeHolder = '1/1/2010';
            break;
        case 'city':
            placeHolder = 'city';
            break;
        case 'state':
            placeHolder = 'state';
            break;
        case 'country':
            placeHolder = 'country';
            break;
        case 'shape':
            placeHolder = 'shape';
            break;
        default:
            placeHolder = '';
    }
    d3.select("input").attr("placeholder", placeHolder);
    d3.select("label")
      .attr("for",filterValue)
      .text(`Enter a value for  ${filterValue.toUpperCase()}`);

    
});

submit.on("click", function() {
        
        
        d3.event.preventDefault();

        
        tbody.html("");

        
        var inputElement = d3.select("#filtertype");
         
        var inputValue = inputElement.property("value");
        
        if (inputValue == '') {
            alert("Please enter a value!");
            document.getElementById("#filtertype").focus();
            autoPopulate(tableData);
        }
        
        
        var typeVal = d3.select("label").attr("for");
        
        var filteredData = tableData.filter(alients => alients[typeVal] === inputValue.toLowerCase());
        if (filteredData.length == 0) {
            alert("try another value!");
            d3.select("#filtertype").node().value = '';
            autoPopulate(tableData);
        }
        console.log(filteredData);
        
        
        filteredData.forEach((alients) => {
            
            var row = tbody.append("tr");
            
            Object.entries(alients).forEach(([key, value]) => {
                
                var cell = row.append("td");
                cell.text(value);
            });
        });



})