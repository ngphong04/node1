DROP DATABASE IF EXISTS ban_hang; -- xóa cơ sở duwxlieuej ban_hang nếu tồn tại nó
-- tạo mới cơ sở dữ liệu tên là ban_hang
CREATE DATABASE ban_hang DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
-- sử dụng cơ sở dữ liệu bán hàng để bắt đầu tạo bảng và thêm mói dữ liệu các bảng
use ban_hang;

-- tạo bảng category
CREATE TABLE IF NOT EXISTS category (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL UNIQUE,
  status tinyint DEFAULT '1',
  created_at date DEFAULT current_timestamp()
);

-- tạo mới bảng product
CREATE TABLE IF NOT EXISTS product
(
    id int primary key AUTO_INCREMENT,
    name VARCHAR(150) not null UNIQUE,
    price float NOT NULL,
    sale_price float NULL DEFAULT '0',
    image VARCHAR(200) NULL,
    content text null,
    category_id int NOT NULL,
    created_at date DEFAULT current_timestamp(),
    FOREIGN KEY (category_id) REFERENCES category(id) -- kháo ngoại
);
-- thêm mới dữ liệu bảng category
INSERT INTO category(name) VALUES
('Áo nam'),
('Áo nữ'),
('Quần Bò'),
('Túi xách');

INSERT INTO category SET name='Ví da', status = 0;
INSERT INTO category SET name='Giây lưng', status = 0;
INSERT INTO category SET name='Áo bà ba', status = 0;
INSERT INTO category SET name='Áo đàm', status = 0;
INSERT INTO category SET name='Áo xóa', status = 0;
INSERT INTO category SET name='Quần áo', status = 0;

INSERT INTO category(name) VALUES
('Ti vi'),
('Tủ lạnh'),
('Ổn Áp'),
('Máy giặt');

INSERT INTO product(name, price, sale_price, category_id) VALUES
('Áo sơ mi nam công sở', 250000, 200000, 1),
('Áo sơ mi nữ công sở', 250000, 200000, 2),
('Quần jeans nam Aristino AJN00109', 750000, 525000, 3),
('Quần Jeans Nam SlimFit Dáng Ôm Co Giãn', 530000, 350000, 3);

INSERT INTO product(name, price, sale_price, category_id) VALUES
('Áo đầm dạ hội mùa hè 2023', 250000, 200000, 9),
('Áo bà ba quê mùa em không mặc', 250000, 200000, 7)