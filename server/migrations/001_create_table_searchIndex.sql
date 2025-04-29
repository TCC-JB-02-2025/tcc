-- Down
DROP TABLE IF EXISTS searchIndex; -- Add semicolon here!

-- Up
CREATE TABLE searchIndex (
    index_id INT AUTO_INCREMENT PRIMARY KEY, -- ID único para cada entrada no índice de busca
    search_text TEXT, -- O conteúdo de texto a ser buscado (ex: nome, descrição)
    item_type VARCHAR(50) NOT NULL, -- O tipo do item (ex: 'Pessoa', 'Produto')
    item_id INT NOT NULL, -- O ID que liga ao item original em sua respectiva tabela

    -- Adiciona índices para buscas mais rápidas
    INDEX idx_item_type (item_type),
    INDEX idx_item_id (item_id),
    INDEX idx_item_type_id (item_type, item_id), -- Útil se buscando por tipo e id

    -- Adiciona um índice FULLTEXT em search_text para busca de texto eficiente
    FULLTEXT KEY ft_search_text (search_text)
);

/* EXEMPLO DE COMO FAZER SELECT COM ISSO
SELECT *
FROM searchIndex
WHERE MATCH (search_text) AGAINST ('joao' IN BOOLEAN MODE); -- Seleciona entradas onde o texto de busca corresponde a 'joao' (usando modo booleano para busca FULLTEXT)
*/