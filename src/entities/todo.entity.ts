import { Column, Entity, PrimaryGeneratedColumn, 
    OneToOne, JoinColumn, 
    ManyToMany,
    ManyToOne} from "typeorm"
import { User } from "./user.entity";


@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    title: string;

    @Column({nullable: true})
    description: string;

    @Column({nullable: false})
    isCompleted: boolean;
    
    @ManyToOne(() => User, (user) => user.todos)
    user: User
}