/**
 * @file Resources
 * @author Mike Joyce [hello@mikejoyce.io]
 */

export const Resources = (function() {

  /**
   * resourceCache
   * @type {Object}
   */
  const resourceCache = {};

  /**
   * loading
   * @type {Array}
   */
  const loading = [];

  /**
   * readyCallbacks
   * @type {Array}
   */
  const readyCallbacks = [];

  /**
   * load
   * @public
   * @param {string|Array} urlOrArr url or array
   */
  function load(urlOrArr) {

    if (urlOrArr instanceof Array) {

      /**
       * If an array is passed, loop through each value
       * and call the image loader on that image
       */
      urlOrArr.forEach(function(url) {
        _load(url);
      });

    } else {

      /**
       * If a string is passed, call the image loader directly
       */
      _load(urlOrArr);

    }

  }

  /**
   * _load
   * @private
   * @param  {string} url
   * @return {string} if a URL has been loaded previously, return the image instead of re-loading it
   */
  function _load(url) {

      if (resourceCache[url]) {

        return resourceCache[url];

      } else {

        /**
         * The URL has not been loaded previously, and has not been cached
         */
        const img = new Image();

        img.onload = function() {

          /**
           * Add image to cache
           */
          resourceCache[url] = img;

          /**
           * Once the image is loaded and cached, call all onReady callbacks
           */
          if (isReady()) {
              readyCallbacks.forEach(function(func) { func(); });
          }

        };

        /**
         * Set initial cache value to false, which will change when the image's
         * onload event handler is called
         */
        resourceCache[url] = false;

        /**
         * Set the image's src attribute
         */
        img.src = url;

      }
  }

  /**
   * get - if an image is cached, functions the same as calling load() on the URL
   * @param  {string} url
   * @return {string}
   */
  function get(url) {
    return resourceCache[url];
  }

  /**
   * isReady - determines if all images have completed loading
   * @return {Boolean}
   */
  function isReady() {
    let ready = true;
    for (const k in resourceCache) {
      if (resourceCache.hasOwnProperty(k) && !resourceCache[k]) {
        ready = false;
      }
    }
    return ready;
  }

  /**
   * onReady - add a function to the callback stack that is called when all images are loaded
   * @param {function} func
   */
  function onReady(func) {
    readyCallbacks.push(func);
  }

  /**
   * Return public functions
   */
  return {
    load,
    get,
    onReady,
    isReady
  };

})();
