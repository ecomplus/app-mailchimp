# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [3.0.0](https://github.com/ecomplus/app-mailchimp/compare/v1.1.9...v3.0.0) (2025-02-14)


### ⚠ BREAKING CHANGES

* **ecom-config:** change procedures to get each state of cart

### Features

* add pubsub to queue products to avoid timeout ([0b3e25a](https://github.com/ecomplus/app-mailchimp/commit/0b3e25ad532630cf072d068a8d14c232466143b1))
* create route to list all campaigns ([e792781](https://github.com/ecomplus/app-mailchimp/commit/e792781bd1fcab7b0ee819d5b3eb3d0adb80f680))


### Bug Fixes

* **deps:** update all non-major ([eb241be](https://github.com/ecomplus/app-mailchimp/commit/eb241be451324f5ef846778ce72fd9095ece647d))
* **deps:** update all non-major ([f2f79f4](https://github.com/ecomplus/app-mailchimp/commit/f2f79f464ceb0be65cf9f57bee9ab9693b7db96e))
* **deps:** update all non-major ([ed8b5d3](https://github.com/ecomplus/app-mailchimp/commit/ed8b5d3f63f738d5190a800f38a5d9ce85bd68a0))
* **deps:** update dependency @google-cloud/pubsub to ^3.7.5 ([f11c745](https://github.com/ecomplus/app-mailchimp/commit/f11c7456157af77d906c1d3fae7fe952fd4839bf))
* **deps:** update dependency express to v4.19.2 [security] ([5ca150e](https://github.com/ecomplus/app-mailchimp/commit/5ca150e506014f1d68995f04ccf69602d95e6f88))
* **deps:** update dependency express to v4.20.0 [security] ([a430bd5](https://github.com/ecomplus/app-mailchimp/commit/a430bd5f1a981aab32f5d58c8e94cc4504596256))
* **deps:** update dependency firebase-functions to ^4.6.0 ([0f0c770](https://github.com/ecomplus/app-mailchimp/commit/0f0c770a5885a92ae79f831fa84f29e341886bac))
* many (non-sense bugs) fixes on new orders handler ([4c9aa72](https://github.com/ecomplus/app-mailchimp/commit/4c9aa72b2d677f13c365e042371398f41a3f8780))
* must also receive product update webhooks ([efb9f23](https://github.com/ecomplus/app-mailchimp/commit/efb9f2392f21e9a521a9b517f4e43f46ee31f39d))
* **new-product:** send data to new update product ([0107e58](https://github.com/ecomplus/app-mailchimp/commit/0107e587ff5e9016f9af9cee22f10c609dbab23f))
* **parse-tag:** return to module export ([6ba2b7d](https://github.com/ecomplus/app-mailchimp/commit/6ba2b7d7de00859eef12586e5be7d5b5af034e8b))
* product slug ([ff54ee5](https://github.com/ecomplus/app-mailchimp/commit/ff54ee59ba5c4b60647515a63dbf0da174cd77b5))
* **webhook:** send order id ([c45167b](https://github.com/ecomplus/app-mailchimp/commit/c45167b9ea08b50e52f18c1e34f91e9221a94262))


* **ecom-config:** new config and tag filter by client ([4eed911](https://github.com/ecomplus/app-mailchimp/commit/4eed911835d22ec1eb66c893c22a6f70297b9e47))

### [1.1.9](https://github.com/ecomplus/app-mailchimp/compare/v1.1.8...v1.1.9) (2022-02-24)


### Bug Fixes

* **deps:** remove (old) axios from direct deps ([20a4d6b](https://github.com/ecomplus/app-mailchimp/commit/20a4d6bca1a546232e8adbdb94fb5c158793a8b2))
* updating to starter 26 and sdk 22.0.0-firestore.1.15.6 ([cc6804d](https://github.com/ecomplus/app-mailchimp/commit/cc6804d0ab61b88c8ccf1375b3562cefec3cd246))

### [1.1.8](https://github.com/ecomplus/application-starter/compare/v1.1.7...v1.1.8) (2020-11-05)


### Bug Fixes

* **deps:** update all non-major dependencies ([#7](https://github.com/ecomplus/application-starter/issues/7)) ([ebda3cb](https://github.com/ecomplus/application-starter/commit/ebda3cb41d32835834b4a07c528ee6eb65a66be4))
* **refresh-tokens:** add scheduled cloud function to run update ([c5dbb45](https://github.com/ecomplus/application-starter/commit/c5dbb45b6058e0d7b2c5c449b2bf126cd179cac1))

### [1.1.7](https://github.com/ecomplus/application-starter/compare/v1.1.6...v1.1.7) (2020-07-21)


### Bug Fixes

* **auth-callback:** check `row.setted_up` in place of 'settep_up' ([7fdc307](https://github.com/ecomplus/application-starter/commit/7fdc307a8fd1963d73d54c9f80b43c58e9b7fb8a))
* **new-customer:** enabled receive newsletter ([1466ffe](https://github.com/ecomplus/application-starter/commit/1466ffef5975a5169354d4e9f01409b73d7ebc7e))
* **new-customer:** enabled receive newsletter ([ca3fe7d](https://github.com/ecomplus/application-starter/commit/ca3fe7de0721f29d176f32fab40ca6b37ade74a8))
* **new-product.js:** save first image as default ([7a94dee](https://github.com/ecomplus/application-starter/commit/7a94dee38bb64dac4d08d701f890c21017a27a4c))

### [1.1.6](https://github.com/ecomplus/application-starter/compare/v1.1.5...v1.1.6) (2020-06-05)


### Bug Fixes

* **getappdata:** set getHiddenData has true ([b0adc80](https://github.com/ecomplus/application-starter/commit/b0adc80836ac449e41e166e99ab2e6b028ec6b11))

### [1.1.5](https://github.com/ecomplus/application-starter/compare/v1.1.4...v1.1.5) (2020-06-05)

### [1.1.4](https://github.com/ecomplus/application-starter/compare/v1.1.2...v1.1.4) (2020-06-05)


### Bug Fixes

* **deps:** update @ecomplus/application-sdk to firestore version ([f9c3404](https://github.com/ecomplus/application-starter/commit/f9c3404122b9c080d3d5cac22663d4330c5845d7))
* **deps:** update all non-major dependencies ([#6](https://github.com/ecomplus/application-starter/issues/6)) ([e5c497e](https://github.com/ecomplus/application-starter/commit/e5c497e5c5ddbd2db765d579018949c823894f1d))
* **refresh-tokens:** force appSdk update tokens task ([6fc215e](https://github.com/ecomplus/application-starter/commit/6fc215edcaa904a577aa339fe1997922aecaf7a2))

### [1.1.3](https://github.com/ecomplus/application-starter/compare/v1.1.2...v1.1.3) (2020-06-03)


### Bug Fixes

* **deps:** update @ecomplus/application-sdk to firestore version ([f9c3404](https://github.com/ecomplus/application-starter/commit/f9c3404122b9c080d3d5cac22663d4330c5845d7))
* **deps:** update all non-major dependencies ([#6](https://github.com/ecomplus/application-starter/issues/6)) ([e5c497e](https://github.com/ecomplus/application-starter/commit/e5c497e5c5ddbd2db765d579018949c823894f1d))
* **refresh-tokens:** force appSdk update tokens task ([6fc215e](https://github.com/ecomplus/application-starter/commit/6fc215edcaa904a577aa339fe1997922aecaf7a2))

### [1.1.2](https://github.com/ecomplus/application-starter/compare/v1.1.1...v1.1.2) (2020-05-21)

### [1.1.1](https://github.com/ecomplus/application-starter/compare/v1.1.0...v1.1.1) (2020-05-18)


### Bug Fixes

* enabled cors ([5ce66cb](https://github.com/ecomplus/application-starter/commit/5ce66cbb34288c9ba23085de4a2f4f981ee90f60))

## [1.1.0](https://github.com/ecomplus/application-starter/compare/v1.0.1...v1.1.0) (2020-05-18)


### Features

* **routes:** lists resource ([29f99bb](https://github.com/ecomplus/application-starter/commit/29f99bb6bf0e4560aede943a2cac381e61bd2f86))


### Bug Fixes

* **deps:** update all non-major dependencies ([1c7849c](https://github.com/ecomplus/application-starter/commit/1c7849cd5399a514e76a50eb14679bb1fdfec2ce))

### [1.0.1](https://github.com/ecomplus/application-starter/compare/v1.0.0...v1.0.1) (2020-05-18)

## 1.0.0 (2020-05-17)


### Features

* **mailchimp:** api client ([c7c9b97](https://github.com/ecomplus/application-starter/commit/c7c9b9761e2362054025174cecc6a320541dab8f))
* **routes:** customers resource ([95e0779](https://github.com/ecomplus/application-starter/commit/95e07792087248f9a9893e50c998f116d883ecc6))
* **routes:** products resource ([8fb4fc1](https://github.com/ecomplus/application-starter/commit/8fb4fc157d5549398c33393b04b1f4cd61b3668a))
* **routes:** store resource ([22a30e6](https://github.com/ecomplus/application-starter/commit/22a30e6bfc4b39d9c6d340372bda41cc28a96b4d))
* **webhook:** handler for triggers in products, customers and carts ([e3f91b8](https://github.com/ecomplus/application-starter/commit/e3f91b86a80b4e67902a48a5be57e6fb8b90acd7))


### Bug Fixes

* **deps:** update all non-major dependencies ([#1](https://github.com/ecomplus/application-starter/issues/1)) ([54d5416](https://github.com/ecomplus/application-starter/commit/54d54163cc657f42d9267fa9e57551e4fc9d6136))
* **deps:** using eslint v6 (node 8 support) ([1d2fd9d](https://github.com/ecomplus/application-starter/commit/1d2fd9d090151fbbc129fddaa3d5891f059460f8))

## [1.0.0-starter.11](https://github.com/ecomplus/application-starter/compare/v1.0.0-starter.10...v1.0.0-starter.11) (2020-04-27)


### Bug Fixes

* **deps:** update @ecomplus/application-sdk to v1.11.13 ([70584c2](https://github.com/ecomplus/application-starter/commit/70584c245e97a1b539a3df3f74109f20d9a1fa3c))
* **setup:** ensure enable token updates by default ([67aea0e](https://github.com/ecomplus/application-starter/commit/67aea0eb363be3cc535a0f0f4d1b5b682958f243))

## [1.0.0-starter.10](https://github.com/ecomplus/application-starter/compare/v1.0.0-starter.9...v1.0.0-starter.10) (2020-04-27)


### Bug Fixes

* **deps:** update @ecomplus/application-sdk to v1.11.11 ([b8217d0](https://github.com/ecomplus/application-starter/commit/b8217d03fe92b5c233615a0b6b4c01d7bad676c2))
* **deps:** update all non-major dependencies ([#19](https://github.com/ecomplus/application-starter/issues/19)) ([a99797a](https://github.com/ecomplus/application-starter/commit/a99797a129d6e2383ef5ef69c06afacd13cccfb0))
* **setup:** do not disable updates on refresh-tokens route ([b983a45](https://github.com/ecomplus/application-starter/commit/b983a45ada5575ee6435f7b3016ef35c28355762))

## [1.0.0-starter.9](https://github.com/ecomplus/application-starter/compare/v1.0.0-starter.8...v1.0.0-starter.9) (2020-04-21)


### Bug Fixes

* **deps:** update @ecomplus/application-sdk to v1.11.10 ([8da579c](https://github.com/ecomplus/application-starter/commit/8da579c19c6530e8cc9fd338a07aece1fccc64ff))

## [1.0.0-starter.8](https://github.com/ecomplus/application-starter/compare/v1.0.0-starter.7...v1.0.0-starter.8) (2020-04-18)


### Bug Fixes

* **deps:** update all non-major dependencies ([#17](https://github.com/ecomplus/application-starter/issues/17)) ([785064e](https://github.com/ecomplus/application-starter/commit/785064ef5bf06db7c084f9b17b37a6077645735b))

## [1.0.0-starter.7](https://github.com/ecomplus/application-starter/compare/v1.0.0-starter.6...v1.0.0-starter.7) (2020-04-07)

## [1.0.0-starter.6](https://github.com/ecomplus/application-starter/compare/v1.0.0-starter.5...v1.0.0-starter.6) (2020-04-06)


### Bug Fixes

* **deps:** update all non-major dependencies ([#10](https://github.com/ecomplus/application-starter/issues/10)) ([b3c65e5](https://github.com/ecomplus/application-starter/commit/b3c65e5c7eb89a4825eb47c852ce65293d172314))
* **deps:** update all non-major dependencies ([#13](https://github.com/ecomplus/application-starter/issues/13)) ([33ff19b](https://github.com/ecomplus/application-starter/commit/33ff19bbdad1f34b6d1c255089dc0a0e4092b955))
* **deps:** update all non-major dependencies ([#8](https://github.com/ecomplus/application-starter/issues/8)) ([feba5b9](https://github.com/ecomplus/application-starter/commit/feba5b9cdc54e8304beff2b12658a6343ef37569))
* **deps:** update dependency firebase-functions to ^3.6.0 ([#15](https://github.com/ecomplus/application-starter/issues/15)) ([5f7f0a2](https://github.com/ecomplus/application-starter/commit/5f7f0a2bf5c744000996e2a0b78690b363462ee7))
* **deps:** update dependency firebase-tools to ^7.16.1 ([#14](https://github.com/ecomplus/application-starter/issues/14)) ([b8e4798](https://github.com/ecomplus/application-starter/commit/b8e479851bd02bf5929a7df8a71a761f1c1c1654))
* **deps:** update dependency firebase-tools to v8 ([#16](https://github.com/ecomplus/application-starter/issues/16)) ([b72560e](https://github.com/ecomplus/application-starter/commit/b72560e4fc86496499d553e47094ace25436272b))
* **ecom-modules:** fix parsing mod names to filenames and vice versa ([99c185a](https://github.com/ecomplus/application-starter/commit/99c185afebeae77deb61537ed9de1c77132c16ce))

## [1.0.0-starter.5](https://github.com/ecomplus/application-starter/compare/v1.0.0-starter.4...v1.0.0-starter.5) (2020-03-05)


### Features

* **market-publication:** handle full featured app publication to Market ([28379dc](https://github.com/ecomplus/application-starter/commit/28379dc3c4784e757c8f25e5d737f6143682b0db))
* **static:** handle static with server app files from public folder ([827d000](https://github.com/ecomplus/application-starter/commit/827d00079b0dc169b2eef31b8e0ac73c596307a8))

## [1.0.0-starter.4](https://github.com/ecomplus/application-starter/compare/v1.0.0-starter.3...v1.0.0-starter.4) (2020-02-21)


### Features

* **calculate-shipping:** basic setup for calculate shipping module ([db77595](https://github.com/ecomplus/application-starter/commit/db7759514bb25d151dd4508fb96b84c52b3e94ba))


### Bug Fixes

* **home:** fix replace accets regex exps to generate slug from title ([198cc0b](https://github.com/ecomplus/application-starter/commit/198cc0b911d4874d96f3cd5254d30cab5fe89765))
* **home:** gen slug from pkg name or app title if not set or default ([25c20bf](https://github.com/ecomplus/application-starter/commit/25c20bfade65a86e4f4b1026ef59a5694a022a74))

## [1.0.0-starter.3](https://github.com/ecomplus/application-starter/compare/v1.0.0-starter.2...v1.0.0-starter.3) (2020-02-21)

## [1.0.0-starter.2](https://github.com/ecomplus/application-starter/compare/v1.0.0-starter.1...v1.0.0-starter.2) (2020-02-21)


### Bug Fixes

* **config:** stop reading app from functions config ([7b9aab7](https://github.com/ecomplus/application-starter/commit/7b9aab727fefe8a5b84695e90a0d68e02b8c3f62))

## [1.0.0-starter.1](https://github.com/ecomplus/application-starter/compare/v1.0.0-starter.0...v1.0.0-starter.1) (2020-02-20)


### Features

* **get-auth:** endpoint to return auth id and token for external usage ([40a8ae2](https://github.com/ecomplus/application-starter/commit/40a8ae2e895d6e32c7032ca500040ec82c80dc5d))
* **server:** also supporting passing Store Id from query ([111f3a7](https://github.com/ecomplus/application-starter/commit/111f3a716fbfd2e155e3fb24242bddcae7cb065c))


### Bug Fixes

* **server:** remove 'routes' path when setting filename for routes ([119524c](https://github.com/ecomplus/application-starter/commit/119524c523a11364ed912769637a6f8e479af5f1))

## [1.0.0-starter.0](https://github.com/ecomplus/application-starter/compare/v0.1.1...v1.0.0-starter.0) (2020-02-18)


### Features

* **router:** recursive read routes dir to auto setup server routes ([ff2b456](https://github.com/ecomplus/application-starter/commit/ff2b45604723a8146c9481ea36a9400da5ccc2bc))


### Bug Fixes

* **home:** fix semver on for app.version (remove version tag if any) ([ad36461](https://github.com/ecomplus/application-starter/commit/ad364614a7f5599850ad39e00a94d310742e8f80))
* **middlewares:** update route files exports (named exports by methods) ([6a22e67](https://github.com/ecomplus/application-starter/commit/6a22e67135bc6110e6da6b4ab25f67ad8d77f597))

### [0.1.1](https://github.com/ecomplus/application-starter/compare/v0.1.0...v0.1.1) (2020-02-18)


### Features

* **env:** get 'pkg' from functions config ([bf45ec3](https://github.com/ecomplus/application-starter/commit/bf45ec33a2147d5be91fdc4955bd6cfa1b0867e2))
* **home:** set version and slug from root package, fix with uris ([d4b61fa](https://github.com/ecomplus/application-starter/commit/d4b61fab427aefdb2ac485d90eb1abe15d6aafc6))


### Bug Fixes

* **env:** firebase doesnt uppercase config ([502185e](https://github.com/ecomplus/application-starter/commit/502185ed30f346d8db77b849d6ba0eb48cb777cb))
* **require:** update @ecomplus/application-sdk dependency name ([d4174ac](https://github.com/ecomplus/application-starter/commit/d4174ac5425b85590db0e92d4b1d69a8567a6c55))

## [0.1.0](https://github.com/ecomplus/application-starter/compare/v0.0.4...v0.1.0) (2020-02-17)

### [0.0.4](https://github.com/ecomclub/firebase-app-boilerplate/compare/v0.0.3...v0.0.4) (2020-02-16)


### Bug Fixes

* **server:** update routes names (refresh-tokens) ([79a2910](https://github.com/ecomclub/firebase-app-boilerplate/commit/79a2910817cf4193b40e02b2b1e6b920e7fefb2d))

### [0.0.3](https://github.com/ecomclub/express-app-boilerplate/compare/v0.0.2...v0.0.3) (2020-02-15)


### Features

* **server:** start reading env options, handle operator token ([ce107b7](https://github.com/ecomclub/express-app-boilerplate/commit/ce107b74cde375e875a85cc3ba0cc6a73740785d))
* **update-tokens:** adding route to start update tokens service (no content) ([20c62ec](https://github.com/ecomclub/express-app-boilerplate/commit/20c62ec6800fc326b89e8cf54b2916f56e5910e4))


### Bug Fixes

* **auth-callback:** fix handling docRef (desn't need to get by id again) ([629ca5a](https://github.com/ecomclub/express-app-boilerplate/commit/629ca5ab9849e3822cc190f423da5bf2e0c4daab))
* **auth-callback:** save procedures if not new, check and set 'settep_up' ([#3](https://github.com/ecomclub/express-app-boilerplate/issues/3)) ([4a01f86](https://github.com/ecomclub/express-app-boilerplate/commit/4a01f86c37e09cd7c0363f6fbc80de6eeef3ba20))
* **ECOM_AUTH_UPDATE_INTERVAL:** disable set interval (no daemons on cloud functions) ([2aa2442](https://github.com/ecomclub/express-app-boilerplate/commit/2aa2442061f0308be9eb9430552fa04ad148788c))
* **env:** fixed to get appInfor variable ([e9b1a3c](https://github.com/ecomclub/express-app-boilerplate/commit/e9b1a3ce0d17ee74a5eada70589340fd5a70e786))
* **env:** fixed to get appInfor variable ([22687e2](https://github.com/ecomclub/express-app-boilerplate/commit/22687e25f611d49f8c01494af114e0289cec251e))
* **middleware:** check standard http headers for client ip ([5045113](https://github.com/ecomclub/express-app-boilerplate/commit/504511329afe9277d540f0f542a316d04634ce9e))

### 0.0.2 (2020-02-11)


### Bug Fixes

* **lib:** remove unecessary/incorrect requires with new deps ([69f2b77](https://github.com/ecomclub/express-app-boilerplate/commit/69f2b77))
* **routes:** fix handling appSdk (param) ([0cf2dde](https://github.com/ecomclub/express-app-boilerplate/commit/0cf2dde))
* **setup:** added initializeApp() to firebase admin ([e941e59](https://github.com/ecomclub/express-app-boilerplate/commit/e941e59))
* **setup:** manually setup ecomplus-app-sdk with firestore ([64e49f8](https://github.com/ecomclub/express-app-boilerplate/commit/64e49f8))
* **setup:** manually setup ecomplus-app-sdk with firestore ([c718bd0](https://github.com/ecomclub/express-app-boilerplate/commit/c718bd0))
* **setup:** manually setup ecomplus-app-sdk with firestore ([33909bf](https://github.com/ecomclub/express-app-boilerplate/commit/33909bf)), closes [/github.com/ecomclub/ecomplus-app-sdk/blob/master/main.js#L45](https://github.com/ecomclub//github.com/ecomclub/ecomplus-app-sdk/blob/master/main.js/issues/L45)
* **startup:** setup routes after appSdk ready, add home route ([d182555](https://github.com/ecomclub/express-app-boilerplate/commit/d182555))


### Features

* **firestore-app-boilerplate:** Initial commit ([c9963f0](https://github.com/ecomclub/express-app-boilerplate/commit/c9963f0))
* **firestore-app-boilerplate:** Initial commit ([be493ea](https://github.com/ecomclub/express-app-boilerplate/commit/be493ea))
* **firestore-support:** minor changes ([3718cba](https://github.com/ecomclub/express-app-boilerplate/commit/3718cba))
* **firestore-support:** refactoring to  use saveProcedures function ([62971ef](https://github.com/ecomclub/express-app-boilerplate/commit/62971ef))
* **firestore-support:** removed sqlite error clausule ([2d47996](https://github.com/ecomclub/express-app-boilerplate/commit/2d47996))
* **routes:** add home route (app json) ([42a3f2b](https://github.com/ecomclub/express-app-boilerplate/commit/42a3f2b))

# [LEGACY] Express App Boilerplate

### [0.1.1](https://github.com/ecomclub/express-app-boilerplate/compare/v0.1.0...v0.1.1) (2019-07-31)


### Bug Fixes

* **procedures:** fix checking for procedures array to run configureSetup ([1371cdc](https://github.com/ecomclub/express-app-boilerplate/commit/1371cdc))

## [0.1.0](https://github.com/ecomclub/express-app-boilerplate/compare/v0.0.2...v0.1.0) (2019-07-31)

### 0.0.2 (2019-07-31)


### Bug Fixes

* chain promise catch on lib getConfig ([281abf9](https://github.com/ecomclub/express-app-boilerplate/commit/281abf9))
* fix mergin hidden data to config ([8b64d58](https://github.com/ecomclub/express-app-boilerplate/commit/8b64d58))
* fix path to require 'get-config' from lib ([11425b0](https://github.com/ecomclub/express-app-boilerplate/commit/11425b0))
* get storeId from header and set on req object ([a3bebaa](https://github.com/ecomclub/express-app-boilerplate/commit/a3bebaa))
* handle error on get config instead of directly debug ([f182589](https://github.com/ecomclub/express-app-boilerplate/commit/f182589))
* routes common fixes ([2758a57](https://github.com/ecomclub/express-app-boilerplate/commit/2758a57))
* using req.url (from http module) instead of req.baseUrl ([d9057ca](https://github.com/ecomclub/express-app-boilerplate/commit/d9057ca))


### Features

* authentication callback ([8f18892](https://github.com/ecomclub/express-app-boilerplate/commit/8f18892))
* conventional store api error handling ([bcde87e](https://github.com/ecomclub/express-app-boilerplate/commit/bcde87e))
* function to get app config from data and hidden data ([ba470f5](https://github.com/ecomclub/express-app-boilerplate/commit/ba470f5))
* getting store id from web.js ([72f18c6](https://github.com/ecomclub/express-app-boilerplate/commit/72f18c6))
* handling E-Com Plus webhooks ([63ba19f](https://github.com/ecomclub/express-app-boilerplate/commit/63ba19f))
* main js file including bin web and local ([6b8a71a](https://github.com/ecomclub/express-app-boilerplate/commit/6b8a71a))
* pre-validate body for ecom modules endpoints ([f06bdb0](https://github.com/ecomclub/express-app-boilerplate/commit/f06bdb0))
* setup app package dependencies and main.js ([b2826ed](https://github.com/ecomclub/express-app-boilerplate/commit/b2826ed))
* setup base app.json ([015599a](https://github.com/ecomclub/express-app-boilerplate/commit/015599a))
* setup daemon processes, configure store setup ([db3ca8c](https://github.com/ecomclub/express-app-boilerplate/commit/db3ca8c))
* setup procedures object ([c5e8627](https://github.com/ecomclub/express-app-boilerplate/commit/c5e8627))
* setup web app with express ([d128430](https://github.com/ecomclub/express-app-boilerplate/commit/d128430))
