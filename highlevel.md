# High-Level Design Document Outline

## 1. **Introduction**

### 1.1 **Purpose**
The purpose of this project is to allow professors to distill the many years of qualitative feedback in their courses into a quick and effective summary using AI. This will assist teachers by helping them quickly recieve feedback from what could be hundreds of students each semester/course without spending hours reading through each individual comment.

### 1.2 **Scope**

1. **AI-Driven Summarization of Student Feedback:**
   - Automatically generate summaries of qualitative comments from IDEA survey reports.
   - Allow professors to input custom questions for more targeted insights.

2. **User Authentication:**
   - Professors log in using Utah State University’s Single Sign-On (SSO) system.
   - Admins (e.g., department chairs) can have permission-based access to view reports of the professors they oversee.

3. **Report Filtering and Generation:**
   - Filter feedback by class and time period.
   - Aggregate feedback across multiple semesters for trend detection.
   - Export reports in various formats such as PDF, CSV, and DOCX.

4. **Content Moderation:**
   - Filter out aggressive or inappropriate comments in student feedback.
   - Provide a toggle for professors to enable or disable content moderation.

5. **System Accessibility and User Interface:**
   - Ensure a user-friendly, intuitive interface for non-technical users.
   - Ensure multi-browser compatibility.
   - Comply with accessibility standards (e.g., for visually impaired users).

6. **Data Privacy and Security:**
   - Adhere to FERPA regulations and USU's data privacy policies.
   - Ensure role-based access control and encryption of sensitive data.

7. **Audit and Logging:**
   - Track usage and interactions for admins (e.g., login attempts, generations per person).


### 1.3 **Definitions and Acronyms**
- **SSO**: Single Sign-On
- **PDF**: Portable Document Format
- **IDEA**: Course evaluation survey used at USU
- **FERPA**: Family Educational Rights and Privacy Act

### 1.4 **Key**
- **(M)**: Represents a mandatory requirement or a "must-have" feature.
- **(S)**: Represents a secondary requirement or a "should-have" feature.
- **(C)**: Represents a nice-to-have or a "could-have" feature.
- **(W)**: Represents a feature that is out of scope for the current project.

---

## 2. **System Overview**

### 2.1 **System Architecture**
Provide a high-level overview of the system architecture, showing the various components and how they interact. Use a diagram to represent the flow between users, the web application, AI engines, and databases.

- **Frontend**: Web interface where professors log in, select reports, and view summaries. The web interface will make requests to the backend.
- **Backend**: An HTTP server that is called from the frontend and makes requests to the database and any external services. The server exposes endpoints for the following functions:
  - Authentication (via an external SSO provider).
  - Data processing.
  - Analytics (usage history).
  - Data retrieval: fetches IDEA reports for authenticated users from an external storage service.
  - AI integrations. Business logic that formulates prompts for the AI engine and parses responses from the AI engine will live here.
- **Database**: Stores user data and historical interaction logs.
- **AI Engine (External)**: A large language model (LLM) that accepts prompts designed to summarize student feedback from the IDEA reports.
- **IDEA Report Storage (External)**: A service that we rely on for read-only access to IDEA reports.

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

#### Semantic Analysis Endpoint
- **URL**: `/api/semantic`
- **Method**: `POST`
- **Description**: This endpoint will be used to perform semantic analysis on the uploaded IDEA reports using an AI engine. The endpoint will optionally take the class names, start date, and end date as input parameters to filter the reports. The AI engine will analyze the qualitative comments and generate sentiment and attitude scores for each comment. For example, a piece of this data may look like `{"attribute": "exlanatory", "sentiment": 1}`. This would mean that the professor is doing well in explaining the material. As another example, `{"attribute": "grading", "sentiment": -1}` would mean that the students are not happy with the grading.
- **Request Body**:
```json
{
  "classIds": ["CS101", "CS102"],
  "startDate": "2022-01-01",
  "endDate": "2022-12-31"
}
```
- **Response**:
```json
{
  "data": [
    {
      "attribute": "An attribute of the professor's performance",
      "sentiment": "An value 1, 0, or -1 indicating a positive, neutral, or negative sentiment",
    },
    ...
  ]
}
```

