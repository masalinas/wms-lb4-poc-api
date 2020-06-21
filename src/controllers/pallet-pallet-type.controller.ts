import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Pallet,
  PalletType,
} from '../models';
import {PalletRepository} from '../repositories';

export class PalletPalletTypeController {
  constructor(
    @repository(PalletRepository)
    public palletRepository: PalletRepository,
  ) { }

  @get('/pallets/{id}/pallet-type', {
    responses: {
      '200': {
        description: 'PalletType belonging to Pallet',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PalletType)},
          },
        },
      },
    },
  })
  async getPalletType(
    @param.path.string('id') id: typeof Pallet.prototype.id,
  ): Promise<PalletType> {
    return this.palletRepository.palletType(id);
  }
}
