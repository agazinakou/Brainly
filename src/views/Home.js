import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import Tesseract from 'tesseract.js';
import Upload from '../components/Upload';
import Result from '../components/Result';


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            image : logo,
            generated : false,
            loading : false,
            upload : '',
            result : ''
        };
    }

    componentDidMount(){

    }


    callbackFromUpload = (el) => {
        this.setState({ loading : true, upload: el });
        this.recognize(el);
    }

    recognize(file){
        this.setState({ loading : true });
        console.log(file);
        Tesseract.recognize(file,'eng+fra', { 
            logger: m => console.log(m) 
        }).then(({ data: { text } }) => {
            this.setState({ loading : false, generated: true, result: text });
        }).catch((err) => {
            console.log(err);
            this.setState({ loading : false });

        })
    }




  render() {
    return (
        <div className="App">
            <div className="App-header">
                {
                    this.state.loading ?
                    <img src={ this.state.image } className="App-logo" alt="logo" /> :
                    <div>
                        {
                            !this.state.generated ? 
                            <Upload callbackFromUpload={ this.callbackFromUpload } /> :
                            <Result file={this.state.upload} result={this.state.result} />
                        }
                        <p>
                            Imports an image to <code>retrieve words</code><br/> in almost any language.
                        </p>
                        <a
                            className="App-link"
                            href="https://reactjs.org"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Need to more information ? 
                        </a>
                    </div>
                }
            </div>
        </div>
    )
  }
}

export default Home;