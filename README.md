# Ember-cli-meta-options

This simple add-on will add an options object to your App instance to
be used for passed in configuration from meta tags on the page where
your app is instantiated.

## Why is this useful?

By parsing meta tags with your app's modulePrefix as a prefix, you can
make passed in settings available to app for your use.

This is can be handy if you want to use one app as the basis for a
widget where all that varies is text and perhaps exportable values.

You can find background here:

http://discuss.emberjs.com/t/how-to-have-multiple-instances-of-an-app-in-same-window/6733

Example code to come, in the mean time you can email me if you have questions
(wm -a t- waltermcginnis dot com).

## Installation

    ember install ember-cli-meta-options

You'll then need to config the addon by adding this to your
config/environment.js (only add from BEGIN to END, everything is
context about where to put it, mind the comma just before BEGIN):

      var ENV = {
        modulePrefix: 'poc2',
        ...
       APP: {
         ...
       },
       // BEGIN configuration for options initializer
       optionsConfig: {
         // leave blank to use all defaults
         // metaNamePrefix: modulePrefix
         // valueAttr: 'content'
         // parentPathIgnoreUpTo: 2
         // parentPathToIgnoreUpTo is index of number of parent parts in path to ignore
         // conventional parent path in meta tag name is 'modulePrefix/initializers/options/'
       }
       // END configuration for options initializer
    }

## Usage

Simply add meta tags with the name value pairs that you want to your
index.html file or wherever your app is deployed following this
convention:

    <meta name="[your_app's modulePrefix]/initializers/options/your_setting_name" content="your_value">

E.g.

    <meta name="example/initializers/options/appTitle" content="Example Ember App">

This would make an options object with the propery named appTitle with
a value of "Example Ember App" available to use.

You can also group options by nested objects.

E.g.

    <meta name="example/initializers/options/article/title" content="Example article">
    <meta name="example/initializers/options/article/summary" content="Blah, blah, blah">

Would result in the options object having a nested object called
article with two properties called title and summary.

    { article: { title: "Example article", summary: "Blah, blah, blah" } }

## Tests

There are now acceptance tests that confirm the core features work.

I'm happy to accept pull requests for unit tests of the initializer code though.

## Credits

Originally developed by [Walter Mcginnis](https://github.com/walter).

This ember-cli add-on was built as a part of widget work for http://askthem.io.

It's based on code from [Ember Zone](http://ember.zone/handling-environment-data-with-ember-js/).

Thanks to the Ember.js, ember-cli, and Broccoli teams for excellent work.
