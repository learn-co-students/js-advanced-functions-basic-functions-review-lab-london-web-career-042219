// Some pretty cool ways of using functions to do uber flexible things
//
// Your code here
function saturdayFun(input='roller-skate') {
    return `This Saturday, I want to ${input}!`
}

// Works same as above, but the function is now a variable
let mondayWork = function(input = "go to the office") {
    return `This Monday, I will ${input}.`
}

// The following lets you define a variable setting the default differently
// e.g. let result = wrapAdjective("||")
// Then you can use it as follows
//      let emphatic = result("a dedicated programmer")
function wrapAdjective ( wrapper='*') {
    return function(adjective) { return `You are ${wrapper}${adjective}${wrapper}!` }
}

// You can include functions in objects ... phew
let Calculator = {
    add: function(x,y) { return(x+y) },
    subtract: function(x,y) { return(x-y) },
    multiply: function(x,y) {return(x*y)},
    divide: function(x,y) { return(x/y)}
}

// The following takes an array of functions, and performs them
// phew ....
function actionApplyer(inputVariable, arrayFunctions ) {
    // Add the inputVariable into the array so the reduce
    // function can work
    arrayFunctions.unshift(inputVariable)
    return arrayFunctions.reduce( function( total, element ){
        return element(total)
    })
}

