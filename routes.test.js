process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("./app");
const items = require("./fakeDb");

let item = {
    "name": "ramen",
    "price": 0.99
}

beforeEach(function() {
    items.push(item);
  });
  
  afterEach(function() {
    items.pop();
  });

describe("GET /", function(){
    test("Gets a list of items", async function(){
        const resp = await request(app).get(`/items`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual(items);
    });
});

describe("POST /", function(){
    test("Creates a new item", async function(){
        const resp = await request(app)
        .post('/items')
        .send({
          name: "bread",
          price: 2.99
        });
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({
          "added": {
            name: "bread",
            price: 2.99
          }
        });
    });
});

describe("GET /:name", function(){
    test("Get a single item", async function(){
        const resp = await request(app).get(`/items/${item.name}`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual(item);
    });

    test("Responds with 404 if can't find item", async function(){
        const resp = await request(app).get(`/items/noodles`);
        expect(resp.statusCode).toBe(404);
    });
});

describe("/PATCH /:name", function(){
    test("Updates a single item", async function(){
        const resp = await request(app)
        .patch(`/items/${item.name}`)
        .send({price: 1.99});
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({
          "updated": {
            name: "ramen",
            price: 1.99
          }
        });
    });

    test("Responds with 404 if item not found", async function(){
        const resp = await request(app).patch(`/items/noodles`);
        expect(resp.statusCode).toBe(404);
    });
});

describe("DELETE /:name", function(){
    test("Deletes a single item", async function(){
        const resp = await request(app).delete(`/items/${item.name}`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({message: "Deleted"});
    });

    test("Responds with 404 if item not found", async function(){
        const resp = await request(app).delete(`/items/noodles`);
        expect(resp.statusCode).toBe(404);
    });
});
