import _ from 'lodash';
import BaseRepository from 'src/repository/baseRepository';
import {
  MODELS_NAME,
  ModelScalarFields,
  ModelStructure,
  ModelTypes,
} from 'src/repository/prisma-repo';

// This type will be used if you want to extends the functions in city Class

/* eslint-disable @typescript-eslint/no-unused-vars */
type Where = ModelTypes[typeof MODELS_NAME.CITY]['Where'];
type Select = ModelTypes[typeof MODELS_NAME.CITY]['Select'];
type Include = ModelTypes[typeof MODELS_NAME.CITY]['Include'];
type Create = ModelTypes[typeof MODELS_NAME.CITY]['Create'];
type Update = ModelTypes[typeof MODELS_NAME.CITY]['Update'];
type Cursor = ModelTypes[typeof MODELS_NAME.CITY]['Cursor'];
type Order = ModelTypes[typeof MODELS_NAME.CITY]['Order'];
type Delegate = ModelTypes[typeof MODELS_NAME.CITY]['Delegate'];
type GroupBy = ModelTypes[typeof MODELS_NAME.CITY]['GroupBy'];
type Scalar = ModelScalarFields<typeof MODELS_NAME.CITY>;
type Model = ModelStructure[typeof MODELS_NAME.CITY];
/*  eslint-enable @typescript-eslint/no-unused-vars */

class city extends BaseRepository(MODELS_NAME.CITY) {}

export default city;
