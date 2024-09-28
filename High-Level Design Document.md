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

### **Intuitive Interface**

#### **3.1 Simple Workflow**
The user interface is designed with a primary focus on simplicity and ease of use, ensuring that even non-technical users, such as professors who may not have extensive technical experience, can navigate the platform with minimal effort. The interface will offer a logical flow of actions, guiding users step-by-step through the process of generating feedback summaries, reducing potential confusion or errors.

#### **3.2 Key Functions**
- **Logging in**: User authentication will be handled through Utah State University’s Single Sign-On (SSO) system, which most faculty members are already familiar with. This will streamline the login process, eliminating the need for new credentials and reducing potential barriers to access. Professors will simply use their existing USU credentials to gain access to the system.
  
- **IDEA Survey PDFs**: The system will automatically retrieve IDEA survey reports from a centralized database, eliminating the need for professors to manually upload their own documents. This backend process will be invisible to the user, ensuring that the experience is seamless and requires minimal input. By reducing the need for manual data handling, the system minimizes the potential for errors or delays caused by incorrect uploads.

- **Requesting Summaries**: Professors will be able to generate AI-powered feedback summaries using intuitive, clearly labeled buttons, prompts, and drop-down menus. Key actions, such as requesting a summary, will be highlighted in the interface to ensure they are easily identifiable. The system will provide users with the flexibility to generate summaries for specific time periods, courses, or custom queries without overwhelming them with unnecessary complexity.

#### **3.3 Progress Indicators**
The platform will provide real-time feedback on ongoing processes through visual indicators. For example, when professors request feedback summaries, they will see progress bars for uploads and AI processing times. Depending on the length of the report and the complexity of the request, status messages will display estimated completion times, keeping users informed throughout the entire process. This transparency helps manage user expectations and reduces uncertainty during long-running operations.

#### **3.4 Customization Options**
Professors will be able to tailor feedback summaries to meet their specific needs. Customization options will include:
- **Date Range Filters**: Professors can narrow their feedback summaries by selecting specific semesters or academic years.
- **Class Filters**: They can choose to generate summaries for individual courses or aggregate feedback across multiple classes to identify broader trends.
   - Class filters will include options for sections. 
- **Custom Questions**: Professors can input specific questions or topics of interest, allowing the AI to generate more focused summaries based on the custom parameters they provide. This feature enhances the relevance and usefulness of the generated insights.
   - There will be predetermind options for the questions.
- **Export Choices**:
   - Facalty will have options to export the respond into PDF format. 

### **Mobile and Desktop Support**

#### **3.5 Responsive Design**
The web app will be built using a responsive design framework to ensure that it works optimally across a range of devices, including desktops, laptops, tablets, and smartphones. The layout and components will automatically adjust to fit different screen sizes, providing a consistent, user-friendly experience on any device. Professors will be able to access the system whether they are working from a desktop computer in their office or reviewing feedback on a mobile device while on the go.

#### **3.6 Cross-Browser Compatibility**
The platform will be compatible with all major web browsers, including Chrome, Firefox, Safari, and Edge. This ensures that regardless of the browser being used, users will experience the same seamless functionality without encountering display or performance issues. The interface will undergo thorough testing across these browsers to prevent inconsistencies that could interfere with the user experience.


### **Accessibility**

#### **3.7 Compliance with WCAG 2.1**
Accessibility is a priority in the design of the platform, ensuring that all users, including those with disabilities, can effectively navigate and utilize the system. The interface will comply with Web Content Accessibility Guidelines (WCAG) 2.1, incorporating features such as:
- **Screen Reader Compatibility**: For users who rely on screen readers, the platform will be fully navigable, with appropriate semantic markup and alternative text for non-text content.
- **Keyboard Navigation**: Users will be able to navigate the interface entirely via keyboard if necessary, with focus indicators and logical tab orders.
   - Most Facalty will just just the mouse.

#### **3.8 Color Contrast and Legibility**
All design elements will adhere to the official Utah State University color style guide, ensuring visual consistency with institutional branding while maintaining accessibility standards.
 

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