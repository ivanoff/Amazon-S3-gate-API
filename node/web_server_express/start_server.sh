
export DB_URL=mongodb://gl:gl@ds051933.mongolab.com:51933/gl
export SERVER_PORT=3000

while true; do
    node ./index.js
    echo "PRESS ENTER TO RESTART OR CTRL-C TO EXIT"
    read
done