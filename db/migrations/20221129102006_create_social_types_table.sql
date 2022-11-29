-- migrate:up
CREATE TABLE social_types(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    type varchar(100) NOT NULL
);

-- migrate:down
DROP TABLE social_types;
