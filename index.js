// Your code here
function saturdayFun(activity="roller-skate") {
  return(`This Saturday, I want to ${activity}!`);
}
function mondayWork(activity="go to the office") {
  return(`This Monday, I will ${activity}.`);
}

function wrapAdjective(bling = "*") {
  return function(adjective = "special") {
    return `You are ${bling}${adjective}${bling}!`;
  };
}

const Calculator = {
  add: function(num1, num2) {
    return num1 + num2;
  },
  subtract: function(num1, num2) {
    return num1 - num2;
  },
  multiply: function(num1, num2) {
    return num1 * num2;
  },
  divide: function(num1, num2) {
    return num1 / num2;
  }
};

function actionApplyer(int, array) {
  if (array.length === 0) {
    return int;
  } else {
    let x = int;
    for (let i = 0; i < array.length; i++) {
      x = array[i](x);
    }
    return x;
  }
}