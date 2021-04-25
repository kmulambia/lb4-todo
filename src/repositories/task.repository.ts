import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Task, TaskRelations, List} from '../models';
import {ListRepository} from './list.repository';

export class TaskRepository extends DefaultCrudRepository<
  Task,
  typeof Task.prototype.id,
  TaskRelations
> {

  public readonly list: BelongsToAccessor<List, typeof Task.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('ListRepository') protected listRepositoryGetter: Getter<ListRepository>,
  ) {
    super(Task, dataSource);
    this.list = this.createBelongsToAccessorFor('list', listRepositoryGetter,);
    this.registerInclusionResolver('list', this.list.inclusionResolver);
  }
}
