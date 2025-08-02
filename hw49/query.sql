-- Active: 1753537958217@@127.0.0.1@5000@default


drop TABLE school

create table school (
    id serial primary key,
    name text,
    address text,
    founding_year text,
    principal_name text,
    phone text,
    email text,
    website text,
    status BOOLEAN
)

create table class (
    id serial primary key,
    school_id bigint,
    name text,
    grade_level text,
    homeroom_teacher text,
    capacity int,
    room_number int,
    academic_year text,
    is_active BOOLEAN
)

create table student (
    id serial primary key,
    first_name text,
    last_name text,
    date_of_birth DATE,
    gender text,
    address text,
    phone text,
    email text,
    enrollment_date date,
    parent_name text,
    parent_contact text
)

create table class_student (
    id SERIAL PRIMARY key,
    class_id int,
    student_id int,
    enrollment_date date,
    status BOOLEAN,
    grade int
)

alter table school add column description text

alter table student add column special_needs BOOLEAN

alter table class_student add column attendance_rate real


INSERT INTO school (name, address, founding_year, principal_name, phone, email, website, status) VALUES
('Trường THPT Chu Văn An', '12 Nguyễn Du, Quận Hai Bà Trưng, Hà Nội', '1908', 'Nguyễn Thị Hồng Nhung', '024-3825-1234', 'chuvaanan@edu.vn', 'https://chuvaanan.hanoi.edu.vn', true),

('Trường THCS Đinh Tiên Hoàng', '45 Đinh Tiên Hoàng, Quận Hoàn Kiếm, Hà Nội', '1985', 'Trần Văn Minh', '024-3826-5678', 'dinhtienhoang@edu.vn', 'https://dinhtienhoang.edu.vn', true),

('Trường Tiểu học Kim Liên', '78 Kim Liên, Quận Đống Đa, Hà Nội', '1975', 'Lê Thị Mai Lan', '024-3574-9012', 'kimlien@edu.vn', 'https://kimlien.dongda.edu.vn', true),

('Trường THPT Nguyễn Trãi', '156 Nguyễn Trãi, Quận Thanh Xuân, Hà Nội', '1995', 'Phạm Đức Thành', '024-3558-3456', 'nguyentrai@edu.vn', 'https://nguyentrai.thanhxuan.edu.vn', true),

('Trường THCS Lý Thường Kiệt', '89 Lý Thường Kiệt, Quận Ba Đình, Hà Nội', '1960', 'Hoàng Thị Thu Hà', '024-3733-7890', 'lythuongkiet@edu.vn', 'https://lythuongkiet.badinh.edu.vn', false);


INSERT INTO class (school_id, name, grade_level, homeroom_teacher, capacity, room_number, academic_year, is_active) VALUES
(1, '10A1', 'Lớp 10', 'Nguyễn Thị Lan Anh', 40, 101, '2024-2025', true),
(1, '11B2', 'Lớp 11', 'Trần Văn Hùng', 38, 205, '2024-2025', true),
(1, '12C1', 'Lớp 12', 'Lê Thị Hồng Vân', 35, 301, '2024-2025', true),
(2, '6A', 'Lớp 6', 'Phạm Thị Mai', 42, 102, '2024-2025', true),
(2, '7B', 'Lớp 7', 'Hoàng Văn Đức', 40, 203, '2024-2025', true),
(2, '9A', 'Lớp 9', 'Ngô Thị Thu Hương', 36, 304, '2024-2025', true),
(3, '3A', 'Lớp 3', 'Đặng Thị Ngọc', 32, 15, '2024-2025', true),
(3, '5B', 'Lớp 5', 'Vũ Văn Thành', 30, 25, '2024-2025', true),
(4, '10A3', 'Lớp 10', 'Bùi Thị Lan Phương', 42, 108, '2024-2025', true),
(5, '8A', 'Lớp 8', 'Lý Văn Minh', 38, 201, '2023-2024', false);

INSERT INTO student (first_name, last_name, date_of_birth, gender, address, phone, email, enrollment_date, parent_name, parent_contact) VALUES
('Nguyễn', 'Minh Anh', '2007-03-15', 'Nữ', '23 Phố Huế, Quận Hai Bà Trưng, Hà Nội', '0987654321', 'minhanh2007@gmail.com', '2024-08-20', 'Nguyễn Văn Hùng', '0912345678'),

