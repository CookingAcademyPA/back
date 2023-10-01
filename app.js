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
const mealRoutes = require('./routes/meal_route');
const productRoutes = require('./routes/product_route');
const recipeRoutes = require('./routes/recipe_route');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/meals', mealRoutes);
app.use('/api/products', productRoutes);
app.use('/api/recipes', recipeRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});