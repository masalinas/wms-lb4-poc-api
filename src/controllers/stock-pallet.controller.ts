import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Stock,
  Pallet,
} from '../models';
import {StockRepository} from '../repositories';

export class StockPalletController {
  constructor(
    @repository(StockRepository)
    public stockRepository: StockRepository,
  ) { }

  @get('/stocks/{id}/pallet', {
    responses: {
      '200': {
        description: 'Pallet belonging to Stock',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pallet)},
          },
        },
      },
    },
  })
  async getPallet(
    @param.path.string('id') id: typeof Stock.prototype.id,
  ): Promise<Pallet> {
    return this.stockRepository.pallet(id);
  }
}
