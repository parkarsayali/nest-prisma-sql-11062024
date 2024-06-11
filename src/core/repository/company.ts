import _ from 'lodash';
import {
  MODELS_NAME,
  ModelScalarFields,
  ModelStructure,
  ModelTypes,
} from './prisma-repo';
import BaseRepository from './baseRepository';

// This type will be used if you want to extends the functions in company Class

/* eslint-disable @typescript-eslint/no-unused-vars */
type Where = ModelTypes[typeof MODELS_NAME.COMPANY]['Where'];
type Select = ModelTypes[typeof MODELS_NAME.COMPANY]['Select'];
type Include = ModelTypes[typeof MODELS_NAME.COMPANY]['Include'];
type Create = ModelTypes[typeof MODELS_NAME.COMPANY]['Create'];
type Update = ModelTypes[typeof MODELS_NAME.COMPANY]['Update'];
type Cursor = ModelTypes[typeof MODELS_NAME.COMPANY]['Cursor'];
type Order = ModelTypes[typeof MODELS_NAME.COMPANY]['Order'];
type Delegate = ModelTypes[typeof MODELS_NAME.COMPANY]['Delegate'];
type GroupBy = ModelTypes[typeof MODELS_NAME.COMPANY]['GroupBy'];
type Scalar = ModelScalarFields<typeof MODELS_NAME.COMPANY>;
type Model = ModelStructure[typeof MODELS_NAME.COMPANY];
/*  eslint-enable @typescript-eslint/no-unused-vars */

class company extends BaseRepository(MODELS_NAME.COMPANY) {}

export default company;
