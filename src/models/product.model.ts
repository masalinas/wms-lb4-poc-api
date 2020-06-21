import {Entity, model, property} from '@loopback/repository';

@model({
  name: 'Product'
})
export class Product extends Entity {
  @property({
    id: true,
    generated: true,
    type: 'string',
    description: 'Product indentifier',
  })
  id: string;

  @property({
    description: 'Product name',
    required: true,
  })
  code: string;

  @property({
    type: 'string',
    description: 'Product description'
  })
  description?: string;

  @property({
    type: 'string',
    description: 'Product image'
  })
  image?: string

  @property({
    type: 'number',
    description: 'Product price',
    required: true,
  })
  price: number;

  constructor(data?: Partial<Product>) {
    super(data);
  }
}

export interface ProductRelations {
  // describe navigational properties here
}

export type ProductWithRelations = Product & ProductRelations;
