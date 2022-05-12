// const { PrismaClient } = require('@prisma/client');
const users = require('../mocks/mockUsers.json');
const listings = require('../mocks/mockListings.json');

// const prisma = new PrismaClient();

async function main () {

  for (const u of users) {
    console.log(u);
  }

  for (const l of listings) {
    console.log(l);
  }
}
main();