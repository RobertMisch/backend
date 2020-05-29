/*my list of endpoints: 24
unprotected
accounts: login, register, up 3
protected:
users: 
    api/users: get, getid, post, put, delete 5
    api/users/attendee: getid, post, delete 3

potlucks:
    api/potlucks: get, getid, post,put , delete 5
    api/potlucks/items: getid, postid, delete 3
items:
    api/items: get, getid, post, put, delete 5
*/

const request = require("supertest");

const server = require("./server.js");
const db = require("../database/dbConfig.js");

afterEach(() => {
    return db.migrate.rollback().then(() => db.migrate.latest()).then(() => db.seed.run());
});

describe("server", () => {
    it("can run the tests", () => {
        expect(true).toBeTruthy();
    });
    //******************************************************************************** */
    //api up
    test("GET / to see if api is up", async () => {
        const res = await request(server)
            .get("/")
        expect(res.status).toBe(200);
        expect(res.body.api).toBe("up");
    });
    //auth
    //******************************************************************************** */
    test("POST /api/accounts/register to make a users", async () => {
        const register = await request(server)
            .post("/api/accounts/register")
            .send({ username: "fancy", password: "way" });
        expect(register.status).toBe(201);
        expect(register.body).toBeDefined();
    });
    test("POST /api/accounts/login to get the auth token", async () => {
        const register = await request(server)
            .post("/api/accounts/register")
            .send({ username: "fancy", password: "way" });
        const res = await request(server)
            .post("/api/accounts/login")
            .send({ username: "fancy", password: "way" });
        expect(res.status).toBe(200);
        expect(res.body).toBeDefined();
        expect(res.body).toHaveProperty("token");
    });
    //******************************************************************************** */
    //users
    //api/users: get, getid, post, put, delete 
    //api/users/attendee: getid, post, delete 
    //******************************************************************************** */
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
        expect(res.body).toHaveLength(4);
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
        expect(res.body).toHaveProperty("potlucks");
        expect(res.status).toBe(200);
    });
    test("POST /api/users to make a new user", async () => {
        const newUser = {
            "username": "another test",
            "password": "spooky"
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
        expect(res.body.data.username).toBeDefined();
        expect(res.body.data).toHaveProperty("id");
        expect(res.status).toBe(201);
    });
    test("PUT /api/users to update a user", async () => {
        const changes = { username: "spooky", password: "lemons" };
        const register = await request(server)
            .post("/api/accounts/register")
            .send({ username: "fancy", password: "way" });
        const login = await request(server)
            .post("/api/accounts/login")
            .send({ username: "fancy", password: "way" });
        const res = await request(server)
            .put("/api/users/4")
            .send(changes)
            .set("authorization", login.body.token);
        expect(res.body.username).toBe("spooky");
        expect(res.status).toBe(201);
    });
    test("DELETE /api/users to get all users", async () => {
        const register = await request(server)
            .post("/api/accounts/register")
            .send({ username: "fancy", password: "way" });
        const login = await request(server)
            .post("/api/accounts/login")
            .send({ username: "fancy", password: "way" });
        const res = await request(server)
            .delete("/api/users/4")
            .set("authorization", login.body.token);
        expect(res.body.removed.id).toBe(4);
        expect(res.status).toBe(200);
    });
    //******************************************************************************** */
    //api/users/attendee: getid, post, delete 
    //******************************************************************************** */

    test("GET /api/users/attendee/2 to get all potlucks that user is attending", async () => {
        const register = await request(server)
            .post("/api/accounts/register")
            .send({ username: "fancy", password: "way" });
        const login = await request(server)
            .post("/api/accounts/login")
            .send({ username: "fancy", password: "way" });
        const res = await request(server)
            .get("/api/users/attendee/2")
            .set("authorization", login.body.token);
        expect(res.body).toHaveLength(3);
        expect(res.body[0]).toHaveProperty("id");
        expect(res.status).toBe(200);
    });
    test("POST /api/users/attendee/2 to add a user_attending", async () => {
        const register = await request(server)
            .post("/api/accounts/register")
            .send({ username: "fancy", password: "way" });
        const login = await request(server)
            .post("/api/accounts/login")
            .send({ username: "fancy", password: "way" });
        const res = await request(server)
            .post("/api/users/attendee/4")
            .send({ potluck_id: 1, bringing_item_id: 1 })
            .set("authorization", login.body.token);
        expect(res.body.data.attendee_id).toBe("4");
        expect(res.status).toBe(201);
    });
    test("DELETE /api/users/attendee/2 to delete an attending", async () => {
        const register = await request(server)
            .post("/api/accounts/register")
            .send({ username: "fancy", password: "way" });
        const login = await request(server)
            .post("/api/accounts/login")
            .send({ username: "fancy", password: "way" });
        const res = await request(server)
            .delete("/api/users/attendee/2")
            .set("authorization", login.body.token);
        expect(res.body.data.id).toBe(2);
        expect(res.status).toBe(201);
    });
    //******************************************************************************** */
    // potlucks:
    // api/potlucks: get, getid, put, post, delete 
    //******************************************************************************** */
    test("GET /api/potlucks to get all potlucks", async () => {
        const register = await request(server)
            .post("/api/accounts/register")
            .send({ username: "fancy", password: "way" });
        const login = await request(server)
            .post("/api/accounts/login")
            .send({ username: "fancy", password: "way" });
        const res = await request(server)
            .get("/api/potlucks")
            .set("authorization", login.body.token);
        expect(res.body).toHaveLength(3);
        expect(res.body[0]).toHaveProperty("id");
        expect(res.status).toBe(200);
    });
    test("GET /api/potlucks/:id to get all potlucks", async () => {
        const register = await request(server)
            .post("/api/accounts/register")
            .send({ username: "fancy", password: "way" });
        const login = await request(server)
            .post("/api/accounts/login")
            .send({ username: "fancy", password: "way" });
        const res = await request(server)
            .get("/api/potlucks/3")
            .set("authorization", login.body.token);
        expect(res.body.id).toBe(3);
        expect(res.body).toHaveProperty("items");
        expect(res.status).toBe(200);
    });
    test("POST /api/potlucks to make a potluck", async () => {
        const newPotluck ={
            owner_id: 3,
            name: "another test",
            where: "the block over",
            date: "1/21",
            category: "test"
        }
        const register = await request(server)
            .post("/api/accounts/register")
            .send({ username: "fancy", password: "way" });
        const login = await request(server)
            .post("/api/accounts/login")
            .send({ username: "fancy", password: "way" });
        const res = await request(server)
            .post("/api/potlucks")
            .send(newPotluck)
            .set("authorization", login.body.token);
        expect(res.body).toBeDefined();
        expect(res.body.data.owner_id).toBe(3);
        expect(res.status).toBe(201);
    });
    test("PUT /api/potlucks/:id to edit a potluck", async () => {
        const changes = { owner_id: 3, name: "da best", where: "anywhere", date: "yesterday", category: "test" };
        const register = await request(server)
            .post("/api/accounts/register")
            .send({ username: "fancy", password: "way" });
        const login = await request(server)
            .post("/api/accounts/login")
            .send({ username: "fancy", password: "way" });
        const res = await request(server)
            .put("/api/potlucks/3")
            .send(changes)
            .set("authorization", login.body.token);
        expect(res.body.where).toBe("anywhere");
        expect(res.body.owner_id).toBe(3);
        expect(res.status).toBe(201);
    });
    test("DELETE /api/potlucks/:id to delete a potluck by id", async () => {
        const register = await request(server)
            .post("/api/accounts/register")
            .send({ username: "fancy", password: "way" });
        const login = await request(server)
            .post("/api/accounts/login")
            .send({ username: "fancy", password: "way" });
        const res = await request(server)
            .get("/api/potlucks/3")
            .set("authorization", login.body.token);
        expect(res.body).toBeDefined();
        expect(res.body.id).toBe(3);
        expect(res.status).toBe(200);
    });

    //******************************************************************************** */
    // api/potlucks/items: getid, postid, delete 
    //******************************************************************************** */

    test("GET /api/potlucks/items/:id to get all items in a potluck", async () => {
        const register = await request(server)
            .post("/api/accounts/register")
            .send({ username: "fancy", password: "way" });
        const login = await request(server)
            .post("/api/accounts/login")
            .send({ username: "fancy", password: "way" });
        const res = await request(server)
            .get("/api/potlucks/items/3")
            .set("authorization", login.body.token);
        expect(res.body[0].potluck_id).toBe(3);
        expect(res.body[1].id).toBe(8);
        expect(res.status).toBe(200);
    });
    test("POST /api/potlucks/items/:id to post an item to a potluck", async () => {
        const newThing={item_id:1, being_brought_by:"someone"}
        const register = await request(server)
            .post("/api/accounts/register")
            .send({ username: "fancy", password: "way" });
        const login = await request(server)
            .post("/api/accounts/login")
            .send({ username: "fancy", password: "way" });
        const res = await request(server)
            .post("/api/potlucks/items/3")
            .send(newThing)
            .set("authorization", login.body.token);
        expect(res.body.potluck_id).toBe("3");
        expect(res.status).toBe(201);
    });
    test("DELETE /api/potlucks/items/:id to delete an item on a potluck", async () => {
        const register = await request(server)
            .post("/api/accounts/register")
            .send({ username: "fancy", password: "way" });
        const login = await request(server)
            .post("/api/accounts/login")
            .send({ username: "fancy", password: "way" });
        const res = await request(server)
            .delete("/api/potlucks/items/8")
            .set("authorization", login.body.token);
        expect(res.body.data).toBeDefined();
        expect(res.body.data[0].id).toBe(8);
        expect(res.status).toBe(201);
    });
    //******************************************************************************** */
    // items:
    // api/items: get, getid, post, put, delete 5
    //******************************************************************************** */
    test("GET /api/items to get all items in the items table", async () => {
        const register = await request(server)
            .post("/api/accounts/register")
            .send({ username: "fancy", password: "way" });
        const login = await request(server)
            .post("/api/accounts/login")
            .send({ username: "fancy", password: "way" });
        const res = await request(server)
            .get("/api/items")
            .set("authorization", login.body.token);
        expect(res.body).toHaveLength(7);
        expect(res.body[4].name).toBe("soup");
        expect(res.status).toBe(200);
    });
    test("GET /api/items/:id to a specific item in the item table", async () => {
        const register = await request(server)
            .post("/api/accounts/register")
            .send({ username: "fancy", password: "way" });
        const login = await request(server)
            .post("/api/accounts/login")
            .send({ username: "fancy", password: "way" });
        const res = await request(server)
            .get("/api/items/4")
            .set("authorization", login.body.token);
        expect(res.body.name).toBe("cherries");
        expect(res.status).toBe(200);
    });
    test("POST /api/items to get all items in the items table", async () => {
        const newThing = { name: "wings" }
        const register = await request(server)
            .post("/api/accounts/register")
            .send({ username: "fancy", password: "way" });
        const login = await request(server)
            .post("/api/accounts/login")
            .send({ username: "fancy", password: "way" });
        const res = await request(server)
            .post("/api/items")
            .send(newThing)
            .set("authorization", login.body.token);
        expect(res.body).toBeDefined();
        expect(res.body.data.name).toBe("wings");
        expect(res.status).toBe(201);
    });
    test("PUT /api/items/id change an item in the table", async () => {
        const changes = { name: "the best wings" }
        const register = await request(server)
            .post("/api/accounts/register")
            .send({ username: "fancy", password: "way" });
        const login = await request(server)
            .post("/api/accounts/login")
            .send({ username: "fancy", password: "way" });
        const res = await request(server)
            .put("/api/items/7")
            .send(changes)
            .set("authorization", login.body.token);
        expect(res.body).toBeDefined();
        expect(res.body.name).toBe("the best wings");
        expect(res.status).toBe(201);
    });
    test("DELETE /api/items/id to delete an item in the item table", async () => {
        const register = await request(server)
            .post("/api/accounts/register")
            .send({ username: "fancy", password: "way" });
        const login = await request(server)
            .post("/api/accounts/login")
            .send({ username: "fancy", password: "way" });
        const res = await request(server)
            .delete("/api/items/7")
            .set("authorization", login.body.token);
        expect(res.body).toBeDefined();
        expect(res.body.removed.name).toBe("chips");
        expect(res.status).toBe(200);
    });
})