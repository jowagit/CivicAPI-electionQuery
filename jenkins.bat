@ECHO OFF
ECHO Installing the required npm packages
call npm install mocha chai mochawesome supertest --save-dev
PAUSE
ECHO Staring the tests
call node ./node_modules/mocha/bin/mocha