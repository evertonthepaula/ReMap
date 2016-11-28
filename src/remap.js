const REMAP = (function(){

  "use strict";

  let Remap = {};

  Remap.urlRequest = 'src/remap.json';
  Remap.storage = 'ReMap';
  Remap.paths = [];

  Remap.doRequest = function(){
    let request = new XMLHttpRequest();

    request.onreadystatechange = function(){
      if(this.readyState != 4) return false;
      let file = this.responseText;
      Remap.storageFile(file);
    };

    request.open('GET', this.urlRequest );
    request.send();
  };

  Remap.mapRoute = function(){
    let file = this.getStorage(this.storage);

    file = JSON.parse(file);

    for (let map of file.map) {
      for (let archive of map.archives) {
        this.paths.push(file.source+map.dir+archive);
      }
    }
  
  };

  Remap.storageFile = function(file){
    sessionStorage.setItem(this.storage, file);
  };

  Remap.getStorage = function(string){
    return sessionStorage.getItem(string);
  };

  Remap.loadFile = function(path) {
    var script = document.createElement('script');
    script.src = path;
    document.body.appendChild(script);
  };

  Remap.loadFiles = function(){
    for (let path of Remap.paths) {
      Remap.loadFile(path);
    }
  };

  Remap.loadJsonConfig = function(){
    if ( Remap.getStorage(Remap.storage) ) {
        Remap.mapRoute();
        return;
    }
    Remap.doRequest();
    Remap.mapRoute();
  };

  return {
    loadJsonConfig : Remap.loadJsonConfig
    ,loadFiles : Remap.loadFiles
  };

})();

window.onload = function(){
  REMAP.loadJsonConfig();
  REMAP.loadFiles();
}