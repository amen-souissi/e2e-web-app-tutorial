import pgPromise, { IMain, IDatabase } from "pg-promise";

const pgp: IMain = pgPromise({});

const config = {
  host: process.env.POSTGRES_HOST,
  port: (process.env.POSTGRES_PORT as unknown) as number,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD
};

const database: IDatabase<any> = pgp(config);

export default database;
