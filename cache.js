var cache = {
  domains: [
    {
      "url": "file.wine",
      "prev_response": [], //last 5 responses
      "avg_response": 50, //
      "last_checked": "0"
    }
  ]
}


module.exports = {
  checkCache: function(callback){
    
  },
  startCache: function(){
    for(let _domain in cache.domains){
      let domain = cache.domains[_domain];
      cache.domains[_domain].last_checked = new Date();
      console.log(domain)
    }
  },
  getCache: function(){
    
  }
}