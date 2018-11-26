# next-apollo
Next and Apollo Example

## Bootstrap
```
npm run bootstrap
```

## Config

Configurations can be found in .env files in the various microservice folders.

## Start Local

Start everything in docker.

```
npm run start
```

Access your app under `http://localhost:3102`

## Develop

While developing you won't be running everything in docker, only certain services (`db`, `api`)

```
npm run dev
```

Access your app under `http://localhost:3102`

## Linting

```
npm run lint -- file-or-dir-to-lint --fix
```