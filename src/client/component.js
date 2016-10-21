import React from "react";
import * as othelloGameFactory from "acm-w-game/src/game-factory";
import * as othelloCore from "acm-w-game/src/core";

var GameComponent = React.createClass({
    render: function () {
        var thisComponent = this;
        var gameState = this.props.gameState;
        var borderStyle = {border: "1px solid black"};

        return (
            <table style={borderStyle}>
                <tbody>
                {gameState.board.map(
                    function (row, rowIndex) {
                        return (
                            <tr style={borderStyle} key={rowIndex}>
                                {
                                    row.map(
                                        function (cell, columIndex) {
                                            var cellColor;
                                            cellColor = thisComponent.getCellColor({x: columIndex, y: rowIndex});

                                            var tdStyle = {
                                                border: "1px solid black",
                                                width: 50,
                                                height: 50,
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
        )
    },
    onCellClick: function (pos) {
        this.props.onCellClick(pos);
    },
    getCellColor: function ({x,y}) {
        var gameState = this.props.gameState;
        var cell = gameState.board[y][x];
        switch (cell.color) {
            case "white":
                return "white";
            case "black":
                return "black";
            case null:
                var move = {x: x, y: y};
                var isValidMove = othelloCore.isValidMove(gameState, move);
                return isValidMove ? "green" : "gray";
            default:
                throw "Invalid cell.color value: " + cell.color;
        }
    }
});

export  default React.createClass({
    getInitialState: function () {
        return {
            game: othelloGameFactory.createDefault(),
            historyIndex: null
        }
    },
    render: function () {
        var game = this.state.game;
        var thisComponent = this;
        console.log(game);

        var visualGameState = this.state.historyIndex === null ? game.state : game.state.history[this.state.historyIndex];

        return (
            <div>

                <button onClick={this.switchPlayer}>
                    Switch player
                </button>

                {game.state.history.length !== 0 && (thisComponent.state.historyIndex === null || thisComponent.state.historyIndex > 0) ? (
                    <button onClick={this.stepBack}>
                        Step back
                    </button>) : null}

                {thisComponent.state.historyIndex !== null ? (
                    <button onClick={this.stepForward}>
                        Step forward
                    </button>) : null}

                <h1>Player in turn: {visualGameState.playerInTurn}</h1>
                <h1>White player score: {othelloCore.score(visualGameState, "white")}</h1>
                <h1>Black player score: {othelloCore.score(visualGameState, "black")}</h1>
                <GameComponent gameState={visualGameState} onCellClick={thisComponent.onCellClick}/>
            </div>
        );
    },
    switchPlayer: function () {
        var state = this.state.game.state;
        switch (state.playerInTurn) {
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
    onCellClick: function ({x,y}) {
        if (this.state.historyIndex !== null) {
            return;
        }
        var game = this.state.game;
        console.log("Pressed:", "{", x, ",", y, "}");
        var move = {x: x, y: y};
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
    stepBack: function () {
        var game = this.state.game;
        if (this.state.historyIndex === null) {
            this.setState({historyIndex: game.state.history.length - 1})
        } else {
            this.setState({historyIndex: this.state.historyIndex - 1})
        }
    },
    stepForward: function () {
        var game = this.state.game;
        if (this.state.historyIndex === game.state.history.length - 1) {
            this.setState({historyIndex: null})
        } else {
            this.setState({historyIndex: this.state.historyIndex + 1})
        }
    }
});
