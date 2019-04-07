(function () {
  'use strict';
  document.querySelectorAll('link[href][rel="search"][type="application/opensearchdescription+xml"]').forEach(function (provider) {
    window.external.AddSearchProvider(provider.href);
  });
})();
