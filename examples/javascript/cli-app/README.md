# Simple TODO-App Example (CLI)

This example shows how to implement a **TODO-app as a CLI tool** with Node.js and [Photon.js](https://photonjs.prisma.io/).

## How to use

### 1. Download example & install dependencies

Clone the repository:

```sh
git clone git@github.com:prisma/photonjs.git
```

Install Node dependencies:

```sh
cd photonjs/examples/javascript/cli-app
npm install
```

### 2. Install the Prisma 2 CLI

To run the example, you need the [Prisma 2 CLI](https://github.com/prisma/prisma2/blob/master/docs/prisma-2-cli.md):

```sh
npm install -g prisma2
```

### 3. Set up database

For this example, you'll use a simple [SQLite database](https://www.sqlite.org/index.html). To set up your database, run:

```sh
prisma2 lift save --name 'init'
prisma2 lift up
```

You can now use the [SQLite Browser](https://sqlitebrowser.org/) to view and edit your data in the `./prisma/dev.db` file that was created when you ran `prisma2 lift up`.

### 4. Generate Photon (type-safe database client)

Run the following command to generate [Photon.js](https://photonjs.prisma.io/):

```sh
prisma2 generate
```

Now you can seed your database using the `seed` script from `package.json`:

```sh
npm run seed
```

### 5. Use the CLI app

```sh
npm run cli
```

#### Add a `Todo` item

```sh
npm run cli add Groceries
```

#### List all `Todo` items

```sh
npm run cli list
```

#### Delete a `Todo` item

```sh
npm run cli delete Groceries
```

## Next steps

- Read the [Prisma 2 announcement](https://www.prisma.io/blog/announcing-prisma-2-zq1s745db8i5/)
- Check out the [Prisma 2 docs](https://github.com/prisma/prisma2)
- Share your feedback in the [`prisma2-preview`](https://prisma.slack.com/messages/CKQTGR6T0/) channel on the Prisma Slack
