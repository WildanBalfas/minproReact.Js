
import {config} from '../configuration/config';
import axios from 'axios';


export default function(name){
    console.log('Hello World...! I\'m from a function');
}

export function other(){
    console.log('Hello World...! I\'m from other functions');
}

export function getAll(collectionName){
    let objData = [];
    axios.get(config.url + '/' + collectionName)
            .then(res => {
                for(let i in res.data){
                   objData[0] = 1
                }
            })
            .catch((error) => {
                alert(error);
            })

            console.log(objData[0]);
}