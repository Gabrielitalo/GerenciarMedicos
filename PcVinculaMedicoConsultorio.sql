-----------------------------------------------------------------------------------------------------------------------------------------------------------
-- Versão MSSQL

ALTER PROCEDURE [dbo].[PcVinculaMedicoConsultorio] @Tipo int, @Pk int, @PkMedico int, @PkConsultorio int    
as     

Declare @Count int

If (@Tipo = 0)
	Begin
		If (@Pk = 0)
			Begin
				Select @Count = Count(Pk)
				From MovMedicos
				Where (FkCadMedicos  = @PkMedico)
			End
		Else
			Begin
				Set @Count = 0
			End

		If (@Count = 2)
			Begin
				Select 'Médico cadastrado em dois consultórios, remova de outro consultório.'  as Retorno
				return
			End
		Else
			Begin
				If (@Pk = 0)
					Begin
						Insert Into MovMedicos(FkCadConsultorio, FkCadMedicos) 
						Select @PkConsultorio, @PkMedico

						Select 'Médico cadastrado com sucesso.'  as Retorno
						return
					End
				Else
					Begin
						Update MovMedicos
						Set FkCadConsultorio = @PkConsultorio
						Where (Pk = @Pk)

						Select 'Médico alterado com sucesso.'  as Retorno
						return
					End

			End
	End
Else
	Begin
		Delete From MovMedicos
		Where(Pk = @Pk) 

		Select 'Médico removido com sucesso.'  as Retorno
		return
	End

	-----------------------------------------------------------------------------------------------------------------------------------------------------------
	-- Versão MySql
DELIMITER //

CREATE PROCEDURE PcVinculaMedicoConsultorio ( p_Tipo int, p_Pk int, p_PkMedico int, p_PkConsultorio int)    
sp_lbl:
begin     

Declare v_Count int;

If (p_Tipo = 0)
	Then
		If (p_Pk = 0)
			Then
				Select Count(Pk) Into v_Count
				From MovMedicos
				Where (FkCadMedicos  = p_PkMedico);
		Else
				Set v_Count = 0;
			End if;

		If (v_Count = 2)
			Then
				Select 'Médico cadastrado em dois consultórios, remova de outro consultório.'  as Retorno;
				leave sp_lbl;
		Else
				If (p_Pk = 0)
					Then
						Insert Into MovMedicos(FkCadConsultorio, FkCadMedicos) 
						Select p_PkConsultorio, p_PkMedico;

						Select 'Médico cadastrado com sucesso.'  as Retorno;
						leave sp_lbl;
				Else
						Update MovMedicos
						Set FkCadConsultorio = p_PkConsultorio
						Where (Pk = p_Pk);

						Select 'Médico alterado com sucesso.'  as Retorno;
						leave sp_lbl;
					End if;

			End if;
Else
		Delete From MovMedicos
		Where(Pk = p_Pk); 

		Select 'Médico removido com sucesso.'  as Retorno;
		leave sp_lbl;
	End if;
END;
//

DELIMITER ;



