
var svg = d3.select('body').append('svg');

d3.csv('./data/output.csv',function(err, data) {
	var margin = {top: 30, right: 20, bottom: 100, left: 50},
    margin2  = {top: 210, right: 20, bottom: 20, left: 50},
    width    = 764 - margin.left - margin.right,
    height   = 283 - margin.top - margin.bottom,
    height2  = 283 - margin2.top - margin2.bottom;

    var x = d3.time.scale().range([0, width]),
    y   = d3.scale.linear().range([height, 0]);

  	var xAxis = d3.svg.axis().scale(x).orient('bottom'),
    yAxis   = d3.svg.axis().scale(y).orient('left');
// monotone
	var format = d3.format("1");
	xAxis.tickFormat(format);

	// var formaty = d3.format("1");
	// yAxis.tickFormat(formaty);

  	var priceLine = d3.svg.line()
    .interpolate('monotone')
    .x(function(d) { return x(d.no); })
    .y(function(d) { return y(d.output1); });

    var svg = d3.select('body').append('svg')
    .attr('class', 'chart')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom + 60);

	var make_y_axis = function () {
		return d3.svg.axis()
				.scale(y)
				.orient('left')
				.ticks(0.00001);
  	};

	  var focus = svg.append('g')
	    .attr('class', 'focus')
	    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    var xRange = d3.extent(data.map(function(d) {  return d.no; }));
    console.log("xRange is:", xRange);
    x.domain(xRange);
    // console.log("x.domain");
    console.log(d3.extent(data.map(function(d) { return d.output1; }))[0]);
    y.domain([d3.extent(data.map(function(d) { return d.output1; }))[0], d3.extent(data.map(function(d) { return d.output1; }))[1]]);


    // var min = d3.min(data.map(function(d) { return d.output1; }));
    // var max = d3.max(data.map(function(d) { return d.output1; }));

    focus.append('g')
    .attr('class', 'y chart__grid')
    .call(make_y_axis()
    .tickSize(-width, 0, 0)
    .tickFormat(''));

    var priceChart = focus.append('path')
    .datum(data)
    .attr('class', 'chart__line chart__price--focus line')
    .attr('d', priceLine);

    focus.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0 ,' + height + ')')
        .call(xAxis);

    focus.append('g')
        .attr('class', 'y axis')
        .attr('transform', 'translate(12, 0)')
        .call(yAxis);


	console.log(data);
	});