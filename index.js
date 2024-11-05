import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from "helmet";
import cookieParser from "cookie-parser";
import hpp from "hpp";
import fileUpload from 'express-fileupload'
import { MAX_JSON_SIZE, PORT, REQUEST_LIMIT_NUMBER, REQUEST_LIMIT_TIME, URL_ENCODED, WEB_CACHE } from './app/config/config.js';
import router from './routes/api.js';



const app = express();

// Global Application Middleware
app.use(cors());
app.use(express.json({limit: MAX_JSON_SIZE}));
app.use(express.urlencoded({ extended: URL_ENCODED }));
app.use(hpp())
app.use(helmet())
app.use(cookieParser())

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));



// Rate Limiter
const limiter=rateLimit({windowMs:REQUEST_LIMIT_TIME,max:REQUEST_LIMIT_NUMBER})
app.use(limiter)


// Web Caching
app.set('etag',WEB_CACHE)



// MongoDB connection



// Set API Routes
app.use("/api/blog", router)

// Set Application Storage
app.use(express.static('storage'))

// Run Your Express Back End Project

app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}`);
})
