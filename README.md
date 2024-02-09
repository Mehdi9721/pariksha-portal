# pariksha-portal 👔✨ (Frontend Only)
## BY 3SD

# Contribution Guid
Setup Project in React (use [git pull --rebase origin master] then [push the changes to main]) <br>
React used for frontend along with bootstrap for styling <br>
### For Setting VS Code
install -> "axios": "^1.6.7" (npm install axios) <br>
install -> "bootstrap": "^5.3.2" (npm react-bootstrap bootstrap) <br>
install -> "react-router-dom": "^6.22.0"  (npm install react-router-dom) <br>

## HLD (High level Design)
### A- React
#### 1- Admin Panel: 
-> Login Page <br>
-> Admin Home  <br>
-> Create Exam <br>
-> Upload Question Paper <br>
-> View Created Exams <br>
-> Add Student Details <br>
-> View Student Results 
#### 2- Student Panel:
-> Exam Page <br>
-> Student Login Form <br>
-> Warning Alerts (Tab switching, noise, unauthorized camera use)
### B- Backend (Spring Boot):
#### 1- Authentication and Authorization:
-> Admin login <br>
-> Student login
#### 2- Exam Management:
-> Create Exam <br>
-> Upload Question Paper <br>
-> Store Questions in Database <br>
-> Manage Exam Status (Completed or Ongoing) <br>
-> Student Management:
-> Add Student Details <br>
-> Verify Student Credentials <br>
-> Monitor Live Exam Participation
#### 3- Result Management:
-> Store Student Results <br>
-> View Student Results
#### 4- Real-time Monitoring:
-> Track Active Exams <br>
-> Monitor Students' Activities (camera, microphone, tab-switching, noise detection)
### C- Database (MySQL):
 #### 1- Tables:
-> Admin (admin_id, password)  <br>
-> Exams (exam_id, exam_name, exam_date, duration, subject_name, status) <br>
-> Questions (question_id, exam_id, question_text, option_A, option_B, option_C, option_D, correct_option) <br>
-> Students (student_prn, student_password) <br>
-> Exam_Participation (exam_id, student_prn, start_time, end_time, status) <br>
-> Results (exam_id, student_prn, score, status) <br>


## Workflow:
### A-Admin Workflow:
-> Log in to the admin panel. <br>
-> Create exams, upload question papers, and manage exam details. <br>
-> Add student details. <br>
-> Monitor live exams and view student results.
### B-Student Workflow: 
-> Log in to the student panel. <br>
-> Access the exam page on the specified date. <br>
-> Complete the exam by answering the questions. <br>
-> Allow camera and microphone access. <br>
-> Receive warnings for tab switching, noise, and unauthorized camera use.
### C-Real-time Monitoring:
-> Admin can see the list of active exams and the number of students participating.  <br>
-> Admin can view live camera feeds of students during the exam.  <br>

## Integration Points: 
### A-Frontend-Backend Integration:
-> React frontend communicates with Spring Boot backend through REST APIs.
### B- Database Integration:
-> Spring Boot uses JPA to interact with the MySQL database to store and retrieve data.
### C- Real-time Monitoring Integration:
-> WebSocket or a similar technology can be used for real-time communication between the frontend and backend to monitor live activities.
### D- External Libraries/Tools:
-> Use libraries/tools for webcam and microphone access, tab-switching detection, and noise detection.
### Technologies:
#### Frontend:
ReactJS
#### Backend:
Spring Boot (Java)
#### Database:
MySQL
#### Real-time Communication:
WebSocket
#### Security:
HTTPS, JWT (JSON Web Tokens) <br>
#### External Libraries/Tools: 
Webcam and microphone access libraries, noise detection tools.
