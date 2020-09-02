ALTER PROCEDURE [dbo].[PcVinculaMedicoConsultorio] @Tipo int, @PkMedico int, @PkConsultorio int    
as     

Declare @Count int

If (@Tipo = 0)
	Begin
		Select @Count = Count(Pk)
		From MovMedicos
		Where (FkCadMedicos  = @PkMedico)

		If (@Count = 2)
			Begin
				Select 'M�dico cadastrado em dois consult�rios, remova de outro consult�rio.'  as Retorno
				return
			End
		Else
			Begin
				Insert Into MovMedicos(FkCadConsultorio, FkCadMedicos) 
				Select @PkConsultorio, @PkMedico

				Select 'M�dico cadastrado com sucesso.'  as Retorno
				return
			End
	End
Else
	Begin
		Delete From MovMedicos
		Where(FkCadConsultorio = @PkConsultorio) and
		(FkCadMedicos = @PkMedico)

		Select 'M�dico removido com sucesso.'  as Retorno
		return
	End

	-- MySql

	DELIMITER //

CREATE PROCEDURE PcVinculaMedicoConsultorio ( p_Tipo int, p_PkMedico int, p_PkConsultorio int)    
sp_lbl:
begin     

Declare v_Count int;

If (p_Tipo = 0)
	Then
		Select Count(Pk) Into v_Count
		From MovMedicos
		Where (FkCadMedicos  = p_PkMedico);

		If (v_Count = 2)
			Then
				Select 'M�dico cadastrado em dois consult�rios.'  as Retorno;
				leave sp_lbl;
		Else
				Insert Into MovMedicos(FkCadConsultorio, FkCadMedicos) 
				Select p_PkConsultorio, p_PkMedico;

				Select 'M�dico cadastrado com sucesso.'  as Retorno;
				leave sp_lbl;
			End if;
Else
		Delete From MovMedicos
		Where(FkCadConsultorio = p_PkConsultorio) and
		(FkCadMedicos = p_PkMedico);

		Select 'M�dico removido com sucesso.'  as Retorno;
		leave sp_lbl;
	End if;
END;
//

DELIMITER ;

