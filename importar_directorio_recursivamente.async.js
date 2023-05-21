const fs = require("fs");
const path = require("path");
const importar_directorio_recursivamente = async function (directory, obj, prop, rootParameter = undefined) {
    try {
        rootParameter = rootParameter ? rootParameter : obj;
        const files = await fs.promises.readdir(directory);
        obj[prop] = {};
        for (let index = 0; index < files.length; index++) {
            const file = files[index];
            const filepath = path.resolve(directory, file);
            const subprop = file.replace(/^[0-9]+\./g, "").replace(/(\.(factory|class|static|promiser|promise))?\.js$/g, "");
            const isDirectory = (await fs.promises.lstat(filepath)).isDirectory();
            if (isDirectory) {
                obj[prop][subprop] = {};
                await importar_directorio_recursivamente(filepath, obj[prop], subprop, rootParameter);
            } else if (file.endsWith(".factory.js")) {
                const mod = require(filepath);
                if (typeof mod === "function") {
                    const result = mod.call(rootParameter);
                    obj[prop][subprop] = result;
                } else {
                    obj[prop][subprop] = mod;
                }
            } else if (file.endsWith(".promiser.js")) {
                const mod = require(filepath);
                if (typeof mod === "function") {
                    const result = mod.call(rootParameter);
                    obj[prop][subprop] = await result;
                } else {
                    obj[prop][subprop] = mod;
                }
            } else if (file.endsWith(".promise.js")) {
                obj[prop][subprop] = await require(filepath);
            } else if (file.endsWith(".class.js")) {
                obj[prop][subprop] = require(filepath);
            } else if (file.endsWith(".static.js")) {
                obj[prop][subprop] = require(filepath);
            } else if (file.endsWith(".js")) {
                let mod = require(filepath);
                if (typeof mod === "function") {
                    mod = mod.bind(rootParameter);
                }
                obj[prop][subprop] = mod;
            }
        }
    } catch (error) {
        console.error("Error in «importar_directorio_recursivamente»", error);
    }
}
importar_directorio_recursivamente.default = importar_directorio_recursivamente;
module.exports = function(directory) {
    const api = {};
    return new Promise((ok, fail) => {
        importar_directorio_recursivamente(directory, api, "api").then(() => {
            ok(api.api);
        }).catch(error => {
            fail(error);
        });
    });
};