('Trần', 'Đức Nam', '2008-07-22', 'Nam', '45 Láng Hạ, Quận Đống Đa, Hà Nội', '0976543210', 'ducnam2008@gmail.com', '2024-08-20', 'Trần Thị Mai', '0923456789'),

('Lê', 'Thu Hương', '2009-11-08', 'Nữ', '67 Giải Phóng, Quận Hai Bà Trưng, Hà Nội', '0965432109', 'thuhuong2009@gmail.com', '2024-08-20', 'Lê Văn Minh', '0934567890'),

('Phạm', 'Hoàng Long', '2006-05-12', 'Nam', '89 Tây Sơn, Quận Đống Đa, Hà Nội', '0954321098', 'hoanglong2006@gmail.com', '2024-08-20', 'Phạm Thị Lan', '0945678901'),

('Hoàng', 'Thị Linh', '2007-09-30', 'Nữ', '12 Nguyễn Chí Thanh, Quận Ba Đình, Hà Nội', '0943210987', 'thilinh2007@gmail.com', '2024-08-20', 'Hoàng Văn Thành', '0956789012'),

('Vũ', 'Quang Huy', '2008-12-03', 'Nam', '34 Trần Duy Hưng, Quận Cầu Giấy, Hà Nội', '0932109876', 'quanghuy2008@gmail.com', '2024-08-20', 'Vũ Thị Hoa', '0967890123'),

('Đặng', 'Khánh Linh', '2009-02-18', 'Nữ', '56 Kim Mã, Quận Ba Đình, Hà Nội', '0921098765', 'khanhlinh2009@gmail.com', '2024-08-20', 'Đặng Văn Sơn', '0978901234'),

('Bùi', 'Tuấn Anh', '2007-06-25', 'Nam', '78 Thái Hà, Quận Đống Đa, Hà Nội', '0910987654', 'tuananh2007@gmail.com', '2024-08-20', 'Bùi Thị Nga', '0989012345'),

('Ngô', 'Minh Châu', '2008-10-14', 'Nữ', '90 Lê Duẩn, Quận Hai Bà Trưng, Hà Nội', '0909876543', 'minhchau2008@gmail.com', '2024-08-20', 'Ngô Văn Đức', '0990123456'),

('Lý', 'Hải Nam', '2006-08-07', 'Nam', '11 Điện Biên Phủ, Quận Ba Đình, Hà Nội', '0998765432', 'hainam2006@gmail.com', '2024-08-20', 'Lý Thị Thu', '0901234567'),

('Đinh', 'Thùy Dung', '2009-04-20', 'Nữ', '33 Hoàng Quốc Việt, Quận Cầu Giấy, Hà Nội', '0987654320', 'thuydung2009@gmail.com', '2024-08-20', 'Đinh Văn Hải', '0912345679'),

('Tạ', 'Minh Tú', '2007-01-16', 'Nam', '55 Nguyễn Văn Cừ, Quận Long Biên, Hà Nội', '0976543209', 'minhtu2007@gmail.com', '2024-08-20', 'Tạ Thị Liên', '0923456780'),

('Dương', 'Lan Anh', '2008-05-09', 'Nữ', '77 Xuân Thủy, Quận Cầu Giấy, Hà Nội', '0965432108', 'lananh2008@gmail.com', '2024-08-20', 'Dương Văn Tùng', '0934567891'),

('Mai', 'Quốc Anh', '2006-11-28', 'Nam', '99 Lạc Long Quân, Quận Tây Hồ, Hà Nội', '0954321097', 'quocanh2006@gmail.com', '2024-08-20', 'Mai Thị Hồng', '0945678902'),

('Cao', 'Thu Trang', '2009-07-11', 'Nữ', '21 Trường Chinh, Quận Thanh Xuân, Hà Nội', '0943210986', 'thutrang2009@gmail.com', '2024-08-20', 'Cao Văn Phúc', '0956789013'),

('Phan', 'Đình Khôi', '2007-12-05', 'Nam', '43 Âu Cơ, Quận Tây Hồ, Hà Nội', '0932109875', 'dinhkhoi2007@gmail.com', '2024-08-20', 'Phan Thị Vân', '0967890124'),

('Trịnh', 'Ngọc Mai', '2008-03-27', 'Nữ', '65 Phạm Hùng, Quận Nam Từ Liêm, Hà Nội', '0921098764', 'ngocmai2008@gmail.com', '2024-08-20', 'Trịnh Văn Long', '0978901235'),

