# CivicAPI-electionQuery
Mocha test scripts to validate the Google Civic API election Query results

Included Tests:
    Validates the election query get request returns a 200 response
    Validates the 'kind' and 'elections' key values are returned and are not null
    Validates the value of the 'kind' key
    Validates that all keys are returned for each item in the elections list
    Validate the values of the first election item returned
    Validates the election dates are in the correct format
    Validates that 5 election items are returned
    Validates that access is not granted to user with invalid key
    Validates that access is not granted with null key

Prerequisite
Node.js and npm must be installed.  Validate installation by running following commands:
node -v
npm -v

Installing
1) Clone or download repository
2) Launch CLI
3) Navigate to repository root directory
4) Execute 'start .\jenkins.bat'

Executing Tests
To execute the tests you may run the.\jenkins.bat or execute the 'mocha --reporter mochawesome' command from the root directory.
Test results will be recorded in the '.\mochawesome-report\mochawesome.html' directory.

The .\jenkins.bat file may be added run from CI\CD tools for automatically running as part of the build process.

Author
Joel Washington
