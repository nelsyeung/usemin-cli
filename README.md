# usemin-cli [![Build Status](https://travis-ci.org/nelsyeung/usemin-cli.svg?branch=master)](https://travis-ci.org/nelsyeung/usemin-cli)

> CLI version of usemin. For _purists_, those who doesn't use build tools like [Grunt](https://github.com/yeoman/grunt-usemin) and [Gulp](https://github.com/zont/gulp-usemin), but just use NPM as their build tool.

## Getting started

To use this now, install with this command:
```
npm install usemin-cli
```

From GitHub
```
git clone https://github.com/nelsyeung/usemin-cli.git
cd usemin-cli
npm install
npm link
```

## Usage

```
usemin [input.html] [--dest|-d dir] [--output|-o output.html] [options]
```
### Example commands
```
usemin src/index.html --dest dist --output dist/index.html
usemin src/index.html -d dist -o dist/index.html
usemin src/index.html -d dist > dist/index.html
usemin src/index.html -d dist -o dist/index.html --htmlmin true --rmlr true
```

### Available options
```
--htmlmin - Also minifies the input HTML file (Boolean)
--rmlr, --removeLivereload - Remove livereload script (Boolean)
--noprocess - Do not process files, just replace references (Boolean)
```

### Example HTML
```html
<!-- build:css css/main.js -->
<link rel="stylesheet" href="css/main.css">
<link rel="stylesheet" href="css/modules.css">
<!-- endbuild -->

<!-- build:js js/main.js -->
<script src="js/app.js"></script>
<script src="js/controllers.js"></script>
<!-- endbuild -->

<!-- build:js js/main.js -->
<script defer async src="js/app.js"></script>
<script defer async src="js/controllers.js"></script>
<!-- endbuild -->

<script>document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>')</script>
```
Running the command with `--rmlr true` will output:
```
<link rel="stylesheet" href="css/main.js">
<script src="js/main.js"></script>
<script defer async src="js/main.js"></script>
```

## What's being worked on
This is still under development. Any contributions will be much appreciated.

- Accept a single config file for clean-css, uglify-js and htmlmin
- Filerev
- Batch processing

## License

[MIT license](http://opensource.org/licenses/MIT.php)
