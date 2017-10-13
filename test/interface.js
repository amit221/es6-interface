'use strict'

const chai = require('chai');
const expect = chai.expect;
const Interface = require('../interface')

describe('Interface', () => {

    it('should throw error if methods is not a function ', () => {

        const warper = (Class) => {
            class testInterface extends Interface(Class) {
                constructor() {
                    super()
                }

            }
            return testInterface;
        };

        class testClass extends warper() {
            constructor() {
                super()
            }

        }

        try {
            new testClass();
        }
        catch (err) {
            expect(err.message).to.equal("methods should be of type function")
        }


    })

    it('should throw error if methods don`t return Set', () => {

        const warper = (Class) => {
            class testInterface extends Interface(Class) {
                constructor() {
                    super()
                }

            }
            return testInterface;
        };

        class testClass extends warper() {
            constructor() {
                super()
            }

            methods() {

            }
        }

        try {
            new testClass();
        }
        catch (err) {
            expect(err.message).to.equal("methods should be of type Set")
        }
    })


    it('should throw error with message required method name and class', () => {
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
        }

        class testClass extends warper() {
            constructor() {
                super()
            }
        }

        try {
            new testClass();
        }
        catch (err) {
            expect(err.message).to.equal("testClass must have required function")
        }

    })

    it('should have parent class methods', () => {
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

        try {
            new testClass();
        }
        catch (err) {
            expect(err.message).to.equal("should extend")
        }

    })

    it('should work without parent class extend ', () => {


        class testInterface extends Interface() {
            constructor() {
                super()
            }

            methods() {
                return new Set([
                    'required'
                ])
            }
        }


        class testClass extends testInterface {
            constructor() {
                super()
            }
            required(){
                return 'ok';
            }

        }

        try {
            const t = new testClass();

            expect(t.required()).to.equal("should extend")
        }
        catch (err) {

        }


    })
});