Change log

## [1.2.9](https://github.com/zp-templates/typescript-project-template/compare/v1.2.8...v1.2.9) (2021-05-05)


### Bug Fixes

* don't use cache-to ([044cd78](https://github.com/zp-templates/typescript-project-template/commit/044cd7858c3180ec504eb82206b53d05286d05dc))

## [1.2.8](https://github.com/zp-templates/typescript-project-template/compare/v1.2.7...v1.2.8) (2021-05-05)


### Bug Fixes

* use image caching ([576dd71](https://github.com/zp-templates/typescript-project-template/commit/576dd71bf41864af50d295fa37b36c81c02fcd14))

## [1.2.7](https://github.com/zp-templates/typescript-project-template/compare/v1.2.6...v1.2.7) (2021-05-05)


### Bug Fixes

* remove sleep ([f90b431](https://github.com/zp-templates/typescript-project-template/commit/f90b431de583fde411045e3d8b7e36484fab8326))

## [1.2.6](https://github.com/zp-templates/typescript-project-template/compare/v1.2.5...v1.2.6) (2021-05-05)


### Bug Fixes

* use node 14 and optimise Dockerfile ([6da7f5a](https://github.com/zp-templates/typescript-project-template/commit/6da7f5a820faeb3d8fa5fdc26b62539cf5428675))

## [1.2.5](https://github.com/zp-templates/typescript-project-template/compare/v1.2.4...v1.2.5) (2021-05-05)


### Bug Fixes

* faster dockerfile build ([a708cf2](https://github.com/zp-templates/typescript-project-template/commit/a708cf29a38fa3f7e6662fb64b420d9356ae642e))

## [1.2.4](https://github.com/zp-templates/typescript-project-template/compare/v1.2.3...v1.2.4) (2021-05-05)


### Bug Fixes

* set version as a tag not as a new container ([590813b](https://github.com/zp-templates/typescript-project-template/commit/590813b63e97c1ba3dcd814e8d92c27ef70d72e1))

## [1.2.3](https://github.com/zp-templates/typescript-project-template/compare/v1.2.2...v1.2.3) (2021-05-05)


### Bug Fixes

* push to registry after build ([610e577](https://github.com/zp-templates/typescript-project-template/commit/610e5776dc323c9928ffd1cd8767421e09432c0c))

## [1.2.2](https://github.com/zp-templates/typescript-project-template/compare/v1.2.1...v1.2.2) (2021-05-05)


### Bug Fixes

* specify ghcr.io in build tags ([55809d1](https://github.com/zp-templates/typescript-project-template/commit/55809d1df7524dffca8e931904f28e763e896489))

## [1.2.1](https://github.com/zp-templates/typescript-project-template/compare/v1.2.0...v1.2.1) (2021-05-05)


### Bug Fixes

* use v2 build-push-action ([c3f94ad](https://github.com/zp-templates/typescript-project-template/commit/c3f94adecbfbc3e0e61bc9940e7e62d4423a8573))

# [1.2.0](https://github.com/zp-templates/typescript-project-template/compare/v1.1.12...v1.2.0) (2021-05-05)


### Features

* support pushing to github container registry with new v2 action ([e35275d](https://github.com/zp-templates/typescript-project-template/commit/e35275df118bdefa1780b7032e47b662cfc3584b))

## [1.1.12](https://github.com/zp-templates/typescript-project-template/compare/v1.1.11...v1.1.12) (2021-05-05)


### Bug Fixes

* docker-push-action v1 ([17bd08b](https://github.com/zp-templates/typescript-project-template/commit/17bd08bd85ea30530ec321b921f2fe842a3e27a3))

## [1.1.11](https://github.com/zp-templates/typescript-project-template/compare/v1.1.10...v1.1.11) (2021-05-05)


### Bug Fixes

* disable npmPublish for semver ([4f016ba](https://github.com/zp-templates/typescript-project-template/commit/4f016ba1d7c39b079c7cf364ea44a5c7da30c995))
* disable npmPublish for semver ([f01bc68](https://github.com/zp-templates/typescript-project-template/commit/f01bc686ace1b5d3196b9814196d0738347c358a))
* update package.json version ([2974a68](https://github.com/zp-templates/typescript-project-template/commit/2974a68b334df523be19a032e48619a3237e73f1))

## [1.1.10](https://github.com/zp-templates/typescript-project-template/compare/v1.1.9...v1.1.10) (2021-05-05)


### Bug Fixes

* multiple tags ([4c77946](https://github.com/zp-templates/typescript-project-template/commit/4c779461fcbeec16ba976202ac5c850698081229))

## [1.1.9](https://github.com/zp-templates/typescript-project-template/compare/v1.1.8...v1.1.9) (2021-05-05)


### Bug Fixes

* release under project name only ([cc51705](https://github.com/zp-templates/typescript-project-template/commit/cc517052a189e8859368c92619e2b5f16ba7cefa))

## [1.1.8](https://github.com/zp-templates/typescript-project-template/compare/v1.1.7...v1.1.8) (2021-05-04)


### Bug Fixes

* remove unnecessary stage and update push-action ([00ae1e3](https://github.com/zp-templates/typescript-project-template/commit/00ae1e3b0b8108f3829faab99bd248a5ad940a41))

## [1.1.7](https://github.com/zp-templates/typescript-project-template/compare/v1.1.6...v1.1.7) (2021-05-04)


### Bug Fixes

* checkout and install node for release job ([4591b15](https://github.com/zp-templates/typescript-project-template/commit/4591b152a1d809d41924f9adc3f13a8b1cbd73ad))
* collapse release into single workflow ([8966830](https://github.com/zp-templates/typescript-project-template/commit/8966830fe25ea861999aeb6ebc13ff459e096be9))
* install dependencies before doing release ([158a6ef](https://github.com/zp-templates/typescript-project-template/commit/158a6efdea9e881f158e6bef995d185c25a4ab0b))
* install dependencies BEFORE doing release ([9bc8082](https://github.com/zp-templates/typescript-project-template/commit/9bc8082a34186364794842eb98e5605dc794b1c2))

## [1.1.6](https://github.com/zp-templates/typescript-project-template/compare/v1.1.5...v1.1.6) (2021-05-04)


### Bug Fixes

* test triggers ([da88a75](https://github.com/zp-templates/typescript-project-template/commit/da88a75e7a226361ddd9ba9bc270b7810c895bcf))

## [1.1.5](https://github.com/zp-templates/typescript-project-template/compare/v1.1.4...v1.1.5) (2021-05-04)


### Bug Fixes

* change to tag create trigger ([48110f3](https://github.com/zp-templates/typescript-project-template/commit/48110f3b3b951cc73d1acd0e3326d3fbe2a32fea))

## [1.1.4](https://github.com/zp-templates/typescript-project-template/compare/v1.1.3...v1.1.4) (2021-05-04)


### Bug Fixes

* capitalise workflow name ([bb1087d](https://github.com/zp-templates/typescript-project-template/commit/bb1087d5c5b23510f02e9550ff4d18adc2941f13))

## [1.1.3](https://github.com/zp-templates/typescript-project-template/compare/v1.1.2...v1.1.3) (2021-05-04)


### Bug Fixes

* change to release published ([dd57f9a](https://github.com/zp-templates/typescript-project-template/commit/dd57f9a83c60f258fa7ec9ea745c9c74d61bca28))

## [1.1.2](https://github.com/zp-templates/typescript-project-template/compare/v1.1.1...v1.1.2) (2021-05-04)


### Bug Fixes

* change to release created ([9c669f1](https://github.com/zp-templates/typescript-project-template/commit/9c669f16992f55bf00495ac713992347cc203ee0))

## [1.1.1](https://github.com/zp-templates/typescript-project-template/compare/v1.1.0...v1.1.1) (2021-05-04)


### Bug Fixes

* attempt fix for job running on tags ([848cee2](https://github.com/zp-templates/typescript-project-template/commit/848cee2185fb9742c8607554c72d7b82f1ac5447))

# [1.1.0](https://github.com/zp-templates/typescript-project-template/compare/v1.0.0...v1.1.0) (2021-05-04)


### Features

* add dockerfile, container building and automated pushing ([c4ce47f](https://github.com/zp-templates/typescript-project-template/commit/c4ce47fb5594d678bc49d364d90fbad3ccbed113))

# 1.0.0 (2021-05-03)


### Bug Fixes

* eslint node environment setting ([aea6f0c](https://github.com/zp-templates/typescript-project-template/commit/aea6f0ce42c710a95a3c462c17d3684d774f68d3))
* semantic release config ([c4eecbd](https://github.com/zp-templates/typescript-project-template/commit/c4eecbd9c79f62d5840cec2428c271048b1bdf31))
* set include pattern for tsconfig ([e355ae7](https://github.com/zp-templates/typescript-project-template/commit/e355ae7101b68783bce9afa7a68ecfebc9b8716c))


### Features

* add semantic-release ([53c0d2b](https://github.com/zp-templates/typescript-project-template/commit/53c0d2bbcc70a5eaeb0b622a9f5f5fb8a98283b8))
