import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateEmpDto } from "../emp/dtos/create.dto";
import { EmpService } from "../emp/emp.service";
import { CreateStudentDto } from "../student/dtos/create.dto";
import { LoginStudentDto } from "../student/dtos/login.dto";
import { StudentService } from "../student/student.service";
import * as bcrypt from 'bcryptjs';
import { LoginEmpDto } from "../emp/dtos/login.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Emp } from "../emp/schema/emp.schema";
import { Model } from "mongoose";
import { Student } from "../student/schema/student.schema";
import { Role } from "../emp/enums/role.enum";

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Emp.name) private readonly empModel: Model<Emp>,
        @InjectModel(Student.name) private readonly studentModel: Model<Student>,
        private readonly jwtService: JwtService
    ) { }

    async registerEmp(emp: CreateEmpDto) {
        try {
            const newEmp = await this.empModel.create(emp);
            return await newEmp.save();
        } catch (error) {
            throw new BadRequestException('Invalid input');
        }
    }


    async registerStudent(student: CreateStudentDto) {
        try {
            return await this.empModel.create(student);

        } catch (error) {
            throw new BadRequestException('Invalid input');
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
                })
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
                })
            }
        } else {
            throw new UnauthorizedException('email or password wrong');
        }

    }


}