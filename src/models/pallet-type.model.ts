import {Entity, model, property} from '@loopback/repository';

@model({
  name: 'PalletType'
})
export class PalletType extends Entity {
  @property({
    id: true,
    generated: true,
    type: 'string',
    description: 'Pallet type indentifier',
  })
  id: string;

  @property({
    description: 'Pallet Type name',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    required: true,
    description: 'Pallet Type length in mm',
  })
  length: number;

  @property({
    type: 'number',
    required: true,
    description: 'Pallet Type width in mm',
  })
  width: number;

  @property({
    type: 'number',
    required: true,
    description: 'Pallet Type weight in Kg',
  })
  weight: number;

  constructor(data?: Partial<PalletType>) {
    super(data);
  }
}

export interface PalletTypeRelations {
  // describe navigational properties here
}

export type PalletTypeWithRelations = PalletType & PalletTypeRelations
