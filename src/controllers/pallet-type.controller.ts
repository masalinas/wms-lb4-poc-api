import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {post, param, get, getModelSchemaRef, patch, put, del, requestBody} from '@loopback/rest';
import {authenticate} from '@loopback/authentication';

import {PalletType} from '../models';
import {PalletTypeRepository} from '../repositories';

@authenticate('jwt')
export class PalletTypeController {
  constructor(
    @repository(PalletTypeRepository)
    public palletTypeRepository : PalletTypeRepository,
  ) {}

  @post('/pallet-types', {
    responses: {
      '200': {
        description: 'PalletType model instance',
        content: {'application/json': {schema: getModelSchemaRef(PalletType)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PalletType, {
            title: 'NewPalletType',
            exclude: ['id'],
          }),
        },
      },
    })
    palletType: Omit<PalletType, 'id'>,
  ): Promise<PalletType> {
    return this.palletTypeRepository.create(palletType);
  }

  @get('/pallet-types/count', {
    responses: {
      '200': {
        description: 'PalletType model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(PalletType) where?: Where<PalletType>,
  ): Promise<Count> {
    return this.palletTypeRepository.count(where);
  }

  @get('/pallet-types', {
    responses: {
      '200': {
        description: 'Array of PalletType model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(PalletType, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(PalletType) filter?: Filter<PalletType>,
  ): Promise<PalletType[]> {
    return this.palletTypeRepository.find(filter);
  }

  @patch('/pallet-types', {
    responses: {
      '200': {
        description: 'PalletType PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PalletType, {partial: true}),
        },
      },
    })
    palletType: PalletType,
    @param.where(PalletType) where?: Where<PalletType>,
  ): Promise<Count> {
    return this.palletTypeRepository.updateAll(palletType, where);
  }

  @get('/pallet-types/{id}', {
    responses: {
      '200': {
        description: 'PalletType model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(PalletType, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(PalletType, {exclude: 'where'}) filter?: FilterExcludingWhere<PalletType>
  ): Promise<PalletType> {
    return this.palletTypeRepository.findById(id, filter);
  }

  @patch('/pallet-types/{id}', {
    responses: {
      '204': {
        description: 'PalletType PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PalletType, {partial: true}),
        },
      },
    })
    palletType: PalletType,
  ): Promise<void> {
    await this.palletTypeRepository.updateById(id, palletType);
  }

  @put('/pallet-types/{id}', {
    responses: {
      '204': {
        description: 'PalletType PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() palletType: PalletType,
  ): Promise<void> {
    await this.palletTypeRepository.replaceById(id, palletType);
  }

  @del('/pallet-types/{id}', {
    responses: {
      '204': {
        description: 'PalletType DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.palletTypeRepository.deleteById(id);
  }
}
