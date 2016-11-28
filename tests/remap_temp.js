var doRequest = function(url){
  let request = new XMLHttpRequest();

  request.onreadystatechange = function(){
    if(this.readyState != 4) return false;
    var file = this.responseText;
    storageFile(file);
  }

  request.open('GET', url);
  request.send();
}

var mapRoute = function(){
  var file = getStorage('GMap');
  file = JSON.parse(file);
  var route = [];

  for (var map of file.map) {
    for (archive of map.archives) {
      route.push(file.source+map.dir+archive);
    }
  }
  console.log( route );
}


var storageFile = function(file){
  sessionStorage.setItem('GMap', file);
};

var getStorage = function(string){
  return sessionStorage.getItem(string);
}

var loadFile = function(path) {
  var script = document.createElement('script');
  script.src = path;
  document.body.appendChild(script);
}

doRequest('geoMap.json');
mapRoute();
