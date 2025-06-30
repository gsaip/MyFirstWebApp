pipeline {
    agent any

    environment {
        IMAGE_NAME = "mywebapp"
        DOCKER_TAG = "2"
    }

    stages {
        stage('Clone Repository') {
            steps {
                // Use Jenkins built-in Git step, with branch specified
                git branch: 'dockerbranch', url: 'https://github.com/gsaip/MyFirstWebApp.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${IMAGE_NAME}:${DOCKER_TAG}")
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    docker.image("${IMAGE_NAME}:${DOCKER_TAG}").run("-p 3000:3000")
                }
            }
        }
    }
}
