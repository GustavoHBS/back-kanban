<h1>Back-Kanban</h1>
<p>Para executar o projeto, primeiramente, deve ter o docker e o docker-compose instalado na sua maquina, eles serão responsaveis pela criação e configuração dos containers.<br>
Então, com os dois instalados, basta criar um arquivo .env na raiz do projeto e nele será setada as configurações do ambiente, as variáveis utilizadas são:

```
TOKEN_SECRET=
DEFAULT_USERNAME=
DEFAULT_PASSWORD=
DATABASE_USERNAME=
DATABASE_PASSWORD=
DATABASE_URL=
```

TOKEN_SECRET => Uma chave que o token será gerado utilizando ela.<br>
DEFAULT_USERNAME => Usuario para autenticação.<br>
DEFAULT_PASSWORD => Senha para autenticação.<br>
DATABASE_USERNAME => Usuario para o banco de dados.<br>
DATABASE_PASSWORD => Senha para banco de dados.<br>
DATABASE_URL => Basta colar esse codigo como valor dela =>

```
"postgresql://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@localhost:5432/?schema=public"
```

Após isso, basta executar o comando

```
docker-compose up -d
```

E os containers subirão, o backend fica na porta <b>5000</b>.

</p>
