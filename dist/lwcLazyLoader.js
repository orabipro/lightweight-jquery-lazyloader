/**
 * @author codingsamuel
 * @version 1.0.1
 * @license MIT
 * @copyright codingsamuel 2019
 */
class LwcLazyLoader {
  
  constructor(wrapper, selector){
    this._wrapper = wrapper;
    this._selector = selector;
  }

  /**
   * @param {Number} num 
   * @param {Number} min 
   * @param {Number} max 
   */
  _between(num, min, max) {
    return num > min && num < max;
  }

  getWrapper() {
    return this._wrapper;
  }

  getSelector() {
    return this._selector;
  }

  getElements() {
    return this.getWrapper().find(this.getSelector());
  }

  setScrollTop(scrollTop) {
    this._scrollTop = scrollTop;
  }

  getScrollTop() {
    return this._scrollTop;
  }


  elementsToLoad() {
    let elements = this.getElements();
    let toLoad = [];

    
    elements.each((i, e) => {
      let el = $(e);
      let topOffset = el.offset().top;
      let scrollTop = this.getScrollTop();
      let height = window.innerHeight;
      
      let minHeight = topOffset - height;
      let maxHeight = topOffset + height;
      
      if (this._between(scrollTop, minHeight, maxHeight)) {
        toLoad.push(el);
      }
    });

    return toLoad;
  }

  /**
   * @param {Number} length 
   */
  rndId(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

  /**
   * @param {Array} elements
   * @param {Object} config
   * @param {String} config.dataSrc
   * @param {String} config.dataLoadedSelector
   * @param {String} config.dataIsCSS 
   * @param {Function} config.onElementLoad
   * @param {Function} config.onElementLoaded
   */
  loadElements(elements, config) {
    
    for (let i = 0; i < elements.length; i++) {
      
      let el = elements[i];
      let dataLoaded = el.attr(config.dataLoadedSelector);
      let src = el.attr(config.dataSrc);

      if (dataLoaded != "loaded" && dataLoaded != "loading") {
        if (el.attr(config.dataIsCSS) == "true") {
          let id = this.rndId(5);
          el.append(`<img id="lwcLazyLoader${id}" src="" style="display:none;">`);
          $(`#lwcLazyLoader${id}`).attr('src', src).on('load', (e) => {
            $(e.currentTarget).remove();
            el.css('background-image', `url(${src})`);
            
            if (config.onElementLoaded)
              config.onElementLoaded.call(this, el);
            
            el.attr(config.dataLoadedSelector, 'loaded');
          });
        } else {
          el.attr('src', src).on('load', (e) => {
            
            if (config.onElementLoaded)
              config.onElementLoaded.call(this, el);
            
            el.attr(config.dataLoadedSelector, 'loaded');
          });
        }

        el.attr(config.dataLoadedSelector, 'loading');
        
        if (config.onElementLoad)
          config.onElementLoad.call(this, el);
      }
    }

  }

}

/**
 * @param {Object} settings;
 * @param {String} settings.selector
 * @param {String} settings.dataSelector
 * @param {String} settings.dataLoadedSelector
 * @param {String} settings.dataCSSSelector
 * @param {Function} settings.onElementLoad
 * @param {Function} settings.onElementLoaded
 */
$.fn.lwcLazyLoad = function(settings) {
  if (!settings) settings = {};

  let lazyLoader = new LwcLazyLoader(this, settings.selector || 'img');

  $(document).ready(() => {
    lazyLoader.setScrollTop($(document).scrollTop());
    let elements = lazyLoader.elementsToLoad();

    lazyLoader.loadElements(elements, {
      dataSrc: settings.dataSelector || 'data-lazyload',
      dataLoadedSelector: settings.dataLoadedSelector || 'data-lazyloaded',
      dataIsCSS: settings.dataCSSSelector || 'data-lazyload-css',
      onElementLoad: settings.onElementLoad,
      onElementLoaded: settings.onElementLoaded
    });
  });

  $(window).scroll((e) => {
    lazyLoader.setScrollTop($(document).scrollTop());
    let elements = lazyLoader.elementsToLoad();
    
    lazyLoader.loadElements(elements, {
      dataSrc: settings.dataSelector || 'data-lazyload',
      dataLoadedSelector: settings.dataLoadedSelector || 'data-lazyloaded',
      dataIsCSS: settings.dataCSSSelector || 'data-lazyload-css',
      onElementLoad: settings.onElementLoad,
      onElementLoaded: settings.onElementLoaded
    });
  });
}