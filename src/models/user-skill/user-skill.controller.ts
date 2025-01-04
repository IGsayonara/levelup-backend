import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserSkillService } from './user-skill.service';
import { AccessTokenGuard } from '../../authentication/guards/access-token-guard';
import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RequestWithUser } from '../../common/interfaces/withUser-interface';
import { UpdateUserSkillDto } from './dto/update-userSkill.dto';
import { UserSkillResponseDto } from './dto/user-skill.response.dto';
import { EmptyResponseDto } from '../../common/dto/response/empty-response.dto';
import { EmptyResponse } from '../../common/utils/response/empty-response.util';

@ApiTags('User - Skill')
@Controller('/userSkill')
export class UserSkillController {
  constructor(private userSkillService: UserSkillService) {}

  @ApiBearerAuth()
  @ApiResponse({ type: UserSkillResponseDto, status: HttpStatus.CREATED })
  @ApiNotFoundResponse()
  @UseGuards(AccessTokenGuard)
  @Post('/:skillId')
  async addOne(@Req() req: RequestWithUser, @Param('skillId') skillId: number) {
    return await this.userSkillService.addOne(req.user.id, skillId);
  }

  @ApiResponse({ type: UserSkillResponseDto, status: HttpStatus.OK })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Put('/:id')
  async updateOne(@Body() body: UpdateUserSkillDto, @Param('id') id: number) {
    return await this.userSkillService.updateOne({ id }, body);
  }

  @ApiBearerAuth()
  @ApiNoContentResponse({ type: EmptyResponseDto })
  @UseGuards(AccessTokenGuard)
  @Delete('/:id')
  async deleteOne(@Param('id') id: number) {
    await this.userSkillService.deleteOne({ id });

    return EmptyResponse;
  }
}
