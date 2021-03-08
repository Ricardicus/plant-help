#!/bin/sh
# setup backend server
# Launch backend server
npm start &
# setup client
cd client
# Start frontend server (React)
npm start
