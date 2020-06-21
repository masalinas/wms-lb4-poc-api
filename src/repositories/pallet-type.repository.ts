import {DefaultCrudRepository} from '@loopback/repository';
import {PalletType, PalletTypeRelations} from '../models';
import {WmsPocDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PalletTypeRepository extends DefaultCrudRepository<
  PalletType,
  typeof PalletType.prototype.id,
  PalletTypeRelations
> {
  constructor(
    @inject('datasources.wms-poc') dataSource: WmsPocDataSource,
  ) {
    super(PalletType, dataSource);
  }
}
