## Instructions on how to run the application locally 📝

- 1️⃣ Clone the repository to your machine if you have the access. Use this link to do it.
  ↦ https://github.com/Porgramming-Hero-web-course/l2b2-full-stack-a5-server-side-gsjoy24
- 2️⃣ Open the project in vs code and create a file named .env in the root of the folder.
- 3️⃣ Add the code bellow in the .env file

```

NODE_ENV=development
PORT=3000
DATABASE_URL=mongodb+srv://admin-gsj:2O0rnkiIrIGr2L7Q@cluster0.nbdk5o7.mongodb.net/gadget-management?retryWrites=true&w=majority
BCRYPT_SALT_ROUND=12
JWT_ACCESS_TOKEN=4e503701998d6df51775c23276da1fd772a382cdabb7ee1db436b32b94a31924
JWT_ACCESS_EXPIRES_IN=7d

```

- 4️⃣ Open the command prompt on the project path or terminal on the vs code by pressing Ctrl + `
- 5️⃣ Run the command 'npm i' or 'npm install' to install all the necessary dependencies.
- 6️⃣ To run the server on http://localhost:3000, run the command 'npm run start:dev'. if the server is running, you will see the code bellow on your machine.

```

// on terminal
the server is running on port 3000

// on http://localhost:3000/
  {
    success: true,
    message: 'Server is running!',
  }

```

- 7️⃣ To run the production version, run the command 'npm run build' to build the the project. After complete the build process, run 'npm run start:prod' to run the build or production version on the localhost.

#### This server is deployed on vercel,

- live link ↦ https://dream-gadgets-server.vercel.app/
- client side link ↦ https://dream-gadget.web.app/
