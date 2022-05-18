function createEmployeeRecord(arr){
    let empObj = {}
    return empObj = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arrOfArrs){
    const empRecs = []
    arrOfArrs.forEach(arr => {
        const madeEmpRec = createEmployeeRecord(arr)
        empRecs.push(madeEmpRec)
    })
    return empRecs
}

function createTimeInEvent(empRec, date){
    const dateObj = {
        type: 'TimeIn',
        hour: parseInt(date.substring(11)),
        date: date.substring(0, 10)
    }
    empRec.timeInEvents.push(dateObj)
    return empRec
}

function createTimeOutEvent(empRec, date){
    const dateObj = {
        type: 'TimeOut',
        hour: parseInt(date.substring(11)),
        date: date.substring(0, 10)
    }
    empRec.timeOutEvents.push(dateObj)
    return empRec
}

function hoursWorkedOnDate(empRec, date){
    const timeInIndex = empRec.timeInEvents.findIndex(obj => obj.date === date)
    const timeOutIndex = empRec.timeOutEvents.findIndex(obj => obj.date === date)
    let hours = empRec.timeOutEvents[timeOutIndex].hour - empRec.timeInEvents[timeInIndex].hour
    hours = parseInt(hours.toString().replace(/([0])+/g, ''))
    return hours
}

function wagesEarnedOnDate(empRec, date){
    return hoursWorkedOnDate(empRec, date) * empRec.payPerHour
}

function allWagesFor(empRec){
    let allWages = 0
    const daysWorked = empRec.timeInEvents.length
    for(let i = 0; i < daysWorked; i++){
        const date = empRec.timeInEvents[i].date
        const wagesOnDate = wagesEarnedOnDate(empRec, date)
        allWages += wagesOnDate
    }
    // TODO: for loop -> .map() w/ index
    return allWages
}

function calculatePayroll(empArr){
    return empArr.reduce((pVal, cVal) => allWagesFor(cVal) + pVal, 0)
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

let person = {
    firstName: 'John',
    lastName: 'Doe',
    address: {
        street: 'North 1st street',
        city: 'San Jose',
        state: 'CA',
        country: 'USA'
    }
};

// Shallow copy:
// let copiedPerson = Object.assign({}, person)

// ~Or~
// Deep copy:
let copiedPerson = JSON.parse(JSON.stringify(person))

copiedPerson.firstName = 'Jane'
copiedPerson.address.street = 'Amphitheatre Parkway'
copiedPerson.address.city = 'Mountain View'

// console.log(person)
// console.log(copiedPerson)