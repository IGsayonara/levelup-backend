import { FindOptionsWhere } from 'typeorm';
import { UserProjectEntity } from './entities/user-project.entity';
import { IUserProject } from './interfaces/user-project.interface';

export class UserProjectService {
  async addProjectToUser(userId: number, projectId: number): Promise<void> {
    await UserProjectEntity.createQueryBuilder()
      .insert()
      .into(UserProjectEntity)
      .values({
        user: userId as any,
        project: projectId as any,
        role: 'developer',
        description: `meow`,
      })
      .execute();
  }

  async updateUserProject(
    findOptionsWhere: FindOptionsWhere<UserProjectEntity>,
    updateUserProjectDto: Partial<UserProjectEntity>,
  ): Promise<IUserProject> {
    await UserProjectEntity.createQueryBuilder()
      .update()
      .set(updateUserProjectDto)
      .where(findOptionsWhere)
      .execute();

    return await UserProjectEntity.findOne({ where: findOptionsWhere });
  }

  async deleteUserProject(
    findOptionsWhere: FindOptionsWhere<UserProjectEntity>,
  ): Promise<void> {
    await UserProjectEntity.createQueryBuilder()
      .delete()
      .where(findOptionsWhere)
      .execute();
  }
}
