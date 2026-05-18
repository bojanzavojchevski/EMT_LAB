insert into countries (name, continent)
values
    ('Macedonia', 'Europe'),
    ('Germany', 'Europe'),
    ('Italy', 'Europe'),
    ('United States', 'North America');

insert into hosts (created_at, updated_at, name, surname, country_id)
values
    (now(), now(), 'Bojan', 'Trajkovski', (select id from countries where name = 'Macedonia')),
    (now(), now(), 'Anna', 'Schmidt', (select id from countries where name = 'Germany')),
    (now(), now(), 'Marco', 'Rossi', (select id from countries where name = 'Italy'));

insert into accommodations (created_at, updated_at, name, category, host_id, num_rooms, condition)
values
    (now(), now(), 'Ohrid Lake Room', 'ROOM', (select id from hosts where name = 'Bojan' and surname = 'Trajkovski'), 2, 'GOOD'),
    (now(), now(), 'Berlin City Flat', 'FLAT', (select id from hosts where name = 'Anna' and surname = 'Schmidt'), 3, 'GOOD'),
    (now(), now(), 'Rome Family Apartment', 'APARTMENT', (select id from hosts where name = 'Marco' and surname = 'Rossi'), 4, 'GOOD'),
    (now(), now(), 'Old Motel Near Highway', 'MOTEL', (select id from hosts where name = 'Bojan' and surname = 'Trajkovski'), 1, 'BAD');