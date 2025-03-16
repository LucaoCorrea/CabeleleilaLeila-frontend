# Documentação do Projeto

Este projeto consiste em uma aplicação full-stack para agendamentos em um salão de beleza. O front-end foi desenvolvido em  **React**  com  **Node.js** + **Vite**, e o back-end em  **Java**  com  **Spring Boot**. A aplicação está responsiva e foi projetada para funcionar em dispositivos móveis e desktops.

---
## 🔗Links do Projeto

 - Front-End: [Clique aqui.](https://github.com/LucaoCorrea/CabeleleilaLeila-frontend)
 - Back-End: [Clique aqui.](https://github.com/LucaoCorrea/CabeleleilaLeila-backend)

----------

## 🚀 Como Rodar o Projeto

### Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:

1.  **Node.js**  (para o front-end):
    
    -   Versão recomendada: 16.x ou superior.
        
    -   Download:  [Node.js](https://nodejs.org/)
        
2.  **Java JDK**  (para o back-end):
    
    -   Versão recomendada: 17 ou superior.
        
    -   Download:  [OpenJDK](https://openjdk.org/)  ou  [Oracle JDK](https://www.oracle.com/java/technologies/javase-downloads.html)
        
3.  **Maven**  (para gerenciamento de dependências do back-end):
    
    -   Versão recomendada: 3.8.x ou superior.
        
    -   Download:  [Maven](https://maven.apache.org/download.cgi)
        
4.  **Banco de Dados**:
    
    -   O projeto utiliza um banco de dados  **PostgreSQL.**  em memória para desenvolvimento. 
        
5.  **Git**  (opcional, para clonar o repositório):
    
    -   Download:  [Git](https://git-scm.com/)
## 📥 Instalação e Configuração

### 1. Clonar o Repositório

Clonando o repositório Backend

    git clone https://github.com/LucaoCorrea/CabeleleilaLeila-backend.git
    cd CabeleleilaLeila-backend
    cd leilaSalao
 1.  Instale as dependências com o Maven:
    
	    mvn clean install

1.  Execute o back-end: 
 
        mvn spring-boot:run
	Ou se preferir, execute diretamente na sua IDE. 
    
    O back-end estará disponível em:  [http://localhost:8080](http://localhost:8080/).

### 2. Clonar o Repositório

Clonando o repositório Frontend

    git clone https://github.com/LucaoCorrea/CabeleleilaLeila-frontend.git
    cd CabeleleilaLeila-frontend
    cd leila-salao-frontend
 1.  Instale as dependências:
    
		 npm install

1.  Execute o front-end: 
 
        npm run dev
        
    
    O front-end estará disponível em:  [http://localhost:5175](http://localhost:5175/).

### 3. Criação do DataBase 
	

[Configuração básica de criação de Server e Databases](https://www.youtube.com/watch?v=UbX-2Xud1JA)
	
		

    spring:
    
	    datasource:
    
		    url:  jdbc:postgresql://localhost:5432/leila_salao
    
		    username:  postgres
    
		    password:  1234	(seu senha setada na instalação.)
    
		    driver-class-name:  org.postgresql.Driver


> Como vimos, crie um Database com port: `5432`, como name:
> `leila_salao`, username: `postgres` (ou outro username). Não esqueça
> de alinhar tudo no arquivo `application.yml`.

No front-end está 'setado' um usuário padrão com a Role Admin que é: `e-mail: leila@gmail.com`. Na hora do registro, faça um usuário com esse e-mail.

    -- Database: leila_salao

	-- DROP DATABASE IF EXISTS leila_salao;

	CREATE DATABASE leila_salao
	    WITH
	    OWNER = postgres
	    ENCODING = 'UTF8'
	    LC_COLLATE = 'Portuguese_Brazil.1252'
	    LC_CTYPE = 'Portuguese_Brazil.1252'
	    LOCALE_PROVIDER = 'libc'
	    TABLESPACE = pg_default
	    CONNECTION LIMIT = -1
	    IS_TEMPLATE = False;

## 🛠️ Funcionalidades Implementadas

### Front-end

-   **Login e Registro**: Os usuários podem fazer login e registrar-se no sistema.
    
-   **Dashboard**: Exibe os agendamentos do usuário logado.
    
-   **Criação de Agendamentos**: Os usuários podem criar novos agendamentos.
    
-   **Responsividade**: A aplicação está totalmente responsiva e funciona bem em dispositivos móveis e desktops.
    

### Back-end

-   **Autenticação JWT**: O sistema usa tokens JWT para autenticação.
    
-   **CRUD de Agendamentos**: Os usuários podem criar, visualizar e gerenciar seus agendamentos.
    
-   **Banco de Dados**: Utiliza o banco de dados  **PostgreSQL**  em memória para desenvolvimento.

## ⚡ Otimização e Desempenho

Durante o desenvolvimento, foram adotadas várias práticas para garantir a otimização e o bom desempenho da aplicação:

1.  **Back-end (Spring Boot)**:
    
    -   **Cache de Dados**: Utilizei cache em memória para reduzir o tempo de resposta em consultas frequentes, como a listagem de agendamentos.
        
    -   **Consultas Otimizadas**: As consultas ao banco de dados foram otimizadas com índices e queries eficientes para evitar lentidão.
        
    -   **Thread Pool**: Configurei um pool de threads para melhorar o desempenho em operações assíncronas.
        
2.  **Front-end (React)**:
    
    -   **Lazy Loading**: Implementei lazy loading para carregar componentes apenas quando necessário, reduzindo o tempo inicial de carregamento.
        
    -   **Memoização**: Utilizei  `React.memo`  e  `useMemo`  para evitar renderizações desnecessárias.
        
    -   **Code Splitting**: Dividi o código em chunks menores para melhorar o desempenho de carregamento.
        
3.  **Banco de Dados (PostgreSQL)**:
    
    -   **Índices**: Adicionei índices em colunas frequentemente consultadas, como  `user_id`  e  `date`.
        
    -   **Normalização**: Estruturei o banco de dados para evitar redundâncias e melhorar a integridade dos dados.
        
4.  **Testes de Desempenho**:
    
    -   Realizei testes de carga com ferramentas como  **JMeter**  para garantir que a aplicação suporta um grande número de requisições simultâneas.
        
    -   Utilizei o  **Chrome DevTools**  para analisar e otimizar o desempenho do front-end.
    

----------

## 🐛 Bugs Conhecidos e Pendências

Devido ao tempo limitado, algumas funcionalidades não foram completamente implementadas ou corrigidas. Aqui estão os principais problemas conhecidos:

1.  **Agendamentos**:
    
    -   O front-end está enviando o  **email**  do usuário como  `userId`  na requisição, mas o back-end espera o  **ID numérico**  do usuário. Isso causa um erro  `403 (Forbidden)`.
        
    -   **Solução temporária**: Modificar o front-end para enviar o ID numérico do usuário em vez do email.
        
2.  **Validação de Token**:
    
    -   A validação do token no back-end pode falhar se o token não estiver sendo armazenado corretamente no banco de dados.
        
    -   **Solução temporária**: Verificar se o token está sendo persistido corretamente no banco de dados.
        
3.  **Refresh Token**:
    
    -   A funcionalidade de refresh token ainda não foi implementada. Isso pode causar problemas quando o token expira.
        
    -   **Solução temporária**: O usuário precisa fazer login novamente quando o token expirar.
        

----------

## 📱 Responsividade

A aplicação foi desenvolvida com foco em responsividade, garantindo uma experiência consistente em diferentes dispositivos:

-   **Mobile**: O layout se adapta a telas pequenas, com menus colapsáveis e botões de fácil acesso.
    
-   **Tablet e Desktop**: O layout é otimizado para telas maiores, com mais espaço para exibição de informações.

-------

## 🖥️Prints e Testes no Postman 

### 1. Link para o Diagrama e estudo de casos.
[Clique aqui para ver os Diagramas](https://miro.com/app/board/uXjVIQQ77Ro=/?share_link_id=877106174635) 

### 2. Link para o Drive com Apresentações e Prints do Projeto.
[Clique aqui para ver o Drive](https://drive.google.com/drive/folders/1DDqdRKWQQRf0flBHjVbIRG5wrIP2Q5PK)

### 3. Explicando Sobre os Relatórios
	

> A aplicação do backend foi testada no Postman, obtendo resultados bons (como nas imagens do Drive).
> Os Relatórios em CSV foi extraído do PostgreSQL, com filtros como `SELECT * FROM _user`
> As Imagens das Telas do FrontEnd também está disponível.
> Testes foram feitos, como a criação de vários usuários; Criptografia das senhas e geração de ID aleatoriamente. Trazendo assim, maior segurança ao usuário. 

-----

## 📝 Considerações Finais

Este projeto foi desenvolvido como parte de um desafio técnico e, devido ao tempo limitado, algumas funcionalidades ainda precisam ser aprimoradas. No entanto, a aplicação está funcional e pode ser usada como base para futuras melhorias.

Se você tiver alguma dúvida ou sugestão, sinta-se à vontade para entrar em contato!
