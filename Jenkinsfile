// Same flow as in the Accenture project: checkout -> install -> test -> report -> publish
pipeline {
  agent any
  tools { nodejs 'node-20' }          // NodeJS plugin installation name
  parameters {
    string(name: 'TAGS', defaultValue: '@smoke', description: 'Cucumber tag expression, e.g. @smoke or @regression')
  }
  stages {
    stage('Install') { steps { sh 'npm ci' } }
    stage('Test')    { steps { sh 'TAGS="${TAGS}" npm test' } }
  }
  post {
    always {
      sh 'npm run report || true'
      junit 'reports/junit/*.xml'                       // pass/fail counts + trend graph
      publishHTML(target: [reportDir: 'reports/html', reportFiles: 'index.html', reportName: 'Cucumber Report'])
      archiveArtifacts artifacts: 'reports/**/*', allowEmptyArchive: true   // screenshots, json, xml
    }
  }
}
