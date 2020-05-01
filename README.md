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

#### API Calls
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
├── README.md
├── controllers                 # All programming logic here.
│   └── stockController.js
├── data                        # Static sample data file.
│   └── stock.json
├── index.js                    # Main application running service.
├── logger.js                   # Custom logger.
├── logs
│   ├── access.log              # Express access log file.
│   └── system.log              # Custom log file.
├── node_modules
├── package-lock.json
├── package.json
└── routes                      # Express router.
    └── stock.js
```
