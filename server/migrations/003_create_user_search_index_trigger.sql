-- Down
-- Remove todos os triggers relacionados à tabela User, caso existam
DROP TRIGGER IF EXISTS after_user_insert_add_to_search_index;
DROP TRIGGER IF EXISTS after_user_update_update_search_index;
DROP TRIGGER IF EXISTS after_user_delete_remove_from_search_index; -- Boa prática: remover entradas do índice ao deletar o usuário

-- Up
-- Trigger para INSERT: Adiciona um novo usuário ao índice de busca
CREATE TRIGGER after_user_insert_add_to_search_index
AFTER INSERT ON User
FOR EACH ROW
BEGIN 
    -- NEW é a nova linha adicionada à tabela User
    -- NEW.full_name e NEW.user_id são os valores da nova linha
    -- 'User' é o tipo de item constante indicando que é um usuário
    INSERT INTO searchIndex (search_text, item_type, item_id)
    VALUES (NEW.full_name, 'User', NEW.user_id);
END;

-- Trigger para UPDATE: Atualiza o índice de busca quando o nome completo do usuário muda
-- Executa após uma linha ser atualizada na tabela 'User'
CREATE TRIGGER after_user_update_update_search_index
AFTER UPDATE ON User
FOR EACH ROW
BEGIN
    -- Verifica se o nome completo (o texto pesquisável) realmente mudou
    IF OLD.full_name <> NEW.full_name THEN
        -- Encontra a entrada correspondente em searchIndex e atualiza seu search_text
        UPDATE searchIndex
        SET search_text = NEW.full_name
        WHERE item_type = 'User' AND item_id = NEW.user_id;
    END IF;
END;

-- Trigger para DELETE: Remove um usuário do índice de busca quando ele é deletado
-- Isso garante que o índice de busca não contenha entradas para itens inexistentes
-- Executa após uma linha ser deletada da tabela 'User'
CREATE TRIGGER after_user_delete_remove_from_search_index
AFTER DELETE ON User
FOR EACH ROW
BEGIN
    -- Remove a entrada de searchIndex correspondente ao usuário deletado
    -- OLD.user_id refere-se ao user_id da linha que foi deletada
    DELETE FROM searchIndex
    WHERE item_type = 'User' AND item_id = OLD.user_id;
END;
