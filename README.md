# Full-Stack Expo + Backend (Dockerized) AKU Prototype

This repo contains:
- **Frontend**: React Native (Expo)
- **Data**: CSV for backend
- **Backend**: Python

Managed with **Docker Compose**

## Requirements
- [Docker Desktop](https://www.docker.com/get-started) (includes Docker Compose)
- Expo Go mobile app with an account

## Preliminary
1. Get IPV4 from: 
   ```
   ipconfig
   ```
2. Update IP in files:
   ```
   aku_proto/frontend/app/components/nextButton.
   aku_proto/frontend/app/tests/buttons.test.tsx
   ``` 
## Quick Start
1. Clone the repo or download as ZIP:
   ```
   git clone <your-repo-url>
   cd <your-repo-name>
   ```
2. Boot up app
   Ensure you are in the root directory: cd/path/to/project
    ```
   docker-compose up --build
   ```
3. Scan the QR Code