('Hà', 'Thanh Sơn', '2006-09-13', 'Nam', '87 Lê Văn Lương, Quận Thanh Xuân, Hà Nội', '0910987653', 'thanhson2006@gmail.com', '2024-08-20', 'Hà Thị Kim', '0989012346'),

('Chu', 'Bích Ngọc', '2009-06-02', 'Nữ', '109 Cầu Giấy, Quận Cầu Giấy, Hà Nội', '0909876542', 'bichngoc2009@gmail.com', '2024-08-20', 'Chu Văn Đạt', '0990123457'),

('Võ', 'Minh Đức', '2007-10-19', 'Nam', '131 Nguyễn Xiển, Quận Thanh Xuân, Hà Nội', '0998765431', 'minhduc2007@gmail.com', '2024-08-20', 'Võ Thị Hạnh', '0901234568');

INSERT INTO class_student (class_id, student_id, enrollment_date, status, grade) VALUES
-- Học sinh 1: Nguyễn Minh Anh (2007) - Lớp 11 và 10
(2, 1, '2024-08-20', true, 85),
(1, 1, '2024-09-01', true, 82),
-- Học sinh 2: Trần Đức Nam (2008) - Lớp 10 và 7
(1, 2, '2024-08-20', true, 78),
(5, 2, '2024-08-25', true, 80),
-- Học sinh 3: Lê Thu Hương (2009) - Lớp 6 và 3
(4, 3, '2024-08-20', true, 88),
(7, 3, '2024-08-22', true, 90),
-- Học sinh 4: Phạm Hoàng Long (2006) - Lớp 12 và 11
(3, 4, '2024-08-20', true, 92),
(2, 4, '2024-08-21', true, 89),
-- Học sinh 5: Hoàng Thị Linh (2007) - Lớp 11 và 9
(2, 5, '2024-08-20', true, 86),
(6, 5, '2024-08-23', true, 84),
-- Học sinh 6: Vũ Quang Huy (2008) - Lớp 7 và 10
(5, 6, '2024-08-20', true, 75),
(9, 6, '2024-08-24', true, 77),
-- Học sinh 7: Đặng Khánh Linh (2009) - Lớp 6 và 5
(4, 7, '2024-08-20', true, 91),
(8, 7, '2024-08-21', true, 93),
-- Học sinh 8: Bùi Tuấn Anh (2007) - Lớp 11 và 8 (không hoạt động)
(2, 8, '2024-08-20', true, 83),
(10, 8, '2023-09-01', false, 70),
-- Học sinh 9: Ngô Minh Châu (2008) - Lớp 9 và 7
(6, 9, '2024-08-20', true, 87),
(5, 9, '2024-08-22', true, 85),
-- Học sinh 10: Lý Hải Nam (2006) - Lớp 12 và 10
(3, 10, '2024-08-20', true, 94),
(9, 10, '2024-08-23', true, 91),
-- Học sinh 11: Đinh Thùy Dung (2009) - Lớp 3 và 6
(7, 11, '2024-08-20', true, 89),
(4, 11, '2024-08-24', true, 86),
-- Học sinh 12: Tạ Minh Tú (2007) - Lớp 10 và 11
(9, 12, '2024-08-20', true, 79),
(2, 12, '2024-08-25', true, 81),
-- Học sinh 13: Dương Lan Anh (2008) - Lớp 7 và 9
(5, 13, '2024-08-20', true, 88),
(6, 13, '2024-08-21', true, 90),
-- Học sinh 14: Mai Quốc Anh (2006) - Lớp 12 và 11
(3, 14, '2024-08-20', true, 95),
(2, 14, '2024-08-22', true, 92),
-- Học sinh 15: Cao Thu Trang (2009) - Lớp 5 và 6
(8, 15, '2024-08-20', true, 87),
(4, 15, '2024-08-23', true, 85),
-- Học sinh 16: Phan Đình Khôi (2007) - Lớp 11 và 10
(2, 16, '2024-08-20', true, 84),
(1, 16, '2024-08-24', true, 82),
-- Học sinh 17: Trịnh Ngọc Mai (2008) - Lớp 10 và 9
(1, 17, '2024-08-20', true, 86),
(6, 17, '2024-08-25', true, 88),
-- Học sinh 18: Hà Thanh Sơn (2006) - Lớp 12 và 10
(3, 18, '2024-08-20', true, 93),
(9, 18, '2024-08-21', true, 90),
-- Học sinh 19: Chu Bích Ngọc (2009) - Lớp 6 và 3
(4, 19, '2024-08-20', true, 90),
(7, 19, '2024-08-22', true, 92),
-- Học sinh 20: Võ Minh Đức (2007) - Lớp 11 và 8 (không hoạt động)
(2, 20, '2024-08-20', true, 85),
(10, 20, '2023-09-01', false, 72),
-- Thêm một số học sinh vào lớp thứ 3 để đa dạng hóa
(7, 1, '2024-09-05', true, 87),  -- Nguyễn Minh Anh thêm lớp 3
(8, 4, '2024-09-02', true, 91),  -- Phạm Hoàng Long thêm lớp 5
(4, 10, '2024-09-03', true, 89), -- Lý Hải Nam thêm lớp 6
(9, 14, '2024-09-04', true, 93), -- Mai Quốc Anh thêm lớp 10
(1, 18, '2024-09-06', true, 88); -- Hà Thanh Sơn thêm lớp 10A1

