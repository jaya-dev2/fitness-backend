# Fitness Backend  

## Overview  
The Fitness Backend provides the following functionalities:  
- **User Authentication**: Uses Firebase for secure authentication.  
- **User Data Management**: Handles inserting and updating user information in MongoDB, including:  
  - Health details  
  - Workout details  
  - Diet details  
  - Firebase notifications  
- **Workout Requests**: Manages workout request responses between coaches and clients.  

## Getting Started  

### Installation  
To set up the backend locally, install the dependencies:  
```sh  
npm install  
```  

### Running the Backend  
Start the backend in development mode:  
```sh  
npm run dev  
```  

### Pre-requisites  
- Install MongoDB locally.  
- Configure the `.env.example` file with the correct values and rename it to `.env`.  