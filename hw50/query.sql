-- Tạo bảng customer
CREATE TABLE customer (
    customer_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    city VARCHAR(50),
    country VARCHAR(50),
    postal_code VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

-- Tạo bảng product
CREATE TABLE product (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INTEGER NOT NULL,
    category VARCHAR(50),
    supplier VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

-- Tạo bảng order
CREATE TABLE "order" (
    order_id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) NOT NULL,
    total_amount DECIMAL(12, 2) NOT NULL,
    shipping_address TEXT,
    shipping_city VARCHAR(50),
    shipping_country VARCHAR(50),
    shipping_postal_code VARCHAR(20),
    payment_method VARCHAR(50),
    tracking_number VARCHAR(100)
);

-- Tạo bảng order_item
CREATE TABLE order_item (
    order_item_id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    discount DECIMAL(5, 2) DEFAULT 0,
    total_price DECIMAL(10, 2) NOT NULL
);
-- Tạo dữ liệu mẫu cho bảng customer (500,000 bản ghi)
INSERT INTO
    customer (
        first_name,
        last_name,
        email,
        phone,
        address,
        city,
        country,
        postal_code,
        created_at,
        last_login
    )
SELECT
    'FirstName' || i AS first_name,
    'LastName' || i AS last_name,
    'user' || i || '@example.com' AS email,
    '123-456-' || LPAD(i::TEXT, 4, '0') AS phone,
    'Address ' || i AS address,
    (
        ARRAY[
            'Hanoi',
            'Ho Chi Minh',
            'Da Nang',
            'Can Tho',
            'Hai Phong'
        ]
    ) [1 + i % 5] AS city,
    (
        ARRAY[
            'Vietnam',
            'USA',
            'Japan',
            'Singapore',
            'Thailand'
        ]
    ) [1 + i % 5] AS country,
    LPAD((i % 99999)::TEXT, 5, '0') AS postal_code,
    TIMESTAMP '2020-01-01' + (i % 1000) * INTERVAL '1 day' AS created_at,
    TIMESTAMP '2020-01-01' + (i % 1000) * INTERVAL '1 day' + (i % 24) * INTERVAL '1 hour' AS last_login
FROM generate_series(1, 500000) AS i;

-- Tạo dữ liệu mẫu cho bảng product (1,000,000 bản ghi)
INSERT INTO
    product (
        name,
        description,
        price,
        stock_quantity,
        category,
        supplier,
        created_at,
        updated_at
    )
SELECT
    'Product ' || i AS name,
    'Description for product ' || i AS description,
    (random() * 1000)::DECIMAL(10, 2) AS price,
    (random() * 1000)::INTEGER AS stock_quantity,
    (
        ARRAY[
            'Electronics',
            'Clothing',
            'Books',
            'Home',
            'Sports',
            'Toys',
            'Food',
            'Health'
        ]
    ) [1 + i % 8] AS category,
    'Supplier ' || (i % 100) AS supplier,
    TIMESTAMP '2020-01-01' + (i % 1000) * INTERVAL '1 day' AS created_at,
    TIMESTAMP '2020-01-01' + (i % 1000) * INTERVAL '1 day' + (i % 100) * INTERVAL '1 hour' AS updated_at
FROM generate_series(1, 1000000) AS i;

-- Tạo dữ liệu mẫu cho bảng order (5,000,000 bản ghi)
INSERT INTO
    "order" (
        customer_id,
        order_date,
        status,
        total_amount,
        shipping_address,
        shipping_city,
        shipping_country,
        shipping_postal_code,
        payment_method,
        tracking_number
    )
SELECT (random() * 500000 + 1)::INTEGER AS customer_id,
    TIMESTAMP '2020-01-01' + (i % 1095) * INTERVAL '1 day' + (i % 24) * INTERVAL '1 hour' AS order_date,
    (
        ARRAY[
            'Pending',
            'Processing',
            'Shipped',
            'Delivered',
            'Cancelled'
        ]
    ) [1 + i % 5] AS status,
    (random() * 5000)::DECIMAL(12, 2) AS total_amount,
    'Shipping Address ' || i AS shipping_address,
    (
        ARRAY[
            'Hanoi',
            'Ho Chi Minh',
            'Da Nang',
            'Can Tho',
            'Hai Phong'
        ]
    ) [1 + i % 5] AS shipping_city,
    (
        ARRAY[
            'Vietnam',
            'USA',
            'Japan',
            'Singapore',
            'Thailand'
        ]
    ) [1 + i % 5] AS shipping_country,
    LPAD((i % 99999)::TEXT, 5, '0') AS shipping_postal_code,
    (
        ARRAY[
            'Credit Card',
            'PayPal',
            'Bank Transfer',
            'Cash on Delivery'
        ]
    ) [1 + i % 4] AS payment_method,
    'TRK' || LPAD(i::TEXT, 10, '0') AS tracking_number
FROM generate_series(1, 5000000) AS i;

-- Tạo dữ liệu mẫu cho bảng order_item (20,000,000 bản ghi)
INSERT INTO
    order_item (
        order_id,
        product_id,
        quantity,
        unit_price,
        discount,
        total_price
    )
SELECT (i / 4) + 1 AS order_id,
    (random() * 1000000 + 1)::INTEGER AS product_id,
    (random() * 10 + 1)::INTEGER AS quantity,
    (random() * 1000)::DECIMAL(10, 2) AS unit_price,
    (random() * 0.5)::DECIMAL(5, 2) AS discount,
    (random() * 10 + 1) * (random() * 1000) * (1 - random() * 0.5)::DECIMAL(10, 2) AS total_price
FROM generate_series(1, 20000000) AS i;

-- answer 1:
explain ANALYSE
select
    customer_id,
    first_name,
    last_name
from customer
where
    city = 'Ho Chi Minh'

-- Sequential Scan (quét tuần tự) nghĩa là PostgreSQL sẽ đọc toàn bộ các dòng trong bảng customers, sau đó áp dụng bộ lọc WHERE city = 'Ho Chi Minh' cho từng dòng.
-- PostgreSQL chọn Sequential Scan thay vì Index Scan khi:
-- Không có chỉ mục (index) trên cột city.
-- Dữ liệu trong bảng quá ít ⇒ quét toàn bộ bảng còn nhanh hơn truy cập chỉ mục rồi truy xuất bản ghi.
-- Giá trị được tìm kiếm xuất hiện quá nhiều (selectivity thấp) ⇒ dùng index không có lợi.
-- PostgreSQL cho rằng chi phí tổng thể của Seq Scan thấp hơn các chiến lược khác.
-- Cach toi uu: su dung index

drop index idx_customer_city

create index idx_customer_city on customer (city)

--answer 2:
explain ANALYSE select * from product where name = 'Product 5000'

create index idx_product_name on product (name)

-- Truy vấn với name = 'Product 5000' có điều kiện chính xác, phù hợp với B-tree index.
-- PostgreSQL sử dụng chỉ mục để nhảy trực tiếp đến vị trí dòng cần tìm, thay vì quét toàn bộ bảng.
-- Do đó, thời gian truy vấn giảm mạnh, đặc biệt khi bảng có hàng trăm nghìn hoặc triệu dòng.

-- answer 3:
EXPLAIN ANALYSE select * from "order" where order_id = 100000

-- order_id là PRIMARY KEY, và trong PostgreSQL, primary key mặc định sẽ có B-tree index được tạo sẵn.
-- Truy vấn có điều kiện chính xác (=), rất phù hợp để sử dụng Index Scan.
-- Do đó, PostgreSQL tự động chọn Index Scan vì đó là cách nhanh nhất để truy cập bản ghi theo giá trị khóa chính.

-- 🟨 Index Scan using order_pkey on "order"
-- → PostgreSQL dùng Index Scan trên chỉ mục order_pkey (tên của index tạo tự động từ khóa chính) trên bảng "order".

-- 🟨 Index Cond: (order_id = 100000)
-- → Điều kiện truy vấn chính xác theo chỉ mục (điều kiện lọc bằng chỉ mục, không cần đọc hết bảng).

-- 🟩 cost=0.43..8.45
-- 0.43: Chi phí khởi đầu để bắt đầu truy vấn (index lookup).

-- 8.45: Tổng chi phí ước tính nếu phải đọc xong bản ghi khớp.

-- Dựa trên thống kê của hệ thống và giả định số dòng.

-- 🟩 rows=1
-- → PostgreSQL ước lượng sẽ trả về 1 dòng (rất chính xác trong trường hợp truy vấn theo khóa chính).

-- 🟩 width=102
-- → Kích thước trung bình mỗi dòng trả về là 102 byte.

-- 🟩 actual time=0.045..0.049
-- → Thời gian thực tế (milliseconds) để:

-- 0.045: Bắt đầu tìm thấy dòng phù hợp.

-- 0.049: Kết thúc việc đọc dòng phù hợp.

-- answer 4:

EXPLAIN ANALYSE select * from "order" WHERE status = 'Delivered'

drop index idx_order_status

create index idx_order_status on "order" (status)

-- Nếu cột status có ít giá trị phân biệt (ví dụ: "Pending", "Shipped", "Delivered","Processing"), thì:
-- PostgreSQL có thể vẫn dùng Seq Scan, vì:
-- Tỷ lệ dòng phù hợp cao (ví dụ ~ 30% các đơn hàng là "Delivered").
-- Khi quá nhiều dòng khớp, quét cả bảng nhanh hơn truy cập index rồi đọc từng dòng.
-- 📌 Khi đó, index KHÔNG cải thiện hiệu suất đáng kể.

-- answer 5:

EXPLAIN ANALYSE
select *
from "order"
where
    customer_id = 10000
    and status = 'Shipped'

-- Gather  (cost=1000.00..116714.20 rows=2 width=102) (actual time=107.188..111.839 rows=1 loops=1)
drop index idx_order_customer_id_status

create index idx_order_customer_id_status on "order" (customer_id, status)
-- Index Scan using idx_order_customer_id_status on "order"  (cost=0.43..12.47 rows=2 width=102) (actual time=0.021..0.022 rows=1 loops=1)
-- => tao composite index cho kha nang tim kiem nhanh hon : 116714 << 12

-- Lợi ích của Composite Index:
-- ✅ Tối ưu cho truy vấn kết hợp nhiều điều kiện (AND giữa nhiều cột).

-- ✅ Tăng tốc độ truy vấn vì không phải hợp nhất nhiều index.

-- ✅ Ít tốn tài nguyên hệ thống (CPU, bộ nhớ).

-- ✅ Dễ dẫn tới khả năng sử dụng Index Scan hoặc Index Only Scan.

-- | Loại chỉ mục           | Hoạt động                                                                                                                                       |
-- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
-- | **Hai chỉ mục đơn lẻ** | - PostgreSQL cần **dò cả hai chỉ mục riêng**, rồi **kết hợp (bitmap AND)** kết quả từ cả hai. - Tốn CPU và RAM hơn, **không tối ưu** cho truy vấn kết hợp. |
-- | **Composite index**    | - Truy vấn sử dụng **một chỉ mục duy nhất**. - PostgreSQL có thể **truy xuất trực tiếp bản ghi** nhờ tổ chức thứ tự của chỉ mục.                           |

-- answer 6:

explain ANALYSE
select category, count(*) as count_category
from product
GROUP BY
    category

--23406 > 15660

drop index idx_product_category

create index idx_product_category on product (category)

-->  Parallel Index Only Scan using idx_product_category on product  (cost=0.42..12575.09 rows=416667 width=6) (actual time=0.045..20.861 rows=333333 loops=3)
-- postgres use index only scan

-- answer 7:

EXPLAIN ANALYSE
select *
from product
where
    price >= 100
    and price <= 200
    -- Seq Scan on product  (cost=0.00..31154.00 rows=100649 width=91) (actual time=0.042..147.312 rows=100346 loops=1)

drop index idx_product_price

create index idx_product_price on product (price)

-- Bitmap Heap Scan on product  (cost=2140.08..19803.81 rows=100649 width=91) (actual time=6.864..46.047 rows=100346 loops=1)

-- Truy vấn trả về nhiều dòng (5-30% bảng) ==>	Bitmap Index Scan ==>	PostgreSQL đánh dấu trước, rồi đọc nhiều dòng một lượt từ bảng

-- answer 8:

EXPLAIN ANALYSE select * from customer where country = 'Vietnam'

-- Seq Scan on customer  (cost=0.00..15791.00 rows=99450 width=119) (actual time=0.006..40.892 rows=100000 loops=1)

-- 🔸 cost=0.00..15791.00
-- Đây là chi phí ước tính do PostgreSQL tính toán, không phải thời gian thực tế.

-- 0.00: chi phí bắt đầu (startup cost).

-- 15791.00: chi phí tổng ước tính để hoàn tất truy vấn.

-- Đơn vị chi phí là đơn vị "ảo", dùng để so sánh giữa các kế hoạch truy vấn.

-- 🔸 rows=99450
-- PostgreSQL ước lượng truy vấn sẽ trả về khoảng 99.450 dòng.

-- Đây là dự đoán, không phải số dòng thực tế.

-- 🔸 width=119
-- Trung bình mỗi dòng trong bảng có kích thước khoảng 119 byte.

-- Bao gồm toàn bộ dữ liệu trong dòng.

drop index idx_customer_country

create index idx_customer_country on customer (country)

-- Bitmap Heap Scan on customer  (cost=1115.16..11899.28 rows=99450 width=119) (actual time=15.841..63.662 rows=100000 loops=1)

-- | So sánh               | Seq Scan   | Bitmap Heap Scan | Nhận xét                                                          |
-- | --------------------- | ---------- | ---------------- | ----------------------------------------------------------------- |
-- | **Startup cost**      | `0.00`     | `1115.16`        | Bitmap mất thêm chi phí để đọc index ban đầu                      |
-- | **Total cost**        | `15791.00` | `11899.28`       | Tổng chi phí **giảm \~25%** sau khi dùng index                    |
-- | **Thời gian thực tế** | `~41 ms`   | `~64 ms`         | Bitmap Heap Scan **chậm hơn một chút**, do việc đọc thêm từ index |

-- answer 9:

EXPLAIN ANALYSE
select customer_id, sum(total_amount)
from "order"
GROUP BY (customer_id)
ORDER BY (sum(total_amount)) DESC
LIMIT 10

-- Limit  (cost=449321.55..449321.57 rows=10 width=36) (actual time=2374.795..2398.363 rows=10 loops=1)

-- | Thông số                           | Ý nghĩa                                                                                          |
-- | ---------------------------------- | ------------------------------------------------------------------------------------------------ |
-- | **cost=449321.55..449321.57**      | Ước tính chi phí thực thi của toàn bộ truy vấn từ lúc bắt đầu đến khi có đủ 10 kết quả           |
-- | **rows=10**                        | Ước tính PostgreSQL nghĩ sẽ trả về 10 dòng                                                       |
-- | **width=36**                       | Kích thước trung bình (bytes) của mỗi dòng kết quả                                               |
-- | **actual time=2374.795..2398.363** | Thời gian thực tế: bắt đầu trả dòng đầu tiên sau \~2374ms và kết thúc trả dòng cuối sau \~2398ms |
-- | **rows=10**                        | Trả về đúng 10 dòng kết quả                                                                      |
-- | **loops=1**                        | Thực hiện duy nhất 1 vòng lặp cho toàn bộ truy vấn                                               |

drop INDEX idx_order_customer_id

CREATE INDEX idx_order_customer_id ON "order" (customer_id);

--  Dùng materialized view hoặc bảng trung gian nếu truy vấn lặp lại nhiều lần
CREATE MATERIALIZED VIEW top_customers AS
SELECT customer_id, SUM(total_amount) AS total
FROM "order"
GROUP BY
    customer_id;

EXPLAIN ANALYSE
SELECT *
FROM top_customers
ORDER BY total DESC
LIMIT 10;
-- Limit  (cost=13048.60..13049.75 rows=10 width=12) (actual time=45.673..48.623 rows=10 loops=1)
-- 449321.57 >> 13049.75

-- anwser 10:

EXPLAIN ANALYSE
select "order".order_id, "order".customer_id, customer.first_name, customer.last_name
from "order"
    JOIN customer on "order".customer_id = customer.customer_id
LIMIT 100000

-- 1. Seq Scan on "order"
-- Seq Scan: PostgreSQL đang đọc tuần tự toàn bộ bảng "order".

-- cost=0.00..134464.00:

-- 0.00: Chi phí bắt đầu (I/O, khởi tạo).

-- 134464.00: Tổng chi phí ước lượng để đọc hết 5 triệu dòng.

-- rows=5000000: PostgreSQL ước lượng có 5 triệu dòng trong bảng.

-- actual time=0.031..64.620:

-- Mất khoảng 64.6 ms để đọc hết dữ liệu.

-- rows=800937: Truy vấn thực tế chỉ lấy 800937 dòng (ít hơn dự đoán).

-- loops=1: Thực hiện 1 lần.

-- 2. Seq Scan on customer
-- Seq Scan: PostgreSQL đọc toàn bộ bảng customer.

-- cost=0.00..14541.00: Ước lượng chi phí đọc hết 500,000 dòng.

-- actual time=0.020..59.040: Thời gian thực tế để đọc hết bảng là khoảng 59ms.

-- rows=500000: Đúng như dự đoán — lấy tất cả 500,000 dòng.

-- loops=1: Chạy 1 lần.

-- Limit  (cost=24698.00..28509.20 rows=100000 width=37) (actual time=114.655..278.445 rows=100000 loops=1)
-- time: 278ms

drop index idx_order_customer_id

create index idx_order_customer_id on "order" (customer_id)
-- Limit  (cost=46.73..10481.82 rows=100000 width=37) (actual time=0.013..194.141 rows=100000 loops=1)
-- time: 194ms
-->  Index Scan using idx_order_customer_id on "order"  (cost=0.43..435530.66 rows=5000000 width=8) (actual time=0.040..204.845 rows=100000 loops=1)
-->  Index Scan using customer_pkey on customer  (cost=0.42..22540.42 rows=500000 width=33) (actual time=0.040..2.269 rows=9980 loops=1)

-- | Thành phần         | Trước khi tạo index            | Sau khi tạo index              |
-- | ------------------ | ------------------------------ | ------------------------------ |
-- | `"order"`          | Seq Scan: \~64.6ms, 800k+ rows | Index Scan: \~204ms, 100k rows |
-- | `customer`         | Seq Scan: \~59ms, 500k rows    | Index Scan: \~2.3ms, 9980 rows |
-- | Tổng thời gian đọc | \~278ms+                       | \~194ms                        |
-- Tong thoi gian truy van giam, cost giam dang ke 28509 -> 10481

-- answer 11:

create index idx_product_price on product (price)

EXPLAIN ANALYSE
select *
from product
where
    price = 500
    -- Bitmap Heap Scan on product  (cost=4.51..47.79 rows=11 width=91) (actual time=0.040..0.049 rows=11 loops=1)

EXPLAIN ANALYSE
select *
from product
where
    price BETWEEN 400 and 600
    -- Bitmap Heap Scan on product  (cost=4240.44..23385.68 rows=199416 width=91) (actual time=11.814..78.136 rows=199683 loops=1)

-- Index Scan phù hợp: cho query 1

-- Queries trả về < 5% tổng rows
-- Cần kết quả đã sắp xếp
-- High selectivity conditions

-- Bitmap Index Scan phù hợp: cho query 2

-- Queries trả về 5-30% tổng rows
-- Multiple OR conditions
-- Range queries với nhiều kết quả
-- Không cần sorted output

--answer 12:

EXPLAIN ANALYSE
select *
from product
ORDER BY price desc
limit 100
    -- Limit  (cost=37245.40..37257.07 rows=100 width=91) (actual time=244.299..253.498 rows=100 loops=1)

-- phan tich postgres thuc hien sap xep: top-N heapsort
-- Khi: Có LIMIT và LIMIT << total_rows
-- Cách hoạt động: Duy trì heap với N elements, chỉ giữ top N
-- Memory: O(N) với N = LIMIT
-- Ưu điểm: Memory efficiency, fast cho small LIMIT

drop index idx_product_price

CREATE index idx_product_price on product (price)
-- Limit  (cost=0.42..9.49 rows=100 width=91) (actual time=0.045..0.263 rows=100 loops=1)

-- | Tiêu chí                         | Không có index           | Có index (`price DESC`) |
-- | -------------------------------- | ------------------------ | ----------------------- |
-- | **Execution Time**               | \~253 ms                 | \~0.26 ms               |
-- | **Chiến lược thực thi**          | Parallel Seq Scan + Sort | Index Scan Backward     |
-- | **CPU / I/O**                    | Cao do quét toàn bảng    | Rất thấp                |
-- | **Tốc độ tăng dần theo dữ liệu** | **Tăng tuyến tính O(n)** | **Gần như O(1)**        |
-- | **Tối ưu cho LIMIT**             | Không                    | Có                      |

--answer 13:

EXPLAIN (ANALYZE, FORMAT TEXT)
SELECT category, price
FROM product
WHERE category = 'Clothing'
;
-- Seq Scan on product  (cost=0.00..28654.00 rows=125267 width=13) (actual time=0.027..279.783 rows=125000 loops=1)
DROP INDEX IF EXISTS idx_product_category_price;

CREATE INDEX idx_product_category_price ON product (category, price);

-- Index Only Scan using idx_product_category_price on product  (cost=0.42..4196.60 rows=125267 width=13) (actual time=0.099..46.638 rows=125000 loops=1)

-- | Tiêu chí            | Trước (Seq Scan) | Sau (Index Only Scan) |
-- | ------------------- | ---------------- | --------------------- |
-- | Dạng quét           | Seq Scan         | Index Only Scan       |
-- | Thời gian thực thi  | \~280 ms         | \~46 ms               |
-- | Truy cập bảng chính | Có               | Không                 |
-- | Hiệu suất           | Thấp             | Cao                   |

-- Kết luận
-- Việc tạo index phù hợp với điều kiện lọc (category) và cột cần lấy (price) đã giúp PostgreSQL:

-- Tránh quét toàn bộ bảng

-- Giảm đáng kể thời gian truy vấn

-- Tận dụng tốt cơ chế Index Only Scan (khi đủ thông tin trong index)


-- answer 14:

EXPLAIN ANALYSE
select order_item.product_id, product.category, sum(order_item.total_price) AS total_avenue
from order_item
    JOIN product on order_item.product_id = product.product_id
GROUP BY (
        order_item.product_id,
        product.category
    )

-- HashAggregate  (cost=3175406.75..3661929.63 rows=7671768 width=42) (actual time=16659.344..20581.697 rows=1000000 loops=1)

-- Loại Aggregate: HashAggregate
-- PostgreSQL sử dụng bảng băm (hash table) để gom nhóm dữ liệu theo các Group Key.
-- Tốt khi RAM đủ và số nhóm không vượt quá giới hạn bộ nhớ làm việc (work_mem).
-- Trong trường hợp này, có 1 triệu nhóm, chiếm khá nhiều RAM → tốn thời gian.
-- JOIN trước, GROUP BY sau
-- PostgreSQL thực hiện JOIN toàn bộ dữ liệu rồi mới GROUP.
-- Việc JOIN tạo ra gần 20 triệu dòng, khiến HashAggregate xử lý rất nặng.

drop INDEX idx_order_item_product_id

CREATE INDEX idx_order_item_product_id ON order_item (product_id);

create index idx_product_category on product (category);

-- GroupAggregate  (cost=1004.27..1714176.53 rows=7671768 width=42) (actual time=332.302..45983.164 rows=1000000 loops=1)

-- | Tiêu chí                        | **HashAggregate**                                                               | **GroupAggregate**                                                           |
-- | ------------------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
-- |  **Kế hoạch**                 | `HashAggregate  (cost=3175406.75..3661929.63 rows=7.6M)`                        | `GroupAggregate  (cost=1004.27..1714176.53 rows=7.6M)`                       |
-- |  **Thời gian thực tế**        | `actual time=16659.344..20581.697` → \~**20.6 giây**                            | `actual time=332.302..45983.164` → \~**45.6 giây**                           |
-- |  **Chiến lược nhóm**          | Dùng bảng băm (hash table) để gom nhóm – **toàn bộ dữ liệu phải nằm trong RAM** | Gom nhóm **theo từng nhóm liên tiếp sau khi đã sắp xếp dữ liệu** (streaming) |
-- |  **Cần sắp xếp trước không?** | ❌ Không cần sắp xếp                                                             | ✅ Cần phải `Sort` trước theo `Group Key`                                     |
-- |  **Sử dụng disk I/O?**        | Nếu RAM đủ thì không dùng disk                                                  | Có thể sử dụng disk nếu sắp xếp lớn hơn `work_mem`                           |
-- |  **Tình huống phù hợp**       | Khi số nhóm nhỏ hoặc vừa, RAM đủ                                                | Khi số nhóm lớn hoặc khi cần xử lý theo nhóm có sắp xếp                      |
-- |  **Hiệu suất**                 | Tốt hơn nếu số nhóm không quá lớn                                               | Chậm hơn khi sắp xếp nhiều, disk I/O nhiều                                   |

-- answer 15:

EXPLAIN ANALYSE
select *
from "order"
WHERE
    status = 'Shipped'
    and payment_method = 'Credit Card'
    and total_amount > 1000

-- Gather  (cost=1000.00..141523.83 rows=196015 width=102) (actual time=14.998..489.726 rows=199898 loops=1)

-- | Thành phần                    | Ý nghĩa                                                                          |
-- | ----------------------------- | -------------------------------------------------------------------------------- |
-- | `Parallel Seq Scan`           | **Duyệt toàn bộ bảng** `order` **song song**, chia nhỏ thành 3 phần (3 workers). |
-- | `cost=0.00..120922.33`        | **Ước lượng chi phí** để thực hiện từ đầu đến cuối truy vấn.                     |
-- | `rows=81673`                  | PostgreSQL **dự đoán** có khoảng **81.673 dòng** thỏa điều kiện.                 |
-- | `width=102`                   | Mỗi dòng trung bình có **102 byte** dữ liệu (kích thước ước lượng).              |
-- | `actual time=12.235..431.468` | Mỗi worker mất từ 12 đến 431 ms để xử lý.                                        |
-- | `rows=66633`                  | **Thực tế** có **66.633 dòng** phù hợp (ít hơn dự đoán).                         |
-- | `loops=3`                     | **Có 3 workers chạy song song**, nên phần scan được chia làm 3 phần.             |

-- Phân tích
-- PostgreSQL không dùng chỉ mục vì không có index phù hợp hoặc index không hiệu quả hơn so với parallel scan (dành cho bảng lớn).

-- Việc chọn Parallel Seq Scan là do PostgreSQL nhận định scan toàn bộ bảng nhanh hơn index scan trong trường hợp này, có thể vì:

-- Index không đầy đủ hoặc không theo thứ tự phù hợp (composite index chưa được tạo hoặc không đúng thứ tự).

-- Số lượng bản ghi thỏa điều kiện khá lớn (~66k bản ghi), nhiều hơn 5-10% tổng số dòng trong bảng → PostgreSQL sẽ nghiêng về Seq Scan thay vì Index Scan.

create index idx_order_status_payment_method_total_amount on "order" (
    status,
    payment_method,
    total_amount
)

-- Gather  (cost=8219.75..135153.98 rows=196015 width=102) (actual time=154.471..453.444 rows=199898 loops=1)

--  Phân tích
--  Truy vấn 1 – Không dùng index
-- PostgreSQL quyết định bỏ qua index → dùng Seq Scan toàn bảng dù bạn có tạo index rồi.

-- Điều này thường xảy ra khi:

-- PostgreSQL ước lượng số bản ghi trả về nhiều → index không lợi bằng scan toàn bảng.

-- Index chưa đủ selectivity (chọn lọc không cao).

-- Bảng nhỏ, hoặc dữ liệu đã được cache trong RAM.

--  Truy vấn 2 – Dùng composite index
-- PostgreSQL đã chọn đúng index (status, payment_method, total_amount).

-- Lợi ích:

-- Truy vấn lọc nhanh hơn nhờ sử dụng nhiều cột có điều kiện.

-- Dữ liệu ít phải đọc hơn → giảm I/O.

-- Cost tối đa (135k) thấp hơn 141k → PostgreSQL đánh giá nó tối ưu hơn.

-- answer 16:

CREATE index idx_product_category on product(category)

EXPLAIN ANALYSE
select * from product where category = 'Electronics' or category = 'Clothing'

-- | Loại scan             | Mô tả                                                                                   | Khi nào dùng                             |
-- | --------------------- | --------------------------------------------------------------------------------------- | ---------------------------------------- |
-- | **Bitmap Index Scan** | Xây dựng bitmap (mảng bit) của các vị trí phù hợp từ index.                             | Khi truy vấn lọc nhiều dòng.             |
-- | **Bitmap Heap Scan**  | Dùng sau Bitmap Index Scan để lấy dữ liệu thực tế từ heap (bảng chính) dựa trên bitmap. | Tối ưu khi đọc nhiều dòng từ bảng.       |

-- | Tiêu chí                     | Bitmap Index Scan                       | Bitmap Heap Scan                              |
-- | ---------------------------- | --------------------------------------- | --------------------------------------------- |
-- | Chức năng                    | Truy vấn index để lấy TID (vị trí dòng) | Truy cập bảng chính để lấy dữ liệu từ TID     |
-- | Truy cập heap (bảng chính)   | ❌ Không                                 | ✅ Có                                          |
-- | Đọc dữ liệu thực tế          | ❌ Chưa có                               | ✅ Có                                          |
-- | Tốc độ (trong ví dụ của bạn) | Rất nhanh (\~23 ms cho 2 scan)          | Chậm hơn (\~255 ms để đọc heap)               |
-- | Khi nào xảy ra               | Trước Heap Scan                         | Sau khi đã có bitmap                          |
-- | Ưu điểm                      | Nhanh, ít I/O, xử lý điều kiện OR tốt   | Truy xuất dữ liệu thực, theo batch, ít random |
-- | Điểm nghẽn                   | Không                                   | Có thể tốn I/O nhiều nếu dữ liệu rải rác      |


-- answer 17:

EXPLAIN ANALYSE
select * from "order" order by (order_date) DESC LIMIT 20
-- Limit  (cost=161734.10..161736.43 rows=20 width=102) (actual time=433.767..436.800 rows=20 loops=1)

-- 1. Parallel Seq Scan on "order" – quét bảng song song
-- PostgreSQL chia bảng "order" ra làm 3 phần, mỗi worker quét một phần (loops=3).

-- Mỗi phần có khoảng 1.666.667 rows.

-- Tổng cộng là ~5 triệu dòng (đúng với rows=2083333 * 2 trong gather).

-- Đây là cách nhanh nhất để lấy toàn bộ dữ liệu khi không có index hỗ trợ sắp xếp.

-- 2. Sort – sắp xếp kết quả từ từng worker
-- Sau khi quét xong, mỗi worker tự sắp xếp phần của mình.

-- Thời gian sắp xếp mỗi phần: ~0.002 ms (nhưng đã mất ~392 ms để sẵn sàng sắp xếp, chủ yếu là do đọc hết dữ liệu).

-- Mỗi sort chỉ trả về 20 rows là kết quả đầu tiên trong phần của nó.

-- 3. Gather Merge – hợp nhất kết quả từ các worker
-- Gather Merge nhận kết quả đã sắp xếp từ mỗi worker rồi gộp lại theo thứ tự tăng/giảm giống như merge trong merge sort.

-- Thay vì lấy tất cả kết quả, nó dừng lại sau khi đã thu được LIMIT 20.

-- Thời gian:

-- Bắt đầu merge: 431.628 ms

-- Kết thúc lấy đủ 20 dòng: 434.641 ms (~3 ms cho merge)

-- 4. Limit – cắt kết quả về đúng số lượng yêu cầu
-- Limit ở cấp cao nhất chỉ đơn giản là ngăn không cho trả về nhiều hơn 20 dòng.

-- Bản thân nó không thực hiện xử lý gì nhiều – chỉ là bước "chặn lại".

-- Thời gian cho limit: 433.767..436.800 ms → khoảng 3 ms

CREATE INDEX idx_order_order_date ON "order" (order_date DESC);
-- Limit  (cost=0.43..2.15 rows=20 width=102) (actual time=0.086..0.390 rows=20 loops=1)

-- | Tiêu chí                              | Truy vấn chậm                                 | Truy vấn nhanh                  |
-- | ------------------------------------- | --------------------------------------------- | ------------------------------- |
-- | **Chi phí ước lượng**                 | `161734.10`                                   | `0.43`                          |
-- | **Thời gian thực tế**                 | `~437 ms`                                     | `~0.4 ms`                       |
-- | **Cách đọc dữ liệu**                  | `Parallel Seq Scan` + `Sort` + `Gather Merge` | `Index Scan`                    |
-- | **Có dùng chỉ mục không?**            | ❌ Không                                       | ✅ Có                            |
-- | **Có dừng sớm khi đủ 20 dòng không?** | ❌ Không (phải sort toàn bộ)                   | ✅ Có (dừng ngay sau khi đọc đủ) |
-- | **Tổng số dòng cần xử lý**            | \~5 triệu (dù chỉ lấy 20)                     | 20 (chính xác)                  |


-- answer 18:

EXPLAIN ANALYSE
SELECT c.customer_id, c.first_name, c.last_name, o.total_amount
FROM customer c
JOIN "order" o ON c.customer_id = o.customer_id
WHERE o.total_amount = (
    SELECT MAX(total_amount)
    FROM "order"
) LIMIT 1
;
-- Limit  (cost=112506.31..122556.18 rows=1 width=39) (actual time=625.901..756.568 rows=1 loops=1)
-- PostgreSQL cần sắp xếp toàn bộ bảng order theo total_amount DESC, rồi lấy dòng đầu tiên → Tốn thời gian khi bảng có hàng triệu dòng.

-- CÁCH POSTGRESQL THỰC HIỆN SCALAR SUBQUERY:

-- 1. INITPLAN: PostgreSQL thực hiện subquery trước
--    - Scan toàn bộ bảng order để tìm MAX(total_amount)
--    - Kết quả được cache trong memory (chỉ thực hiện 1 lần)
--    - Giá trị này trở thành constant trong query chính

-- 2. MAIN QUERY: Sử dụng kết quả của InitPlan
--    - Join customer và order
--    - Filter với giá trị constant từ InitPlan

-- EXECUTION PLAN PATTERN:
-- InitPlan 1 (returns $0)
--   -> Aggregate (Scan order table)
-- Hash Join
--   -> Seq Scan on customer
--   -> Hash (Seq Scan on order với filter total_amount = $0)

DROP index idx_order_total_amount_customer_id

create index idx_order_total_amount_customer_id on "order"(total_amount DESC, customer_id)
-- Limit  (cost=1.33..10.11 rows=1 width=39) (actual time=0.210..0.214 rows=1 loops=1)
-- COST ANALYSIS:
-- ┌─────────────────┬──────────────┬──────────────┬─────────────┐
-- │     Metric      │   Plan 1     │   Plan 2     │ Improvement │
-- ├─────────────────┼──────────────┼──────────────┼─────────────┤
-- │ Startup Cost    │ 112,506.31   │ 1.33         │ 99.999%     │
-- │ Total Cost      │ 122,556.18   │ 10.11        │ 99.992%     │
-- │ Startup Time    │ 625.901 ms   │ 0.210 ms     │ 99.967%     │
-- │ Total Time      │ 756.568 ms   │ 0.214 ms     │ 99.972%     │
-- │ Performance     │ SLOW         │ FAST         │ 3,536x      │
-- └─────────────────┴──────────────┴──────────────┴─────────────┘

-- IMPROVEMENT SUMMARY:
-- - Thời gian thực thi: Nhanh hơn 3,536 lần (756ms → 0.214ms)
-- - Chi phí startup: Giảm 84,632 lần (112,506 → 1.33)
-- - Chi phí total: Giảm 12,120 lần (122,556 → 10.11)
