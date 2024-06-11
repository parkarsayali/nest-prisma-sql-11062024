// import { Module } from '@nestjs/common';
// import { PrismaModule } from 'src/database/prisma.module';
// import stateRepository from 'src/repository/state';
// import { StatesController } from './states.controller';

// @Module({
//   imports: [PrismaModule],
//   providers: [stateRepository, StateService],
//   controllers: [StatesController],
// })
// export class StatesModule {}

import { Module } from '@nestjs/common';
import { StateRepository } from 'src/core/repository/state';
import { StateService } from './states.services';
import { StatesController } from './states.controller';
import { PrismaClient } from '@prisma/client';
import StoredProcedureRepository from 'src/core/repository/stored-procedure-repository';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [
    PrismaClient,
    StoredProcedureRepository,
    StateRepository,
    StateService,
  ],
  controllers: [StatesController],
})
export class StatesModule {}
