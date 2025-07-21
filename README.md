# NotiFi Backend

This is the backend for the NotiFi event scheduler and reminder application. It provides RESTful APIs for user authentication, event management, email reminders, and weather forecasting.

## Features

- **User Authentication:** Register and login with JWT-based authentication.
- **Event Management:** Create, view, and delete events. Events can be filtered by category, completion status, and search terms.
- **Email Reminders:** Automatic email reminders for upcoming events.
- **Weather Forecast:** Get weather forecasts for event locations and times.
- **Automatic Event Completion:** Past events are automatically marked as completed.

## Folder Structure

- `server.js` - Main Express server entry point.
- `reminderScheduler.js` - Cron job for sending reminders and marking past events as completed.
- `controllers/`
  - `authController.js` - Handles user registration and login.
  - `eventController.js` - Handles event CRUD operations.
- `middleware/`
  - `authMiddleware.js` - JWT authentication middleware.
- `models/`
  - `Event.js` - Mongoose schema for events.
  - `User.js` - Mongoose schema for users.
- `routes/`
  - `authRoutes.js` - Authentication routes.
  - `eventRoutes.js` - Event routes.
  - `testEmail.js` - Route for testing email functionality.
  - `weatherRoute.js` - Weather forecast route.
- `utils/`
  - `emailSender.js` - Utility for sending emails.
  - `smartMatch.js` - Utility for matching weather forecasts to event times.
  - `weatherFetcher.js` - Utility for fetching weather data.

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Configure environment variables:**
   - Create a `.env` file with the following keys:
     ```
     PORT=3000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     EMAIL_USER=your_email_address
     EMAIL_PASS=your_email_password
     WEATHER_API_KEY=your_openweathermap_api_key
     ```

3. **Start the server:**
   ```sh
   npm run dev
   ```

## API Endpoints

- `POST /api/auth/register` - Register a new user.
- `POST /api/auth/login` - Login and receive a JWT token.
- `GET /api/events` - Get events (with filters).
- `POST /api/events` - Create a new event.
- `DELETE /api/events/:id` - Delete an event.
- `GET /api/weather` - Get weather forecast for a city, date, and time.
- `GET /api/test-email/test-email` - Send a test email.
