// src/routes/adProduct.routes.ts
import { Router, Request, Response } from 'express';
import { AdProductService } from '../services/adProduct.service';

const router = Router();
const adProductService = new AdProductService();

// GET /adProducts - Listar todos os anúncios
router.get('/', async (req: Request, res: Response) => {
  try {
    const adProducts = await adProductService.findAll();
    return res.status(200).json(adProducts);
  } catch (error) {
    console.error('Erro ao buscar anúncios:', error);
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
});

// GET /adProducts/:id - Buscar um anúncio específico
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const adProduct = await adProductService.findById(id);
    
    if (!adProduct) {
      return res.status(404).json({ error: 'Anúncio não encontrado' });
    }
    
    return res.status(200).json(adProduct);
  } catch (error) {
    console.error('Erro ao buscar anúncio:', error);
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
});

// POST /adProducts - Criar um novo anúncio
router.post('/', async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const newAdProduct = await adProductService.create(data);
    return res.status(201).json(newAdProduct);
  } catch (error) {
    console.error('Erro ao criar anúncio:', error);
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
});

// PUT /adProducts/:id - Atualizar um anúncio
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    
    const updatedAdProduct = await adProductService.update(id, data);
    return res.status(200).json(updatedAdProduct);
  } catch (error) {
    console.error('Erro ao atualizar anúncio:', error);
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
});

// DELETE /adProducts/:id - Excluir um anúncio
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    await adProductService.delete(id);
    return res.status(204).send();
  } catch (error) {
    console.error('Erro ao excluir anúncio:', error);
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
});

export default router;