import { IsNotEmpty } from 'class-validator';

export class CreateSkillDto {
  @IsNotEmpty()
  readonly title: string;
}
