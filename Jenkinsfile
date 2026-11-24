// Exemplo base de pipeline. Ajustar agent/labels conforme o ambiente (emulador ou device farm).
pipeline {
  agent any

  parameters {
    choice(name: 'PLATFORM', choices: ['android', 'ios'], description: 'Plataforma dos testes')
  }

  triggers {
    // Roda todo dia às 2h (além de poder ser disparado por push/PR)
    cron('0 2 * * *')
  }

  stages {
    stage('Instalar dependências') {
      steps {
        sh 'npm ci'
        sh 'npm run appium:drivers'
      }
    }

    stage('Rodar testes') {
      steps {
        // As credenciais ficam no Jenkins (Credentials), nunca no repositório
        withCredentials([usernamePassword(credentialsId: 'mobile-test-user',
                                          usernameVariable: 'USER_EMAIL',
                                          passwordVariable: 'USER_PASSWORD')]) {
          sh 'npm run test:${PLATFORM}'
        }
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'screenshots/**, logs/**', allowEmptyArchive: true
    }
  }
}
