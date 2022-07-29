API Boiler
----------
The best practice used to develop a Restful API service.

#### Setup and Run it
```bash
$ npm i
$ npm start
```

#### Environment
```bash
$ cp .env.dev .env
```

#### Stock API Calls
Available [testing APIs with postman](postman/API-Boilerplate.postman_collection.json). Now added modem APIs.
1. [Say hello or health check.](http://localhost:5001/)
2. [Get slot #1 information.](http://localhost:5001/stock/slot/1)
3. [Get one item if named "bonaqua".](http://localhost:5001/stock/item/bonaqua)
4. Get item list by price with condition:
   * [Greater than or equal to 40](http://localhost:5001/stock/price/gt/40)
   * [Less than or equal to 21](http://localhost:5001/stock/price/lt/21)
   * [Equal to 35](http://localhost:5001/stock/price/eq/35)
5. [Get available stock.](http://localhost:5001/stock/left)

#### Project Folder and File Structure
```
.
├── README.md
├── data                                # Static sample data files.
│   ├── error_response_code.json
│   └── stock.json
├── index.js                            # Main application running service.
├── logger.js                           # Custom logger.
├── logs
│   ├── access.log                      # Express access log file.
│   └── system.log                      # Custom log file.
├── mongo.js                            # CRUD MongoDB service.
├── package-lock.json
├── package.json
├── postman
│   └── API-Boilerplate.postman_collection.json
└── services                            # Service modularized folder structure.
    ├── modem
    │   ├── modem.js                    # Modem service programming logic.
    │   └── modem.route.js              # Express router (Modem service).
    └── stock
        ├── stock.js                    # Stock service programming logic.
        └── stock.route.js              # Express router (Stock service).
```
