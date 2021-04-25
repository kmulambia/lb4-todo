import {Entity, model, property, hasMany} from '@loopback/repository';
import {Task} from './task.model';

@model()
export class List extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  title?: string;

  @property({
    type: 'string',
  })
  color?: string;

  @hasMany(() => Task)
  tasks: Task[];

  constructor(data?: Partial<List>) {
    super(data);
  }
}

export interface ListRelations {
  // describe navigational properties here
}

export type ListWithRelations = List & ListRelations;
