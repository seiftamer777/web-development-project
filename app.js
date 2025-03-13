const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const multer = require('multer');
const productController = require('./controllers/productcontroller');
const userController = require('./controllers/usercontroller');
const orderController = require('./controllers/orderController'); // Import orderController
const errorMiddleware = require('./middleware/errorMiddleware');
const session = require('express-session');

const app = express();
const port = 8080;

// Load environment variables from config.env
dotenv.config({ path: 'config.env' });

// Log the MONGODB_URI to verify it's loaded correctly
console.log('MONGODB_URI:', process.env.MONGODB_URI);

// Connect to MongoDB
const connectToMongoDB = () => {
  const mongoURI = process.env.MONGODB_URI;
  if (!mongoURI) {
    throw new Error('MongoDB connection URI is missing. Please set the MONGODB_URI environment variable.');
  }

  mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));
};

connectToMongoDB();

// Multer setup for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // To parse form data
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'your-secret-key', // Replace with your secret
  resave: false,
  saveUninitialized: true,
}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Ensure productController methods are correctly defined and imported
if (!productController.getProducts) {
  throw new Error('productController.getProducts is not defined');
}
if (!productController.createProduct) {
  throw new Error('productController.createProduct is not defined');
}
if (!productController.updateProduct) {
  throw new Error('productController.updateProduct is not defined');
}
if (!productController.deleteProduct) {
  throw new Error('productController.deleteProduct is not defined');
}
if (!productController.moveProducttoedit) {
  throw new Error('productController.moveProducttoedit is not defined');
}

// Ensure userController methods are correctly defined and imported
if (!userController.getUsers) {
  throw new Error('userController.getUsers is not defined');
}
if (!userController.createUser) {
  throw new Error('userController.createUser is not defined');
}
if (!userController.updateUser) {
  throw new Error('userController.updateUser is not defined');
}
if (!userController.deleteUser) {
  throw new Error('userController.deleteUser is not defined');
}
if (!userController.moveUsertoedit) {
  throw new Error('userController.moveUsertoedit is not defined');
}

// Routes
app.get('/Home', (req, res) => res.render('Home', { domainName: 'dxx24bpv-8080.uks1.devtunnels.ms' }));
app.get('/HomeP', (req, res) => res.render('HomeP', { domainName: 'dxx24bpv-8080.uks1.devtunnels.ms' }));
app.get('/HomeR', (req, res) => res.render('HomeR', { domainName: 'dxx24bpv-8080.uks1.devtunnels.ms' }));
app.get('/HomeT', (req, res) => res.render('HomeT', { domainName: 'dxx24bpv-8080.uks1.devtunnels.ms' }));
app.get('/about', (req, res) => res.render('about', { domainName: 'dxx24bpv-8080.uks1.devtunnels.ms' }));
app.get('/admin', productController.getProducts);
app.get('/Signup', (req, res) => res.render('signup', { domainName: 'dxx24bpv-8080.uks1.devtunnels.ms' }));
app.get('/login', (req, res) => res.render('login', { domainName: 'dxx24bpv-8080.uks1.devtunnels.ms' }));
app.get('/adminorder', (req, res) => res.render('adminorder'));
app.get('/adminedit/:id', productController.moveProducttoedit);
app.get('/adminuedit/:id', userController.moveUsertoedit);
app.get('/adminu', userController.getUsers);
app.get('/checkout', (req, res) => res.render('checkout', { domainName: 'dxx24bpv-8080.uks1.devtunnels.ms' }));
app.get('/arrivals', (req, res) => res.render('arrivals', { domainName: 'dxx24bpv-8080.uks1.devtunnels.ms' }));
app.get('/shop', (req, res) => res.render('shop', { domainName: 'dxx24bpv-8080.uks1.devtunnels.ms' }));

// Order routes
app.get('/getUser', orderController.getUser);
app.get('/getProduct', orderController.getProduct);
app.get('/getAllOrders', orderController.getAllOrders);
app.post('/updateOrder', orderController.updateOrder);
app.post('/deleteOrder', orderController.deleteOrder);

// Handle form submissions and actions
app.post('/admin', upload.array('images'), productController.createProduct);
app.post('/createProduct', upload.array('images'), productController.createProduct);
app.post('/updateProduct/:id', upload.array('images'), productController.updateProduct);
app.post('/deletee/:id', productController.deleteProduct);

app.post('/createUser', userController.createUser);
app.post('/updateUser/:id', userController.updateUser);
app.post('/deleteUser/:id', userController.deleteUser);

// Handle login
app.post('/login', (req, res) => {
  console.log("Login request received");
  const { username, password } = req.body;
  // Replace with actual authentication logic
  if (username === 'youssef22' && password === 'seiftamer@1') { // Ensure password is checked correctly
    req.session.username = username; // Store username in session
    res.redirect('/dashboard'); // Redirect to a protected route or dashboard
  } else {
    res.redirect('/login'); // Redirect to login if authentication fails
  }
});

// Handle 404 and internal server errors
app.use(errorMiddleware.notFoundError);
app.use(errorMiddleware.internalServerError);

// Start the server
app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);
  // Open the default browser to the /Home route
  const open = (await import('open')).default;
  open(`http://localhost:${port}/Home`);
});

module.exports = app;
