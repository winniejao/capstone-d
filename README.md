# Tillamook Dashboard
Preventative maintenance display application tailor made for the Tillamook Forest Center. Created by the Spring-Summer Capstone Team D (Winnie Jao, Zoey Lee, David Stamper, Ryan Lui, Dhawnil Chokshi and Ben Bruser). 

## Use

## Build
The application is built into two seperate parts. The 'DB' folder contains the Python webserver backend using Flask, and the 'dashboard' folder contains the Angular and Electron front end app.

### Angular & Electron
Change directory into the dashboard folder and then use the following commands:

`npm install` after cloning to get all the node modules

`npm run electron-build` to build the angular project and then launch electron

`electron-packager . --platform=win32` to bundles the built application as an windows executable. make sure to run the above command

See the README inside the dashboard folder for Angular CLI commands for development. 

## Deployment

### Specifics for Christian as of 10/12/2018
Navigate to the Dashboard dependency folder previously installed during the visit.

Extract the Dashboard.zip to this location.

Copy the Flask folder to the following path:
../DB/src/

To summarize, inside the DB/src folder you should see both "main.py" as well as the Flask folder.
Back out to the root of the folder. You should find a "start.bat" file. This will launch both the database (the black window) and the application. Closing the black window will terminate the session.


Notes
You can turn on the database independently by running "start database.bat" inside the DB/src folder.

You can turn on the user interface independently by launching "dashboard.exe" in the dashboard folder.


### Angular & Electron
Once you pacakage the application, it will include both the source files as well as the node_modules folder in the 'dashboard-win32-x64' folder. These are safe to delete.
