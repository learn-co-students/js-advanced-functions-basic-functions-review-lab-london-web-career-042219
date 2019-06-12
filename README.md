## Define the Term "Anonymous Function"

We also call the expression that produces a function that uses the template
`function(){....}` an "***anonymous function***." In the previous example the
following was the anonymous function:

```js
function() {
  console.log("Yet more razzling")
}
```

Unlike a ***function declaration***, there's no function name in front of the
`()`. Since anonymous means, "without a name," this function is called,
sensibly enough, an anonymous function.

## Define an IIFE: Instantly-Invoked Function Expression

As a thought experiment, what happens here:

```js
(function(x){ return x + 3 })(2) //=> ???
```

We recognize the first `()` as being those that we might use from arithmetic:

```js
( 3 - 4 ) * 2 // => -2
```

So the first parentheses return the anonymous function, the potential to do
work.  The second `()` are the `()` of function invocation. So we're "invoking"
the function immediately after defining it.

```js
(function(x){ return x + 3 })(2) //=> 5
```

This bit of code is called an IIFE or "Instantly Invoked Function Expression."
This stands to reason since it's a function expression that we run immediately.
IIFEs are a good way to make sure that you're grasping the content of this
lesson up to this point.

Interestingly, any variables, functions, `Array`s, etc. that are defined
_inside_ of the function expression's body _can't_ be seen _outside_ of the
IIFE.  It's like opening up a micro-dimension, a bubble-universe, doing all the
work you could ever want to do there, and then closing the space-time rift.
IIFEs are definitely science fiction or comic book stuff recalling the plot
of "Donnie Darko" or Dr. Strange's "mirror dimension."


```js
(
  function(thingToAdd) {
    let base = 3
    return base + thingToAdd
  }
)(2) //=> 5
// console.log(base) //=> Uncaught ReferenceError: base is not defined
```

We'll see some of the practical power of "hiding things" in IIFEs a little
later in this lesson.

> **(ADVANCED) SYNTAX QUESTION** Some keen-eyed readers might ask, "Why add
> parentheses around the function expression?" Why not:
>
> ```js
> function(x){ return x + 2 }(2) //=> ERROR
> ```
>
> instead of:
>
> ```js
> (function(x){ return x + 2 }()2) //=> 4
> ```
>
> The reason is that JavaScript gets confused by all those bits of special
> symbols and operators sitting right next to each other. Just as we find the way
> ancient Romans wrote (all-caps, no spaces) VERYHARDTOREADANDHARDTOKEEPTRACKOF,
> JavaScript needs those "extra" parentheses to tell what's part of the function
> expression and what's part of the invocation. It _shouldn't_ be necessary, but is.

## Define the Term "Function-level Scope"

JavaScript exhibits "Function-level" scope. This means that if a function is
defined _inside another_ function, the inner function has access to all the
parameters (variables passed in) as well as any variables defined in the
function. This moves backward recursively too. Each of the enclosing parents'
scopes are made available via the _scope chain_. Let's see things working before
we define _scope chain_.

> **ASIDE**: This is where people **really** start to get awed by JavaScript.

Consider this code:

```js
function outer(greeting, msg="It's a fine day to learn") { // 2
  let innerFunction =  function(name, lang="Python") { // 3
    return `${greeting}, ${name}! ${msg} ${lang}` // 4
  }
  return innerFunction("student", "JavaScript") // 5
}

outer("Hello") // 1
//=> "Hello, student! It's a fine day to learn JavaScript"
```

1. We call `outer`, passing `"Hello"` as an argument
2. The argument (`"Hello"`) is saved in `outer`'s `greeting` parameter. The
   other parameter, `msg` is set to a default value
3. Here's our old friend the function expression. It expects two arguments
   which it stores in the parameters `name` and `lang` with `lang` being set as
   a default to `"Python"`. This expression is saved in the local variable
   `innerFunction`
4. Inside `innerFunction` we make use of both the parameters `name` and `lang`
   ***as well as*** the parameters of innerFunction's containing (parent)
   function. `innerFunction` gets access to those variables
5. Inside `outer`, we invoke `innerFunction`

This might look a little bit weird, but it generally makes sense to our
intuition about scopes: inner things can see their parent outer things. But
with a simple change, something miraculous can happen:

```js
function outer(greeting, msg="It's a fine day to learn") { // 2
  let innerFunction =  function(name, lang="Python") { // 3
    return `${greeting}, ${name}! ${msg} ${lang}` // 4
  }
  return innerFunction
}

outer("Hello")("student", "JavaScript") // 1, 5
//=> "Hello, student! It's a fine day to learn JavaScript"
```

Amazingly, this code works ***the exact same***. Even if the inner function
`innerFunction` is invoked **outside** the parent function, it ***still*** has access
to those parent function's variables. It's like a little wormhole in space-time
to the `outer`'s scope!

Let's tighten this code up once more instead of assigning the function
expression to `innerFunction`, let's just return the function expression.

