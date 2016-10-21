import React from "react";
import * as othelloGameFactory from "acm-w-game/src/game-factory"


export  default React.createClass({
	getInitialState: function () {
		return {
			/*
			game: {
				state: {
					playerInTurn: "white",
					board: [
						[{color: "white"}, {color:null}],
						[{color: "black"}, {color:null}]
					]
				},
				isValidMove: function(game, {x,y,color}) {
					return true;
				},
				makeMove: function(game, move) {
					if (!game.isValidMove(game, move)) {
						throw "Invalid move: " + move;
					}
					game.state.board[move.y][move.x] = {color: move.color};
				}
			}
			*/
			game: othelloGameFactory.createDefault()
		}
	},
    render: function () {
		var game = this.state.game;
		var thisComponent = this;
		console.log(game);
		var borderStyle={border: "1px solid black"};
		return (
            <div>
				Player in turn: {game.state.playerInTurn}

				<button onClick={this.switchPlayer}>
					Switch player
				</button>

				<table style={borderStyle}>
				<tbody>
				{game.state.board.map(
					function(row,rowIndex){
						return (
							<tr style={borderStyle} key={rowIndex}>
							{
								row.map(
									function(cell,columIndex) {
										var cellColor;
										cellColor = thisComponent.getCellColor({x: columIndex, y: rowIndex});
										/*
										switch (cell.color) {
											case "white":
												cellColor="white";
												break;
											case "black":
												cellColor="black";
												break;
											case null:
												cellColor="green";
												break;
											default:
												throw "Invalid cell.color value: " + cellColor;
										}*/

										var tdStyle = {
											border: "1px solid black",
											width: 20,
											height: 20,
											backgroundColor: cellColor
										};
										return (
										<td 
											style={tdStyle} 
											onClick={thisComponent.onCellClick.bind(thisComponent,{x: columIndex, y: rowIndex})}
											key={columIndex}
										/>
										);
									})
							}
							</tr>
							);
					})
				}
				</tbody>
				</table>
            </div>
        );
    },
	switchPlayer: function() {
		var state = this.state.game.state;
		switch(state.playerInTurn) {
			case "white":
				state.playerInTurn = "black";
				break;
			case "black":
				state.playerInTurn = "white";
				break;
			default:
				throw "Invalid player in turn."
		}
		this.forceUpdate();
	},
	onCellClick: function({x,y}){
		var game = this.state.game;
		console.log("Pressed:","{",x,",",y,"}");
		var move = {x:x, y:y};
		var isValidMove = game.isValidMove(move);
		if (isValidMove) {
			console.log("The move is valid.");
			game.makeMove(move);
			this.forceUpdate();
		}
		else {
			console.log("The move is invalid.");
		}
	},
	getCellColor: function({x,y}) {
		var game = this.state.game;
		var cell = game.state.board[y][x];
		switch (cell.color) {
			case "white":
				return "white";
			case "black":
				return "black";
			case null:
				var move = {x:x, y:y};
				var isValidMove = game.isValidMove(move);
				return "green";
			default:
				throw "Invalid cell.color value: " + cell.color;
		}
	}
});
