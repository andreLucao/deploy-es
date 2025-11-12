import prisma from "../config/database";

export class ReportService {
    async getAll(companyId: string) {
        return await prisma.report.findMany({
            where: { companyId },
            orderBy: { createdAt: "desc" },
        });
    }

    async getById(id: string) {
        return await prisma.report.findUnique({ where: { id } });
    }

    async create (data: { companyId: string; title?: string; content: string; url?: string }) {
        return await prisma.report.create({ data });
    }

    async update(id: string, data: { title?: string; content?: string; url?: string}) {
        return await prisma.report.update({ where: { id }, data });
    }

    async delete(id: string) {
        return await prisma.report.delete({ where: { id } });
    }
}