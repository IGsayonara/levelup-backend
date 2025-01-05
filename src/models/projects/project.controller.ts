import {
  Body,
  Controller,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProjectService } from './project.service';

import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProjectResponseDto } from './dto/project.response.dto';
import { AccessTokenGuard } from '../../authentication/guards/access-token-guard';
import { ProjectUpdateDto } from './dto/project.update.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../../common/configs/mutler.config';

@ApiTags('Projects')
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiBearerAuth()
  @ApiResponse({ type: ProjectResponseDto, status: HttpStatus.OK })
  @UseGuards(AccessTokenGuard)
  @Put('/:id')
  async updateOne(
    @Body() body: ProjectUpdateDto,
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return await this.projectService.updateOne(body, {
      id,
    });
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Put('/:id/image')
  @UseInterceptors(FileInterceptor('file', multerOptions()))
  async updateProjectImage(
    @UploadedFile() file: Express.Multer.File,
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return await this.projectService.updateOne(
      {
        image: file.path,
      },
      {
        id,
      },
    );
  }
}
