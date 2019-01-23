// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"C:/Users/Administrator/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"C:/Users/Administrator/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"C:/Users/Administrator/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/style/base.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"C:/Users/Administrator/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"static/images/girl.jpg":[function(require,module,exports) {
module.exports = "/girl.be77ecfa.jpg";
},{}],"src/vdom/createElemt.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(tagName) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$attrs = _ref.attrs,
      attrs = _ref$attrs === void 0 ? {} : _ref$attrs,
      _ref$children = _ref.children,
      children = _ref$children === void 0 ? [] : _ref$children;

  var vElm = Object.create(null);
  return Object.assign(vElm, {
    tagName: tagName,
    attrs: attrs,
    children: children
  });
};

exports.default = _default;
},{}],"src/vdom/render.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var renderElem = function renderElem(_ref) {
  var attrs = _ref.attrs,
      children = _ref.children,
      tagName = _ref.tagName;
  var $el = document.createElement(tagName); // 设置节点属性

  var _arr = Object.entries(attrs);

  for (var _i = 0; _i < _arr.length; _i++) {
    var _arr$_i = _slicedToArray(_arr[_i], 2),
        k = _arr$_i[0],
        v = _arr$_i[1];

    $el.setAttribute(k, v);
  } //设置儿子节点


  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;
      $el.appendChild(render(item));
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return $el;
};

var render = function render(vnode) {
  if (typeof vnode == "string") {
    //是一个文本节点
    return document.createTextNode(vnode);
  }

  ;
  return renderElem(vnode);
};

var _default = render;
exports.default = _default;
},{}],"src/vdom/mount.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default($node, $target) {
  $target.replaceWith($node);
  return $node;
};

exports.default = _default;
},{}],"src/vdom/diff.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _render = _interopRequireDefault(require("./render.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * 验证当前的数据中的属性值是否发生了改变
 * 
 * 一个一个对比当前属性是否缺失，以新对象验证旧对象
 */
var diffattrs = function diffattrs(oldAttrs, newAttrs) {
  var patchs = [];

  var _loop = function _loop(k) {
    if (!(k in newAttrs)) {
      //效验新对象中是否还有旧对象的属性，如果新对象中没有这个属性，则用户去掉了当前属性，则干掉当前属性
      patchs.push(function ($node) {
        $node.removeAttribute(k);
        return $node;
      });
    }
  };

  for (var k in oldAttrs) {
    _loop(k);
  }

  var _arr = Object.entries(newAttrs);

  var _loop2 = function _loop2() {
    var _arr$_i = _slicedToArray(_arr[_i], 2),
        k = _arr$_i[0],
        v = _arr$_i[1];

    if (!(k in oldAttrs)) {
      //效验旧对象中是否保函新对象的属性，如果没有，则设置新对象的属性
      patchs.push(function ($node) {
        $node.setAttribute(k, v);
        return $node;
      });
    }
  };

  for (var _i = 0; _i < _arr.length; _i++) {
    _loop2();
  }

  return function ($node) {
    //返回当前patch 集合
    for (var _i2 = 0; _i2 < patchs.length; _i2++) {
      var patch = patchs[_i2];
      //便利所有的操作方法 处理$node
      patch($node);
    }

    return $node;
  };
};
/**
 * 比对数据中的children值是否发生了改变
 * 
 * 包括节点名 属性值 儿子节点
 *  
 * 明确一点：
 *        1. 首先我们children数组中的数据其实就是一个节点的大集合，需要用到递归处理每一条数据
 *        2. 子节点的数据必须由父节点来接盘
 *        3. 对比旧节点是否相同，直接递归diff方法
 *        4. 相对比旧节点，新节点多出数据则明显为新增的，我们直接插入到指定节点下            
 */


