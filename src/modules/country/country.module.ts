import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CountryRepository } from 'src/core/repository/country';
import { CountryController } from './country.controller';
import { CountryService } from './country.services';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [PrismaClient, CountryRepository, CountryService],
  controllers: [CountryController],
})
export class CountryModule {}
