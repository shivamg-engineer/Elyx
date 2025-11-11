SELECT * FROM WhatsappDB.users;
select * from calls;
select * from chats;
select * from contacts;
select * from group_members;
select * from group_messages;
select * from groupss;
select * from media;
select * from status_updates;
select * from users;

insert into users(name,phone_number, email) value("shyam","+1234567890","shyam@gmail.com");
SELECT * FROM users WHERE phone_number = '+1234567890';
delete from users where user_id=1;
drop table users;

-- 1️⃣ Disable foreign key checks to allow truncation
SET FOREIGN_KEY_CHECKS = 0;

-- 2️⃣ Truncate tables (this clears data + resets AUTO_INCREMENT to 1)
TRUNCATE TABLE status_updates;
TRUNCATE TABLE media;
TRUNCATE TABLE calls;
TRUNCATE TABLE group_messages;
TRUNCATE TABLE group_members;
TRUNCATE TABLE groupss;
TRUNCATE TABLE chats;
TRUNCATE TABLE contacts;
TRUNCATE TABLE users;

-- 3️⃣ Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

-- 4️⃣ Insert fresh data — all IDs now start from 1

INSERT INTO users (name, phone_number, email) VALUES
('Alice', '+1111111111', 'alice@example.com'),
('Bob', '+2222222222', 'bob@example.com'),
('Charlie', '+3333333333', 'charlie@example.com'),
('Diana', '+4444444444', 'diana@example.com'),
('Eve', '+5555555555', 'eve@example.com');

INSERT INTO media (sender_id, receiver_id, media_type, file_path) VALUES
(1, 2, 'Image', 'uploads/image1.jpg'),
(2, 1, 'Video', 'uploads/video1.mp4'),
(3, 5, 'Audio', 'uploads/audio1.mp3'),
(4, 2, 'Document', 'uploads/doc1.pdf');

INSERT INTO status_updates (user_id, status_text, media_id) VALUES
(1, 'Feeling great today!', 1),
(2, 'Busy at work.', 2),
(3, 'Chilling with music.', 3),
(4, 'Just uploaded a report.', 4),
(5, 'Weekend vibes!', NULL);

INSERT INTO contacts (user_id, contact_id) VALUES
(1, 2),
(1, 3),
(2, 1),
(2, 4),
(3, 5);

INSERT INTO chats (sender_id, receiver_id, message) VALUES
(1, 2, 'Hey Bob!'),
(2, 1, 'Hey Alice, how are you?'),
(3, 1, 'Hi Alice!'),
(4, 2, 'Meeting at 5?'),
(5, 3, 'Got your message!');

INSERT INTO groupss (group_name, created_by) VALUES
('Friends Group', 1),
('Work Chat', 2);

INSERT INTO group_members (group_id, user_id) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 2),
(2, 4),
(2, 5);

INSERT INTO group_messages (group_id, sender_id, message) VALUES
(1, 1, 'Hello everyone!'),
(1, 2, 'Hey Alice!'),
(1, 3, 'Good morning!'),
(2, 2, 'Team meeting at 3 PM'),
(2, 4, 'Got it!');

INSERT INTO calls (caller_id, receiver_id, call_type, duration) VALUES
(1, 2, 'Audio', 120),
(2, 1, 'Video', 300),
(3, 5, 'Audio', 180),
(4, 2, 'Video', 60);