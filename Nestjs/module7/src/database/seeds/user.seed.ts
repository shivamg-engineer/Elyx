import { Users } from "../../users/user.entity";
import { DataSource } from "typeorm";

export async function seedUsers(dataSource:DataSource){
    const userRepo= dataSource.getRepository(Users);

     const users = [
    {
      name: 'Vishal',
      age: 29,
      email: 'vishal@gmail.com',
    },
    {
      name: 'Rahul',
      age: 26,
      email: 'rahul@gmail.com',
    },
  ];

  for(const user of users){
    const exists= await userRepo.findOneBy({email:user.email});
    if(!exists){
        await userRepo.save(userRepo.create(user));
    }
  }
   console.log('✅ Users seeded');
}