#### Chat Endpoints

The chat endpoints will be used to facilitate communication between professors and the AI engine. Professors can ask questions, provide feedback, or request additional information using the chat feature. Chats will always begin with a system message requesting the initial report summary. The AI engine will then respond with the summary. Following messages will be provided by the professor and responded to by the AI engine.

##### GET a chat
- **URL**: `/api/chat/<id>`
- **Method**: `GET`
- **Description**: Retrieves the chat history for the given chat id as a json object.
- **Response**:
```json
{
  "id": "The unique identifier for the chat",
  "messages": [
    {
      "sender": "The sender of the message (this will either be a user, ai, or system)",
      "content": "The content of the message",
      "timestamp": "The timestamp of the message"
    },
    ...
  ]
}
```

##### POST a chat
- **URL**: `/api/chat`
- **Method**: `POST`
- **Description**: Creates a new chat starting with a message from the system followed by a message from the ai engine with the report summary.
- **Request Body**:
```json
{
  "classIds": ["CS101", "CS102"],
  "startDate": "2022-01-01",
  "endDate": "2022-12-31"
}
```
- **Response**:
```json
{
  "id": "The unique identifier for the chat",
  "messages": [
    {
      "sender": "system",
      "content": "A message to the AI detailing what the user would like to have in the report. This will include requests for the big three questions, \"What is a general summary of the feedback?\", \"What did I do well?\", and \"What can I improve?\". An exact example of this message is not provided as we will be finding a good message to send to the AI during the prototype phase which is not yet determined.",
      "timestamp": "The timestamp of the message in ISO 8601 format (ex. 2024-09-27T14:41:52Z)"
    },
    {
      "sender": "ai",
      "content": "The response from the AI engine with the report summary.",
      "timestamp": "The timestamp of the message in ISO 8601 format (ex. 2024-09-27T14:41:52Z)"
    },
  ]
}
```

##### POST a message
- **URL**: `/api/chat/<id>/message`
- **Method**: `POST`
- **Description**: Sends in a new message from the user to the AI engine and returns the response from the AI engine. When the user sends the json object which only takes in the content field, the server will automatically add the "sender" field and the "timestamp" field to the object before saving it to the database.
- **Request Body**:
```json
{
  "content": "The content of the message from the user",
}
```
- **Response**:
```json
{
    "sender": "ai"
    "content": "The content of the message",
    "timestamp": "The timestamp of the message in ISO 8601 format (ex. 2024-09-27T14:41:52Z)"
}
```

##### GET download summary
- **URL**: `/api/chat/<id>/download/<format>`
- **Method**: `GET`
- **Description**: Downloads the chat history for the given chat id as a file in the specified format (e.g., PDF **(M)**, CSV **(S)**, etc. **(S)**).
- **Response**: The file in the specified format.

### 7.2 **Error Handling**

#### Error Codes
The following error codes may be returned by the API:
- `400 Bad Request`: Invalid input parameters.
- `401 Unauthorized`: User is not authenticated.
- `403 Forbidden`: User does not have permission to access the resource.
- `404 Not Found`: Resource not found.
- `500 Internal Server Error`: Unexpected server error.

#### Priority of Error Handling
- **Authorization Errors**: Unauthorized errors should be handled first to ensure data security. This means that the an unauthenticated user can not determine what resource exists on a server or not by probing for 403 and 404 errors.

- **Validation Errors**: Bad request errors should be handled next to ensure that the user is aware of the invalid input parameters.

- **Permission Errors**: Forbidden errors should be handled next. This ensures that an authenticated user cannot probe around the server to find existing resources that they do not have access to.

- **Not Found Errors**: Not found errors should be handled next. This should only be returned if an authenticated user is trying to access their own resources that do not exist.

- **Server Errors**: Internal server errors should be handled last as they are unexpected and should be logged for debugging purposes.

## 8. **Security Considerations**

### 8.1 **Authentication and Authorization**

#### Login Endpoint
- **URL**: `/api/login`
- **Method**: `GET`
- **Description**: This endpoint will be used to redirect the user to the SSO login page for Utah State University. The user will be redirected back to the application after successful login.

