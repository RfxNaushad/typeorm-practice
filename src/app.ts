import express, { Request, Response } from "express";
import { AppDataSource } from "./dataSource/dataSource";
import { User } from "./entities/user.entity";
import cors from 'cors';
import { Profile } from "./entities/profile.entity";
import { DataSource } from 'typeorm';
import { Todo } from "./entities/todo.entity";

const app = express()

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());
const PORT = 3000

AppDataSource.initialize().then(() => {
    console.log("Database Connected");
}).catch((err) => {
    console.log("Database Failed", err)
})


// app.get('/', async (req: Request, res: Response) => {
//     let userRepo = AppDataSource.getRepository(User)

//     const user1 = new User()
//     user1.firstName = "Naushad"
//     user1.lastName = "Karim"

//     const user2 = new User()
//     user2.firstName = "Ahnaf"
//     user2.lastName = "Karim"
//     res.json(await userRepo.save([user1, user2]))
// })


// app.post('/create-user', async (req: Request, res: Response) => {
//     const userRepo = AppDataSource.getRepository(User);
//     const profileRepo = AppDataSource.getRepository(Profile);

//     try {
//         const { firstName, lastName, profile } = req.body;
//         const existingProfile = await profileRepo.findOneBy({ id: profile.id });

//         if (!existingProfile) {
//             return res.status(404).json({ message: 'Profile not found' });
//         }

//         const newUser = userRepo.create({ firstName, lastName, profile: existingProfile });
//         const savedUser = await userRepo.save(newUser);

//         res.status(201).json(savedUser);
//     } catch (error: any) {
//         console.error('Error creating user:', error.message);
//         res.status(500).json({ message: 'Internal server error', error: error.message });
//     }
// });

// user crud
app.post('/create-user', async (req: Request, res: Response) => {
    const userRepo = AppDataSource.getRepository(User);

    try {

        const data = req.body;
        const newUser = userRepo.create(data);
        const savedUser = await userRepo.save(newUser);
        res.status(201).json(savedUser);

    } catch (error: any) {

        console.error('Error creating user:', error.message);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

app.get('/find-all', async (req: Request, res: Response) => {
    let userRepo = AppDataSource.getRepository(User)
    // res.json(await userRepo.find({
    //     select: [
    //         "firstName"
    //     ],
    //     order: {
    //         id: "desc"
    //     }
    // }))
    res.json(await userRepo.find())

})

app.get('/delete', async (req: Request, res: Response) => {
    let userRepo = AppDataSource.getRepository(User)
    res.json(await userRepo.delete(1))
})

app.get('/update', async (req: Request, res: Response) => {
    let userRepo = AppDataSource.getRepository(User);
    await userRepo.update(9, { firstName: "Kader" });
    const updatedUser = await userRepo.findOneBy({ id: 9 });
    res.json(updatedUser);

});


//  Profile Crud
app.post('/create-profile', async (req: Request, res: Response) => {
    const profileRepo = AppDataSource.getRepository(Profile);
    const data = req.body;

    try {
        const result = await profileRepo.save(data);
        res.status(201).json(result);
    } catch (error: any) {
        console.error('Error saving profile:', error.message);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

app.get('/get-profile', async (req: Request, res: Response) => {
    const profileRepo = AppDataSource.getRepository(Profile);
    
    try {
        const profiles = await profileRepo.find({
            relations: ["user"]
        }); 
        res.status(200).json(profiles); 
    } catch (error: any) {
        console.error('Error fetching profiles:', error.message);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// todo's many to one and one to many relation

app.listen(PORT, () => {
    console.log('Server connected')
})

app.post('/create-todo-user',async (req: Request, res: Response) => {
    const userRepo = AppDataSource.getRepository(User)

    const data = req.body

    try {
        const result = await userRepo.save(data);
        res.status(201).json(result);
    } catch (error: any) {
        console.error('Error saving profile:', error.message);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }

})

app.get('/find-todo', async (req: Request, res: Response) => {
    const todo = AppDataSource.getRepository(Todo)

    try {
        const todos = await todo.find({
            relations: ["user"]
        }); 
        res.status(200).json(todos); 
    } catch (error: any) {
        console.error('Error fetching profiles:', error.message);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
} )