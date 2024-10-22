const { PrismaClient } = require('@prisma/client');
const axios = require('axios');
const prisma = new PrismaClient();

async function main() {
  const { data: breeds } = await axios.get('https://api.thedogapi.com/v1/breeds');

  for (const breed of breeds) {
    await prisma.breed.create({
      data: {
        name: breed.name,
        weight: breed.weight.metric,
        temperament: breed.temperament,
        origin: breed.origin || 'Unknown',
        life_span: breed.life_span,
        imageUrl: breed.reference_image_id
          ? `https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`
          : null,
      },
    });
  }

  console.log('Database seeded with dog breeds');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
