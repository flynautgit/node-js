# Folder Architecture
- src
  - config
  - controllers
  - middlewares
  - models
  - routes
  - services
  - types
  - utils
  - server.ts
- .env
- package-lock.json
- tsconfig.json
- types.d.ts

## config
- config directory will contains all the configuration files.
- It has `config.ts` by default which manipulates the configuration according to deployment type and exports it.
- Any file where we need to provide environment variables must be exported from `config.ts`
- Deployment type includes `production`, `development`, `local`
- Config file includes properties `mongo`, `server`, `keys`, `client`
> properties in config file will have empty string if there is no value provided in the `.env` file.

## controllers
- controllers directory will contains all of the controller files that handles the business logic and trigger services.
- Don't write database query here. This is for business Logic and executing database services from `services directory`.
> one demo file is provided in the controllers directory.

## middlewares
- All of the middlewares would be declared here.
- It has few Authorization middlewares by default.
- Token must be prepared using `getToken()` method of `Token.ts` within `utils directory`.
> You can find user within `request.user` within the controller when any authorization middleware is processed.

## models
- It contains All the mongoose Schema files.

## routes
- All of routes would be defined here with seperate files for each `user type` of the system.
- It contains `main.ts` which is the entry point of the routes.
- Declare routes for different `user type` of the system and pass the control to the seperate route file for that user.
- Don't pass Authorization or custom middleware within `main.ts`. It can be done further on the seperate files for each `user type` of the system.
> directory contains some demo files.

## services
- All the database handling would be done here with seperate file for each of the `models`.
- It by default contains a `user.ts` which will contain all of the CRUD operation regarding user only.
- Same as `user` developer need to create seperate files for each models.

## types
- It by default contain `response.ts` which contains different response type code with its name. It will be used All
over the program for setting status of the response.
- It has a `enum.ts` file. Any key passed in the `enum` automatically gets value assigned starting from `0` sequentially.
- user.d.ts is a custom typescript types files.
> seperate files would be created just like `user.d.ts` for declaring custom typescript types.

## utils
- Any custom functions required in the system would be created over here.
- It By default contains 4 files `Encryption.ts`, `SequenceGenerator.ts`, `Socket.ts`, `Token.ts`
> `Token.ts` is used to create token for authentication functions.
> `Socket.ts` can be imported on the entry file which is `server.ts`. Create a new instance of the imported file and executes its `setServer` function passing the server as its parameter.
> The variable holding `app.listen` is the server. To start socket executes its `createConnection` function. Any custom logic on `connection` or `disconnect` must be written within the `socket.ts` itself.
> Socket emission can also be done from the routes by calling `getIo` method, which is an instance of the `socket io`.

### server.ts ( entry point )
### .env ( environment variables )
### tsconfig.json
### types.d.ts ( to manipulate express request and response type for typescript. )

> Make sure to build the app before pushing it to server.
> after building executables code will lie within `dist` directory.

