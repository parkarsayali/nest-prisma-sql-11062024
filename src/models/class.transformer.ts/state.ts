import { Expose } from 'class-transformer';

export class State {
  @Expose({ name: 'f0' })
  state_id: number;

  @Expose({ name: 'f1' })
  name: string;

  @Expose({ name: 'f2' })
  alpha_code: string;

  @Expose({ name: 'f3' })
  country_id: number;

  @Expose({ name: 'f4' })
  country_name: string;
}
