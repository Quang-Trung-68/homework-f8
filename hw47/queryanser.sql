-- ===== BÀI TẬP QUẢN LÝ THƯ VIỆN - POSTGRESQL =====

DROP TABLE IF EXISTS "Book";

CREATE TABLE "Book" (
    book_id INT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    author VARCHAR(100) NOT NULL,
    publish_year INT,
    publisher VARCHAR(100),
    category VARCHAR(50),
    page_count INT,
    price DECIMAL(15, 2),
    stock INT DEFAULT 0,
    import_date DATE
);

ALTER TABLE "Book" ADD COLUMN "language" VARCHAR(30);

ALTER TABLE "Book" ADD COLUMN "shelf_position" VARCHAR(20);

ALTER TABLE "Book"
ADD COLUMN "status" VARCHAR(20) DEFAULT 'Available';

INSERT INTO
    "Book"
VALUES (
        1,
        'The Adventures of Cricket',
        'To Hoai',
        2010,
        'Kim Dong',
        'Literature',
        150,
        75000.00,
        10,
        '2020-01-15',
        'Vietnamese',
        'A1',
        'Available'
    ),
    (
        2,
        'The Alchemist',
        'Paulo Coelho',
        2013,
        'NXB Tre',
        'Novel',
        228,
        85000.00,
        7,
        '2020-02-20',
        'Vietnamese',
        'A2',
        'Borrowed'
    ),
    (
        3,
        'How to Win Friends',
        'Dale Carnegie',
        2016,
        'NXB Tong Hop',
        'Psychology',
        320,
        120000.00,
        5,
        '2020-03-10',
        'Vietnamese',
        'B1',
        'Available'
    ),
    (
        4,
        'Mắt biếc',
        'Nguyễn Nhật Ánh',
        2019,
        'NXB Trẻ',
        'Novel',
        195,
        88000.00,
        12,
        '2020-12-10',
        'Vietnamese',
        'A4',
        'Available'
    ),
    (
        5,
        'Vật lý đại cương',
        'David Halliday',
        2014,
        'NXB Đại học Quốc gia',
        'Textbook',
        850,
        320000.00,
        3,
        '2021-01-20',
        'Vietnamese',
        'F1',
        'Borrowed'
    ),
    (
        6,
        'Le Petit Prince',
        'Antoine de Saint-Exupéry',
        1998,
        'Gallimard',
        'Novel',
        120,
        150000.00,
        0,
        '2021-02-15',
        'French',
        'B3',
        'Removed'
    ),
    (
        7,
        'Blockchain cơ bản',
        'Satoshi Nakamoto',
        2021,
        'NXB Công nghệ',
        'Technology',
        320,
        220000.00,
        5,
        '2021-03-10',
        'English',
        'D3',
        'Available'
    ),
    (
        8,
        'Dế Mèn phiêu lưu ký',
        'Tô Hoài',
        2008,
        'Kim Đồng',
        'Literature',
        180,
        65000.00,
        15,
        '2020-04-12',
        'Vietnamese',
        'A5',
        'Available'
    ),
    (
        9,
        'Steve Jobs',
        'Walter Isaacson',
        2017,
        'NXB Lao động',
        'Biography',
        630,
        180000.00,
        8,
        '2020-05-18',
        'Vietnamese',
        'C2',
        'Borrowed'
    ),
    (
        10,
        'Sapiens',
        'Yuval Noah Harari',
        2018,
        'NXB Thế giới',
        'History',
        512,
        165000.00,
        6,
        '2020-06-25',
        'Vietnamese',
        'E1',
        'Available'
    ),
    (
        11,
        'Tôi thấy hoa vàng trên cỏ xanh',
        'Nguyễn Nhật Ánh',
        2020,
        'NXB Trẻ',
        'Novel',
        320,
        95000.00,
        20,
        '2020-07-30',
        'Vietnamese',
        'A6',
        'Available'
    ),
    (
        12,
        'The Great Gatsby',
        'F. Scott Fitzgerald',
        2015,
        'NXB Văn học',
        'Classic',
        280,
        110000.00,
        4,
        '2020-08-14',
        'English',
        'B4',
        'Borrowed'
    ),
    (
        13,
        'Toán cao cấp',
        'Nguyễn Đình Trí',
        2019,
        'NXB Giáo dục',
        'Textbook',
        420,
        145000.00,
        9,
        '2020-09-22',
        'Vietnamese',
        'F2',
        'Available'
    ),
    (
        14,
        'Harry Potter và Hòn đá Phù thủy',
        'J.K. Rowling',
        2016,
        'NXB Trẻ',
        'Fantasy',
        350,
        125000.00,
        18,
        '2020-10-05',
        'Vietnamese',
        'C1',
        'Available'
    ),
    (
        15,
        'Lập trình Python',
        'Mark Lutz',
        2020,
        'NXB Thông tin và Truyền thông',
        'Programming',
        680,
        280000.00,
        12,
        '2020-11-11',
        'Vietnamese',
        'D1',
        'Borrowed'
    ),
    (
        16,
        'Kinh tế học vĩ mô',
        'Gregory Mankiw',
        2018,
        'NXB Kinh tế',
        'Economics',
        550,
        195000.00,
        7,
        '2021-01-08',
        'Vietnamese',
        'E2',
        'Available'
    ),
    (
        17,
        'Sherlock Holmes',
        'Arthur Conan Doyle',
        2014,
        'NXB Văn học',
        'Mystery',
        420,
        135000.00,
        11,
        '2021-02-20',
        'Vietnamese',
        'B5',
        'Available'
    ),
    (
        18,
        'Lịch sử Việt Nam',
        'Trần Trọng Kim',
        2017,
        'NXB Sử học',
        'History',
        480,
        160000.00,
        6,
        '2021-03-15',
        'Vietnamese',
        'E3',
        'Borrowed'
    ),
    (
        19,
        'Đắc nhân tâm',
        'Dale Carnegie',
        2019,
        'NXB Tổng hợp TP.HCM',
        'Self-help',
        290,
        98000.00,
        25,
        '2021-04-22',
        'Vietnamese',
        'B2',
        'Available'
    ),
    (
        20,
        'Machine Learning cơ bản',
        'Andrew Ng',
        2021,
        'NXB Khoa học Kỹ thuật',
        'Technology',
        450,
        250000.00,
        8,
        '2021-05-10',
        'English',
        'D2',
        'Available'
    ),
    (
        21,
        '1984',
        'George Orwell',
        2016,
        'NXB Hội Nhà văn',
        'Dystopian',
        380,
        115000.00,
        9,
        '2021-06-18',
        'Vietnamese',
        'B6',
        'Borrowed'
    ),
    (
        22,
        'Hóa học hữu cơ',
        'Paula Bruice',
        2020,
        'NXB Đại học Quốc gia',
        'Textbook',
        720,
        295000.00,
        5,
        '2021-07-25',
        'Vietnamese',
        'F3',
        'Available'
    ),
    (
        23,
        'Pride and Prejudice',
        'Jane Austen',
        2013,
        'NXB Văn học',
        'Romance',
        310,
        105000.00,
        7,
        '2021-08-12',
        'English',
        'B7',
        'Removed'
    ),
    (
        24,
        'Nhà giả kim',
        'Paulo Coelho',
        2018,
        'NXB Hội Nhà văn',
        'Philosophy',
        200,
        78000.00,
        14,
        '2021-09-30',
        'Vietnamese',
        'A3',
        'Available'
    ),
    (
        25,
        'Data Science với R',
        'Hadley Wickham',
        2022,
        'NXB Thống kê',
        'Technology',
        380,
        210000.00,
        6,
        '2021-10-15',
        'English',
        'D4',
        'Borrowed'
    );

