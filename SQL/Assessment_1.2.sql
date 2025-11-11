-- Tricky SQL Questions to Test Query Writing Abilities
-- 1. Identify Most Active Users
-- Find the top 5 users who have sent the most messages (individual and group combined).

select u.user_id,name , COUNT(*) AS total_messages
from (
  SELECT sender_id FROM chats
    UNION ALL
    SELECT sender_id FROM group_messages
)AS all_messages
JOIN users u ON u.user_id = all_messages.sender_id
GROUP BY u.user_id, u.name
ORDER BY total_messages DESC
LIMIT 5;

-- 2. Find Users Who Have Never Sent a Message
-- List all users who have never sent a direct or group message.
select * from users where user_id not in(
select sender_id from chats
union
select sender_id from group_messages
);

-- 3. Find the Longest Call Duration Per User
-- Get the longest call duration for each user who has made a call.
select * from calls;
select caller_id ,max(duration) as longest_call_duration
from calls
group by caller_id;

-- 4. Find Groups with No Activity in the Last 30 Days
-- Identify groups where no messages were sent in the last 30 days.
select g.group_id,
g.group_name, gm.last_message_time
from groupss g
left join(
select group_id, max(sent_at) as last_message_time
from group_messages group by group_id
) gm ON g.group_id = gm.group_id
where gm.last_message_time is null 
or gm.last_message_time < now() - interval 30 day;

-- 5. Detect Users Who Have Added Themselves as Contacts
-- Find users who have their own number in their contact list.
select u.user_id, u.name
from contacts c 
join users u on u.user_id=c.user_id
where c.user_id=c.contacts_id;

-- 6. Find the Last Message Sent in Each Chat
-- Retrieve the latest message for each chat.
SELECT 
    LEAST(sender_id, receiver_id) AS user1,
    GREATEST(sender_id, receiver_id) AS user2,
    MAX(sent_at) AS last_message_time
FROM chats
GROUP BY LEAST(sender_id, receiver_id), GREATEST(sender_id, receiver_id);

-- 7. Identify Users Who Have Read a Status Update
-- Find users who viewed someone else’s status update.
CREATE TABLE status_views (
    status_id INT,
    viewer_id INT,
    viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (status_id) REFERENCES status_updates(status_id) on delete cascade,
    FOREIGN KEY (viewer_id) REFERENCES users(user_id) on delete cascade
);
INSERT INTO status_views (status_id, viewer_id, viewed_at) VALUES
-- Alice’s status (1) viewed by Bob and Charlie
(1, 2, '2025-11-08 09:30:00'),
(1, 3, '2025-11-08 09:45:00'),

-- Bob’s status (2) viewed by Alice and Eve
(2, 1, '2025-11-08 10:15:00'),
(2, 5, '2025-11-08 10:25:00'),

-- Charlie’s status (3) viewed by Alice and David
(3, 1, '2025-11-08 11:10:00'),
(3, 4, '2025-11-08 11:15:00'),

-- David’s status (4) viewed by Bob
(4, 2, '2025-11-08 12:20:00'),

-- Eve’s status (5) viewed by Charlie
(5, 3, '2025-11-08 13:20:00');

select distinct v.viewer_id, viewer.name as viewer_name
from status_views v
join status_updates s on v.status_id =s.status_id
join users viewer on v.viewer_id = viewer.user_id
WHERE v.viewer_id <> s.user_id;
