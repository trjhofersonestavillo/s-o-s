import React from 'react'

function Square(props) {
  
    return (
      <button className="square" onClick={props.onClick} key={props.value}> 
        {this.props.value}
      </button>
    );
  }

export default Square
