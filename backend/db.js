import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const testConnection = async () => {
  try {
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });

    console.log('✅ Connected to DB!');

    const [rows] = await conn.query('SHOW TABLES');
    console.log('📋 Tables:', rows);

    await conn.end();
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
  }
};