var diffchildren = function diffchildren(oldChild, newChild) {
  var childPatches = [];

  if (oldChild.length != newChild.length && newChild.length == 0) {
    //移除了节点
    childPatches.push(function ($node) {
      $node.remove();
      return $node;
    });
  }

  for (var i = 0; i < Math.min(oldChild.length, newChild.length); i++) {
    //我们直接拿旧数据和新数据对比。在与旧数据节点长度相同的情况下，不管是新增的还是修改了属性的。全部使用diff对比，差异直接返回patch
    childPatches.push(diff(oldChild[i], newChild[i]));
  }

  var newChildPatchs = []; //新对象插入节点

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    var _loop3 = function _loop3() {
      var newChild = _step.value;
      //多余的节点直接插入父节点中
      newChildPatchs.push(function ($parent) {
        $parent.appendChild((0, _render.default)(newChild));
        return $parent;
      });
    };

    for (var _iterator = newChild.slice(oldChild.length)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      _loop3();
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return function ($parent) {
    $parent.childNodes.forEach(function ($child, index) {
      //直接找到旧节点中的儿子节点，并处理差异。
      childPatches[index]($child);
    });

    for (var _i3 = 0; _i3 < newChildPatchs.length; _i3++) {
      var patch = newChildPatchs[_i3];
      patch($parent);
    }

    return $parent;
  };
};
/**
 * 算法对比核心方法
 * 
 * 拆分对比属性及节点 递归
 * 
 * 返回处理当前数据的方法 patch
 */


var diff = function diff(oldVTree, newVTree) {
  if (oldVTree == undefined) {
    //全部数据都不存在的情况，dom将会消失
    return function ($node) {
      $node.remove(); //直接删除当前dom模型 返回undefined

      return undefined;
    };
  }

  if (oldVTree.tagName !== newVTree.tagName) {
    //当前vtree 节点发生了变化
    return function ($node) {
      var $nodeEl = (0, _render.default)(newVTree); //直接采用当前最新的vtree 创建一个真实dom模型

      $node.replaceWith($nodeEl); //替换当前的dom模型

      return $nodeEl;
    };
  }

  if (typeof oldVTree == "string" || typeof newVTree == "string") {
    //如果当前节点只是一个文本节点,文本节点我们就没必要对比属性了，直接返回当前变化的tree
    if (oldVTree == newVTree) {
      return function ($node) {
        return $node;
      }; //直接拿用最新数据创建成的dom模型
    } else {
      //不一样的情况下 我们直接使用最新的数据创建一个文本节点
      return function ($node) {
        var $nodeEl = (0, _render.default)(newVTree); //直接采用当前最新的vtree 创建一个真实dom模型

        $node.replaceWith($nodeEl); //替换当前的dom模型

        return $nodeEl;
      };
    }
  } //三种情况排除的情况下 我们对比属性


  var patchAttrs = diffattrs(oldVTree.attrs, newVTree.attrs);
  var patchChildren = diffchildren(oldVTree.children, newVTree.children);
  return function ($node) {
    patchAttrs($node);
    patchChildren($node);
    return $node;
  };
};

var _default = diff;
exports.default = _default;
},{"./render.js":"src/vdom/render.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

require("./style/base.scss");

var _girl = _interopRequireDefault(require("../static/images/girl.jpg"));

var _createElemt = _interopRequireDefault(require("./vdom/createElemt.js"));

var _render = _interopRequireDefault(require("./vdom/render.js"));

var _mount = _interopRequireDefault(require("./vdom/mount.js"));

var _diff = _interopRequireDefault(require("./vdom/diff.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var count = 0;

var createApp = function createApp(count) {
  return (0, _createElemt.default)('div', {
    attrs: {
      id: "hhyang",
      name: "hhyang"
    },
    children: [(0, _createElemt.default)('div', {
      children: [(0, _createElemt.default)('h1', {
        children: ["\u6211\u662F\u4F60\u7238\u7238".concat(count)]
      })]
    }), (0, _createElemt.default)('input', {
      attrs: {
        type: "text"
      }
    }), String(count), (0, _createElemt.default)('img', {
      attrs: {
        src: _girl.default
      }
    })]
  });
};

var oldApp = createApp(count);
var $rootEl = (0, _mount.default)((0, _render.default)(oldApp), document.getElementById('root')); //挂载真实dom后并返回当前的dom;

setInterval(function () {
  count++;
  var newApp = createApp(count);
  var patch = (0, _diff.default)(oldApp, newApp); //对比”数据“所有的不同之处，并返回一个patch方法处理dom

  $rootEl = patch($rootEl);
  oldApp = newApp;
}, 2000);
},{"./style/base.scss":"src/style/base.scss","../static/images/girl.jpg":"static/images/girl.jpg","./vdom/createElemt.js":"src/vdom/createElemt.js","./vdom/render.js":"src/vdom/render.js","./vdom/mount.js":"src/vdom/mount.js","./vdom/diff.js":"src/vdom/diff.js"}],"C:/Users/Administrator/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59750" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["C:/Users/Administrator/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.map