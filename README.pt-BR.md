minify-config.js
================
minify-config é uma ferramenta baseada em node.js para facilitar e permitir a configuração da minificação de seus scripts/estilos.


###Instalação

Se você ainda não possui o node.js instalado, faça o download do mesmo em : [http://nodejs.org/](http://nodejs.org/)

Se tudo ocorreu conforme esperado, o npm (Node Packaged Modules) foi configurado juntamente com o node.js. Para verificar digite o seguinte comando na linha de comando:

> npm --version

Com o npm instalado, resta apenas realizar a instalação da biblioteca:

> npm install -g minify-config

A opção -g indica que a biblioteca minify-config estará disponível para ser utilizada através da linha de comando, caso o objetivo seja utilizar a biblioteca como API esta opção não é necessária.


###Configuração

Para configurar a biblioteca para minificar sua aplicação, faça o [download do arquivo de configuração default](#) ou copie do seu diretório npm.

> __Windows__: C:\Users\<username>\AppData\Roaming\npm\node_modules\minify-config\config

####config.json  

```json
{
    "javascript": {
        "files": {
            "app": [
                "js/jquery.js",
                "js/bootstrap.js",              
                "js/plugins.js",
                "js/main.js"
            ]
        },
        "folders": "js/*(vendor|plugins)",
        "output": {
            "files": "js/min",
            "folders": "${folder}/min"
        }
    },
    "css": {
        "files": {
            "app": [
                "css/bootstrap.css",
                "css/bootstrap-responsive.css",
                "css/main.less"
            ]
        },
        "folders": "css/*(less)",
        "output": {
            "files": "css/",
            "folders": "${folder}/min"
        }
    }
}
```


####Javascript / CSS
A biblioteca permite que você compacte tanto seus scripts no formato js, quanto seus estilos em formato [Less](http://lesscss.org) ou css. 
Você pode minificar vários (ou todos) scripts em um único arquivo, reduzindo assim o número de requests necessários para a aplicação. No arquivo JSON de configuração, cada chave em "files" representa o nome que o arquivo minificado irá receber.

Por exemplo, no arquivo de configuração padrão, <code>js/jquery.js js/bootstrap.js js/plugins.js js/main.js</code> será minificado para <code>app.min.js</code>, sendo armazenado no diretório definido na tag <code>javascript.output.files</code> (js/min).

Além de arquivos unitários, você pode configurar para minificar um diretório inteiro na tag <code>folders</code>. <code>folders</code> pode receber um Array informando os diretórios a serem compactados, ou uma expressão regular¹.

[¹] <code>javascript.folders</code> e <code>css.folders</code> permitem a utilização de expressões [Glob](https://npmjs.org/package/glob) para detectar os diretórios.


#### Html

Minify-config utiliza a lib htmlcompressor da Google para compactar seu html. Sendo necessário você possuir o Java instalado para minificar seus templates.

O parser html segue o padrão de sintaxe do parser javascript/css. Permitindo a minificação de diretórios inteiros ou arquivos específicos.


###Aplicando no seu projeto

Para utilizar a biblioteca em seu projeto você deve colocar o arquivo de configuração na base de sua aplicação (ou no diretório que julgar adequado), informando o path correto para a localização dos arquivos.

####Linha de Comando 
Agora basta rodar o processo (linha de comando) certificando-se de estar no diretório onde o config.json está armazenado:

> minifyconfig -f config.json

Se todos os caminhos foram definidos corretamente, será exibido na tela quais os processos foram executados e quais arquivos foram gerados.

**Options**:
* [b]-h, --help[/b]     Output usage information
* [b]-V, --version[/b]  Output the version number
* [b]-f, --file[/b]     Set the configuration file.
* [b]-s, --stats[/b]    Show parsed commands in console
* [b]-a, --auto[/b]     Automatically check for changes and minify configurated files
* [b]-u, --unique[/b]   Parse configuration and minify a single specified file



> __Windows__: Você pode executar o arquivo automin.bat (copie do diretório config da biblioteca minify-config informado anteriormente). Este arquivo irá executar de maneira automática o comando acima.




###Sublime Text 2

Embora não seja necessário, é indicado que você utilize o editor Sublime Text 2 facilitar seu ambiente de desenvolvimento.

> C:\Users\<username>\AppData\Roaming\npm\node_modules\minify-config\config

No diretório config da biblioteca está disponível um snippet para facilitar o processo de criação do arquivo de configuração no sublime text. Basta digitar "minify" e pressionar tab em um arquivo JSON para gerar o escopo.

Para agilizar o processo de minificação, adicione a build <code>Minify.sublime-build</code> em seu Sublime. Basta definir a build system default como Minify (Tools > Build System) e após isso realizar o build.
Pronto, o comando será processado via linha de comando e seus arquivos serão criados.

###Informações

Acesse [lmedeiros.com](http://lmedeiros.com) para mais informações.

Copyright (c) 2013 Lucas Medeiros
