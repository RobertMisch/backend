# backend

### Current endpoints 

currently working endpoints:

| Method | URL            | description                                                                                          |
| ------ | -------------- | ------------------------------------------------------------------------------------------------------ |
| GET    | /     | Returns an object to see if the api is up and running                                                                                |
| POST   | /api/users     | Creates a user using the information sent inside the `request body`.                                   |
| GET    | /api/users     | Returns an array users.                                                                                |
| GET    | /api/users/:id | Returns the user object with the specified `id`.                                                       |
| DELETE | /api/users/:id | Removes the user with the specified `id` and returns the deleted user.                                 |
| PATCH  | /api/users/:id | Updates the user with the specified `id` using data from the `request body`. Returns the modified user |

#### Authentication Schema
To get a token back or to make a new user you use these endpoints

| Method | URL            | description                                                                                          |
| ------ | -------------- | ------------------------------------------------------------------------------------------------------ |
| POST   | /api/accounts/register     | Creates a user using the information sent inside the `request body`.                                   |
| POST   | /api/accounts/login    | Creates a token when given authentication info in request body                                   |

both register and login should be in this format:

```js
{
  username: "Jane Doe", // String, required
  password: "password"// String, required
}
```


#### User Schema

Each User has the following structure

```js
{
  id: unique #, //
  username: "Jane Doe", // String, required
  password: "hased password"// String, required
}
```

When you make a post request to