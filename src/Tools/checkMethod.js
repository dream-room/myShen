const checkNull = function (arr) {
    for (let i in arr) {
        if (arr[i] === '' || arr[i] === undefined) {
            return {
                isNull: true
            }
        }
    }
    return {
        isNull: false
    }
}
const checkNumber = function (arr) {
    for (let i in arr) {
        if (arr[i] === '' || arr[i] === undefined || isNaN(arr[i]) ) {
            return {
                isNull: true
            }
        }
    }
    return {
        isNull: false
    }
}

export { checkNull,checkNumber}
