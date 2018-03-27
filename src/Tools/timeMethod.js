
var year,mouth,day,h,m,s;
const init=function (date) {
    year=date.getFullYear();
    mouth=date.getMonth()+1;
    day=date.getDate();
    h=date.getHours();
    m=date.getMinutes();
    s=date.getSeconds();
}
const getToday = function () {
    let myDate = new Date();
    init(myDate)
    mouth=(mouth<10)? "0"+mouth : mouth
    day=(day<10)? "0"+day : day
    return year+"-"+mouth+"-"+day
}
const getTime =function (data) {
    let newDate = new Date();
    newDate.setTime(data * 1000);
    console.log(newDate.toLocaleDateString());
    console.log(newDate.toLocaleString());
    console.log(newDate.toLocaleTimeString());
    return newDate.toLocaleDateString()

}


export { getToday,getTime}