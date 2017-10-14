<h1>es6-interface</h1>
Interface is a Nodejs module  that let you build interfaces for es6 classes

<h2>Introduction</h2>
in today javascript there is no way to declare an interface like other language's as php or java.
with es6-interface easily build interfaces , use multi interfaces on the same class and secure your class.

<h2>Notice</h2>
version 1 has been deprecated and will not longer be supported.<br>
if you are using version 1 in your code and upgrade to version 2  your code wont work.
i recommend you to upgrade to v2 .<br>
 its a lot easier to use and now your class can use multi interface for the same class


<h2>Limitations</h2>
currently works only on Nodejs with es6 class

<h2>Installing</h2>

```
npm install es6-interface --save
```

lets jump to some examples
<h1>Examples</h1>

first we start with a simple 1 interface implementation
<h2>One interface implementation</h2> 

```javascript
const Interface = require('es6-interface')
const testInterface1 = new Set(['required1']); // required1 is the method we force to implement

class testClass extends Interface(testInterface1) {
  constructor() {
    super()
  }

}

new testClass() // now we will get an error that we need to implement required1 method

```


<h2>Multi interface implementation</h2> 
```javascript

const Interface = require('es6-interface')
const testInterface1 = new Set(['required1']);
const testInterface2 = new Set(['required2', 'required3']);

class testClass extends Interface(testInterface1,testInterface2) {
  constructor() {
    super()
  }

}

new testClass() // now we will get an error that we need to implement required1 ,required2 ,required3 methods
```

<h2>Multi interface with class inheritance </h2> 
```javascript

const Interface = require('es6-interface')
const testInterface1 = new Set(['required1']);
const testInterface2 = new Set(['required2', 'required3']);
const testInterface4 = new Set(['required4']);

class parentClass {
    constructor() {

    }

    required4() {

    }
}
class testClass extends Interface(testInterface1,testInterface2,testInterface4,parentClass) {
  constructor() {
    super()
  }

}

new testClass() //  we will still get an error for no implement required1 ,required2 ,required3 methods as we get required4 from our parent class
```

<h1>Tests</h1>

```
npm test
```



