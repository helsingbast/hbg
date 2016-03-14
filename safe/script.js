var margin = {top: 20, right: 20, bottom: 30, left: 60},
    width = 900 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
    
var formatPercent = d3.format(".0%");    

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .2);

var y = d3.scale.linear()
    .domain([105000, 140000])
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Population:</strong> <span style='color:white'>" + d.frequency + "</span>";
  })

var svg = d3.select("#graph1").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.call(tip);

d3.tsv("data.tsv", type, function(error, data) {
  x.domain(data.map(function(d) { return d.letter; }));
  y.domain([105000, 140000]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
 
    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(0)")
      .attr("y", -12)
        .attr("x", 8)
        .attr("font-size", 11)
        .attr("font-family", "ROBOTO")
      .attr("dy", "0")
      .style("text-anchor", "start")
      .text("Population");

  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.letter); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.frequency); })
      .attr("height", function(d) { return height - y(d.frequency); })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)

});

function type(d) {
  d.frequency = +d.frequency;
  return d;
}