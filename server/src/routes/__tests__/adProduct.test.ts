import request from 'supertest';
import app from '../../app';

let companyId = 'UUID-VALIDO-DA-EMPRESA';
let uniqueTitle = `Teste Título Empresa ${Date.now()}`;

beforeAll(async () => {
    const uniqueEmail = `empresa_${Date.now()}@teste.com`;
    const res = await request(app)
        .post('/api/companies')
        .send({ email: uniqueEmail, name: uniqueTitle });
    companyId = res.body.id;
});

describe('AdProduct Endpoints', () => {

    it('GET /api/adProducts deve retornar todos os anúncios', async () => {
        const res = await request(app).get('/api/adProducts');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('POST /api/adProducts deve criar um novo anúncio', async () => {
        const uniqueTitlePost = `Teste POST ${Date.now()}`;
        const newAd = {
            title: uniqueTitlePost,
            price: 102,
            credit_type: "florestal",
            certification_type: "VCS",
            description: "Teste de criação",
            supply: 10,
            batch_discount: 5,
            size_batch: 2,
            verified_stamp: true,
            companyId,
            active: true
        };
        const res = await request(app)
            .post('/api/adProducts')
            .send(newAd);
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.title).toBe(uniqueTitlePost);
    });

    it('GET /api/adProducts/:id deve retornar um anúncio específico', async () => {
        // Cria um anúncio para testar o GET por id
        const uniqueTitleGet = `Teste GET ${Date.now()}`;
        const ad = await request(app).post('/api/adProducts').send({
            title: uniqueTitleGet,
            price: 51,
            credit_type: "florestal",
            certification_type: "VCS",
            description: "Teste GET",
            supply: 5,
            batch_discount: 2,
            size_batch: 1,
            verified_stamp: true,
            companyId,
            active: true
        });
        const id = ad.body.id;
        const res = await request(app).get(`/api/adProducts/${id}`);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('id', id);
    });

    it('PUT /api/adProducts/:id deve atualizar um anúncio', async () => {
        // Cria um anúncio para testar o PUT
        const uniqueTitlePut = `Teste PUT ${Date.now()}`;
        const ad = await request(app).post('/api/adProducts').send({
            title: uniqueTitlePut,
            price: 61,
            credit_type: "florestal",
            certification_type: "VCS",
            description: "Teste PUT",
            supply: 6,
            batch_discount: 3,
            size_batch: 2,
            verified_stamp: true,
            companyId,
            active: false
        });
        const id = ad.body.id;
        const res = await request(app)
            .put(`/api/adProducts/${id}`)
            .send({ price: 200 });
        expect(res.status).toBe(200);
        expect(res.body.price).toBe(200);
    });

    it('DELETE /api/adProducts/:id deve excluir um anúncio', async () => {
        // Cria um anúncio para testar o DELETE
        const uniqueTitleDelete = `Teste DELETE ${Date.now()}`;
        const ad = await request(app).post('/api/adProducts').send({
            title: uniqueTitleDelete,
            price: 71,
            credit_type: "florestal",
            certification_type: "VCS",
            description: "Teste DELETE",
            supply: 7,
            batch_discount: 4,
            size_batch: 3,
            verified_stamp: true,
            companyId,
            active: true
        });
        const id = ad.body.id;
        const res = await request(app).delete(`/api/adProducts/${id}`);
        expect(res.status).toBe(204);
    });
});