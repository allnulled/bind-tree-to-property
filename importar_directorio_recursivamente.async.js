const fs = require("fs");
const path = require("path");
const importar_directorio_recursivamente = async function (directory, obj, prop, rootParameter = undefined) {
    try {
        const files = await fs.promises.readdir(directory);
        obj[prop] = {};
        rootParameter = rootParameter ? rootParameter : obj[prop];
        for (let index = 0; index < files.length; index++) {
            const file = files[index];
            const filepath = path.resolve(directory, file);
            const subprop = file.replace(/^[0-9]+\./g, "").replace(/(\.(factoria|clase|estatico|prometedor|promesa))?\.js$/g, "");
            const isDirectory = (await fs.promises.lstat(filepath)).isDirectory();
            if (isDirectory) {
                obj[prop][subprop] = {};
                await importar_directorio_recursivamente(filepath, obj[prop], subprop, rootParameter);
            } else if (file.endsWith(".factoria.js")) {
                const mod = require(filepath);
                if (typeof mod === "function") {
                    const result = mod.call(rootParameter);
                    obj[prop][subprop] = result;
                } else {
                    obj[prop][subprop] = mod;
                }
            } else if (file.endsWith(".prometedor.js")) {
                const mod = require(filepath);
                if (typeof mod === "function") {
                    const result = mod.call(rootParameter);
                    obj[prop][subprop] = await result;
                } else {
                    obj[prop][subprop] = mod;
                }
            } else if (file.endsWith(".promesa.js")) {
                obj[prop][subprop] = await require(filepath);
            } else if (file.endsWith(".clase.js")) {
                obj[prop][subprop] = require(filepath);
            } else if (file.endsWith(".estatico.js")) {
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
