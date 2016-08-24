/*
MATRIX.JS
*/

var soundBoard = [];
var increment = 0;

// tile constructor
function Tile(col, row) {
	this.col = col;
	this.row = row;
	this.isActive = false;
}

$(document).ready(function() {

	//frontend html table
	var table = document.createElement('table');

	for (var i = 0; i<5; ++i) {
		var row = document.createElement('tr');
		row.id = "row"+i

		for (var j = 0; j < 5; ++j) {
			var tile = document.createElement('td');
			// tile.className =  "tile col"+j;	//two classes: tile class, and column class (space delimited)
			var id = j+","+i;
			tile.id = id;
			row.appendChild(tile);
		}

		table.appendChild(row);
	}
	$('#matrix').append(table);


	//create array to process board updates
	for (var i = 0; i<5; ++i) {
		var tileCol = [];

		for (var j = 0; j < 5; ++j) {
			var t = new Tile(i, j);
			tileCol.push(t);	//push adds to end of array
		}
		soundBoard.push(tileCol);
	}

	$('td').css("background-color", "#232344");

 	$('td').click(function(tile) {
		update(tile.target.id);
	});

	//EVENT LOOP
	console.log("calling reader");
	var reader = setInterval(function(){
		read(soundBoard, increment);
		increment++;
	}, 1000);

});

function read(soundBoard, increment) {
	var col = increment % 5;
	console.log("column to be updated: "+col);

	var tileCol = soundBoard[col];

	//iterate through the list, add any active tiles to a new list
	//iterate through active tile list:
	//for each tile, retrieve the corres. html element based on tile.x and tile.y
		//then change class of that element to 'active' or sth
	//use multiple elements selector to select all active elements
	//change css accordingly
	//use multiple elements selector again to add 'deactivated' class
	//use multiple elements selector to remove the 'active' class
		//OR: just select all td elements and remove all classes

	var updateList = [];
	var colLength = tileCol.length;
	for (var i = 0; i<colLength; i++) {
		var tile = tileCol[i];
		if(tile.isActive) {
			col = tile.col;
			row = tile.row;
			var id = col+","+row;

			// console.log("retrieved id: " + id);

			var htmlTile= document.getElementById(id);
			htmlTile.className="active";


			//for passing into audio class?
			updateList.push(id);
		}
	}

	//make tiles highlight upon turn
	$('.active').effect("highlight", {color:"#cccc00"}, 800);

	// $('.active').animate({backgroundColor: '#cccc00'}, 750);
	// $('.active').animate({backgroundColor: '#FFFFFF'}, 750);


	//play sound here (call function from other js file?)
	playCol(updateList);

	//remove highlight/class at end
	$('td').removeClass("active");
}

function update(id) {

		//NOTE: $(this) refers to a jquery object...in order to get the attributes
		//of the DOM element it attaches to, use .attr("name")
		// var position = $('#'+id).attr("id").split(',');	//get id of tile

		var tile = document.getElementById(id);
		var position = tile.id.split(',');

		console.log("came out with id: "+position);

		//STATUS: split and attr reads in the position correctly!
		// remember to convert id string to ints
		var col = Number(position[0]);
		var row = Number(position[1]);

		console.log("tile prev status" + soundBoard[col][row].isActive);
		soundBoard[col][row].isActive = !(soundBoard[col][row].isActive);
		console.log("tile curr status:" + soundBoard[col][row].isActive);

		if(soundBoard[col][row].isActive) {

			tile.style.background = "#FFFFFF";
			//change tile color to white
			//execute sound blip function in regular intervals
		}
		else {
			tile.style.background = "#232344";
			//change tile color back to black
			//stop any sound blip function
		}
}







