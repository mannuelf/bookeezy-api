# Bookeezy API

Local development has two options:

1. Docker with standard Node.js and npm workflow, with a Docker PostgreSQL database container with mounted persistent volumes.
2. Kubernetes with Docker using Minikube.

## 1. Docker and Node.js

Download & install Docker for desktop [here](https://www.docker.com/get-started) or Docker compose [here](https://docs.docker.com/compose/)

### Database

To create the PostgreSQL database run:

```bash
docker-compose up -d
```

Exec into container check it's working as should be:

```bash
docker exec -it bookeezy-api_postgresql_1 /bin/sh;
```

Connect application to the DB via Mikro-orm connector

```javascript
export default {
  type: 'postgresql',
  entities: [User, Book],
  dbName: 'bookeezydb', // HERE
  user: 'root', // HERE
  password: 'root', // HERE
  migrations: {
    path: path.join(__dirname, './migrations'),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
};
```

### Node

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

## GraphQL

Start GraphQL Server

```bash
yarn dev:ts
```

At [http://localhost:4000/graphql](http://localhost:4000/graphql), you should see:

![image](https://user-images.githubusercontent.com/210504/134149956-6c794560-60f3-4e2b-969b-0786fd5c8a35.png)

## 2. Kubernetes

Install [minikube](www.minikube.sigs.k8s.io) & [kubectl](https://kubernetes.io/docs/tasks/tools/) , out of scope for this guide.

### PostgreSQL

Start the PostgreSQL service.

To start k8's env, cd into k8's folder and run command below:

```bash
kubectl apply -f postgres-workload.yml
```

That will create:

- Deployment
- PersistentVolume
- PersistentVolumeClaim
- ConfigMap
- Service

Check if everything works:

```bash
kubectl get svc,deploy,po,persistentvolume,persistentvolumeclaims,configmaps
```

```bash
minikube start
```

```bash
minikube pause
```

Don't lose you environment, run this before putting computer to sleep or if you not working with minikube.

```bash
minikube unpause
```

```bash
minikube stop
```

```bash
minikube delete
```

Change docker env context to minikube (add this to your .bash_profile or .zshrc)

```bash
eval $(minikube docker-env)
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
