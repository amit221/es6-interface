# `es6-interface`

This module creates extendable ES6 Classes from method signatures that can be defined in objects or string lists, resulting in something similar to class Interfaces.

It will throw an exception, at runtime, if the implementation class do not implement all methods with the same arguments declared in the interfaces.

**Notice**: because the implementation relies on code reflection methods, it might not work on minified/uglified version of your code, like those generated in the production build phase by some frontend frameworks.

## Quick Start

```js
const Interface = require("es6-interface");

const MyInterface1 = {
  requiredMethod1({ arg1, arg2 }) {}
}

const MyInterface2 = new Set[
  "requiredMethod2({ arg1, arg2 })",
];

class MyClass extends Interface(MyInterface1, MyInterface2) {
  requiredMethod1({ arg1, arg2 }) {
     console.log("Hello from requiredMethod1");
  }

  requiredMethod2({ arg1 }) {
     console.log("Hello from requiredMethod2");
  }
}
```

This code will throw an exception:
> ```sh
> MyClass must implement requiredMethod2({arg1,arg2}) methods
> ```


## Limitations

- works on NodeJS version 6+,
- works only on modern web browsers,
- tested only on NodeJS
 
## Installing

```
npm install es6-interface --save
```

## Declaring an interface

There are 3 ways to declare an interface:
- Set: ```const IFoo = new Set["method1(arg1)","method2(arg1)"]```
- Array: ```const IFoo = ["method1(arg1)","method2(arg1)"]```
- Object: ```const IFoo { method1() {}, method2() {} }```

Also, an Interface can extend one parent class.

## Examples

First we start with a simple 1 interface implementation

### One interface implementation

```javascript
const Interface = require('es6-interface')
const testInterface1 = {
    required1: function(arg1) {
    }
};
class testClass extends Interface(testInterface1) {
  constructor() {
    super()
  }
}

new testClass() // now we will get an error that we need to implement required1(arg1) method
```


### Multi interface implementation

```javascript
const Interface = require('es6-interface');
const testInterface1 = {
    required1(arg1) {}
};
const testInterface2 = {    
    required2(arg1, arg2) {},
    required3({arg1, arg2, arg3}) {}
};
class testClass extends Interface(testInterface1,testInterface2) {
  constructor() {
    super()
  }
}

new testClass() // now we will get an error that we need to implement required1(arg1) required2(arg1,arg2) required3({arg1,arg2,arg3}) methods
```

### Multi interface with class inheritance

```javascript
const Interface = require('es6-interface');
const testInterface1 = {
    required1(arg1) {}
};
const testInterface2 = {    
    required2(arg1, arg2) {},
    required3({arg1, arg2, arg3}) {}
};
const testInterface4 = {
    required4({arg1, arg2, arg3}, arg4) {}
};
class parentClass {
    constructor() {}  
    required4({arg1, arg2, arg3}, arg4) {}
}
class testClass extends Interface(testInterface1,testInterface2,testInterface4,parentClass) {
  constructor() {
    super()
  }
}

new testClass() //  we will still get an error for no implement required1(arg1) required2(arg1,arg2) required3({arg1,arg2,arg3}) methods as we get required4 from our parent class
```

### Next development tasks

- improve performance
- better error messages

### Tests

```
npm test
```
