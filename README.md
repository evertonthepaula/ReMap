# ReMap

Simples gerenciamento e loading de scripts \".js\" automatico adiado e síncrono.

> Observação importante: Este script é apenas uma prova de conceito, sem intuito algum de resolver problemas reais de desenvolvimento.


### ReMap.json 

```
{
  "source":"js/"
  ,"map": [
    {
      "dir": "Diretorio/"
      ,"archives":[
        "arquivo01.js"
        ,"arquivos02.js"
      ]
    },
    {
      "dir": ""
      ,"archives":[
        "arquivo01.js"
        ,"arquivos02.js"
      ]
    }
  ]

}
```


#### Descrição itens ReMap.json

- source: Diretorio raiz do projeto, ou uma referencia para diretorio raiz onde os arquivos estão, é parametro obrigatório para iniciar o carregamento;
- map: Array contém o mapeamento dos arquivos;
- dir: Caminho para o diretorio dos arquivos, parametro obrigatório, caso seja deixado em branco " " será considerado o diretório "source" como local dos arquivos;
	- " " para usar o diretório raiz;
	- Nome/nome/nome/nome ..... para usar subdiretórios
- archives: Arquivos especificos que serão carregados, parametro obrigatório.



####  Loading de scripts automatico adiado e síncrono.

Gerenciamento e loading: A partir de um arquivo ".json" pode-se gerenciar o carregamento de arquivos .js;

Automatico: Não há a necessidade, de especificar pagina a pagina quais arquivos serão carregados, configurado apenas o arquivo ".json"

Adiado: Todo o processo acontecerá após o carregamento da pagina;

síncrono: O carregamento dos arquivos será todo gerenciado pelo browser, não provendo nenhum tipo de solução assincrona;