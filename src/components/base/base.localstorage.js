
let objUser = JSON.parse(localStorage.getItem('userData'));

function LocalStorage() {

    this.loginId = function () {
        return objUser._id;
    }

    this.loginUsername = function () {
        return objUser.username;
    }

    this.loginRoleId = function () {
        return objUser.m_role_id;
    }

    this.loginToken = function () {

    }
}

module.exports = new LocalStorage();