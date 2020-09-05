using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using MySql.Data;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;

namespace GerenciaConsultorios.Classes
{
  public class Consultorio
  {
    public int Pk { get; set; }
    public string Nome { get; set; } //100
    public string Endereco { get; set; } //200
    public string Telefone { get; set; } //20

    private MySqlDataAdapter mAdapter;
    DbCon con = new DbCon();

    // Métodos abaixo evitam truncamento de dados no banco

    // Garantindo que o Nome sempre terá no máximo 100 caracteres
    public string verificaNome(string nome)
    {
      if (nome.Length > 100)
      {
        nome = nome.Substring(0, 100);
      }
      return nome;
    }

    // Garantindo que o Endereco sempre terá no máximo 200 caracteres
    public string verificaEndereco(string endereco)
    {
      if (endereco.Length > 200)
      {
        endereco = endereco.Substring(0, 200);
      }
      return endereco;
    }

    // Garantindo que o Telefone sempre terá no máximo 20 caracteres
    public string verificaTelefone(string telefone)
    {
      if (telefone.Length > 20)
      {
        telefone = telefone.Substring(0, 20);
      }
      return telefone;
    }

    // Retorna os dados dos consultórios todos ou apenas um
    public List<Consultorio> retornarConsultorios(int tipo, int pkConsultorio = 0, string texto = "")
    {
      List<Consultorio> consultorio = new List<Consultorio>();
      string comando = "";
      DataSet ds = new DataSet();

      // Todos consultórios
      if (tipo == 0)
      {
        if (texto == "")
        {
        comando = @"Select * From CadConsultorio Order by Nome;";
        }
        else
        {
          comando = @"Select * From CadConsultorio Where (Nome like '%" + texto + "%') Order by Nome Limit 10;";
        }
      }
      else
      {
        // Retona por código do consultório

        comando = @"Select * From CadConsultorio Where (Pk = " + pkConsultorio.ToString() + ")";
      }

      try
      {

        // Executando comando
        mAdapter = new MySqlDataAdapter(comando, con.connectionStringMySql);
        // Populando o data set
        mAdapter.Fill(ds);

        // Verificando se retornou algo para montar o list
        if (ds.Tables[0].Rows.Count > 0)
        {
          int i = 0;
          for (i = 0; i <= ds.Tables[0].Rows.Count; i++)
          {
            consultorio.Add
            (
              new Consultorio
              {

                Pk = Convert.ToInt32(ds.Tables[0].Rows[i]["Pk"]),
                Nome = ds.Tables[0].Rows[i]["Nome"].ToString(),
                Endereco = ds.Tables[0].Rows[i]["Endereco"].ToString(),
                Telefone = ds.Tables[0].Rows[i]["Telefone"].ToString(),
              }
            );
          }
        }
      }
      catch
      {

      }
      return consultorio;

    }

    // Efetua o cadastro do consultório
    public string cadastrar(string nome, string endereco = "", string telefone = "")
    {
      DataSet ds = new DataSet();

      if (endereco == "" && telefone == "")
      {
        return "Não é permitido cadastrar um novo consultório sem fornecer o endereço e o telefone";
      }

      string comando = @"Insert Into CadConsultorio (Nome, Endereco, Telefone) " +
                        "Select '" + verificaNome(nome) + "', " +
                        "'" + verificaEndereco(endereco) + "'," +
                         "'" + verificaTelefone(telefone) + "' ;";

      // Executando comando
      mAdapter = new MySqlDataAdapter(comando, con.connectionStringMySql);
      // Populando o data set
      mAdapter.Fill(ds);

      return "OK";
    }

    // Exclui o consultório pelo código
    public void excluir(int pkConsultorio)
    {
      DataSet ds = new DataSet();
      string comando = @"Delete From CadConsultorio  Where (Pk = " + pkConsultorio.ToString() + ")";

      // Executando comando
      mAdapter = new MySqlDataAdapter(comando, con.connectionStringMySql);
      // Populando o data set
      mAdapter.Fill(ds);
    }

    // Atualiza o cadastro de um consultório pelo código interno.
    public void alterar(int pkConsultorio, string nome, string endereco, string telefone)
    {
      DataSet ds = new DataSet();
      string comando = @"Update CadConsultorio
                          Set Nome = '" + verificaNome(nome) + "'," +
                          "Endereco = '" + verificaEndereco(endereco) + "', " +
                          "Telefone = '" + verificaTelefone(telefone) + "'" +
                         "Where (Pk = " + pkConsultorio.ToString() + ")";

      // Executando comando
      mAdapter = new MySqlDataAdapter(comando, con.connectionStringMySql);
      // Populando o data set
      mAdapter.Fill(ds);
    }

  }

}