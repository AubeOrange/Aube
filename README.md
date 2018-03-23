# Aube By Orange
![License MIT](https://img.shields.io/badge/license-MIT-blue.svg)

### Prerequisites
Ensure you have this installed before proceeding further
- Node 6.0 or above,  
- npm 5 or above,   
- Ionic CLT

To run an Ios Simulator on your Mac, make sure you installed:
- xCode


### Technology Stack
Component         | Technology
---               | ---
Frontend          | [Ionic 3](https://ionicframework.com) with [Angular 4](https://angular.io/)
Database| [Firebase](https://firebase.google.com/)
ChatBot     | [DialogFlow](https://dialogflow.com/)
Weather API      | [Yahoo Weather API](https://developer.yahoo.com/weather/)
 
### Clone the repo
```
git clone https://github.com/AubeOrange/Aube.git
```
or use SSH

```
git clone git@github.com:AubeOrange/Aube.git
```

### Install Aube
```
npm install
```

### Build Backend (SpringBoot Java)
http://localhost:8080
```
# Backend Dev to /
mvn clean install
mvn spring-boot:run
```


### Database (H2 in memory)
http://localhost:8080/database
```
JDBC URL: jdbc:h2:file:./database/db
UserName: sa
Password: 
```

#### Links 

- Swagger : http://localhost:8080/swagger-ui.html
- Database : http://localhost:8080/database/
