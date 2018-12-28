CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	item_id INTEGER NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INTEGER(50) NULL,
    PRIMARY KEY (item_id)
    );

DESCRIBE products;

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("TaylorMade Irons", "Sporting Goods", 789.00, 40);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Ping G400 Driver", "Sporting Goods", 450.00, 60);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("On The Road", "Books", 33.00, 400);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Infinite Jest", "Books", 56.00, 475);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Macbook Pro", "Computers", 1299.00, 125);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Microsoft Surface", "Computers", 1789.00, 240);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Echo", "Electronics", 89.00, 430);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("JBL Flip", "Electronics", 79.00, 540);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Keto Cookies", "Food: Snacks", 7.00, 4000);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Paleo Popcorn", "Food: Snacks", 9.00, 4230);

CREATE TABLE departments(
    department_id INTEGER NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(50) NOT NULL,
    over_head_cost DECIMAL(10,2) NOT NULL,
    product_sales DECIMAL(10,2) NOT NULL,
    PRIMARY KEY(department_id)
    );

INSERT INTO departments (department_name, over_head_cost, product_sales) VALUES ("Sporting Goods", 50000.00, 15000.00);
INSERT INTO departments (department_name, over_head_cost, product_sales) VALUES ("Books", 60000.00, 19000.00);
INSERT INTO departments (department_name, over_head_cost, product_sales) VALUES ("Computers", 40000.00, 12000.00);
INSERT INTO departments (department_name, over_head_cost, product_sales) VALUES ("Electronics", 80000.00, 17000.00);
INSERT INTO departments (department_name, over_head_cost, product_sales) VALUES ("Food: Snacks", 20000.00, 16000.00);

SELECT * FROM departments;

