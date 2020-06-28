import {Count, CountSchema, Filter, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, getWhereSchemaFor, param, patch, post, requestBody} from '@loopback/rest';
import {authenticate} from '@loopback/authentication';

import {Pallet, Stock, Product} from '../models';
import {PalletRepository} from '../repositories';

@authenticate('jwt')
export class PalletStockController {
  constructor(
    @repository(PalletRepository) protected palletRepository: PalletRepository,
  ) { }

  @get('/pallets/{id}/stocks', {
    responses: {
      '200': {
        description: 'Array of Pallet has many Stock',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Stock)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Stock>,
  ): Promise<Stock[]> {
    return this.palletRepository.stocks(id).find(filter);
  }

  @post('/pallets/{id}/stocks', {
    responses: {
      '200': {
        description: 'Pallet model instance',
        content: {'application/json': {schema: getModelSchemaRef(Stock)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Pallet.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Stock, {
            title: 'NewStockInPallet',
            exclude: ['id'],
            optional: ['palletId']
          }),
        },
      },
    }) stock: Omit<Stock, 'id'>,
  ): Promise<Stock> {
    return this.palletRepository.stocks(id).create(stock);
  }

  @patch('/pallets/{id}/stocks', {
    responses: {
      '200': {
        description: 'Pallet.Stock PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Stock, {partial: true}),
        },
      },
    })
    stock: Partial<Stock>,
    @param.query.object('where', getWhereSchemaFor(Stock)) where?: Where<Stock>,
  ): Promise<Count> {
    return this.palletRepository.stocks(id).patch(stock, where);
  }

  @del('/pallets/{id}/stocks', {
    responses: {
      '200': {
        description: 'Pallet.Stock DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Stock)) where?: Where<Stock>,
  ): Promise<Count> {
    return this.palletRepository.stocks(id).delete(where);
  }

  @post('/pallets/{id}/addStock', {
    responses: {
      '200': {
        description: 'Pallet add stock',
        content: {'application/json': {schema: getModelSchemaRef(Stock)}},
      },
    },
  })
  async addStock(
    @param.path.string('id') id: typeof Pallet.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Stock, {
            title: 'NewStockInPallet',
            optional: ['palletId']
          }),
        },
      },
    }) stockLine: Omit<Stock, 'id'>,
  ): Promise<Stock> {
    // get stock pallet from logistic variables
    let filter: any = {filter: JSON.stringify({where: {productId: stockLine.productId,
                                                       lot: stockLine.lot,
                                                       expeditionDate: stockLine.expeditionDate,
                                                       serialNumber: stockLine.serialNumber}})};

    let stocks: Stock[] = await this.find(id, filter);

    // add stock
    let stock: any;

    if (stocks.length == 0) {
      stock = {productId: stockLine.productId,
               lot: stockLine.lot,
               expeditionDate: stockLine.expeditionDate,
               serialNumber: stockLine.serialNumber,
               quantity: stockLine.quantity};

      return this.create(id, stock);
    }
    else {
      stock = stocks[0];

      let quantity = stock.quantity + stockLine.quantity;
      let filter: any = {where: JSON.stringify({id: stock.id})};

      let count: Count = await this.patch(id, {quantity: quantity}, filter);

      return stock;
    }
  }

  @post('/pallets/{id}/removeStock', {
    responses: {
      '200': {
        description: 'Pallet add stock',
        content: {'application/json': {schema: getModelSchemaRef(Stock)}},
      },
    },
  })
  async removeStock(
    @param.path.string('id') id: typeof Pallet.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Stock, {
            title: 'NewStockInPallet',
            optional: ['palletId']
          }),
        },
      },
    }) stockLine: Omit<Stock, 'id'>,
  ): Promise<Stock> {
    // get stock pallet from logistic variables
    let filter: any = {filter: JSON.stringify({where: {productId: stockLine.productId,
                                                       lot: stockLine.lot,
                                                       expeditionDate: stockLine.expeditionDate,
                                                       serialNumber: stockLine.serialNumber}})};

    let stocks: Stock[] = await this.find(id, filter);

    // add stock
    let stock: Stock = stocks[0];

    if (stock.quantity == stockLine.quantity) {
      let count: Count = await this.delete(stock.id);

      return stock;
    }
    else {
      stock.quantity = stock.quantity - stockLine.quantity;

      let quantity = stock.quantity - stockLine.quantity;
      let filter: any = {where: JSON.stringify({id: stock.id})};
      let count: Count = await this.patch(id, stock, filter);

      return stock;
    }
  }
}
