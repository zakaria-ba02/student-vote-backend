import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { MongooseModule } from "@nestjs/mongoose";
import { RolesGuard } from "./common/guards/roles.guard";
import { AuthModule } from "./modules/auth/auth.module";
import { CourseModule } from "./modules/course/course.module";
import { EmpModule } from "./modules/emp/emp.module";
import { MarkModule } from "./modules/mark/marke.module";
import { PrerModule } from "./modules/prerequisite/prerequisite.module";
import { PrerService } from "./modules/prerequisite/prerequisite.service";
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
        PrerModule,
        MarkModule,
        AuthModule,
        SeedModule

    ],
    // providers: [
    //     {
    //       provide: APP_GUARD,
    //       useClass: RolesGuard,
    //     },
    //   ],
})
export class AppModule { }