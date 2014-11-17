var React = require('react/addons');

module.exports = {
  el: function(src, sel){
    if(!sel){
      sel = src;
      src = document;
    }
    return src.querySelector(sel);
  },

  els: function(src, sel){
    if(!sel){
      sel = src;
      src = document;
    }
    return Array.prototype.slice.call(src.querySelectorAll(sel));
  },

  val: function(from){
    return from.value||from.getAttribute('value')||from.innerText||from.innerHTML;
  },

  toHyphens: function(s){
    return s.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  },

  toCamelCase: function(s){
    return s.toLowerCase().replace(/-(.)/g, function(match, group){
      return group.toUpperCase();
    });
  },

  paramByName: function(name, defaultValue) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? defaultValue : decodeURIComponent(results[1].replace(/\+/g, " "));
  },

  filterParams: function(filter, defaultValues){
    var params = this.params(defaultValues),
        results = {},
        keys = Object.keys(params);
    keys.forEach(function(key){
      if(key.match(filter)){
        results[key] = params[key];
      }
    });
    return results;
  },

  param: function(val, defaultValue){
    var result = defaultValue,
        tmp = [];
    location.search
      .substr(1)
        .split("&")
        .forEach(function(item){
          tmp = item.split("=");
          if (tmp[0] === val){
            result = decodeURIComponent(tmp[1].replace(/\+/g, " "));
          }
        });
    return result;
  },

  reTrue: /^(true|t|yes|y|1)$/i,
  reFalse: /^(false|f|no|n|0)$/i,

  isTrue: function(value){
    return !!this.reTrue.exec(''+value);
  },

  isFalse: function(value){
    return !!this.reFalse.exec(''+value);
  },

  isNumeric: function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
  },

  isFraction: function(n){
    return n.match(/^(\d+\W\d+\/\d+|\d+\/\d+)$/);
  },

  decodeValue: function(value){
    if(this.isNumeric(value)){
      return +value;
    }else if(this.isTrue(value)){
      return true;
    }else if(this.isFalse(value)){
      return false;
    }else{
      return value;
    }
  },

  hashParams: function(defaults){
    var q = location.hash.split('?'),
      d = function(s){
            return decodeURIComponent(s.replace(/\+/g, " "));
          },
      r  = /([^&=]+)=?([^&]*)/g,
      r2= /([^&=\[]+)\[(.*)\]/,
      r3= /([^&=\[]+)\]\[(.+)/,
      urlParams = {},
      key, value, e, e2, elem;
    q.shift();
    q = q.join('?');
    for(key in (defaults || {})){
      urlParams[key] = defaults[key];
    }
    while (e = r.exec(q)) {
      if(e[1].indexOf("[") === -1){
        // simple match, no [] identifiers
        urlParams[d(e[1])] = d(e[2]);
      }else{
        value = e[2];
        key = e[1];
        elem = urlParams;
        if(key.indexOf('][')===-1){
          while(e2=r2.exec(key)){
            key = e2[1];
            elem = elem[key] = elem[key] || {};
            key = e2[2];
          }
        }else{
          key = key.replace(/\]$/i, '');
          while(e2 = r3.exec(key)){
            key = e2[1];
            elem = elem[key] = elem[key] || {};
            if(e2[2]){
              key = e2[2];
            }
          }
        }
        if(!key){
          key = elem.length = elem.length||0;
          elem.length++;
        }
        elem[key] = value;
      }
    }
    return urlParams;
  },

  params: function(defaults){
    return this.parseParams(window.location.search.replace(/^\?/,''), true, defaults);
  },

  parseParams: function(paramStr, decodeValues, defaults){
    var self = this,
      q = paramStr||'',
      d = function (s) {
        var value = decodeURIComponent(s.replace(/\+/g, " "));
        if(decodeValues){
          value = self.decodeValue(value);
        }
        return value;
      },
      r  = /([^&=]+)=?([^&]*)/g,
      r2= /([^&=\[]+)\[(.*)\]/,
      r3= /([^&=\[]+)\]\[(.+)/,
      urlParams = {},
      key, value, e, e2, elem;
    if(typeof(decodeValues)==='object'){
      defaults = decodeValues;
      decodeValues = false;
    }
    for(key in (defaults || {})){
      urlParams[key] = defaults[key];
    }
    while (e = r.exec(q)) {
      if(e[1].indexOf("[") === -1){
        // simple match, no [] identifiers
        urlParams[d(e[1])] = d(e[2]);
      }else{
        value = e[2];
        key = e[1];
        elem = urlParams;
        if(key.indexOf('][')===-1){
          while(e2=r2.exec(key)){
            key = e2[1];
            elem = elem[key] = elem[key] || {};
            key = e2[2];
          }
        }else{
          key = key.replace(/\]$/i, '');
          while(e2 = r3.exec(key)){
            key = e2[1];
            elem = elem[key] = elem[key] || {};
            if(e2[2]){
              key = e2[2];
            }
          }
        }
        if(!key){
          key = elem.length = elem.length||0;
          elem.length++;
        }
        elem[key] = value;
      }
    }
    return urlParams;
  },

  pkg: function(from){
    var result = {};
    from.forEach(function(e){
      result[e.getAttribute('name')] = val(e);
    });
    return result;
  },

  classList: function(component, defaults){
    var result = defaults;
    var keys = (component.props.className||'').split(/[ \t]+/g);
    keys.forEach(function(key){
      result[key]=true;
    });
    return React.addons.classSet(result);
  },

  getAttrs: function(props, ex){
    var keys = Object.keys(props||{});
    var exclude = ['children'].concat(ex || []);
    var res = {};
    keys.forEach(function(key){
      if(exclude.indexOf(key)===-1){
        res[key] = props[key];
      }
    });
    return res;
  },

  getProps: function(component, prefix, defaults){
    var res = {}, keys = Object.keys(defaults);
    keys.forEach(function(key){
      res[key] = component.props[prefix+'-'+key] || defaults[key];
    });
    return res;
  },
};