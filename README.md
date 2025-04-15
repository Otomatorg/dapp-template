![tw-banner](https://canny-assets.io/icons/372194e903a8c686d55b27994218c763.png)

# otomato-starter

Starter template to build onchain applications with [thirdweb](https://thirdweb.com) and [vite](https://vitejs.dev/).

## Features

- thirdweb & vite pre-installed and configured to reduce setup steps
- ConnectButton to onboard users to your application

## Environment Variables

To run this project, you will need to add the following environment variables to your .env.template file:

`VITE_THIRDWEB_CLIENT_ID`: you will provide your clientId, refer to [client documentation](https://portal.thirdweb.com/typescript/v5/client)

# Run locally

Node version requirement v22+

```bash
node -v
```

Install dependencies

```bash
npm install
```

## Copy .env.template to .env

```bash
cp .env.template .env
```

Don't forget to add your Thirdweb clientId to the .env file

## Start the app locally

```bash
npm run dev
```

## Create a production build

```bash
npm run build
```

## Preview the production build

```bash
npm run preview
```
