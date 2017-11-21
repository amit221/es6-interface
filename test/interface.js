'use strict'

const chai = require('chai');
const expect = chai.expect;
const Interface = require('../interface');

const testInterface1 = new Set(['required1(arg1)']);
const testInterface2 = new Set(['required2(arg1,arg2)', 'required3({arg1 , arg2 , arg3})']);
const testInterface3 = new Set(['missingArgumentMethod(arg1)']);
const testInterface4 = new Set(['required4({arg1, arg2, arg3}, arg4)']);

class parentClass {
    constructor() {

    }

    required4({arg1, arg2, arg3}, arg4) {

    }
}


describe('Interface', () => {

    it('should throw error if no interfaces supplied ', () => {
        try {
            class testClass extends Interface() {
                constructor() {
                    super();
                }
            }

        }
        catch (err) {
            expect(err.message).to.equal("you need to supply at least one interface")
        }
    });
    it('should throw error if interface is not instance of Set ', () => {
        try {
            class testClass extends Interface('STRING') {
                constructor() {
                    super();
                }
            }

            new testClass();
        }
        catch (err) {
            expect(err.message).to.equal("interfaces need to be instance of Set")
        }
    });
    it('should throw error class did not implemented testInterface1 interface ', () => {
        try {
            class testClass extends Interface(testInterface1) {
                constructor() {
                    super();
                }
            }
            new testClass();
        }
        catch (err) {
            expect(err.message).to.equal("testClass must implement required1(arg1) methods")
        }
    });
    it('should throw error class did not implemented testInterface3 interface ', () => {
        try {
            class testClass extends Interface(testInterface3) {
                constructor() {
                    super();
                }

                required6() {
                }
            }
            new testClass();
        }
        catch (err) {
            expect(err.message).to.equal("testClass must implement missingArgumentMethod(arg1) methods")
        }
    });

    it('should throw error class did not implemented testInterface1 and testInterface2 interface ', () => {
        try {
            class testClass extends Interface(testInterface1, testInterface2) {
                constructor() {
                    super();
                }
            }
            new testClass();
        }
        catch (err) {
            expect(err.message).to.equal("testClass must implement required1(arg1) required2(arg1,arg2) required3({arg1,arg2,arg3}) methods")
        }
    })

    it('should throw error class did not implemented testInterface1 and testInterface2 interface ', () => {
        try {
            class testClass extends Interface(testInterface1, testInterface2, testInterface4, parentClass) {
                constructor() {
                    super();
                }

            }
            new testClass();
        }
        catch (err) {
            expect(err.message).to.equal("testClass must implement required1(arg1) required2(arg1,arg2) required3({arg1,arg2,arg3}) methods")
        }
    })


});