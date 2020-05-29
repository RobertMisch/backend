# backend

### Current endpoints 

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


#### User Schema/Endpoints

Each User has the following structure

```js
{
  id: unique #, //int given by the server
  username: "Jane Doe", // String, required
  password: "hased password"// String, required
}
```
Each Attendee has the following structure

```js
{
  id: unique #, //int given by the server
  potluck_id:  #, // the id of potluck attending
  bringing_item_id:  #// the id of the item that they are bringing
}
```

| Method | URL            | description                                                                                          |
| ------ | -------------- | ------------------------------------------------------------------------------------------------------ |

| POST   | /api/users     | Creates a user using the information sent inside the `request body`.                                   |
| GET    | /api/users     | Returns an array users.                                                                                |
| GET    | /api/users/:id | Returns the user object with the specified `id`.                                                       |
| DELETE | /api/users/:id | Removes the user with the specified `id` and returns the deleted user.                                 |
| PATCH  | /api/users/:id | Updates the user with the specified `id` using data from the `request body`. Returns the modified user |
| GET    | /api/users/attendees/:id     | takes a user id as a param and returns an array                                                                                 |
| POST    | /api/users/attendees/:id     | takes a user id as the param and a JSON object with a potluck_id and a bringing_item_id                                                                                 |
| DELETE    | /api/users/attendees/:id     | takes a attendee id as the param to delete a spefic instance of attending a potluck                                                                                |

### Potluck Schema/Endpoints

Each Potluck has the following structure

```js
{
    id: unique #,//provided by server for each potluck
    owner_id: #,
    name: "string", // String, required
    where: "string", // String, required
    date: "string", // String, required
    category: "string" // String, required
}
```
Each Potluck Item has the following structure

```js
{
    id: unique #, //provided for each item being brought for all potlucks
    potluck_id: #, //potluck that the item is being assigned to
    item_id:#,//item that is being assigned to a potluck
    being_brought_by:"string"//a string that has who is going to bring the item
}
```

| Method | URL            | description                                                                                          |
| ------ | -------------- | ------------------------------------------------------------------------------------------------------ |
| POST   | /api/potlucks     | Creates a potluck using the information sent inside the `request body`.                                   |
| GET    | /api/potlucks     | Returns an array of all potlucks.                                                                                |
| GET    | /api/potlucks/:id | Returns the potluck object with the specified `id`.                                                       |
| DELETE | /api/potlucks/:id | Removes the potluck with the specified `id` and returns the deleted potluck.                                 |
| PATCH  | /api/potlucks/:id | Updates the potluck with the specified `id` using data from the `request body`. Returns the modified potluck |
| GET   | /api/potlucks/items/:id | gets all the items that a potluck would have                                  |
| POST   | /api/potlucks/items/:id |   adds an item to a potluck with the id in the param,    requires an item id and a 'being_brought_by'                              |
| DELETE   | /api/potlucks/items/:id     | deletes an item from a potluck using a specifc id that all added items have                                   |

### Items Schema/Endpoints

Each Potluck has the following structure

```js
{
    name:"string"
}
```


| Method | URL            | description                                                                                          |
| ------ | -------------- | ------------------------------------------------------------------------------------------------------ |
| POST   | /api/items     | Creates a potluck using the information sent inside the `request body`.                                   |
| GET    | /api/items     | Returns an array of all items.                                                                                |
| GET    | /api/items/:id | Returns the item object with the specified `id`.                                                       |
| DELETE | /api/items/:id | Removes the item with the specified `id` and returns the deleted item.                                 |
| PATCH  | /api/items/:id | Updates the item with the specified `id` using data from the `request body`. Returns the modified item |