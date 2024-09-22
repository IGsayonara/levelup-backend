import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { SkillService } from './skill.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SkillResponseDto } from './dto/skill-response.dto';

@ApiTags('Skills')
@Controller('skills')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @ApiResponse({ type: SkillResponseDto })
  @Get()
  async findAll(): Promise<SkillResponseDto[]> {
    return await this.skillService.getSkills();
  }

  @ApiResponse({ type: SkillResponseDto })
  @Get('/:id')
  async findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<SkillResponseDto> {
    const skill = await this.skillService.findOne({ id });

    if (!skill) {
      throw new NotFoundException();
    }

    return skill;
  }
}
