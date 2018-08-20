import React from 'react';
const loginData = localStorage.getItem('userData');

export const config ={
    url : 'http://localhost:8000/api'
    // url : ''
}

export const isLogged = () => {
        if(loginData){
            return true;
        }
}