# bind-tree-to-property

Create APIs from directories and files.

## Installation

```sh
$ npm i -s bind-tree-to-property
```

## Usage

Given this filesystem tree:

```
/index.js
/src/auth/login.js
/src/auth/logout.js
/src/data/select.js
/src/data/insert.js
/src/data/update.js
/src/data/delete.js
```

We can do:

```js
const bindTreeToProperty = require("bind-tree-to-property");
const myFramework = {};
bindTreeToProperty("./src", myFramework, "api");
```

So we can get things done like:

```js
myFramework.api.auth.login();
myFramework.api.auth.logout();
myFramework.api.data.select();
myFramework.api.data.insert();
myFramework.api.data.update();
myFramework.api.data.delete();
```

## API

The whole library is based on 1 function: `bindTreeToProperty`.

This function accepts as parameters:

  - **directory**: *String*. Directory root of the future property value.
  - **object**: *Object*. Object that owns the property we want to set.
  - **property**: *String*. Property that we want to set.
  - **root**: *Object*. Object used as scope of the functional modules. Optional. By default, it is the **object**.

This function returns a: `Promise`. This promise returns the initial object extended.

**Caution!** this function does **NOT** create a copy of the object, it instead **extends** the provided object itself.

## Why.

To create Node.js APIs fastly and schematically.

- Using 0 dependencies
- In 50 lines of code
- In less than 2.5kB of code
- Supports the following module types:
   - *static*
   - *function*
   - *class*
   - *factory*
   - *promise*
   - *promiser* or async factory

## Really, why.

It is like... having an iluminated tree.

The skeleton of that tree is provided by the filesystem, the files and folders draw that skeleton.

The light of that tree is provided by Node.js and the runtime.

Given this... you can do 2 things: 

  - You can turn off a branch, simply deleting a property. When you load it again, the branch will become illuminated again.

  - You can cut a branch, by deleting a property and the cache of node that provided the value of that property. This time, when you load it again, the branch will be regenerated, and then, illuminated again.

Basically, this is the ide behind this library. An illuminated tree.

## License

No license, do what you want.
