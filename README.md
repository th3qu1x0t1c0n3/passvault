# PassVault

# TODO
- Create chrome extension

## Deployment
1. Change spring properties 
2. Check if CMD is working
3. Change React URL 

## Overview
PassVault is a secure and efficient password manager built using Java and Spring Boot. It allows users to store, manage, and retrieve their passwords securely.

## Features
- User authentication and authorization
- Password encryption
- JWT token-based authentication
- Role-based access control (Admin and User)
- CRUD operations for applications and passwords
- [Palet used here](https://coolors.co/palette/0a1128-001f54-034078-1282a2-fefcfb)

## Technologies Used
- Java
- Spring Boot
- Spring Security
- JWT
- Maven

## Getting Started

### Prerequisites
- Java 11 or higher
- Maven 3.6.0 or higher
- A database (e.g., MySQL, PostgreSQL)

### Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/passvault.git
    cd passvault
    ```

2. Configure the database in `src/main/resources/application.properties`:
    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/passvault
    spring.datasource.username=root
    spring.datasource.password=yourpassword
    spring.jpa.hibernate.ddl-auto=update
    ```

3. Build the project:
    ```sh
    mvn clean install
    ```

4. Run the application:
    ```sh
    mvn spring-boot:run
    ```

## API Endpoints
[You can find the swagger documentation here](http://localhost:8081/swagger-ui/index.html#/)
### User Endpoints
- **POST /api/v1/users/signin**: Authenticate a user
- **POST /api/v1/users/signup**: Register a new user
- **GET /api/v1/users/me**: Get current user details

### Application Endpoints
- **POST /api/v1/apps/create**: Create a new application
- **GET /api/v1/apps/all**: Get all applications for the authenticated user
- **GET /api/v1/apps**: Get application by ID
- **GET /api/v1/apps/name**: Get application by name
- **PUT /api/v1/apps/name**: Update application name
- **DELETE /api/v1/apps/delete**: Delete application by ID

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contact
For any inquiries or issues, please contact `quixotics317@gmail.com`.