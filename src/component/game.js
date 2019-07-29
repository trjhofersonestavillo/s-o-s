import React, { Component } from 'react'
import Board from './board'

export class game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(144).fill(null),
        score: Array(2).fill(0),
        red: [],
        blue: []                  
      }],
      rows: Array(12).fill(null),
      stepNumber: 0,
      playerOneTruePlayerTwofalse: true,          
      move: 'S'
    };
  }
  changeMove(){
    if(this.state.move === 'S'){
      this.setState({
        move: 'O'
      })
    }
    else{
      this.setState({
        move: 'S'
      })
    }    
  }
  handleSquareClick(i) {
    const lines = this.getLinesToCheck(i);     
    const history = this.state.history.slice(0, this.state.stepNumber + 1); 
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const red = current.red.slice(); 
    const blue = current.blue.slice();          
    if(squares[i] === null){
      const score = current.score.slice();
      squares[i] = this.state.move;      
      let scored = false;              
      for (let j = 0; j < lines.length; j++) {        
        const a = lines[j][0];
        const b = lines[j][1];
        const c = lines[j][2];       
        if(squares[a] === 'S' && squares[b] === "O" && squares[c] === 'S'){                       
          if(this.state.playerOneTruePlayerTwofalse){
            score[0] = score[0] + 1;            
            red.push({square1:a,square2:c});                       
          }
          else{
            score[1] = score[1] + 1;            
            blue.push({square1:a,square2:c}); 
          }  
          scored = true;                           
        }      
      }
      if(!scored){
        this.setState({
          playerOneTruePlayerTwofalse: !this.state.playerOneTruePlayerTwofalse     
        }); 
      }
      this.setState({
        history: history.concat([{
          squares: squares,
          score: score,
          red: red,
          blue: blue          
        }]),
        stepNumber: history.length,      
      });
    }                
  }
  getLinesToCheck(clickedSquare){
    const noRowsandColumns = this.state.rows.length;
    const lines = []; 
      //if move is S
      if(this.state.move === 'S'){
        //horizontal
          //rigth
        if(noRowsandColumns - (clickedSquare%noRowsandColumns) > 2){        
          lines.push(
            { 0: clickedSquare, 1: (clickedSquare+1), 2: (clickedSquare+2)}
          );
        }
          //left
        if(clickedSquare%noRowsandColumns > 1){
          lines.push(
            { 0: clickedSquare, 1: (clickedSquare-1), 2: (clickedSquare-2)}
          );
        }  
  
        //vertical 
          //up
        if(clickedSquare<(noRowsandColumns*(noRowsandColumns-2))){
          lines.push(
            {0: clickedSquare, 1: (clickedSquare+noRowsandColumns), 2: (clickedSquare+noRowsandColumns+noRowsandColumns)}
          ); 
        } 
          //down
        if(clickedSquare>=(noRowsandColumns*2)){
          lines.push(
            {0: clickedSquare, 1: (clickedSquare-noRowsandColumns), 2: (clickedSquare-noRowsandColumns*2)}
          ); 
        } 
  
        //slant down right
        if(clickedSquare<(noRowsandColumns*(noRowsandColumns-2)) && noRowsandColumns - (clickedSquare%noRowsandColumns) > 2){
          lines.push(
            {0: clickedSquare, 1: (clickedSquare+noRowsandColumns+1), 2: (clickedSquare+noRowsandColumns+noRowsandColumns+2)}
          );
        } 
  
        // slant down left  
        if(clickedSquare<(noRowsandColumns*(noRowsandColumns-2)) && (clickedSquare%noRowsandColumns)>1){
          lines.push(
            {0: clickedSquare, 1: (clickedSquare+noRowsandColumns-1), 2: (clickedSquare+noRowsandColumns+noRowsandColumns-2)}
          ); 
        }    
        
        //slant up right
        if(clickedSquare >= noRowsandColumns *2 && noRowsandColumns - (clickedSquare%noRowsandColumns) > 2){
          lines.push(
            {0: clickedSquare, 1: (clickedSquare-noRowsandColumns+1), 2: (clickedSquare-noRowsandColumns-noRowsandColumns+2)}
          );
        }
        //slant up left
        if(clickedSquare > noRowsandColumns * 2 && (clickedSquare%noRowsandColumns)>1){
          lines.push(
            {0: clickedSquare, 1: (clickedSquare-noRowsandColumns-1), 2: (clickedSquare-noRowsandColumns-noRowsandColumns-2)}
          );      
        }
      }
      //if move is O
      else{
        //vertical
        if((clickedSquare%noRowsandColumns) > 0 && (clickedSquare%noRowsandColumns) < noRowsandColumns - 1){
          lines.push(
            { 0: (clickedSquare-1), 1: clickedSquare, 2: (clickedSquare+1)}
          );
        }
        //cross
        if(clickedSquare>= noRowsandColumns && clickedSquare<noRowsandColumns*(noRowsandColumns-1) && (clickedSquare%noRowsandColumns) > 0 && (clickedSquare%noRowsandColumns) < noRowsandColumns - 1){
          lines.push(
            {0: (clickedSquare-noRowsandColumns-1), 1: clickedSquare, 2: (clickedSquare+noRowsandColumns+1)}
          );
          lines.push(
            {0: (clickedSquare-noRowsandColumns+1), 1: clickedSquare, 2: (clickedSquare+noRowsandColumns-1)}
          );
        }
        //horizontal
        if(clickedSquare >= noRowsandColumns && clickedSquare<noRowsandColumns*(noRowsandColumns-1)){
          lines.push(
            {0: clickedSquare-noRowsandColumns, 1: clickedSquare, 2: (clickedSquare+noRowsandColumns)}
          ); 
        }      
      }
      return lines;
    }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      playerOneTruePlayerTwofalse: (step % 2) === 0,
    });
  }
    render() {
      const rows = this.state.rows;
      const history = this.state.history;
      const current = history[this.state.stepNumber];      
      const moves = history.map((step, move) => {
        const desc = move ?
          'Go to move #' + move :
          'Go to game start';
        return (
          <li key={move}>
            <button className="btn-move" onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      });
      let status;      
      status = 'Next player: ' + (this.state.playerOneTruePlayerTwofalse ? '1' : '2');
      
        return (
            <div className="game">
              <div className="game-board">
                <div className="player">
                  <h5>Player 1 (red): {current.score[0]}</h5>
                </div>
                <div className="board">
                  <Board
                    squares={current.squares}
                    red={current.red}
                    blue={current.blue}
                    onClick={(i) => this.handleSquareClick(i)}
                    rows = {rows}
                  />
                  
                    <h4>{status} </h4>                    
                    <h4 >Move: {this.state.move}</h4>          
                    <button className="btn btn-success"onClick={()=> this.changeMove()}>Change Move</button>
                  
                </div>                    
                <div className="player">
                  <h5>Player 2 (blue): {current.score[1]}</h5>
                </div>
                
              </div>
              <div className="game-info">                                                 
                  <div className="data">
                      {moves}
                  </div>                             
                                            
              </div>
            </div>
          );
    } 
}
export default game
