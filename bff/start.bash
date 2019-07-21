#!/bin/bash
npm run migrate up

if [ "$NODE_ENV" = "production"] ]
then
    npm run prod
else
    npm run dev
fi
