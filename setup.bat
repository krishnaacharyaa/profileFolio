
@echo off
::VARIABLES TO VERIFY INSTALLATION STATUS
set "GO_INSTALLED=0"
set "NODE_INSTALLED=0"
set "MONGODB_INSTALLED=0"
set "MONGOIMPORT_INSTALLED=0"

:: GO BUILD SETTINGS
set "START=cd backend && go build && go run main.go"

:: NEXT JS COMMANDS
set "INSTALL_AND_RUN=cd frontend && npm install && npm run dev"
set "RUN_FRONTEND =cd frontend && npm run dev"

:: MONGOIMPORT COMMANDS
set "INSERT_USER_INFO=mongoimport --db profileFolio --collection users --file users.json"
set "INSERT_SKILLS_INFO=mongoimport --db profileFolio --collection skills --file skills.json --jsonArray"

:: MONGODB COMMANDWS
set "START_MONGO=mongod"

:: Set initial retry count , max retries and initial delay
set "RETRY_COUNT=0"
set "MAX_RETRIES=10"
set "DELAY=1"

:: Copy Environment Files
set "COPY_ENV_BACKEND=copy /Y backend\.env.sample backend\.env"
set "COPY_ENV_FRONTEND=copy /Y frontend\.env.sample frontend\.env"

::CHECK IF ALL NECESSARY DEPENDENCIES ARE SETUP

REM Check if Go is installed
go version >nul 2>&1
IF NOT ERRORLEVEL 1 (
    set GO_INSTALLED=1
)

REM Check if Node.js is installed
node --version >nul 2>&1
IF NOT ERRORLEVEL 1 (
    set NODE_INSTALLED=1
)

REM Check if MongoDB is installed
mongod --version >nul 2>&1
IF NOT ERRORLEVEL 1 (
    set MONGO_INSTALLED=1
)

REM Check if mongoimport is installed by checking the version
mongoimport --version >nul 2>&1

REM If the command succeeds, set MONGOIMPORT_INSTALLED to 1
IF NOT ERRORLEVEL 1 (
    set "MONGOIMPORT_INSTALLED=1"
)


REM Check the results and provide feedback
IF %GO_INSTALLED%==0 (
    echo Go is not installed on this system.
    echo Please install Go from https://go.dev/doc/install
    PAUSE
)

IF %NODE_INSTALLED%==0 (
    echo Node.js is not installed on this system.
    echo Please install Node.js from https://nodejs.org/en/download/package-manager
    PAUSE
)

IF %MONGO_INSTALLED%==0 (
    echo MongoDB is not installed on this system.
    echo Please install MongoDB from https://www.mongodb.com/try/download/community
    PAUSE
)

IF %MONGOIMPORT_INSTALLED%==0 (
    echo MONGOIMPORT Database tool is not installed on this system / MONGOIMPORT is not available in your system PATH environment variable
    echo Please head to https://www.mongodb.com/docs/database-tools/installation/installation-windows/ for installation process
    PAUSE

)

:: If any are missing, exit with an error
IF %GO_INSTALLED%==0 (
    exit /b 1
)

IF %NODE_INSTALLED%==0 (
    exit /b 1
)

IF %MONGO_INSTALLED%==0 (
    exit /b 1
)

IF %MONGOIMPORT_INSTALLED%==0 (
    exit /b 1
)

:: Change to the directory where the batch file is located
cd /d "%~dp0"

::--------------------------------------------------------------------------

%COPY_ENV_BACKEND%
echo "Copied .env file for backend successfully"
%COPY_ENV_FRONTEND%
echo "Copied .env file for frontend successfully"

start cmd /k "%START_MONGO%"

:RETRY_LOOP

    echo Attempt #%RETRY_COUNT% to import data using mongoimport...

    :: Run the mongoimport command
    %INSERT_USER_INFO%

    :: Check if the mongoimport command was successful
    IF ERRORLEVEL 1 (
        :: If it failed, increment the retry count
        set /a RETRY_COUNT+=1

        :: Check if we've reached the maximum retries
        IF %RETRY_COUNT% GTR %MAX_RETRIES% (
            echo Max retries reached.Unable to insert data in MongoDB Exiting....
            exit /b 1
        )

        :: Exponential backoff: double the delay each time
        echo mongoimport failed. Retrying in %DELAY% seconds...
        timeout /t %DELAY% /nobreak >nul

        :: Double the delay for the next attempt
        set /a DELAY*=2

        :: Loop back to retry
        GOTO RETRY_LOOP
    ) ELSE (
        REM If it succeeded, exit the loop

        %INSERT_SKILLS_INFO%

        :: Execute the backend command
        echo launching backend...
        start cmd /k "%START%"

        :: Start a new command window to run the frontend commands
        echo launching frontend...
        start cmd /k "%INSTALL_AND_RUN%"

        PAUSE
        exit /b 0
    )

REM If the script gets here, something went wrong
echo Unable to start the mongo server !!!
PAUSE