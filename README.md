# Fly Tigris User Database

![Fly Tigris User Database](/img/user-database.png 'Fly Tigris User Database')

## Getting Started

1. Create accounts on [https://fly.io/](https://fly.io/) and [https://www.tigrisdata.com/](https://www.tigrisdata.com/).
2. Then create a `.env.local` file in the root folder.
3. Create a bucket using [https://www.tigrisdata.com/docs/get-started/](https://www.tigrisdata.com/docs/get-started/) and add the environment variables to your `.env.local` file alongside `NEXT_PUBLIC_SECRET_HOST` which we need for our local/online server address for the CRUD routes. See the example below.

```bash
NEXT_PUBLIC_SECRET_HOST: http://localhost:3000
NEXT_PUBLIC_SECRET_AWS_ACCESS_KEY_ID: yours access key
NEXT_PUBLIC_SECRET_AWS_ENDPOINT_URL_S3: https://fly.storage.tigris.dev
NEXT_PUBLIC_SECRET_AWS_REGION: auto
NEXT_PUBLIC_SECRET_AWS_SECRET_ACCESS_KEY: yours secret access key
NEXT_PUBLIC_SECRET_BUCKET_NAME: your bucket name
```

First install the dependencies:

```bash
npm install
# or
yarn install
```

Second, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.
