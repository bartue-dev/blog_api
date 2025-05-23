<!-- PROJECT LOGO -->

<a id="readme-top"></a>
<br />

<div align="center">
  <image src="https://github.com/user-attachments/assets/b3dc80ba-8804-4cbd-bc6b-dd31fbb679ba" width="100px"/>
  <h2 align="center">Blog_api</h2>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="https://github.com/bartue-dev/blog_api/blob/main/api-documentation.md">API Documentation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

Blog_api is a personal project. It is a common blog api. It can create post, comment and like post of others.

![blog_API_db_diagram](/public/blog_api_db.png)

Key features:

-   Register - client side register an account.
-   Log-in - client side log-in the registered account. Then the api return an accesstoken as json response and refresh token save in cookies and database.
-   Create:
    -   client side can create a post with title and content field.
    -   client side can create a comment to a post and child comment to a parent comment.
    -   client side can like a post of others
-   Read
    -   client side can get all post, get specific post and get post with pagination
    -   client side can get all comments, get specific child comment that is associated with parent comment and get comment/child comment with pagination
-   Update
    -   client side can update specific post and comment
-   Delete
    -   client side can delete specific post and comment
    -   note: if post is delete all the comment and child comment associated with it will be deleted.
    -   note: if comment is delete all child comment will also be deleted.

Others:

-   Authentication - Uses a **jsonwebtoken**(jwt) for authentication/authorization.
-   Validation - Uses a express-validator to return a validation errors if client input a invalid api request
-   Error response - Created a custom error that handles the error response to every api request
-   Prisma error response - Uses the prisma error handling. Handles errors of queries.
-   Pagination - Control the data that will be return in response. Uses the offset pagination in prisma queries.

see the <a href="https://github.com/bartue-dev/blog_api/blob/main/api-documentation.md" target="_blank"> api documentation</a> for more details of the usage of the api

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

<!-- BADGES -->

-   [![Express.js][Express.js-badge]][Express.js-url]
-   [![Prisma][Prisma-badge]][Prisma-url]
-   [![PostgreSQL][PostgreSQL-badge]][PostgreSQL-url]
-   [![JWT][JWT-badge]][JWT-url]
-   [![express-validator][express-validator-badge]][express-validator-url]

<!-- BADGES -->

[Express.js-badge]: https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white
[Express.js-url]: https://expressjs.com/
[Prisma-badge]: https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white
[Prisma-url]: https://www.prisma.io/
[PostgreSQL-badge]: https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white
[PostgreSQL-url]: https://www.postgresql.org/
[JWT-badge]: https://img.shields.io/badge/JWT-FFB600?style=for-the-badge&logo=jsonwebtokens&logoColor=black
[JWT-url]: https://jwt.io/
[express-validator-badge]: https://img.shields.io/badge/express--validator-6A1B9A?style=for-the-badge
[express-validator-url]: https://express-validator.github.io/docs/

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

-   [x] register
-   [x] sign-in
    -   [x] access token in reponse
    -   [x] refresh token save in cookies and database
-   [x] createPost
-   [x] getAllPost
    -   [x] with offset pagination
-   [x] getPost route
-   [x] updatePost
-   [x] deletePost
    -   [x] delete all comments that is associated with the post
    -   [x] delete the post in likedPost database
-   [x] createComment
-   [x] createChildComment
-   [x] getAllComment
    -   [x] with offset pagination
-   [x] getChildComment
-   [x] updateComment
-   [x] deleteComment
    -   [x] delete all chid comments that is associated with the comment
-   [x] saveLikedPost
-   [x] getAllLikedPost
-   [x] undoLikedPost

<p align="right">(<a href="#readme-top">back to top</a>)</p>
