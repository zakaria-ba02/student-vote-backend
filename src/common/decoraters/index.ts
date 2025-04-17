import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetStudentId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const student = request.user;
    
    if (!student || !student._id) {
      return null;
    }
    
    return student._id;
  },
);


export const GetStudentYear = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const student = request.user;
    
    if (!student || !student._id) {
      return null;
    }
    
    return student.year;
  },
);

export const GetStudentMajor = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
      const request = ctx.switchToHttp().getRequest();
      const student = request.user;
      
      if (!student || !student.universityId) {
        return null;
      }
      
      return student.major;
    },
  );
  
