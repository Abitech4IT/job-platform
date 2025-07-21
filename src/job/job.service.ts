import { Injectable, NotFoundException } from '@nestjs/common';
import { IJob } from './interface/job.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { Repository } from 'typeorm';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Injectable()
export class JobService {
  // private jobs: IJob[] = [
  //   {
  //     id: 1,
  //     title: 'Software Engineer',
  //     description: 'Develop and maintain software applications.',
  //     company: 'Tech Company',
  //     type: 'Full-time',
  //     tags: ['JavaScript', 'Node.js', 'React'],
  //     location: 'Remote',
  //     salary: 80000,
  //     createdAt: new Date(),
  //   },
  //   {
  //     id: 2,
  //     title: 'Data Scientist',
  //     description: 'Analyze data and build predictive models.',
  //     company: 'Data Corp',
  //     type: 'Full-time',
  //     tags: ['Python', 'Machine Learning', 'Statistics'],
  //     location: 'On-site',
  //     salary: 90000,
  //     createdAt: new Date(),
  //   },
  // ];

  constructor(@InjectRepository(Job) private jobRepository: Repository<Job>) {}

  async getAllJobs(): Promise<Job[]> {
    return this.jobRepository.find();
  }
  async getJobById(id: number): Promise<Job> {
    const job = await this.jobRepository.findOneBy({ id });
    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }
    return job;
  }

  async createJob(jobData: CreateJobDto): Promise<Job> {
    const newJob = this.jobRepository.create({
      title: jobData.title,
      desription: jobData.description,
      company: jobData.company,
      type: jobData.type,
      tags: jobData.tags,
      location: jobData.location,
      salary: jobData.salary,
    });
    return this.jobRepository.save(newJob);
  }

  async updateJob(id: number, jobData: UpdateJobDto): Promise<Job> {
    const job = await this.getJobById(id);
    const updatedJob = Object.assign(job, jobData);
    return this.jobRepository.save(updatedJob);
  }

  async deleteJob(id: number): Promise<void> {
    const job = await this.getJobById(id);
    await this.jobRepository.remove(job);
  }
}
