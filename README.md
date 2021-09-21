# Bookeezy API

Install dependencies:

```bash
yarn
```

Run nodemon server which serves up the `dist` folder:

```bash
yarn watch
```

Run in development mode:

```bash
yarn dev:ts
```

## Database

Two options:

1. Docker PostgreSQL container with mounted persistent volumes.
2. Kubernetes, minikube

## 1. Docker

Install Docker for desktop and run command to start a container. This is the easiest option of the two.

```bash
docker-compose up -d
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

```bash
kubectl apply -f k8s/postgres-workload.yml
```

Other useful Kubernetes commands

```bash
kubectl create -f webserver.yml
```

Test to see if it worked

```bash
kubectl get replicasets
```

### Create service

```bash
kubectl create -f webserver-scv.yml
```

### Expose service

```bash
kubectl expose deployment webserver --name=web-service --type=NodePort
```

### Get pods

```bash
kubectl get po
```

### List services

```bash
kubectl get svc
```

### Describe service

```bash
kubectl describe service db-service
```

### Minikube IP

Application is running on the Minikube VM, so get the IP

```bash
minikube ip
```

### Launch service in the browser

```bash
minikube service web-service-name
```
