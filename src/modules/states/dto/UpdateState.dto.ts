// create-state.dto.ts

import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateStateDto {
  @IsInt()
  @IsOptional()
  state_id?: number;

  @IsString()
  @MaxLength(100)
  @IsOptional()
  name?: string;

  @IsString()
  @MaxLength(10)
  @IsOptional()
  alpha_code?: string;

  @IsInt()
  @IsOptional()
  country_id?: number;

  @IsBoolean()
  @IsOptional()
  is_deleted?: boolean;

  @IsOptional()
  countries?: object;
}
