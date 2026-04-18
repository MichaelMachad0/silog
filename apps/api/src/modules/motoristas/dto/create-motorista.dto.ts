import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength
} from 'class-validator';

export class CreateMotoristaDto {
  @IsString()
  @MaxLength(200)
  nome!: string;

  /** CPF com ou sem máscara; apenas dígitos são considerados. */
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.replace(/\D/g, '') : value))
  @Length(11, 11, { message: 'cpf deve conter 11 dígitos' })
  @Matches(/^\d{11}$/)
  cpf!: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  telefone?: string;

  @IsOptional()
  @IsDateString()
  dataNascimento?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  cnhNumero?: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  cnhCategoria?: string;

  @IsOptional()
  @IsDateString()
  cnhValidade?: string;

  @IsOptional()
  @IsBoolean()
  ear?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  rntrc?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  rntrcCategoria?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  status?: string;

  @IsOptional()
  @IsString()
  @MaxLength(5000)
  observacoes?: string;
}
