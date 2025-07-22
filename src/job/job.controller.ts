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
  UseGuards,
} from '@nestjs/common';
import { JobService } from './job.service';
import { JobExistPipe } from './pipe/job-exist.pipe';
import { Job } from './entities/job.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UserRole } from 'src/users/entities/user.entity';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

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

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createJob(
    @Body() jobData: CreateJobDto,
    @CurrentUser() user: any,
  ): Promise<Job> {
    return this.jobService.createJob(jobData, user);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateJob(
    @Param('id', ParseIntPipe, JobExistPipe) id: number,
    @Body() jobData: CreateJobDto,
    @CurrentUser() user: any,
  ): Promise<Job> {
    return this.jobService.updateJob(id, jobData, user);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteJob(
    @Param('id', ParseIntPipe, JobExistPipe) id: number,
  ): Promise<void> {
    return this.jobService.deleteJob(id);
  }
}
