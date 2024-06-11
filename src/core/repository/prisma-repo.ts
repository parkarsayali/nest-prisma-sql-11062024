// /* eslint-disable @typescript-eslint/ban-ts-comment */

import {
  PrismaClient,
  Prisma,
  city,
  company,
  country,
  project,
  state,
} from '@prisma/client';
import _ from 'lodash';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyRecord = Record<string, any>;

export type BaseOption<Include, Select> = {
  include?: Include;
  select?: Select;
  // includeDeleted?: boolean;
};

export type Find<Select, Include, Cursor, Order, Distinct> = BaseOption<
  Include,
  Select
> & {
  cursor?: Cursor;
  take?: number;
  skip?: number;
  orderBy?: Prisma.Enumerable<Order>;
  distinct?: Distinct;
};

export type CountArgs<Select, Cursor, Order, Distinct> = Omit<
  Find<Select, never, Cursor, Order, Distinct>,
  'include'
>;

export type Aggregate<Cursor, Order, Distinct> = Omit<
  CountArgs<never, Cursor, Order, Distinct>,
  'select' | 'distinct'
>;

export const prisma = new PrismaClient({
  log: ['error', 'info', 'query', 'warn'],
});
// console.log('prisma', prisma);
export const models = _?.omit(prisma, [
  '$on',
  '$connect',
  '$disconnect',
  '$use',
  '$executeRaw',
  '$executeRawUnsafe',
  '$queryRaw',
  '$queryRawUnsafe',
  '$transaction',
]);

export const MODELS_NAME = {
  CITY: 'city',
  COMPANY: 'company',
  COUNTRY: 'country',
  PROJECT: 'project',
  STATE: 'state',
} as const;

// eslint-disable-next-line @typescript-eslint/ban-types
export type ModelStructure = {
  city: city;
  company: company;
  country: country;
  project: project;
  state: state;
};

export type ModelName = keyof ModelStructure;

export type ModelScalarFields<T extends keyof ModelStructure> =
  Prisma.Enumerable<keyof ModelStructure[T]>;

export type ModelTypes<T = unknown> = {
  city: {
    Where: Prisma.cityWhereInput;
    Select: Prisma.citySelect;
    Include: unknown;
    Create: Prisma.cityCreateInput | Prisma.cityUncheckedCreateInput;
    Update: Prisma.cityUpdateInput | Prisma.cityUncheckedUpdateInput;
    Cursor: unknown;
    Order: Prisma.cityOrderByWithRelationInput;
    Delegate: Prisma.cityDelegate<undefined>;
    GroupBy: Prisma.CityGroupByOutputType;
    // @ts-ignore
    Return: Prisma.cityGetPayload<T>;
  };
  company: {
    Where: Prisma.companyWhereInput;
    Select: Prisma.companySelect;
    Include: unknown;
    Create: Prisma.companyCreateInput | Prisma.companyUncheckedCreateInput;
    Update: Prisma.companyUpdateInput | Prisma.companyUncheckedUpdateInput;
    Cursor: unknown;
    Order: Prisma.companyOrderByWithRelationInput;
    Delegate: Prisma.companyDelegate<undefined>;
    GroupBy: Prisma.CompanyGroupByOutputType;
    // @ts-ignore
    Return: Prisma.companyGetPayload<T>;
  };
  country: {
    Where: Prisma.countryWhereInput;
    Select: Prisma.countrySelect;
    Include: unknown;
    Create: Prisma.countryCreateInput | Prisma.countryUncheckedCreateInput;
    Update: Prisma.countryUpdateInput | Prisma.countryUncheckedUpdateInput;
    Cursor: unknown;
    Order: Prisma.countryOrderByWithRelationInput;
    Delegate: Prisma.countryDelegate<undefined>;
    GroupBy: Prisma.CountryGroupByOutputType;
    // @ts-ignore
    Return: Prisma.countryGetPayload<T>;
  };
  project: {
    Where: Prisma.projectWhereInput;
    Select: Prisma.projectSelect;
    Include: unknown;
    Create: Prisma.projectCreateInput | Prisma.projectUncheckedCreateInput;
    Update: Prisma.projectUpdateInput | Prisma.projectUncheckedUpdateInput;
    Cursor: unknown;
    Order: Prisma.projectOrderByWithRelationInput;
    Delegate: Prisma.projectDelegate<undefined>;
    GroupBy: Prisma.ProjectGroupByOutputType;
    // @ts-ignore
    Return: Prisma.projectGetPayload<T>;
  };
  state: {
    Where: Prisma.stateWhereInput;
    Select: Prisma.stateSelect;
    Include: unknown;
    Create: Prisma.stateCreateInput | Prisma.stateUncheckedCreateInput;
    Update: Prisma.stateUpdateInput | Prisma.stateUncheckedUpdateInput;
    Cursor: unknown;
    Order: Prisma.stateOrderByWithRelationInput;
    Delegate: Prisma.stateDelegate<undefined>;
    GroupBy: Prisma.StateGroupByOutputType;
    // @ts-ignore
    Return: Prisma.stateGetPayload<T>;
  };
};
