import {
  IsString,
  IsInt,
  IsBoolean,
  IsOptional,
  Length,
  Min,
  Max,
  Matches,
} from 'class-validator';

export class UpdateCountryDto {
  @IsOptional()
  @IsString()
  @Length(1, 100)
  name?: string;

  @IsOptional()
  @IsString()
  @Length(2, 2)
  alpha_2?: string;

  @IsOptional()
  @IsString()
  @Length(3, 3)
  alpha_3?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  phone_code?: number;

  @IsOptional()
  @IsString()
  @Length(3, 3)
  currency?: string;

  @IsOptional()
  @IsString()
  @Length(1, 10)
  currency_symbol?: string;

  @IsOptional()
  @IsBoolean()
  is_deleted?: boolean;
}
