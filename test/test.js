const bindTreeToProperty = require(__dirname + "/../index.js");

const tests = {};

const main = async function() {
    
    await bindTreeToProperty(__dirname + "/objectOne", tests, "objectOne");
    await bindTreeToProperty(__dirname + "/objectTwo", tests, "objectTwo");

    if(tests.objectOne.this.is.a.test.for.module1() !== 800) throw new Error("Failed module1.js!");
    if(tests.objectOne.this.is.a.test.for.module2() !== 800) throw new Error("Failed module2.js!");
    if(tests.objectOne.this.is.a.test.for.module3 !== 800) throw new Error("Failed module3.factory.js!");
    if(tests.objectOne.this.is.a.test.for.module4() !== 800) throw new Error("Failed module4.class.js!");
    if((await tests.objectOne.this.is.a.test.for.module5) !== 800) throw new Error("Failed module5.promise.js!");
    if((await tests.objectOne.this.is.a.test.for.module6) !== 800) throw new Error("Failed module6.promiser.js!");

    console.log("Tests passed successfully!");

};

main();
