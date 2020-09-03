using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using GerenciaConsultorios.Classes;
using GerenciaConsultorios.Classes.MedicoData;
using Microsoft.Ajax.Utilities;
using Newtonsoft.Json;

namespace GerenciaConsultorios.Controllers
{
  public class ConsultorioController : ApiController
  {
    //---------------------------------------------------------------------------------------------------------------------------------------
    // Classes instanciadas 

    Login login = new Login();
    Consultorio consultorio = new Consultorio();
    Medicos medicos = new Medicos();

    //---------------------------------------------------------------------------------------------------------------------------------------
    // Login
    [AcceptVerbs("GET")]
    [Route("api/ValidaLogin")]
    public string validaLogin(string username, string pass)
    {
      return login.validaLogin(username, pass);
    }

    [AcceptVerbs("GET")]
    [Route("api/RetornarUsuarios")]
    public string retornarUsuarios(int tipo, int pkUsuario)
    {
      return login.retornarUsuarios(tipo, pkUsuario);
    }

    [AcceptVerbs("POST")]
    [Route("api/CadastrarUsuario")]
    public string cadastrarUsuario(string nome, string usuario, string senha, string tipoUsuario)
    {
      return login.cadastrarNovoUsuario(nome, usuario, senha, tipoUsuario);
    }

    [AcceptVerbs("DELETE")]
    [Route("api/ExcluirUsuario")]
    public string excluirUsuario(int pkUsuario)
    {
      return login.excluirUsuario(pkUsuario);
    }

    [AcceptVerbs("PUT")]
    [Route("api/AlterarUsuario")]
    public string alterarUsuario(int pkUsuario, string nome, string usuario, string senha, string tipoUsuario)
    {
      return login.alterarUsuario(pkUsuario, nome, usuario, senha, tipoUsuario);
    }
    //---------------------------------------------------------------------------------------------------------------------------------------
    // Consultórios

    [AcceptVerbs("GET")]
    [Route("api/RetornaConsultorios")]
    public string retornaConsultorios(int tipo, int pkConsultorio = 0)
    {
      return consultorio.retornarConsultorios(tipo, pkConsultorio);
    }

    [AcceptVerbs("POST")]
    [Route("api/CadastrarConsultorio")]
    public string cadastrarConsultorio(string nome, string endereco, string telefone)
    {
      return consultorio.cadastrar(nome, endereco, telefone);
    }

    [AcceptVerbs("DELETE")]
    [Route("api/ExluirConsultorio")]
    public void exluirConsultorio(int pkConsultorio)
    {
      consultorio.excluir(pkConsultorio);
    }

    [AcceptVerbs("PUT")]
    [Route("api/AlterarConsultorio")]
    public void alterarConsultorio(int pkConsultorio, string nome, string endereco, string telefone)
    {
      consultorio.alterar(pkConsultorio, nome, endereco, telefone);
    }

    // Fim consultórios
    //---------------------------------------------------------------------------------------------------------------------------------------
    // Médicos

    [AcceptVerbs("GET")]
    [Route("api/RetornaMedicos")]
    public string retornaMedicos(int tipo, int pkMedico = 0, int pkConsultorio = 0)
    {
      return medicos.retornarMedicos(tipo, pkMedico, pkConsultorio);
    }

    [AcceptVerbs("POST")]
    [Route("api/CadastrarMedico")]
    public string cadastrarMedico(string crm, string nome, string telefone, string valorConsulta)
    {
      return medicos.cadastrar(nome, telefone, valorConsulta, crm);
    }

    [AcceptVerbs("DELETE")]
    [Route("api/ExluirMedico")]
    public void exluirMedico(int pkMedico)
    {
      medicos.excluir(pkMedico);
    }

    [AcceptVerbs("PUT")]
    [Route("api/AlterarMedico")]
    public void alterarMedico(int pkMedico, string crm, string nome, string telefone, string valorConsulta)
    {
      medicos.alterar(pkMedico, crm, nome, telefone, valorConsulta);
    }


    [AcceptVerbs("POST")]
    [Route("api/GerenciarMedicoConsultorio")]
    public string gerenciarMedicoConsultorio(int tipo, int pkConsultorio, int pkMedico)
    {
      return medicos.vincularMedicoConsultorio(tipo, pkConsultorio, pkMedico);
    }
    // Fim médicos
    //---------------------------------------------------------------------------------------------------------------------------------------

  }
}
