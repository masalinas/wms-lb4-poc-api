import {Entity, model, property, belongsTo} from '@loopback/repository';

import {Stock} from './stock.model';
import {PalletType} from './pallet-type.model';

@model({
  name: 'Pallet'
})
export class Pallet extends Entity {
  @property({
    id: true,
    generated: true,
    type: 'string',
    description: 'Pallet indentifier',
  })
  id: string;

  @property({
    description: 'Pallet SSCC',
    required: true,
  })
  sscc: string;

  @belongsTo(() => PalletType)
  palletTypeId: string;

  @property.array(Stock)
  stocks?: Stock[];

  constructor(data?: Partial<Pallet>) {
    super(data);
  }
}

export interface PalletRelations {
  // describe navigational properties here
}

export type PalletWithRelations = Pallet & PalletRelations
