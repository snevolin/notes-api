import { DataSource } from 'typeorm';
import { User, Note } from './common/entities';

const dataSource = new DataSource({
  type: 'sqlite',
  database: 'db.sqlite',
  entities: [User, Note],
  synchronize: true,
});

async function seed() {
  await dataSource.initialize();

  const userRepo = dataSource.getRepository(User);

  const admin = userRepo.create({ username: 'admin', role: 'super-admin' });
  const demo = userRepo.create({ username: 'demo', role: 'user' });

  await userRepo.save([admin, demo]);

  console.log('Seeding complete!');
  await dataSource.destroy();
}

seed().catch((err) => {
  console.error('Seeding failed!');
  console.error(err);
  process.exit(1);
});
