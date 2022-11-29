-- migrate:up
CREATE TABLE project_types(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    type varchar(100) NOT NULL
);

-- migrate:down
DROP TABLE project_types;
