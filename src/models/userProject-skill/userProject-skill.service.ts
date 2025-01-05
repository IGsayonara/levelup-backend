import { FindOptionsWhere } from 'typeorm';
import { UserProjectSkillEntity } from './entities/user-project-skill.entity';

export class UserProjectSkillService {
  async updateUserProjectSkill(
    findOptionsWhere: FindOptionsWhere<UserProjectSkillEntity>,
    updateUserProjectSkillDto: Partial<UserProjectSkillEntity>,
  ): Promise<any> {
    await UserProjectSkillEntity.createQueryBuilder()
      .update()
      .set(updateUserProjectSkillDto)
      .where(findOptionsWhere)
      .execute();

    return await UserProjectSkillEntity.findOne({ where: findOptionsWhere });
  }

  async addSkillToUserProject(
    userProjectId: number,
    skillId: number,
  ): Promise<UserProjectSkillEntity> {
    const userProjectSkill = await UserProjectSkillEntity.createQueryBuilder()
      .insert()
      .into(UserProjectSkillEntity)
      .values({
        skill: +skillId as any,
        userProject: +userProjectId as any,
        description: '',
      })
      .returning('*') // Ensure the created entity is returned
      .execute();

    return userProjectSkill.generatedMaps[0] as UserProjectSkillEntity;
  }

  async deleteUserProjectSkill(
    findOptionsWhere: FindOptionsWhere<UserProjectSkillEntity>,
  ): Promise<void> {
    await UserProjectSkillEntity.createQueryBuilder()
      .delete()
      .where(findOptionsWhere)
      .execute();
  }
}
