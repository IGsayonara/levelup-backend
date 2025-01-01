import {
  Controller,
  Delete,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserProjectSkillService } from './userProject-skill.service';
import { AccessTokenGuard } from '../../authentication/guards/access-token-guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('UserProject - Skill')
@Controller('/userProjectSkill')
export class UserProjectSkillController {
  constructor(private userProjectSkillService: UserProjectSkillService) {}

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Post('/')
  async addUserProjectSkill(@Req() req: any) {
    const { userProjectId, skillId } = req.body;

    if (!userProjectId || !skillId) {
      throw new NotFoundException('Missing userProjectId or skillId');
    }

    return await this.userProjectSkillService.addSkillToUserProject(
      userProjectId,
      skillId,
    );
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Put('/:id')
  async updateUserProjectSkill(@Req() req: any, @Param('id') id: number) {
    return await this.userProjectSkillService.updateUserProjectSkill(
      { id },
      req.body,
    );
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Delete('/:id')
  async deleteUserProjectSkill(@Param('id') id: number) {
    return await this.userProjectSkillService.deleteUserProjectSkill({ id });
  }
}
