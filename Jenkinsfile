pipeline {
    agent { label 'jenkins-ubuntu-agent' }
    stages {
        stage('Checkout') {
            steps {
                git credentialsId: 'your-git-credentials', url: 'your-git-repo'
            }
        }
        stage('Build Frontend') {
            steps {
                sh 'cd frontend && docker build -t frontend-image .'
            }
        }
        stage('Build Backend') {
            steps {
                sh 'cd backend && docker build -t backend-image .'
            }
        }
        stage('Build Database') {
            steps {
                sh 'cd database && docker build -t database-image .'
            }
        }
        stage('Docker Compose Up') {
            steps {
                sh 'docker-compose up -d'
            }
        }
        stage('Testing') {
            steps {
                // To be added later stage
            }
        }
        stage('Docker Compose Down') {
            steps {
                sh 'docker-compose down'
            }
        }
    }
}
