import { AuthModule } from '../auth/auth.module';

import { StatesModule } from './states/states.module';

import { CityModule } from './city/city.module';

import { CountryModule } from './country/country.module';

export const Modules = [AuthModule, StatesModule, CityModule, CountryModule];
