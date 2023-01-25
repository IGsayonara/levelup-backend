import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { SkillService } from './skill.service';
import { CreateSkillDto } from './dto/create-skill.dto';

@Controller('skills')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Get()
  findAll(@Res() res) {
    res.json(this.skillService.getSkills());
  }

  @Get('/:id')
  findOne(@Param('id') id, @Res() res) {
    res.json(this.skillService.getSkill(id));
  }

  @Post('/add')
  create(@Body() createSkillDto: CreateSkillDto, @Res() res) {
    res.json(createSkillDto);
  }
}
