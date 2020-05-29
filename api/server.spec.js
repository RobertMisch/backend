/*my list of endpoints endpoints 23
unprotected
accounts: login, register, up 3
protected:
users: 
    api/users: get, getid, post, put, delete 5
    api/users/attendee: getid, post, delete 3

potlucks:
    api/potlucks: get, getid, post, delete 4
    api/potlucks/items: getid, postid, delete 3
items:
    api/items: get, getid, post, put, delete 5
*/

const request = require("supertest");

const server = require("./server.js");
const db = require("../database/dbConfig.js");

afterAll(() => {
    return db.migrate.rollback().then(() => db.migrate.latest()).then(() => db.seed.run());
});

describe("server", () => {
    it("can run the tests", () => {
        expect(true).toBeTruthy();
    });
    //api up
    //auth
    describe("POST /api/accounts/register", () => {
        it("should return 201", () => {
            return request(server)
                .post("/api/accounts/register")
                .send({
                    "username": "lemons",
                    "password": "spooky"
                })
                .then(response => {
                    expect(response.status).toBe(201);
                    expect(response.body.data.username).toEqual("lemons")
                });
        });
    })
    describe("POST /login", () => {
        it("should return 201", () => {
            return request(server)
                .post("/api/accounts/login")
                .send({
                    "username": "lemons",
                    "password": "spooky"
                })
                .then(response => {
                    expect(response.status).toBe(200);
                    expect(response.body.token).toBeDefined();
                });
        });
    })
    //users
    //api/users: get, getid, post, put, delete 5
    //api/users/attendee: getid, post, delete 3
    test("GET /api/users to get all users", async () => {
        const register = await request(server)
            .post("/api/accounts/register")
            .send({ username: "fancy", password: "way" });
        const login = await request(server)
            .post("/api/accounts/login")
            .send({ username: "fancy", password: "way" });
        const res = await request(server)
            .get("/api/users")
            .set("authorization", login.body.token);
        expect(res.body).toHaveLength(5);
        expect(res.body[0]).toHaveProperty("id");
    });
    test("GET /api/users/id to get a specific user", async () => {
        const register = await request(server)
            .post("/api/accounts/register")
            .send({ username: "fancy", password: "way" });
        const login = await request(server)
            .post("/api/accounts/login")
            .send({ username: "fancy", password: "way" });
        const res = await request(server)
            .get("/api/users/1")
            .set("authorization", login.body.token);
        expect(res.body).toBeDefined();
        expect(res.body).toHaveProperty("id");
    });
    test("POST /api/users to make a new user", async () => {
        const newUser={
            "username":"another test",
            "password":"spooky"
        }
        const register = await request(server)
            .post("/api/accounts/register")
            .send({ username: "fancy", password: "way" });
        const login = await request(server)
            .post("/api/accounts/login")
            .send({ username: "fancy", password: "way" });
        const res = await request(server)
            .post("/api/users")
            .send(newUser)
            .set("authorization", login.body.token);
        expect(res.body.username).toBeDefined();
        expect(res.body).toHaveProperty("id");
    });
    test("PUT /api/users to update a user", async () => {
        // const register = await request(server)
        //     .post("/api/accounts/register")
        //     .send({ username: "fancy", password: "way" });
        const changes={};
        const login = await request(server)
            .post("/api/accounts/login")
            .send({ username: "fancy", password: "way" });
        const res = await request(server)
            .put("/api/users", (changes))
            .set("authorization", login.body.token);
        expect(res.body).toHaveLength(2);
        expect(res.body[0]).toHaveProperty("id");
    });
    test("DELETE /api/users to get all users", async () => {
        const register = await request(server)
            .post("/api/accounts/register")
            .send({ username: "fancy", password: "way" });
        const login = await request(server)
            .post("/api/accounts/login")
            .send({ username: "fancy", password: "way" });
        const res = await request(server)
            .get("/api/users")
            .set("authorization", login.body.token);
        expect(res.body).toHaveLength(2);
        expect(res.body[0]).toHaveProperty("id");
    });
})