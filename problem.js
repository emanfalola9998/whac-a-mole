const isNumberPositive = (n) => {
    if (n>0) {
        return true
    }
    return false
}


console.log(isNumberPositive(-1)); 
console.log(isNumberPositive(10)); 


const convertDaysToAge = (days) => {
    const age = days/365
    return age
}

const getLargestNumber = (num1, num2, num3) => {
    if (num1 > num2 && num1 > num3) {
        return num1;
    } else if (num2 > num1 && num2 > num3) {
        return num2;
    } else {
        return num3;
    }
};

const getLastName = (nameArray) =>{
    const lastName = nameArray[nameArray.length-1]
    return lastName;
}

const allNumbersPositive = (numbersArray) => {
    for (const number of numbersArray) {
        if (number < 0){
            return false
        }
    }
    return true
}
