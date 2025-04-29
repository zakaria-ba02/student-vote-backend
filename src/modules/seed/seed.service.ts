import { OnModuleInit } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as  bcrypt from "bcryptjs";
import { Model } from "mongoose";
import { YearEnum } from "src/common/enums/year.enum";
import { Course } from "../course/schema/course.schema";
import { Emp } from "../emp/schema/emp.schema";

export class SeedService implements OnModuleInit {
    constructor(
        @InjectModel(Emp.name) private readonly empModel: Model<Emp>,
        @InjectModel(Course.name) private readonly courseModel: Model<Course>,
    ) { }


    onModuleInit() {
        this.seedingAdmin()
        this.seedingCourse();
        this.seedingEmp()
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
                    name: "  لغة انكليزية 1 ",
                    teacher: " دانيا",
                    type: "Mandatory",
                    year: YearEnum.FIRST,
                    semester: 1,
                    courseCode: "ENG100",
                    creditHours:3
                },
                {
                    name: " مبادئ الحاسوب",
                    teacher: "سامر خانجي",
                    type: "Mandatory",
                    year: YearEnum.FIRST,
                    semester: 1,
                    courseCode: "ITC110",
                    creditHours:3
                },
                {
                    name: " رياضيات 1",
                    teacher: " بشير خراط",
                    type: "Mandatory",
                    year: YearEnum.FIRST,
                    semester: 1,
                    courseCode: "MTH105",
                    creditHours:3
                },
                {
                    name: " فيزياء 1",
                    teacher: " عبدالله طالب",
                    type: "Mandatory",
                    year: YearEnum.FIRST,
                    semester: 1,
                    courseCode: "PHS105",
                    creditHours:3
                },

                {
                    name: "مهارات حاسوب",
                    teacher: "سامر خانجي",
                    type: "Mandatory",
                    year: YearEnum.FIRST,
                    semester: 1,
                    courseCode: "ITC100",
                    creditHours:3
                },

                {
                    name: " لغة عربية ",
                    teacher: " محمد زكريا",
                    type: "Mandatory",
                    year: YearEnum.FIRST,
                    semester: 1,
                    courseCode: "ARB100",
                    creditHours:3
                },

                {
                    name: " لغة انكليزية 2",
                    teacher: "دانيا ",
                    type: "NOT Mandatory",
                    year: YearEnum.FIRST,
                    semester: 2,
                    courseCode: "ENG105",
                    creditHours:3
                },

                {
                    name: "الثقافة العربية ",
                    teacher: " رائد سليمان",
                    type: "Mandatory",
                    year: YearEnum.FIRST,
                    semester: 2,
                    courseCode: "ACI100",
                    creditHours:3
                },

                {
                    name: "رياضيات 2 ",
                    teacher: " بشير خراط ",
                    type: "Mandatory",
                    year: YearEnum.FIRST,
                    semester: 2,
                    courseCode: "MTH100",
                    creditHours:3
                },

                {
                    name: "فيزياء 2 ",
                    teacher: "  عبد الله طالب",
                    type: "Mandatory",
                    year: YearEnum.FIRST,
                    semester: 2,
                    courseCode: "PHS110",
                    creditHours:3
                },

                {
                    name: "  أسس الهدسة الكهربائية ",
                    teacher: " رياض مصطفى",
                    type: "Mandatory",
                    year: YearEnum.FIRST,
                    semester: 2,
                    courseCode: "ELC120",
                    creditHours:3
                },

                {
                    name: "مبادئ البرمجة ",
                    teacher: " اياد هلالي",
                    type: "Mandatory",
                    year: YearEnum.FIRST,
                    semester: 2,
                    courseCode: "ITC115",
                    creditHours:3
                },

                {
                    name: "لغة اكليزية 3 ",
                    teacher: "  دانيا",
                    type: "Not Mandatory",
                    year: YearEnum.SECOUND,
                    semester: 1,
                    courseCode: "ENG105",
                    creditHours:3
                },

                {
                    name: "رياضيات 3 ",
                    teacher: "  بشير خراط",
                    type: "Mandatory",
                    year: YearEnum.SECOUND,
                    semester: 1,
                    courseCode: "MTH115",
                    creditHours:3
                },

                {
                    name: "أسس الهدسة الالكترونية ",
                    teacher: "عارف نعمة",
                    type: "Mandatory",
                    year: YearEnum.SECOUND,
                    semester: 1,
                    courseCode: "ELC201",
                    creditHours:3
                },

