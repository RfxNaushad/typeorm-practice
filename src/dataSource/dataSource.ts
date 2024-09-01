import { DataSource } from "typeorm";

import { User } from "../entities/user.entity";
import { Profile } from "../entities/profile.entity";
import { Todo } from "../entities/todo.entity";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "123456",
    database: "test",
    synchronize: true,
    logging: true,
    entities: [
        User, Profile, Todo
    ],
    subscribers: [],
    migrations: [],
})
