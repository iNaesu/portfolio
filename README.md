Sean Law
====================

My personal portfolio - [seanlaw.io](https://seanlaw.io)
* Built with [Jekyll](https://jekyllrb.com/)
* Hosted on [Github Pages](https://pages.github.com/) via [Cloudflare](https://www.cloudflare.com/)


Getting started
=================

These instructions will go through the dependencies required for this project,
steps on how to get the project building locally, as well as deployment to a
live system.


Prerequisites
-------------

* [npm](https://www.npmjs.com/)


Installing
----------

```
npm install
```

This installs all the dependencies required for the project.


Running
-------

```
gulp
```

The `gulp` command runs the following tasks:
* `gulp js-watch` - lints & compiles .js files
* `gulp jekyll` - builds the Jekyll site
* `gulp serve` - serves the site on localhost:400 using BrowserSync


Deploying on Github Pages
-------------------------

```
gulp deploy --msg "commit message"
```

The above command deploys the site to the remote repository defined in the
`'deploy'` task in `root/gulpfile.js`.


License
=======

This project is licensed under the MIT License - see the LICENSE file for details