                {
                    name: " نظرية الحقول الكهرطيسية ",
                    teacher: " عبد الباسط حيدر ",
                    type: "Mandatory",
                    year: YearEnum.SECOUND,
                    semester: 1,
                    courseCode: "ELC207",
                    creditHours:3
                },

                {
                    name: " اشارات ونظم ",
                    teacher: "عبدالمنعم عبدالله",
                    type: "Mandatory",
                    year: YearEnum.SECOUND,
                    semester: 1,
                    courseCode: "ITC203",
                    creditHours:3
                },

                {
                    name: " البرمجة غرضية التوجه ",
                    teacher: " اياد هلالي",
                    type: "Mandatory",
                    year: YearEnum.SECOUND,
                    semester: 1,
                    courseCode: "ITC209",
                    creditHours:3
                },

                {
                    name: " احصاء ",
                    teacher: " بشير خراط",
                    type: "Mandatory",
                    year: YearEnum.SECOUND,
                    semester: 2,
                    courseCode: "STA400",
                    creditHours:2
                },

                {
                    name: " نظرية المعلومات ",
                    teacher: "عبد المنعم عبدالله",
                    type: "Mandatory",
                    year: YearEnum.SECOUND,
                    semester: 2,
                    courseCode: "ITC214",
                    creditHours:3
                },

                {
                    name: " الكترونيات 1 ",
                    teacher: "بدر الدين قصاب",
                    type: "Mandatory",
                    year: YearEnum.SECOUND,
                    semester: 2,
                    courseCode: "ELC222",
                    creditHours:3
                },

                {
                    name: "النظم المنطقية والدارات الرقمية",
                    teacher: "سامر خانجي",
                    type: "Mandatory",
                    year: YearEnum.SECOUND,
                    semester: 2,
                    courseCode: "ITC216",
                    creditHours:3
                },

                {
                    name: " معالجة الاشارة الرقمية ",
                    teacher: " غفار الرفاعي",
                    type: "Mandatory",
                    year: YearEnum.SECOUND,
                    semester: 2,
                    courseCode: "ITC212",
                    creditHours:3
                },

                {
                    name: "الخوارزميات وبنى المعطيات ",
                    teacher: "هنادي جاديبا",
                    type: "Mandatory",
                    year: YearEnum.SECOUND,
                    semester: 2,
                    courseCode: "ITC218",
                    creditHours:3
                },

                {
                    name: "تنظيم الحاسوب ولغة التجميع",
                    teacher: "محمد زكريا",
                    type: "Mandatory",
                    year: YearEnum.THIRD,
                    semester: 1,
                    courseCode: "ITC301",
                    creditHours:3
                },

                {
                    name: "الكترونيات 2",
                    teacher: " بدر الدين قصاب",
                    type: "Mandatory",
                    year: YearEnum.THIRD,
                    semester: 1,
                    courseCode: "ELC313",
                    creditHours:3
                },

                {
                    name: " مبادئ الاتصالات ",
                    teacher: "عبد الباسط حيدر",
                    type: "Mandatory",
                    year: YearEnum.THIRD,
                    semester: 1,
                    courseCode: "ITC311",
                    creditHours:3
                },
                {
                    name: " مبادئ الذكاء الصنعي ",
                    teacher: "عبد القادر جوخدار",
                    type: "Mandatory",
                    year: YearEnum.THIRD,
                    semester: 1,
                    courseCode: "ITC303",
                    creditHours:3
                },

                {
                    name: "  لغات البرمجة والمترجمات ",
                    teacher: "هنادي جاديبا",
                    type: "Mandatory",
                    year: YearEnum.THIRD,
                    semester: 1,
                    courseCode: "ITC307",
                    creditHours:3
                },

                {
                    name: "  قواعد المعطيات ",
                    teacher: "اياد هلالي",
                    type: "Mandatory",
                    year: YearEnum.THIRD,
                    semester: 1,
                    courseCode: "ITC309",
                    creditHours:3
                },

                {
                    name: " بنية الحاسوب ",
                    teacher: " أيمن نعال",
                    type: "Mandatory",
                    year: YearEnum.THIRD,
                    semester: 2,
                    courseCode: "ITC322",
                    creditHours:3
                },

                {
                    name: "تحكم منطقي ",
                    teacher: "سامر خانجي",
                    type: "Mandatory",
                    year: YearEnum.THIRD,
                    semester: 2,
                    courseCode: "ITC316",
                    creditHours:3
                },

