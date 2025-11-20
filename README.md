# 🏠 Casa do Saber

> **Transformando vidas através da educação**

Casa do Saber é um website institucional para uma organização sem fins lucrativos dedicada à educação comunitária. O projeto apresenta uma biblioteca comunitária e programas educativos voltados para crianças e adolescentes.

## 🎯 Sobre o Projeto

Este é um website completo e responsivo desenvolvido com tecnologias web modernas, focado em acessibilidade, performance e experiência do usuário. O site serve como vitrine dos projetos da ONG e portal de cadastro para voluntários.

## ✨ Funcionalidades

### 📄 Páginas
- **Home** (`index.html`) - Apresentação da organização e estatísticas de impacto
- **Projetos** (`projetos.html`) - Detalhes dos projetos sociais e conquistas
- **Cadastro** (`cadastro.html`) - Formulário completo de inscrição para voluntários

### 🔧 Recursos Técnicos
- ✅ **Design Responsivo** - Adaptado para todos os dispositivos
- ✅ **Acessibilidade WCAG 2.1** - Suporte a leitores de tela e navegação por teclado
- ✅ **Formulários Inteligentes** - Validação em tempo real e máscaras de input
- ✅ **Animações Suaves** - Transições e efeitos visuais otimizados
- ✅ **SEO Otimizado** - Meta tags e estrutura semântica
- ✅ **Performance** - Lazy loading de imagens e código otimizado

## 🛠️ Tecnologias Utilizadas

### Frontend
- **HTML5** - Estrutura semântica e acessível
- **CSS3** - Estilização moderna com CSS Grid/Flexbox
- **JavaScript ES6+** - Funcionalidades interativas e validação

### Recursos Avançados
- **CSS Custom Properties** - Sistema de design tokens
- **Intersection Observer API** - Animações baseadas em scroll
- **Form Validation API** - Validação nativa do navegador
- **Local Storage** - Persistência de dados do usuário

## 📁 Estrutura do Projeto

```
acasadosaber/
├── 📄 index.html              # Página inicial
├── 📄 projetos.html           # Página de projetos
├── 📄 cadastro.html           # Formulário de cadastro
├── 📄 README.md               # Este arquivo
├── 🎨 css/
│   └── style.css              # Estilos principais (2600+ linhas)
├── 🖼️ imagens/
│   ├── index_img.jpg          # Imagem da página inicial
│   ├── projetos_img.jpg       # Imagem da página de projetos
│   └── cadastro_img.jpg       # Imagem do formulário
├── 📜 js/
│   ├── main.js                # Funcionalidades principais
│   ├── form-validation.js     # Validação de formulários
│   └── masks.js               # Máscaras de input (CPF, telefone, CEP)
├── 📑 docs/                   # Documentação adicional
└── 🗃️ assets/                 # Recursos adicionais
```

## 🚀 Como Usar

### Instalação Rápida
```bash
# Clone ou baixe o projeto
git clone [url-do-repositorio]
cd acasadosaber

# Abra com um servidor local (recomendado)
# Opção 1: Python
python -m http.server 8000

# Opção 2: Node.js (serve)
npx serve .

# Opção 3: PHP
php -S localhost:8000

# Acesse: http://localhost:8000
```

### Desenvolvimento
1. **Edite os arquivos** diretamente no seu editor preferido
2. **Teste as funcionalidades** em diferentes navegadores
3. **Valide a acessibilidade** com ferramentas como axe-DevTools
4. **Otimize imagens** antes de adicionar à pasta `imagens/`

## 📱 Compatibilidade

### Navegadores Suportados
- ✅ **Chrome** 90+
- ✅ **Firefox** 88+
- ✅ **Safari** 14+
- ✅ **Edge** 90+
- ✅ **Opera** 76+

### Dispositivos
- 📱 **Mobile** - 320px a 768px
- 📱 **Tablet** - 768px a 1024px
- 💻 **Desktop** - 1024px+
- 🖥️ **Large Screens** - 1440px+

## 🎨 Sistema de Design

### Paleta de Cores
```css
/* Cores Principais */
--color-primary: #0B5DB8;      /* Azul institucional */
--color-accent: #F28C28;       /* Laranja destaque */
--color-secondary: #2BB673;    /* Verde sucesso */
--color-text: #111827;         /* Texto escuro */
--color-surface: #FFFFFF;      /* Fundo claro */
```

### Tipografia
- **Headings**: Poppins (600-700)
- **Body**: Inter (400-600)
- **Escala**: 12px a 60px

### Espaçamento
- **Sistema modular**: 4px, 8px, 12px, 16px, 20px, 24px...
- **Breakpoints**: 640px, 768px, 1024px, 1280px

