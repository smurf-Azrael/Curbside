# Curbside - the secondhand market place that's actually pleasant to use
Post items for sale, interact with sellers, save items you are interested in. All Curbside market profits get directed towards green initiatives.

## Built With

### Frontend
* 🏗 React + Typescript
* 🗺 Leaflet.js
* 💄 SCSS and Bootstrap
* 🧪 Jest, Cypress and Testing Library

### Backend
* 🏗 Node.js + Express
* 📦 PostgreSQL + Prisma
* 📍 PostGIS for geo queries
* 🔌 Socket.io
* 🔐 Firebase Authentication
* 📔 Firebase image storage


## Run it on your machine

### Set up
1. Create a Firebase app for [authentication](www.relevantlinkhere.com) and [image storage](www.relevantlinkhere.com)
2. Create an empty PostgreSQL database as well as an empty test database (e.g. Curbside and Curbside_TEST)


### Installation
1. Fork and clone the repo
2. Add the four `.env` files in `client/` and `server/` folders (see examples below)
3. Install requirements with `npm install` from project root folder, /server and /client folders
4. Generate Prisma artifacts and sync database schema with prisma client with `npx prisma generate` and `npx prisma db push` from `/server` folder.

### Run
1. Start the sever with `npm start:server` from project root folder;
2. Start the app in the browser with `npm start:client` from project root folder;


### Environmental Variables
1. Create .env file in client/src folder:
```
# Firebase keys
REACT_APP_FIREBASE_API_KEY = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
REACT_APP_FIREBASE_AUTH_DOMAIN = "appname-identifier.firebaseapp.com"
REACT_APP_FIREBASE_DATABASE_URL
REACT_APP_FIREBASE_PROJECT_ID = "appname-identifier"
REACT_APP_FIREBASE_STORAGE_BUCKET = "appname-identifier.appspot.com"
REACT_APP_FIREBASE_MESSAGING_SENDER_ID = "XXXXXXXXX"
REACT_APP_FIREBASE_APP_ID = "X:XXXXXXXXXXX:web:XXXXXXXXXXXXXXX"
REACT_APP_FIREBASE_MEASUREMENT_ID = "X-XXXXXXXXX"

# Server URL
REACT_APP_BASE_API_URL = "http://localhost:XXXX"
```

2. Create a /config folder in /server folder
3. Create dev.env file in server/config folder:
```
# Server port
PORT=3333

# Local DB
DATABASE_URL="postgresql://username:password@localhost:5432/dbname?schema=public"

# Firebase storage
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----xxxxxxxxxxxx-----END PRIVATE KEY-----\n"
FIREBASE_ADMIN_CLIENT_EMAIL="emailname@app.iam.gserviceaccount.com"
FIREBASE_ADMIN_PROJECT_ID="appname-identifier"
```

4. Create test.env file  in server/config folder:
```
# Server port (note, should be other than for dev server)
PORT=4444

# Local test DB
DATABASE_URL="postgresql://username:password@localhost:5432/dbname_TEST?schema=public"

# What is this for?
SECRET_UID=g5sxxt8R4NQ8CqirnHtWT9HW2Wd2
FIREBASE_API_KEY=AIzaSyCWeduZHEcYelq57KQuBGntLS25kNdFIcc

# Firebase storage (same as dev)
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----xxxxxxxxxxxx-----END PRIVATE KEY-----\n"
FIREBASE_ADMIN_CLIENT_EMAIL="emailname@app.iam.gserviceaccount.com"
FIREBASE_ADMIN_PROJECT_ID="appname-identifier"

# What is this for?
SECRET_UID2=KccjVCQbrlSNxT0tK7Bxej45DKh2
```

5. Create service-account.json in server/config folder:
```
# What is this for?
{
  "type": "service_account",
  "project_id": "appname-identifier",
  "private_key_id": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "private_key": "-----BEGIN PRIVATE KEY-----\xxx\n-----END PRIVATE KEY-----\n",
  "client_email": "emailname@app.iam.gserviceaccount.com",
  "client_id": "XXXXXXXXXXXXXXXXXXXX",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xbmcw%40curbside-303d0.iam.gserviceaccount.com"
}
```

### Committing rules
Commit rules were setup using the [@commitlint/config-conventional/](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional) template.

## Contributing