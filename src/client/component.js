import React from   "react"  ;

export  default React.createClass({
	getInitialState: function () {
		return {
			game: {
				state: {
					playerInTurn: "white",
					board: [
						[{color: "white"}, {color:null}],
						[{color: "black"}, {color:null}]
					]
				}
			}
		}
	},
    render: function () {
		console.log(this.state.game)
        return (
            <div>
				Player in turn: {this.state.game.state.playerInTurn}
				<button onClick={this.switchPlayer}>
					Switch player
				</button>
            </div>
        );
    },
	switchPlayer: function() {
		var state = this.state.game.state;
		if (state.playerInTurn === "white") {
			state.playerInTurn = "black";
		}
		else {
			state.playerInTurn = "white";
		}
		this.forceUpdate();
	}
});
