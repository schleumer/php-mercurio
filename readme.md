# Mercurio, esboço para sistemas de ordem de serviços

Projeto simples usando Angular e Laravel, com uma tentativa de padronizagem do source para o frontend:

```
resources
`- assets
   `- js
      `- config         # configurações gerais, vazio por enquanto
      `- controllers    # base dos controllers
      `- directives     # base das directives
      `- factories      # factories gerais
      `- services       # services gerais
      `- helpers        # alguns helpers
      `- lang           # i18n
      `- resources      # factories de resources
      `- templates      # base dos templates
```

Nota-se que cada diretório possui um `index.js` que é a representação daquele diretório em modulos para poder ser utilizado dentro do `require`, assim você não precisaria por exemplo:

```javascript
var mod1 = require('./mods/f1');
var mod2 = require('./mods/f2');
var mod3 = require('./mods/f3');
```

você só precisaria fazer isso:

```javascript
var { mod1, mod2, mod3 } = require('./mods');
```

tornando o código mais legivel e menos bagunçado :)

---------------------

Os templates são embutidos no proprio JavaScript evitando requests descenessarias e delays na UI(perder 2ms na request por 3kb a mais no arquivo é melhor que 202ms numa request futura para um unico recurso)

---------------------

# TODO


- [ ] melhorar os controllers do angular abstraindo o que tiver de ser abstraído
- [ ] melhorar a leitura do `app.js`, está muito confuso e complexo
- [ ] melhorar o trait `NgTableSupport`, está confuso e ineficiente em certos casos
- [ ] melhorar os templates do angular abstraindo elementos repetidos(ctrl-c + ctrl-v)


---------------------


## [Respeite a Licença](license.md)