var cache = {
    domains: [{
        "url": "file.wine",
        "last_checked": "0"
    }]
}

var setCache = function() {
    for (let _domain in cache.domains) {
        let domain = cache.domains[_domain];
        cache.domains[_domain].last_checked = Date.now();
      return cache
    }
}
var checkCache = function(callback) {
    for (let _domain in cache.domains) {
        let domain = cache.domains[_domain];
        if (Date.now() - domain.last_checked > 300000) {
            return setCache()
        }else{
          return getCache((c) => {
            return callback(c)
          })
        }
    }
}
var getCache = function(callback){
  return callback(cache);
}
module.exports = {
    checkCache: checkCache,
    setCache: setCache,
    getCache: getCache
}