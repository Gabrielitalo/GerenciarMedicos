using MySql.Data.MySqlClient;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace GerenciaConsultorios.Classes
{
  public class Login
  {
    public int Pk { get; set; }
    public string Nome { get; set; }
    public string Usuario { get; set; }
    public string Senha { get; set; }
    public int TipoUsuario { get; set; }

    private MySqlDataAdapter mAdapter;
    DbCon con = new DbCon();

    public List<Login> validaLogin(string username, string pass)
    {
      string comando = "Select * From CadUsuarios Where (Usuario = '" + username + "') and (Senha = '" + pass + "');";
      DataSet ds = new DataSet();
      List<Login> login = new List<Login>();

      // Executando comando
      mAdapter = new MySqlDataAdapter(comando, con.connectionStringMySql);
      // Populando o data set
      mAdapter.Fill(ds);

      if (ds.Tables[0].Rows.Count > 0)
      {
        login.Add
            (
              new Login
              {
                Pk = Convert.ToInt32(ds.Tables[0].Rows[0]["Pk"]),
                Nome = ds.Tables[0].Rows[0]["Nome"].ToString(),
                Usuario = ds.Tables[0].Rows[0]["Usuario"].ToString(),
                TipoUsuario = Convert.ToInt32(ds.Tables[0].Rows[0]["TipoUsuario"].ToString())
              }
            );
      }
      else
      {
        login.Add(new Login { Pk = 0 }); // Não achou
      }

        return login;
    }

    public string retornarUsuarios(int tipo, int pkUsuario = 0)
    {
      DataSet ds = new DataSet();
      List<Login> login = new List<Login>();
      string comando = "";
      if (tipo == 0)
      {
        comando = "Select * From CadUSuarios Order by Nome;";
      }
      else
      {
        comando = "Select * From CadUSuarios Where Pk = " + pkUsuario + ";";

      }

      // Executando comando
      mAdapter = new MySqlDataAdapter(comando, con.connectionStringMySql);
      // Populando o data set
      mAdapter.Fill(ds);

      if (ds.Tables[0].Rows.Count > 0)
      {
        int i = 0;
        for (i = 0; i <= ds.Tables[0].Rows.Count; i++)
        {
          login.Add
              (
              new Login
              {
                Pk = Convert.ToInt32(ds.Tables[0].Rows[i]["Pk"]),
                Nome = ds.Tables[0].Rows[i]["Nome"].ToString(),
                Usuario = ds.Tables[0].Rows[i]["Usuario"].ToString(),
                TipoUsuario = Convert.ToInt32(ds.Tables[0].Rows[i]["TipoUsuario"].ToString())
              }
              );
        }
      }

      return JsonConvert.SerializeObject(login, Formatting.Indented);
    }
    public string cadastrarNovoUsuario(string nome, string usuario, string senha, string tipoUsuario)
    {
      DataSet ds = new DataSet();
      string comando = @"Insert Into Login (Nome, Usuario, Senha, TipoUsuario) " +
                         "Select " + nome + ", " + usuario + ", " + senha + ", " + tipoUsuario + ";";
      // Executando comando
      mAdapter = new MySqlDataAdapter(comando, con.connectionStringMySql);
      // Populando o data set
      mAdapter.Fill(ds);


      return "OK";
    }

    public string alterarUsuario(int pkUsuario, string nome, string usuario, string senha, string tipoUsuario)
    {
      DataSet ds = new DataSet();
      string comando = @"Update Login" +
                         "Set " + nome + ", " + usuario + ", " + senha + ", " + tipoUsuario + "" +
                         "Where (Pk = " + pkUsuario.ToString() + ");";
      // Executando comando
      mAdapter = new MySqlDataAdapter(comando, con.connectionStringMySql);
      // Populando o data set
      mAdapter.Fill(ds);

      return "OK";
    }

    public string excluirUsuario(int pkUsuario)
    {
      DataSet ds = new DataSet();
      string comando = "Delete From Login Where (Pk = " + pkUsuario + ")";
      // Executando comando
      mAdapter = new MySqlDataAdapter(comando, con.connectionStringMySql);
      // Populando o data set
      mAdapter.Fill(ds);

      return "OK";
    }
  }
}