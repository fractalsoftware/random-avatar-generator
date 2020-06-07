# Random Avatar Generator

[![LICENSE](https://img.shields.io/badge/license-MIT-lightgrey.svg)](https://github.com/manuelhe/random-avatar-generator/blob/master/LICENSE.txt)
[![Build Status](https://travis-ci.org/manuelhe/random-avatar-generator.svg?branch=master)](https://travis-ci.org/manuelhe/random-avatar-generator)
![Node.js CI](https://github.com/manuelhe/random-avatar-generator/workflows/Node.js%20CI/badge.svg?branch=master)

A random pixel pattern generator with low collision and zero external dependencies.

![sample](https://raw.githubusercontent.com/manuelhe/random-avatar-generator/master/example/example1.svg)

## Demo

https://morra.co/random-avatar-generator

## Introduction

As part of an academic publication and a side project, I built this simple library to ilustrate different aspects of the JavaScript language capabilities and ecosystem, mixed with some general software development concepts.

This library can produce a random svg code for a given complexity with the following logic:

* For a given `complexity` positive integer number a couple of numbers representing `x` and `y` axes random binary numbers are generated.
* `XOR` computed value enables one position within the matrix of values.
* In order to have bigger numeric space to prevent collision, each row  within the matrix has a random color number.

## Installation

```
$ npm install random-avatar-generator
```

## Usage

How to get a random pattern:

### In browser

```html
<script src="random-avatar-generator.js"></script>

<div id="randonavatar"></div>

<script>
    document.getElementById('randomavatar').innerHtml = randomAvatarGenerator.getRandomAvatar(8, 420);
</script>
```

### In NodeJS

```js
const randomAvatarGenerator = require('random-avatar-generator');

fs.writeFileSync('avatar.svg', randomAvatarGenerator.getRandomAvatar());
```

## Options

## License

The code is available under the [MIT license](LICENSE.txt).