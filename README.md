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

How to generate a random pattern:

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

// Using default method parameters
fs.writeFileSync('avatar.svg', randomAvatarGenerator.getRandomAvatar());
```

### Advance use

You also can generate the avatar data definition and then generate the SVG string with the following methods:

```js
const avatarData = randomAvatarGenerator.generateRandomAvatarData();
const svgCode = randomAvatarGenerator.getAvatarFromData(avatarData);
```

## Options

These are the general parameters available in the library API:

### complexity

This parameter determines the bits length of the `x` and `y` axes randomly generated numbers.

### size

The purpose of this optional parameter is the inner calculations of the SVG paths. As the output is a scalable vector, dimensions are almost irrelevant, but we prefered to keep this parameter available on the the library API.

### renderMethod

As each enabled position within the svg output can be rendered independently, the API allows the selection of the way it will be draw. By default, it will use a simple `square` but also is available a `circle` method within the library. But also it's possible to extend it defining a custom callback that must output a string with a valid SVG path.

This is an example of a custom callback that can be used in this parameter:

```js
const drawTriangle (resolution, indexX, indexY) => `M${(indexX * resolution) + (resolution / 2)},${indexY * resolution} l${resolution / 2} ${resolution} l-${resolution} 0z`;
// Output example: M76.5,0 l25.5 51 l-51 0z
```

in wich

`resolution` is function of the relation between `size` and `complexity` or the size of each cell to be draw:

```js
const resolution = Math.floor(size / complexity);
```

and

`indexX` and `indexY` are the selected cell coordinates to be draw.

With this parameters you'll be able to define the absolute position within the draw area and the dimensions of each cell.

More information about SVG paths here: [Paths - SVG: Scalable Vector Graphics | MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths).

## Available methods

### generateRandomAvatarData

Returns a randomly generated string representation code of an avatar for a given `complexity`.

#### Usage

```js
const avatarData = randomAvatarGenerator.generateRandomAvatarData(3);
// Output example: 0-6-6te25-9d9p0-xd5g
```

#### Arguments

| name | type | description |
|------|------|-------------|
|`complexity`         |number|(optional) Default value: `16`|
|`avatarDataSeparator`|string|(optional) Default value: `-`|

### getAvatarFromData

Returns a string with a valid SVG markup for a given `avatarData`.

#### Usage

```js
randomAvatarGenerator.getAvatarFromData('0-6-6te25-9d9p0-xd5g');
// Output: <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 256 256"><path fill="#aeb26d" d="M0,0 h85 v85 h-85Z M85,0 h85 v85 h-85Z M170,0 h85 v85 h-85Z"/><path fill="#f01b54" d="M0,85 h85 v85 h-85Z M85,85 h85 v85 h-85Z M170,85 h85 v85 h-85Z"/><path fill="#17c0d4" d=""/></svg>
```

#### Arguments

| name | type | description |
|------|------|-------------|
|`avatarData`         |string|(required) A valid avatar data code|
|`renderMethod`       |string or function|(optional) Default value: `square`|
|`size`               |number|(optional) Default value: `256`|
|`avatarDataSeparator`|string|(optional) Default value: `-`|
---

### getRandomAvatar

A simpler helper that returns a random SVG markup for a give `complexity`

#### Usage

```js
const randomAvatar = randomAvatarGenerator.getRandomAvatar(4)
// Output example: <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 256 256"><path fill="#fbdfae" d="M0,0 h64 v64 h-64Z M128,0 h64 v64 h-64Z"/><path fill="#1ad956" d="M0,64 h64 v64 h-64Z M128,64 h64 v64 h-64Z"/><path fill="#f26f0b" d="M64,128 h64 v64 h-64Z M192,128 h64 v64 h-64Z"/><path fill="#38b27d" d="M0,192 h64 v64 h-64Z M128,192 h64 v64 h-64Z"/></svg>
```

#### Arguments

| name | type | description |
|------|------|-------------|
|`complexity`         |number|(optional) Default value: `16`|
|`renderMethod`       |string or function|(optional) Default value: `square`|
|`size`               |number|(optional) Default value: `256`|


## License

The code is available under the [MIT license](LICENSE.txt).