                {
                    name: "الوثوقية وكشف الاعطال ",
                    teacher: " عبد القادر جوخدار ",
                    type: "Mandatory",
                    year: YearEnum.THIRD,
                    semester: 2,
                    courseCode:"ELC324",
                    creditHours:3
                },

                {
                    name: "نظم الملائمة البينية للحاسوب",
                    teacher: "سامر خانجي",
                    type: "Mandatory",
                    year: YearEnum.THIRD,
                    semester: 2,
                    courseCode: "ITC324",
                    creditHours:3
                },


                {
                    name: "اتصالات رقمية",
                    teacher: "رزان فتال",
                    type: "Mandatory",
                    year: YearEnum.THIRD,
                    semester: 2,
                    courseCode: "ITC318",
                    creditHours:3
                },

                {
                    name: "هندسة البرمجيات 1",
                    teacher: "محمد زكريا",
                    type: "Mandatory",
                    year: YearEnum.THIRD,
                    semester: 2,
                    courseCode: "ITC326",
                    creditHours:3
                },


                {
                    name: "نظم تشغيل",
                    teacher: "سامر خانجي",
                    type: "Mandatory",
                    year: YearEnum.FOURTH,
                    semester: 1,
                    courseCode: "ITC407",
                    creditHours:3
                },
                {
                    name: "شبكات الحاسوب 1",
                    teacher: "يحيى فريد",
                    type: "Mandatory",
                    year: YearEnum.FOURTH,
                    semester: 1,
                    courseCode: "ITC411",
                    creditHours:3
                },
                {
                    name: "ادارة و تنظيم مشاريع هندسية",
                    teacher: "سامر خانجي",
                    type: "Mandatory",
                    year: YearEnum.FOURTH,
                    semester: 1,
                    courseCode: "BUS500",
                    creditHours:2
                },
                {
                    name: "النمذجة و المحاكاة",
                    teacher: "هنادي جاديبا",
                    type: "Mandatory",
                    year: YearEnum.FOURTH,
                    semester: 1,
                    courseCode: "ITC403",
                    creditHours:3
                },
                {
                    name: "الامواج الميكروية و الهوائيات",
                    teacher: "عبد الباسط حيدر",
                    type: "Mandatory",
                    year: YearEnum.FOURTH,
                    semester: 1,
                    courseCode: "ITC409",
                    creditHours:3
                },

                {
                    name: "اتصالات رقمية متقدمة",
                    teacher: "رزان فتال",
                    type: "Mandatory",
                    year: YearEnum.FOURTH,
                    semester: 1,
                    courseCode: "ITC401",
                    creditHours:3
                },

                {
                    name: " شبكات الحاسوب 2 ",
                    teacher: "يحيى فريد",
                    type: "Mandatory",
                    year: YearEnum.FOURTH,
                    semester: 2,
                    courseCode: "ITC416",
                    creditHours:3
                },

                {
                    name: " الاتصالات الاسلكية ",
                    teacher: " عبد الباسط حيدر",
                    type: "Mandatory",
                    year: YearEnum.FOURTH,
                    semester: 2,
                    courseCode: "ITC422",
                    creditHours:3
                },

                {
                    name: "  هندسة المقاسم الهاتفية ",
                    teacher: " رزان فتال ",
                    type: "Mandatory",
                    year: YearEnum.FOURTH,
                    semester: 2,
                    courseCode: "ITC414",
                    creditHours:3
                },

                {
                    name: " تقنية الوسائط المتعددة  ",
                    teacher: " محمد شعار  ",
                    type: "Mandatory",
                    year: YearEnum.FOURTH,
                    semester: 2,
                    courseCode: "ITC412",
                    creditHours:3
                },

                {
                    name: "  النظم الخبيرة ",
                    teacher: "عبد القادر جوخدار",
                    type: "Mandatory",
                    year: YearEnum.FOURTH,
                    semester: 2,
                    courseCode: "ITC418",
                    creditHours:3
                },

                {
                    name: " أخلاقيات المهنة ",
                    teacher: " محمد زكريا ",
                    type: "Mandatory",
                    year: YearEnum.FIFTH,
                    semester: 1,
                    courseCode: "BUS510",
                    creditHours:2
                },

                {
                    name: " تحليل وتصميم النظم ",
                    teacher: " اياد هلالي ",
                    type: "Mandatory",
                    year: YearEnum.FIFTH,
                    semester: 1,
                    courseCode: "ITC511",
                    creditHours:3
                },


                {
                    name: " أمن المعلومات ",
                    teacher: " يحيى فري ",
                    type: "Mandatory",
                    year: YearEnum.FIFTH,
                    semester: 1,
                    courseCode: "ITC509",
                    creditHours:3
                },

