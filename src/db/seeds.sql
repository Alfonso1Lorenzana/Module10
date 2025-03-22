
insert into department (name)
values ('Sales'),
    ('Legal'),
    ('Finance');



insert into role (title, salary, department_id)
values ('Salesperson', 10000, 1),
 ('Sales Professional', 10000, 1),
 ('Sales Manager', 10000, 1),
 ('Attorney', 20000, 2),
 ('Finance Rep', 60000, 3),
 ('Accountant', 80000, 3);



insert into employee (first_name, last_name, role_id, manager_id)
values ('Alfonso', 'Alfonso', 3, null),
('Guru', 'Raj', 2, 1),
('Cheney', 'Marco', 1, null);


