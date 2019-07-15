var config = require('./config.js')
var request = require('request')
var cache = {
    domains: []
}
//{
    //     "url": "file.wine",
    //     "last_checked": "0"
    // }
var initCache = function(){
  for(let domain of config.domains){
    cache.domains.push(
      {
      url:domain,
      last_checked: "0",
      working: null
      }
    )
  }
}
var setCache = function() {

    for (let _domain in cache.domains) {
        let domain = cache.domains[_domain];
        cache.domains[_domain].last_checked = Date.now();
      request('https://' + cache.domains[_domain].url).on('response', function(response) {
        if(response.statusCode === 200){
          cache.domains[_domain].working = true
        }else{
                    cache.domains[_domain].working = false

        }
    console.log(response.statusCode) // <--- Here 200
})
      
        }
        return cache

}
var checkCache = function(callback) {
    for (let _domain in cache.domains) {
        let domain = cache.domains[_domain];
        if (Date.now() - domain.last_checked > 300000) {
            return callback(setCache())
        }else{
            return callback(cache)
        }
    }
}
var getCache = function(callback){
  return callback(cache);
}
module.exports = {
    checkCache: checkCache,
    setCache: setCache,
    getCache: getCache,
    initCache: initCache
}