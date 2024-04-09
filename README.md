To start the server:

1. open the terminal in the microservices folder
2. type the following without the quotations: "node patient-microservice"
3. repeat the above steps for the remaining microservices
4. once all microservices are up and running
5. open the terminal in the server folder and type the following to start the api gateway: "node server-api-gateway"
6. now you can test the api gateway in postman to register a new patient for example as follows:
  URL: POST --> http://localhost:3004/registerPatient

  BODY: {
          "username":"test",
          "password":"testpassword"
        }
