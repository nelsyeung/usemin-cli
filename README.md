# usemin-cli [![Build Status](https://travis-ci.org/nelsyeung/usemin-cli.svg?branch=master)](https://travis-ci.org/nelsyeung/usemin-cli)

> CLI version of usemin. For _purists_, those who doesn't use build tools like Grunt and Gulp, but just use NPM as their build tool.

This is currently under development. Any contributions will be much appreciated.
At this current stage it can only compress JS and CSS files and replace the HTML blocks.

## Getting started

To use this now, install with this command:
```
npm install usemin-cli
```

For development purposes, put it into NPM from GitHub
```
git clone https://github.com/nelsyeung/usemin-cli.git
cd usemin-cli
npm install
npm link
```

## Usage

Run the command to process HTML
```
usemin src/index.html --dest dist --output dist/index.html
usemin src/index.html -d dist -o dist/index.html
usemin src/index.html -d dist > dist/index.html
```

## Work still needs to be done
* Add different options for UglifyJS
* Add different options for clean-css
* Write more and better tests
* Refractor code