-- Câu 5: Thêm trường description vào bảng school
ALTER TABLE school ADD COLUMN description TEXT;

-- Câu 6: Thêm trường special_needs vào bảng student
ALTER TABLE student ADD COLUMN special_needs BOOLEAN DEFAULT false;

-- Câu 7: Thêm trường attendance_rate vào bảng class_student
ALTER TABLE class_student ADD COLUMN attendance_rate DECIMAL(5,2);

-- Câu 8: Thêm 5 trường học (đã có sẵn)

-- Câu 9: Thêm 10 lớp học (đã có sẵn)

-- Câu 10: Thêm 20 học sinh (đã có sẵn)

-- Câu 11: Thêm dữ liệu class_student (đã có sẵn)

-- Câu 12: Cập nhật tên hiệu trưởng
UPDATE school SET principal_name = 'Phạm Thị Minh Hạnh' WHERE id = 1;

-- Câu 13: Cập nhật trạng thái lớp học
UPDATE class SET is_active = true WHERE school_id = 1;

-- Câu 14: Cập nhật điểm số học sinh
UPDATE class_student SET grade = 89 WHERE id = 1;

-- Câu 15: Cập nhật thông tin liên hệ học sinh 🔧 ĐÃ SỬA
UPDATE student SET 
    phone = '0999888777', 
    email = 'updated@gmail.com' 
WHERE date_of_birth < '2010-01-01';

-- Câu 16: Danh sách trường theo năm thành lập
SELECT * FROM school ORDER BY founding_year;

-- Câu 17: Lớp học đang hoạt động
SELECT * FROM class WHERE school_id = 1 AND is_active = true;

-- Câu 18: Học sinh sinh 2005-2010
SELECT * FROM student 
WHERE date_of_birth BETWEEN '2005-01-01' AND '2010-12-31' 
ORDER BY date_of_birth;

-- Câu 19: JOIN lớp học và trường học
SELECT class.id, class.name, school.id, school.name 
FROM class 
JOIN school ON class.school_id = school.id;

-- Câu 20: Đếm lớp học trong mỗi trường
SELECT school.id, school.name, COUNT(class.id) AS total_class 
FROM school 
LEFT JOIN class ON school.id = class.school_id 
GROUP BY school.id, school.name;

-- Câu 21: Học sinh và lớp học tham gia
SELECT student.id, student.first_name, student.last_name, COUNT(*) AS total_class 
FROM student 
JOIN class_student ON student.id = class_student.student_id 
JOIN class ON class_student.class_id = class.id 
GROUP BY student.id, student.first_name, student.last_name;

-- Câu 22: Lớp có hơn 5 học sinh
SELECT class.id, class.name, COUNT(*) AS total_student 
FROM class 
JOIN class_student ON class_student.class_id = class.id 
JOIN student ON student.id = class_student.student_id 
GROUP BY class.id, class.name 
HAVING COUNT(*) > 5 
ORDER BY COUNT(*) DESC;

-- Câu 23: Điểm trung bình trên 7.5
SELECT 
    class.id, 
    class.name, 
    COUNT(*) AS total_student, 
    SUM(class_student.grade) AS total_grade,
    ROUND(AVG(class_student.grade), 2) AS average_grade   
