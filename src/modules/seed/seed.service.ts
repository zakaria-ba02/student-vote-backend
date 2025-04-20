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
                    name: " لغة انكليزية 1",
                    teacher: "ديانا",
                    type: "Mandatory",
                    year: YearEnum.FIRST,
                    semster: "الاول",
                    courseCode: "ENG100",
                },
                {
                    name: "مبادئ الحاسوب",
                    teacher: "سامر خانجي",
                    type: "Mandatory",
                    year: YearEnum.FIRST,
                    semster: "الاول",
                    courseCode: "ITC110",
                },
                {
                    name: "رياضيات 1",
                    teacher: "بشير خراط",
                    type: "Mandatory",
                    year: YearEnum.FIRST,
                    semster: "الاول",
                    courseCode: "MTH105",
                },
                {
                    name: "فيزياء 1",
                    teacher: "عبدالله طالب",
                    type: "Mandatory",
                    year: YearEnum.FIRST,
                    semster: "الاول",
                    courseCode: "PHS105",
                },

                {
                    name: "مهارات حاسوب 1",
                    teacher: "سامر خانجي",
                    type: "Mandatory",
                    year: YearEnum.FIRST,
                    semster: "الاول",
                    courseCode: "ITC100",
                },

                {
                    name: "لغة عربية",
                    teacher: "محمد زكريا",
                    type: "Mandatory",
                    year: YearEnum.FIRST,
                    semster: "الاول",
                    courseCode: "ARB100",
                },

                {
                    name: "لغة انكليزية 2",
                    teacher: "دانيا",
                    type: "Not Mandatory",
                    year: YearEnum.FIRST,
                    semster: "الثاني",
                    courseCode: "ENG105",
                },
                {
                    name: "الثقافة العربية",
                    teacher: "دانيا",
                    type: "Mandatory",
                    year: YearEnum.FIRST,
                    semster: "الثاني",
                    courseCode: "ACI100",
                },

                {
                    name: "رياضيات 2",
                    teacher: "بشير خراط",
                    type: "Mandatory",
                    year: YearEnum.FIRST,
                    semster: "الثاني",
                    courseCode: "MTH110",
                },

                {
                    name: "فيزياء 2",
                    teacher: "عبدالله طالب",
                    type: "Mandatory",
                    year: YearEnum.FIRST,
                    semster: "الثاني",
                    courseCode: "PHS110",
                },

                {
                    name: "أسس الهندسة الكهربائية",
                    teacher: "رياض مصطفى",
                    type: "Mandatory",
                    year: YearEnum.FIRST,
                    semster: "الثاني",
                    courseCode: "ELC120",
                },

                {
                    name: "مبادئ البرمجة ",
                    teacher: "اياد هلالي",
                    type: "Mandatory",
                    year: YearEnum.FIRST,
                    semster: "الثاني",
                    courseCode: "ITC115",
                },

                {
                    name: "لغة انكليزية 3 ",
                    teacher: "دانيا",
                    type: "Not Mandatory",
                    year: YearEnum.SECOUND,
                    semster: "الاول",
                    courseCode: "ENG110",
                },

                {
                    name: "رياضيات 3",
                    teacher: "بشير خراط",
                    type: "Mandatory",
                    year: YearEnum.SECOUND,
                    semster: "الاول",
                    courseCode: "MTH115",
                },

                {
                    name: " أسس الهدسة الالكترونية ",
                    teacher: " عارف نعمة",
                    type: "Mandatory",
                    year: YearEnum.SECOUND,
                    semster: "الاول",
                    courseCode: "ELC201",
                },

                {
                    name: " نظرية الحقول الكهرطيسية",
                    teacher: "عبد الباسط حيدر",
                    type: "Mandatory",
                    year: YearEnum.SECOUND,
                    semster: "الاول",
                    courseCode: "ELC207",
                },

                {
                    name: "اشارات ونظم",
                    teacher: "بشير خراط",
                    type: "Mandatory",
                    year: YearEnum.SECOUND,
                    semster: "الاول",
                    courseCode: "MTH115",
                },


            ]

            await this.courseModel.insertMany(courses);
            console.log("Seeded Courses Success");
        }else{
            console.log("Courses Already exist");

        }
    }
}