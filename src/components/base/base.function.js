
export const userObjID = () => {
    let objUser = JSON.parse(localStorage.getItem('userData'));
    console.log(objUser._id);
}