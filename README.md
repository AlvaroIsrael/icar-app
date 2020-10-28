<h1 align="center">
    <img  alt="iCar App" width="300" height="300" src="https://nodejs.org/static/images/logo.svg"/>
    <br>
    🚙 iCar App
</h1>

Made with ❤️ by Alvaro Israel 👏🏻 [Get in touch!](https://www.linkedin.com/in/alvaroisraeldesenvolvedor/)

## 📌 What is it?

This is just a concept app to show node.js skills. It was part of a code challenge given to me by Seidor Brasil enterprise.
It suppose to be a rental app car os some sort and we should be able to perform the following actions:

- Create, update, delete a vehicle and also list all vehicles in the system.
- Create, update, delete a vehicle's driver and also list all motorists in the system.
- Create a record when a vehicle is rent or taken by a driver and also update that same record once that same vehicle is returned.

This app does not use a database as persistence to avoid unecessary complexity and also to facilitate the testing process. Instead it uses arrays to mock or simulate a persistence.

### 🗃 Business guidelines

- A vehicle can only have one driver at a time.
- A driver can only have one car at a time.

## 🏆 Technologies used

- [Node](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [ExpressJs](https://expressjs.com/)
- [JestJs](https://jestjs.io/)

## 💻 How to run?

This project uses NodeJs with Typescript, so in order for it to work, frist navigate inside the backend's project folder and run npm install to download the proper dependencies:
```
cd icar-backend
npm install
or
yarn install
```

After that we can run the app by running the following command:
```
npm dev:server
or
yarn dev:server
```

The above commands are just a package.json's script. In case you want you can also run the full commmand by running the following:
```
ts-node-dev --inspect --transpile-only --ignore-watch node_modules src/server.ts
```

## 🛠 How to test?

This project uses JestJs with coverage reports as a test library.
To run unity tests run the following commands:
```
npm test
or
yarn test
```
Those are also just a package.json's script. If for some reason you want to run the full command run the following:
```
jest --coverage --watchAll=false
```

## 📝 Licence

This is under GPL v3 license. See [LICENSE](LICENSE.md) for more details.
