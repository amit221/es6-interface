const getClassMethodNames = (obj) => {
    let methods = new Set();
    while (obj = Reflect.getPrototypeOf(obj)) {
        let keys = Reflect.ownKeys(obj);
        keys.forEach((k) => methods.add(k));
    }
    return methods;
};
const getArgs = (func) => {
    let args = null;

    switch (typeof func) {
        case 'function': {
            args = func.toString().match(/\(\s*([^)]*?)\s*\)/);
            break;
        }
        case 'string': {
            args = func.match(/\(\s*([^)]*?)\s*\)/);
            break;
        }
        default: {
            throw new Error('func must be of type function or string');
        }
    }

    if (args === null || !args[1]) {
        return "";
    }
    args = args[1];
    return args.split(/\s*,\s*/).map((arg) => {
        return arg.replace(/\/\*.*\*\//, '').trim();
    }).filter(arg => {
        return arg;
    });
};


class DummyClassForExtendsIfNoClassWasSendToAvoidError {
}


const container = function (options) {

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
            throw new Error("interfaces need to be instance of Set");
        }
    }

    let requiredMethods = new Set(arr);
    if (Class === null) {
        Class = DummyClassForExtendsIfNoClassWasSendToAvoidError;
    }

    class Interface extends Class {

        constructor(options) {
            super(options);

            const ClassMethods = getClassMethodNames(this);
            let errors = "";
            requiredMethods.forEach(key => {
                let methodNameIndex = key.indexOf("(");
                let methodName = methodNameIndex > -1 ? key.substr(0, methodNameIndex) : key;

                if (ClassMethods.has(methodName) === false || getArgs(this[methodName]).toString() !== getArgs(key).toString()) {
                    errors += `${methodName}(${getArgs(key)}) `;
                }
            });

            if (errors) {
                throw  new Error(this.constructor.name + ' must implement ' + errors + 'methods');
            }
        }
    }

    return Interface;
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = container;
    return;
}

if (typeof define === 'function' && define.amd) {
    define([], function () {
        return container;
    });
    return;
}

window.es6Interface = container;


