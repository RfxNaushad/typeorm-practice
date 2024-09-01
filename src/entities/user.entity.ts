import { Column, Entity, PrimaryGeneratedColumn, 
    OneToOne, JoinColumn, 
    OneToMany} from "typeorm"
import { Profile } from "./profile.entity";
import { Todo } from "./todo.entity";

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
    
    @OneToMany(()=> Todo, (todo) => todo.user, {cascade: true} )
    todos: Todo[]
}