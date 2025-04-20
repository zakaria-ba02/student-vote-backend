import { OnModuleInit } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as  bcrypt from "bcryptjs";
import { Model } from "mongoose";
import { YearEnum } from "src/common/enums/year.enum";
import { Course } from "../course/schema/course.schema";
import { CreateEmpDto } from "../emp/dtos/create.dto";
import { Emp } from "../emp/schema/emp.schema";

export class SeedService implements OnModuleInit {
    constructor(
        @InjectModel(Emp.name) private readonly empModel: Model<Emp>,
        @InjectModel(Course.name) private readonly courseModel: Model<Course>,
    ) { }


    onModuleInit() {
        this.seedingAdmin()
        this.seedingCourse();
    }

    async seedingAdmin() {
        console.log("Seeding Admin .....");
        const existAdmin = await this.empModel.findOne({ role: "admin" });
        if (!existAdmin) {
            const admin = {
                name: "Admin",
                role: "admin",
                email: "admin@info.com",
                password: await bcrypt.hash("Admin@123", 10),
                dob: new Date().toDateString(),
            }
            await this.empModel.create(admin);
            console.log("Seeded Successfully");
        } else {
            console.log("Therer are already admin");

        }
    }

    async seedingCourse() {
        console.log("Start Courses Seeding ...");
        
        const existCourse = await this.courseModel.findOne({ courseCode: "ITC100" });
        if (!existCourse) {
            const courses = [
                {
                    name: "مهارات حاسوب",
                    teacher: "سامر خانجي",
                    type: "Mandatory",
                    year: YearEnum.FIRST,
                    semster: "الاول",
                    courseCode: "ITC100",
                },
                {
                    name: "مهارات حاسوب",
                    teacher: "سامر خانجي",
                    type: "Mandatory",
                    year: YearEnum.FIRST,
                    semster: "الاول",
                    courseCode: "ITC100",
                },
                {
                    name: "مهارات حاسوب",
                    teacher: "سامر خانجي",
                    type: "Mandatory",
                    year: YearEnum.FIRST,
                    semster: "الاول",
                    courseCode: "ITC100",
                },
                {
                    name: "مهارات حاسوب",
                    teacher: "سامر خانجي",
                    type: "Mandatory",
                    year: YearEnum.FIRST,
                    semster: "الاول",
                    courseCode: "ITC100",
                }
            ]

            await this.courseModel.insertMany(courses);
            console.log("Seeded Courses Success");
        }else{
            console.log("Courses Already exist");

        }
    }
}