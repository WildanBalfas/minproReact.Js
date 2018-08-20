
let objUser = JSON.parse(localStorage.getItem('userData'));

function LocalStorage() {

    this.loginId = function () {
        if(objUser){
            return objUser._id;
        }
    }

    this.loginEmployeeId = function(){
        if(objUser){
            return objUser.m_employee_id;
        }
    }

    this.loginUsername = function () {
        if(objUser){
            return objUser.username;
        }
    }

    this.loginRoleId = function () {
        if(objUser){
            return objUser.m_role_id;
        }
    }

    this.loginToken = function () {
        if(objUser){
            return objUser.token;
        }
    }
}

module.exports = new LocalStorage();