## 📋 Funcionalidades Detalhadas

### Formulário de Cadastro
- **Validação em tempo real** de CPF, email, telefone
- **Máscaras automáticas** para campos formatados
- **Busca automática** de endereço por CEP (ViaCEP API)
- **Upload de arquivo** com validação de tipo e tamanho
- **Feedback visual** de sucesso/erro

### JavaScript Modules
- **`main.js`** - Navegação, animações, lazy loading
- **`form-validation.js`** - Validação robusta de formulários
- **`masks.js`** - Formatação de inputs (CPF, phone, CEP)

### Acessibilidade
- **ARIA labels** e roles apropriados
- **Navegação por teclado** completa
- **Skip links** para navegação rápida
- **Contraste adequado** (4.5:1 mínimo)
- **Suporte a leitores de tela**

## 🔧 Customização

### Alterando Cores
```css
:root {
  --color-primary: #SUA-COR;
  --color-accent: #SUA-COR-DESTAQUE;
}
```

### Adicionando Nova Página
1. Crie o arquivo HTML seguindo a estrutura existente
2. Inclua os mesmos `<head>` e navegação
3. Adicione o link no menu principal
4. Teste a responsividade

### Modificando o Formulário
1. Adicione novos campos no HTML
2. Inclua validação em `form-validation.js`
3. Adicione estilos CSS se necessário
4. Teste todas as validações

## 📈 Performance

### Otimizações Implementadas
- **Lazy loading** de imagens
- **CSS minificado** logicamente organizado
- **JavaScript defer** para não bloquear renderização
- **Animações otimizadas** com `transform` e `opacity`
- **Fontes web** carregadas de forma eficiente

### Métricas Recomendadas
- **Lighthouse Score**: 90+ em todas as categorias
- **Time to Interactive**: < 3s
- **Largest Contentful Paint**: < 2.5s

## 🛡️ Segurança

### Validações Implementadas
- **Client-side validation** para UX
- **Input sanitization** preparado para backend
- **File upload restrictions** por tipo e tamanho
- **XSS prevention** através de validação adequada

### Recomendações para Produção
- Implementar **Content Security Policy**
- Adicionar **rate limiting** no servidor
- Configurar **HTTPS** obrigatório
- Validar **todos os inputs no backend**

## 🐛 Resolução de Problemas

### Problemas Comuns

**Q: O formulário não está enviando**
- Verifique se JavaScript está habilitado
- Confirme se todos os campos obrigatórios estão preenchidos
- Abra o DevTools para ver erros no console

**Q: As animações não funcionam**
- Usuário pode ter `prefers-reduced-motion` ativado
- Verifique suporte do navegador para CSS animations
- Confirme se o CSS foi carregado corretamente

**Q: O layout está quebrado no mobile**
- Confirme se a meta tag viewport está presente
- Verifique se o CSS responsivo foi carregado
- Teste em diferentes dispositivos

## 🎯 Próximos Passos

### Melhorias Sugeridas
- [ ] **PWA** - Transformar em Progressive Web App
- [ ] **Backend Integration** - Conectar com servidor para processar formulários
- [ ] **CMS** - Sistema de gerenciamento de conteúdo
- [ ] **Multi-idioma** - Suporte para inglês/espanhol
- [ ] **Dashboard Admin** - Painel para gerenciar cadastros
- [ ] **Newsletter** - Sistema de inscrição para atualizações
- [ ] **Blog** - Seção de notícias e artigos
- [ ] **Sistema de Doações** - Integração com gateways de pagamento

### Integrações Futuras
- **Google Analytics** para métricas
- **Mailchimp** para newsletter
- **WhatsApp Business API** para contato
- **reCAPTCHA** para proteção contra spam
- **Google Maps** para localização

## 👥 Contribuição

### Como Contribuir
1. **Fork** o repositório
2. **Crie uma branch** para sua feature
3. **Commit** suas mudanças
4. **Teste** tudo funcionando
5. **Abra um Pull Request**

### Padrões de Código
- **HTML**: Semântico e acessível
- **CSS**: BEM methodology ou similar
- **JavaScript**: ES6+ com comentários
- **Commits**: Mensagens descritivas em português

## 📞 Contato

**Casa do Saber**
- 📧 Email: casadosaber@ong.com.br
- 📱 Telefone: +55 (21) 00000-0000
- 📍 Endereço: Rio de Janeiro, RJ - Brasil

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

**Desenvolvido com ❤️ para transformar vidas através da educação**

> Se este projeto te ajudou, considere dar uma ⭐ no repositório!