-- Hiển thị tất cả thông tin các cuốn sách
SELECT * FROM "Book";

-- Hiển thị book_id, title, author của tất cả sách
SELECT book_id, title, author FROM "Book";

-- Hiển thị thông tin các sách xuất bản năm 2020
SELECT * FROM "Book" WHERE publish_year = 2020;

-- Hiển thị thông tin các sách có price > 200,000
SELECT * FROM "Book" WHERE price > 200000;

-- Hiển thị thông tin các sách có stock > 5
SELECT * FROM "Book" WHERE stock > 5;

-- Hiển thị thông tin các sách thuộc category = 'Novel'
SELECT * FROM "Book" WHERE category = 'Novel';

-- Hiển thị thông tin các sách có status = 'Borrowed'
SELECT * FROM "Book" WHERE status = 'Borrowed';

-- Hiển thị thông tin các sách có language = 'English'
SELECT * FROM "Book" WHERE language = 'English';

-- Hiển thị thông tin các sách xuất bản trước năm 2000
SELECT * FROM "Book" WHERE publish_year < 2000;

-- Hiển thị thông tin các sách có page_count > 300
SELECT * FROM "Book" WHERE page_count > 300;

-- Hiển thị thông tin các sách thuộc category = 'Science' và price < 150,000
SELECT * FROM "Book" WHERE category = 'Science' AND price < 150000;

