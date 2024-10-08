import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, OneToMany, ManyToMany } from "typeorm"
import { Student } from "./student.entity";


@Entity({ name: "Course" })
export class Course {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    title: string;

    @Column({ nullable: false })
    code: string;

    @ManyToMany(() => Student, (student) => student.courses)
    students: Student[]
}