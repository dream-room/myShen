
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
    // h=(h<10)? "0"+h : h
    // m=(m<10)? "0"+m : m
    // s=(s<10)? "0"+s : s
    return year+"-"+mouth+"-"+day
}


export { getToday}