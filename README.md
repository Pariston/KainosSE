# KainosSE
Test application for Kainos (stack exchange).

# Used technologies
<ul>
  <li>Java as backend</li>
  <li>Angular2 as frontend</li>
  <li>Jersey as RESTful framework for Java</li>
  <li>Java JPA</li>
  <li>Typescript</li>
  <li>Npm, bower, maven</li>
  <li>...</li>
</ul>

# How to run
You need to make 3 steps:
  1. Go to main project directory and run command:
    1.  <b>mvn exec:java</b> (to fill database up by src/main/com.kainosse/addCSV.csv content)
  2. Go to src/main/webapp and run two commands:
    1.  <b>npm install</b>
    2.  <b>bower install</b>
  2. Go to main project directory and run command:
    1.  <b>mvn jetty:run</b>
    
