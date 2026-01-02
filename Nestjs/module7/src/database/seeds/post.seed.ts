import { Posts } from '../../posts/posts.entity';
import { Users } from '../../users/user.entity';
import { DataSource } from 'typeorm';

export async function seedPosts(dataSource: DataSource) {
  const postRepo = dataSource.getRepository(Posts);
  const userRepo = dataSource.getRepository(Users);

  const user = await userRepo.findOneBy({ email: 'vishal@gmail.com' });
  if (!user) return;
  const posts = [
    {
      title: 'First Post',
      content: 'This is the first seeded post',
      user,
    },
    {
      title: 'Second Post',
      content: 'This is the second seeded post',
      user,
    },
  ];
  for (const post of posts) {
    await postRepo.save(postRepo.create(post));
  }

  console.log('✅ Posts seeded');
}
