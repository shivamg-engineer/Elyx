import dataSource from '../../config/typeorm.config';
import { seedUsers } from './user.seed';
import { seedPosts } from './post.seed';

async function runSeed() {
  await dataSource.initialize();
  console.log('🌱 Database connected');

  await seedUsers(dataSource);
  await seedPosts(dataSource);

  await dataSource.destroy();
  console.log('🌱 Seeding completed');
}

runSeed().catch((err) => {
  console.error('❌ Seeding failed', err);
  process.exit(1);
});
