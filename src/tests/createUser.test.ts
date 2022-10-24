import request from "supertest"
import app from "../app"

describe("Creante an user", () => {
    const data =  {
        name: "Leonardo",
        email: "leonardo@mail.com",
        password: "123456"
    }

    test('Insert information of the new user', async () => {
        const user = await request(app).post("/users").send(data)

        expect(user.status).toBe(201)
        expect(user.body).toHaveProperty("name")
        expect(user.body).toHaveProperty("email")
        expect(user.body).toHaveProperty("password")
    })

    test("Inserting information of the user alrealdy exist", async () => {
        const user = await request(app).post("/users").send(data)

        expect(user.status).toBe(400)
        expect(user.body).toHaveProperty("message")
    })

    test("Listing list of users", async () => {
        const list = await request(app).get("/users")

        expect(list.status).toBe(200)
        console.log(list.body)
        expect(list.body).not.toHaveLength(0)
    })

})