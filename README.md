<div align="center">
  <img alt="react" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" width="300">
  <h1>Raspberry dashboard 🍇</h1>

  <p>Administrator dashboard made with ReactJs, based on a <a href="https://github.com/flatlogic/react-material-admin" target="_blank">template</a>.</p>
</div>

## Resources 📝

- [ReactJs](https://fr.reactjs.org/)
- [Material-UI](https://material-ui.com/)

I'd highly recommend reading through some of the ReactJs and Material-UI documentation.

## Project 🚧

This dashboard application is part of a bigger project named _Goyave_. _Govaye_ intends to generates journeys based on the user's likings. The journey are generated according multiple parameters: Localisation 📍, Time 🕑, Budget 💰 and Activity category 📁.

## Dashboard Actions ⚙️

With this dashboard, administrators can:

- SignIn
- Manage the activities (CRUD)
- View a list of all the users
- View the latest journeys made by the users

## Requirements 📄

To use this web application you will need ReacJs.

### Node

- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
  Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v10.14.2

    $ npm --version
    6.4.1

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

## Install 📥

    $ git clone https://github.com/AyazBulls/raspberry-dashboard.git
    $ cd raspberry-dashboard
    $ npm install

## Configure app 🔧

Open `constant.js` then edit it with your settings. You will need:

- API_URL: URL of the [API](https://github.com/AyazBulls/api-mango.git)

## Running the project 🚀

    $ npm start
