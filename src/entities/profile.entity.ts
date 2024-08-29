import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({name: "Profile"})
export class Profile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    gender: string;

    @Column({nullable: false})
    skill: string;
}