pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/AndreAzvd/ExercicioAPI-EBAC'
            }
        }

        stage('Instalar Dependências') {
            steps {
                bat 'npm install'
            }
        }

        stage('Executar Testes') {
            steps {
                bat '''
                    set NO_COLOR=1
                    npx cypress run
                '''
            }
        }
    }
}
