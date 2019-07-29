import React, { Component } from 'react';
// import Square from './square';
import { Line } from 'react-lineto';
import ReactDOM from 'react-dom'

export class board extends Component {
    constructor(props) {
        super(props)    
        this.state = {
            location: [] 
        }
    }
    getLocation = () => { 
        const clocation = [];
        const buttons = this.refs;
        Object.getOwnPropertyNames(buttons).forEach(key => {
            let value = buttons[key];           
            clocation.push({
                x : ReactDOM.findDOMNode(value).getBoundingClientRect().x + 12, 
                y: ReactDOM.findDOMNode(value).getBoundingClientRect().y + 12
            });
            
        });         
        this.setState({
            location : clocation
        });       
    } 
    renderRed = (mark, counter) => {        
        return <Line key={counter}
                    x0={this.state.location[mark.square1].x} 
                    y0={this.state.location[mark.square1].y} 
                    x1={this.state.location[mark.square2].x} 
                    y1={this.state.location[mark.square2].y} 
                />
    }
    renderBlue = (mark, counter) => {        
        return <Line key={counter} borderColor="blue"
                    x0={this.state.location[mark.square1].x} 
                    y0={this.state.location[mark.square1].y} 
                    x1={this.state.location[mark.square2].x} 
                    y1={this.state.location[mark.square2].y} 
                />
    }
    componentDidMount = () =>{        
        this.getLocation();
        window.addEventListener('resize', this.getLocation); 
        window.addEventListener('hashchange', this.getLocation);             
    }   
    renderSquare(i) {
        return  <button className="square" onClick={()=>this.props.onClick(i)} ref={"button" + i} key={"button"+i}> 
                    {this.props.squares[i]}
                </button>           
      }      
    
    render() {
        var counter = 0;
        var counter2 = 0;             
        return (
            <div> 
                {this.props.rows.map((item) =>           
                    <div className="board-row" key={counter}>
                        {this.props.rows.map((item) => 
                            this.renderSquare(counter++)
                        )}                                      
                    </div>
                )}
                {
                    this.props.red.map((mark) => 
                        this.renderRed(mark, counter2++)                                                               
                )}
                {
                    this.props.blue.map((mark) => 
                        this.renderBlue(mark, counter2++)                                                               
                )}                 
            </div>
        );
        
    }    
}
export default board

