import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { CreateJobDto } from './dto/create-jobs.dto';
import { JobEntity } from './entities/jobs.entity';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(JobEntity)
    private readonly jobRepository: Repository<JobEntity>,
  ) {}

  async create(createJobDto: CreateJobDto): Promise<JobEntity> {
    // 🔹 Se convierte el DTO en un tipo compatible con TypeORM
    const job = this.jobRepository.create(createJobDto as unknown as DeepPartial<JobEntity>);
    return await this.jobRepository.save(job);
  }

  async findAll(): Promise<JobEntity[]> {
    return await this.jobRepository.find();
  }

  async findOne(id: string): Promise<JobEntity> {
    const job = await this.jobRepository.findOne({ where: { id } });
    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }
    return job;
  }

  async update(id: string, updateJobDto: Partial<CreateJobDto>): Promise<JobEntity> {
    // 🔹 Se convierte `updateJobDto` en `DeepPartial<JobEntity>` para evitar errores de tipo
    await this.jobRepository.update(id, updateJobDto as unknown as DeepPartial<JobEntity>);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.jobRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }
  }
}
