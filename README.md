# CRUD API

## Description

This project is a CRUD API that using in-memory database underneath. The API allows you to perform operations to create, read, update, and delete users.

## Installation and run

1. **Clone the repo**:

   ```bash
    git clone https://github.com/kostik-omsk/crud-api.git
   ```

2. **Go to the repo folder**:

   ```bash
     cd crud-api
   ```

3. **Install npm dependencies**:

   ```bash
     npm install
   ```

4. **Run application using one of the following scripts**:
   ```bash
    npm run start:prod
   ```
   or
   ```bash
     npm run start:multi
   ```

## Port

The default port is 4000

If you want to change the port, you can change the file.env at the root of the project

```
# .env file
PORT=4000
```

## API endpoints

User:

```ts
  {
      id: string, // uuidv4() format: "fa6cb361-3d70-4c43-88a1-3ca1423f590e"
      username: string,
      age: number,
      hobbies: string[ ],
  }
```

- `GET /api/users` - Return array of all users

- `GET /api/users/{userId}` - Return specific user by {userId}

- `POST /api/users` - Create new user with randomly specified {userId}

  Accepts a body of the following type:

  ```ts
  {
    username: string,
    age: number,
    hobbies: string[ ]
  }
  ```

- `PUT /api/users/{userId}` - Update specific user

  Accepts a body of the following type:

  ```ts
  {
    username: string,
    age: number,
    hobbies: string[ ]
  }
  ```

- `DELETE /api/users/{userId}` - Delete specific user by {userId}

## Tests

1. An empty array is expected

```bash
npm run test1:getUsers
```

2. A response containing newly created record is expected

```bash
npm run test2:postUser
```

3. Delete a user

```bash
npm run test3:deleteUser
```

4. Verify deleted user:

```bash
npm run test4:getDeletUser
```
