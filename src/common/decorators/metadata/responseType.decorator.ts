import { SetMetadata } from '@nestjs/common';

export const ResponseType = (dto: any) => SetMetadata('dto', dto);
