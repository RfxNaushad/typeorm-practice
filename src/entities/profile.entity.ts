import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./user.entity";

@Entity({name: "Profile"})
export class Profile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    gender: string;

    @Column({nullable: false})
    skill: string;

    user: User;
}