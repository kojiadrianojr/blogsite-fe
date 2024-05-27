
## Blogsite Application
Blogsite FE is a simple web application application for a blogging platform. Designed to provide an exceptional user experience, Blogsite FE allows users to read, write, and interact with blog posts seamlessly.

## Technologies Used
- NextJS 14.2.13
- React18
- Node 20.12.2
- Material Ui 5.15.18

## Backend
Created a backend using Python and Django. The backend api is deployed on https://www.pythonanywhere.com/ and can be checked using this link: [api url](https://kojiadrianojr.pythonanywhere.com/)
- [Backend Repository](https://github.com/kojiadrianojr/backend)

## Design Decisions
I opted to develop a simple design to reduces complexity, making the codebase easier to understand, maintain, and extend. 
This also allows me to accelerates the development process, as I would spend less time dealing with unnecessary complexity.
And also as a user, simple designs focus on clarity and ease of use, reducing cognitive load and making it easier for users to navigate and interact with the application.

I also separated the BE and FE in order to create a clear separation of concerns, allowing each part to be developed, maintained, and scaled independently.

## Setup
> [!important]
> Prepare the backend first, you need to setup the backend to run the application locally.
You can follow the steps here: [readMe](https://github.com/kojiadrianojr/backend/blob/main/README.md)

#### Getting started:
1. Close this repository
```
git clone https://github.com/kojiadrianojr/blogsite-fe.git
```
2. Navigate to project directory
```
cd blogsite-fe
```
3. Install the dependencies
```
npm install
```
4. Run the application
```
npm run start
```
5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
6. Done

## Features
* Accessible homepage displaying posts.
* Login and Register user account
* Manage posts
  * Add new posts
  * Delete posts
  * Edit existing posts
* Dedicated post detail page
  
## Deploy on Vercel
The application is deployed on vercel and can be accessed using this link: [blogsite-fe](https://blogsite-fe.vercel.app/)
