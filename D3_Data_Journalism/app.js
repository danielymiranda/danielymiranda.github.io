// D3 Challenge
// Seteo del los margenes y de la grafica

// Largo del Conteiner
var width = parseInt(d3.select("#scatter").style("width"));

// Altura de la grafica
var height = width - width / 5.0;

// Margen de la grafica
var margin = 3;

// Espacio entre las palabras
var labelArea = 130;

// padding 
var tPadBot = 40;
var tPadLeft = 40;

// SVG wrapper, append an SVG group 
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("class", "chart");


// Radio para los puntos en la grafica
var circRadius;
function crGet() {
  if (width <= 550) {
    circRadius = 5;
  }
  else {
    circRadius = 10;
  }
}
crGet();


// Labels

// Eje X

// Grupo para las X
svg.append("g").attr("class", "xText");

// Selector para las X
var xText = d3.select(".xText");


function xTextRefresh() {
  xText.attr(
    "transform",
    "translate(" +
      ((width - labelArea) / 2 + labelArea) +
      ", " +
      (height - margin - tPadBot) +
      ")"
  );
}
xTextRefresh();

// 3 Textos para el eje de las X
// Poverty
xText
  .append("text")
  .attr("y", -26)
  .attr("data-name", "poverty")
  .attr("data-axis", "x")
  .attr("class", "aText active x")
  .text("In Poverty (%)");
// Edad
xText
  .append("text")
  .attr("y", 0)
  .attr("data-name", "age")
  .attr("data-axis", "x")
  .attr("class", "aText inactive x")
  .text("Age (Median)");
// Income
xText
  .append("text")
  .attr("y", 26)
  .attr("data-name", "income")
  .attr("data-axis", "x")
  .attr("class", "aText inactive x")
  .text("Household Income (Median)");


// Definir las variables
var leftTextX = margin + tPadLeft;
var leftTextY = (height + labelArea) / 2 - labelArea;

// Crear grupo para las variables
svg.append("g").attr("class", "yText");

// selector para X
var yText = d3.select(".yText");


// Xtext transform property
function yTextRefresh() {
  yText.attr(
    "transform",
    "translate(" + leftTextX + ", " + leftTextY + ")rotate(-90)"
  );
}
yTextRefresh();

// append the text
// Obesidad
yText
  .append("text")
  .attr("y", -26)
  .attr("data-name", "obesity")
  .attr("data-axis", "y")
  .attr("class", "aText active y")
  .text("Obese (%)");

// Fumador?
yText
  .append("text")
  .attr("x", 0)
  .attr("data-name", "smokes")
  .attr("data-axis", "y")
  .attr("class", "aText inactive y")
  .text("Smokes (%)");

// Sin servicio medico
yText
  .append("text")
  .attr("y", 26)
  .attr("data-name", "healthcare")
  .attr("data-axis", "y")
  .attr("class", "aText inactive y")
  .text("Lacks Healthcare (%)");


// Importar Datos

d3.csv("data.csv").then(function(data) {
  // visualizar la data
  visualize(data);
});

