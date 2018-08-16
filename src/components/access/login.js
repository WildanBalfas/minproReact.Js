import React from 'react';
import { Button, TextField, Input } from '@material-ui/core';
import PropTypes from 'prop-types';
import axios from 'axios';
import DialogActions from '@material-ui/core/DialogActions';
import { Redirect } from 'react-router-dom';
import '../style.css';

// import Validation from '../base/validation';
// import { PostData } from '../service/postData';
class Login extends React.Component {

    userModel = { username: '', password: ''}

    constructor(props) {
        super(props);
        this.state = {
            userData: [],
            user: this.userModel,
            redirect: false
        }
        this.login = this.login.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {

    }

    componentWillMount(){
        localStorage.getItem('userData') && this.setState({
            userData: JSON.parse(localStorage.getItem('userData')),
        });
    }

    login() {
        const user = this.state;
        let objUserData = [];
        const newUser = {
            username: user.username,
            password: user.password
        }
        axios.post('http://localhost:8888/api/login', newUser)
            .then(res => {
                objUserData = JSON.stringify(res.data)
                localStorage.setItem('userData', objUserData);
                this.setState({redirect: true})
            })
            .catch((error) => {
                console.log('Username atau password salah!');
            });

    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    // handleSubmit() {
    //     console.log(this.state);
    //     this.setState({
    //         user: {
    //             nama: "data"
    //         }
    //     })
    // }

    render() {
        if(this.state.redirect){
            return(<Redirect to= {'/'} />)
        }

        // if(){
        //     return(<Redirect to= {'/'} />)
        // }
        const { userData } = this.state;
        return (
            <div class="outer-wrapper">
            <div className="login">
                <div className="login-kiri">
                    <h1>Admin Page</h1>
                    <p>Some text for some title.</p>
                </div>
                <div className="login-kanan">
                    <h1 style={{ color: 'orangered'}}>Login Form</h1>
                    <p>Some text for some title. Just let's to
                        try to make it awesome
                    </p>
                    <form >
                        <TextField
                            className="input"
                            id="name"
                            label="Username"
                            margin="normal"
                            name='username'
                            onChange={this.onChange}
                            validatio
                        />
                        <br />
                        <TextField
                            className="input"
                            id="name"
                            label="Password"
                            margin="normal"
                            type="password"
                            name='password'
                            onChange={this.onChange}
                        />
                    </form>
                    <DialogActions>
                        <Button className="tombol" type="submit"
                            style={{
                                background: "orange",
                                color: "#fff",
                                padding: 0,
                                marginBottom: 20,
                                marginTop: 16,
                                display: "block",
                                overflow: "hidden",
                            }} fullWidth onClick={this.login}>
                            Login
                        </Button>
                    </DialogActions>
                </div>
                <ul class="copyright">
                    <li>Copyright &copy; 2018.Batch 156.All Right Reserved</li>
                </ul>
            </div>
            </div>
        )
    }
}


Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default Login;
