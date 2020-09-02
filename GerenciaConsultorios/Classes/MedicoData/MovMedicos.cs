using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GerenciaConsultorios.Classes.MedicoData
{
  public class MovMedicos
  {
    public int Pk { get; set; }
    public int FkCadMedicos { get; set; }
    public int FkCadConsultorio { get; set; }

  }
}