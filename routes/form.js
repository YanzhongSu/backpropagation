var express = require('express');
var router = express.Router();

	// initinalization

// weight = {"w1": 0.1, "w2": 0.1, "w3": 0.1, "w4": 0.1, "w5": 0.1, "w6": 0.1, "w7": 0.1, "w8": 0.1,}
// var weight = weight_origin
// var biases = {"b1": 0.35, "b2":0.60}
// var hInput = {"h1": 0, "h2": 0}
// var hOutput = {"h1": 0, "h2": 0}
// var oInput = {"o1": 0, "o2": 0}
// var oOutput = {"o1": 0, "o2": 0}
// var totalerror = 0

/* GET form. */
router.get('/', function(req, res) {
  res.render('form', { title: 'Back Propogation' });
});

/* POST form. */
router.post('/', function(req, res) {
	var LEARNING_RATE = 0.5
	var input = { "i1": 0.05, "i2": 0.10}
	var output = {"o1": 0.01, "o2": 0.99}
	var weight_origin = {"w1": 0.15, "w2": 0.2, "w3": 0.25, "w4": 0.30, "w5": 0.40, "w6": 0.45, "w7": 0.50, "w8": 0.55,}
	var i = 0
	var round = req.body.round;
	input['i1'] = req.body.input1;
	input['i2'] = req.body.input2;
	output['o1'] = req.body.output1;
	output['o2'] = req.body.output2;

	console.log('input1 is: ', input['i1']);
	console.log('input2 is: ', input['i2']);

	console.log('output2 is: ', req.body.output2);
	console.log('output1 is: ', req.body.output1);
	console.log('round is: ', req.body.round);

	var tempdata1 = [];
	var weight = weight_origin;
	var x = 0;
	if (round > 10){
		x = parseInt(round/10);
		console.log(x);
	}else{
		x = 1;
	}

	for (i = 0; i < round; i++) {
		// console.log(round);
		// console.log(i);
		// var result2 = new Array();
		// // var weight = new Array();
		// result2 = backpro(i, weight);
		// var weight = new Array()
		// weight = result2['weight'];
		// console.log(result2);
		// *********************************************************
		var biases = {"b1": 0.35, "b2":0.60}
		var hInput = {"h1": 0, "h2": 0}
		var hOutput = {"h1": 0, "h2": 0}
		var oInput = {"o1": 0, "o2": 0}
		var oOutput = {"o1": 0, "o2": 0}
		var totalerror = 0
		// var hOutput = new Array()
		// var result = {'weight': weight, 'output': oOutput }
		// forwardpass
		// console.log(weight);
		// console.log(input);
		hInput['h1']= weight['w1']*input['i1']+ weight['w2']*input['i2']+ biases['b1']*1
		hInput['h2'] = weight['w3']*input['i1']+ weight['w4']*input['i2']+ biases['b1']*1
		hOutput['h1'] = 1/(1 + Math.exp(-hInput['h1']))
		hOutput['h2'] = 1/(1 + Math.exp(-hInput['h2']))

		oInput['o1'] = weight['w5']*hOutput['h1'] + weight['w6']*hOutput['h2'] + biases['b2']*1
		oInput['o2'] = weight['w7']*hOutput['h1'] + weight['w8']*hOutput['h2'] + biases['b2']*1
		oOutput['o1'] = 1/(1 + Math.exp(-oInput['o1']))
		oOutput['o2'] = 1/(1 + Math.exp(-oInput['o2']))
		// console.log( "netinputH:", hInput);
		// console.log( "outputH:", hOutput);
		// console.log("netinputO:", oInput);
		// console.log("outputO:", oOutput);

		// caculate totalerror
		totalerror = Math.pow((oOutput['o1'] - output['o1']), 2) + Math.pow((oOutput['o2'] - output['o2']), 2);
		// console.log( "the total error is:", totalerror);
		totalerror = totalerror/2.0
		// console.log( "the total error is:", totalerror);

		//backwardspass
		deltaO5 = -(output['o1'] - oOutput['o1'])*oOutput['o1']*(1-oOutput['o1'])
		deltaO6 = -(output['o1'] - oOutput['o1'])*oOutput['o1']*(1-oOutput['o1'])

		deltaO7 = -(output['o2'] - oOutput['o2'])*oOutput['o2']*(1-oOutput['o2'])
		deltaO8 = -(output['o2'] - oOutput['o2'])*oOutput['o2']*(1-oOutput['o2'])

		weight['w5'] = weight_origin['w5'] - LEARNING_RATE*deltaO5*hOutput['h1']
		weight['w6'] = weight_origin['w6'] - LEARNING_RATE*deltaO6*hOutput['h2']
		weight['w7'] = weight_origin['w7'] - LEARNING_RATE*deltaO7*hOutput['h1']
		weight['w8'] = weight_origin['w8'] - LEARNING_RATE*deltaO8*hOutput['h2']

		// console.log("weight+ is :", weight);
		deltaH1 = (deltaO5*weight_origin['w5'] + deltaO7*weight_origin['w7'])*hOutput['h1']*(1- hOutput['h1'])
		weight['w1'] = weight_origin['w1'] - LEARNING_RATE*deltaH1*input['i1']

		deltaH2 = (deltaO5*weight_origin['w5'] + deltaO7*weight_origin['w7'])*hOutput['h1']*(1- hOutput['h1'])
		weight['w2'] = weight_origin['w2'] - LEARNING_RATE*deltaH1*input['i2']

		deltaH3 = (deltaO6*weight_origin['w6'] + deltaO8*weight_origin['w8'])*hOutput['h2']*(1- hOutput['h2'])
		weight['w3'] = weight_origin['w3'] - LEARNING_RATE*deltaH1*input['i1']

		deltaH4 = (deltaO6*weight_origin['w6'] + deltaO8*weight_origin['w8'])*hOutput['h2']*(1- hOutput['h2'])
		weight['w4'] = weight_origin['w4'] - LEARNING_RATE*deltaH1*input['i2']

		// console.log( "weight+ is :", weight );

		// console.log("my function");
		// var m = jQuery.extend(true, {}, d);
		// var tempweight = jQuery.extend(true, {}, weight);
		// var result = new Array();
		var result = [];
		// result['input'] = input
		// result['weight'] = weight;
		result['output'] = oOutput;
		result['target_output'] = output;
		result['i'] = i+1;
		// *********************************************************

		if ((i+1)%x == 0 || i ==0)
		{
			tempdata1.push(result);
		}
	};
	// console.log(weight);
	  // console.log(req.body.input1);
	// downloadCSV('data.csv');
	// for (var i = tempdata1.length - 1; i >= 0; i--) {
	// 	console.log(tempdata1);
	// };
	res.render('user', { title: 'Back Propogation', input: input,output: output, data: tempdata1});
  // res.redirect('users');
});

