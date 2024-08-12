# Economiza Solar

## Configurando para execução em desenvolvimento

Projeto criado com node 18.

### API
- `$ yarn`
- `$ yarn start`

### Front
- Obter sua chave de API da Google em: https://console.cloud.google.com/apis
- Dentro de .env alterar o valor VITE_GOOGLE_API_KEY de "GOOGLE_API_KEY" para a sua chave da API, sem a chave não será possível realizar a consulta com precisão da localização e não há garantia do funcionamento do sistema por completo.
- `$ yarn`
- `$ yarn dev`
