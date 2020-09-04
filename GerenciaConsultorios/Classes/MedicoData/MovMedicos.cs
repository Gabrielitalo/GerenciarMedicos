using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GerenciaConsultorios.Classes.MedicoData
{
  public class MovMedicos : Medicos
  {
    public int PkMovMedico { get; set; }
    public int FkCadMedicos { get; set; }
    public string NomeConsultorio { get; set; }
    public int FkCadConsultorio { get; set; }

  }
}