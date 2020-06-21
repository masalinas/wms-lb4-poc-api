import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {Pallet, PalletRelations, Stock, PalletType} from '../models';
import {WmsPocDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {StockRepository} from './stock.repository';
import {PalletTypeRepository} from './pallet-type.repository';

export class PalletRepository extends DefaultCrudRepository<
  Pallet,
  typeof Pallet.prototype.id,
  PalletRelations
> {

  public readonly stocks: HasManyRepositoryFactory<Stock, typeof Pallet.prototype.id>;

  public readonly palletType: BelongsToAccessor<PalletType, typeof Pallet.prototype.id>;

  constructor(
    @inject('datasources.wms-poc') dataSource: WmsPocDataSource, @repository.getter('StockRepository') protected stockRepositoryGetter: Getter<StockRepository>, @repository.getter('PalletTypeRepository') protected palletTypeRepositoryGetter: Getter<PalletTypeRepository>,
  ) {
    super(Pallet, dataSource);
    this.palletType = this.createBelongsToAccessorFor('palletType', palletTypeRepositoryGetter,);
    this.registerInclusionResolver('palletType', this.palletType.inclusionResolver);
    this.stocks = this.createHasManyRepositoryFactoryFor('stocks', stockRepositoryGetter,);
    this.registerInclusionResolver('stocks', this.stocks.inclusionResolver);
  }
}
