// Your code here
activity = "Rock Climbing";

function saturdayFun(yo = "roller-skate") {
  return `This Saturday, I want to ${yo}!`;
}

function mondayWork(spoon = "go to the office") {
  return `This Monday, I will ${spoon}.`;
}

function wrapAdjective(str = "*") {
  return function(what = "special") {
    return `You are ${str}${what}${str}!`;
  };
}

let encouragingPromptFunction = wrapAdjective("!!!");

let Calculator = {
  add: function(a, b) {
    return a + b;
  },
  subtract: function(a, b) {
    return a - b;
  },
  multiply: function(a, b) {
    return a * b;
  },
  divide: function(a, b) {
    return a / b;
  }
};

let actionApplyer = function(start, ray) {
  let a = start;

  for (let i = 0; i < ray.length; i++) {
    a = ray[i](a);
  }

  return a;
};
