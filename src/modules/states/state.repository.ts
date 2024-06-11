import _ from 'lodash';

import BaseRepository from 'src/repository/baseRepository';
import {
  MODELS_NAME,
  ModelScalarFields,
  ModelStructure,
  ModelTypes,
} from 'src/repository/prisma-repo';

// This type will be used if you want to extends the functions in state Class

/* eslint-disable @typescript-eslint/no-unused-vars */
type Where = ModelTypes[typeof MODELS_NAME.STATE]['Where'];
type Select = ModelTypes[typeof MODELS_NAME.STATE]['Select'];
type Include = ModelTypes[typeof MODELS_NAME.STATE]['Include'];
type Create = ModelTypes[typeof MODELS_NAME.STATE]['Create'];
type Update = ModelTypes[typeof MODELS_NAME.STATE]['Update'];
type Cursor = ModelTypes[typeof MODELS_NAME.STATE]['Cursor'];
type Order = ModelTypes[typeof MODELS_NAME.STATE]['Order'];
type Delegate = ModelTypes[typeof MODELS_NAME.STATE]['Delegate'];
type GroupBy = ModelTypes[typeof MODELS_NAME.STATE]['GroupBy'];
type Scalar = ModelScalarFields<typeof MODELS_NAME.STATE>;
type Model = ModelStructure[typeof MODELS_NAME.STATE];
/*  eslint-enable @typescript-eslint/no-unused-vars */
// @Injectable()
export class StateRepository extends BaseRepository(MODELS_NAME.STATE) {
  static getDate() {
    throw new Error('Method not implemented.');
  }
  constructor() {
    super();
  }

  async getDate(): Promise<any> {
    try {
      return Date();
    } catch (error) {
      console.error('Error fetching states:', error);
      throw error;
    }
  }
}
