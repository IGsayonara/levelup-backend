import { FindOptionsWhere } from 'typeorm';
import { UserSkillEntity } from './entities/user-skill.entity';

export class UserSkillService {
  async addOne(userId: number, skillId: number) {
    const userSkill = await UserSkillEntity.createQueryBuilder()
      .insert()
      .values({
        skill: +skillId as any,
        user: userId as any,
      })
      .returning('*')
      .execute();

    return userSkill.generatedMaps[0] as UserSkillEntity;
  }

  async deleteOne(
    findOptionsWhere: FindOptionsWhere<UserSkillEntity>,
  ): Promise<void> {
    await UserSkillEntity.createQueryBuilder()
      .delete()
      .where(findOptionsWhere)
      .execute();
  }

  async updateOne(
    findOptionsWhere: FindOptionsWhere<UserSkillEntity>,
    updateUserSkillDto: Partial<UserSkillEntity>,
  ): Promise<void> {
    await UserSkillEntity.createQueryBuilder()
      .update()
      .set(updateUserSkillDto)
      .where(findOptionsWhere)
      .execute();
  }
}
