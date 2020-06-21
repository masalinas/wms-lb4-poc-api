import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Stock, StockRelations, Product, Pallet} from '../models';
import {WmsPocDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ProductRepository} from './product.repository';
import {PalletRepository} from './pallet.repository';

export class StockRepository extends DefaultCrudRepository<
  Stock,
  typeof Stock.prototype.id,
  StockRelations
> {

  public readonly product: BelongsToAccessor<Product, typeof Stock.prototype.id>;

  public readonly pallet: BelongsToAccessor<Pallet, typeof Stock.prototype.id>;

  constructor(
    @inject('datasources.wms-poc') dataSource: WmsPocDataSource, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>, @repository.getter('PalletRepository') protected palletRepositoryGetter: Getter<PalletRepository>,
  ) {
    super(Stock, dataSource);
    this.pallet = this.createBelongsToAccessorFor('pallet', palletRepositoryGetter,);
    this.registerInclusionResolver('pallet', this.pallet.inclusionResolver);
    this.product = this.createBelongsToAccessorFor('product', productRepositoryGetter,);
    this.registerInclusionResolver('product', this.product.inclusionResolver);
  }
}
