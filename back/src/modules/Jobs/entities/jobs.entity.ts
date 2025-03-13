import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Application } from 'src/modules/Applications/entities/applications.entity';
import { User } from '../../user/entities/user.entity';
import { YesOrNo } from '../jobs.enum';

@Entity('jobs')
export class JobEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Delantero profesional',
    description: 'Título del trabajo',
  })
  @Column()
  title: string;

  @ApiProperty({
    example: 'Se busca un delantero como Messi',
    description: 'Que juegue como Messi y que cobre como el Pulga Rodriguez',
  })
  @Column()
  description: string;

  @ApiProperty({ example: 'Presencial', description: 'Ubicación del trabajo' })
  @Column()
  location: string;

  @ApiProperty({ example: 60000, description: 'Salario anual en dólares' })
  @Column('decimal')
  salary: number;

  @ApiProperty({
    example: '2024-12-01T12:34:56Z',
    description: 'Fecha de creación del trabajo',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: 'OPEN', description: 'Estado del trabajo' })
  @Column({ default: 'OPEN' })
  status: string;

  @ApiProperty({
    example: 'Tiempo completo',
    description: 'Tipo de oferta laboral',
  })
  @Column()
  contractTypes: string;

  @ApiProperty({ example: '1 año', description: 'Duración del contrato' })
  @Column()
  contractDurations: string;

  @ApiProperty({ example: 'Delantero', description: 'Posición requerida' })
  @Column()
  position: string;

  @ApiProperty({ example: 'Profesional', description: 'Categoría del trabajo' })
  @Column()
  category: string;

  @ApiProperty({
    example: 'Fútbol 11',
    description: 'Deporte relacionado con el trabajo',
  })
  @Column()
  sport: string;

  @ApiProperty({ example: 'Masculino', description: 'Género del deporte' })
  @Column()
  sportGenres: string;

  @ApiProperty({ example: 18, description: 'Edad mínima del trabajador' })
  @Column()
  minAge: number;

  @ApiProperty({ example: 35, description: 'Edad máxima del trabajador' })
  @Column()
  maxAge: number;

  @ApiProperty({
    example: 'Semiprofesional',
    description: 'Experiencia mínima necesaria para el trabajo',
  })
  @Column()
  minExperience: string;

  @ApiProperty({
    example: ['Sueldo fijo', 'Bonos por rendimiento'],
    description: 'Beneficios adicionales',
  })
  @Column('simple-array')
  extra: string[];

  @ApiProperty({
    example: ['Vuelos pagados', 'Alojamiento incluido'],
    description: 'Beneficios de transporte',
  })
  @Column('simple-array', { nullable: true })
  transport?: string[];

  @ApiProperty({
    example: 'YES',
    description: 'Disponibilidad para viajar',
    enum: YesOrNo,
  })
  @Column({ type: 'enum', enum: YesOrNo })
  availabilityToTravel: YesOrNo;

  @ApiProperty({
    example: 'NO',
    description: '¿Requiere pasaporte de la UE?',
    enum: YesOrNo,
  })
  @Column({ type: 'enum', enum: YesOrNo })
  euPassport: YesOrNo;

  @ApiProperty({
    example: 'user@example.com',
    description: 'Correo del reclutador',
    nullable: true,
  })
  @Column({ nullable: true })
  gmail?: string;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'Imagen del trabajo',
  })
  @Column()
  imgUrl: string;

  @ApiProperty({
    type: () => User,
    description: 'Reclutador que creó la oferta',
  })
  @ManyToOne(() => User, (user) => user.jobs)
  recruiter: User;

  @ApiProperty({
    type: () => [Application],
    description: 'Aplicaciones al trabajo',
  })
  @OneToMany(() => Application, (application) => application.job, {
    cascade: true,
  })
  applications: Application[];
}
