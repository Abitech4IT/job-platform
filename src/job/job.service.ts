import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { Repository } from 'typeorm';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { User, UserRole } from 'src/users/entities/user.entity';

@Injectable()
export class JobService {
  constructor(@InjectRepository(Job) private jobRepository: Repository<Job>) {}

  async getAllJobs(): Promise<Job[]> {
    return this.jobRepository.find({
      relations: ['creator'],
      select: {
        id: true,
        title: true,
        desription: true,
        company: true,
        type: true,
        tags: true,
        location: true,
        salary: true,
        createdAt: true,
        updatedAt: true,
        creator: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          role: true,
        },
      },
    });
  }
  async getJobById(id: number): Promise<Job> {
    const job = await this.jobRepository.findOne({
      where: { id },
      relations: ['creator'],
      select: {
        id: true,
        title: true,
        desription: true,
        company: true,
        type: true,
        tags: true,
        location: true,
        salary: true,
        createdAt: true,
        updatedAt: true,
        creator: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          role: true,
        },
      },
    });
    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }
    return job;
  }

  async createJob(jobData: CreateJobDto, creator: User): Promise<Job> {
    const newJob = this.jobRepository.create({
      title: jobData.title,
      desription: jobData.description,
      company: jobData.company,
      type: jobData.type,
      tags: jobData.tags,
      location: jobData.location,
      salary: jobData.salary,
      creator,
    });
    return this.jobRepository.save(newJob);
  }

  async updateJob(id: number, jobData: UpdateJobDto, user: User): Promise<Job> {
    const job = await this.getJobById(id);

    if (job.creator.id !== user.id && user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('You can only update your own job post');
    }
    const updatedJob = Object.assign(job, jobData);
    return this.jobRepository.save(updatedJob);
  }

  async deleteJob(id: number): Promise<void> {
    const job = await this.getJobById(id);
    await this.jobRepository.remove(job);
  }
}
