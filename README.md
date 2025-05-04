<!-- PROJECT LOGO -->
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
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

Blog_api is a personal project. It is a common blog api. It can create post, comment and like post of others.

Key features:
* Register - client side register an account.
* Log-in - client side log-in the registered account. Then the api return an accesstoken as json response.
* Create:
  - client side can create a post with title and content field.
  - client side can create a comment to a post and child comment to a parent comment.
  - client side can like a post of others
* Read
  - client side can get all post, get specific post and get post with pagination 
  - client side can get all comments, get specific child comment that is associated with parent comment and get comment/child comment with pagination
* Update
  - client side can update specific post and comment
* Delete
  - client side can delete specific post and comment

Others:
* Authentication - Uses a **jsonwebtoken**(jwt) for authentication/authorization.
* Validation - Uses a express-validator to return a validation errors if client input a invalid api request
* Error response - Created a custom error that handles the error response to every api request
* Prisma error response - Uses the prisma error handling. Handles errors of queries.
* Pagination - Control the data that will be return in response. Uses the offset pagination in prisma queries.

see the [api](https://docs.google.com/document/d/1EVqc4WGtDFdJLphWsGHcV_4ZYO8gyRR61GWRmNNHdeE/edit?tab=t.0) documentation for more details of the usage of the api


<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.
<!-- BADGES -->
* [![Express.js][Express.js-badge]][Express.js-url]
* [![JWT][JWT-badge]][JWT-url]
* [![bcryptjs][bcryptjs-badge]][bcryptjs-url]
* [![Prisma][Prisma-badge]][Prisma-url]
* [![express-validator][express-validator-badge]][express-validator-url]
* [![PostgreSQL][PostgreSQL-badge]][PostgreSQL-url]

<!-- BADGES -->
[Express.js-badge]: https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white
[Express.js-url]: https://expressjs.com/

[JWT-badge]: https://img.shields.io/badge/JWT-FFB600?style=for-the-badge&logo=jsonwebtokens&logoColor=black
[JWT-url]: https://jwt.io/

[bcryptjs-badge]: https://img.shields.io/badge/bcryptjs-003A70?style=for-the-badge
[bcryptjs-url]: https://www.npmjs.com/package/bcryptjs

[Prisma-badge]: https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white
[Prisma-url]: https://www.prisma.io/

[express-validator-badge]: https://img.shields.io/badge/express--validator-6A1B9A?style=for-the-badge
[express-validator-url]: https://express-validator.github.io/docs/

[PostgreSQL-badge]: https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white
[PostgreSQL-url]: https://www.postgresql.org/

<p align="right">(<a href="#readme-top">back to top</a>)</p>

