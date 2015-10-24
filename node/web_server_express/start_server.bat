
DB_AUTH=login:pass
AWS_SECRET=secretKey

:loop

    node.exe index.js
    echo "PRESS ENTER TO RESTART OR CTRL-C TO EXIT"
    pause

goto loop
