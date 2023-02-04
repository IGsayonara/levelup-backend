import { PartialType } from '@nestjs/swagger';
import {
  CreateProjectDto,
  CreatePrimaryProjectDto,
} from './create-project.dto';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {}
export class UpdatePrimaryProjectDto extends PartialType(
  CreatePrimaryProjectDto,
) {}
