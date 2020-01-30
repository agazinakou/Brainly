import React, { Component } from 'react';
import '../App.css';


class Upload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            upload : '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){

    }

    handleChange(event) {
        let url = URL.createObjectURL(event.target.files[0]);
        this.setState({ upload: url });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.callbackFromUpload(this.state.upload);
    }


    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    
                    <section className="hero">

                        {
                            this.state.upload === '' ? null :
                            <div className="mb-2">
                                <img src={this.state.upload} width="500px" alt="Upload" />
                            </div>
                        }
                        <label className="fileUploaderContainer">
                            Click here to upload documents
                                <input 
                                    type="file" 
                                    id="fileUploader" 
                                    onChange={this.handleChange}
                                />
                        </label>


                        {
                            this.state.upload === '' ? null :
                            <button className="button" type="submit">Analyze & Generate</button> 
                        }
                    </section>
                </form>
            </div>
        )
    }
}

export default Upload;