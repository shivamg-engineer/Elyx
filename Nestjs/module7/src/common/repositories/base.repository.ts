
import {
  DeepPartial,
  QueryDeepPartialEntity,
  Repository,
} from 'typeorm';

export abstract class BaseRepository<T extends { id: number }> {
  constructor(protected readonly repository: Repository<T>) {}

  findAll(): Promise<T[]> {
    return this.repository.find();
  }

  findById(id: number): Promise<T | null> {
    return this.repository.findOneBy({ id: id as any });
  }

  create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return this.repository.save(entity as T);
  }

  async update(
    id: number,
    data: QueryDeepPartialEntity<T>,
  ): Promise<T | null> {
    await this.repository.update(id, data);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
