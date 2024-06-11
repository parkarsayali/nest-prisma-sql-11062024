import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ApplyTransformInterceptorToMethod } from 'src/decorators/apply-transform-interceptor-to-method.decorator';
import { State } from 'src/models/class.transformer.ts/state';
import { StateRepository } from 'src/core/repository/state';
import StoredProcedureRepository from 'src/core/repository/stored-procedure-repository';

@Injectable()
export class StateService {
  constructor(
    private readonly stateRepo: StateRepository,
    private readonly storedProcedureRepo: StoredProcedureRepository,
  ) {}

  //select
  async findAllSelect() {
    const options = {
      select: {
        state_id: true,
        name: true,
        countries: {
          select: {
            name: true,
          },
        },
      },
    };
    try {
      const result = StateRepository.findAll({}, {}, {}, options);
      console.log('res', result);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findAll(includeDeleted: boolean = false) {
    const options = {
      include: {
        countries: {
          select: {
            name: true,
          },
        },
      },
      includeDeleted,
    };
    try {
      return await StateRepository.findAll({}, {}, {}, options);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  //select & orderby
  async findAllSelectOrderBy() {
    const options = {
      select: {
        state_id: true,
        name: true,
        countries: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        name: 'asc' as const, // Ensure that 'asc' is treated as a literal type
      },
    };
    try {
      return StateRepository.findAll({}, {}, {}, options);
    } catch (error) {
      throw error;
    }
  }

  //inculde & orderby

  async findAllIncludeOrderBy() {
    const options = {
      include: {
        countries: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        name: 'asc' as const, // Ensure that 'asc' is treated as a literal type
      },
    };
    try {
      return StateRepository.findAll({}, {}, {}, options);
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number, includeDeleted: boolean = false) {
    const options = {
      include: {
        countries: {
          select: {
            name: true,
          },
        },
      },
      includeDeleted,
    };
    try {
      console.log('findOne id', id);
      return StateRepository.findOne(id, options);
    } catch (error) {
      console.error('Error retrieving state:', error);
      throw new Error('Failed to retrieve state');
    }
  }

  // state.service.ts
  async findUniqueById(id: number, includeDeleted: boolean = false) {
    const options = {
      includeDeleted,
    };
    try {
      return StateRepository.findUnique({ state_id: id }, options);
    } catch (error) {
      console.error('Error retrieving state:', error);
      throw new Error('Failed to retrieve state');
    }
  }

  // Method to find by alpha_code
  async findUniqueByStateName(name: string, includeDeleted: boolean = false) {
    const options = {
      includeDeleted,
    };
    try {
      return StateRepository.findUnique({ name: name }, options);
    } catch (error) {
      console.error('Error retrieving state:', error);
      throw new Error('Failed to retrieve state');
    }
  }
  // state.controller.ts

  async create(data: Prisma.stateCreateInput) {
    const result = await StateRepository.create(data);
    // console.log('create result', result);
    return result;
  }

  async update(id: number, data: Prisma.stateUpdateInput) {
    return StateRepository.update(id, data);
  }

  async delete(id: number) {
    await StateRepository.delete(id);
    return {};
  }

  async softDelete(id) {
    // Parse the ID to an integer
    const stateId = parseInt(id, 10);
    if (isNaN(stateId)) {
      throw new BadRequestException('Invalid state id');
    }

    await StateRepository.softDelete('state', stateId);
    return {};
  }

  async date() {
    return this.stateRepo.getDate();
  }
  @ApplyTransformInterceptorToMethod(State)
  async getAllSP(): Promise<State[]> {
    return this.storedProcedureRepo.execute('sp_get_state_all_v1');
  }

  /**
   * Method to get the count of states based on given conditions and options.
   * @param conditions - The conditions to filter states.
   * @param options - Additional options for the count query.
   * @returns The count of states matching the given conditions.
   * @throws An error if the count query fails.
   */
  async count(conditions: any, options: any = {}): Promise<number> {
    try {
      // Call the StateRepository to get the count of states based on the given conditions and options.
      return await StateRepository.count(conditions, options);
    } catch (error) {
      // Log the error and throw a new error to indicate the count operation failed.
      console.error('Error counting states:', error);
      throw new Error('Failed to count states');
    }
  }

  /**
   * Method to group states based on specified conditions and aggregator.
   * @param conditions - The conditions to filter states before grouping.
   * @param aggregator - The aggregator defining how to group the states and which aggregates to calculate.
   * @returns The grouped states with the specified aggregations.
   * @throws An error if the grouping query fails.
   */
  async groupBy(conditions: any, aggregator: any): Promise<any> {
    try {
      // Call the StateRepository to group states based on the given conditions and aggregator.
      return await StateRepository.groupBy(conditions, aggregator);
    } catch (error) {
      // Log the error and throw a new error to indicate the grouping operation failed.
      console.error('Error grouping states:', error);
      throw new Error('Failed to group states');
    }
  }

  /**
   * Method to aggregate states based on specified conditions, aggregator, and options.
   * @param conditions - The conditions to filter states before aggregation.
   * @param aggregator - The aggregator defining how to aggregate the states and which aggregates to calculate.
   * @param option - Additional options for the aggregation query.
   * @returns The aggregated states based on the provided conditions and aggregator.
   * @throws An error if the aggregation query fails.
   */
  async aggregate(conditions: any, aggregator: any, option: any): Promise<any> {
    try {
      // Call the StateRepository to aggregate states based on the given conditions, aggregator, and options.
      return await StateRepository.aggregate(conditions, aggregator, option);
    } catch (error) {
      // Log the error and throw a new error to indicate the aggregation operation failed.
      console.error('Error aggregating states:', error);
      throw new Error('Failed to aggregate states');
    }
  }
}
