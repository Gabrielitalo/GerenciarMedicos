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
using System.Web.Http.Cors;

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
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [AcceptVerbs("GET")]
    [Route("api/ValidaLogin")]
    public List<Login> validaLogin(string username, string pass)
    {
      return login.validaLogin(username, pass);
    }

    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [AcceptVerbs("GET")]
    [Route("api/RetornarUsuarios")]
    public string retornarUsuarios(int tipo, int pkUsuario)
    {
      return login.retornarUsuarios(tipo, pkUsuario);
    }

    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [AcceptVerbs("POST")]
    [Route("api/CadastrarUsuario")]
    public string cadastrarUsuario(string nome, string usuario, string senha, string tipoUsuario)
    {
      return login.cadastrarNovoUsuario(nome, usuario, senha, tipoUsuario);
    }

    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [AcceptVerbs("DELETE")]
    [Route("api/ExcluirUsuario")]
    public string excluirUsuario(int pkUsuario)
    {
      return login.excluirUsuario(pkUsuario);
    }

    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [AcceptVerbs("PUT")]
    [Route("api/AlterarUsuario")]
    public string alterarUsuario(int pkUsuario, string nome, string usuario, string senha, string tipoUsuario)
    {
      return login.alterarUsuario(pkUsuario, nome, usuario, senha, tipoUsuario);
    }
    //---------------------------------------------------------------------------------------------------------------------------------------
    // Consultórios

    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [AcceptVerbs("GET")]
    [Route("api/RetornaConsultorios")]
    public List<Consultorio> retornaConsultorios(int tipo, int pkConsultorio = 0)
    {
      return consultorio.retornarConsultorios(tipo, pkConsultorio);
    }

    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [AcceptVerbs("POST")]
    [Route("api/CadastrarConsultorio")]
    public string cadastrarConsultorio(string nome, string endereco, string telefone)
    {
      return consultorio.cadastrar(nome, endereco, telefone);
    }

    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [AcceptVerbs("DELETE")]
    [Route("api/ExluirConsultorio")]
    public void exluirConsultorio(int pkConsultorio)
    {
      consultorio.excluir(pkConsultorio);
    }

    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [AcceptVerbs("PUT")]
    [Route("api/AlterarConsultorio")]
    public void alterarConsultorio(int pkConsultorio, string nome, string endereco, string telefone)
    {
      consultorio.alterar(pkConsultorio, nome, endereco, telefone);
    }

    // Fim consultórios
    //---------------------------------------------------------------------------------------------------------------------------------------
    // Médicos

    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [AcceptVerbs("GET")]
    [Route("api/RetornaMedicos")]
    public List<MovMedicos> retornaMedicos(int tipo, int pkMedico = 0, int pkConsultorio = 0)
    {
      return medicos.retornarMedicos(tipo, pkMedico, pkConsultorio);
    }

    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [AcceptVerbs("POST")]
    [Route("api/CadastrarMedico")]
    public string cadastrarMedico(string crm, string nome, string telefone, string valorConsulta)
    {
      return medicos.cadastrar(nome, telefone, valorConsulta, crm);
    }

    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [AcceptVerbs("DELETE")]
    [Route("api/ExluirMedico")]
    public void exluirMedico(int pkMedico)
    {
      medicos.excluir(pkMedico);
    }

    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [AcceptVerbs("PUT")]
    [Route("api/AlterarMedico")]
    public void alterarMedico(int pkMedico, string crm, string nome, string telefone, string valorConsulta)
    {
      medicos.alterar(pkMedico, crm, nome, telefone, valorConsulta);
    }


    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [AcceptVerbs("POST")]
    [Route("api/GerenciarMedicoConsultorio")]
    public string gerenciarMedicoConsultorio(int tipo, int pkConsultorio = 0, int pkMedico = 0, int pk = 0)
    {
      return medicos.vincularMedicoConsultorio(tipo, pkConsultorio, pkMedico, pk);
    }
    // Fim médicos
    //---------------------------------------------------------------------------------------------------------------------------------------

  }
}
