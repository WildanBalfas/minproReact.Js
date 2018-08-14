import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
class Main extends React.Component {

    state = {
        selectedFile: null,
    }

    fileSelectedHandler = event => {
        this.setState({
            selectedFile: event.target.files[0],
        })
    }

    fileUploadHandler = () => {
        const fd = new FormData();
        fd.append('file', this.state.selectedFile, this.state.selectedFile.name);
        axios.post('http://localhost:8000/api/upload', fd, {
            onUploadProgress: ProgressEvent => {
                console.log('Upload Progress: ', + Math.round(ProgressEvent.loaded / ProgressEvent.total  * 100 ) + '%')
            }
        })
        .then( res => {
            console.log(res);
        });
    }

    render() {
        return (
            <div className="App" style = {{marginTop : 50}} >
                <input type="file" onChange={this.fileSelectedHandler} />
                <Button variant = "contained" size = "medium" color = "primary" onClick={this.fileUploadHandler}>Upload</Button>
            </div>
        );
    }
}

export default Main;