-- Criando banco de dados.
Create DataBase GerenciarMedic

-- Criando a tabela de usuários
CREATE TABLE CadUsuarios  
(
	  Pk int NOT NULL AUTO_INCREMENT,
    Nome varchar(100),
    Usuario varchar(30),
    Senha varchar(15),
    TipoUsuario int,
    PRIMARY KEY (Pk)  
);

-- Iniciando um usuário para poder ter acesso
Insert Into CadUsuarios(Nome, Usuario, Senha, TipoUsuario)
Select 'admin', 'admin', '123', 0;

-- Criando tabela que irá registrar os consultórios
CREATE TABLE CadConsultorio 
(
	  Pk int NOT NULL AUTO_INCREMENT,
    Nome varchar(100),
    Endereco varchar(200),
    Telefone varchar(20),
    PRIMARY KEY (Pk)  
);

-- Criar a tabela que irá conter os médicos
CREATE TABLE CadMedicos  
(
	  Pk int NOT NULL AUTO_INCREMENT,
    CRM varchar(10),
    Nome varchar(100),
    Telefone varchar(20),
    ValorConsulta numeric(18,2),
    PRIMARY KEY (Pk)  
);

-- Nessa tabela irá registrar a movimentação dos médicos, ou seja, vincula um médico a um consultório.
-- Foi criado uma constraint com a tabela pai CadMedicos

CREATE TABLE MovMedicos  
(
	  Pk int NOT NULL AUTO_INCREMENT,
    FkCadMedicos int,
    FkCadConsultorio int,
    PRIMARY KEY (Pk) ,
    CONSTRAINT fk_FkCadMedicos_MovMedicos FOREIGN KEY (FkCadMedicos)
     REFERENCES CadMedicos(Pk)
     ON DELETE CASCADE
     ON UPDATE CASCADE 
);