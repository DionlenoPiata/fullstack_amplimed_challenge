# Sistema Organizado em Dois Micro Serviços

Este sistema foi organizado em dois micro serviços, frontend e backend, para facilitar a manutenção e escalabilidade.

## Frontend

O frontend foi estruturado da seguinte forma:

- **Pages:** São as páginas da aplicação, com destaque para a página inicial (home).
- **Components:** Aqui estão os componentes utilizados e reutilizados em diferentes partes da aplicação.

## Backend

No backend, a organização seguiu o modelo recomendado pelo framework Laravel:

- **Pastas:** O backend foi estruturado de acordo com as práticas recomendadas do Laravel.
- **Consumo da API Weatherstack:** O backend é responsável por consumir a API da Weatherstack em vez de realizar solicitações diretamente do frontend. Isso foi feito por motivos de segurança, evitando expor o token da API.

## Observações

Ao dividir o sistema em frontend e backend, visamos uma separação clara de responsabilidades e uma arquitetura mais modular. Essa abordagem facilita a manutenção, o teste e o desenvolvimento de novos recursos.
