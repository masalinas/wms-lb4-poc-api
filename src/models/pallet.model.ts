import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';

import {Stock, StockWithRelations} from './stock.model';
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

  @hasMany(() => Stock)
  stocks: Stock[];

  @belongsTo(() => PalletType)
  palletTypeId: string;

  constructor(data?: Partial<Pallet>) {
    super(data);
  }
}

export interface PalletRelations {
  // describe navigational properties here
}

export type PalletWithRelations = Pallet & PalletRelations
