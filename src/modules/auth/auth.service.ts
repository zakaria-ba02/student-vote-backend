import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateEmpDto } from "../emp/dtos/create.dto";
import { CreateStudentDto } from "../student/dtos/create.dto";
import { LoginStudentDto } from "../student/dtos/login.dto";
import * as bcrypt from 'bcryptjs';
import { LoginEmpDto } from "../emp/dtos/login.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Emp } from "../emp/schema/emp.schema";
import { Model } from "mongoose";
import { Student } from "../student/schema/student.schema";
import { Role } from "../emp/enums/role.enum";
import { LoginAdminDto } from "../emp/dtos/login-admin.dto";

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Emp.name) private readonly empModel: Model<Emp>,
        @InjectModel(Student.name) private readonly studentModel: Model<Student>,
        private readonly jwtService: JwtService
    ) { }

    async registerEmp(emp: CreateEmpDto) {
        try {
            const existingEmp = await this.empModel.findOne({ email: emp.email });
            if (existingEmp) {
                throw new BadRequestException('Email already exists');
            }
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(emp.password, salt);
            emp.password = hashPassword;

            const newEmp = await this.empModel.create(emp);
            return await newEmp.save();
        } catch (error) {
            throw new BadRequestException(error.message || 'Invalid input');
        }
    }


    async registerStudent(student: CreateStudentDto) {
        try {
            const existingStudent = await this.studentModel.findOne({
                universityId: student.universityId
            });

            if (existingStudent) {
                throw new ConflictException(' الرقم الجامعي مسجل مسبقاً');
            }
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(student.password, salt);
            student.password = hashPassword;

            const newStudent = await this.studentModel.create(student);
            return await newStudent.save();
        } catch (error) {
            if (error instanceof ConflictException) {
                throw error;
            }
            throw new InternalServerErrorException('حدث خطأ أثناء تسجيل الطالب');
        }
    }

    
    async loginStudent(loginDto: LoginStudentDto) {
        const student = await this.studentModel.findOne({ universityId: loginDto.universityId });
        if (!student) {
            throw new UnauthorizedException('universityId or password wrong');
        }
        const isCorrect = await bcrypt.compare(loginDto.password, student.password);
        if (isCorrect) {
            return {
                message: "Login successfully",
                access_token: this.jwtService.sign({
                    name: student.name,
                    major: student.major,
                    year: student.year,
                    role: Role.STUDENT,
                    universityId: student.universityId,
                    _id: student._id
                }),
                student
            }
        } else {
            throw new UnauthorizedException('universityId or password wrong');
        }
    }

    async loginEmp(loginEmpDto: LoginEmpDto) {
        const emp = await this.empModel.findOne({ email: loginEmpDto.email })
        if (!emp) {
            throw new UnauthorizedException('email or password wrong');
        }
        const isCorrect = await bcrypt.compare(loginEmpDto.password, emp.password);

        if (isCorrect) {
            return {
                message: "Login Successfully",
                access_token: this.jwtService.sign({
                    name: emp.name,
                    role: emp.role,
                    _id: emp._id,
                    email: emp.email,
                    dob: emp.dob
                }),
                user:emp
            }
        } else {
            throw new UnauthorizedException('email or password wrong');
        }
    }

    async loginAdmin(loginAdminDto: LoginAdminDto) {
        const admin = await this.empModel.findOne({ email: loginAdminDto.email })
        if (!admin) {
            throw new UnauthorizedException('email or password wrong');
        }
        const isCorrect = await bcrypt.compare(loginAdminDto.password, admin.password);

        if (isCorrect) {
            return {
                message: "Login Successfully",
                access_token: this.jwtService.sign({
                    name: admin.name,
                    role: admin.role,
                    _id: admin._id,
                    email: admin.email,
                    dob: admin.dob
                })
            }
        } else {
            throw new UnauthorizedException('email or password wrong');
        }
    }
}