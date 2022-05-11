export const mocks = {
  Users: [
    {
      id: '4f4442a7-aa22-490b-9945-34763d9fa0d9',
      email: "Bob@hope.com",
      firstName: "Bob",
      lastName: "Bobster",
      emailVerified: true,
      photoUrl: "https://gradient-avatar.glitch.me/4f4442a7-aa22-490b-9945-34763d9fa0d9",
      createdAt: '2022-05-09T09:43:37.047Z',
      city: 'Berlin',
      latitude: 52.5200,
      longitude: 13.4050
    },
    {
      id: '931d461e-bab4-4c7a-be90-e5e1ab611c0f',
      email: "Sarah12335@gmail.com",
      firstName: "Sarah",
      lastName: "Perez",
      emailVerified: true,
      photoUrl: "https://gradient-avatar.glitch.me/931d461e-bab4-4c7a-be90-e5e1ab611c0f",
      createdAt: '2022-04-19T10:43:37.047Z',
      city: 'Berlin',
      latitude: 52.5200,
      longitude: 13.4050
    },
    {
      id: 'b4ff39f3-ad3b-432e-9359-a56ccea8c5ef',
      email: "YourJohnnyBoy@hotmail.com",
      firstName: "Johnathan",
      lastName: "Feildsausser",
      emailVerified: true,
      photoUrl: "https://gradient-avatar.glitch.me/b4ff39f3-ad3b-432e-9359-a56ccea8c5ef",
      createdAt: '2022-03-12T15:13:37.047Z',
      city: 'Berlin',
      latitude: 52.5200,
      longitude: 13.4050
    },
    {
      id: '0945243e-10ef-4940-80ba-0c5fa958544b',
      email: "Dogz4Life@gmail.com",
      firstName: "Andrea",
      lastName: "Pils",
      emailVerified: true,
      photoUrl: "https://gradient-avatar.glitch.me/0945243e-10ef-4940-80ba-0c5fa958544b",
      createdAt: '2021-12-10T04:13:37.047Z',
      city: 'Berlin',
      latitude: 52.5200,
      longitude: 13.4050
    },
    {
      id: '2f248f4c-e519-496a-9cb4-38ef6e5d8007',
      email: "couchesforsale@gmail.com",
      firstName: "Maxim",
      lastName: "Ostopenko",
      emailVerified: true,
      photoUrl: "https://gradient-avatar.glitch.me/2f248f4c-e519-496a-9cb4-38ef6e5d8007",
      createdAt: '2021-08-03T12:13:37.047Z',
      city: 'Berlin',
      latitude: 52.5200,
      longitude: 13.4050
    },
  ],
  listings: [
    {
      id: 1,
      userId: '4f4442a7-aa22-490b-9945-34763d9fa0d9',
      title: 'The bestest most awesomest chair',
      description: "Dawgs, you don't even know about how cool this chair is. It has a cushion. And it's green. Nuff said.",
      photoUrls: [
        'https://secure.img1-ag.wfcdn.com/im/54089193/resize-h600-w600%5Ecompr-r85/1231/123110031/Daulton+20%27%27+Wide+Velvet+Side+Chair.jpg',
        "https://images.unsplash.com/photo-1611464908623-07f19927264e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Z3JlZW4lMjBjaGFpcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1571977796766-578d484a6c25?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Z3JlZW4lMjBjaGFpcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
      ],
      status: 'available',
      latitude: 52.5200,
      longitude: 13.4050,
      createdAt: '2022-05-09T09:43:37.047Z',
      updatedAt: '2022-05-09T010:43:37.047Z',
      condition: 'gently used',
      priceInCents: 4350,
    },
    {
      id: 2,
      userId: '4f4442a7-aa22-490b-9945-34763d9fa0d9',
      title: 'Dog Bed for chihuahas',
      description: "Super cozy dog bed, hasn't been used that much. peed on a few times. But we washed it with Tide",
      photoUrls: [
        'https://images.unsplash.com/photo-1515128846479-18e4c135a914?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Y2hpaHVhaHVhJTIwaW4lMjBkb2clMjBiZWR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
        "https://images.unsplash.com/photo-1499974184468-5a2967a6f4ed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGNoaWh1YWh1YSUyMGluJTIwZG9nJTIwYmVkfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1595098350345-bf0b9c00efb9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGNoaWh1YWh1YSUyMGluJTIwZG9nJTIwYmVkfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1579044615232-620243088964?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGNoaWh1YWh1YSUyMGluJTIwZG9nJTIwYmVkfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
      ],
      status: 'available',
      latitude: 52.5200,
      longitude: 13.4050,
      createdAt: '2022-05-09T09:43:37.047Z',
      updatedAt: '2022-05-09T010:43:37.047Z',
      condition: 'gently used',
      priceInCents: 2010,
    },
    {
      id: 3,
      userId: 'b4ff39f3-ad3b-432e-9359-a56ccea8c5ef',
      title: 'Racing Bike',
      description: "Moving out of berlin and selling my bike. It's really fast, recently changed tires and chains.",
      photoUrls: [
        'https://images.unsplash.com/photo-1534320553678-50d748b1cd74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cmFjaW5nJTIwYmlrZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
        "https://images.unsplash.com/photo-1541024565616-3a4add50ea72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHJhY2luZyUyMGJpa2V8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1531608139434-1912ae0713cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHJhY2luZyUyMGJpa2V8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1452573992436-6d508f200b30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHJhY2luZyUyMGJpa2V8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
      ],
      status: 'available',
      latitude: 52.5200,
      longitude: 13.4050,
      createdAt: '2022-05-09T09:43:37.047Z',
      updatedAt: '2022-05-09T010:43:37.047Z',
      condition: 'gently used',
      priceInCents: 154010,
    },
    {
      id: 4,
      userId: 'b4ff39f3-ad3b-432e-9359-a56ccea8c5ef',
      title: 'Original Pabel Picaso Painting',
      description: "Finally willing to part with my prized painting. I've hit on some tough times and wouldn't be selling this anyways. I got it in a market. The seller didn't even know what he had and tried to tell me it was a fake. ",
      photoUrls: [
        'https://images.unsplash.com/photo-1635472797289-2718476aa21b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGljYXNzb3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
        "https://images.unsplash.com/photo-1608752688799-e8b3ca69785e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGljYXNzb3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1644526284291-d896f208555e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHBpY2Fzc298ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
      ],
      status: 'available',
      latitude: 52.5200,
      longitude: 13.4050,
      createdAt: '2022-05-09T09:43:37.047Z',
      updatedAt: '2022-05-09T010:43:37.047Z',
      condition: 'gently used',
      priceInCents: 1354010,
    },
    {
      id: 5,
      userId: '931d461e-bab4-4c7a-be90-e5e1ab611c0f',
      title: 'Scratching post for cats',
      description: "Our cat didn't love this too much, and it takes up too much space.",
      photoUrls: [
        'https://images.unsplash.com/photo-1636543459630-8975a3548121?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2NyYXRjaGluZyUyMHBvc3R8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
        "https://images.unsplash.com/photo-1636543459633-53c7216fee3c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8c2NyYXRjaGluZyUyMHBvc3R8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1636543459622-52a3a0f953b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8c2NyYXRjaGluZyUyMHBvc3R8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
      ],
      status: 'available',
      latitude: 52.5200,
      longitude: 13.4050,
      createdAt: '2022-05-09T09:43:37.047Z',
      updatedAt: '2022-05-09T010:43:37.047Z',
      condition: 'gently used',
      priceInCents: 1410,
    },
    {
      id: 6,
      userId: '931d461e-bab4-4c7a-be90-e5e1ab611c0f',
      title: 'Custom Pocket Watch',
      description: "The one Bruce Willis had",
      photoUrls: [
        'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cG9ja2V0JTIwd2F0Y2h8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
        "https://images.unsplash.com/photo-1605143185597-9fe1a8065fbb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cG9ja2V0JTIwd2F0Y2h8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1563103311-860aee557af8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cG9ja2V0JTIwd2F0Y2h8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
      ],
      status: 'available',
      latitude: 52.5200,
      longitude: 13.4050,
      createdAt: '2022-05-09T09:43:37.047Z',
      updatedAt: '2022-05-09T010:43:37.047Z',
      condition: 'gently used',
      priceInCents: 6410,
    },
    {
      id: 7,
      userId: '931d461e-bab4-4c7a-be90-e5e1ab611c0f',
      title: 'Blank notebooks',
      description: "Super nice, notebooks with archival paper.",
      photoUrls: [
        'https://images.unsplash.com/photo-1501618669935-18b6ecb13d6d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bm90ZWJvb2t8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
        "https://images.unsplash.com/photo-1554757387-fa0367573d09?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bm90ZWJvb2t8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1531346680769-a1d79b57de5c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fG5vdGVib29rfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1518226203301-8e7f833c6a94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fG5vdGVib29rfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
      ],
      status: 'available',
      latitude: 52.5200,
      longitude: 13.4050,
      createdAt: '2022-05-09T09:43:37.047Z',
      updatedAt: '2022-05-09T010:43:37.047Z',
      condition: 'gently used',
      priceInCents: 510,
    },
    {
      id: 8,
      userId: '931d461e-bab4-4c7a-be90-e5e1ab611c0f',
      title: 'Penguin Costume',
      description: "So real, you won't be able to tell the difference",
      photoUrls: [
        'https://images.unsplash.com/photo-1600527890363-b637a0a82eba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVuZ3VpbiUyMGNvc3R1bWV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
        "https://images.unsplash.com/photo-1462888210965-cdf193fb74de?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVuZ3VpbiUyMGNvc3R1bWV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1475874619827-b5f0310b6e6f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cGVuZ3VpbiUyMGNvc3R1bWV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1595792419466-23cec2476fa6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzV8fHBlbmd1aW4lMjBjb3N0dW1lfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
      ],
      status: 'available',
      latitude: 52.5200,
      longitude: 13.4050,
      createdAt: '2022-05-09T09:43:37.047Z',
      updatedAt: '2022-05-09T010:43:37.047Z',
      condition: 'gently used',
      priceInCents: 2599,
    },
    {
      id: 9,
      userId: '931d461e-bab4-4c7a-be90-e5e1ab611c0f',
      title: 'Unused Diapers',
      description: "My baby's potty trained now!",
      photoUrls: [
        'https://images.unsplash.com/photo-1584839404042-8bc21d240e91?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZGlhcGVyc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      ],
      status: 'available',
      latitude: 52.5200,
      longitude: 13.4050,
      createdAt: '2022-05-09T09:43:37.047Z',
      updatedAt: '2022-05-09T010:43:37.047Z',
      condition: 'gently used',
      priceInCents: 100,
    },
  ]
}