function saturdayFun(param = "roller-skate") {
  return `This Saturday, I want to ${param}!`;
}

let mondayWork = function(param = "go to the office") {
  return `This Monday, I will ${param}.`;
};

function wrapAdjective(param1 = "*") {
  return function inner(param = "special") {
    return `You are ${param1}${param}${param1}!`;
  };
}

let Calculator = {
  add: () => 1 + 3,
  subtract: () => 1 - 3,
  multiply: () => 1 * 3,
  divide: () => 10 / 5
};

function actionApplyer(num, arr) {
  let x = num;

  for (let i = 0; i < arr.length; i++) {
    x = arr[i](x);
  }
  return x;
}
