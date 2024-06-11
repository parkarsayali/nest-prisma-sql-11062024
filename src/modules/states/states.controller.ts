import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';

import { StateService } from './states.services';
import { SuccessError } from 'src/decorators/success-error.decorator';
import { UpdateStateDto } from './dto/UpdateState.dto';
import {
  AggregateStateSuccess,
  CountStateSuccess,
  CreateStateSuccess,
  DeleteStateSuccess,
  GroupStateSuccess,
  UpdateStateSuccess,
  findAllStatesSuccess,
  findOneStateSuccess,
} from 'src/shared/constants/messages/success.messages';
import {
  invalidIDError,
  stateNotFoundError,
} from 'src/shared/constants/messages/error.messages';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateStateDto } from './dto/CreateState.dto';

@Controller('states')
export class StatesController {
  constructor(private readonly stateService: StateService) {}

  /**
   *
   * @returns List of all the states
   */
  @Get()
  @SuccessError()
  @ApiOperation({ summary: 'Get all states' })
  @ApiResponse({
    status: 200,
    description: 'Success/OK',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Retrieved all states successfully',
            },
            data: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  state_id: { type: 'integer', example: 1 },
                  name: {
                    type: 'string',
                    example: 'Andaman and Nicobar Islands',
                  },
                  alpha_code: { type: 'string', example: 'AND' },
                  country_id: { type: 'integer', example: 1 },
                  created_on: {
                    type: 'string',
                    format: 'date-time',
                    example: '2024-05-10T00:00:09.000Z',
                  },
                  modified_on: {
                    type: 'string',
                    format: 'date-time',
                    example: '2024-05-10T00:00:09.000Z',
                  },
                  is_deleted: { type: 'boolean', example: false },
                },
              },
            },
          },
        },
        example: {
          message: 'Retrieved all states successfully',
          data: [
            {
              state_id: 1,
              name: 'Andaman and Nicobar Islands',
              alpha_code: 'AND',
              country_id: 1,
              created_on: '2024-05-10T00:00:09.000Z',
              modified_on: '2024-05-10T00:00:09.000Z',
              is_deleted: false,
            },
            {
              state_id: 2,
              name: 'Maharashtra',
              alpha_code: 'MH',
              country_id: 1,
              created_on: '2024-05-10T00:00:09.000Z',
              modified_on: '2024-05-10T00:00:09.000Z',
              is_deleted: false,
            },
          ],
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            code: { type: 'integer', example: 500 },
            message: {
              type: 'string',
              example: 'There was an error processing your request.',
            },
          },
        },
      },
    },
  })
  async findAll() {
    try {
      const states = await this.stateService.findAll(false); // Default to not including deleted

      return {
        statusCode: 200,
        success: true,
        message: findAllStatesSuccess,
        data: states,
      }; // Return success response
    } catch (error) {
      return {
        statusCode: 500,
        success: false,
        errorMessage: error.message,
      };
    }
  }

  /**
   *
   * @returns List of all the states including soft-deleted
   */
  @Get('/include-all')
  @SuccessError()
  async findIncludeAll() {
    try {
      const states = await this.stateService.findAll(true);
      return {
        statusCode: 200,
        success: true,
        message: findAllStatesSuccess,
        data: states,
      };
    } catch (error) {
      return {
        statusCode: 500,
        success: false,
        errorMessage: error.message,
      };
    }
  }

  /**
   *
   * @returns List of all the states with Select
   */
  @Get('/select')
  @SuccessError()
  async findAllSelect() {
    try {
      const states = await this.stateService.findAllSelect();
      return {
        statusCode: 200,
        success: true,
        message: findAllStatesSuccess,
        data: states,
      };
    } catch (error) {
      return {
        statusCode: 500,
        success: false,
        errorMessage: error.message,
      };
    }
  }

  /**
   *
   * @returns List of all the states wih Select and OrderBy
   */
  @Get('/selectOrderBy')
  @SuccessError()
  async findAllSelectOrder() {
    try {
      const states = await this.stateService.findAllSelectOrderBy();

      return {
        statusCode: 200,
        success: true,
        message: findAllStatesSuccess,
        data: states,
      };
    } catch (error) {
      return {
        statusCode: 500,
        success: false,
        errorMessage: error.message,
      };
    }
  }

  /**
   *
   * @returns List of all the states wih included relations and OrderBy
   */
  @Get('/includeOrderBy')
  @SuccessError()
  async findAllIIncludeOrder() {
    try {
      const states = await this.stateService.findAllSelectOrderBy();

      return {
        statusCode: 200,
        success: true,
        message: findAllStatesSuccess,

        data: states,
      };
    } catch (error) {
      return {
        statusCode: 500,
        success: false,
        errorMessage: error.message,
      };
    }
  }

  @Get('/date')
  @SuccessError()
  async getDate() {
    try {
      const date = await this.stateService.date();

      return {
        statusCode: 200,
        success: true,
        message: 'Retrieved date successfully.',
        data: date,
      };
    } catch (error) {
      return {
        statusCode: 500,
        success: false,
        errorMessage: error.message,
      };
    }
  }
  /**
   *
   * @returns List of all the states using stored-procedures
   */
  @Get('/sp')
  @SuccessError()
  async getAllSP() {
    try {
      const spData = await this.stateService.getAllSP();
      return {
        statusCode: 200,
        success: true,
        message: findAllStatesSuccess,
        data: spData,
      };
    } catch (error) {
      console.log('SP error', error);
      return {
        statusCode: 500,
        success: false,
        errorMessage: error.message,
      };
    }
  }

  /**
   *
   * @param id : state_id
   * @returns A single state
   */
  @Get(':id')
  @SuccessError()
  @ApiOperation({
    summary: 'Get single state by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Success/OK',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            state_id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Andaman and Nicobar Islands' },
            alpha_code: { type: 'string', example: 'AND' },
            country_id: { type: 'integer', example: 1 },
            created_on: { type: 'string', example: '2024-05-10T00:00:09.000Z' },
            modified_on: {
              type: 'string',
              example: '2024-05-10T00:00:09.000Z',
            },
            is_deleted: { type: 'boolean', example: false },
          },
        },
      },
      'application/xml': {
        schema: {
          type: 'object',
          properties: {
            state_id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Andaman and Nicobar Islands' },
            alpha_code: { type: 'string', example: 'AND' },
            country_id: { type: 'integer', example: 1 },
            created_on: { type: 'string', example: '2024-05-10T00:00:09.000Z' },
            modified_on: {
              type: 'string',
              example: '2024-05-10T00:00:09.000Z',
            },
            is_deleted: { type: 'boolean', example: false },
          },
          xml: {
            name: 'RetrieveStateResponseDto',
          },
        },
        example: `
          <state_id>1</state_id>
          <name>Andaman and Nicobar Islands</name>
          <alpha_code>AND</alpha_code>
          <country_id>1</country_id>
          <created_on>2024-05-10T00:00:09.000Z</created_on>
          <modified_on>2024-05-10T00:00:09.000Z</modified_on>
          <is_deleted>false</is_deleted>
        `,
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid id provided',
  })
  @ApiResponse({
    status: 404,
    description: 'State not found',
  })
  async findOne(@Param('id') id: string) {
    const parseId = parseInt(id);
    if (isNaN(parseId) || parseId <= 0) {
      return {
        statusCode: 400,
        success: false,
        errorMessage: invalidIDError,
      };
    }

    try {
      const state = await this.stateService.findOne(parseId, false); // Default to not including deleted
      if (!state) {
        return {
          statusCode: 404,
          success: false,
          errorMessage: stateNotFoundError,
        };
      }
      return {
        statusCode: 200,
        success: true,
        message: findOneStateSuccess,
        data: state,
      };
    } catch (error) {
      return {
        statusCode: 500,
        success: false,
        errorMessage: error.message,
      };
    }
  }
  @Get('/softdeleted/:id')
  @SuccessError()
  async findOneDeleted(@Param('id') id: string) {
    const parseId = parseInt(id);
    try {
      const state = await this.stateService.findOne(parseId, true);
      if (!state) {
        return {
          statusCode: 404,
          success: false,
          message: stateNotFoundError,
        };
      }
      return {
        statusCode: 200,
        success: true,
        message: findOneStateSuccess,
        data: state,
      };
    } catch (error) {
      return {
        statusCode: 500,
        success: false,
        errorMessage: error.message,
      };
    }
  }
  /**
   *
   * @param id unique parameter
   * @returns unique record based on unique parameter provided
   */
  @Get('id/:id')
  @SuccessError()
  async findUniqueById(@Param('id') id: string) {
    const parseId = parseInt(id);
    try {
      const state = await this.stateService.findUniqueById(parseId, false); // Default to not including deleted
      if (!state) {
        return {
          statusCode: 404,
          success: false,
          message: stateNotFoundError,
        };
      } else {
        return {
          statusCode: 200,
          success: true,
          message: findOneStateSuccess,
          data: state,
        };
      }
    } catch (error) {
      return {
        statusCode: 500,
        success: false,
        errorMessage: error.message,
      };
    }
  }

  /**
   *
   * @param name unique parameter
   * @returns unique record based on unique parameter provided
   */
  @Get('name/:name')
  @SuccessError()
  async findUniqueByStateName(@Param('name') name: string) {
    try {
      const state = await this.stateService.findUniqueByStateName(name, false); // Default to not including deleted
      console.log('findUnique', state);
      if (!state) {
        return {
          statusCode: 404,
          success: false,
          messages: stateNotFoundError,
        };
      }
      return {
        statusCode: 200,
        success: true,
        message: findOneStateSuccess,
        data: state,
      };
    } catch (error) {
      return {
        statusCode: 500,
        success: false,
        errorMessage: error.message,
      };
    }
  }

  /**
   *
   * @param data create state payload
   * @returns statusCode,success flag,message,data: newly created state
   */
  @Post()
  @SuccessError()
  @ApiOperation({ summary: 'Post state' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'String',
          example: 'Maharashtra',
          description: 'State name',
        },
        alpha_code: {
          type: 'String',
          example: 'MH',
          description: 'Short name for state',
        },
        country_id: {
          type: 'Integer',
          example: 1,
          description: 'Unique country id',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Success/OK',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'Andaman and Nicobar Islands' },
            alpha_code: { type: 'string', example: 'AND' },
            country_id: { type: 'integer', example: 1 },
          },
        },
      },
      'application/xml': {
        schema: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'Andaman and Nicobar Islands' },
            alpha_code: { type: 'string', example: 'AND' },
            country_id: { type: 'integer', example: 1 },
          },
          xml: {
            name: 'RetrieveStateResponseDto',
          },
        },
        example: `
        <name>Andaman and Nicobar Islands</name>
        <alpha_code>AND</alpha_code>
        <country_id>1</country_id>
        `,
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async create(@Body() data: CreateStateDto) {
    try {
      const newState = await this.stateService.create(data);

      return {
        statusCode: 201,
        success: true,
        message: CreateStateSuccess,
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
  /**
   *
   * @param id state_id
   * @param data update payload
   * @returns statusCode,success flag,message,data - updated state
   */
  @Put(':id')
  @SuccessError()
  @ApiOperation({ summary: 'Update state using state id' })
  @ApiParam({
    name: 'id',
    type: 'Integer',
    description: 'Enter state id',
    required: true,
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'String',
          example: 'Maharashtra',
          description: 'State name',
        },
        alpha_code: {
          type: 'String',
          example: 'MH',
          description: 'Short name for state',
        },
        country_id: {
          type: 'Integer',
          example: 1,
          description: 'Country id',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Success/OK',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'Andaman and Nicobar Islands' },
            alpha_code: { type: 'string', example: 'AND' },
            country_id: { type: 'integer', example: 1 },
          },
        },
      },
      'application/xml': {
        schema: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'Andaman and Nicobar Islands' },
            alpha_code: { type: 'string', example: 'AND' },
            country_id: { type: 'integer', example: 1 },
          },
          xml: {
            name: 'RetrieveStateResponseDto',
          },
        },
        example: `
        <name>Andaman and Nicobar Islands</name>
        <alpha_code>AND</alpha_code>
        <country_id>1</country_id>
        `,
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid id provided',
  })
  @ApiResponse({
    status: 404,
    description: 'State not found',
  })
  @ApiResponse({
    status: 422,
    description: 'Validation exception',
  })
  async update(@Param('id') id: string, @Body() data: UpdateStateDto) {
    try {
      const updatedState = await this.stateService.update(+id, data);

      return {
        statusCode: 200,
        success: true,
        message: UpdateStateSuccess,
        data: updatedState,
      };
    } catch (error) {
      return {
        statusCode: 500,
        success: false,
        errorMessage: error.message,
      };
    }
  }
  /**
   *
   * @param id state_id
   * @returns statusCode, success,message
   */
  @Delete(':id')
  @SuccessError()
  @ApiOperation({ summary: 'Delete state using state id' })
  @ApiParam({
    name: 'id',
    type: 'Integer',
    description: 'Enter state id',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'State deleted',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            code: { type: 'integer', example: 200 },
            message: {
              type: 'string',
              example: 'State deleted successfully.',
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid id provided',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async delete(@Param('id') id: number) {
    try {
      await this.stateService.delete(+id);
      return {
        statusCode: 200,
        success: true,
        message: DeleteStateSuccess,
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
  /**
   *
   * @param id state_id
   * @returns statusCode,success,message
   */
  @Put('soft-delete/:id')
  @SuccessError()
  @ApiOperation({
    summary: 'Soft delete state by id',
  })
  @ApiParam({
    name: 'id',
    type: 'Integer',
    description: 'Enter state id',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'State soft deleted',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            code: { type: 'integer', example: 200 },
            message: {
              type: 'string',
              example: 'State soft deleted successfully.',
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async softDelete(@Param('id') id: number) {
    try {
      await this.stateService.softDelete(id);

      return {
        statusCode: 200,
        success: true,
        message: DeleteStateSuccess,
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

  /**
   * Endpoint to get the count of states with a fixed alpha code 'LA'.
   * @param res - The response object.
   * @returns A response with the count of states.
   */
  @Get('/count/data')
  @SuccessError()
  async count() {
    try {
      // Call the stateService to get the count of states filtered by the fixed alpha code 'LA'.
      const count = await this.stateService.count({ alpha_code: 'LA' }, {});

      // Return a successful response with the count of states.
      return {
        statusCode: 200,
        success: true,
        message: CountStateSuccess,
        data: count,
      };
    } catch (error) {
      // Handle errors and return an internal server error response.
      return {
        statusCode: 500,
        success: false,
        errorMessage: error.message,
      };
    }
  }

  @Get('/group-by/data')
  @SuccessError()
  async groupBy() {
    try {
      // Define conditions for grouping (e.g., filter to include only non-deleted states).
      const conditions = {};

      // Define the aggregator for grouping:
      // - Group by 'is_deleted'.
      // - Count the number of states in each group.
      const aggregator = {
        by: ['is_deleted'],
        _count: {
          state_id: true,
        },
      };

      // Call the stateService to perform the grouping operation.
      const groupedStates = await this.stateService.groupBy(
        conditions,
        aggregator,
      );

      // Return a successful response with the grouped states.

      return {
        statusCode: 200,
        success: true,
        message: GroupStateSuccess,
        data: groupedStates,
      };
    } catch (error) {
      // Handle errors and return an internal server error response.
      return {
        statusCode: 500,
        success: false,
        errorMessage: error.message,
      };
    }
  }

  @Get('/aggregate/data')
  async aggregate() {
    try {
      // Define the aggregator for aggregation:
      // - Calculate the maximum state_id.
      // - Count the number of country_id.
      // - Filter to include only records where country_id is 0.
      const aggregator = {
        _max: {
          state_id: true,
        },
        _count: {
          country_id: true,
        },
        where: {
          country_id: 1,
        },
      };

      // Perform the aggregation using the stateService
      const aggregationResult = await this.stateService.aggregate(
        {},
        aggregator,
        {},
      );

      // Return a successful response with the aggregation result

      return {
        statusCode: 200,
        success: true,
        message: AggregateStateSuccess,
        data: aggregationResult,
      };
    } catch (error) {
      // Handle errors and return an internal server error response
      return {
        statusCode: 500,
        success: false,
        errorMessage: error.message,
      };
    }
  }
}
