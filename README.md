<h1>es6-interface</h1>
Interface is a Nodejs module  that let you build interfaces for es6 classes

<h2>Introduction</h2>
in today javascript there is no way to declare an interface like other language's as php or java.
with es6-interface you can easily build interfaces and secure your class.

<h2>Limitations</h2>
currently works only on Nodejs with es6 class

<h2>Installing</h2>

```
npm install es6-interface --save
```

<h1>How to use</h1>
there are basically 2 ways to use this module. <br>
the first one is  when you don`t need you class to extends anther class
<h2>Simple implementation</h2> 

first lets declare an interface with the required methods
```javascript
const Interface = require('es6-interface')

class testInterface extends Interface() {
  constructor() {
    super()
  }

  methods() {            // create a function called methods
    return new Set([     // create a new set
      'required'         // declare the properties names you wish your class will have to implement
    ])
  }
}

```

after we create our interface we can just extends him like this
```javascript
class testClass extends testInterface {
  constructor() {
       super()
  }
}
```
and if you try to run this you will get an error "testClass must have required function".

<h2>with extending anther class</h2> 

```javascript
const warper = (Class) => {

class testInterface extends Interface(Class) {
    constructor() {
        super()
    }

    methods() {
      return new Set([
        'required'
      ])
    }
}
return testInterface;
};
```

then we extend the class like this

```javascript
class parentClass {
  constructor() {

  }

  required() {

  }
}

class testClass extends warper(parentClass) {
  constructor() {
     super()
  }

}

```
<h1>Test</h1>

```
npm test
```



