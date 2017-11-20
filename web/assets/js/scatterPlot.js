// Tutorials of (Scatterplot d3 beautiful) by Jaydev
//document.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/4.5.0/d3.min.js"></script>');
//document.write('<script src="https://d3js.org/d3-scale-chromatic.v1.min.js"></script>');
//document.write('<script src="https://d3js.org/d3-selection-multi.v1.min.js"></script>');

// insert csv raw url
d3.csv("https://raw.githubusercontent.com/ohahohah/d3.js-book-examples_/master/dataset/result.csv?token=AQ_o4o-_tSyV0DiZiiYdvdSFTp29mHcpks5aG3wEwA%3D%3D", function(data){
  /**
 * A D3 Scatter Plot chart with interactive nodes,
 * crosshair and custom axis grid.
 */

// var totalWidth = window.innerWidth;
// var totalHeight = window.innerHeight;
var totalWidth = 960;
var totalHeight = 500;

 var margin = {
  top: 20,
  left: 50,
  bottom: 30,
  right: 30
}

var width = (totalWidth - margin.left - margin.right);
// var width=2000;
var height = totalHeight - margin.top - margin.bottom;

var formatDecimal = d3.format(',.0f');

// DATA STUFF

var theData = [];

for (var i = 0; i < data.length; i++) {
  var item = {
    radius: 0.50,
    cx: Number(data[i].Date)+(Number(data[i].Date)%100*6.5),
    cy: data[i].Preference*100,
    genre: data[i].Ganre
  }
  theData.push(item);
}

// SIZE SCALE
var sizeDomain = d3.extent(theData, function(d) {
  return d.radius;
});

var sizeRange = [4, 6];

var sizeScale = d3.scaleLinear().domain(sizeDomain).range(sizeRange);

// X SCALE
var xDomain = d3.extent(theData, function(d) {
  return d.cx;
});

var xRange = [-190, width];
var xPadding = d3.mean(theData, function(d) {
  return d.cx
});
var xScale = d3.scaleLinear().domain(xDomain).range(xRange).nice(4.5);

// Y SCALE
var yDomain = d3.extent(theData, function(d) {
  return d.cy;
});
var yRange = [height, 0];
var yScale = d3.scaleLinear().domain(yDomain).range(yRange).nice(1);

// COLOR SCALE
var colorDomain = d3.extent(theData, function(d) {
  return d.radius
});

var colorize = d3.scaleSequential(d3.interpolateRdPu);

var colorScale = d3.scaleLinear()
.domain(colorDomain)
.range([0, 2]);

var xAxis = d3.axisBottom(xScale)
.ticks(7)
.tickSize(6)
.tickSizeInner(-height)
.tickSizeOuter(7);

var yAxis = d3.axisLeft(yScale).ticks(6)
.tickSizeInner(-width);
  //.tickSizeOuter(7);

// SVG GROUP HIERARCHY

var svg = d3.select('#scatterPlot').append('svg')
.attr("id", "scatterPlot")
// .attr("width", 1700)
.attr("width", totalWidth)
.attr("height", totalHeight);
  // .style( "background-color", "hsl(0, 0%, 100%)" )
  // .style( "border", "dashed 1px gray" );

  var mainGroup = svg.append("g")
  .attr("id", "mainGroup")
  .attr("transform", "translate( " + margin.left + ", " + margin.top + ")");

  var xAxisGroup = mainGroup.append("g")
  .attr("id", "xaxis")
  .attr("class", "axis")
  .attr("transform", "translate( 0," + height + ")")
  .call(function customXAxis(g) {
    g.call(xAxis);
    // g.select(".domain").remove();
    // g.selectAll(".tick:not(:first-of-type) line"). // selects all tick lines except first
    g.selectAll(".tick:not(:first-of-type) line")
    .attr("stroke", "#777")
    .attr("stroke-dasharray", "3,2");

    g.selectAll(".tick text")
    .attr("y", 9);
  });

  var yAxisGroup = mainGroup.append("g")
  .attr("id", "yaxis")
  .attr("class", "axis")
  .call(function customYAxis(g) {
    g.call(yAxis);
    //g.select(".domain").remove();
    g.selectAll(".tick:not(:first-of-type) line")
    .attr("stroke", "#777")
    .attr("stroke-dasharray", "3,2");
    g.selectAll(".tick text")
    .attr("x", -10);
  });

  var eventGroup = mainGroup.append("g")
  .attr('id', 'event-overlay');

  var crosshair = eventGroup.append("g")
  .attr("id", "crosshair");

  var eventRect = eventGroup.append('rect');

  var canvasGroup = eventGroup.append("g")
  .attr("id", "circleGroup");

// CHART ASSEMBLY

var crosshairSettings = {

  xLabelTextOffset: height + 12,
  yLabelTextOffset: -9,
  labelWidth: 60,
  labelHeight: 30,
  labelColor: "#aaa",
  labelStrokeColor: "none",
  labelStrokeWidth: "0.5px"

}

crosshair.append("line")
.attrs({
  "id": "focusLineX",
  "class": "focusLine",
    // "stroke" : "black",
    // "stroke-width" : 1,
    // "stroke-linecap" : "butt"
  });
crosshair.append("line")
.attrs({
  "id": "focusLineY",
  "class": "focusLine",
    //"stroke" : "black",
    //"stroke-width" : 1,
    //"stroke-linecap" : "butt"
  })

crosshair.append("rect") // x label bg
.attrs({
  "id": "focusLineXLabelBackground",
  "class": "focusLineLabelBackground",
  "fill": crosshairSettings.labelColor,
  "stroke": crosshairSettings.labelStrokeColor,
  "stroke-width": crosshairSettings.labelStrokeWidth,
    "width": crosshairSettings.labelWidth, // should be a size of corresponding txt!
    "height": crosshairSettings.labelHeight,
  });

crosshair.append("text")
.attrs({
  "id": "focusLineXLabel",
  "class": "label",
  "text-anchor": "middle",
  "alignment-baseline": "central",
});

var ylabel = crosshair.append("g").attr("id", "yLabelGroup");
ylabel.append("rect") // y label bg
.attrs({
  "id": "focusLineYLabelBackground",
  "class": "focusLineLabelBackground",
  "fill": crosshairSettings.labelColor,
  "stroke": crosshairSettings.labelStrokeColor,
  "stroke-width": crosshairSettings.labelStrokeWidth,
  "width": crosshairSettings.labelWidth,
  "height": crosshairSettings.labelHeight,
});
ylabel.append("text")
.attrs({
  "id": "focusLineYLabel",
  "class": "label",
  "text-anchor": "end",
  "alignment-baseline": "central"
});


canvasGroup.selectAll("circle")
.data(theData)
.enter()
.append('circle')
.attr("cx", function(d) {
  return xScale(d.cx)
})
.attr("cy", function(d) {
  return yScale(d.cy)
})
.attr("r", function(d) {
  return sizeScale(sizeDomain[0]);
})
.style("fill", function(d) {
  if(d.genre=="Ballade")
    return "#f46d43";
  else if(d.genre=="Dance")
    return "#66c2a5";
  else if(d.genre=="Trot")
    return "#abdda4";
  else if(d.genre=="Indie")
    return "#660E34";
  else if(d.genre=="Rap/Hiphop")
    return "#3288bd";
  else if(d.genre=="Folk/Blues")
    return "#5e4fa2";
  else if(d.genre=="Rock/Metal")
    return "#fee08b";
  else if(d.genre=="R&B/Soul")
    return "#d53e4f";
  else
    return "#222222";
    // return colorize(colorScale(d.radius));
  })
.style("opacity", 1)
.on("mouseover", function(d, i) {

  d3.select(this)
      .attrs({ // this == circle
        "stroke": "#ffffff",
        "stroke-width": "1.5px",
        "cursor": "pointer",
      })
      .styles({
        "fill": "#222A35",
      });
    crosshair.style('display', null); // enable crosshair visibility
    setCrosshair(xScale(d.cx), yScale(d.cy));

  })
.on("mouseout", function(d, i) {

  d3.select(this).attrs({
    "stroke": "none"
  })
  .style("fill", function(d) {
    if(d.genre=="Ballade")
      return "#f46d43";
    else if(d.genre=="Dance")
      return "#66c2a5";
    else if(d.genre=="Trot")
      return "#abdda4";
    else if(d.genre=="Indie")
      return "#660E34";
    else if(d.genre=="Rap/Hiphop")
      return "#3288bd";
    else if(d.genre=="Folk/Blues")
      return "#5e4fa2";
    else if(d.genre=="Rock/Metal")
      return "#fee08b";
    else if(d.genre=="R&B/Soul")
      return "#d53e4f";
    else
      return "#222222";
  });
})

.transition()
.attr("r", function(d) {
  return sizeScale(d.radius);
});

eventRect.attrs({
  'width': width,
  'height': height
})
.styles({
  'opacity': 0.0,
    'display': null // not eligible for events
  })
.on('mouseover', function() {
    // crosshair.attr("cursor", "crosshair");
    crosshair.style('display', null);

  })
.on('mouseout', function() {
  crosshair.style('display', 'none');

})
.on('mousemove', function handleMouseMove() {

    var mouse = d3.mouse(this); // this == eventrect

    var x = mouse[0];
    var y = mouse[1];

    setCrosshair(x, y);

  });

function setCrosshair(x, y) {

  d3.select('#focusLineX')
  .attr('x1', x)
  .attr('y1', 0)
  .attr('x2', x)
  .attr('y2', height + 6);

  d3.select('#focusLineY')
  .attr('x1', -6)
  .attr('y1', y)
  .attr('x2', width)
  .attr('y2', y);

  d3.select("#focusLineXLabel")
  .attr("x", x)
  .attr("y", height + 12)
  .text(formatDecimal((xScale.invert(x)-xScale.invert(x)%100)/100));
  d3.select("#focusLineXLabelBackground")
  .attr("transform", "translate( " + (x - crosshairSettings.labelWidth * 0.5) + " , " + (height + 5) + " )")
  .text(formatDecimal(xScale.invert(x)));

  d3.select("#focusLineYLabel")
  .attr("transform", "translate( -9, " + y + ")")
  .text(formatDecimal(yScale.invert(y)));
  d3.select("#focusLineYLabelBackground")
  .attr("transform", "translate( " + -crosshairSettings.labelWidth + ", " + (y - 8) + ")")

}

});
