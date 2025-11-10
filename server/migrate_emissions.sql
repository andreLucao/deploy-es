-- Remover colunas antigas
ALTER TABLE emissions DROP COLUMN IF EXISTS emission_product_id;
ALTER TABLE emissions DROP COLUMN IF EXISTS emission_type;
ALTER TABLE emissions DROP COLUMN IF EXISTS form_data;
ALTER TABLE emissions DROP COLUMN IF EXISTS quantity;
ALTER TABLE emissions DROP COLUMN IF EXISTS calculated_co2e;
ALTER TABLE emissions DROP COLUMN IF EXISTS registered_at;

-- Adicionar novas colunas
ALTER TABLE emissions ADD COLUMN IF NOT EXISTS emissions_data JSONB NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE emissions ADD COLUMN IF NOT EXISTS total_co2e DOUBLE PRECISION NOT NULL DEFAULT 0;
ALTER TABLE emissions ADD COLUMN IF NOT EXISTS emissions_count INTEGER NOT NULL DEFAULT 0;

-- Remover constraint antiga se existir
ALTER TABLE emissions DROP CONSTRAINT IF EXISTS emissions_inventory_id_emission_product_id_key;

-- Adicionar nova constraint única
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'emissions_inventory_id_scope_key'
    ) THEN
        ALTER TABLE emissions ADD CONSTRAINT emissions_inventory_id_scope_key UNIQUE (inventory_id, scope);
    END IF;
END $$;
