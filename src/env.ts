import dotenv from 'dotenv';

dotenv.config();

export const TEMPORAL_SERVER_URL = process.env.TEMPORAL_SERVER_URL;
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

