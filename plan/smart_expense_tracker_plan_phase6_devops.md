# Phase 6: DevOps & CI/CD

## Goal
Implement a robust DevOps architecture, containerizing the application using Docker and setting up automated CI/CD pipelines via GitHub Actions.

## Scope
1. **Docker Containerization**
   - Create a `Dockerfile` for the Node.js backend API.
   - Create a `Dockerfile` for the Vite React frontend (multi-stage build with Nginx or running via Vite dev/preview server depending on environment).
   - Write a `docker-compose.yml` to orchestrate the backend, frontend, and MySQL database simultaneously.

2. **GitHub Actions Configuration**
   - Create a `.github/workflows/ci.yml` pipeline.
   - Configure the pipeline to run on `push` and `pull_request` to the `main` branch.
   - Implement automated testing steps (e.g., syntax checks, builds) for both the frontend and backend.

## Acceptance Criteria
- [x] Application can be fully spun up using a single `docker compose up -d` command.
- [x] Backend and Frontend communicate successfully within the Docker network.
- [x] GitHub Actions pipeline triggers successfully and passes build steps on code commits.

## Execution Steps
- Draft backend `Dockerfile` targeting Node environments.
- Draft frontend `Dockerfile` targeting Vite build.
- Create `docker-compose.yml` defining `backend`, `frontend`, and `db` services, exposing necessary ports and setting environment variables.
- Write GitHub Actions workflow file.

## Verification
- Run `docker compose up --build` locally and access the app on `http://localhost:5173` (or configured port).
- Monitor GitHub Actions logs to ensure jobs execute without failure.
