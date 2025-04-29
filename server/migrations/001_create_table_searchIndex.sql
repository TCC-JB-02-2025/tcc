-- Down
DROP TABLE IF EXISTS Teste;


-- Up
CREATE TABLE searchIndex (
    index_id INT AUTO_INCREMENT PRIMARY KEY, -- Unique ID for each entry in the search index
    search_text TEXT, -- The text content to be searched (e.g., name, description)
    item_type VARCHAR(50) NOT NULL, -- The type of the item (e.g., 'Pessoa', 'Produto')
    item_id INT NOT NULL, -- The ID linking to the original item in its respective table

    -- Add indexes for faster lookups
    INDEX idx_item_type (item_type),
    INDEX idx_item_id (item_id),
    INDEX idx_item_type_id (item_type, item_id), -- Useful if querying by type and id

    -- Add a FULLTEXT index on search_text for efficient text searching
    FULLTEXT KEY ft_search_text (search_text)
);

SELECT *
FROM searchIndex
WHERE MATCH (search_text) AGAINST ('joao' IN BOOLEAN MODE);