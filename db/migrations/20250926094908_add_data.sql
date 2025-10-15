-- migrate:up
INSERT INTO USERS (name, email, phone_number, password) VALUES ('admin', 'admin@gmail.com', '1234567890', '$2b$10$A3JmW6u73jbUNH8eWrzgwen0voYk5DMD1SOwE/qM38.4.qFw.HOb2');


INSERT INTO PERMISSIONS (title, description) 
VALUES ('client.read', 'Read Clients'),
('client.create', 'Create Clients'),
('client.update', 'Update Clients'),
('client.delete', 'Delete Clients'),
('vendor.read', 'Read Vendors'),
('vendor.create', 'Create Vendors'),
('vendor.update', 'Update Vendors'),
('vendor.delete', 'Delete Vendors'),
('event.read', 'Read Event'),
('event.create', 'Create Events'),
('event.update', 'Update Events'),
('event.delete', 'Delete Events'),
('expense.read', 'Read Expenses'),
('expense.create', 'Create Expenses'),
('expense.update', 'Update Expenses'),
('expense.delete', 'Delete Expenses'),
('payment.read', 'Read Payments'),
('payment.create', 'Create Payments'),
('payment.update', 'Update Payments'),
('payment.delete', 'Delete Payments'),
('reminder.read', 'Read Reminders'),
('reminder.create', 'Create Reminders'),
('reminder.update', 'Update Reminders'),
('reminder.delete', 'Delete Reminders');


-- migrate:down


