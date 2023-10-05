require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Routes for todos
const authRoutes = require('./routes/auth_route');
const userRoutes = require('./routes/user_route');
const subscriptionRoutes = require('./routes/subscription_route');
const subscriptionHistoryRoutes = require('./routes/subscription_history_route');
const mealRoutes = require('./routes/meal_route');
const productRoutes = require('./routes/product_route');
const recipeRoutes = require('./routes/recipe_route');
const cartRoutes = require('./routes/cart_route');
const serviceRoutes = require('./routes/service_route');
const commentRoutes = require('./routes/comment_route');
const invoiceRoutes = require('./routes/invoice_route');
const buyRoutes = require('./routes/buy_route');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/subscriptions/history', subscriptionHistoryRoutes);
app.use('/api/meals', mealRoutes);
app.use('/api/products', productRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/buy', buyRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});