var margin = {top: 40, right: 20, bottom: 30, left: 60},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var formatPercent = d3.format("%");

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis1 = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(function(d) { return d + "%"; });

var tip1 = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Tillväxt:</strong> <span style='color:white'>" + d.frequency + "</span>";
  })

var svg1 = d3.select("#graph2").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg1.call(tip1);

d3.tsv("hata.tsv", type, function(error, data) {
  x.domain(data.map(function(d) { return d.letter; }));
  y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

  svg1.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg1.append("g")
      .attr("class", "y axis")
      .call(yAxis1)
    .append("text")
      .attr("transform", "rotate(0)")
              .attr("y", -12)
        .attr("x", 8)
        .attr("font-size", 11)
        .attr("font-family", "ROBOTO")
      .attr("dy", ".71em")
      .style("text-anchor", "start")
      .text("Tillväxt");

  svg1.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.letter); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.frequency); })
      .attr("height", function(d) { return height - y(d.frequency); })
      .on('mouseover', tip1.show)
      .on('mouseout', tip1.hide)

});

function type(d) {
  d.frequency = +d.frequency;
  return d;
}