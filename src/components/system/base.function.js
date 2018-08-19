
export const changeValue = function (status) {
    if (status == 0) {
        return 'Rejected';
    } else if (status == 1) {
        return 'Submited';
    } else if (status == 2) {
        return 'On Progress';
    } else if (status == 3) {
        return 'Done';
    }
}

export const changeDateFormat = function (date) {
    var ubahFormat = new Date(date);
    return ubahFormat.toLocaleDateString("id-ID"); // 18/08/2018
}