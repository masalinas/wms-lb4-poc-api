import {DefaultCrudRepository} from '@loopback/repository';
import {Pallet, PalletRelations} from '../models';
import {WmsPocDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PalletRepository extends DefaultCrudRepository<
  Pallet,
  typeof Pallet.prototype.id,
  PalletRelations
> {
  constructor(
    @inject('datasources.wms-poc') dataSource: WmsPocDataSource,
  ) {
    super(Pallet, dataSource);
  }
}
