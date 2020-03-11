# E-Commerce System Design

This application explores scalability by subjecting a representative image view component
on an e-commerce site to a variety of tests in order to optimize system design for
performance.

## Record Generation

## Benchmarking Databases
Benchmark.js is a benchmarking library that supports high-resolution timers and
returns statistically significant results.  It is used natively within MariaDB to
compare the MariaDB Node.js connector with popular Node.js MySQL clients; however,
I developed a benchmark test suite in order to compare performance speeds of both
NoSQL (MongoDB) and SQL (MariaDB) databases with and without object-relational mapping
(ORM) libraries (Mongoose and Sequelize, respectively) when retrieving image data.  Each
query retrieved the same image (Number __8,629,947__) and its accompanying data
(i.e., product name, description, embedded video, thumbnails) by ID.  The MongoDB
collection was indexed to improve performance.

### Benchmarking Results
Running the above retrieval operation over a sample set of __70 runs__ generated
the following results:

#### NoSQL
_Mongoose_:  896 ops/sec ± 5.52%

_MongoDB_:  1,794 ops/sec ± 5.18%

![alt text](https://raw.githubusercontent.com/nmalesa/image-view/master/benchmark/plotly/nosql.png "Bar Chart Displaying NoSQL Benchmarking Statistics")

#### SQL
_Sequelize_:  432 ops/sec ± 4.98%

_MariaDB_:  3,290 ops/sec ± 3.36%

![alt text](https://raw.githubusercontent.com/nmalesa/image-view/master/benchmark/plotly/sql.png "Bar Chart Displaying SQL Benchmarking Statistics")

#### Query by Name
Retrieving the same image by product name rather than by ID yielded the following
results:

##### NoSQL

_Mongoose_:  132 ops/sec ± 1.06%

_MongoDB_:  143 ops/sec ± 0.82%

##### SQL

_Sequelize_: 0.13 ops/sec ± 23.87%

_MariaDB_: 0.11 ops/sec ± 11.18%


## Load Testing

### Development

### Production
