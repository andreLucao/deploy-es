# 🧪 Teste de Autenticação - Correção ID do Usuário

## 🔍 Problema Identificado

**Erro encontrado**: Frontend estava enviando `email` como `companyId` em vez do UUID correto.

**Causa raiz**: 
- Backend cria JWT corretamente com UUID: `d954819d-b694-462c-9096-40bbf154cd96`
- AuthContext tinha fallback que usava `email` como ID quando não conseguia buscar da API
- Endpoint `/api/auth/user` não existia, causando sempre o fallback
- ID errado (`jonaslucasdurao@gmail.com`) era salvo no localStorage
- Calculator enviava esse ID errado para o backend

## ✅ Correções Implementadas

### 1. **AuthContext.tsx** - Corrigido para usar `/api/auth/me`
```typescript
// ANTES: Chamava endpoint inexistente + fallback com email como ID
const response = await fetch(`${API_URL}/api/auth/user`, ...);
if (!response.ok) {
  const basicUser = { id: email, email }; // ❌ ERRO
}

// DEPOIS: Chama endpoint correto + sem fallback
const response = await fetch(`${API_URL}/api/auth/me`, ...);
if (!response.ok) {
  throw new Error('Falha na autenticação'); // ✅ Força re-login
}
```

### 2. **auth/verify/page.tsx** - Busca dados do usuário após verificação
```typescript
if (response.ok && data.token && data.user) {
  // Buscar dados completos com UUID correto
  await login(data.user.email); // Chama /api/auth/me
  router.push('/marketplace');
}
```

### 3. **LoginCard.tsx** - Tratamento de erro gracioso
```typescript
try {
  await login(email);
} catch (loginError) {
  // Ignora erro - usuário precisa clicar no link do email primeiro
}
```

## 🚀 Como Testar

### Passo 1: Limpar Dados Antigos
Abra o DevTools do navegador (F12) e execute no Console:
```javascript
localStorage.clear();
```

### Passo 2: Fazer Logout (se necessário)
Se estiver logado, clique em "Sair" ou execute:
```javascript
// No Console do navegador
localStorage.removeItem('user');
location.reload();
```

### Passo 3: Testar Fluxo Completo de Login

1. **Ir para página de login**: `http://localhost:3000/login`
2. **Inserir email**: `jonaslucasdurao@gmail.com`
3. **Verificar email**: Abrir email e clicar no link mágico
4. **Após redirecionamento**: Verificar no Console do navegador:
   ```
   ✅ Login bem-sucedido com ID correto: d954819d-b694-462c-9096-40bbf154cd96
   ```

### Passo 4: Verificar localStorage
No Console do navegador:
```javascript
JSON.parse(localStorage.getItem('user'))
// Deve retornar:
// {
//   id: "d954819d-b694-462c-9096-40bbf154cd96",  ✅ UUID correto
//   email: "jonaslucasdurao@gmail.com"
// }
```

### Passo 5: Testar Calculadora

1. **Ir para calculadora**: `http://localhost:3000/calculator`
2. **Preencher formulário**:
   - Ano: `2024`
   - Escopo 1: Inserir dados de combustão
   - Escopo 2: Inserir dados de energia
   - Escopo 3: Inserir dados de transporte
3. **Clicar em "Finalizar Cálculo"**
4. **Verificar logs do backend**:
   ```
   ✅ Calculando emissões para empresa: d954819d-b694-462c-9096-40bbf154cd96
   ✅ Inventário salvo com sucesso
   ```

### Passo 6: Verificar no Prisma Studio

1. **Abrir Prisma Studio**: `http://localhost:5555`
2. **Ir para tabela `EmissionInventory`**
3. **Verificar registro criado**:
   - `company_id`: `d954819d-b694-462c-9096-40bbf154cd96` ✅
   - `year`: `2024`
4. **Ir para tabela `Emission`**
5. **Verificar emissões vinculadas ao inventário correto**

## 🔄 Fluxo de Autenticação Corrigido

```
1. Usuário entra em /login
   └─> Digita email
   
2. Backend envia magic link
   └─> Email com token único
   
3. Usuário clica no link
   └─> Redireciona para /auth/verify?token=XXX&email=YYY
   
4. /auth/verify chama backend
   └─> GET /api/auth/verify?token=XXX&email=YYY
   
5. Backend valida token
   ├─> Busca company no banco pelo email
   ├─> Cria JWT com { id: company.id, email: company.email }
   └─> Define cookie 'authToken' com JWT (httpOnly)
   
6. Frontend chama login(email)
   └─> GET /api/auth/me (envia cookie automaticamente)
   
7. Backend lê cookie authToken
   ├─> Decodifica JWT
   ├─> Valida assinatura
   └─> Retorna { user: { id: "UUID", email: "..." } }
   
8. Frontend salva no AuthContext + localStorage
   └─> user = { id: "UUID correto", email: "..." }
   
9. CalculatorForm usa user.id do AuthContext
   └─> POST /api/calculator/save com companyId = UUID correto ✅
```

## 📋 Checklist de Validação

- [ ] localStorage limpo (sem dados antigos)
- [ ] Login via magic link funcionando
- [ ] Console mostra "Login bem-sucedido com ID correto: UUID"
- [ ] localStorage.user.id é um UUID válido (não é email)
- [ ] Calculadora aceita dados sem erro
- [ ] Backend logs mostram UUID correto sendo usado
- [ ] Prisma Studio mostra EmissionInventory com company_id correto
- [ ] Emissions vinculadas ao inventoryId correto

## 🐛 Troubleshooting

### Problema: Ainda mostra erro "Empresa com ID jonaslucasdurao@gmail.com não encontrada"
**Solução**: 
1. Limpar localStorage: `localStorage.clear()`
2. Fazer logout completo
3. Fechar todas as abas do navegador
4. Fazer login novamente do zero

### Problema: AuthContext não carrega usuário
**Solução**:
1. Verificar se backend está rodando: `http://localhost:5000`
2. Verificar se cookie 'authToken' está presente (DevTools > Application > Cookies)
3. Verificar console do navegador por erros de CORS

### Problema: Cookie não está sendo enviado
**Solução**:
1. Verificar que `credentials: 'include'` está no fetch
2. Verificar CORS no backend permite credentials
3. Frontend e Backend devem estar no mesmo domínio (localhost)

## 📊 Endpoints Relevantes

| Endpoint | Método | Descrição | Autenticação |
|----------|---------|-----------|--------------|
| `/api/auth/magic-link` | POST | Envia email com link | Não |
| `/api/auth/verify` | GET | Valida token e cria JWT | Token query param |
| `/api/auth/me` | GET | Retorna usuário autenticado | Cookie JWT |
| `/api/calculator/save` | POST | Salva inventário de emissões | Cookie JWT |

## ✨ Resultado Esperado

Após todas as correções:
- ✅ Login via magic link funciona perfeitamente
- ✅ UUID correto é armazenado no frontend
- ✅ Calculadora salva inventário vinculado à empresa correta
- ✅ Dados visíveis no Prisma Studio com relações corretas
- ✅ Não há mais empresas duplicadas ou IDs aleatórios
