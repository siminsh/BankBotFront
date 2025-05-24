# BankBot Frontend

An Angular-based frontend application for an AI-powered banking chatbot that provides intelligent financial assistance and user management capabilities.

## Overview

BankBot is a modern web application built with Angular 16 that serves as the user interface for an intelligent banking assistant. The application features a chat interface where users can interact with an AI-powered bot to get help with banking and financial queries, along with user registration and management functionality.

## Features

- **AI Chat Interface**: Interactive chatbot for banking and financial assistance
- **User Registration**: Complete user registration system
- **Responsive Design**: Mobile-friendly interface using Bootstrap icons
- **Real-time Chat**: Dynamic chat interface with message history
- **Navigation**: Clean navigation between different sections of the app
- **Modern UI**: Contemporary design with smooth transitions and animations

## Technology Stack

- **Frontend Framework**: Angular 16.1.0
- **Language**: TypeScript 5.1.3
- **Styling**: SCSS with Bootstrap Icons
- **HTTP Client**: Angular HTTP Client (RxJS 7.8.0)
- **Testing**: Jasmine & Karma for unit testing
- **E2E Testing**: Selenium WebDriver with custom test suites

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── chat-box/           # Main chat interface component
│   │   ├── chat-history/       # Chat message history display
│   │   ├── message-input/      # User message input component
│   │   ├── navigation/         # App navigation component
│   │   └── user-registration/  # User registration form
│   ├── models/                 # TypeScript interfaces and models
│   ├── services/              # Angular services for API communication
│   ├── app-routing.module.ts  # Application routing configuration
│   ├── app.component.ts       # Root application component
│   └── app.module.ts          # Main application module
├── environments/              # Environment configuration files
└── tests/                    # E2E test suites
```

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager
- Angular CLI (optional but recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/siminsh/BankBotFront.git
   cd BankBotFront
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   ng serve
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200` to view the application.

## Available Scripts

- `npm start` - Start the development server
- `npm run build` - Build the project for production
- `npm run watch` - Build in watch mode for development
- `npm test` - Run unit tests with Karma
- `npm run test:e2e` - Run end-to-end tests
- `npm run selenium` - Run Selenium tests
- `npm run selenium:e2e` - Run comprehensive E2E Selenium tests

## Development

### Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Running Tests

**Unit Tests**
```bash
npm test
```

**End-to-End Tests**
```bash
npm run test:e2e
```

**Selenium Tests**
```bash
npm run selenium
```

## Components Overview

### Chat Components
- **ChatBoxComponent**: Main container for the chat interface
- **ChatHistoryComponent**: Displays conversation history
- **MessageInputComponent**: Handles user input and message sending

### User Management
- **UserRegistrationComponent**: Complete registration form with validation
- **NavigationComponent**: App-wide navigation with route-aware styling

## Configuration

The application uses environment-specific configuration files located in `src/environments/`:
- `environment.ts` - Development configuration
- `environment.prod.ts` - Production configuration

## API Integration

The application is designed to work with a backend API for:
- Chat message processing
- User registration and authentication
- Chat history persistence

Services in the `src/app/services/` directory handle all API communications.

## Browser Support

This application supports all modern browsers including:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Testing Strategy

The project includes comprehensive testing:
- **Unit Tests**: Component and service testing with Jasmine/Karma
- **E2E Tests**: Full application workflow testing with Selenium
- **Custom Test Suites**: Specialized banking chatbot interaction tests

## License

This project is private and proprietary. All rights reserved.

## Contact

For questions or support, please contact the development team or create an issue in the repository.

---

**Note**: This frontend application requires a corresponding backend API to be fully functional. Ensure the backend services are running and properly configured before using the application in a production environment.
