import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { JobService } from '../job.service';

@Injectable()
export class JobExistPipe implements PipeTransform {
  constructor(private readonly jobService: JobService) {}

  transform(value: any, metadata: ArgumentMetadata): any {
    try {
      this.jobService.getJobById(value);
    } catch {
      throw new NotFoundException(`Job with ID ${value} not found`);
    }
    return value;
  }
}
