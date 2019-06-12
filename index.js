// Your code here
function saturdayFun(activity = "roller-skate") {
  return `This Saturday, I want to ${activity}!`;
}

function mondayWork(activity = "go to the office") {
  return `This Monday, I will ${activity}.`;
}

function wrapAdjective(string = "*") {
  return function(param = "special") {
    return `You are ${string}${param}${string}!`;
  };
}

const Calculator = {
  add: function() {
    return 1 + 3;
  },
  subtract: function() {
    return 1 - 3;
  },
  multiply: function() {
    return 1 * 3;
  },
  divide: function() {
    return 10 / 5;
  }
};

function actionApplyer(integer, arrayFunctions) {
  if (arrayFunctions.length === 0) {
    return integer;
  } else {
    arrayFunctions.forEach(definition => integer = definition(integer));
    return integer;
  }
}

