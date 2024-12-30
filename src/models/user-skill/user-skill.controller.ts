import {
  Controller,
  Delete,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserSkillService } from './user-skill.service';
import { AccessTokenGuard } from '../../authentication/guards/access-token-guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('User - Skill')
@Controller('/userSkill')
export class UserSkillController {
  constructor(private userSkillService: UserSkillService) {}

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Post('/userSkill/add/:skillId')
  async addUserSkill(@Req() req: any, @Param('skillId') skillId: number) {
    return await this.userSkillService.addUserSkill(req.user.id, skillId);
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Delete('/userSkill/delete/:id')
  async deleteUserSkill(@Req() req: any, @Param('id') id: number) {
    return await this.userSkillService.deleteUserSkill({ id });
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Put('/userSkill/edit/:id')
  async editUserSkill(@Req() req: any, @Param('id') id: number) {
    return await this.userSkillService.editUserSkill({ id }, req.body);
  }
}
