const request = require("supertest");
const app = require("../../api/server");

let api;
beforeAll(async ()=> {
    api = app.listen(5000, () => console.log('Test server running on port 5000'))
});

afterAll(done => {
    console.log('Gracefully stopping test server')
    api.close(done)
});

describe("Test paths", () => {
    //ensure that server is working
    test("It should response the GET method", async () => {
      const response = await request(api).get("/");
      expect(response.statusCode).toBe(200);
    });

});

describe("Send register user data", () => {

    test("It should response the GET method", async () => {
      const testPayload = {username: "user2",  email: "user2@gamil.com", password:"pass2"};

      const response = request(api).post("/users").send(testPayload).expect(201); 
    });

});

describe("Send login user data", () => {

    test("It should response the GET method", async () => {
      const testPayload = {username: "Ben12", password: "ghi789"}

      request(api).post("/users").send(testPayload).expect(200);
    });

});