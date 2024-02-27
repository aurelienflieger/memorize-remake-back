import "dotenv/config";
import pool from "./pg.client.js";
import { fakerFR as faker } from "@faker-js/faker";

async function seedFakeData() {
  for (let i = 0; i < 10; i++) {
    const user = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      username: faker.internet.userName(),
    };

    const userInsert = await pool.query(
      // eslint-disable-next-line quotes
      'INSERT INTO "user"(email, password, username) VALUES($1, $2, $3) RETURNING id',
      [user.email, user.password, user.username]
    );
    const userId = userInsert.rows[0].id;

    for (let j = 0; j < 5; j++) {
      const deck = {
        name: faker.lorem.words(3),
        description: faker.lorem.sentence(),
        user_id: userId,
      };

      const deckInsert = await pool.query(
        // eslint-disable-next-line quotes
        'INSERT INTO "deck"(name, description, user_id) VALUES($1, $2, $3) RETURNING id',
        [deck.name, deck.description, deck.user_id]
      );
      const deckId = deckInsert.rows[0].id;

      for (let k = 0; k < 20; k++) {
        const card = {
          front: faker.lorem.sentence(),
          back: faker.lorem.sentence(),
          difficulty: faker.helpers.arrayElement([0, 1, 2]),
          deck_id: deckId,
        };

        await pool.query(
          // eslint-disable-next-line quotes
          'INSERT INTO "card"(front, back, difficulty, deck_id) VALUES($1, $2, $3, $4)',
          [card.front, card.back, card.difficulty, card.deck_id]
        );
      }
    }
  }
}

seedFakeData()
  .then(() => {
    console.log("The database was successfully seeded!");
  })
  .catch((error) => {
    console.log("There was an issue seeding the database:", error.message);
  });
