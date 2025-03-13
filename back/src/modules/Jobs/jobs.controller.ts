import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateJobDto } from './dto/create-jobs.dto';
import { JobEntity } from './entities/jobs.entity';

@ApiTags('Jobs')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}


  @Post()
  @ApiOperation({ summary: 'Crear un nuevo trabajo' })
  async create(@Body() createJobDto: CreateJobDto) {
    console.log('Recibiendo nueva oferta en el backend:', createJobDto); // Verificar que los datos lleguen

    const newJob = await this.jobsService.create(createJobDto);

    console.log('Oferta guardada en la base de datos:', newJob); // Confirmar que se guardó
    return newJob;
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los trabajos' })
  async findAll() {
    return this.jobsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un trabajo por ID' })
  async findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un trabajo' })
  async update(
    @Param('id') id: string,
    @Body() updateJobDto: Partial<CreateJobDto>,
  ) {
    return this.jobsService.update(id, updateJobDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un trabajo' })
  async remove(@Param('id') id: string) {
    return this.jobsService.remove(id);
  }

  @Get('recruiter/:recruiterId')
  async getJobsByRecruiter(@Param('recruiterId') recruiterId: string): Promise<JobEntity[]> {
    return this.jobsService.getJobsByRecruiter(recruiterId);
  }
  
}
