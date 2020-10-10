/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  const singleRequire = name => {
    if (name !== 'require') {
      name = name + '.js';
    }
    let promise = Promise.resolve();
    if (!registry[name]) {
      
        promise = new Promise(async resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = name;
            document.head.appendChild(script);
            script.onload = resolve;
          } else {
            importScripts(name);
            resolve();
          }
        });
      
    }
    return promise.then(() => {
      if (!registry[name]) {
        throw new Error(`Module ${name} didn’t register its module`);
      }
      return registry[name];
    });
  };

  const require = (names, resolve) => {
    Promise.all(names.map(singleRequire))
      .then(modules => resolve(modules.length === 1 ? modules[0] : modules));
  };
  
  const registry = {
    require: Promise.resolve(require)
  };

  self.define = (moduleName, depsNames, factory) => {
    if (registry[moduleName]) {
      // Module is already loading or loaded.
      return;
    }
    registry[moduleName] = Promise.resolve().then(() => {
      let exports = {};
      const module = {
        uri: location.origin + moduleName.slice(1)
      };
      return Promise.all(
        depsNames.map(depName => {
          switch(depName) {
            case "exports":
              return exports;
            case "module":
              return module;
            default:
              return singleRequire(depName);
          }
        })
      ).then(deps => {
        const facValue = factory(...deps);
        if(!exports.default) {
          exports.default = facValue;
        }
        return exports;
      });
    });
  };
}
define("./service-worker.js",['./workbox-d797bd95'], function (workbox) { 'use strict';

  /**
  * Welcome to your Workbox-powered service worker!
  *
  * You'll need to register this file in your web app.
  * See https://goo.gl/nhQhGp
  *
  * The rest of the code is auto-generated. Please don't update this file
  * directly; instead, make changes to your Workbox build configuration
  * and re-run your build process.
  * See https://goo.gl/2aRDsh
  */

  self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
  });
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */

  workbox.precacheAndRoute([{
    "url": "assets/icons/icon_192x192.317079d2f38bc5d2906f5408114bbcd3.png",
    "revision": "317079d2f38bc5d2906f5408114bbcd3"
  }, {
    "url": "assets/icons/icon_512x512.273935f8ebdc8218f2ce26daa11d6844.png",
    "revision": "273935f8ebdc8218f2ce26daa11d6844"
  }, {
    "url": "assets/icons/icon_72x72.8bd78b686eaa2d8ba7fd0c1bb2aff553.png",
    "revision": "8bd78b686eaa2d8ba7fd0c1bb2aff553"
  }, {
    "url": "commons~index~indexedDb.js",
    "revision": "5059e274e87ac89291fa4f1691891fa9"
  }, {
    "url": "index.html",
    "revision": "3794726d47fcab72e8bb3039537b0d23"
  }, {
    "url": "index.js",
    "revision": "a701b8054f1449abd9973228b485f113"
  }, {
    "url": "indexedDb.js",
    "revision": "de4ee50d5cac82b85415321eca1d31ed"
  }, {
    "url": "manifest.5df9d36e1a654a5d1e5f5f6dbd82585e.json",
    "revision": "5df9d36e1a654a5d1e5f5f6dbd82585e"
  }, {
    "url": "vendor.js",
    "revision": "2f1dcca400e63230594c2497f80d12c6"
  }], {});

});
//# sourceMappingURL=service-worker.js.map
