#!/bin/bash

# verdaccio v7 requires node >= 24, keep v6 while testing node 22
npm install -g verdaccio@6
npx verdaccio --config ./verdaccio.yml &

sleep 10

npm config set registry=http://localhost:4873
npm config set //localhost:4873/:_authToken=fooBar # Add a non empty token for npm 6

## Always release as beta for testing
npm publish --tag beta
