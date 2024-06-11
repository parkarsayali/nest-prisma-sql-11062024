import _ from 'lodash';
import {
  MODELS_NAME,
  ModelScalarFields,
  ModelStructure,
  ModelTypes,
} from './prisma-repo';
import BaseRepository from './baseRepository';

// This type will be used if you want to extends the functions in project Class

/* eslint-disable @typescript-eslint/no-unused-vars */
type Where = ModelTypes[typeof MODELS_NAME.PROJECT]['Where'];
type Select = ModelTypes[typeof MODELS_NAME.PROJECT]['Select'];
type Include = ModelTypes[typeof MODELS_NAME.PROJECT]['Include'];
type Create = ModelTypes[typeof MODELS_NAME.PROJECT]['Create'];
type Update = ModelTypes[typeof MODELS_NAME.PROJECT]['Update'];
type Cursor = ModelTypes[typeof MODELS_NAME.PROJECT]['Cursor'];
type Order = ModelTypes[typeof MODELS_NAME.PROJECT]['Order'];
type Delegate = ModelTypes[typeof MODELS_NAME.PROJECT]['Delegate'];
type GroupBy = ModelTypes[typeof MODELS_NAME.PROJECT]['GroupBy'];
type Scalar = ModelScalarFields<typeof MODELS_NAME.PROJECT>;
type Model = ModelStructure[typeof MODELS_NAME.PROJECT];
/*  eslint-enable @typescript-eslint/no-unused-vars */

class project extends BaseRepository(MODELS_NAME.PROJECT) {}

export default project;
