import React, { Component } from 'react';
import Header  from './layout/header';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { BrowserRouter} from 'react-router-dom';
import './App.css';

export default class extends Component {
    render() {
        return (
           <MuiThemeProvider>
               <BrowserRouter> 
               <div>
                   <Header/>
               </div>
               </BrowserRouter>
           </MuiThemeProvider>
        )
    }
}