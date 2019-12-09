# nobug
>A website to monitor bugs.The web project is here.https://github.com/kerwin-ly/nobug-web

## Technical Stacks
Node.js + Koa2 + Mysql + Redis

## Install
```bash
# install mysql
brew install mysql

# install redis
brew install redis

# install conventional-changelog-cli
npm install -g conventional-changelog-cli
```

## Start
```bash

# start redis server(get detail: redis-cli)
redis-server

# start mysql
mysql.server start

# login && input password
mysql -u root -p

# install
npm install

# start node server
npm run server

```

## Release

```bash
# generate CHANGELOG.md automaticly
npm run release-log 
```
