import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Task,
  List,
} from '../models';
import {TaskRepository} from '../repositories';

export class TaskListController {
  constructor(
    @repository(TaskRepository)
    public taskRepository: TaskRepository,
  ) { }

  @get('/tasks/{id}/list', {
    responses: {
      '200': {
        description: 'List belonging to Task',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(List)},
          },
        },
      },
    },
  })
  async getList(
    @param.path.string('id') id: typeof Task.prototype.id,
  ): Promise<List> {
    return this.taskRepository.list(id);
  }
}
