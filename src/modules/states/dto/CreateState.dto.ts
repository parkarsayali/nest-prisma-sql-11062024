import {
  IsString,
  IsInt,
  IsBoolean,
  IsOptional,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateStateDto {
  @IsInt()
  @IsOptional()
  state_id?: number;

  @IsString()
  @MaxLength(100)
  name: string;

  @IsString()
  @MaxLength(10)
  alpha_code: string;

  @IsInt()
  country_id: number;

  @IsBoolean()
  @IsOptional()
  is_deleted?: boolean;

  countries: object;
}
