import  express  from "express"
import  colors  from "colors"
import dotenv from "dotenv"
import morgan from 'morgan'
import connectDB from "./config/db.js"
import authRoutes from './routes/authRoute.js' 
import cors from "cors"
import categoryRoutes from './routes/categoryRoutes.js'
 import ProductRoutes from './routes/ProductRoutes.js'
 import path from 'path';
 import { getGlobals } from 'common-es'
const { __dirname, __filename } = getGlobals(import.meta.url)

//configure env (d)
dotenv.config();

const app = express()

//database config
connectDB();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); //(d)
app.use(express.static(path.join(__dirname , './client/build' )))

//port
const PORT= process.env.PORT || 8080;


//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category",  categoryRoutes);
app.use("/api/v1/product", ProductRoutes);


//rest API
app.use("*", function(req,res){
    res.sendFile(path.join(__dirname, "./client/build/index.html"))
});

//run listen

app.listen(PORT,()=>{
    console.log(`server running on ${process.env.DEV_MODE} mode on ${PORT}`.bgCyan.blue);
});