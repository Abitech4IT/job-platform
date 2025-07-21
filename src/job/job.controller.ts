import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { JobService } from './job.service';
import { JobExistPipe } from './pipe/job-exist.pipe';
import { Job } from './entities/job.entity';
import { CreateJobDto } from './dto/create-job.dto';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get()
  getAllJobs(): Promise<Job[]> {
    return this.jobService.getAllJobs();
  }

  @Get(':id')
  async getJobById(
    @Param('id', ParseIntPipe, JobExistPipe) id: number,
  ): Promise<Job> {
    const job = this.jobService.getJobById(id);
    return job;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createJob(@Body() jobData: CreateJobDto): Promise<Job> {
    return this.jobService.createJob(jobData);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateJob(
    @Param('id', ParseIntPipe, JobExistPipe) id: number,
    @Body() jobData: CreateJobDto,
  ): Promise<Job> {
    return this.jobService.updateJob(id, jobData);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteJob(
    @Param('id', ParseIntPipe, JobExistPipe) id: number,
  ): Promise<void> {
    return this.jobService.deleteJob(id);
  }
}
