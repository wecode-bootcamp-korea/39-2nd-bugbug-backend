-- migrate:up
CREATE TABLE creators (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id int NOT NULL,
    creator_nickname varchar(100) NOT NULL,
    explanation varchar(300) NOT NULL,
    CONSTRAINT creators_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id)
);

-- migrate:down
DROP TABLE creators;
