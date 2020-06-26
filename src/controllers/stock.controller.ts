import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {post, param, get, getModelSchemaRef, patch, put, del, requestBody} from '@loopback/rest';
import {authenticate} from '@loopback/authentication';

import {Stock} from '../models';
import {StockRepository} from '../repositories';

@authenticate('jwt')
export class StockController {
  constructor(
    @repository(StockRepository)
    public stockRepository : StockRepository,
  ) {}

  @post('/stocks', {
    responses: {
      '200': {
        description: 'Stock model instance',
        content: {'application/json': {schema: getModelSchemaRef(Stock)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Stock, {
            title: 'NewStock',
            exclude: ['id'],
          }),
        },
      },
    })
    stock: Omit<Stock, 'id'>,
  ): Promise<Stock> {
    return this.stockRepository.create(stock);
  }

  @get('/stocks/count', {
    responses: {
      '200': {
        description: 'Stock model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Stock) where?: Where<Stock>,
  ): Promise<Count> {
    return this.stockRepository.count(where);
  }

  @get('/stocks', {
    responses: {
      '200': {
        description: 'Array of Stock model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Stock, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Stock) filter?: Filter<Stock>,
  ): Promise<Stock[]> {
    return this.stockRepository.find(filter);
  }

  @patch('/stocks', {
    responses: {
      '200': {
        description: 'Stock PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Stock, {partial: true}),
        },
      },
    })
    stock: Stock,
    @param.where(Stock) where?: Where<Stock>,
  ): Promise<Count> {
    return this.stockRepository.updateAll(stock, where);
  }

  @get('/stocks/{id}', {
    responses: {
      '200': {
        description: 'Stock model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Stock, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Stock, {exclude: 'where'}) filter?: FilterExcludingWhere<Stock>
  ): Promise<Stock> {
    return this.stockRepository.findById(id, filter);
  }

  @patch('/stocks/{id}', {
    responses: {
      '204': {
        description: 'Stock PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Stock, {partial: true}),
        },
      },
    })
    stock: Stock,
  ): Promise<void> {
    await this.stockRepository.updateById(id, stock);
  }

  @put('/stocks/{id}', {
    responses: {
      '204': {
        description: 'Stock PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() stock: Stock,
  ): Promise<void> {
    await this.stockRepository.replaceById(id, stock);
  }

  @del('/stocks/{id}', {
    responses: {
      '204': {
        description: 'Stock DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.stockRepository.deleteById(id);
  }
}
