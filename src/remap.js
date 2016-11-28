const REMAP = (function(){

    "use strict";

    let Remap = {};
    Remap.urlRequest = 'src/remap.json';
    Remap.storage = 'ReMap';
    Remap.paths = [];


    Remap.doRequest = function(){

        return new Promise( function(resolve,reject){

            let request = new XMLHttpRequest();
            request.open('GET', Remap.urlRequest );

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

        let file = this.getStorage(this.storage);

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

        sessionStorage.setItem(this.storage, file);

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
  };

})();

window.onload = function(){

    REMAP.configHandleJson();

}