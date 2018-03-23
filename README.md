# Aube By Orange

Please explore our presentation landing page
[https://aubeorange.github.io/Aube/](https://aubeorange.github.io/Aube/)

You can also download our Application APK to run Aube directly on your Android device
[Aube APK](https://github.com/AubeOrange/Aube/releases)

### Prerequisites
Ensure you have this installed before proceeding further
- [Node 6.0 or above](https://nodejs.org/en/),  
- [npm 5 or above](https://www.npmjs.com/get-npm),   
- [Ionic CLI](https://ionicframework.com/getting-started)

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

### Install the all package Aube
```
npm install
```

### Run the application on your Browser
```
ionic serve
```
- Options ou can add 

> "-l" to use ionic-lab => Allow you to simulate you app on an Ios, Andoid and Windows device

> "-c" to have logs on your terminal

### Chatbot 

The chatbot allows you to talk to him, and he will answer your somthink depending on what you have said or wrote.
You can also use the Voice Recognition to talk to him

#### What you can ask to Aube's Chatbot

##### Cerebral wake up
When you click on you scheduled alarm clock (the notification), it will redirect you to the Chatbot page and directly ask you to resolve a little mathematical equation
Depeding on your answer, the Chatbot will congratulate you or encourage you to try the next day with a small image (GIF).

##### Physical wake up
You can ask for a physical wake up.
It will answer you with a GIF describing some skretching movements

```
Reveil physique
```


##### Weather
You can ask for the current Weather on a certain city.
It will returns the temperature degrees with a small image of the sky state
```
Quel est la météo aujourd'hui ?"
```
It will ask you the city you asked the weather. You can per example aswer ```Paris```

```
Météo à Paris
```
