## License
This repository is provided for educational and personal reference only.  
You are free to view and run the code, but you may NOT copy, modify, or redistribute it without prior written permission from the author.  
For any exceptions or permissions, please contact Marcel Venturotti.

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
2. Update IP in files where contact with the backend is set up:
   ```
   aku_proto/frontend/app/components/nextButton.
   aku_proto/frontend/app/tests/buttons.test.tsx
   aku_proto/frontend/app/screens/OutcomeScreen.tsx
   aku_proto/docker-compose.yml
   ``` 
## Quick Start
1. Clone the repo or download as ZIP and extract:
   ```
   git clone <your-repo-url>
   ```
2. Ensure you are in the root directory where "aku_proto" is:
    ```
   cd/path/to/project/aku_proto
   ```
3. Create your docker image and container:
   ```
   docker-compose up --build
   ```
4. Scan the QR code with your phone
