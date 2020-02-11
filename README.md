## NBC Bitcoin

----------


*This project requires node.js*

**How to run project**
1. Either clone or fork the repo and get it onto your local machine.
2. Run `npm install` in the root project folder. This installs dependancies from package.json.
3. Run `npm start` to run the app. Default is port 3000.
4. In your internet browser navigate to `http://localhost:3000/`

**Features**

 - Displays first bitcoin transaction per day timecode 00:00:00.
 - *Change*  - is the difference between previous day and current day price. First entry is 'NA'.
 - *Direction*  - is either up, down, or same. Calculated from change. First entry is 'NA'.
 - *Price* - is the value of the bitcoin at the start of the day timecode 00:00:00.