                {
                    name: "نظم اتصالات 1",
                    teacher: " عبد الباسط حيدر ",
                    type: "Mandatory",
                    year: YearEnum.FIFTH,
                    semester: 1,
                    courseCode: "ITC501",
                    creditHours:3
                },


                {
                    name: "نظم اتصالات الاسلكية الحديثة",
                    teacher: " عبد الباسط حيدر ",
                    type: "Not Mandatory",
                    year: YearEnum.FIFTH,
                    semester: 1,
                    courseCode: "ITC515",
                    creditHours:3
                },

                {
                    name: "هندسة البرمجيات  2",
                    teacher: " عبد الباسط حيدر ",
                    type: "Not Mandatory",
                    year: YearEnum.FIFTH,
                    semester: 1,
                    courseCode: "ITC501",
                    creditHours:3
                },

                {
                    name: "قواعد معطيات متقدمة",
                    teacher: "اياد هلالي",
                    type: "Mandatory",
                    year: YearEnum.FIFTH,
                    semester: 1,
                    courseCode: "ITC503",
                    creditHours:3
                },

                {
                    name: "النظم الفرعية والموزعة",
                    teacher: " ايمن نعال ",
                    type: "Not Mandatory",
                    year: YearEnum.FIFTH,
                    semester: 2,
                    courseCode: "ITC507",
                    creditHours:3
                },

                {
                    name: " رؤية حاسوبية ",
                    teacher: "فاطمة قداد ",
                    type: "Mandatory",
                    year: YearEnum.FIFTH,
                    semester: 2,
                    courseCode: "ITC512",
                    creditHours:3
                },


                {
                    name: "  تقنية الانترنت ",
                    teacher: " اياد هلالي ",
                    type: "Mandatory",
                    year: YearEnum.FIFTH,
                    semester: 2,
                    courseCode: "ITC514",
                    creditHours:3
                },

                {
                    name: "  نظم اتصالات 2 ",
                    teacher: " عبد الباسط حيدر ",
                    type: "Not Mandatory",
                    year: YearEnum.FIFTH,
                    semester: 2,
                    courseCode: "ITC516",
                    creditHours:3
                },


                {
                    name: "  نمذجة ومحاكاة متقدمة ",
                    teacher: " هنادي جاديبا ",
                    type: "Not Mandatory",
                    year: YearEnum.FIFTH,
                    semester: 2,
                    courseCode: "ITC417",
                    creditHours:3
                },

                {
                    name: "  حوسبة مفتوحة المصدر ",
                    teacher: " اياد هلالي ",
                    type: "Not Mandatory",
                    year: YearEnum.FIFTH,
                    semester: 2,
                    courseCode: "ITC506",
                    creditHours:3
                },

                {
                    name: "  أمن شبكات ",
                    teacher: " يحيى فريد ",
                    type: "Mandatory",
                    year: YearEnum.FIFTH,
                    semester: 2,
                    courseCode: "ITC518",
                    creditHours:3
                },


                {
                    name: "  مشروع الخرج ",
                    teacher: " محمد زكريا ",
                    type: "Mandatory",
                    year: YearEnum.FIFTH,
                    semester: 2,
                    courseCode: "ITC520",
                    creditHours:6
                },
//كيف ننحطا لكل السنين
                {
                    name: " مجتمع وبيئة  ",
                    teacher: " محمد زكريا ",
                    type: "Mandatory",
                    year: YearEnum.FIRST,
                    semester: 2,
                    courseCode: "ITC520",
                    creditHours:3
                },

                {
                    name: " مبادئ اقتصاد ",
                    teacher: " محمد زكريا ",
                    type: "Mandatory",
                    year: YearEnum.FIRST,
                    semester: 2,
                    courseCode: "ITC520",
                    creditHours:3
                },

            ]

            await this.courseModel.insertMany(courses);
            console.log("Seeded Courses Success");
        } else {
            console.log("Courses Already exist");

        }
    }



    async seedingEmp() {
        console.log("Seeding Emp .....");
        const existEmp = await this.empModel.findOne({ role: "emp" });
        if (!existEmp) {
            const Emp = {
                name: "Emp",
                role: "emp",
                email: "emp@info.com",
                password: await bcrypt.hash("emp@123", 10),
                dob: new Date().toDateString(),
            }
            await this.empModel.create(Emp);
            console.log("Seeded Successfully");
        } else {
            console.log("Therer are already emp");

        }
    }
}