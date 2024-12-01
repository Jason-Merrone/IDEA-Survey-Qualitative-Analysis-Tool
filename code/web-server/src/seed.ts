import { createUser } from '~/server/db/queries/create';

async function main() {
  const users = Array.from({ length: 10 }).map((_, index) => ({
    aNumber: `A${1000 + index}`,
    firstName: `FirstName${index + 1}`,
    lastName: `LastName${index + 1}`,
    email: `user${index + 1}@example.com`,
  }));

  for (const user of users) {
    const result = await createUser(user.aNumber, user.firstName, user.lastName, user.email);
    if (result.errors) {
      console.error(`Failed to create user ${user.aNumber}:`, result.errors);
    } else {
      console.log(result.data?.message);
    }
  }

  console.log("10 users have been added to the database");
}

main().catch((error) => {
  console.error('Error seeding users:', error);
});