#### Authorization

*More research needs to be done on how to implement roles in this application. We do not currently know whether we will have access to a system that can automatically provide us with the information necessary to determine the roles of the users or if we will have to manually assign roles to users. Nathan will be looking into this and will update this section when he has more information.*

**Roles**: Define roles for users, such as professors, department heads, and administrators, to control access to different features and data.

We will be using Role-Based Access Control (RBAC) to manage user roles and permissions. The following roles will be defined:

- **Professor**: Can access student reports and create new reports and chats for their own classes.
- **Department Head**: Can access reports and chats for all professors in their department.
- **Administrator**: Can access all reports and chats for all/some departments and manage user roles within those departments.

Users higher in the hierarchy will have access to the same features as users lower in the hierarchy, as well as additional features. For example, a department head will have access to the same features as a professor, but will also have access to reports and chats for all professors in their department. This also includes the ability to see which professors have created reports and chats for their classes.

More powerful roles will have the ability to create new reports and chats for those they have management over, but they will not be able to create reports and chats for those they do not have management over. Professors will be able to see the reports and chats that they generate for themselves, but will not be able to see the reports and chats that highere roles generate for them.

### 8.2 **Data Encryption**

*More research needs to be done on the actual process of obtaining the pdf reports from the system. It is believed that we will be able to obtain the pdf reports automatically, but we need to confirm this for sure.*

Because login information will be handled by the SSO system, we will not need to worry about encrypting login information.

### 8.3 **Data Privacy**

- **AI Access**: Because users will have the ability to prompt engineer the AI, we will need to ensure that the AI does not have access to any information that it should not have access to. When a request is made, the AI will only have access to the reports that the user has access to and will not have access to any other reports. This will prevent the AI from being able to disclose any information that it should not have access to.

- **Server Side Access**: We will make sure that all information that should not get to the user never leaves the server. This means that we are not filtering reports on the client side, but rather on the server side. This will prevent the user from being able to access any information that they should not have access to.

- **Student Prompt Engineering**: We will make sure that the AI is hardened against potential prompt engineering attempts from students within the comments of their IDEA surveys. *More research and testing needs to be done on this front to determine the best way to prevent this type of prompt engineering.*

---

## 9. **Deployment Considerations**

### 9.1 **Platform**

#### 9.1.1 Frontend
Because the frontend uses client-side rendering, it will consist of static HTML, CSS, and JS resources that are pre-built either locally or on a CI/CD pipeline and then served over a CDN.

#### 9.1.2 Backend
The backend for our MVP will be a single Linux machine that runs an HTTP server. SSL will either be handled on the machine itself or on a managed load balancer that is placed in front of the machine. It will be possible to run several instances of the HTTP server in parallel so that scaling remains an option in the future.

It is possible that the server logic will be containerized (e.g. using Docker) to allow for easier deployments and rollbacks, although this design decision will be made after finalizing the server stack (language, framework, etc.).

#### 9.1.3 Database
A managed database solution that is not internet-facing will be accessible by the backend.

### 9.2 **Hosting**
The different components of the application outlined above will be hosted on USU’s internal servers or on a secure cloud platform, with the following criteria being the primary concerns when selecting the final hosting solution.
- Availability: target of 98% uptime
- Security
- Price
- Scalability
  - Note that although this is not a concern at launch, it is important that a hosting provider provides the tools and services that would enable scaling down the road.

### 9.3 **Environments**
A working production deployment is out of scope at this point in time while we work to develop an MVP that can be demoed as a proof-of-concept to relevant stakeholders. Limiting our focus to a single environment will reduce the burden of menial dev-ops tasks on developers and better facilitate rapid iteration. As such, we will deploy to a single environment known as `dev`.

### 9.3 **Continuous Integration and Deployment (CI/CD)**
- Implement a CI/CD pipeline for automated testing, deployment, and updates.

---

## 10. **Conclusion**

Summarize the key points covered in the document, reiterating the system’s purpose, design objectives, and key architectural components. Provide next steps for further development, including prototyping and user testing.

---
