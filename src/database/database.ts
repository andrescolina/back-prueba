import { createPool } from 'mysql2/promise';
import credenciales from './credentials';

export async function connect() {

    const connection = await createPool(credenciales.database)

    return connection;

}