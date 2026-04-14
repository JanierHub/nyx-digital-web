# Nyx Digital Backend API

Backend API server for Nyx Digital web application built with Express.js and MongoDB.

## Features

- **RESTful API** with proper HTTP methods and status codes
- **Database Integration** with MongoDB using Mongoose
- **Email Service** for contact forms and notifications
- **Authentication** with JWT tokens
- **Input Validation** using express-validator
- **Security** with helmet, CORS, and rate limiting
- **Error Handling** with custom error middleware
- **Logging** with Morgan
- **Environment Configuration** with dotenv

## API Endpoints

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (admin)
- `GET /api/contact/:id` - Get single contact
- `PUT /api/contact/:id` - Update contact
- `POST /api/contact/:id/notes` - Add note to contact

### Services
- `GET /api/services` - Get all services with filtering
- `GET /api/services/popular` - Get popular services
- `GET /api/services/:slug` - Get single service
- `POST /api/services` - Create service (admin)
- `PUT /api/services/:id` - Update service (admin)
- `DELETE /api/services/:id` - Delete service (admin)
- `GET /api/services/meta/categories` - Get service categories

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/featured` - Get featured projects
- `GET /api/projects/:slug` - Get single project

### Users
- `POST /api/users/register` - Register user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/logout` - Logout user

### Health Check
- `GET /api/health` - API health status

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env` file

5. Start MongoDB server

6. Start the application:
```bash
# Development
npm run dev

# Production
npm start
```

## Environment Variables

```env
# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/nyx-digital

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=Nyx Digital <noreply@nyxdigital.com>

# Security
BCRYPT_ROUNDS=12
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## Database Models

### Contact
- Name, email, phone, company
- Service type, message, budget, timeline
- Status, priority, source
- Notes and assignment tracking

### Service
- Title, description, long description
- Category, pricing, timeline
- Features, technologies, deliverables
- Images, tags, FAQs

### Project
- Title, description, category
- Technologies, images
- Featured flag, client URL
- Case study and results

### User
- Name, email, password
- Role (admin/user)
- Profile management

## Security Features

- Helmet.js for security headers
- CORS configuration
- Rate limiting
- Input validation and sanitization
- Password hashing with bcrypt
- JWT authentication
- SQL injection prevention (NoSQL)

## Error Handling

- Global error handler middleware
- Custom error responses
- Detailed error logging
- Graceful error responses

## Email Service

- Contact form notifications
- Auto-responders to clients
- HTML email templates
- SMTP configuration

## Development

### Running Tests
```bash
npm test
```

### Code Style
- ESLint configuration
- Prettier formatting
- Consistent naming conventions

### Git Hooks
- Pre-commit hooks for linting
- Pre-push hooks for testing

## Deployment

### Production Setup
1. Set `NODE_ENV=production`
2. Configure production database
3. Set up SSL certificates
4. Configure reverse proxy (nginx)
5. Set up process manager (PM2)

### Docker
```bash
# Build image
docker build -t nyx-digital-backend .

# Run container
docker run -p 5000:5000 nyx-digital-backend
```

## API Documentation

### Response Format

Success responses:
```json
{
  "status": "success",
  "message": "Operation completed successfully",
  "data": { ... }
}
```

Error responses:
```json
{
  "status": "error",
  "message": "Error description",
  "errors": [ ... ]
}
```

### Pagination
```json
{
  "status": "success",
  "data": { ... },
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

## Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Add tests
5. Submit pull request

## License

MIT License
