import { withBreasts, withoutBreasts } from '@freesewing/models';

export default {
  users: [
    {
      email: 'test1@freesewing.org',
      username: 'test1_user',
      handle: 'tusr1',
      password: 'test1',
      role: 'user',
      settings: {
        language: 'nl',
        units: 'imperial'
      },
      patron: 2,
      consent: {
        profile: true,
        measurements: true,
        openData: true
      },
      status: 'active'
    },
    {
      email: 'test@freesewing.org',
      username: 'test_user',
      handle: 'tuser',
      password: 'test',
      role: 'user',
      settings: {
        language: 'nl',
        units: 'imperial'
      },
      patron: 4,
      consent: {
        profile: true,
        measurements: true,
        openData: true
      },
      status: 'active'
    },
    {
      email: 'admin@freesewing.org',
      username: 'admin',
      password: 'admin',
      role: 'admin',
      handle: 'admin',
      social: {
        github: 'freesewing-bot',
        twitter: 'freesewing_org',
        instagram: 'freesewing_org',
      },
      patron: 8,
      settings: {
        language: 'en',
        units: 'metric'
      },
      consent: {
        profile: true,
        measurements: true,
        openData: true
      },
      newsletter: true,
      status: 'active'
    }
  ],
  people: [
    {
      handle: 'persa',
      picture: 'persa.svg',
      user: 'tuser',
      name: 'Example person - No breasts',
      breasts: false,
      units: 'metric',
      notes: 'This is an example person',
      measurements: withoutBreasts.size42
    },
    {
      handle: 'persb',
      picture: 'persb.svg',
      user: 'tuser',
      name: 'Example person - With breasts',
      breasts: true,
      units: 'metric',
      notes: 'This is an example person',
      measurements: {
        ...withBreasts.size36,
        doesNotExist: 234
      }
    },
  ],
  patterns: [
    {
      handle: "recip",
      name: "Example pattern",
      notes: "These are the pattern notes",
      data: {
        settings: {
          sa: 10,
          complete: true,
          paperless: false,
          units: "imperial",
          measurements: {
            biceps: 335,
            hpsToWaist: 520,
            chest: 1080,
            waistToHips: 145,
            neck: 420,
            shoulderSlope:  13,
            shoulderToShoulder: 465,
            hips: 990
          }
        },
        design: "aaron",
      },
      created: "2019-08-14T09:47:27.163Z",
      user: 'tuser',
      person:"persa"
    }
  ]
}
