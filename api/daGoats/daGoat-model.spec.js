const Goat = require("./Goats-model");
const db = require("../../data/dbConfig");

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

describe("Goat Model runs", () => {
  it("model works for functions", () => {
    expect(true).toBe(true);
  });
  describe("getAll", () => {
    let Goats;
    beforeEach(async () => {
      Goats = await Goat.getAll();
    });
    it("gets the Goats", async () => {
      expect(Goats).toHaveLength(3);
    });
    it("has the right Goat properties", async () => {
      expect(Goats[0]).toMatchObject({ id: 1, name: "garen" });
    });
  });
  describe("insert", () => {
    it("can insert a Goat into the db", async () => {
      const aphelios = { name: "aphelios" };
      await Goat.insert(aphelios);
      expect(await db("daGoats")).toHaveLength(4);
      const aphel2 = await db("daGoats").where({ id: 4 }).first();
      expect(aphel2).toMatchObject({ id: 4, name: "aphelios" });
    });
    it("resolves to the new Goat", async () => {
      const aphelios = { name: "aphelios" };
      const result = await Goat.insert(aphelios);
      expect(result).toMatchObject({ id: 4, name: "aphelios" });
    });
  });
  describe("remove", () => {
    it("can remove a Goat from the db", async () => {
      await Goat.remove(4);
      expect(await db("daGoats")).toHaveLength(3);
    });
  });
});
