Change log

## [1.13.1](https://github.com/zp-bots-telegram/intelligent-golf-bot/compare/v1.13.0...v1.13.1) (2023-09-19)


### Bug Fixes

* change formatting of the day and time in recurring booking commands ([305113b](https://github.com/zp-bots-telegram/intelligent-golf-bot/commit/305113b82881c9c6982a7d657c3e606980f310ab))

# [1.13.0](https://github.com/zp-bots-telegram/intelligent-golf-bot/compare/v1.12.5...v1.13.0) (2023-09-19)


### Features

* add automated recurring bookings commands and monitors ([796cb78](https://github.com/zp-bots-telegram/intelligent-golf-bot/commit/796cb786db3a9ee719aedbd47edb70fcc438f91f))

## [1.12.5](https://github.com/zp-bots-telegram/intelligent-golf-bot/compare/v1.12.4...v1.12.5) (2023-07-28)


### Bug Fixes

* incorrect time logic for skipping 14 days in advance ([76ac1e2](https://github.com/zp-bots-telegram/intelligent-golf-bot/commit/76ac1e23fdf1d3ee9d674df88456cd83e22aa39d))

## [1.12.4](https://github.com/zp-bots-telegram/intelligent-golf-bot/compare/v1.12.3...v1.12.4) (2023-07-28)


### Bug Fixes

* add logging for autobookings being skipped ([0658a82](https://github.com/zp-bots-telegram/intelligent-golf-bot/commit/0658a82deeb76436761f3bd54f3402490ed2e5e4))

## [1.12.3](https://github.com/zp-bots-telegram/intelligent-golf-bot/compare/v1.12.2...v1.12.3) (2023-07-28)


### Bug Fixes

* change autobookings to start an hour earlier due to UTC vs BST timezones ([b6e6dcb](https://github.com/zp-bots-telegram/intelligent-golf-bot/commit/b6e6dcb350e4409f9eba973425aba3fd6c7ac83a))
* increase timeout to 60 seconds for any requests ([9b6825e](https://github.com/zp-bots-telegram/intelligent-golf-bot/commit/9b6825eaa5eb4050180aadfac67257d00d0e8dad))

## [1.12.2](https://github.com/zp-bots-telegram/intelligent-golf-bot/compare/v1.12.1...v1.12.2) (2023-07-25)


### Bug Fixes

* change autobooking scheduled task to run on every 30th second, not every 10 seconds ([80aada0](https://github.com/zp-bots-telegram/intelligent-golf-bot/commit/80aada0c0d63f680f826cff284d7fbe624f62c96))

## [1.12.1](https://github.com/zp-bots-telegram/intelligent-golf-bot/compare/v1.12.0...v1.12.1) (2023-07-24)


### Bug Fixes

* remove log and take 1 minute off the start date filter ([c851b62](https://github.com/zp-bots-telegram/intelligent-golf-bot/commit/c851b628fc7ab6ec3aa4303f9dc4a4d403e20482))

# [1.12.0](https://github.com/zp-bots-telegram/intelligent-golf-bot/compare/v1.11.2...v1.12.0) (2023-07-24)


### Features

* expand autobook feature to work for any time slot, not just midnight slots ([4e10404](https://github.com/zp-bots-telegram/intelligent-golf-bot/commit/4e10404f536af6c69217d0306f6a3598f92e58d6))

## [1.11.2](https://github.com/zp-bots-telegram/intelligent-golf-bot/compare/v1.11.1...v1.11.2) (2023-07-24)


### Bug Fixes

* individual cookie jar for each user for auto booking ([d389afe](https://github.com/zp-bots-telegram/intelligent-golf-bot/commit/d389afeb0a4c291a483e8599d2180ee8b94bb2ac))
* use rp.jar() instead of jar: true so we don't share cookies ([16ea830](https://github.com/zp-bots-telegram/intelligent-golf-bot/commit/16ea83001c61f398a690405a7499c14c1c6d62af))

## [1.11.1](https://github.com/zp-bots-telegram/intelligent-golf-bot/compare/v1.11.0...v1.11.1) (2023-03-04)


### Bug Fixes

* add request object to login cache for user ([aa24d52](https://github.com/zp-bots-telegram/intelligent-golf-bot/commit/aa24d5280055e428d9d0ba282e8211da8328e797))

# [1.11.0](https://github.com/zp-bots-telegram/intelligent-golf-bot/compare/v1.10.3...v1.11.0) (2023-02-24)


### Bug Fixes

* always book two players ([cf2ba50](https://github.com/zp-bots-telegram/intelligent-golf-bot/commit/cf2ba50ca718762efb3f3e989ed0666e73d3cbf4))
* remove cached logins once a day before the autobooking job begins ([e1478cc](https://github.com/zp-bots-telegram/intelligent-golf-bot/commit/e1478cccac315e1bc4be8dafda16b2cf01c5e872))


### Features

* delete bookings inline from bookings command ([d926770](https://github.com/zp-bots-telegram/intelligent-golf-bot/commit/d9267700cd92ca381f86fab752f84c3d4a10651f))

## [1.10.3](https://github.com/zp-bots-telegram/intelligent-golf-bot/compare/v1.10.2...v1.10.3) (2023-02-24)


### Bug Fixes

* callback queries not working with new format ([04536b2](https://github.com/zp-bots-telegram/intelligent-golf-bot/commit/04536b271bf57dcf841537fec72c26e74eae83f6))
* run auto booking task for 6 consecutive minutes with logging ([a38b14f](https://github.com/zp-bots-telegram/intelligent-golf-bot/commit/a38b14f182acce208098d1828d228a921f948061))

## [1.10.2](https://github.com/zp-bots-telegram/intelligent-golf-bot/compare/v1.10.1...v1.10.2) (2023-02-23)


### Bug Fixes

* also check for tr.canreserve when evaluating available times ([7a0cd4d](https://github.com/zp-bots-telegram/intelligent-golf-bot/commit/7a0cd4d28254298c19ee9ea67b7d9578aec7beba))

## [1.10.1](https://github.com/zp-bots-telegram/intelligent-golf-bot/compare/v1.10.0...v1.10.1) (2023-02-23)


### Bug Fixes

* callback queries broken ([83d0be6](https://github.com/zp-bots-telegram/intelligent-golf-bot/commit/83d0be60e3fcdd490362d1b4198ac828a1ae5a0a))
* semantic release not working correctly ([1b88fa3](https://github.com/zp-bots-telegram/intelligent-golf-bot/commit/1b88fa37f885213a0da10e23620810f44a3a3dea))

# [1.10.0](https://github.com/zp-bots-telegram/intelligent-golf-bot/compare/v1.9.0...v1.10.0) (2023-02-23)


### Bug Fixes

* use a single cron job to avoid concurrency problems ([c053131](https://github.com/zp-bots-telegram/intelligent-golf-bot/commit/c053131886128168a3f12e7adff4d1024a5ca8ec))


### Features

* add autoBooking command ([832b432](https://github.com/zp-bots-telegram/intelligent-golf-bot/commit/832b432b92ccb24e692d0e42adf1e08e2b328ff3))

# [1.9.0](https://github.com/zp-bots-telegram/intelligent-golf-bot/compare/v1.8.0...v1.9.0) (2023-02-21)


### Bug Fixes

* change booktime message header ([7d61ca8](https://github.com/zp-bots-telegram/intelligent-golf-bot/commit/7d61ca8d32efd1459ac9e1687cc2c2f3907dab4f))


### Features

* add booktime command to book earliest time on a day ([fa8a80c](https://github.com/zp-bots-telegram/intelligent-golf-bot/commit/fa8a80cf5836b235e3e07af460881f7fdc7de708))

# [1.8.0](https://github.com/zp-bots-telegram/intelligent-golf-bot/compare/v1.7.1...v1.8.0) (2023-02-20)


### Features

* return booking form information with available times ([14d9b4c](https://github.com/zp-bots-telegram/intelligent-golf-bot/commit/14d9b4c463e7a814f31b7991e43c65228269271d))

## [1.7.1](https://github.com/zp-bots-telegram/intelligent-golf-bot/compare/v1.7.0...v1.7.1) (2022-03-06)


### Bug Fixes

* return error if date input couldn't be understood ([f1b5e2a](https://github.com/zp-bots-telegram/intelligent-golf-bot/commit/f1b5e2a73fb916207fec62b797334d1751020dff))

# [1.7.0](https://github.com/zp-bots-telegram/intelligent-golf-bot/compare/v1.6.0...v1.7.0) (2022-02-26)


### Features

* switch from telegraf to grammy for bot api ([1dd3793](https://github.com/zp-bots-telegram/intelligent-golf-bot/commit/1dd379364c054eea0722d89cec8ebd7a96066b5e))

# [1.6.0](https://github.com/zp-bots-telegram/intelligent-golf-bot/compare/v1.5.1...v1.6.0) (2022-02-24)


### Features

* add monitors command to list and delete monitors ([779e5cc](https://github.com/zp-bots-telegram/intelligent-golf-bot/commit/779e5cc6af6ac07f6146a791de84dd56d270d701))

## [1.5.1](https://github.com/zp-bots-telegram/intelligent-golf-bot/compare/v1.5.0...v1.5.1) (2022-02-18)


### Bug Fixes

* argument matching on monitor available times command ([fe68cec](https://github.com/zp-bots-telegram/intelligent-golf-bot/commit/fe68cec6f4a7a7c4142db7a98c2031a92fb81e5a))

# [1.5.0](https://github.com/zp-bots-telegram/intelligent-golf-bot/compare/v1.4.0...v1.5.0) (2022-02-18)


### Features

* move from node-telegram-bot-api to telegraf and typescript template defaults ([4d94880](https://github.com/zp-bots-telegram/intelligent-golf-bot/commit/4d94880f4269a4562a9d1c9ab7754c34dd9504ad))

# [1.4.0](https://github.com/zp-bots-telegram/elite-live-golf-bot/compare/v1.3.0...v1.4.0) (2022-02-17)


### Bug Fixes

* available times should work even if you have a booking on that day ([77176ab](https://github.com/zp-bots-telegram/elite-live-golf-bot/commit/77176abc26d23651b647b5a7c9f8fae50878f851))
* handle lowercase course names on command input ([b929dbf](https://github.com/zp-bots-telegram/elite-live-golf-bot/commit/b929dbf76e716e435ba896441cea0736c4d14824))


### Features

* allow monitoring multiple courses and time ranges ([ee1b1d5](https://github.com/zp-bots-telegram/elite-live-golf-bot/commit/ee1b1d5bf295caa0ece0fde66d53579af9633f66))

# [1.3.0](https://github.com/zp-bots-telegram/elite-live-golf-bot/compare/v1.2.2...v1.3.0) (2022-02-17)


### Bug Fixes

* make all commands case insensitive ([59b91eb](https://github.com/zp-bots-telegram/elite-live-golf-bot/commit/59b91eb72053d1fb1d358f37e3ce8f1d77d2367f))
* return failure message frrom all commands if you're not authenticated ([5be6d81](https://github.com/zp-bots-telegram/elite-live-golf-bot/commit/5be6d812e66a996608335c7cc24d54431fdced58))


### Features

* add command for setting up availability monitor ([e63f0a0](https://github.com/zp-bots-telegram/elite-live-golf-bot/commit/e63f0a0a05d70770abeb7ded278a06fc07163776))

## [1.2.2](https://github.com/zp-bots-telegram/elite-live-golf-bot/compare/v1.2.1...v1.2.2) (2021-09-27)


### Bug Fixes

* lowercase availableTimes command to availabletimes ([e84944f](https://github.com/zp-bots-telegram/elite-live-golf-bot/commit/e84944f5e4e154f6c61d25351e2af3bae0bfe148))

## [1.2.1](https://github.com/zp-bots-telegram/elite-live-golf-bot/compare/v1.2.0...v1.2.1) (2021-09-27)


### Bug Fixes

* read environment vars from process.env ([ee80ae8](https://github.com/zp-bots-telegram/elite-live-golf-bot/commit/ee80ae88754dba41ffac563f24ae44f958027160))

# [1.2.0](https://github.com/zp-bots-telegram/elite-live-golf-bot/compare/v1.1.0...v1.2.0) (2021-09-27)


### Features

* course availability command ([#3](https://github.com/zp-bots-telegram/elite-live-golf-bot/issues/3)) ([807011e](https://github.com/zp-bots-telegram/elite-live-golf-bot/commit/807011ecfad34e31aed46378e337fcd39dde8949))

# [1.1.0](https://github.com/zp-bots-telegram/elite-live-golf-bot/compare/v1.0.0...v1.1.0) (2021-09-26)


### Bug Fixes

* update loginCache atomically ([4fa9ee6](https://github.com/zp-bots-telegram/elite-live-golf-bot/commit/4fa9ee67f7256f4e0f800df9c63cc9145c3f7042))


### Features

* login command and new booking api ([#2](https://github.com/zp-bots-telegram/elite-live-golf-bot/issues/2)) ([d236972](https://github.com/zp-bots-telegram/elite-live-golf-bot/commit/d236972c55e9b9fbccedd2a90fa96f877012824c))

# 1.0.0 (2021-06-12)


### Bug Fixes

* rename command to bookings from golf and fix linting ([d975e75](https://github.com/zp-bots-telegram/elite-live-golf-bot/commit/d975e75c98dd273d06041c23ea5a26af6a5371e7))


### Features

* initial structure and booking history command ([c20a6a8](https://github.com/zp-bots-telegram/elite-live-golf-bot/commit/c20a6a830593aa7ea032bb0f37c53520c20aa472))
