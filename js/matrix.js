/*
MATRIX.JS
*/

var soundBoard = [];

// tile constructor
function Tile(x, y) {
	this.x = x;
	this.y = y;
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
			tile.className =  "tile col"+j;	//two classes: tile class, and column class (space delimited)
			var id = i+","+j;
			tile.id = id;
			row.appendChild(tile);
		}

		table.appendChild(row);
	}
	$('#matrix').append(table);


	//create array to process board updates
		var tileRow = [];

		for (var j = 0; j < 5; ++j) {
			var t = new Tile(i, j);
			tileRow.push(t);	//push adds to end of array
		}
		soundBoard.push(tileRow);
	}

	$('.tile').css("background-color", "#232344");


	$('.tile').click(function(tile) {
		update(tile.target.id);
	});


	//EVENT LOOP
	//  while(true) {

	//  	// console.log("what up");
	// 	$('#matrix').on('click', )

	// }


});

function update(id) {

		//NOTE: $(this) refers to a jquery object...in order to get the attributes
		//of the DOM element it attaches to, use .attr("name")
		// var position = $('#'+id).attr("id").split(',');	//get id of tile

		var tile = document.getElementById(id);
		var position = tile.id.split(',');

		console.log("came out with id: "+position);

		//STATUS: split and attr reads in the position correctly!
		// remember to convert id string to ints
		var x = Number(position[0]);
		var y = Number(position[1]);

		console.log("tile prev status" + soundBoard[x][y].isActive);
		soundBoard[x][y].isActive = !(soundBoard[x][y].isActive);
		console.log("tile curr status:" + soundBoard[x][y].isActive);

		if(soundBoard[x][y].isActive) {

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







