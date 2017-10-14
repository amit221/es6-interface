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


const container = function () {

    if (container.arguments.length === 0) {
        throw new Error('you need to supply at least one interface');
    }

    let arr = [];
    const argLength = container.arguments.length;
    let Class = null;
    for (let i in container.arguments) {

        if (container.arguments[i] instanceof Set) {
            arr = [...arr, ...container.arguments[i]];
        }
        else if (parseInt(i) + 1 === argLength && typeof container.arguments[i] === "function") {
            Class = container.arguments[i];
        }
        else {
            throw new Error("interfaces need to be instance of Set")
        }
    }

    let requiredMethods = new Set(arr);
    if (Class === null) {
        Class = DummyClassForExtendsIfNoClassWasSendToAvoidError
    }

    class Interface extends Class {

        constructor() {
            super();
            const ClassMethods = getClassMethodNames(this);
            let errors = "";
            requiredMethods.forEach(key => {
                if (ClassMethods.has(key) === false) {
                    errors += key + " ";
                }
            });
            if (errors) {
                throw  new Error(this.constructor.name + ' must have ' + errors + 'methods')
            }
        }


    }
    return Interface
}

module.exports = container;