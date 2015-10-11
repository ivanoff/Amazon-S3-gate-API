
DB_URL=mongodb://gl:gl@ds051933.mongolab.com:51933/gl
ERVER_PORT=3000
LOG_PATH=./log

:loop

    node index.js
    pause

goto loop
