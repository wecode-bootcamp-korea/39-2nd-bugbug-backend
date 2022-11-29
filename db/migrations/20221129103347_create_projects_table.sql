-- migrate:up
CREATE TABLE projects (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    type_id INT NOT NULL,
    name varchar(100) NOT NULL,
    img_url varchar(300) NOT NULL,
    summary varchar(300) NOT NULL,
    story varchar(2000) NOT NULL,
    gift decimal(9,2) NOT NULL,
    gift_information varchar(300) NOT NULL,
    target_amount decimal(11,2),
    opening TIMESTAMP NOT NULL,
    deadline TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT projects_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT projects_type_id_fkey FOREIGN KEY (type_id) REFERENCES project_types(id)
);

-- migrate:down
DROP TABLE projects;
