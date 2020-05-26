# backend

### Write endpoints

Add the code necessary to create a Web API and implement the following _endpoints_:

| Method | URL            | documentation (in progress)                                                                                           |
| ------ | -------------- | ------------------------------------------------------------------------------------------------------ |
| POST   | /api/users     | Creates a user using the information sent inside the `request body`.                                   |
| GET    | /api/users     | Returns an array users.                                                                                |
| GET    | /api/users/:id | Returns the user object with the specified `id`.                                                       |
| DELETE | /api/users/:id | Removes the user with the specified `id` and returns the deleted user.                                 |
| PATCH  | /api/users/:id | Updates the user with the specified `id` using data from the `request body`. Returns the modified user |

#### User Schema

Each User _resource_ should conform to the following structure (AKA schema):

```js
{
  id: "a_unique_id", // hint: use the shortid npm package to generate it
  name: "Jane Doe", // String, required
  bio: "Not Tarzan's Wife, another Jane",  // String, required
}
```