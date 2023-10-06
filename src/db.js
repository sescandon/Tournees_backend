import { createPool } from 'mysql2';

// create the connection pool
const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'crud'
});

// export the pool
export default pool;
