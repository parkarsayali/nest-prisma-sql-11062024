import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CountryRepository } from 'src/core/repository/country';
import { CreateCountryDto, UpdateCountryDto } from './country.DTO';

@Injectable()
export class CountryService {
  constructor(private readonly countryRepo: CountryRepository) {}

  //findAll with select
  async findAllSelect(includeDeleted = false) {
    const options = {
      select: {
        country_id: true,
        currency_symbol: true,
      },
      includeDeleted,
    };
    try {
      const result = CountryRepository.findAll({}, {}, {}, options);
      console.log('res', result);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  //find One
  async findOne(id: number, includeDeleted: boolean = false) {
    const options = {
      includeDeleted,
    };
    try {
      console.log('findOne id', id);
      return CountryRepository.findOne(id, options);
    } catch (error) {
      console.error('Error retrieving state:', error);
      throw new Error('Failed to retrieve state');
    }
  }

  //create country
  async create(data: CreateCountryDto) {
    const result = await CountryRepository.create(data);
    return result;
  }

  //update country
  async update(id: number, data: UpdateCountryDto) {
    return CountryRepository.update(id, data);
  }

  //soft delete country
  async softDelete(id) {
    // Parse the ID to an integer
    const countryId = parseInt(id, 10);
    if (isNaN(countryId)) {
      throw new BadRequestException('Invalid state id');
    }

    await CountryRepository.softDelete('country', countryId);
    return {};
  }

  //delete country
  async delete(id: number) {
    await CountryRepository.delete(id);
    return {};
  }
}
