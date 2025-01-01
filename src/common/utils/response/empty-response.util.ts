import { HttpStatus } from '@nestjs/common';
import { EmptyResponseDto } from '../../dto/empty-response.dto';

export const EmptyResponse: EmptyResponseDto = {
  status: HttpStatus.NO_CONTENT,
};
