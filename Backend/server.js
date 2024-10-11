const express=require('express');
const cors=require('cors');
const mysql=require('mysql2');

const { parser } = require('./config/cloudinaryConfig');
const db = require('./config/db');
const dotenv = require('dotenv');

const jwt=require('jsonwebtoken');
const bcrypt =require('bcrypt');
const cookiParser =require ('cookie-parser');
const salt = 10;

const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Load environment variables
dotenv.config();

app.use(cors({
  origin: [process.env.CLIENT_URL], // Use environment variable here
  methods: ['GET', 'POST', 'DELETE'], 
     credentials:true,
}));
app.use(cookiParser());


app.get('/getproductforform',(req,res)=>{
  try{
   
    const pid=req.query.pid;

    const selectQuery = 'SELECT * FROM Products WHERE id = ?';
    const selectValues = [pid];
   
      db.query(selectQuery, selectValues, (err, result) => {
        
        if (err) {
          
          console.error('Database Query error:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        const products=result;
        // console.log(products)

       res.json(products);
      });
  }catch(error){
    console.log(" error :"+ error);
    return res.status(500).json({ error: 'Internal Server Error' }); 
  }
})


app.get('/getproduct',(req,res)=>{
  try{
    const userId=req.query.userId;
    const pid=req.query.pid;
    // console.log("view user ub Id "+ userId);

    const selectQuery = 'SELECT * FROM Products WHERE user_id = ? AND id = ?';
    const selectValues = [userId, pid];
  
      db.query(selectQuery, selectValues, (err, result) => {
        if (err) {
          console.error('Database Query error:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        const products=result;
       res.json(products);
      });
  }catch(error){
    console.log(" error :"+ error);
    return res.status(500).json({ error: 'Internal Server Error' }); 
  }
})

app.delete('/deleteproduct',(req,res)=>{
  try{
    const pid=req.query.pid;
    // console.log("hello");
    const Query = ' DELETE FROM Products where id = ?';
    const Values = [pid];
   
      db.query(Query, Values, (err, result) => {
        
        if (err) {
          console.error('Database Query error:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }  
       res.status(200).json({Status:"Success"});
      });
  }catch(error){
    console.log(" error :"+ error);
    return res.status(500).json({ error: 'Internal Server Error' }); 
  }
})

app.get('/viewproducts',(req,res)=>{
  try{
    const userId=req.query.userId;
    // console.log("view user ub Id "+ userId);

    const insertQuery = 'select * from Products where user_id = ? ';
      const insertValues = [userId];
  
      db.query(insertQuery, insertValues, (err, result) => {
        if (err) {
          console.error('Database Query error:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        
           

        const products=result;
      //  products.images=JSON.parse(products.images);

      // const products = result.map(product => {
      //   // if (product.images) {
      //   //   product.images = JSON.parse(product.images);
      //   // }
      //   return product;
      // });
       res.json(products);

      });

  }catch(error){
    console.log(" error :"+ error);
    return res.status(500).json({ error: 'Internal Server Error' });
  
  }
})


app.get('/gettestimonial',(req,res)=>{
  try{
   
    const pid=req.query.pid;

    const selectQuery = 'SELECT * FROM Testimonials WHERE product_id = ?';
    const selectValues = [pid];
   
      db.query(selectQuery, selectValues, (err, result) => {
        
        if (err) {
          
          console.error('Database Query error:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        const testimonial=result;

         //console.log(testimonial)
   
       res.json(testimonial);
      });
  }catch(error){

    console.log(" error :"+ error);
    return res.status(500).json({ error: 'Internal Server Error' }); 
  }
})





app.post('/addtestimonial', parser.array('images', 5), (req, res) => {
  try {
    const {productId,name,email,stars,review } = req.body;
    const files = req.files;
    if (!name || !email || stars==0 || !review ) {
      return res.status(400).json({ error: 'Enter the Required details before submiting' });
    }
    // Extract image URLs from Cloudinary response
    const imageUrls = files.map(file => file.path); // 'path' contains the URL

    // Insert product into the database using callback
    const insertQuery = 'INSERT INTO Testimonials (product_id,customer_name, customer_email ,stars, review_text, image_url) VALUES (?, ?, ?, ?,?,?)';
    const insertValues = [productId, name, email, stars, review , JSON.stringify(imageUrls)];

    db.query(insertQuery, insertValues, (err, result) => {
      if (err) {
        console.error('Database insertion error:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

        res.status(201).json({ imageUrls ,message:"Testmonial Posted Successfully"});
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/deletetestimonial',(req,res)=>{
  try{
    const tid=req.query.tid;
    // console.log("hello");
    const Query = ' delete FROM Testimonials where id = ?';
    const Values = [tid];
   
      db.query(Query, Values, (err, result) => {
        
        if (err) {
          console.error('Database Query error:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }  
       res.status(200).json({Status:"Success"});
      });
  }catch(error){
    console.log(" error :"+ error);
    return res.status(500).json({ error: 'Internal Server Error' }); 
  }
})



app.post('/createproducts', parser.array('images', 5), (req, res) => {
    try {
      const { productName, description ,user_id} = req.body;
      const files = req.files;
    //   console.log(user_id);
      // Validate inputs
      if (!productName || !description) {
        return res.status(400).json({ error: 'Product name and description are required.' });
      }
  
      if (!files || files.length === 0) {
        return res.status(400).json({ error: 'At least one image is required.' });
      }
  
      // Extract image URLs from Cloudinary response
      const imageUrls = files.map(file => file.path); // 'path' contains the URL
  
      // Insert product into the database using callback
      const insertQuery = 'INSERT INTO Products (user_id,name, description, images) VALUES (?, ?, ?, ?)';
      const insertValues = [user_id, productName, description, JSON.stringify(imageUrls)];
  
      db.query(insertQuery, insertValues, (err, result) => {
        if (err) {
          console.error('Database insertion error:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
  
        const productId = result.insertId;

        res.status(201).json({ productId, imageUrls });
      });
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

  

  app.post("/login",(req,res)=>{
    // console.log(req.body);
    const sql="select * from Users where email= ?";

    db.query(sql,[req.body.email],(err,data)=>{
        
        if(err) {
            console.error("Database query error:", err);
            return res.json({ Error: "Internal Server Error" });
        }

        if(data.length>0){
          bcrypt.compare(req.body.password,data[0].password,(err,response)=>{

            if(err){
                console.error("Bcrypt compare error:", err);
                return res.json({ Error: "Internal Server Error" });
                
            }

            if(response){
                const name= data[0].name;
                const id=data[0].id;
                // console.log("input data : "+data[0].id);
                const token=jwt.sign({name,id:id},process.env.JWT_SECRET_KEY,{expiresIn:'1d'});
                // res.cookie('token',token);
                // res.cookie('token', token, { httpOnly: true, sameSite: 'Strict' });

          
res.cookie('token', token, { 
    httpOnly: true, 
    sameSite: 'Lax', // Changed from 'Strict' to 'Lax'
    // secure: true, // Uncomment this if using HTTPS
});


                return res.json({Status:"Success"})
            }else{
                return res.status(400).json({Error:"password mismatch"})
            }
          })
        }else{
            return res.status(400).json({ Error: "No email exists" });
        }
    });

  });





app.post("/signup",(req,res)=>{
    // console.log('hi------');
    const sql="INSERT INTO Users (name, email, password) VALUES (?)";
    
    bcrypt.hash(req.body.password.toString(),salt,(err,hash)=>{

        if(err) return res.json({Error:"error in password Hashing"});
       
        const value=[
            req.body.name,
            req.body.email,
            hash
        ]

        db.query(sql,[value],(err,result)=>{
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    // Handle duplicate email error
                    console.log("email exist")
                    return res.status(400).json({ Error: "Email already exists" });
                    
                }
                console.log(err);
                return res.status(500).json({ Error: "Inserting error" });
            }
        
           // console.log("inserted");
            return res.status(200).json({ Status: "Success" });
           
         });
    });
});

const verifyUser=(req,res,next)=>{
   
   const token = req.cookies.token;
   // console.log("Received Token:", token);
   if(!token){
    return res.json({Error:"you are not athenticated"})
   }else{
    jwt.verify(token,process.env.JWT_SECRET_KEY,(err,decoded)=>{
        if(err){
            return res.json({Error:"Token error"})
        }else{
           req.name=decoded.name;
            req.id=decoded.id;
           
            next(); 
        }
    })
   }
}


app.get("/dashboard",verifyUser,(req,res)=>{
    return res.json({Status:"Success",name:req.name,id:req.id})
})



app.get("/me", verifyUser, (req, res) => {
    return res.json({ Status: "Success", name: req.name });
  });
  

app.get("/logout",(req,res)=>{
    res.clearCookie('token');
    return res.json({Status:"Success"});
})

app.post("/usermessage",(req,res)=>{
  //  console.log("hell  "+req.body.email);

    sql="insert into user_messages (full_name,email,subject,message) values (?)";
    const value=[
        req.body.name,
        req.body.email,
        req.body.subject,
        req.body.message
     ];
  
db.query(sql,[value],(err,result)=>{
    if(err){
        console.error("Database insertion error:", err);
       return res.status(500).json({ Error: "Internal Server Error" });
    }

    // console.log(result);
    return res.status(200).json({ Status: "Success" });
})
    
})


app.listen(process.env.PORT,()=>{
    console.log("backend started");
})

