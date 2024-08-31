import { Column, Entity, PrimaryGeneratedColumn, 
    OneToOne, JoinColumn } from "typeorm"
import { Profile } from "./profile.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;
    
    @OneToOne(()=> Profile, (profile) => profile.user,  {cascade: true, eager: false})
    @JoinColumn()
    profile: Profile
}