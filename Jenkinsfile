pipeline {
  agent any
  stages {
    stage('setup') {
      steps {
        sh 'npm run setup'
      }
    }
    stage('build') {
      steps {
        sh 'npm run build'
      }
    }
    stage('test') {
      steps {
        sh 'npm run test'
      }
    }
  }
}