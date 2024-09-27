# **High-Level Design Document**

---

## **1. Introduction and Definitions**

#### **1.1 Purpose**
The purpose of this project is to allow professors to distill the many years of qualatative feedback in their courses into a quick and effective summary using AI. This will assist teachers by helping them quickly recieve feedback from what could be hundreds of students each semester/course without spending hours reading through each individual comment.

#### **1.2 Definitions and Acronyms**
- **SSO**: Single Sign-On
- **PDF**: Portable Document Format
- **IDEA**: Course evaluation survey used at USU
- **FERPA**: Family Educational Rights and Privacy Act

---

## **2. Design Considerations**

#### **2.1 Scope**
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


#### **2.2 Assumptions**
- Professors are familiar with the SSO system for secure login.
- The AI engine will focus exclusively on summarizing qualitative feedback and will not analyze quantitative data from survey reports.

#### **2.3 Dependencies**
- The system relies on Utah State University’s SSO system for user authentication.
- External AI services will be used for natural language processing and summarization tasks.

#### **2.4 Constraints**
- The system must adhere to **FERPA regulations**, ensuring the privacy of user data and implementing secure role-based access controls.
- The system must filter out inappropriate feedback to protect the emotional well-being of professors using the system.

---

## **3. User Interfaces**

- **Intuitive Interface**: The system will have a user-friendly interface, designed for non-technical users (professors). Navigation will be straightforward, with clear steps for logging in, uploading reports, and generating summaries.
- **Mobile and Desktop Support**: The system will be accessible via both desktop and mobile browsers, ensuring multi-browser compatibility.
- **Accessibility**: The interface will comply with accessibility standards (such as WCAG 2.0) to ensure usability for visually impaired users.

---

## **4. Data Flow**

- **Report Upload**: Professors will upload IDEA survey reports via the frontend, which will pass through the backend to be stored securely in the database.
- **AI Processing**: The system will send the uploaded reports to an external AI service for summarization. Once processed, the summaries will be stored in the database and made available to the professors.
- **Feedback Retrieval and Display**: Professors will be able to view feedback summaries, filtered by class and time period, directly through the user interface. Reports will also be available for download.

---

## **5. API Interactions**

- **Login API**: Authentication will be handled via the USU SSO system, with the API facilitating secure login sessions for professors and department heads.
- **Upload API**: Professors will upload PDF versions of IDEA reports via the frontend, which will be handled by an API that sends the reports to the backend for storage and processing.
- **Summarization API**: The AI engine will be accessed via an external API that processes the feedback data and returns summarized reports. The API will handle both text processing and custom queries.
- **Download API**: Professors will download the summarized reports in various formats (PDF, CSV, DOCX) via an API endpoint, ensuring ease of use and accessibility.

---

## **6. Security Considerations**

- **Compliance with FERPA**: All user data, including feedback and credentials, must comply with FERPA regulations. User information must be encrypted both in transit and at rest using modern encryption standards (e.g., AES-256).
- **Role-Based Access Control (RBAC)**: Professors will only have access to their own feedback data, while department heads may access reports of professors they oversee. Role-based permissions will be enforced.
- **Audit Logs**: The system will log user interactions (e.g., logins, report generation) for auditing purposes, ensuring that unauthorized access attempts are tracked.

---

## **7. Conclusion**
In summary, this project aims to streamline the process of analyzing student feedback for professors by automating the summarization of qualitative survey data. The system will offer secure, user-friendly access to feedback reports, ensuring compliance with data privacy regulations while providing customizable reports. Key considerations such as security, accessibility, and efficient data flow have been factored into the design, ensuring that the system meets the needs of its users and adheres to institutional policies.