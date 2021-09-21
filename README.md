# Bookeezy API

Local development has two options:

1. Docker with standard Node.js and npm workflow, with a Docker PostgreSQL database container with mounted persistent volumes.
2. Kubernetes with Docker using Minikube.

## 1. Docker and Node.js

Download & install Docker for desktop [here](https://www.docker.com/get-started) or Docker compose [here](https://docs.docker.com/compose/)

To create the PostgreSQL database run:

```bash
docker-compose up -d
```

Install dependencies:

```bash
yarn
```

Run nodemon server which serves up the `dist` folder:

```bash
yarn watch
```

Run in development mode with type checking:

```bash
yarn dev:ts
```

## 2. Kubernetes

### Preferred method

Install minikube [https://minikube.sigs.k8s.io/](www.minikube.sigs.k8s.io)

```bash
minikube start

minikube pause
minikube unpause

minikube stop

minikube delete
```

Change docker env context to minikube

```bash
eval $(minikube docker-env)
```

Start the PostgreSQL service.

- Deployment
- PersistentVolume
- PersistentVolumeClaim
- ConfigMap
- Service

To start k8's env, cd into k8's folder and run command below:

```bash
kubectl apply -f postgres-workload.yml
```

### Other useful Kubernetes commands

```bash
kubectl create -f webserver.yml
```

Test to see if it worked

```bash
kubectl get replicasets
```

#### Create service

```bash
kubectl create -f webserver-scv.yml
```

#### Expose service

```bash
kubectl expose deployment webserver --name=web-service --type=NodePort
```

#### Get pods

```bash
kubectl get po
```

#### List services

```bash
kubectl get svc
```

#### Describe service

```bash
kubectl describe service db-service
```

#### Minikube IP

Application is running on the Minikube VM, so get the IP

```bash
minikube ip
```

#### Launch service in the browser

```bash
minikube service web-service-name
```
