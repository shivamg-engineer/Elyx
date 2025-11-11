use WhatsappDB;
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE contacts (
    user_id INT,
    contact_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id) on delete cascade,
    FOREIGN KEY (contact_id) REFERENCES users(user_id) on delete cascade
);

CREATE TABLE chats (
    chat_id INT PRIMARY KEY AUTO_INCREMENT,
    sender_id INT,
    receiver_id INT,
    message TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(user_id) on delete cascade,
    FOREIGN KEY (receiver_id) REFERENCES users(user_id)on delete cascade
);

CREATE TABLE groupss (
    group_id INT PRIMARY KEY AUTO_INCREMENT,
    group_name VARCHAR(255) NOT NULL,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(user_id) on delete cascade
);
CREATE TABLE group_members (
    group_id INT,
    user_id INT,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (group_id) REFERENCES groupss(group_id) on delete cascade,
    FOREIGN KEY (user_id) REFERENCES users(user_id) on delete cascade
);

CREATE TABLE group_messages (
    message_id INT PRIMARY KEY AUTO_INCREMENT,
    group_id INT,
    sender_id INT,
    message TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (group_id) REFERENCES groupss(group_id) on delete cascade,
    FOREIGN KEY (sender_id) REFERENCES users(user_id) on delete cascade
);
CREATE TABLE calls (
    call_id INT PRIMARY KEY AUTO_INCREMENT,
    caller_id INT,
    receiver_id INT,
    call_type ENUM('Audio', 'Video'),
    duration INT,  -- in seconds
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (caller_id) REFERENCES users(user_id) on delete cascade,
    FOREIGN KEY (receiver_id) REFERENCES users(user_id) on delete cascade
);
CREATE TABLE media (
    media_id INT PRIMARY KEY AUTO_INCREMENT,
    sender_id INT,
    receiver_id INT,
    media_type ENUM('Image', 'Video', 'Audio', 'Document'),
    file_path VARCHAR(255) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(user_id) on delete cascade,
    FOREIGN KEY (receiver_id) REFERENCES users(user_id) on delete cascade
);
CREATE TABLE status_updates (
    status_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    status_text TEXT,
    media_id INT NULL,
    posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) on delete cascade,
    FOREIGN KEY (media_id) REFERENCES media(media_id)on delete cascade
);

-- Disable foreign key checks to avoid dependency errors
SET FOREIGN_KEY_CHECKS = 0;

-- Drop all tables (reverse dependency order)
DROP TABLE IF EXISTS status_updates;
DROP TABLE IF EXISTS media;
DROP TABLE IF EXISTS calls;
DROP TABLE IF EXISTS group_messages;
DROP TABLE IF EXISTS group_members;
DROP TABLE IF EXISTS groupss;
DROP TABLE IF EXISTS chats;
DROP TABLE IF EXISTS contacts;
DROP TABLE IF EXISTS users;

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;