// funcion de visualizacion
function visualize(theData) {


  var curX = "poverty";
  var curY = "obesity";

  // empty variables para min and max values of x and y.
 var xMin;
  var xMax;
  var yMin;
  var yMax;

  var toolTip = d3
    .tip()
    .attr("class", "d3-tip")
    .offset([40, -60])
    .html(function(d) {
     
      var theX;
      // Nombres de los estados
      var theState = "<div>" + d.state + "</div>";
      // key and value de las Ys
      var theY = "<div>" + curY + ": " + d[curY] + "%</div>";
     
      if (curX === "poverty") {
        // x key y formato
        theX = "<div>" + curX + ": " + d[curX] + "%</div>";
      }
      else {
     
        
        theX = "<div>" +
          curX +
          ": " +
          parseFloat(d[curX]).toLocaleString("en") +
          "</div>";
      }
      return theState + theX + theY;
    });

  // toolTip function.
  svg.call(toolTip);


  
  function xMinMax() {
    
    xMin = d3.min(theData, function(d) {
      return parseFloat(d[curX]) * 0.90;
    });

   
    xMax = d3.max(theData, function(d) {
      return parseFloat(d[curX]) * 1.10;
    });
  }

  // cambias el min y max por y
  function yMinMax() {
    
    yMin = d3.min(theData, function(d) {
      return parseFloat(d[curY]) * 0.90;
    });

    
    yMax = d3.max(theData, function(d) {
      return parseFloat(d[curY]) * 1.10;
    });
  }

  
  function labelChange(axis, clickedText) {
    // se cambia de activo a no activo
    d3
      .selectAll(".aText")
      .filter("." + axis)
      .filter(".active")
      .classed("active", false)
      .classed("inactive", true);

    
    clickedText.classed("inactive", false).classed("active", true);
  }

  
  // obtenemos el min y max de x and y.
  xMinMax();
  yMinMax();

   // ccreamos la escala
   var xScale = d3
    .scaleLinear()
    .domain([xMin, xMax])
    .range([margin + labelArea, width - margin]);
  var yScale = d3
    .scaleLinear()
    .domain([yMin, yMax])
    .range([height - margin - labelArea, margin]);

   // usamos lo de arriba para los axis 
  var xAxis = d3.axisBottom(xScale);
  var yAxis = d3.axisLeft(yScale);

  // cuanto sera el tick?
  function tickCount() {
    if (width <= 500) {
      xAxis.ticks(5);
      yAxis.ticks(5);
    }
    else {
      xAxis.ticks(10);
      yAxis.ticks(10);
    }
  }
  tickCount();


  
  svg
    .append("g")
    .call(xAxis)
    .attr("class", "xAxis")
    .attr("transform", "translate(0," + (height - margin - labelArea) + ")");
  svg
    .append("g")
    .call(yAxis)
    .attr("class", "yAxis")
    .attr("transform", "translate(" + (margin + labelArea) + ", 0)");

  // creamos grupos
  var theCircles = svg.selectAll("g theCircles").data(theData).enter();

  // append los circulos
  theCircles
    .append("circle")
    // especificamos lugar, tamaño y clase
    .attr("cx", function(d) {
      return xScale(d[curX]);
    })
    .attr("cy", function(d) {
      return yScale(d[curY]);
    })
    .attr("r", circRadius)
    .attr("class", function(d) {
      return "stateCircle " + d.abbr;
    })
    // hover 
    .on("mouseover", function(d) {
    
      toolTip.show(d, this);
    
      d3.select(this).style("stroke", "#323232");
    })
    .on("mouseout", function(d) {
      // remove the tooltip
      toolTip.hide(d);
      
      d3.select(this).style("stroke", "#e3e3e3");
    });

// abreviacion de los estados en los circulos
  theCircles
    .append("text")

    .text(function(d) {
      return d.abbr;
    })
    
    .attr("dx", function(d) {
      return xScale(d[curX]);
    })
    .attr("dy", function(d) {
      return yScale(d[curY]) + circRadius / 2.5;
    })
    .attr("font-size", circRadius)
    .attr("class", "stateText")
    // hover Rules
    .on("mouseover", function(d) {
     
      toolTip.show(d);

      d3.select("." + d.abbr).style("stroke", "#323232");
    })
    .on("mouseout", function(d) {
      // remove tooltip
      toolTip.hide(d);
  
      d3.select("." + d.abbr).style("stroke", "#e3e3e3");
    });


  // Grafica interactiva
  

  // seleccionar un eje y agregar el click event 
  d3.selectAll(".aText").on("click", function() {
    
    var self = d3.select(this);

   
    if (self.classed("inactive")) {
      // obtener el nombre y el eje salvado en el label
      var axis = self.attr("data-axis");
      var name = self.attr("data-name");

      if (axis === "x") {
        
        curX = name;

        
        xMinMax();

       
        xScale.domain([xMin, xMax]);

       
        svg.select(".xAxis").transition().duration(300).call(xAxis);

        // update la ubicacion de los estados
        d3.selectAll("circle").each(function() {
          d3
            .select(this)
            .transition()
            .attr("cx", function(d) {
              return xScale(d[curX]);
            })
            .duration(300);
        });

        // cambiar la ubicacion de los estados en texto
        d3.selectAll(".stateText").each(function() {
          // le damos a cada estado el mismo motion como el  matching circle
          d3
            .select(this)
            .transition()
            .attr("dx", function(d) {
              return xScale(d[curX]);
            })
            .duration(300);
        });

       
        labelChange(axis, self);
      }
      else {
       
        curY = name;

        // cambiar el min y el max del eje Y
        yMinMax();

        // update el domain de la Y
        yScale.domain([yMin, yMax]);

        // update y axis
        svg.select(".yAxis").transition().duration(300).call(yAxis);

        // update la ubicacion de los estados
        d3.selectAll("circle").each(function() {
          d3
            .select(this)
            .transition()
            .attr("cy", function(d) {
              return yScale(d[curY]);
            })
            .duration(300);
        });

        
        d3.selectAll(".stateText").each(function() {
          d3
            .select(this)
            .transition()
            .attr("dy", function(d) {
              return yScale(d[curY]) + circRadius / 3;
            })
            .duration(300);
        });

 
        labelChange(axis, self);
      }
    }
  });



  

  // Respuesta Mobil

  d3.select(window).on("resize", resize);

  
  function resize() {
    // se ajusta la pantalla
    width = parseInt(d3.select("#scatter").style("width"));
    height = width - width / 3.9;
    leftTextY = (height + labelArea) / 2 - labelArea;

 
    svg.attr("width", width).attr("height", height);

    // se cambia la escala
    xScale.range([margin + labelArea, width - margin]);
    yScale.range([height - margin - labelArea, margin]);

    
    svg
      .select(".xAxis")
      .call(xAxis)
      .attr("transform", "translate(0," + (height - margin - labelArea) + ")");

    svg.select(".yAxis").call(yAxis);

    // update the ticks 
    tickCount();

    // update las etiquetas
    xTextRefresh();
    yTextRefresh();

    // update el radio
    crGet();

    // update la ubicacion y el radio de los estados
    d3
      .selectAll("circle")
      .attr("cy", function(d) {
        return yScale(d[curY]);
      })
      .attr("cx", function(d) {
        return xScale(d[curX]);
      })
      .attr("r", function() {
        return circRadius;
      });

    
    d3
      .selectAll(".stateText")
      .attr("dy", function(d) {
        return yScale(d[curY]) + circRadius / 3;
      })
      .attr("dx", function(d) {
        return xScale(d[curX]);
      })
      .attr("r", circRadius / 3);
  }
}