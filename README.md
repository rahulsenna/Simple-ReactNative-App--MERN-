# Simple ReactNative App (MERN)

This is a simple React Native CRUD application that allows users to register, log in, and update their name and age using MongoDB as the backend.

## Features

- User registration with user ID and password
- User login
- Update user details (name and age)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (version 12 or later)
- npm or yarn
- React Native CLI
- Android Studio or Xcode for iOS development
- MongoDB server

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/rahulsenna/Simple-ReactNative-App--MERN-.git
cd Simple-ReactNative-App--MERN
```
### Backend Setup

#### 1. Navigate to the backend directory:

```
cd backend
```
#### 2. Install the dependencies:

```
npm install
```

#### 3. Create a .env file in the backend directory with the following content (adjust as necessary for your MongoDB setup)
```
MONGODB_URI=mongodb://localhost:27017/userdb
JWT_SECRET=your_jwt_secret
```
#### 4. Start the backend server:
```
node server.js
```

### Frontend Setup

#### 1. Navigate to the frontend directory:

```
cd ../frontend
```
#### 2. Install the dependencies:

```
npm install
```
#### 3. Generate `android` and `ios` directories:
```
npm i react-native-eject
npx react-native eject
```
#### 4. Install the necessary pods for iOS:
```
npx pod-install ios
```

## Running the App

### Android
1. Start the Android emulator or connect an Android device.

2. Run the following command:
    ```
    npx react-native run-android
    ```


### iOS
1. Start the iOS simulator or connect an iOS device.

2. Run the following command:
    ```
    npx react-native run-ios
    ```
