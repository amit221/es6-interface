const getClassMethodNames = (obj) => {
    let methods = new Set();
    while (obj = Reflect.getPrototypeOf(obj)) {
        let keys = Reflect.ownKeys(obj)
        keys.forEach((k) => methods.add(k));
    }
    return methods;
}

class DummyClassForExtendsIfNoClassWasSendToAvoidError {
}


const warper = (Class) => {

    if (typeof Class !== 'function' && typeof Class !== 'object') {
        Class = DummyClassForExtendsIfNoClassWasSendToAvoidError
    }

    class Interface extends Class {

        constructor() {

            super()
            const ClassMethods = getClassMethodNames(this);
            if (typeof this.methods !== 'function') {
                throw new Error("methods should be of type function")
            }
            const requiredMethods = this.methods()
            if (requiredMethods instanceof Set === false) {
                throw new Error("methods should be of type Set ")
            }
            requiredMethods.forEach(key => {
                if (ClassMethods.has(key) === false) {
                    throw  new Error(this.constructor.name + ' must have ' + key + ' function')
                }
            });
        }


    }
    return Interface
}

module.exports = warper;