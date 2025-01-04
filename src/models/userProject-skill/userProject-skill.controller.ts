import {
  Body,
  Controller,
  Delete,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserProjectSkillService } from './userProject-skill.service';
import { AccessTokenGuard } from '../../authentication/guards/access-token-guard';
import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateUserProjectSkillDto } from './dto/update-userProjectSkill.dto';
import { EmptyResponse } from '../../common/utils/response/empty-response.util';
import { EmptyResponseDto } from '../../common/dto/response/empty-response.dto';
import { CreateUserProjectSkilDto } from './dto/create-userProjectSkil.dto';

@ApiTags('UserProject - Skill')
@Controller('/userProjectSkill')
export class UserProjectSkillController {
  constructor(private userProjectSkillService: UserProjectSkillService) {}

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Post('/')
  async addOne(@Body() body: CreateUserProjectSkilDto) {
    const { userProjectId, skillId } = body;

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
  async updateOne(
    @Body() body: UpdateUserProjectSkillDto,
    @Param('id') id: number,
  ) {
    return await this.userProjectSkillService.updateUserProjectSkill(
      { id },
      body,
    );
  }

  @ApiBearerAuth()
  @ApiNoContentResponse({ type: EmptyResponseDto })
  @ApiNotFoundResponse()
  @UseGuards(AccessTokenGuard)
  @Delete('/:id')
  async deleteOne(@Param('id') id: number) {
    await this.userProjectSkillService.deleteUserProjectSkill({ id });

    return EmptyResponse;
  }
}
