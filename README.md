# Favorites-Manager

## About the project
This project manages favorite teacher-student relationships.
* Users can **register** themselves and then **login** upon which they'll recieve a **JWT token** which they can include in the headers of the rest of the API calls, key as "auth-token" and value as the token acquired
* Users can perform all the **CRUD** operations on teacher model
* Users can send a request to **add** a particular teacher to their **favorite list** and can **remove** it as well
* Users can also see the **most favorite teacher** and the **count** of users who added him/her to their favorite list

This project includes validation to validate credentials also performs checks to prevent accepting duplicate data

## Built with
This project uses the following frameworks and languages
* NodeJs
* ExpressJs
* MongoDB
* Mongoose

## Edit the .env file
Edit the dotenv file in the main repository to connect to the database on cloud.mongodb.com and update secret key token for JWT authorization

## Database Information
This project includes three collections in the database and they are as follows-
* Users
![image](https://user-images.githubusercontent.com/61968230/198859402-4e7dd3a3-9438-48f5-8b88-4a67db464ac4.png)


* Teachers
![image](https://user-images.githubusercontent.com/61968230/198859430-85fa8ac8-0341-4b8e-aece-49b5b1d978dd.png)


* Favorite Teachers
![image](https://user-images.githubusercontent.com/61968230/198859608-4dff9453-1591-470b-9821-d2f8cd999475.png)


## API Specifications
* Protocol: `http`
* Port: `3000`
* Base URL: `http://localhost:3000/`

### 1) ***POST*** Register New User
  ```http://localhost:3000/api/user/register```
  
  This API can be used to add new student
  
  **Body**
  ```
  {
    "name": "John Doe",
    "email": "johndoe@gmail.com",
    "password": "test123"
  }
  ```

### 2) ***POST*** Login User
```http://localhost:3000/api/user/register```

This API can be used to login and returns JWT Token which can be used as Bearer Token for rest of the APIs.

**Body**
```
  {
    "email": "johndoe@gmail.com",
    "password": "test123"
  }
```

### 3) ***GET*** Teachers
```http://localhost:3000/api/teachers/```

This API is used to get list of all the teachers


### 4) ***POST*** Add New Teacher
```http://localhost:3000/api/teachers/```

This API adds new teacher by adding JWT token in the header from successfully logging in as a user/student

**Body**
```
  {
    "name": "William Zane",
    "email": "williamzane@gmail.com"
  }
```

### 5) ***GET*** Teacher By Id
```http://localhost:3000/api/teachers/635d2ed210d83ec27359cf42```

This API can be used to get teacher info by passing it's id

### 6) ***DELETE*** Teacher By Id
```http://localhost:3000/api/teachers/635d2ed210d83ec27359cf42```

This API can be used to delete teacher info by passing it's id


### 7) ***PATCH*** Teacher By Id
```http://localhost:3000/api/teachers/635d2ed210d83ec27359cf42```

This API can be used to update teacher info by passing it's id

**Body**
```
  {
      "name": "William Zane",
      "email": "williamzane36@gmail.com"
  }
 ```

### 8) ***GET*** Favorite Teacher
```http://localhost:3000/api/teachers/favorite```

This API is used to get the list of all the favorite teachers marked by the user/student


### 9) ***POST*** Favorite Teacher
```http://localhost:3000/api/teachers/favorite/635be09be3e6d5cffe0ae8fd```

This API is used to add a teacher to favorite list by the user/student

### 8) ***GET*** Most Favorite
```http://localhost:3000/api/teachers/mostFavorite```

This API is used to get the most favorite teacher among all the students/user and it also returns the count of students who marked them their favorite

