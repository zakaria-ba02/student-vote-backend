import { YearEnum } from "../enums/year.enum";

export function academicHours(completedHours: number): YearEnum {
    if (completedHours >= 171) {
        return YearEnum.GRADUATED;
    } else if (completedHours >= 151) {
        return YearEnum.ofGraduates;
    } else if (completedHours >= 122) {
        return YearEnum.FIFTH;
    } else if (completedHours >= 88) {
        return YearEnum.FOURTH;
    } else if (completedHours >= 56) {
        return YearEnum.THIRD;
    } else if (completedHours >= 24) {
        return YearEnum.SECOUND;
    } else {
        return YearEnum.FIRST;
    }
}