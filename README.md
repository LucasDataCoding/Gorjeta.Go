# 💸 Gorjeta.Go
> Uma calculadora de gorjetas moderna, responsiva e integrada a APIs de câmbio em tempo real.

[![Deploy on Vercel](https://vercel.com/button)](https://gorjeta-go.vercel.app/)

**Gorjeta.Go** é uma aplicação web desenvolvida com **Vue 3 + TypeScript** para cálculo inteligente e visual de gorjetas.  
Totalmente reativa, responsiva e com suporte à conversão de moedas em tempo real (USD, EUR → BRL), a interface oferece uma experiência fluida tanto em **desktop quanto mobile**.

👉 Acesse em: [https://gorjeta-go.vercel.app/](https://gorjeta-go.vercel.app/)

---

## ✨ Funcionalidades principais

- 🧮 **Cálculo automático e reativo**: informe o valor da conta, o percentual da gorjeta e o número de pessoas — os resultados são exibidos instantaneamente.
- 💱 **Conversão de moedas**: suporte a **USD** e **EUR**, com conversão dinâmica para **BRL** via [AwesomeAPI](https://docs.awesomeapi.com.br/api-de-moedas).
- 📱 **Layout responsivo e moderno**: pensado para oferecer uma navegação agradável em mobile e desktop.
- 🎨 **UI refinada com ShadCN + TailwindCSS**: componentes reutilizáveis e acessíveis, mantendo consistência visual e performance.
- ⚙️ **Arquitetura baseada em features**: separação clara entre lógica, componentes, serviços e utilitários, facilitando manutenção e escalabilidade.
- 🧪 **Testes unitários com Vitest**: cobertura dos principais cálculos de gorjeta, arredondamentos e integração com taxas de câmbio.

---

## 🧩 Stack técnica

| Categoria                   | Tecnologia                                    |
| --------------------------- | --------------------------------------------- |
| **Framework**               | [Vue 3](https://vuejs.org/) (Composition API) |
| **Linguagem**               | TypeScript                                    |
| **UI/Estilo**               | TailwindCSS + ShadCN + Lucide Icons           |
| **Reatividade utilitária**  | VueUse                                        |
| **HTTP Client**             | Axios                                         |
| **Gerenciamento de estado** | Pinia                                         |
| **Testes unitários**        | Vitest                                        |
| **Build Tool**              | Vite                                          |
| **Deploy**                  | [Vercel](https://vercel.com/)                 |

---

## 🧮 Organização do projeto

A aplicação segue uma estrutura modular baseada em **features**, garantindo clareza e fácil expansão:

```bash
src/
├─ app/                  # Configurações globais, rotas e layout
├─ components/           # Componentes genéricos (base / ui)
├─ features/
│   └─ tip-calculator/   # Feature principal: cálculo de gorjetas
│       ├─ components/   # TipForm, TipDashboard e fields
│       ├─ composables/  # useTipCalculation, useExchangeRate
│       ├─ services/     # Requisições HTTP (AwesomeAPI)
│       └─ utils/        # Helpers de formatação e arredondamento
└─ assets/               # Estilos globais e ícones
```

---

## 🧠 Destaques técnicos

- Utilização da **Composition API** para máxima reatividade e clareza.
- Funções puras e testáveis para cálculos financeiros (`roundMoneyUp`, `useCalculateTipInfos`).
- Estrutura de pastas inspirada em **Clean Architecture / Feature-Based Design**.
- Integração com API externa isolada em `exchangeService.ts`.
- Testes unitários cobrindo regras de negócio e arredondamento monetário.

---

## 🚀 Executar localmente

```bash
# Instalar dependências
npm install

# Rodar em ambiente de desenvolvimento
npm run dev

# Rodar testes unitários
npm run test:unit

# Build de produção
npm run build
```

---

💬 _Desenvolvido com atenção a detalhes e boas práticas de frontend moderno._
