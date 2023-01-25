import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  readonly title: string;

  @IsArray()
  @IsString({ each: true })
  readonly skills: string[];
}
