# E-Commerce System Design

This application explores scalability by subjecting a representative image view component
on an e-commerce site to a variety of tests in order to optimize system design for
performance.

## Stack

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

![alt text](https://raw.githubusercontent.com/nmalesa/image-view/master/benchmark/plotly/assets/nosql.png "Bar Chart Displaying NoSQL Benchmarking Statistics")

#### SQL
_Sequelize_:  432 ops/sec ± 4.98%

_MariaDB_:  3,290 ops/sec ± 3.36%

![alt text](https://raw.githubusercontent.com/nmalesa/image-view/master/benchmark/plotly/assets/sql.png "Bar Chart Displaying SQL Benchmarking Statistics")

#### Query by Name
Retrieving the same image by product name rather than by ID yielded the following
results:

##### NoSQL

_Mongoose_:  132 ops/sec ± 1.06%

_MongoDB_:  143 ops/sec ± 0.82%

##### SQL

_Sequelize_: 0.13 ops/sec ± 23.87%

_MariaDB_: 0.11 ops/sec ± 11.18%

### Benchmarking Conclusions


## Caching and Load Testing

### Test Types

#### Load Test

<table>
  <thead>
    <tr>
      <th colspan="7">HTTP Request Duration (ms):  Load Test</th>
    </tr>
    <tr>
      <th colspan="1"></th>
      <th colspan="2">Without Caching</th>
      <th colspan="2">Memcached</th>
      <th colspan="2">Redis</th>
    </tr>
    <tr>
      <th colspan="1"></th>
      <th colspan="1">MongoDB</th>
      <th colspan="1">MariaDB</th>
      <th colspan="1">MongoDB</th>
      <th colspan="1">MariaDB</th>
      <th colspan="1">MongoDB</th>
      <th colspan="1">MariaDB</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Average</th>
      <td>12.74</td>
      <td>9.74</td>
      <td>4.41</td>
      <td>2.71</td>
      <td>9.95</td>
      <td>3.61</td>
    </tr>
    <tr>
      <th>Minimum</th>
      <td>0.068</td>
      <td>0.927</td>
      <td>0.564</td>
      <td>0.507</td>
      <td>0.032</td>
      <td>0.5</td>
    </tr>
    <tr>
      <th>Median</th>
      <td>2.1</td>
      <td>2.67</td>
      <td>1.87</td>
      <td>1.72</td>
      <td>2.15</td>
      <td>1.74</td>
    </tr>
    <tr>
      <th>Maximum</th>
      <td>647,000</td>
      <td>1020</td>
      <td>1400</td>
      <td>235.2</td>
      <td>445,000</td>
      <td>774.51</td>
    </tr>
    <tr>
      <th>p(90)</th>
      <td>4.41</td>
      <td>8.57</td>
      <td>4.85</td>
      <td>3.97</td>
      <td>9.32</td>
      <td>4.76</td>
    </tr>
    <tr>
      <th>p(95)</th>
      <td>5.84</td>
      <td>26.98</td>
      <td>7.26</td>
      <td>5.58</td>
      <td>18.57</td>
      <td>7.44</td>
    </tr>
  </tbody>
</table>

#### Stress Test

<table>
  <thead>
    <tr>
      <th colspan="7">HTTP Request Duration (ms):  Stress Test</th>
    </tr>
    <tr>
      <th colspan="1"></th>
      <th colspan="2">Without Caching</th>
      <th colspan="2">Memcached</th>
      <th colspan="2">Redis</th>
    </tr>
    <tr>
      <th colspan="1"></th>
      <th colspan="1">MongoDB</th>
      <th colspan="1">MariaDB</th>
      <th colspan="1">MongoDB</th>
      <th colspan="1">MariaDB</th>
      <th colspan="1">MongoDB</th>
      <th colspan="1">MariaDB</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Average</th>
      <td>123.6</td>
      <td>34.01</td>
      <td>21.44</td>
      <td>13.98</td>
      <td>38.71</td>
      <td>18.31</td>
    </tr>
    <tr>
      <th>Minimum</th>
      <td>0.879</td>
      <td>0.681</td>
      <td>0.409</td>
      <td>0.441</td>
      <td>0.461</td>
      <td>0.431</td>
    </tr>
    <tr>
      <th>Median</th>
      <td>13.27</td>
      <td>4.77</td>
      <td>5.18</td>
      <td>3.89</td>
      <td>25.89</td>
      <td>5.78</td>
    </tr>
    <tr>
      <th>Maximum</th>
      <td>46,210</td>
      <td>2010</td>
      <td>1080</td>
      <td>2110</td>
      <td>1020</td>
      <td>711.32</td>
    </tr>
    <tr>
      <th>p(90)</th>
      <td>227.03</td>
      <td>67.03</td>
      <td>48.13</td>
      <td>32.09</td>
      <td>87.33</td>
      <td>45.32</td>
    </tr>
    <tr>
      <th>p(95)</th>
      <td>642.76</td>
      <td>171.95</td>
      <td>75.07</td>
      <td>59.46</td>
      <td>136.32</td>
      <td>68.06</td>
    </tr>
  </tbody>
</table>

#### Spike Test

<table>
  <thead>
    <tr>
      <th colspan="7">HTTP Request Duration (ms):  Spike Test</th>
    </tr>
    <tr>
      <th colspan="1"></th>
      <th colspan="2">Without Caching</th>
      <th colspan="2">Memcached</th>
      <th colspan="2">Redis</th>
    </tr>
    <tr>
      <th colspan="1"></th>
      <th colspan="1">MongoDB</th>
      <th colspan="1">MariaDB</th>
      <th colspan="1">MongoDB</th>
      <th colspan="1">MariaDB</th>
      <th colspan="1">MongoDB</th>
      <th colspan="1">MariaDB</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Average</th>
      <td>5130</td>
      <td>2140</td>
      <td>1870</td>
      <td>1280</td>
      <td>1210</td>
      <td>1170</td>
    </tr>
    <tr>
      <th>Minimum</th>
      <td>1.08</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>Median</th>
      <td>1080</td>
      <td>2460</td>
      <td>381.44</td>
      <td>334.95</td>
      <td>381.74</td>
      <td>296.13</td>
    </tr>
    <tr>
      <th>Maximum</th>
      <td>22,240</td>
      <td>66,000</td>
      <td>60,000</td>
      <td>60,000</td>
      <td>61,000</td>
      <td>60,000</td>
    </tr>
    <tr>
      <th>p(90)</th>
      <td>11,830</td>
      <td>2790</td>
      <td>2260</td>
      <td>1260</td>
      <td>1840</td>
      <td>1010</td>
    </tr>
    <tr>
      <th>p(95)</th>
      <td>12,530</td>
      <td>3520</td>
      <td>5690</td>
      <td>2510</td>
      <td>4150</td>
      <td>2590</td>
    </tr>
  </tbody>
</table>

#### Soak Test

<table>
  <thead>
    <tr>
      <th colspan="7">HTTP Request Duration (ms):  Soak Test</th>
    </tr>
    <tr>
      <th colspan="1"></th>
      <th colspan="2">Without Caching</th>
      <th colspan="2">Memcached</th>
      <th colspan="2">Redis</th>
    </tr>
    <tr>
      <th colspan="1"></th>
      <th colspan="1">MongoDB</th>
      <th colspan="1">MariaDB</th>
      <th colspan="1">MongoDB</th>
      <th colspan="1">MariaDB</th>
      <th colspan="1">MongoDB</th>
      <th colspan="1">MariaDB</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Average</th>
      <td>760.58</td>
      <td>84.24</td>
      <td>61.7</td>
      <td>29.67</td>
      <td>9.94</td>
      <td>15.43</td>
    </tr>
    <tr>
      <th>Minimum</th>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>Median</th>
      <td>398.08</td>
      <td>7.66</td>
      <td>40.26</td>
      <td>4</td>
      <td>3</td>
      <td>2.55</td>
    </tr>
    <tr>
      <th>Maximum</th>
      <td>1,201,000</td>
      <td>2,408,000</td>
      <td>626,000</td>
      <td>580,000</td>
      <td>44,910</td>
      <td>1,320,000</td>
    </tr>
    <tr>
      <th>p(90)</th>
      <td>1350</td>
      <td>158.65</td>
      <td>104.46</td>
      <td>34.45</td>
      <td>15.42</td>
      <td>9.96</td>
    </tr>
    <tr>
      <th>p(95)</th>
      <td>1800</td>
      <td>353.48</td>
      <td>144.01</td>
      <td>80.63</td>
      <td>33.28</td>
      <td>16.45</td>
    </tr>
  </tbody>
</table>

### Caching and Load Testing Conclusions

## Load Balancing

## Deployment 
