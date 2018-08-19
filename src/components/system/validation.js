'use strict';

function Validation(){
    this.isEmpty = function(e, data){
        console.log(data);
        // let error = [];
        // // element.push(e.target.name)
        // for(let key in data){
        //     if(!(e[data[key]])){
        //        error.push(data[key] + 'Error');
        //     }
        // }

        // return error;
    }
}

module.exports = new Validation;