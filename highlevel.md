# High-Level Design Document Outline

## 1. **Introduction**

### 1.1 **Purpose**
Provide an overview of the purpose of this design document. Describe the intent of this project and how the system will support professors at Utah State University by summarizing IDEA survey reports using AI.

### 1.2 **Scope**
Define the scope of the project, including the features, functionalities, and design components that will be covered in this document.

### 1.3 **Definitions and Acronyms**
- **SSO**: Single Sign-On
- **PDF**: Portable Document Format
- **IDEA**: Course evaluation survey used at USU
- **FERPA**: Family Educational Rights and Privacy Act

---

## 2. **System Overview**

### 2.1 **System Architecture**
Provide a high-level overview of the system architecture, showing the various components and how they interact. Use a diagram to represent the flow between users, the web application, AI engines, and databases.

- **Frontend**: Web interface where professors log in, select reports, and view summaries.
- **Backend**: Manages authentication, data processing, and AI integrations.
- **AI Engine**: Processes and summarizes student feedback from the IDEA reports.
- **Database**: Stores user data, authentication credentials, and historical interaction logs.

### 2.2 **High-Level Use Cases**
Summarize the key use cases that describe the interactions between users and the system.

- **Professor Login**: Professors use SSO to securely log in to the system.
- **Generate Summary**: Professors upload IDEA reports and generate AI summaries.
- **Filter Feedback**: Professors filter feedback by class and time period.
- **Download Reports**: Professors download the summary in PDF, CSV, or DOCX format.
- **Admin Access**: Department heads or overseers can access professors' reports.

---

## 3. **Design Considerations**

### 3.1 **Assumptions**
- Professors are familiar with the USU SSO system.
- The AI engine will be responsible for qualitative comment analysis only (no quantitative features).
- Professors and department heads will need permission-based access to the system.

### 3.2 **Dependencies**
- The system depends on USU’s SSO for authentication.
- The system depends on external AI services for natural language processing and summarization.

### 3.3 **Constraints**
- The system must comply with FERPA regulations and USU's data privacy policies.
- The system must filter inappropriate comments to protect emotional well-being.

---

## 4. **Functional Design**

### 4.1 **Authentication and Access Control**
- Use USU’s existing Single Sign-On (SSO) system for user authentication.
- Ensure role-based access for department heads and professors.

### 4.2 **AI Summarization Engine**
- Design the integration of an AI model that processes qualitative comments and generates comprehensive feedback summaries.
- Answer specific questions such as “What did I do well?” and “What can I improve?”.
- Allow users to input custom queries for deeper insights.

### 4.3 **Report Filtering and Generation**
- Provide filtering mechanisms to select reports by class and time period.
- Enable the system to aggregate feedback across different semesters to detect trends.
- Allow reports to be generated in multiple formats (PDF, CSV, DOCX).

### 4.4 **Content Moderation**
- Design a comment filtering mechanism to remove aggressive or inappropriate feedback.
- Include a toggle to enable or disable moderation for professors who want to see all comments.

---

## 5. **Non-Functional Design**

### 5.1 **User Interface (UI) Design**
- Ensure the system is user-friendly with a simple interface to accommodate professors who may not be tech-savvy.
- Provide clear navigation for logging in, uploading reports, viewing summaries, and downloading reports.
- Ensure the system is responsive and accessible on mobile devices and all major web browsers.

### 5.2 **Performance and Scalability**
- The system should handle multiple concurrent users and reports efficiently.
- AI-generated summaries should be provided in real-time or with minimal delay.

### 5.3 **Data Privacy and Security**
- Ensure compliance with FERPA and other data privacy regulations.
- Encrypt sensitive data such as user credentials and reports.

---

## 6. **Data Design**

### 6.1 **Database Schema**
Outline the schema for the database, including:
- **Users Table**: To store professor and admin data.
- **Reports Table**: To store uploaded IDEA reports and their metadata.
- **Summaries Table**: To store AI-generated summaries and interaction logs.
- **Permissions Table**: To store role-based access data for department heads.

### 6.2 **Data Flow**
Describe how data moves through the system, from the point of report upload to the generation and downloading of summaries. Use a diagram to show data flow between the frontend, backend, AI engine, and database.

---

## 7. **API Design**

### 7.1 **Endpoints**
Define the API endpoints and their functionalities. Example endpoints include:
- **Login Endpoint**: For authenticating users via SSO.
- **Upload Endpoint**: For uploading PDF files of IDEA reports.
- **Summarization Endpoint**: For invoking the AI engine to summarize reports.
- **Download Endpoint**: For downloading the generated reports.

### 7.2 **Error Handling**
Define how errors will be handled, ensuring clear error messages are displayed to users.

---

## 8. **Security Considerations**

### 8.1 **Authentication and Authorization**
- Implement role-based access control to restrict users to their own reports.
- Ensure session management is secure and follows best practices for SSO integration.

### 8.2 **Data Encryption**
- Encrypt sensitive data both in transit (using HTTPS) and at rest (for stored reports and user data).

### 8.3 **Audit and Logging**
- Log user interactions, including login attempts, report uploads, and summary generations, for auditing purposes.
- Allow department heads to monitor system usage by the professors they oversee.

---

## 9. **Deployment Considerations**

### 9.1 **Platform**
- Deploy the system as a web-based application accessible via desktop and mobile browsers.
- Optionally, develop a mobile app for enhanced access.

### 9.2 **Hosting**
- Host the web application on USU’s internal servers or a secure cloud platform, ensuring high availability and data security.

### 9.3 **Continuous Integration and Deployment (CI/CD)**
- Implement a CI/CD pipeline for automated testing, deployment, and updates.

---

## 10. **Conclusion**

Summarize the key points covered in the document, reiterating the system’s purpose, design objectives, and key architectural components. Provide next steps for further development, including prototyping and user testing.

---
