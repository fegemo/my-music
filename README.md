# Estudo Dirigido

Esta é uma atividade cujo objetivo é guiar o desenvolvedor a aprender, praticando, as tecnologias usadas no projeto Play(code).

## Configuração do Ambiente

O projeto é gerenciado usando o Git. Você deve instalá-lo em seu sistema operacional:

- A partir do [site oficial][git] (no Windows)
- A partir do apt (no Ubuntu)

    ```
    sudo apt-get install git
    ```

- A partir do brew (no OSX)

    ```
    brew install git
    ```

Além do utilitário em linha de comando, uma excelente interface gráfica para o Git é o [GitKraken][gitkraken], mas isto é opcional.

Usamos o [Node.js][nodejs] no projeto, que é uma plataforma para executar código JavaScript fora do ambiente de um navegador.

Ele é necessário porque usamos o [Ionic][ionic], um gerador de aplicativos híbridos, e ele é escrito em JavaScript, para a plataforma Node.js. **Atenção: o Play(code) usa a versão 1.x do Ionic**, apesar de já existir a versão 2.x.

O Ionic depende também do Cordova, do Gulp e do Bower. Para instalar tudo o que é necessário, você então deve:

1. **Instalar o Node.js**. Há 2 formas, sendo a 2ª a mais indicada:
    - ~~Baixar [no site oficial](http://nodejs.org)~~... ou
    - Instalar via um instalador de Node.js para poder atualizar para novas versões facilmente:
        - [`nodist`](https://github.com/marcelklehr/nodist) no Windows _(siga as instruções do nodist e instale a versão mais recente do Node.js)_
        - [`nvm`](https://github.com/creationix/nvm) em sistemas baseados no Unix (Linux, OSX) _(siga as instruções do nvm e instale a versão mais recente do Node.js)_
    - Testar a instalação:
        - No terminal, execute os comandos para verificar se o Node.js foi instalado:

            ```
            node -v
            ```

            - Este comando exibe a versão instalada do Node.js, se tudo estiver certo
1. Instalar (a partir de qualquer pasta, não importa qual) o **cordova**, **ionic** e **gulp**
    ```
    npm install -g cordova ionic gulp
    ```
    - `npm` é o instalador de pacotes do Node.js
    - `npm install -g` instala os pacotes de forma global
        - Portanto, o comando pode ser executado a partir de qualquer pasta
    - `cordova` e `ionic` são as ferramentas que usamos para criar um aplicativo móvel híbrido
    - `gulp` é um _task runner_ escrito em Node.js. Usamos ele para **automatizar a configuração de qual ambiente (dev, integração, produção) estamos executando**, dentre outras coisas

Por fim, é necessário ter um ambiente para codificação que pode ser um editor de texto (**[Atom][atom]** - minha sugestão, [Sublime][sublime], [VSCode][vscode], [Brackets][brackets], etc.) ou um IDE ([WebStorm][webstorm], [NetBeans][netbeans], etc.).

## Enunciado Geral

Você deve criar um aplicativo Ionic que permite o usuário gerenciar _playlists_
de música. O usuário pode cadastrar novas _playlists_, e também pode associar as
músicas existentes a elas.

## Atividade

Visite a página [_Getting Started_ do Ionic (versão 1.x)][getting-started] e leia as instruções para se familiarizar com o que vamos fazer.

### Preparação (35 min)

Siga os passos abaixo para preparar seu ambiente.

1. **Crie um aplicativo** (2 min):
    - Na sua pasta onde guarda seus projetos, execute o  comando do Ionic para criar um aplicativo usando como ponto de partida o exemplo _sidemenu_ (3ª imagem):

    ```
    ionic start my-music sidemenu --type=ionic1
    ```

    - O comando `ionic start` cria um novo aplicativo
        - `my-music` é o nome do aplicativo e da pasta que o ionic vai criar para colocar o código
        - `sidemenu` indica que se deseja que o novo projeto já possua o código seminal de um aplicativo com um menu lateral, em vez de um aplicativo "em branco"
    - Esse comando pode demorar um pouco (até ~5 min) para terminar sua execução

1. **Execute** o aplicativo criado (3 min):
    - Entre na pasta que o ionic criou (_e.g._, `minhas-musicas`) e execute:

    ```
    cd my-music
    ionic serve
    ```

    - Isso fará 2 coisas:
        - Abrirá o navegador mostrando a página inicial do aplicativo (_e.g._, em http://localhost:8100/)
        - Deixará o ionic observando o código fonte e, toda vez que um arquivo for alterado, o navegador será atualizado automagicamente

1. **Abra e vasculhe o projeto** no seu editor de código (30 min), _e.g._:

    ```
    atom .
    ```

    - Navegue pelas pastas do projeto, vasculhando seu conteúdo, usando o seguinte critério quanto a quanta atenção dar a cada uma:
        - `my-music/hooks`: dar uma olhadinha apenas
            - pasta usada pelo Cordova
        - `my-music/node_modules`: dar uma olhada na quantidade de subpastas
            - pasta usada pelo Node.js
            - ela contém todos os "pacotes" dos quais este aplicativo Ionic depende como, por exemplo, o Gulp
            - todo projeto Node.js contém uma pasta `node_modules` para armazenar suas dependências, e também um arquivo (na raiz do projeto) chamado `package.json`, descrevendo-o
        - `my-music/plugins`: dar uma olhadinha apenas
            - pasta usada pelo Cordova
        - `my-music/scss`: abrir, ler o arquivo incluído e procurar entender sobre Sass
            - pasta que contém arquivos `.scss` ([Sass][sass])
            - leia sobre o [Sass][sass] e entenda do que se trata (15 min)
            - arquivos `.scss` são transformados em arquivos `.css` para que o navegador possa usar
        - `my-music/www`: passar um tempo legal familiarizando-se com esta
            - pasta que contém imagens, arquivos CSS, JavaScript, HTML (`index.html` e os _templates_ - trechinhos de HTML) e os arquivos JavaScript das bibliotecas que estão sendo usadas (_e.g._, Ionic, Angular e seus _plugins_)
        - `my-music/`: ler alguns arquivos em particular
            - `gulpfile.js`: configuração das tarefas que podem ser executadas pelo Gulp
            - `package.json`: configuração do projeto Node.js (nome, versão, dependências etc.)


### Exercícios no Código

Com o projeto criado e o código aberto, é hora de fazer algumas modificações e aprender as tecnologias enquanto isso.

1. **Inclua as bibliotecas JavaScript individualmente** (10 min):
    - **Abra o arquivo `www/index.html`** e procure pela inclusão da biblioteca Ionic (_i.e._, o arquivo `ionic.bundle.js`)
        - `index.html` é o único arquivo HTML completo no projeto (já que é uma _single-page application_)
        - O arquivo `ionic.bundle.js` é uma concatenação de vários (6) arquivos menores
            - Por exemplo, um deles é o `angular.js` e alguns outros são _plugins_ do Angular
    - Em vez de incluir o _bundle_, modifique o `index.html` para incluir cada arquivo individualmente, **na mesma ordem** com a que aparecem em `ionic.bundle.js`
        - Vai ser necessário vasculhar a pasta `www/lib/ionic/js` para encontrar os arquivos individuais das bibliotecas
    - Repare que isso não pode ter efeito na aplicação em execução: nada deve ter mudado
        - Não se esqueça de remover a inclusão do `ionic.bundle.js`!
    - Essa alteração foi feita para possibilitar a atualização da versão de cada um individualmente no futuro
1. **Faça uma leitura geral do `index.html`** e leia um pouco sobre Angular.js (60 min):
    - Leia código e **traduza todos os comentários** do arquivo `index.html`, exceto pelo comentário sobre _service worker_, que pode ser excluído
    - Repare que ao final do arquivo, há o `<body>` com um atributo `ng-app="starter"`
        - Para entender o que é `ng-app="..."`, entre na **página inicial do [Angular.js][angular] e leia-a inteiramente**, saltando apenas o exemplo _"Wire up a Backend"_ (45 min)
    - **Modifique o nome da aplicação** Angular.js (_i.e._, do módulo principal) de `starter` para `music`
        - Isso precisa ser alterado em um arquivo JavaScript também
        - Altere também o nome do módulo que guarda os _controllers_ de `starter.controllers` para `music.controllers`
            - Dica: procure por todas referências à palavra _"starter"_ na pasta `www/js`
1. **Entenda a navegação entre _views_** (25 min):
    - Dentro da aplicação Angular.js (_i.e._, `<body ng-app="music">...</body>` agora) em `www/index.html` há apenas um elemento, do Ionic, chamado `ion-nav-view`
        - **Pesquise**, na **documentação do Ionic v1**, o que é um `ion-nav-view` (15 min)
    - Navegando no aplicativo, repare que sempre que se clica em um menu diferente:
        1. O conteúdo do aplicativo muda refletindo a nova _view_
            - _view_: um pedaço visual da aplicação (tipo uma "subpágina")
        1. A URL muda para algo como `/app/nome_da_nova_view`
    - O arquivo `www/js/app.js` descreve todos os **estados** possíveis da aplicação
        - **estado**: basicamente, uma _view_ na parte de conteúdo da aplicação e uma URL
        - Leia os arquivos `www/js/app.js` e `www/templates/menu.html` e leia-os considerando esta [explicação sobre o `ion-nav-view`][explicacao-ion-nav-view] dada pelo desenvolvedor Isaque Dias
        - Agora abra e leia também  os _templates_ das outras _views_ (_i.e._, `www/templates/`: `browse.html`, `login.html`, `playlist.html`, `playlists.html`, `search.html`)
    - Faça as seguintes alterações item por item, testando se tudo está certo:
        1. Trocar o nome da `ion-nav-view` filha de `menuContent` para `mainContent`
        1. Trocar a URL do estado principal `app` de `/app` para `/main`
            - Repare no navegador que agora a URL de todas as _views_ começam com `/main/` em vez de `/app/`
            - Deu erro? Página não carregou? Você precisa alterar também a URL inicial do aplicativo, que para onde é navegado se uma URL desconhecida é acionada
            - Há também links que precisam ser alterados nos templates _menu.html_ e _playlists.html_
        1. Troque o título do menu lateral de _"Left"_ para o título do seu aplicativo de gerenciamento de _playlists_
        1. Exclua o item de menu _"Search"_ e tudo relacionado a ele (_e.g._, no _template_ do menu, o _template_ de busca e seu estado no `www/js/app.js`)
        1. Troque o nome da _view_ _"Browse"_ para _"Browse Music"_ (em todos os locais necessários)
        1. Coloque um ícone à esquerda de cada item do menu (veja [ícones em listas][item-icons] (_List Icons_) na documentação do Ionic)
        1. Altere as _playlists_ para apenas 3 estilos que você goste (em vez de 6 estilos)
            - Para isso, veja primeiro o arquivo `www/templates/playlists.html` e, então, `www/js/controllers.js` (no controller chamado `PlaylistsCtrl`)
            - Em uma atividade futura, vamos carregar as _playlists_ a partir de uma API rest por meio de chamadas AJAX
1. **Colocando uma logomarca** (30 min :clock1230:)
    - No título que aparece no topo do menu lateral (que era _"Left"_, mas você mudou), coloque também uma imagem com uma "logomarca" para o aplicativo (faça a sua ou encontre uma na web)
        - Hospede a imagem dentro da pasta `www/img`
    - Repare que a logo pode ter ficado espichada ou achatada. Você vai precisar consertar/ajustar usando CSS
    - Em vez de usar CSS, **vamos usar o Sass**. Para poder fazê-lo, você deve:
        1. Em `www/index.html`, incluir o arquivo `www/css/ionic.app.css` (que ainda não existe) em vez do `www/css/style.css` (que já existe)
            - Além de remover a inclusão do `www/css/style.css`, remova também a inclusão do `lib/ionic/css/ionic.css` (veja a última linha do arquivo `scss/ionic.app.scss` para entender por quê)
        1. Em um terminal, executar o comando `gulp sass`, que transforma o arquivo `scss/ionic.app.scss` no `www/css/ionic.app.css`
            - Repare que agora o arquivo `www/css/ionic.app.css` apareceu
        1. Escrever estilos na linguagem Sass, nesse arquivo `.scss`, para fazer os ajustes necessários à logomarca + título
    - Além do `gulp sass`, futuramente você pode usar o comando `gulp watch`, que fica observando o arquivo `ionic.app.scss` e, sempre que ele é alterado, executa o `gulp sass` automaticamente
1. Usando uma **fonte de texto** diferente (30 min :clock1230:):
    - A fonte padrão para o título não está bonita. Visite o [Google Fonts][google-fonts] e escolha uma fonte legal para usar nos títulos (_i.e._, elementos `h1`, `h2` etc.)
    - Depois, as inclua no projeto (descubra como)
1. **Mostrando músicas** em _"Browse Music"_ (4 horas :clock4:):
    - Vamos agora criar a página de músicas. Em uma descrição de alto nível, será necessário um _controller_ fornecendo os dados e uma lista no _template_ mostrando os dados
    - Para fazer isso, faça os **níveis 1 e 2** do curso [_"Shaping up with Angular.js"_ do Codeschool][angular-codeschool] (2,5 horas :clock230:)
    - Passos para mostrar algumas músicas (1,5 hora :clock1:)
        1. Crie um _controller_ (_e.g._, `BrowseMusicCtrl`) que expõe um array de músicas via seu `$scope`, da mesma forma que o atual `PlaylistsCtrl` o faz:
            - Cada música deve ser um objeto JavaScript com as propriedades: `title` (nome), `album` (nome do álbum), `artist` (nome da banda), `albumArtURL` (URL de uma imagem com a capa)
            - Um **array de objetos** pode ser criado conforme a sintaxe vista nesta [pergunta do usuário codecowboy no StackOverflow][array-of-objects]
            - Como exemplo, você pode colocar estas 3 músicas:
                1. Música: The Argument 1
                    - Álbum: The Theory of Everything
                    - Banda: Ayreon
                    - Imagem do álbum: https://upload.wikimedia.org/wikipedia/en/thumb/2/26/Ayreon-TheoryOfEverything-cd.jpg/220px-Ayreon-TheoryOfEverything-cd.jpg
                1. Música: The Scarecrow
                    - Álbum: The Scarecrow
                    - Artista: Avantasia
                    - Imagem do álbum: https://upload.wikimedia.org/wikipedia/en/thumb/7/7c/Avantasia_-_The_Scarecrow_-_2008._Front.jpg/220px-Avantasia_-_The_Scarecrow_-_2008._Front.jpg
                1. Música: March of Time
                    - Álbum: Keeper of the Seven Keys: Part II
                    - Artista: Helloween
                    - Imagem do álbum: https://upload.wikimedia.org/wikipedia/en/thumb/3/3c/KotSK2.jpg/220px-KotSK2.jpg
        1. Atrele o _controller_ ao _template_ `browse-music.html` (ou `browse.html`, se você não o tiver renomeado) por meio da configuração do seu _"state"_ em `www/js/app.js`
        1. No devido _template_, crie uma visualização em lista (_i.e._, `<ion-list>...</ion-list>`) para cada música. Tente colocar todas as informações da música em cada item da lista, incluindo a imagem do álbum
            - Lembre-se de que, neste caso, a _tag_ de imagem deve ter seu caminho definido pelo atributo `ng-src=`, e não pelo tradicional `src=` (veja [por quê][angular-ng-src])
1. **Filtrando as músicas** em _"Browse Music"_ (60 min :clock12:)
    - Faça o nível 3 do curso de Angular.js do Codeschool, porque ele fala sobre formulários e _models_ (30 min :clock1230:)
    - Crie um campo de filtragem ("busca") para poder ver apenas as músicas que atendam ao critério de busca. A ideia é ter um campo só em que o usuário digita um termo (palavra ou frase) e a lista de produtos passa a mostrar apenas as músicas que possuem um título, álbum ou nome de artista que contenha(m) o termo digitado
    - Passos:
        1. Estude como o Angular.js sugere que isso seja feito, por meio do [exemplo _"Wire up a Backend"_][angular-wire-up-backend] (atente para o _template_ `list.html` apenas)
        1. Crie um campo (_i.e._, `input`) de busca, com [estilos legais][ionic-forms-css], no _template_ em questão
        1. Crie [um filtro][angular-filter] no elemento da lista de músicas que usa o valor desse campo de busca recém criado.
            - O [exemplo _"Wire up a Backend"_][angular-wire-up-backend] faz exatamente isso
1. **Carregando músicas de uma API rest** (2 horas :clock2:)
    - Agora, vamos consumir uma API rest, implementada para este tutorial, para carregar as músicas.
        - Pesquise o que é uma API rest... o site www.restapitutorial.com contém uma boa [introdução em vídeo][what-is-rest] (20 min)
    - A API está acessível no endereço https://mah-music-api.herokuapp.com/ e ela possui uma [documentação sobre que rotas/métodos a que ela responde][api-docs]
        - Na documentação, veja a rota `GET /songs`, que retorna um array com todas as músicas cadastradas. Envie uma requisição `GET` para essa rota e veja a resposta
    - Faça os níveis 4 e 5 do curso de Angular.js do Codeschool. No nível 5 utilizamos o serviço `$http`, que podemos usar para fazer requisições AJAX a uma API rest (90 min :clock130:)
    - Passos para esta atividade:
        1. Substitua o array de músicas _hardcoded_ no `$scope` do _controller_ por um uso do serviço `$http` para fazer uma chamada `GET` para https://mah-music-api.herokuapp.com/songs
            - A resposta será o array de músicas, que deve ser associado à mesma propriedade do `$scope` que continha o array _hardcoded_
            - Não se esqueça de pedir ao Angular.js para injetar a dependência do serviço `$http` para que você possa usá-lo dentro do _controller_ de _"Browse Music"_
1. **Carregando _playlists_ de uma API rest** (30 min :clock1230:):
    - Agora, faça a mesma coisa que fez para as músicas, mas para as _playlists_ e, ao mostrá-las, coloque o nome e o número de músicas já adicionadas nela, seguindo os passos:
        1. Usar o `$http` para fazer a requisição e preencher o array `$scope.playlists`
            - A rota da API a ser usada é `GET /playlists`. Veja um exemplo de resposta lá na [documentação da API][api-docs]
        1. Alterar o _template_ das _playlists_ para mostrar, além do nome, o número de músicas que ela contém
        1. Alterar o endereço apontado pelo _hyperlink_ para usar o atributo `_id` em vez de `id`
1. Mostrando os **detalhes de uma _playlist_** (30 min :clock1230:):
    - Na _view_ de detalhes de uma _playlist_ (`playlist.html` - no singular), vamos mostrar seu título, seu usuário criador e todas as músicas
    - Em `www/js/controllers.js` já existe um `PlaylistCtrl`, que podemos usar.
    - Primeira tentativa (**não precisa implementar**, apenas leia e vá para a "segunda tentativa"):
        1. Fazer uma chamada AJAX para a rota `GET /playlists/ID_DA_PLAYLIST` e colocar as informações da _playlist_ no `$scope` para que o _template_ possa acessá-las
            - Vai funcionar, mas vamos refletir... Para mostrar a lista das _playlists_ (exercício anterior), já fizemos uma chamada AJAX que nos retornou os detalhes de todas as _playlists_
            - Portanto, fazer esta nova chamada AJAX é desnecessário!
            - É possível reutilizar os dados obtidos em um _controller_ em outro _controller_ e, para isso, **precisamos implementar um _service_ do Angular.js**
    - Segunda tentativa, baseada no [padrão de projeto mestre-detalhe][master-detail] (esta está **correta**). A ideia é que em vez de fazer a requisição AJAX no `PlaylistsController` (plural) e no `PlaylistController` (singular), vamos fazê-la apenas 1x no serviço. **"Não fazer requisições AJAX** é inclusive uma boa prática no Angular.js, então vamos corrigir isso:
        1. Criar um novo arquivo: `www/js/services.js` que, analogamente ao `www/js/controllers.js`, inicia um módulo (_e.g._, com nome `music.services`) e define um _service_ (por ora, com uma função vazia) chamada `PlaylistService`
        1. Vá em `www/index.html` e inclua esse novo arquivo, logo antes da inclusão do `www/js/controllers.js`
        1. Em `www/js/app.js` é necessário dizer ao Angular.js que o módulo principal depende do módulo que acabamos de definir (`music.services`) - assim como ele já sabe que precisa do `music.controllers`
        1. O serviço sendo criado (_i.e._, `PlaylistFactory`) deve ter duas funções:
            1. Uma (_e.g._, `GetPlaylists`) que retorna uma promessa que, quando cumprida, chamará uma função com o array de _playlists_ via parâmetro
            1. Outra (_e.g._, `GetPlaylist`) que, dado o `_id` de uma _playlist_, retorna uma promessa que, quando cumprida, chamará uma função com os dados apenas daquela _playlist_ via parâmetro
                - Como é a primeira vez que você deve estar fazendo isso, segue o código do arquivo `www/js/services.js`:

                    ```js
                    angular.module('music.services', [])

                    .service('PlaylistService', function($q, $http) {
                      // este objeto armazena o array de playlists, quando tivermos
                      // buscado ele via AJAX
                      let playlistsCache = null;

                      return {
                        // esta função verifica se já temos as playlists em cache e,
                        // em caso afirmativo, já "retorna" (cumpre/resolve a
                        // promessa). Do contrário, faz a requisição AJAX e, em caso
                        // de sucesso, resolve a promessa
                        getPlaylists: function() {
                          let deferred = $q.defer();
                          if (!playlistsCache) {
                            $http.get('http://mah-music-api.herokuapp.com/playlists')
                              .success(function(data) {
                                playlistsCache = data;
                                deferred.resolve(playlistsCache);
                              })
                              .error(function(err) {
                                reject(err);
                              });
                          } else {
                            deferred.resolve(playlistsCache);
                          }

                          return deferred.promise;
                        },

                        // esta função recebe um id de playlist e chama a função
                        // que fornece o array de playlists. Assim que esse array
                        // está em mãos (que pode demorar um pouco, se precisar
                        // fazer a requisição AJAX, ou pode ser imediato, se já a
                        // tiver feito), percorre o array para retornar apenas a
                        // playlist cujo id foi passado por parâmetro
                        getPlaylist: function(id) {
                          return this.getPlaylists().then(function(playlists) {
                            return playlists.filter(function(p) { return p._id === id })[0] || null;
                          });
                        }
                      }
                    });
                    ```
        1. Agora que temos o serviço `PlaylistService`, vamos modificar o _controller_ `PlaylistsCtrl` (plural) para usar esse serviço, em vez de fazer a requisição AJAX por si mesmo. Seu código vai se tornar:

            ```js
            .controller('PlaylistsCtrl', function($scope, PlaylistService) {
              $scope.playlists = [];
              PlaylistService.getPlaylists().then(playlists => $scope.playlists = playlists);
            })
            ```

            - Repare que:
                - Substituímos a dependência do `$http` por `PlaylistService` e
                - Invocamos o método `getPlaylists` do `PlaylistService` em vez de fazer a requisição AJAX
            - Teste e veja que a funcionalidade da _view_ de _playlists_ deve continuar funcionando depois dessa refatoração
        1. Agora, vamos mostrar os detalhes da _playlist_ quando clicamos em uma delas. Isso requer dois passos: (1) modificar `www/templates/playlist.html` (no singular) para que ele exiba o título, o nome do criador e a lista de músicas e (2) modificar o `PlaylistCtrl` (no singular) para usar o serviço `PlaylistService` (assim como o `PlaylistsCtrl` - plural)
            - Isto será deixado como exercício
            - Dica: dentro do `PlaylistCtrl` (singular), é possível obter o valor do `id` da _playlist_ que estamos querendo exibir usando `$stateParams.playlistId` (veja [como usar parâmetros da URL no _UI router_ do Ionic][ui-router-path-params])
        1. Teste e veja as informações da _playlist_ "selecionada" estão aparecendo devidamente quando se clica em uma _playlist_ da lista
1. Próximos passos... (não é necessário fazer estas)
    1. Refatorar a _view_ que exibe uma música em uma diretiva
    1. Adicionar música a _playlist_
    1. Remover música de _playlist_
    1. Login e Logout
    1. Permitir criar novas _playlists_
    1. Permitir exclusão de _playlists_
    1. Permitir ter _playlists_ públicas (todos podem alterar) e "curadas" (todos podem ver, mas só o dono pode alterar)



<!--
### FAQ

- Se, ao tentar fazer uma requisição AJAX, ela não funcionar e aparecer uma mensagem, no console do navegador, tipo assim: `XMLHttpRequest cannot load https://mah-music-api.herokuapp.com/songs. No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:8100' is therefore not allowed access.`
    - Isso acontece porque a API está hospedada em um _host_ (`mah-music-api.herokuapp.com`) diferente do _host_ da aplicação Ionic (`localhost`) e os navegadores bloqueiam essas requisições por causa de segurança - isso chama [CORS][cors] (leia sobre)
    - Como resolver?
        1. Alterar o servidor para enviar cabeçalhos HTTP em toda resposta permitindo requisições AJAX de qualquer origem (_host_). Veja esta [explicação sobre o CORS][cors-ionic-blog] no blog do Ionic.
-->

[git]: https://git-scm.com/
[gitkraken]: https://www.gitkraken.com/
[nodejs]: https://nodejs.org/en/
[ionic]: http://ionicframework.com/
[nodist]: https://github.com/marcelklehr/nodist
[nvm]: https://www.google.com.br/search?hl=pt-BR&q=nvm+creationix&meta=&gws_rd=ssl
[cordova]: https://cordova.apache.org/
[gulp]: http://gulpjs.com/
[atom]: https://atom.io/
[sublime]: https://www.sublimetext.com/
[vscode]: https://code.visualstudio.com/
[brackets]: http://brackets.io/
[webstorm]: https://www.jetbrains.com/webstorm/
[netbeans]: https://netbeans.org/downloads/
[getting-started]: http://ionicframework.com/docs/v1/getting-started/
[angular]: https://angularjs.org/
[explicacao-ion-nav-view]: http://isaquedias.com.br/entendendo-o-ionic-framework-side-menu/
[item-icons]: http://ionicframework.com/docs/components/#item-icons
[google-fonts]: https://fonts.google.com/
[array-of-objects]: http://stackoverflow.com/questions/1290131/javascript-how-to-create-an-array-of-object-literals-in-a-loop
[angular-codeschool]: https://www.codeschool.com/courses/shaping-up-with-angular-js
[angular-ng-src]: http://stackoverflow.com/a/27554837/1783793
[angular-wire-up-backend]: https://angularjs.org/#wire-up-a-backend
[ionic-forms]: http://ionicframework.com/docs/components/#forms
[angular-filter]: https://docs.angularjs.org/api/ng/filter/filter
[ionic-forms-css]: http://ionicframework.com/docs/components/#forms
[api-docs]: https://mah-music-api.herokuapp.com/api-docs/
[what-is-rest]: http://www.restapitutorial.com/lessons/whatisrest.html
[cors]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
[cors-ionic-blog]: http://blog.ionic.io/handling-cors-issues-in-ionic/
[master-detail]: http://mcgivery.com/ionic-master-detail-pattern/
[ui-router-path-params]: https://github.com/angular-ui/ui-router/wiki/URL-Routing#basic-parameters
