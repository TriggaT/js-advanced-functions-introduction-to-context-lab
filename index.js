// Your code here
// let testEmployee = createEmployeeRecord(["Gray", "Worm", "Security", 1])

function createEmployeeRecord(worker){

    let employee = {firstName : worker[0],
    familyName : worker[1],
    title : worker[2],
    payPerHour : worker[3],
    timeInEvents : [],
    timeOutEvents : [] } 

    return employee
} 

function createEmployeeRecords(workers){
    newArray = workers.map(createEmployeeRecord)
    return newArray 
}

function createTimeInEvent(worker, clockIn){
    let dateTime = clockIn.split(" ")
    let dateIn = dateTime[0]
    let timeIn = parseInt(dateTime[1], 10)

    worker.timeInEvents.push({ type: "TimeIn",date : dateIn, hour : timeIn});
    return worker 

}

function createTimeOutEvent(worker, clockOut){
    let dateTime = clockOut.split(" ")
    let dateOut = dateTime[0]
    let timeOut = parseInt(dateTime[1], 10)

    worker.timeOutEvents.push({ type: "TimeOut", date : dateOut, hour : timeOut});
    return worker 

}

function hoursWorkedOnDate(worker, date){
    let timeIn = worker.timeInEvents.find(e => e.date === date)
    let timeOut = worker.timeOutEvents.find(e => e.date === date)

    return (timeOut.hour - timeIn.hour)/100
}

function wagesEarnedOnDate(worker, date){
    return hoursWorkedOnDate(worker,date) * worker.payPerHour

}

function allWagesFor(worker){
    let hoursArray = []
    for (let i = 0; i < worker.timeInEvents.length; i++){
        hoursArray.push(wagesEarnedOnDate(worker, worker.timeInEvents[i].date))
    }
    const total = (accum, current) => accum + current

    return hoursArray.reduce(total)
}

function calculatePayroll(employees){ 
    let totalPay = employees.map(allWagesFor)
    const total = (accum, current) => accum + current

    return totalPay.reduce(total)

}

function findEmployeeByFirstName(employees, name){
    return  employees.find(e => e.firstName === name)
    
}