# To Do List Frontend

Frontend simples para gerenciamento de tarefas (To Do List), desenvolvido em HTML, CSS e JavaScript puro.

## Funcionalidades

- Adicionar, editar, remover e listar tarefas
- Alterar status da tarefa (pendente, em andamento, concluída)
- Interface responsiva e moderna

## Estrutura do Projeto

```
.
├── css/
│   └── style.css
├── js/
│   └── script.js
├── index.html
├── Dockerfile
├── docker-compose.yml
└── k8s/
    ├── deployment.yaml
    ├── kustomization.yaml
    └── service.yaml
```

## Como rodar localmente

1. Clone o repositório:
   ```sh
   git clone <url-do-repo>
   cd frontend-fullstack
   ```

2. Abra o arquivo `index.html` no navegador.

## Docker

Para rodar usando Docker:

```sh
docker build -t sidneckel/frontend .
docker run -p 4444:80 sidneckel/frontend
```

Ou usando Docker Compose:

```sh
docker-compose up --build
```

Acesse em: [http://localhost:4444](http://localhost:4444)

## Kubernetes

Os manifests estão na pasta [`k8s/`](k8s/):

- [`deployment.yaml`](k8s/deployment.yaml)
- [`service.yaml`](k8s/service.yaml)
- [`kustomization.yaml`](k8s/kustomization.yaml)

Exemplo de aplicação:

```sh
kubectl apply -k k8s/
```

## CI/CD

O pipeline de CI/CD está configurado em [`/.github/workflows/ci-cd.yml`](.github/workflows/ci-cd.yml) para build, push da imagem Docker e atualização do manifest no repositório.

## Variáveis e Configurações

O frontend consome uma API backend configurada em [`js/script.js`](js/script.js) na constante `API_URL`. Altere conforme necessário para apontar para o backend correto.
