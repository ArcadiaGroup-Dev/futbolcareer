import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateJobDto } from './dto/create-jobs.dto';
import { UpdateJobDto } from './dto/update-jobs.dto';
import { User } from '../user/entities/user.entity';
import { Job } from './entities/jobs.entity';


@Injectable()
export class JobRepository {
  create(arg0: { recruiter: User; title: string; location: string; salary: number; description: string; contractDurations: string; position: string; extra: string[]; nationality: string; imgUrl: string; contractTypes: string; category: string; sportGenres: string; minAge: number; maxAge: number; sport: string; minExperience: string; availabilityToTravel: import("./jobs.enum").YesOrNotravell; euPassport: import("./jobs.enum").YesOrNo; gmail?: string; }) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Job)
    private readonly repository: Repository<Job>,
  ) {}

  async createJob(createJobDto: CreateJobDto, recruiter: User): Promise<Job> {
    try {
      const job = this.repository.create({ ...createJobDto, recruiter });
      console.log('Job created:', job);
      return await this.repository.save(job);
    } catch (error) {
      console.error('Error al crear el trabajo:', error);
      throw new Error('No se pudo crear el trabajo');
    }
  }
  

  async getJobs(): Promise<Job[]> {
    return await this.repository.find({ where: { status: 'OPEN' }, relations: ['recruiter', 'applications'] });
  }

  async getJobById(id: string): Promise<Job> {
    const job = await this.repository.findOne({
      where: { id },
      relations: ['recruiter', 'applications'],
    });
    if (!job) {
      throw new NotFoundException(`Trabajos con el id ${id} no se encontró`);
    }
    return job;
  }

  async updateJob(
    id: string,
    updateJobDto: UpdateJobDto,
    recruiter: User,
  ): Promise<Job> {
    const job = await this.getJobById(id);
    if (job.recruiter.id !== recruiter.id) {
      throw new UnauthorizedException(
        'Solo puedes actualizar tus propios trabajos',
      );
    }

    Object.assign(job, updateJobDto);
    return await this.repository.save(job);
  }

  async deleteJob(id: string, recruiter: User): Promise<void> {
    const job = await this.getJobById(id);
    if (job.recruiter.id !== recruiter.id) {
      throw new UnauthorizedException(
        'Solo puedes eliminar tus propios trabajos',
      );
    }

    await this.repository.remove(job);
  }
}
