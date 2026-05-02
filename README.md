# 🟡 Palavritas

> *Monte, Aprenda e Brinque!*

Palavritas é um jogo educativo digital baseado no clássico **Jogo do 15**, substituindo números por letras. O objetivo é deslizar as peças pelo tabuleiro até formar a palavra-objetivo indicada — na horizontal ou na vertical. Desenvolvido como projeto acadêmico na **UniMax Indaiatuba (Grupo UNIEDUK)**, o jogo é alinhado à BNCC para os Anos Iniciais do Ensino Fundamental (1º ao 4º ano).

---

## 📸 Telas

| Menu Principal | Tabuleiro | Vitória |
|:-:|:-:|:-:|
| Fundo animado com letras flutuantes | Grade deslizável com feedback visual | Pop-up com confete e opções de continuidade |

---

## 🎮 Como Jogar

1. Na tela inicial, pressione **Novo Jogo**.
2. A palavra-objetivo aparece no topo da tela — observe as letras verdes.
3. **Arraste** qualquer peça na direção de um espaço vazio para movê-la. Você também pode **tocar** a peça para deslizá-la automaticamente.
4. Peças com **borda verde** indicam que podem ser movidas no momento.
5. A linha do meio do tabuleiro é a **zona-guia**: peças verdes indicam letras corretas na posição certa.
6. Quando acreditar que formou a palavra, pressione **✓ Verificar Palavra**.
7. Se a palavra estiver correta (horizontal ou vertical, em qualquer posição do tabuleiro) → vitória! Caso contrário, o tabuleiro pisca em vermelho e o contador continua.

### 🔄 Reserva de Letras

O jogo inclui 52 peças (26 letras × 2). As letras não usadas no tabuleiro ficam na **Reserva**. Toque uma letra da reserva para selecioná-la, depois toque uma peça no tabuleiro para realizar a troca — útil para palavras com letras repetidas como *MACACO* ou *BONECO*.

---

## ⚙️ Níveis de Dificuldade

| Nível | Espaços Vazios | Indicado Para |
|---|:-:|---|
| 🌱 **Iniciante** | 2 | Primeiros contatos com o jogo; mais liberdade de movimento |
| ⭐ **Clássico** | 1 | Jogadores experientes; desafio próximo ao Jogo do 15 original |

---

## 🗂️ Estrutura do Projeto

```
palavritas/
├── palavritas.html   # Jogo completo (single-file, sem dependências externas)
└── README.md         # Este arquivo
```

O jogo é distribuído como um **único arquivo HTML** autocontido. Não requer servidor, instalação, banco de dados ou framework — basta abrir no navegador.

---

## 🚀 Como Executar

**Localmente:**
```bash
# Basta abrir o arquivo no navegador
open palavritas.html          # macOS
xdg-open palavritas.html      # Linux
start palavritas.html         # Windows
```

**Via GitHub Pages / Netlify Drop / qualquer hospedagem estática:**
Faça upload do arquivo `palavritas.html` e acesse pela URL gerada. Nenhuma configuração adicional é necessária.

**Requisitos:**
- Navegador moderno com suporte a ES6+ (Chrome 60+, Firefox 60+, Safari 12+, Edge 79+)
- Conexão com a internet apenas para carregar a fonte [Fredoka](https://fonts.google.com/specimen/Fredoka) (opcional — o jogo funciona sem ela, com fallback para sans-serif)

---

## 📚 Banco de Palavras

O jogo inclui **27 palavras** organizadas por tamanho:

| Tamanho | Palavras |
|---|---|
| **4 letras** | GATO, BOLA, CASA, PATO, SAPO, AMOR, MESA, LAGO, FOGO, LOBO, FLOR, URSO |
| **5 letras** | PEIXE, TIGRE, BRAVO, CAMPO, NUVEM, BARCO, PEDRA, BURRO, COBRA |
| **6 letras** | MACACO, GIRAFA, CAVALO, ESCOLA, JARDIM, BONECO |

Palavras podem ser selecionadas manualmente pelo menu de seleção ou sorteadas aleatoriamente.

---

## 🧩 Funcionalidades

- **Arrastar para deslizar** — física responsiva que segue o dedo ou o mouse
- **Tap para mover** — toque simples desliza a peça automaticamente
- **Scan de vitória** — detecta a palavra em qualquer linha ou coluna do tabuleiro
- **Feedback negativo** — tremida + flash vermelho + toast auto-dismiss em 2,5s
- **Feedback positivo** — confete animado + pop-up com estatísticas
- **Menu de pause** — retomar, recomeçar com a mesma palavra, nova palavra ou sair
- **Timer e contador de movimentos** — registram o desempenho do jogador
- **Troca por reserva** — resolve ambiguidade de letras repetidas
- **Suporte a touch e mouse** — funciona em celulares, tablets e desktops
- **Layout mobile-first** — otimizado para telas de 360px a 420px

---

## 🎨 Identidade Visual

| Token | Valor | Uso |
|---|---|---|
| Amarelo | `#F7E03C` | Peças do tabuleiro, botões secundários |
| Verde | `#5BBF2A` | Ações primárias, acertos, peças móveis |
| Verde escuro | `#3A8A14` | Sombras, bordas de destaque |
| Fundo | `#FFFDE8` | Cor de fundo geral |
| Tipografia | Fredoka (700) | Toda a interface |

---

## 📖 Alinhamento Pedagógico (BNCC)

O jogo apoia competências e habilidades dos Anos Iniciais do Ensino Fundamental:

- **EF01LP03 / EF02LP01** — Reconhecimento e escrita de palavras do cotidiano
- **EF01LP06** — Segmentação de palavras em letras
- **EF03LP01** — Ampliação de vocabulário
- **Raciocínio lógico-espacial** — planejamento de movimentos para atingir um objetivo

Recomendado para uso em sala de aula, em tablets ou computadores, como atividade lúdica de reforço de leitura e escrita.

---

## 👥 Autores

| Nome | RA |
|---|---|
| Tawany B. P. Costa | 52421921 |
| Mariana S. Paixão | 52523232 |
| Diego Borges | 52624804 |

---

## 🏫 Instituição

**UniMax Indaiatuba — Grupo UNIEDUK**

🌐 [unimax.grupounieduk.com.br](https://unimax.grupounieduk.com.br)
📷 Instagram: [@UniMax Indaiatuba](https://instagram.com)
📍 Av. 9 de Dezembro, 460 — Jd. Pedroso, Indaiatuba – SP

---

## 📄 Licença

Projeto acadêmico desenvolvido para fins educacionais. Todos os direitos reservados aos autores e à UniMax Indaiatuba — Grupo UNIEDUK.