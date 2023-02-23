Change log

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
