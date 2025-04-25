import { GpaType } from "../types/gpa-type.type";

export function gpaMark(mark: number):GpaType {
    if (mark < 50) {
        return { grade: "F", point: 0 };
    } else if (mark >= 50 && mark<55) {
        return { grade: "D", point: 1.5 };
    } else if (mark >= 55 && mark<60) {
        return { grade: "D+", point: 1.75 };
    } else if (mark >= 60 && mark<65) {
        return { grade: "C-", point: 2.0 };
    }else if (mark >= 65 && mark<70) {
        return { grade: "C", point: 2.25 };
    }else if (mark >= 70 && mark<75) {
        return { grade: "C+", point: 2.5 };
    }else if (mark >= 75 && mark<80) {
        return { grade: "B-", point: 2.75 };
    }else if (mark >= 80 && mark<85) {
        return { grade: "B", point: 3.0 };
    }else if (mark >= 85 && mark<90) {
        return { grade: "B+", point: 3.25 };
    }else if (mark >= 90 && mark<95) {
        return { grade: "A-", point: 3.5 };
    }else if (mark >= 95 && mark<98) {
        return { grade: "A", point: 3.75 };
    }else if (mark >= 98 && mark<=100) {
        return { grade: "A", point: 4.0 };
    }  else {
        return { grade: "Invalid", point: -1 }; // For marks > 100
    }
}
