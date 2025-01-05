import { HttpStatus } from '@nestjs/common';
import { EmptyResponseDto } from '../../dto/response/empty-response.dto';

export const EmptyResponse: EmptyResponseDto = {
  status: HttpStatus.NO_CONTENT,
};

export const CreatedResponse: EmptyResponseDto = {
  status: HttpStatus.CREATED,
};
