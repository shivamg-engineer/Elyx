🔁 RESTART / REBUILD REQUIRED

After adding the field:
rm -rf dist
npm run build
npm run start:dev

///------------------.env 
# I18N_FALLBACK_LANG=en
# I18N_PRELOAD_LANGS=en,hi,es
# LOG_LEVEL=debug|info|error

PORT=3000
NODE_ENV=development
# JWT_SECRET=your_jwt_secret
ACCESS_SECRET=yourSuperSecretKeyForAccessToken
REFRESH_SECRET=yourSuperSecretKeyForRefreshToken
JWT_EXPIRY=7d
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=ecommerce_dev
LOG_LEVEL=info
I18N_PRELOAD_LANGS=en,hi,es
I18N_FALLBACK_LANG=en