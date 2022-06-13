![](/assets/logo-large.png)
# About

RediSomm is a metrics monitoring tool for your Redis database, including the ability to track and log data from expired keys. Lower your keyspace misses, monitor your object size over time, and more.

You will need a Redis Database to monitor as well as a MongoDB to store and persist metrics data. All metrics reads are done from the MongoDB so there is no need to worry about database performance.

# Installation
Please download from our website. Available for Mac OS, Windows (with WSL 2) and Linux

# Development Mode
To get started, simply 
1. Fork and clone this repository
2. ```npm install```
3. ```npm run server-start```
4. Edit the .env file in the root directory, pasting in your MONGODB and your REDIS URIs.

<br>
