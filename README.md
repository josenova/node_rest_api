# REST API in node.js

This is a REST API exercise implementing an Address Book in node.js

It uses MongoDB to store user data, JWT as authorization, and Firebase to store the contacts.

To test with POSTMAN simply register and login using the `/register` and `/login` endpoints. Then save the returned token in the header as `x-access-token` and procede to access `/v1/contacts`. 

## Testing

Using the black box testing library Superset to test the API endpoint and responses. To run tests with mocha simply command `npm test`. 
