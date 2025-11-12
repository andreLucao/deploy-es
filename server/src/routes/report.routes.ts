import { Router, Request, Response } from "express";
import { ReportService } from "../services/report.service";

const router = Router();
const reportService = new ReportService();

//Listar relatórios da empresa
router.get("/:companyId", async (req: Request, res: Response) => {
    try {
        const { companyId } = req.params;
        const reports = await reportService.getAll(companyId);
        res.json(reports)
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao listar relatórios." });
    }
});

//Buscar um relatório específico
router.get("/report/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const report = await reportService.getById(id);

        if (!report) {
            return res.status(404).json({ error: "Relatório não encontrado." });
        }

        return res.json(report);
    }
    catch (error) {
        return res.status(500).json({ error: "Erro ao buscar relatório." });
    }
});

//Criar um relatório novo
router.post("/", async (req: Request, res: Response) => {
    try {
        const { companyId, title, content, url } = req.body;
        const report = await reportService.create({ companyId, title, content, url });
        res.status(201).json(report);
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao criar relatório." });
    }
});

//Atualizar um relatório
router.put("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, content, url } = req.body;
        const report = await reportService.update(id, { title, content, url });
        res.json(report);
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao atualizar relatório." });
    }
});

router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await reportService.delete(id);
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao apagar relatório." });
    }
});

export default router;