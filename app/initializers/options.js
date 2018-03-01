import Ember from 'ember';
import config from '../config/environment';

// copied and modified from http://ember.zone/handling-environment-data-with-ember-js/
export function initialize(/* container, application */) {
  // Check to we have required optionsConfig, even if only {}
  if(config.optionsConfig === undefined) {
    // possible config properties:
    //   metaNamePrefix - default config.modulePrefix
    //   valueAttr - default 'content'
    //   parentPathIgnoreUpTo - index of number of parent parts in path to ignore, default 2
    throw new Ember.Error("The application must be set up for options with optionsConfig, even if only {} for default config, in config/environment.js.");
  }

  var OptionsReader = function OptionsReader() {

    this.readOptionsKeys = function() {
      var _mapType = function(val) {
        return "" === val ? null : "true" === val ? true : "false" === val ? false : (-1 !== val.indexOf(",") && (val = val.split(",")), val);
      };

      // Grab all the meta tags from the DOM.
      var metaTags = Ember.$("meta");
      var options = Ember.Object.create();
      var metaNamePrefix = config.optionsConfig.metaNamePrefix || config.modulePrefix;
      var re = new RegExp(metaNamePrefix + '\/');

      // Process each of the discovered meta tags.
      for(var i=0; i < metaTags.length; i++) {
        var valueAttr = config.optionsConfig.valueAttr || 'content';
        var key = Ember.$(metaTags[i]).attr('name');
        var value = Ember.$(metaTags[i]).attr(valueAttr);

        // Does the meta tag start with our prefix?
        if (re.test(key)) {
          var nameParts = Ember.A(key.split('/'));
          var propertyName = nameParts.get('lastObject');

          // ignore first 3 parents parts in path, aka MODULE_PREFIX/initializers/options
          var parentPathIgnoreUpTo = Ember.getWithDefault(config, 'optionsConfig.parentPathIgnoreUpTo', 2);

          // also skip actual propertyName
          var parents = nameParts.filter(function(item, index) {
            if (index > parentPathIgnoreUpTo && item !== propertyName) {
              return true;
            }
            return false;
          });

          // loop through nesting and create parent objects if necessary
          var currentObject = options;
          if (parents.length > 0 ) {
            parents.forEach(function(item, index) {
              if (!currentObject.hasOwnProperty(item)) {
                currentObject[item] = Ember.Object.create();
              }

              currentObject = currentObject[item];

              // is this last parent set property value
              if (parents.length === index + 1) {
                // Map the string values to actual types.
                currentObject[propertyName] = _mapType(value);
              }
            });
          } else {
            currentObject[propertyName] = _mapType(value);
          }
        }
      }

      return options;
    };
  };

  var optionsReader = new OptionsReader();
  config.options = optionsReader.readOptionsKeys();
}

export default {
  name: 'options',
  initialize: initialize
};
