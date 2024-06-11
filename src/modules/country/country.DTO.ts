import {
  IsString,
  IsInt,
  IsBoolean,
  IsOptional,
  IsISO31661Alpha2,
  IsISO31661Alpha3,
  Length,
  Min,
  Max,
  Matches,
} from 'class-validator';

export class CreateCountryDto {
  @IsString()
  @Length(1, 100)
  name: string;

  @IsISO31661Alpha2()
  @IsOptional() // Since default value is an empty string
  alpha_2: string;

  @IsISO31661Alpha3()
  @IsOptional() // Since default value is an empty string
  alpha_3: string;

  @IsInt()
  @Min(0)
  @Max(999)
  phone_code: number;

  @IsString()
  @Length(3, 3)
  currency: string;

  @IsString()
  @Length(1, 10)
  currency_symbol: string;

  @IsOptional() // This will be set by the database
  created_on?: Date;

  @IsOptional() // This is optional as it can be null
  modified_on?: Date;

  @IsBoolean()
  @IsOptional() // This will default to false if not provided
  is_deleted?: boolean;
}

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
