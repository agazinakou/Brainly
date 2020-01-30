import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';


class Result extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: 'agazinakou',
            image : logo
        };
    }

    componentDidMount(){

    }



  render() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <img src={this.props.file} width="500px" alt="Result" />
                </div>
                <div className="col-md-6">
                    <p>{this.props.result}</p>
                </div>
            </div>
        </div>
    )
  }
}

export default Result;