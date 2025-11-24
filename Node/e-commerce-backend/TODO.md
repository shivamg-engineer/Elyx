# TODO: Fix Malformed Error and Logging Issues

## Tasks
- [ ] Fix logger usage in `src/auth/controllers/vendor-auth.controller.ts`: Replace `logger.log` with `logger.info`
- [ ] Standardize logger imports across files: Change all imports to use `.js` extension for ESM consistency
- [ ] Add error logging in catch blocks in auth controllers and middleware
- [ ] Add a test log in `src/server.ts` on server startup to verify console output
- [ ] Review and enhance `src/middleware/validate.middleware.ts` to log malformed request errors
