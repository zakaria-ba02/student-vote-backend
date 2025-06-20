import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./modules/auth/auth.module";
import { CourseModule } from "./modules/course/course.module";
import { EmpModule } from "./modules/emp/emp.module";
import { MarkModule } from "./modules/mark/marke.module";
import { SeedModule } from "./modules/seed/seed.module";
import { StudentModule } from "./modules/student/student.module";
import { VoteModule } from "./modules/votes/vote.module";


@Module({
    imports: [
        ConfigModule.forRoot({
          isGlobal: true, 
          envFilePath: '.env', 
        }),  
        MongooseModule.forRoot(
          process.env.MONGO_URL
      ),  
        EmpModule,
        StudentModule,
        VoteModule,
        CourseModule,
        MarkModule,
        AuthModule,
        SeedModule,
        

    ],
    
})
export class AppModule { }