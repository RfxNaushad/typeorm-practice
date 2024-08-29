import express, { Request, Response } from "express";
import { AppDataSource } from "./dataSource/dataSource";
import { User } from "./entities/user.entity";

const app = express()
const PORT = 3000

AppDataSource.initialize().then(() => {
    console.log("Database Connected");
}).catch((err) => {
    console.log("Database Failed", err)
})

const user1 = new User()
user1.firstName = "Naushad"
user1.lastName = "Karim"

const user2 = new User()
user2.firstName = "Ahnaf"
user2.lastName = "Karim"

app.get('/', async(req: Request, res: Response) => {
    let userRepo =  AppDataSource.getRepository(User)
    res.json(await userRepo.save([user1, user2]))
})

app.get('/find', async(req: Request, res: Response) => {
    let userRepo =  AppDataSource.getRepository(User)
    res.json(await userRepo.find({
        select: [
            "firstName"
        ],
        order: {
            id: "desc"
        }
    }))
})

// app.get('/:id', async(req: Request, res: Response) => {
//     const id = req.params
//     let userRepo =  AppDataSource.getRepository(User)
//     res.json(await userRepo.find({id}))
// })

app.listen(PORT, () => {
    console.log('Server connected')
})