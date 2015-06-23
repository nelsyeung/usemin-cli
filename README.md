# usemin-cli

> CLI version of usemin. For _purists_, those who doesn't use build tools like Grunt and Gulp, but just use NPM as their build tool.

This is currently under development. Any contributions will be much appreciated.
At this current stage it can only compress JS files and replace the HTML blocks.

To use this now or for development. First put it into NPM:

```
git clone https://github.com/nelsyeung/usemin-cli.git
cd usemin-cli
npm install
npm link
```

Run the command to process HTML
```
usemin src/index.html --dest dist --output dist/index.html
usemin src/index.html -d dist -o dist/index.html
usemin src/index.html -d dist > dist/index.html
```

## Work still needs to be done
* Add PostCSS
* Add different options for UglifyJS
* Write more and better tests
* Refractor code
