const REMAP = (function(){

    "use strict";

    let Remap = {};

    Remap.options = {
        urlRequest : 'src/remap.json'
        ,storage : 'ReMap'
    };

    Remap.paths = [];

    Remap.doRequest = function(){

        return new Promise( function(resolve,reject){

            let request = new XMLHttpRequest();
            request.open('GET', Remap.options.urlRequest );

            request.onreadystatechange = function()
            {

                if (this.status != 200) {

                    reject( new Error('Erro durante o carregamento: ' + request.statusText) );

                }

                if(this.readyState == 4) {

                    let file = this.responseText;
                    resolve(file);

                }

            };

            request.send();

        });

    };


    Remap.mapRoute = function(){

        let file = this.getStorage(Remap.options.storage);

        file = JSON.parse(file);

        for (let map of file.map)
        {
            for (let archive of map.archives) 
            {
                this.paths.push(file.source+map.dir+archive);
            }
        }

    };


    Remap.storageFile = function(file){

        sessionStorage.setItem(Remap.options.storage, file);

    };


    Remap.getStorage = function(string){

        return sessionStorage.getItem(string);

    };


    Remap.loadFile = function(path){

        var script = document.createElement('script');
        script.src = path;
        document.body.appendChild(script);

    };


    Remap.loadFiles = function(){

        for (let path of Remap.paths)
        {
            Remap.loadFile(path);
        }

    };


    Remap.configHandleJson = function(){

        if ( Remap.getStorage( Remap.storage ) == null ){
            
            Remap.doRequest().then(

                function(response) {

                    Remap.storageFile(response);
                    Remap.mapRoute();
                    Remap.loadFiles();

                }

                , function(error) {

                    console.log(error);

                }

            );

            return;
        }

        Remap.mapRoute();
        Remap.loadFiles();

        return;

    };

  return {
    configHandleJson : Remap.configHandleJson
    ,options: Remap.options
  };

})();

window.onload = function(){
    REMAP.configHandleJson();
}