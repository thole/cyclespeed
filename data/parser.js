var fs = require('fs');
var parse = require('xml-parser');
var xml = fs.readFileSync('cycling.gpx', 'utf8');
var d3 = require('d3')
var moment = require('moment');

var obj = parse(xml);


function calculateSpeed(a,b){
	var pointA = [parseFloat(a.attributes.lon),parseFloat(a.attributes.lat)];
	var pointB = [parseFloat(b.attributes.lon),parseFloat(b.attributes.lat)];	
	var pointM = [(pointA[0] + pointB[0])/2,(pointA[1] + pointB[1])/2];
	var distance = d3.geo.distance(pointA,pointB) * 6371 * 1000;

	var timeA = null;
	a.children.forEach(function(d){
		if(d.name == 'time'){timeA = moment(d.content);}
	})
	var timeB = null;
	b.children.forEach(function(d){
		if(d.name == 'time'){timeB = moment(d.content);}
	})

	var diff = timeB.diff(timeA,'seconds');
	var speed = distance / diff;

	return [pointM[0],pointM[1],speed]
}

obj.root.children.forEach(function(trk){
	trk.children.forEach(function(trkseg){
		var lasttrkpoint = null;
		trkseg.children.forEach(function(trkpoint){
			if(lasttrkpoint != null){
				var result = calculateSpeed(lasttrkpoint,trkpoint);
				console.log(result[0] + ',' + result[1] + ',' + result[2])
			}
			lasttrkpoint = trkpoint;
		});
	});
});

//console.log(inspect(obj, { colors: true, depth: Infinity }));