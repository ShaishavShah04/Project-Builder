# <b>Project Builder </b>

Note: So far, I have only created the backend of this platform. No front-end has been created yet as I'm currently learning the tool Figma.

## <b> What is this ? </b>

This was an idea of a platform where people can see potential project ideas submitted by others. It will allow authenticated users to create, view, interact and delete (their own) project ideas. Moreover, each project will also have its own comments section in which other users can choose to respond to the idea, or express interest in working togather. 

## <b> Motivation behind this ? </b>

I was just wanting to make myself a project tracker; a place where I could see all my upcoming project ideas. Later on, a couple of my friends asked whether they could make this 'project tracker' with me. 

This sparked the idea of making this platform.

## <b> API Endpoints </b>:

### <u> Auth Routes ( with persistent sessions :sunglasses: ) </u>

Implemented using JWT: an authentication mechanism that does not require a database to store session info.
    
Stored on a httpOnly cookie to prevent XSS attacks.

<ul>
    <li> Sign up
    <li> Login
    <li> Check login
    <li> Logout
</ul>

```
POST http://[api-domain]/api/auth/signup
POST http://[api-domain]/api/auth/login
GET  http://[api-domain]/api/auth/isAuth
POST http://[api-domain]/api/auth/logout
```

### <u> Project Routes </u>
  

<ul>
    <li> View all projects
    <li> Open a certain project page
    <li> Comment on a certain project (AUTH)
    <li> Create a new project (AUTH)
    <li> Like a certain project (AUTH)
    <li> Delete your own project post (AUTH)
</ul>

## All of these routes have been tested using Jest and Supertest!

These tests can be found under the ```__tests__``` folder.