FROM class 
JOIN class_student ON class_student.class_id = class.id 
JOIN student ON student.id = class_student.student_id   
GROUP BY class.id, class.name 
HAVING AVG(class_student.grade) > 75 
ORDER BY average_grade DESC;

-- Câu 24: Trường có ít nhất 3 lớp
SELECT school.id, school.name, COUNT(*) AS total_class 
FROM school 
LEFT JOIN class ON school.id = class.school_id 
GROUP BY school.id, school.name 
HAVING COUNT(*) >= 3 
ORDER BY COUNT(*) DESC;

-- Câu 25: JSON_AGG trường và lớp 
SELECT 
    school.id, 
    school.name, 
    COUNT(class.id) AS total_class, 
    JSON_AGG(
        CASE 
            WHEN class.id IS NOT NULL THEN
                jsonb_build_object(
                    'id', class.id,
                    'name', class.name
                )
            ELSE NULL
        END
    ) AS classes 
FROM school 
LEFT JOIN class ON school.id = class.school_id 
GROUP BY school.id, school.name;

-- Câu 26: JSON_AGG lớp và học sinh 
SELECT 
    class.id, 
    class.name, 
    COUNT(*) AS total_student, 
    JSON_AGG(
        jsonb_build_object(
            'id', student.id,
            'first_name', student.first_name,
            'last_name', student.last_name
        )
    ) AS students
FROM class 
JOIN class_student ON class_student.class_id = class.id 
JOIN student ON student.id = class_student.student_id 
GROUP BY class.id, class.name;

-- Câu 27: JSON lồng nhau 
SELECT 
    school.id, 
    school.name, 
    COUNT(class.id) AS total_class,
    JSON_AGG(
        CASE 
            WHEN class.id IS NOT NULL THEN
                jsonb_build_object(
                    'class_id', class.id,
                    'class_name', class.name,
                    'class_students', (
                        SELECT JSON_AGG(
                            jsonb_build_object(
                                'id', student.id,
                                'first_name', student.first_name,
                                'last_name', student.last_name
                            )
                        )
                        FROM class_student 
                        JOIN student ON class_student.student_id = student.id
                        WHERE class_student.class_id = class.id
                    )
                )
            ELSE NULL
        END
    ) AS classes
FROM school 
LEFT JOIN class ON school.id = class.school_id
GROUP BY school.id, school.name;

-- Câu 28: Học sinh tham gia ít nhất 3 lớp 
SELECT 
    student.id, 
    student.first_name, 
    student.last_name, 
    COUNT(*) AS total_class 
FROM student 
JOIN class_student ON student.id = class_student.student_id 
JOIN class ON class_student.class_id = class.id 
GROUP BY student.id, student.first_name, student.last_name 
HAVING COUNT(*) >= 3 
ORDER BY COUNT(*) DESC;

-- Câu 29: Lớp có điểm trung bình cao nhất trong mỗi trường
WITH class_averages AS (
    SELECT 
        class.id AS class_id,
        class.name AS class_name,
        class.school_id,
        school.name AS school_name,
        ROUND(AVG(class_student.grade), 2) AS average_grade
    FROM class 
    JOIN class_student ON class_student.class_id = class.id 
    JOIN student ON student.id = class_student.student_id
    JOIN school ON school.id = class.school_id
    GROUP BY class.id, class.name, class.school_id, school.name
),
max_averages AS (
    SELECT 
        school_id,
        MAX(average_grade) AS max_average_grade
    FROM class_averages
    GROUP BY school_id
)
SELECT 
    ca.school_id,
    ca.school_name,
    ca.class_id,
    ca.class_name,
    ca.average_grade
FROM class_averages ca
JOIN max_averages ma ON ca.school_id = ma.school_id 
    AND ca.average_grade = ma.max_average_grade
ORDER BY ca.average_grade DESC;

-- Câu 30: Top 5 học sinh điểm cao nhất
SELECT
    s.id,
    s.first_name || ' ' || s.last_name AS student_name,
    COUNT(cs.class_id) AS total_classes,
    ROUND(AVG(cs.grade), 2) AS average_grade
FROM student s
JOIN class_student cs ON cs.student_id = s.id
GROUP BY s.id, s.first_name, s.last_name
ORDER BY average_grade DESC
LIMIT 5;
