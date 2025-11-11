-- Assessment
-- ------------------------------ 1. Data Validation Checks ---------------------------------------------------
-- 🔹 Verify if a newly registered user exists in the users table.
select * from users;
select * from users where phone_number =+1111111111;
-- 🔹 Check if every contact_id in contacts exists in the users table.
select c.user_id , c.contact_id from contacts c left join users u on c.contact_id= u.user_id where u.user_id is null;

-- ------------------------------- 2. Data Integrity Testing -------------------------------------------------

-- 🔹 Check for duplicate phone numbers in the users table.
select phone_number, count(phone_number) from users group by phone_number having count(phone_number)>1;

-- 🔹 Validate Foreign Key Integrity: Find group members who don’t have an entry in the users table.
select * from group_members;
select gm.group_id,gm.user_id FROM group_members gm LEFT JOIN users u ON gm.user_id = u.user_id where u.user_id is null;
 	
-- 🔹 Verify if an ON DELETE CASCADE is working for contacts.
START TRANSACTION;
DELETE FROM users WHERE user_id = 1;
SELECT * FROM contacts WHERE user_id = 1 OR contact_id = 1;
ROLLBACK;
COMMIT;

-- --------------------------- 3. Indexing & Performance Testing --------------------------------
-- 🔹 Check if an index exists on user_id in users.
-- why? Instead of scanning every single row in a table to find what you need, MySQL uses the index to jump straight to the matching rows. 
SHOW INDEXES FROM users;
CREATE INDEX idx_created_at ON users(created_at);

-- ---------------------------- 4. ACID Compliance Testing --------------------------
-- 🔹 Start a transaction, update a chat message, then roll back.
start transaction;
select * from chats;
update chats set message="Hey Bob!, lets ." where chat_id =1;
rollback;
commit;
SELECT message FROM chats WHERE chat_id = 1;

-- 5. CRUD Operation Testing
select * from chats;
START TRANSACTION;
-- 🔹 Insert a new message in chats.
insert into chats(sender_id,receiver_id, message) value(1,2,"testing cascade delete!");
-- 🔹 Verify the insertion.
select * from chats where message="testing cascade delete!";
-- 🔹 Delete a user and check if their messages are deleted.
START TRANSACTION;
DELETE FROM users WHERE user_id = 1;
select * from chats where sender_id=1 or receiver_id =1;
rollback;
commit;

-- 6. Stored Procedures & Triggers Testing
-- 🔹 Check if a trigger prevents inserting an empty message.
select * from chats;
delimiter //
create trigger prevent_empty_message
before insert on chats
for each row
begin
if trim(new.message)='' then
   signal sqlstate'45000'
   SET MESSAGE_TEXT = 'Error: Cannot insert an empty message.';
end if;
end
//
delimiter ;

delimiter //
create procedure insert_chat_message(
in p_sender_id int,
in p_receiver_id int,
in p_message text
)
begin 
-- Validation: prevent empty messages
    IF TRIM(p_message) = '' THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Error: Message cannot be empty.';
    END IF;
    -- Insert the message
    INSERT INTO chats (sender_id, receiver_id, message)
    VALUES (p_sender_id, p_receiver_id, p_message);
end
//
delimiter ;

INSERT INTO chats (sender_id, receiver_id, message) VALUES (2, 3, ''); -- invalid msg 
INSERT INTO chats (sender_id, receiver_id, message) VALUES (2, 3, 'Hello there!'); -- valid msg

call insert_chat_message(1,2,'');

-- 7. Joins & Relationship Validation
-- 🔹 Find orphaned messages where the sender or receiver doesn’t exist.
select * from chats;
select * from users;

select c.chat_id, c.sender_id,c.receiver_id,c.message,c.sent_at from chats c 
left join users s on c.sender_id =s.user_id
left join users r on c.receiver_id = r.user_id
WHERE s.user_id IS NULL OR r.user_id IS NULL;


-- 🔹 Retrieve the last message in each chat.
SELECT 
    LEAST(sender_id, receiver_id) AS user1,
    GREATEST(sender_id, receiver_id) AS user2,
    MAX(sent_at) AS last_message_time
FROM chats
GROUP BY LEAST(sender_id, receiver_id), GREATEST(sender_id, receiver_id);

-- 8. Boundary Value & Negative Testing
-- 🔹 Try inserting a long username (over 255 characters).
INSERT INTO users (name, phone_number, email)
VALUES (REPEAT('A', 300), '9998887776', 'longname@test.com');

-- 🔹 Test integer overflow in calls.duration.
INSERT INTO calls (caller_id, receiver_id, call_type, duration)
VALUES (1, 2, 'Audio', 2147483647); -- works fine
INSERT INTO calls (caller_id, receiver_id, call_type, duration)
VALUES (1, 2, 'Audio', 2147483648); -- throws error
