## **Problem Statement: WhatsApp Database Testing**

### **Scenario:**
You are testing the database of a **WhatsApp-like messaging system** that stores user information, chats, groups, calls, and multimedia content. The database needs to be tested for **data consistency, integrity, performance, and query efficiency**.

---

## **Database Schema**

### **1. users**
Stores registered user information.

```sql
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### **2. contacts**
Stores each user’s contact list.

```sql
CREATE TABLE contacts (
    user_id INT,
    contact_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (contact_id) REFERENCES users(user_id)
);
```

---

### **3. chats**
Stores chat messages between users.

```sql
CREATE TABLE chats (
    chat_id INT PRIMARY KEY AUTO_INCREMENT,
    sender_id INT,
    receiver_id INT,
    message TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(user_id),
    FOREIGN KEY (receiver_id) REFERENCES users(user_id)
);
```

---

### **4. groups**
Stores information about group chats.

```sql
CREATE TABLE groups (
    group_id INT PRIMARY KEY AUTO_INCREMENT,
    group_name VARCHAR(255) NOT NULL,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(user_id)
);
```

---

### **5. group_members**
Stores which users are part of which groups.

```sql
CREATE TABLE group_members (
    group_id INT,
    user_id INT,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (group_id) REFERENCES groups(group_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
```

---

### **6. group_messages**
Stores messages sent in group chats.

```sql
CREATE TABLE group_messages (
    message_id INT PRIMARY KEY AUTO_INCREMENT,
    group_id INT,
    sender_id INT,
    message TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (group_id) REFERENCES groups(group_id),
    FOREIGN KEY (sender_id) REFERENCES users(user_id)
);
```

---

### **7. calls**
Stores call details.

```sql
CREATE TABLE calls (
    call_id INT PRIMARY KEY AUTO_INCREMENT,
    caller_id INT,
    receiver_id INT,
    call_type ENUM('Audio', 'Video'),
    duration INT,  -- in seconds
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (caller_id) REFERENCES users(user_id),
    FOREIGN KEY (receiver_id) REFERENCES users(user_id)
);
```

---

### **8. media**
Stores multimedia messages such as images, videos, and documents.

```sql
CREATE TABLE media (
    media_id INT PRIMARY KEY AUTO_INCREMENT,
    sender_id INT,
    receiver_id INT,
    media_type ENUM('Image', 'Video', 'Audio', 'Document'),
    file_path VARCHAR(255) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(user_id),
    FOREIGN KEY (receiver_id) REFERENCES users(user_id)
);
```

---

### **9. status_updates**
Stores status updates posted by users.

```sql
CREATE TABLE status_updates (
    status_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    status_text TEXT,
    media_id INT NULL,
    posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (media_id) REFERENCES media(media_id)
);
```

---

## **WhatsApp Database Testing - SQL Queries**

### **1. Data Validation Checks**
🔹 Verify if a newly registered user exists in the `users` table.


🔹 Check if every `contact_id` in `contacts` exists in the `users` table.


---

### **2. Data Integrity Testing**
🔹 Check for duplicate phone numbers in the `users` table.

🔹 Validate **Foreign Key Integrity**: Find group members who don’t have an entry in the `users` table.


🔹 Verify if an **ON DELETE CASCADE** is working for `contacts`.

---

### **3. Indexing & Performance Testing**
🔹 Check if an index exists on `user_id` in `users`.

---

### **4. ACID Compliance Testing**
🔹 Start a transaction, update a chat message, then roll back.



---

### **5. CRUD Operation Testing**
🔹 Insert a new message in `chats`.


🔹 Verify the insertion.


🔹 Delete a user and check if their messages are deleted.


---

### **6. Stored Procedures & Triggers Testing**
🔹 Check if a trigger prevents inserting an empty message.


---

### **7. Joins & Relationship Validation**
🔹 Find **orphaned messages** where the sender or receiver doesn’t exist.

🔹 Retrieve the **last message in each chat**.

---

### **8. Boundary Value & Negative Testing**
🔹 Try inserting a long username (over 255 characters).
🔹 Test **integer overflow** in `calls.duration`.

---

### **9. Security Testing**
🔹 Check if any password is stored in **plain text**.
🔹 Try **SQL Injection** in chat messages.


---

---

## **Tricky SQL Questions to Test Query Writing Abilities**

### **1. Identify Most Active Users**
Find the top 5 users who have sent the most messages (individual and group combined).

---

### **2. Find Users Who Have Never Sent a Message**
List all users who have never sent a direct or group message.

---

### **3. Find the Longest Call Duration Per User**
Get the longest call duration for each user who has made a call.

---

### **4. Find Groups with No Activity in the Last 30 Days**
Identify groups where no messages were sent in the last 30 days.

---

### **5. Detect Users Who Have Added Themselves as Contacts**
Find users who have their own number in their contact list.


---

### **6. Find the Last Message Sent in Each Chat**
Retrieve the latest message for each chat.


---

### **7. Identify Users Who Have Read a Status Update**
Find users who viewed someone else’s status update.


---