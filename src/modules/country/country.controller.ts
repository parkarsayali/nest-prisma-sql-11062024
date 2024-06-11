import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CountryService } from './country.services';
import { SuccessError } from 'src/decorators/success-error.decorator';
import { CreateCountryDto } from './country.DTO';
import { UpdateStateDto } from '../states/dto/UpdateState.dto';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  @SuccessError()
  async findAllSelect() {
    try {
      const country = await this.countryService.findAllSelect(true);
      return {
        statusCode: 200,
        success: true,
        message: 'Country retrieved successfully (select).',
        data: country,
      };
    } catch (error) {
      return {
        statusCode: 500,
        success: false,
        errorMessage: error.message,
      };
    }
  }

  //   @Get(':id')
  //   @SuccessError()
  //   async findOne(@Param('id') id: string) {
  //     const parseId = parseInt(id);
  //     try {
  //       if (!parseId) {
  //         console.log('not found loop');
  //         return {
  //           statusCode: 404,
  //           success: false,
  //           errorMessage: 'Country not found',
  //         };
  //       } else {
  //         const country = await this.countryService.findOne(parseId, false); // Default to not including deleted

  //         return {
  //           statusCode: 200,
  //           success: true,
  //           message: 'State retreived successfully.',
  //           data: country,
  //         };
  //       }
  //     } catch (error) {
  //       console.error('Error retrieving state:', error);
  //       return {
  //         statusCode: 500,
  //         success: false,
  //         errorMessage: error.message,
  //       };
  //     }
  //   }
  // countryController

  @Get(':id')
  @SuccessError()
  async findOne(@Param('id') id: string) {
    const parseId = parseInt(id);
    if (isNaN(parseId) || parseId <= 0) {
      return {
        statusCode: 400,
        success: false,
        errorMessage: 'Invalid ID provided',
      };
    }

    try {
      const country = await this.countryService.findOne(parseId, false); // Default to not including deleted
      if (!country) {
        return {
          statusCode: 404,
          success: false,
          errorMessage: 'Country not found',
        };
      }
      return {
        statusCode: 200,
        success: true,
        message: 'Country retrieved successfully.',
        data: country,
      };
    } catch (error) {
      console.error('Error retrieving country:', error);
      return {
        statusCode: 500,
        success: false,
        errorMessage: error.message,
      };
    }
  }

  @Post()
  @SuccessError()
  async create(@Body() data: CreateCountryDto) {
    try {
      const newState = await this.countryService.create(data);

      return {
        statusCode: 201,
        success: true,
        message: 'State created successfully',
        data: newState,
      };
    } catch (error) {
      return {
        statusCode: 500,
        success: false,
        errorMessage: error.message,
      };
    }
  }

  @Put(':id')
  @SuccessError()
  async update(@Param('id') id: string, @Body() data: UpdateStateDto) {
    try {
      const updatedCountry = await this.countryService.update(+id, data);

      return {
        statusCode: 200,
        success: true,
        message: 'State updated successfully',
        data: updatedCountry,
      };
    } catch (error) {
      return {
        statusCode: 500,
        success: false,
        errorMessage: error.message,
      };
    }
  }

  @Delete(':id')
  @SuccessError()
  async delete(@Param('id') id: number) {
    try {
      await this.countryService.delete(+id);
      return {
        statusCode: 200,
        success: true,
        message: 'Country deleted successfully',
        data: {},
      };
    } catch (error) {
      return {
        statusCode: 500,
        success: false,
        errorMessage: error.message,
      };
    }
  }

  @Put('soft-delete/:id')
  @SuccessError()
  async softDelete(@Param('id') id: number) {
    try {
      await this.countryService.softDelete(id);

      return {
        statusCode: 200,
        success: true,
        message: 'Country soft deleted successfully.',
        data: {},
      };
    } catch (error) {
      return {
        statusCode: 500,
        success: false,
        errorMessage: error.message,
      };
    }
  }
}
