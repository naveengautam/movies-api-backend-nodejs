import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import AdminJS, { ComponentLoader } from 'adminjs';
import { Database as MongooseDatabase, Resource as MongooseResource } from '@adminjs/mongoose';
import AdminJSExpress from '@adminjs/express';
import bcrypt from 'bcrypt';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import AdminUser from './src/model/AdminUser.js';
import Product from './src/model/Product.js';
import Order from './src/model/Order.js';
dotenv.config();


// Register the mongoose adapter
AdminJS.registerAdapter({
  Resource: MongooseResource,
  Database: MongooseDatabase,
});

// Admin configuration
const setupAdminJS = async () => {
  const app = express();

  // MongoDB Connection
  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/adminjs-demo';
  
  await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log('✅ Connected to MongoDB');

  // Create default admin user if doesn't exist
  const adminExists = await AdminUser.findOne({ email: 'admin@example.com' });
  if (!adminExists) {
    await AdminUser.create({
      email: 'admin@example.com',
      password: 'admin123', // Will be hashed by pre-save hook
      role: 'admin',
    });
    console.log('✅ Default admin user created: admin@example.com / admin123');
  }

  // AdminJS Configuration
  const adminOptions = {
    resources: [
      {
        resource: Product,
        options: {
          navigation: {
            name: 'Catalog',
            icon: 'ShoppingCart',
          },
          properties: {
            _id: { isVisible: { list: true, show: true, edit: false, filter: true } },
            name: { isRequired: true },
            description: { type: 'textarea' },
            price: { isRequired: true },
            category: { 
              availableValues: [
                { value: 'Electronics', label: 'Electronics' },
                { value: 'Clothing', label: 'Clothing' },
                { value: 'Books', label: 'Books' },
                { value: 'Food', label: 'Food' },
                { value: 'Other', label: 'Other' },
              ]
            },
            inStock: { type: 'boolean' },
            createdAt: { isVisible: { list: true, show: true, edit: false, filter: true } },
          },
          actions: {
            edit: { isAccessible: ({ currentAdmin }) => currentAdmin.role === 'admin' },
            delete: { isAccessible: ({ currentAdmin }) => currentAdmin.role === 'admin' },
            new: { isAccessible: ({ currentAdmin }) => ['admin', 'moderator'].includes(currentAdmin.role) },
          },
        },
      },
      {
        resource: Order,
        options: {
          navigation: {
            name: 'Sales',
            icon: 'Receipt',
          },
          properties: {
            _id: { isVisible: { list: true, show: true, edit: false, filter: true } },
            orderNumber: { isRequired: true },
            customerName: { isRequired: true },
            customerEmail: { isRequired: true },
            products: { 
              type: 'mixed',
              isVisible: { list: false, show: true, edit: true, filter: false }
            },
            totalAmount: { isRequired: true },
            status: {
              availableValues: [
                { value: 'pending', label: 'Pending' },
                { value: 'processing', label: 'Processing' },
                { value: 'shipped', label: 'Shipped' },
                { value: 'delivered', label: 'Delivered' },
                { value: 'cancelled', label: 'Cancelled' },
              ]
            },
            createdAt: { isVisible: { list: true, show: true, edit: false, filter: true } },
          },
          actions: {
            delete: { isAccessible: ({ currentAdmin }) => currentAdmin.role === 'admin' },
          },
        },
      },
      {
        resource: AdminUser,
        options: {
          navigation: {
            name: 'Administration',
            icon: 'User',
          },
          properties: {
            password: { 
              isVisible: { list: false, show: false, edit: true, filter: false },
              type: 'password',
            },
            role: {
              availableValues: [
                { value: 'admin', label: 'Admin' },
                { value: 'moderator', label: 'Moderator' },
                { value: 'viewer', label: 'Viewer' },
              ]
            },
          },
          actions: {
            edit: { isAccessible: ({ currentAdmin }) => currentAdmin.role === 'admin' },
            delete: { isAccessible: ({ currentAdmin }) => currentAdmin.role === 'admin' },
            new: { isAccessible: ({ currentAdmin }) => currentAdmin.role === 'admin' },
          },
        },
      },
    ],
    rootPath: '/admin',
    branding: {
      companyName: 'My Admin Panel',
      logo: false,
      softwareBrothers: false,
    },
    dashboard: {
      component: new ComponentLoader().add('DashboardComponent', './dashboard/dashboard-component.jsx'),
    },
  };

  const admin = new AdminJS(adminOptions);

  // Authentication
  const authenticate = async (email, password) => {
    const user = await AdminUser.findOne({ email });
    if (user) {
      const matched = await bcrypt.compare(password, user.password);
      if (matched) {
        return { email: user.email, role: user.role, id: user._id };
      }
    }
    return null;
  };

  // Session Store
  const sessionStore = MongoStore.create({
    client: mongoose.connection.getClient(),
    collectionName: 'sessions',
  });

  // Admin Router with Authentication
  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate,
      cookieName: 'adminjs',
      cookiePassword: 'sessionsecret', // Change this to a secure random string
    },
    null,
    {
      store: sessionStore,
      resave: false,
      saveUninitialized: false,
      secret: 'sessionsecret', // Change this to a secure random string
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      },
      name: 'adminjs',
    }
  );

  app.use(admin.options.rootPath, adminRouter);

  // Health check endpoint
  app.get('/', (req, res) => {
    res.json({ 
      message: 'Server is running',
      adminPanel: `http://localhost:${PORT}${admin.options.rootPath}`
    });
  });

  const PORT = process.env.PORT || 7000;
  app.listen(PORT, () => {
    console.log(`✅ AdminJS is running on http://localhost:${PORT}${admin.options.rootPath}`);
    console.log(`📧 Login: admin@example.com`);
    console.log(`🔑 Password: admin123`);
  });
};

// ==================== START SERVER ====================

setupAdminJS().catch((error) => {
  console.error('❌ Error starting server:', error);
  process.exit(1);
});