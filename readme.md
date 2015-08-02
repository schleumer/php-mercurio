# Horæ, esboço para sistemas de ordem de serviços

Projeto simples usando Angular e Laravel, com uma tentativa de padronizagem do source para o frontend:

```
resources
`- assets
   `- js
      `- config # configurações gerais, vazio por enquanto
      `- controllers # base dos controllers
      `- directives # base das directives
      `- factories # factories gerais
      `- helpers # alguns helpes
      `- lang # i18n
      `- resources # factories de resources
      `- templates # base dos templates
```

Nota-se que cada diretório possui um `index.js` que é a representação daquele diretório em modulos para poder ser utilizado dentro do `require`, assim você não precisaria por exemplo:

```
var mod1 = require('./mods/f1');
var mod2 = require('./mods/f2');
var mod3 = require('./mods/f3');
```

você só precisaria fazer isso:

```
var { mod1, mod2, mod3 } = require('./mods');
```

tornando o código mais legivel e menos bagunçado :)

---------------------

Os templates são embutidos no proprio JavaScript evitando requests descenessarias e delays na UI(perder 2ms na request por 3kb a mais no arquivo é melhor que 202ms numa request futura para um unico recurso)

---------------------


## [Respeite a Licença](license.md)