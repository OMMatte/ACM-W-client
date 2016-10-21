import React from "react";
import * as othelloGameFactory from "acm-w-game/src/game-factory"


export  default React.createClass({
	getInitialState: function () {
		return {
			game: othelloGameFactory.createDefault()
		}
	},
    render: function () {
		var gameState = this.state.game.state;
		var thisComponent = this;
		console.log(this.state.game);
		var borderStyle={border: "1px solid black"};
		return (
            <div>
				Player in turn: {gameState.playerInTurn}

				<button onClick={this.switchPlayer}>
					Switch player
				</button>

				<table style={borderStyle}>
				<tbody>
				{gameState.board.map(
					function(row,rowIndex){
						return (
							<tr style={borderStyle} key={rowIndex}>
							{
								row.map(
									function(cell,columIndex) {
										var cellColor;
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
												throw "Invalid cell.color value.";
										}

										var tdStyle = {
											border: "1px solid black",
											width: 20,
											height: 20,
											backgroundColor: cellColor
										};
										return (
										<td
											style={tdStyle}
											onClick={thisComponent.onCellClick.bind(thisComponent,{x: rowIndex,y: columIndex})}
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
		var move = {x:x, y:y, color:game.playerInTurn};
		var isValidMove = game.isValidMove(game, move);
		if (isValidMove) {
			console.log("The move is valid.");
			game.makeMove(game, move);
			this.forceUpdate();
		}
		else {
			console.log("The move is invalid.");
		}
	}
});