function backpro(i, weight){
	var biases = {"b1": 0.35, "b2":0.60}
	var hInput = {"h1": 0, "h2": 0}
	var hOutput = {"h1": 0, "h2": 0}
	var oInput = {"o1": 0, "o2": 0}
	var oOutput = {"o1": 0, "o2": 0}
	var totalerror = 0
	// var hOutput = new Array()
	// var result = {'weight': weight, 'output': oOutput }
	// forwardpass
	// console.log(weight);
	// console.log(input);
	hInput['h1']= weight['w1']*input['i1']+ weight['w2']*input['i2']+ biases['b1']*1
	hInput['h2'] = weight['w3']*input['i1']+ weight['w4']*input['i2']+ biases['b1']*1
	hOutput['h1'] = 1/(1 + Math.exp(-hInput['h1']))
	hOutput['h2'] = 1/(1 + Math.exp(-hInput['h2']))

	oInput['o1'] = weight['w5']*hOutput['h1'] + weight['w6']*hOutput['h2'] + biases['b2']*1
	oInput['o2'] = weight['w7']*hOutput['h1'] + weight['w8']*hOutput['h2'] + biases['b2']*1
	oOutput['o1'] = 1/(1 + Math.exp(-oInput['o1']))
	oOutput['o2'] = 1/(1 + Math.exp(-oInput['o2']))
	// console.log( "netinputH:", hInput);
	// console.log( "outputH:", hOutput);
	// console.log("netinputO:", oInput);
	// console.log("outputO:", oOutput);

	// caculate totalerror
	totalerror = Math.pow((oOutput['o1'] - output['o1']), 2) + Math.pow((oOutput['o2'] - output['o2']), 2);
	// console.log( "the total error is:", totalerror);
	totalerror = totalerror/2.0
	// console.log( "the total error is:", totalerror);

	//backwardspass
	deltaO5 = -(output['o1'] - oOutput['o1'])*oOutput['o1']*(1-oOutput['o1'])
	deltaO6 = -(output['o1'] - oOutput['o1'])*oOutput['o1']*(1-oOutput['o1'])

	deltaO7 = -(output['o2'] - oOutput['o2'])*oOutput['o2']*(1-oOutput['o2'])
	deltaO8 = -(output['o2'] - oOutput['o2'])*oOutput['o2']*(1-oOutput['o2'])

	weight['w5'] = weight_origin['w5'] - LEARNING_RATE*deltaO5*hOutput['h1']
	weight['w6'] = weight_origin['w6'] - LEARNING_RATE*deltaO6*hOutput['h2']
	weight['w7'] = weight_origin['w7'] - LEARNING_RATE*deltaO7*hOutput['h1']
	weight['w8'] = weight_origin['w8'] - LEARNING_RATE*deltaO8*hOutput['h2']

	// console.log("weight+ is :", weight);
	deltaH1 = (deltaO5*weight_origin['w5'] + deltaO7*weight_origin['w7'])*hOutput['h1']*(1- hOutput['h1'])
	weight['w1'] = weight_origin['w1'] - LEARNING_RATE*deltaH1*input['i1']

	deltaH2 = (deltaO5*weight_origin['w5'] + deltaO7*weight_origin['w7'])*hOutput['h1']*(1- hOutput['h1'])
	weight['w2'] = weight_origin['w2'] - LEARNING_RATE*deltaH1*input['i2']

	deltaH3 = (deltaO6*weight_origin['w6'] + deltaO8*weight_origin['w8'])*hOutput['h2']*(1- hOutput['h2'])
	weight['w3'] = weight_origin['w3'] - LEARNING_RATE*deltaH1*input['i1']

	deltaH4 = (deltaO6*weight_origin['w6'] + deltaO8*weight_origin['w8'])*hOutput['h2']*(1- hOutput['h2'])
	weight['w4'] = weight_origin['w4'] - LEARNING_RATE*deltaH1*input['i2']

	// console.log( "weight+ is :", weight );

	// console.log("my function");
	// var m = jQuery.extend(true, {}, d);
	// var tempweight = jQuery.extend(true, {}, weight);
	// var result = new Array();
	var result = [];
	result['input'] = input
	result['weight'] = weight;
	result['output'] = oOutput;
	result['target_output'] = output;
	result['i'] = i+1;
	// console.log(result);
	// tempdata.push(result);
	// var result1 = new Array(result);
	return result;
}

function downloadCSV(filename) {  
    var data, link;
    var csv = convertArrayOfObjectsToCSV({
        data: tempdata
    });
    if (csv == null) return;

    filename = filename || 'export.csv';

    if (!csv.match(/^data:text\/csv/i)) {
        csv = 'data:text/csv;charset=utf-8,' + csv;
    }
    data = encodeURI(csv);
    console.log("csv file**************")
    console.log(data);
}

function convertArrayOfObjectsToCSV(args) { 

    var result, ctr, keys, columnDelimiter, lineDelimiter, data;

    data = args.data || null;
    if (data == null || !data.length) {
        return null;
    }

    columnDelimiter = args.columnDelimiter || ',';
    lineDelimiter = args.lineDelimiter || '\n';

    keys = Object.keys(data[0]);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    data.forEach(function(item) {
        ctr = 0;
        keys.forEach(function(key) {
            if (ctr > 0) result += columnDelimiter;

            result += item[key];
            ctr++;
        });
        result += lineDelimiter;
    });

    return result;
}

module.exports = router;