```js
function outer(greeting, msg="It's a fine day to learn") {
  return function(name, lang="Python") {
    return `${greeting}, ${name}! ${msg} ${lang}`
  }
}

outer("Hello")("student", "JavaScript")
//=> "Hello, student! It's a fine day to learn JavaScript"
```

Our "inner" function is now a returned **anonymous function**.  To repeat: When
it came into existence, it inherited the values in `outer`'s parameters
`greeting` and `msg`. When we invoked `outer` we provided the arguments for
`greeting` and left `msg` as the default. `outer` then returned an anonymous
function that had its uses of `greeting` and `msg` set. It was almost as if
`outer` returned:


```js
return function(name, lang="Python") { // The "inner" function
  return `Hello, ${name}! It's a fine day to learn ${lang}`
}
```

We invoked this returned or _"inner" function"_ by adding `()` and passing the
arguments `"student"` and `"JavaScript"` which were then loaded into `name` and
`lang` inside the inner function. This filled in the final two values inside of
the template string and effectively returned:

```js
  return `Hello, student! It's a fine day to learn JavaScript`
//=> "Hello, student! It's a fine day to learn JavaScript"
```

Keep in mind, it's not the case that we have to invoke functions like this:

```js
outer("Hello")("student", "JavaScript")
```

We could:

```js
let storedFunction = outer("Hello")
// ... lots of other code
storedFunction("student", "JavaScript")
//=> "Hello, student! It's a fine day to learn JavaScript"
```

## Define the Term "Closure"

In the previous example, we could call the "inner" function, the **anonymous
function** a "closure." It "encloses" the function-level scope of its parent.
And, like a backpack, it can carry out the knowledge that it saw - _even when
you're out of the parent's scope_.

Recall the IIFE discussion, since what's inside an IIFE can't be seen, if we
wanted to let just tiny bits of information leak back out, we might want to
pass that information back out, through a closure.

_Note: We're also using destructuring assignment, don't forget your ES6 tools!_

```js
let [answer, theBase] = (
  function(thingToAdd) {
    let base = 3
    return [
      function() { return base + thingToAdd },
      function() { return base }
    ]
  }
)(2)
answer() //=> 5
console.log(`The base was ${theBase()}`)
// OUTPUT: The base was 3
```

## Define the Term "Scope Chain"

The mechanism behind all the cool stuff we just saw is the _scope chain_ which
allows functions defined in functions to access all their parent scopes'
variables.  Here's a simple example:

```js
function demoChain(name) {
  let part1 = 'hi'
  return function() {
    let part2 = 'there'
    return function() { // Innermost
      console.log(`${part1.toUpperCase()} ${part2} ${name}`);
    }
  }
}

demoChain("Dr. Stephen Strange")()() //=> HI there Dr. Stephen Strange
```

Through the _scope chain_, the function labeled `//Innermost` has access to
`name`, `part`, and `part2` when it is called and runs the `console.log()`
statement. That's awesome wormhole, space-time, magic!

**LAB**:

* Implement a function called `wrapAdjective`.
  * It should return a function
    * This "inner" function should:
      * take a single parameter that should default to `"special"`. Name it
        however you wish.
      * return a `String` of the form "You are ..." where `...` should be the
        adjective this function received wrapped in visual flair
  * It should take as parameter a `String` that will be used to create visual flair
  * You may call the parameter whatever you like, but its default value should
    be `"*"`
  * Call example: `let encouragingPromptFunction = wrapAdjective("!!!")`
* Thus a total call should be:
      `wrapAdjective("%")("a dedicated programmer") //=> "You are %a dedicated programmer%!"`
      
Use the `learn` program to verify you've gotten a working
implementation. Come back here once you've gotten just this set of tests passing.

### Additional Practice in Lab-Driven Development for JavaScript Basics

Whew! That's a lot of recap with a lot of mind-bending stuff. Let's make sure
that we review some of our easier basics.

The remainder of the tests ***are not*** new material. They're here to make
sure you remember how to work with `Object`s and `Array`s full of functions.
Use the tests to guide you in feeling confident working with functions.

## Conclusion

In this lesson, we've covered the basics of function declaration, invocation,
and function scope. As a refresher on your skills, we've provided a simple lab
to make sure that you're set for the new information coming up in the rest of
this module.

## Resources

- [Wikipedia — First-class function][wiki]
- [StackOverflow — What is meant by 'first class object'?][stackoverflow]
- [Helephant — Functions are first class objects in javascript (Wayback Machine)][helephant]
- [2ality — Expressions versus statements in JavaScript][2ality]
- [MDN - Functions][mdn-fn]
- [MDN — Statements and declarations][mdn]

[wiki]: https://en.wikipedia.org/wiki/First-class_function
[stackoverflow]: https://stackoverflow.com/questions/705173/what-is-meant-by-first-class-object
[helephant]: https://web.archive.org/web/20170606141950/http://helephant.com/2008/08/19/functions-are-first-class-objects-in-javascript/
[2ality]: http://2ality.com/2012/09/expressions-vs-statements.html
[mdn]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements
[mdn-fn]: https://developer.mozilla.org/en-US/docs/web/JavaScript/Reference/Operators/function