-- Hiển thị thông tin các sách xuất bản từ 2015 đến 2022
SELECT * FROM "Book" WHERE publish_year BETWEEN 2015 AND 2022;

-- Hiển thị thông tin các sách có status = 'Available' và stock < 3
SELECT * FROM "Book" WHERE status = 'Available' AND stock < 3;

-- Hiển thị thông tin các sách của author = 'Nguyen Nhat Anh' hoặc 'To Hoai'
SELECT *
FROM "Book"
WHERE
    author = 'Nguyễn Nhật Ánh'
    OR author = 'Tô Hoài';

-- Hiển thị thông tin các sách của publisher = 'Kim Dong' hoặc 'NXB Tre'
SELECT *
FROM "Book"
WHERE
    publisher = 'Kim Đồng'
    OR publisher = 'NXB Trẻ';

-- Hiển thị thông tin các sách có language = 'Vietnamese' và page_count < 200
SELECT *
FROM "Book"
WHERE
    language = 'Vietnamese'
    AND page_count < 200;

-- Hiển thị thông tin các sách có category = 'Technology' hoặc 'Science' và xuất bản sau năm 2010
SELECT *
FROM "Book"
WHERE (
        category = 'Technology'
        OR category = 'Science'
    )
    AND publish_year > 2010;

-- Hiển thị thông tin các sách có shelf_position = 'A1', 'A2' hoặc 'A3'
SELECT * FROM "Book" WHERE shelf_position IN ('A1', 'A2', 'A3');

-- Hiển thị thông tin các sách có price từ 100,000 đến 300,000 và status = 'Available'
SELECT *
FROM "Book"
WHERE
    price BETWEEN 100000 AND 300000
    AND status = 'Available';

-- Hiển thị thông tin các sách của author = 'Paulo Coelho' hoặc 'Dale Carnegie' và stock > 0
SELECT *
FROM "Book"
WHERE (
        author = 'Paulo Coelho'
        OR author = 'Dale Carnegie'
    )
    AND stock > 0;

-- Cập nhật status thành 'Borrowed' cho sách có book_id = 5
UPDATE "Book" SET status = 'Borrowed' WHERE book_id = 5;

-- Cập nhật stock thành 0 cho các sách có status = 'Removed'
UPDATE "Book" SET stock = 0 WHERE status = 'Removed';

-- Cập nhật price tăng thêm 10,000 cho tất cả sách thuộc category = 'Novel'
UPDATE "Book" SET price = price + 10000 WHERE category = 'Novel';

-- Cập nhật shelf_position thành 'B5' cho các sách của author = 'Nguyen Nhat Anh'
UPDATE "Book"
SET
    shelf_position = 'B5'
WHERE
    author = 'Nguyễn Nhật Ánh';

-- Cập nhật status thành 'Available' cho các sách có status = 'Borrowed' và stock > 5
UPDATE "Book"
SET
    status = 'Available'
WHERE
    status = 'Borrowed'
    AND stock > 5;

-- Cập nhật language thành 'Vietnamese' cho các sách của publisher = 'Kim Dong' có language là NULL
UPDATE "Book"
SET
    language = 'Vietnamese'
WHERE
    publisher = 'Kim Đồng'
    AND language IS NULL;

-- Cập nhật stock giảm đi 1 cho sách có book_id = 8
UPDATE "Book" SET stock = stock - 1 WHERE book_id = 8;

-- Cập nhật category thành 'Literature' cho các sách có category = 'Novel' và xuất bản trước năm 2000
UPDATE "Book"
SET
    category = 'Literature'
WHERE
    category = 'Novel'
    AND publish_year < 2000;

-- Cập nhật publisher thành 'NXB Giao Duc' cho các sách của publisher = 'NXB Dai hoc Quoc gia' và thuộc category = 'Textbook'
UPDATE "Book"
SET
    publisher = 'NXB Giao Duc'
WHERE
    publisher = 'NXB Đại học Quốc gia'
    AND category = 'Textbook';

-- Cập nhật page_count thành 0 cho các sách có status = 'Removed' và stock = 0
UPDATE "Book"
SET
    page_count = 0
WHERE
    status = 'Removed'
    AND stock = 0;

-- Kiểm tra kết quả cuối cùng
SELECT * FROM "Book" ORDER BY book_id;