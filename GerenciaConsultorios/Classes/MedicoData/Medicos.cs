using MySql.Data.MySqlClient;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.Linq;
using System.Web;

namespace GerenciaConsultorios.Classes.MedicoData
{
  public class Medicos
  {
    public int Pk { get; set; }
    public string Crm { get; set; } // 10
    public string Nome { get; set; } //100
    public string Telefone { get; set; } //20
    public decimal ValorConsulta { get; set; } // 18,2

    private MySqlDataAdapter mAdapter;
    DbCon con = new DbCon();

    // Métodos abaixo evitam truncamento de dados no banco

    // Garantindo que o Crm sempre terá no máximo 10 caracteres
    public string verificaCrm(string crm)
    {
      if (crm.Length > 10)
      {
        crm = crm.Substring(0, 10);
      }
      return crm;
    }

    // Garantindo que o Nome sempre terá no máximo 100 caracteres
    public string verificaNome(string nome)
    {
      if (nome.Length > 100)
      {
        nome = nome.Substring(0, 100);
      }
      return nome;
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

    // Definindo padão de valor para a consulta
    public decimal VerificaValorConsulta(decimal valor)
    {
      return Math.Round(valor, 2);
    }

    // Retorna todos médicos, único médico ou vinculados a determinado consultório.
    public string retornarMedicos(int tipo, int pkMedico = 0, int pkConsultorio = 0)
    {
      List<Medicos> medicos = new List<Medicos>();
      string comando = "";
      DataSet ds = new DataSet();

      if (tipo == 0)
      {
        comando = @"Select * From CadMedicos M";
      }
      else
      {
        if (pkMedico != 0)
        {
          // Retorna médicos pelo código 
          comando = @"Select * 
                      From CadMedicos M
                      Join MovMedicos Mm on (Mm.FkCadMedicos = M.Pk)
                      Where (M.Pk = " + pkMedico.ToString() + ")";
        }
        else if (pkConsultorio != 0)
        {
          // Retorna médicos por consultório
          comando = @"Select * 
                      From CadMedicos M
                      Join MovMedicos Mm on (Mm.FkCadMedicos = M.Pk)
                      Where (Mm.FkCadConsultorio = " + pkConsultorio.ToString() + ")";
        }
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
            medicos.Add
            (
              new Medicos
              {
                Pk = Convert.ToInt32(ds.Tables[0].Rows[0]["Pk"]),
                Crm = ds.Tables[0].Rows[0]["Crm"].ToString(),
                Nome = ds.Tables[0].Rows[0]["Nome"].ToString(),
                Telefone = ds.Tables[0].Rows[0]["Telefone"].ToString(),
                ValorConsulta = Convert.ToDecimal(ds.Tables[0].Rows[0]["ValorConsulta"].ToString())

              }
            );
          }
        }
      }
      catch
      {
      }
      return JsonConvert.SerializeObject(medicos, Formatting.Indented);

    }

    // Efetua o cadastro do médico
    public string cadastrar(string nome, string telefone, string valorConsulta, string crm = "")
    {
      DataSet ds = new DataSet();
      string retorno = "";
      if (crm == "")
      {
        return "Para cadastrar um médico é necessário o CRM.";
      }

      string comando = @"Insert Into CadMedicos(CRM, Nome, Telefone, ValorConsulta) " +
                         "Select '" + verificaCrm(crm) + "'," +
                         "'" + verificaNome(nome) + "'," +
                         "'" + verificaTelefone(telefone) + "', " +
                         "" + valorConsulta + ";";

      try
      {
        // Executando comando
        mAdapter = new MySqlDataAdapter(comando, con.connectionStringMySql);
        // Populando o data set
        mAdapter.Fill(ds);
        retorno = "Sucesso ao cadastrar";

      }
      catch
      {
        retorno = "Erro geral";
      }


      return retorno;
    }

    // Exclui o consultório pelo código
    public void excluir(int pkMedico)
    {
      DataSet ds = new DataSet();
      string comando = @"Delete From CadMedicos Where (Pk = " + pkMedico.ToString() + ")";

      // Executando comando
      mAdapter = new MySqlDataAdapter(comando, con.connectionStringMySql);
      // Populando o data set
      mAdapter.Fill(ds);
    }

    // Atualiza o cadastro de um médico pelo código interno.
    public void alterar(int pkMedico, string crm, string nome, string telefone, string valorConsulta)
    {
      DataSet ds = new DataSet();
      string comando = @"Update CadMedicos
                          Set CRM = '" + verificaCrm(crm) + "', " +
                          "Nome = '" + verificaNome(nome) + "'," +
                          "Telefone = '" + verificaTelefone(telefone) + "'," +
                          "ValorConsulta = '" + valorConsulta + "'" +
                         "Where (Pk = " + pkMedico.ToString() + ")";

      // Executando comando
      mAdapter = new MySqlDataAdapter(comando, con.connectionStringMySql);
      // Populando o data set
      mAdapter.Fill(ds);
    }

    // Gerencia em quais consultórios os médicos atendem, regra está toda na procedure
    public string vincularMedicoConsultorio(int tipo, int pkConsultorio, int pkMedico)
    {
      DataSet ds = new DataSet();
      string retorno = "";
      string comando;

      comando = "call PcVinculaMedicoConsultorio (" + tipo + " , " + pkMedico + " , " + pkConsultorio + ")";
      // Executando comando
      mAdapter = new MySqlDataAdapter(comando, con.connectionStringMySql);
      // Populando o data set
      mAdapter.Fill(ds);

      if (ds.Tables[0].Rows.Count > 0)
      {
        retorno = ds.Tables[0].Rows[0]["Retorno"].ToString();
      }

      return retorno;
    }
  }
}