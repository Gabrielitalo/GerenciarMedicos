-----------------------------------------------------------------------------------------------------------------------------------------------------------
-- Versão MSSQL

ALTER PROCEDURE [dbo].[PcVinculaMedicoConsultorio] @Tipo int, @PkMedico int, @PkConsultorio int    
as     

Declare @Count int

If (@Tipo = 0) -- Insert
	Begin

		Select @Count = Count(Pk)
		From MovMedicos
		Where (FkCadMedicos  = @PkMedico)

		If (@Count = 2)
			Begin
				Select 'Médico cadastrado em dois consultórios, remova de outro consultório.'  as Retorno
				return
			End
		Else
			Begin
				Insert Into MovMedicos(FkCadConsultorio, FkCadMedicos) 
				Select @PkConsultorio, @PkMedico

				Select 'Médico cadastrado com sucesso.'  as Retorno
				return
			End
	End
Else If (@Tipo = 1) -- Delete
	Begin
		Delete From MovMedicos
		Where (FkCadMedicos = @PkMedico) and
		(FkCadConsultorio = @PkConsultorio)

		Select 'Médico removido com sucesso.'  as Retorno
		return
	End
Else If (@Tipo = 2) -- Update
	Begin

		Update MovMedicos
		Set FkCadConsultorio = @PkConsultorio
		Where (FkCadMedicos = @PkMedico) and
		(FkCadConsultorio = @PkConsultorio)

		Select 'Médico alterado com sucesso.'  as Retorno
		return
	End
-----------------------------------------------------------------------------------------------------------------------------------------------------------
-- Versão MySql
DELIMITER //

CREATE PROCEDURE PcVinculaMedicoConsultorio ( p_Tipo int, p_PkMedico int, p_PkConsultorio int)    
sp_lbl:
begin     

Declare v_Count int;

If (p_Tipo = 0) -- Insert
	Then

		Select Count(Pk) Into v_Count
		From MovMedicos
		Where (FkCadMedicos  = p_PkMedico);

		If (v_Count = 2)
			Then
				Select 'Médico cadastrado em dois consultórios, remova de outro consultório.'  as Retorno;
				leave sp_lbl;
		Else
				Insert Into MovMedicos(FkCadConsultorio, FkCadMedicos) 
				Select p_PkConsultorio, p_PkMedico;

				Select 'Médico cadastrado com sucesso.'  as Retorno;
				leave sp_lbl;
			End if;
Elseif (p_Tipo = 1) -- Delete
	Then
		Delete From MovMedicos
		Where (FkCadMedicos = p_PkMedico) and
		(FkCadConsultorio = p_PkConsultorio);

		Select 'Médico removido com sucesso.'  as Retorno;
		leave sp_lbl;
Elseif (p_Tipo = 2) -- Update
	Then
		Update MovMedicos
		Set FkCadConsultorio = p_PkConsultorio
		Where (FkCadMedicos = p_PkMedico) and
		(FkCadConsultorio = p_PkConsultorio);

		Select 'Médico alterado com sucesso.'  as Retorno;
		leave sp_lbl;
End if;
END;
//

DELIMITER ;

