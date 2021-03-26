const server = require("./server");
const request = require("supertest");
const db = require("../data/dbConfig");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db("daGoats").truncate();
  await db.seed.run();
});
afterAll(async () => {
  await db.destroy();
});

it('process.env.DB_ENV is in "testing" mode', () => {
  expect(process.env.DB_ENV).toBe("testing");
});

describe("daGoats POST Endpoint", () => {
  describe("[POST] /daGoats", () => {
    it("updates the database with the new legend", async () => {
      await request(server).post("/daGoats").send({ name: "brandonS" });
      expect(await db("daGoats")).toHaveLength(1);
    });
    it("responds with new posted GOAT", async () => {
      const res = await request(server)
        .post("/daGoats")
        .send({ name: "brandonS" });
      expect(res.body).toMatchObject({ id: 1, name: "brandonS" });
    });
  });

  describe("[DELETE] /daGoats/:id", () => {
    it("deletes a legend from the db", async () => {
      await request(server).delete("/daGoats/3");
      expect(await db("daGoats")).toHaveLength(2);
    });
    it("responds with a success message", async () => {
      const res = await request(server).delete("/daGoats/1");
      expect(res.body).toMatchObject({ message: "GOAT deleted" });
    });
  });
});

//make sure that the endpoints match, errors were popping up with this type of error
