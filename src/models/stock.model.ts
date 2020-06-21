import {Entity, model, property, belongsTo} from '@loopback/repository';

import {Product} from './product.model';
import {Pallet} from './pallet.model';

@model({
  name: 'Stock'
})
export class Stock extends Entity {
  @property({
    id: true,
    generated: true,
    type: 'string',
    description: 'Stock indentifier',
  })
  id: string;

  @belongsTo(() => Pallet)
  palletId: string;

  @belongsTo(() => Product)
  productId: string;

  @property({
    type: 'string',
    description: 'Stock lot',
  })
  lot?: string;

  @property({
    type: 'date',
    description: 'Stock expedition date',
  })
  expeditionDate?: Date;

  @property({
    type: 'string',
    description: 'Stock serial number',
  })
  serialNumber?: string;

  @property({
    type: 'number',
    required: true,
    description: 'Stock quantity',
  })
  quantity: number;

  constructor(data?: Partial<Stock>) {
    super(data);
  }
}

export interface StockRelations {
  // describe navigational properties here
}

export type StockWithRelations = Stock & StockRelations;
