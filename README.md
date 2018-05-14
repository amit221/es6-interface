<h1>es6-interface</h1>
es6-interfac is a Nodejs module  that let you build interfaces for es6 classes

<h2>Introduction</h2>
in today javascript there is no way to declare an interface like other language's as php or java.
with es6-interface easily build interfaces , use multi interfaces on the same class and secure your class.



<h2>Limitations</h2>
works on NodeJS version 6+,
works only on modern web browsers,
tested only on NodeJS
<h2>Installing</h2>

```
npm install es6-interface --save
```

lets jump to some examples
<h2>Examples</h2>

first we start with a simple 1 interface implementation
<h2>One interface implementation</h2> 

```javascript

const Interface = require('es6-interface')
const testInterface1 = new Set(['required1(arg1)']); // required1 is the method we force to implement

class testClass extends Interface(testInterface1) {
  constructor() {
    super()
  }

}

new testClass() // now we will get an error that we need to implement required1(arg1) method

```


<h2>Multi interface implementation</h2> 

```javascript

const Interface = require('es6-interface');
const testInterface1 = new Set(['required1(arg1)']);
const testInterface2 = new Set(['required2(arg1,arg2)', 'required3({arg1 , arg2 , arg3})']);

class testClass extends Interface(testInterface1,testInterface2) {
  constructor() {
    super()
  }

}

new testClass() // now we will get an error that we need to implement required1(arg1) required2(arg1,arg2) required3({arg1,arg2,arg3}) methods
```

<h2>Multi interface with class inheritance </h2> 

```javascript

const Interface = require('es6-interface');
const testInterface1 = new Set(['required1(arg1)']);
const testInterface2 = new Set(['required2(arg1,arg2)', 'required3({arg1 , arg2 , arg3})']);
const testInterface4 = new Set(['required4({arg1, arg2, arg3}, arg4)']);

class parentClass {
    constructor() {

    }
    
    required4({arg1, arg2, arg3}, arg4) {

    }
}
class testClass extends Interface(testInterface1,testInterface2,testInterface4,parentClass) {
  constructor() {
    super()
  }

}

new testClass() //  we will still get an error for no implement required1(arg1) required2(arg1,arg2) required3({arg1,arg2,arg3}) methods as we get required4 from our parent class
```

<h2>Next development tasks</h2> 
<ul>
    <li>improve performance</li>
    <li>better error messages </li>
</ul>

<h2>Tests</h2>

```
npm test
```



