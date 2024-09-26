import prisma from "@/libs/prisma";
import { faker } from "@faker-js/faker";

const seed = async () => {
  const existingUserIds = [
    'kp_2ec30821f32e4830aff51885a4fc8ff3',
    'kp_6e320b668e2b42cabd1b14e266e51e6f',
    'kp_ad79a0efd8f442f18a96f5ad92fd37cf',
  ]

  const randomUserId = existingUserIds[Math.floor(Math.random() * existingUserIds.length)];

  const existingPropertyTypeIds = [
    'cm1db4tz900031hbzahsnsg2t',
    'cm1db4tz900041hbzvgktbur7',
    'cm1db4tz900051hbznq91c8j2'
  ];

  const randomPropertyTypeId = existingPropertyTypeIds[Math.floor(Math.random() * existingPropertyTypeIds.length)];

  const existingPropertyStatusIds = [
    'cm1db437x00001hbzbi8y35u2',
    'cm1db437z00011hbz1pxmtg51',
    'cm1db437z00021hbzylrf9ury'
  ];

  const randomPropertyStatusId = existingPropertyStatusIds[Math.floor(Math.random() * existingPropertyStatusIds.length)];

  const newProperty = await prisma.property.create({
    data: {
      name: faker.lorem.words(3),
      description: faker.lorem.paragraph(),
      price: faker.number.float({ min: 100000, max: 1000000 }),
      user: {
        connect: {
          id: randomUserId
        }
      },
      type: {
        connect: {
          id: randomPropertyTypeId
        }
      },
      status: {
        connect: {
          id: randomPropertyStatusId
        }
      },
      location: {
        create: {
          address: faker.location.streetAddress(),
          city: faker.location.city(),
          state: faker.location.state(),
          zip: faker.location.zipCode(),
          landmarks: faker.lorem.sentence(),
          country: faker.location.country()
        }
      },
      feature: {
        create: {
          bedrooms: faker.number.int({ min: 1, max: 5 }),
          bathrooms: faker.number.int({ min: 1, max: 3 }),
          parkingSpots: faker.number.int({ min: 0, max: 3 }),
          area: faker.number.int({ min: 50, max: 300 }),
          hasSwimmingPool: faker.datatype.boolean(),
          hasGardenOrYard: faker.datatype.boolean(),
          hasBalconyOrPatio: faker.datatype.boolean()
        }
      },
      contact: {
        create: {
          name: faker.person.fullName(),
          phone: faker.phone.number(),
          email: faker.internet.email()
        }
      },
      pictures: {
        create: [
          { url: faker.image.url() },
          { url: faker.image.url() }
        ]
      }
    }
  });

  console.log("Seed data created successfully:", newProperty);
};

const main = async () => {
  await Promise.all(Array(30).fill(0).map(async () => seed()))

  console.log('All seeding completed');
}

main();