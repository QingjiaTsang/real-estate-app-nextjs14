import prisma from '@/libs/prisma'
import { faker } from '@faker-js/faker'
import CountryList from 'country-list-with-dial-code-and-flag'

const COUNTRY_LIST = CountryList.getAll().map(country => ({ flag: country.flag, name: country.name, dialCode: country.dialCode }))

async function seed() {
  const existingUserIds = [
    'kp_4ef84799d53b4d7d87afbfd3e41fff4e',
    'kp_76a47bbc519b46128209666e4223453d',
    'kp_ff632669ef5544169e672be0527f8279',
  ]

  const randomUserId = existingUserIds[Math.floor(Math.random() * existingUserIds.length)]

  const existingPropertyTypeIds = [
    'cm1db4tz900031hbzahsnsg2t',
    'cm1db4tz900041hbzvgktbur7',
    'cm1db4tz900051hbznq91c8j2',
  ]

  const randomPropertyTypeId = existingPropertyTypeIds[Math.floor(Math.random() * existingPropertyTypeIds.length)]

  const existingPropertyStatusIds = [
    'cm1db437x00001hbzbi8y35u2',
    'cm1db437z00011hbz1pxmtg51',
    'cm1db437z00021hbzylrf9ury',
  ]

  const randomPropertyStatusId = existingPropertyStatusIds[Math.floor(Math.random() * existingPropertyStatusIds.length)]

  const randomCountry = COUNTRY_LIST[Math.floor(Math.random() * COUNTRY_LIST.length)]

  const newProperty = await prisma.property.create({
    data: {
      name: faker.lorem.words(3),
      description: faker.lorem.paragraph(),
      price: faker.number.float({ min: 100000, max: 1000000 }),
      user: {
        connect: {
          id: randomUserId,
        },
      },
      type: {
        connect: {
          id: randomPropertyTypeId,
        },
      },
      status: {
        connect: {
          id: randomPropertyStatusId,
        },
      },
      location: {
        create: {
          address: faker.location.streetAddress(),
          city: faker.location.city(),
          state: faker.location.state(),
          zip: faker.location.zipCode(),
          landmarks: faker.lorem.sentence(),
          country: randomCountry.name,
        },
      },
      feature: {
        create: {
          bedrooms: faker.number.int({ min: 1, max: 5 }),
          bathrooms: faker.number.int({ min: 1, max: 3 }),
          parkingSpots: faker.number.int({ min: 0, max: 3 }),
          area: faker.number.int({ min: 50, max: 300 }),
          hasSwimmingPool: faker.datatype.boolean(),
          hasGardenOrYard: faker.datatype.boolean(),
          hasBalconyOrPatio: faker.datatype.boolean(),
        },
      },
      contact: {
        create: {
          name: faker.person.fullName(),
          phone: faker.phone.number(),
          email: faker.internet.email(),
        },
      },
      pictures: {
        create: [
          { url: faker.image.urlLoremFlickr({ category: 'property,realestate', width: 1600, height: 900 }) },
          { url: faker.image.urlLoremFlickr({ category: 'property,realestate', width: 1600, height: 900 }) },
          { url: faker.image.urlLoremFlickr({ category: 'property,realestate', width: 1600, height: 900 }) },
          { url: faker.image.urlLoremFlickr({ category: 'property,realestate', width: 1600, height: 900 }) },
          { url: faker.image.urlLoremFlickr({ category: 'property,realestate', width: 1600, height: 900 }) },
        ],
      },
    },
  })

  console.log('Seed data created successfully:', newProperty)
}

async function main() {
  await Promise.all(Array.from({ length: 100 }).fill(0).map(() => seed()))

  console.log('All seeding completed')
}

main()
