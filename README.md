# usemin-cli 

[![Build Status](https://travis-ci.org/nelsyeung/usemin.svg?branch=master)](https://travis-ci.org/nelsyeung/usemin)
[![NPM Version](https://img.shields.io/npm/v/usemin-cli.svg)](https://www.npmjs.com/package/usemin-cli)
[![Downloads per Month](https://img.shields.io/npm/dm/usemin-cli.svg)](https://www.npmjs.com/package/usemin-cli)

> CLI version of usemin. For _purists_, those who don't use build tools like [Grunt](https://github.com/yeoman/grunt-usemin) and [Gulp](https://github.com/zont/gulp-usemin), but just use NPM as their build tool.

## Getting started

Install with npm:
```
npm install usemin-cli
```

## API
[usemin](https://github.com/nelsyeung/usemin) - API for this module.

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
usemin src/index.html -d dist -o dist/index.html --htmlmin true -c config.js
```

### Available options
```
--htmlmin - Also minifies the input HTML file (Boolean)
--rmlr, --removeLivereload - Remove livereload script (Boolean)
--noprocess - Do not process files, just replace references (Boolean)
-c, --config - Supply a configurations file for UglifyJS, CleanCSS and HTML minifier.
--listblocks - Write blocks to stdout or filename.json.
               E.g., --listblocks // print to stdout
                     --listblocks blocks.json // write to blocks.json
```

### Example HTML
#### Blocks
Blocks are expressed as:
```html
<!-- build:<pipelineId>(alternate search path) <path> -->
... HTML Markup, list of script / link tags.
<!-- endbuild -->
```

- **pipelineId**: pipeline id for options or remove to remove a section
- **alternate search path**: (optional) By default the input files are relative to the treated file. Alternate search path allows one to change that
- **path**: the file path of the optimized file, the target output

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

<!-- build:remove -->
<script src="js/app.js"></script>
<script src="js/controllers.js"></script>
<!-- endbuild -->

<script>document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>')</script>
```
Running the command with `--rmlr true` will output:
```
<link rel="stylesheet" href="css/main.js">
<script src="js/main.js"></script>
<script defer async src="js/main.js"></script>
```

#### Alternate search path
```html
<!-- build:js(js) js/main.js -->
<script defer async src="app.js"></script>
<script defer async src="controllers.js"></script>
<!-- endbuild -->

<!-- build:js(js,.tmp) js/main.js -->
<script defer async src="app.js"></script>
<script defer async src="controllers.js"></script>
<!-- endbuild -->
```

### Config file

Please check the relevant documentations for the available options: [ UglifyJS](https://github.com/mishoo/UglifyJS2), [CleanCSS](https://github.com/jakubpawlowicz/clean-css) and [HTML minifier](https://github.com/kangax/html-minifier).

```JavaScript
module.exports = {
	uglifyjs: {
		// ... UglifyJS API options
	},
	cleancss: {
		// ... CleanCSS API options
	},
	htmlminifier: {
		// ... HTML minifier API options
	}
}
```

## License

[MIT license](http://opensource.org/licenses/MIT.php)
