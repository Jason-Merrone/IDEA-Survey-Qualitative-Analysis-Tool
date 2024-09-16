# Introduction

## Project Overview

The project aims to provide faculty at Utah State University (USU) with enhanced insights from their IDEA survey reports. IDEA surveys are conducted at the end of each semester, where students rate and comment on their courses and instructors. This project leverages artificial intelligence to summarize student comments over a selected timeframe and set of classes, delivering three key insights to professors:

1. An overview of the general comments.
2. Highlights of what was done well during the semester.
3. Recommendations for improvement.

The system will integrate seamlessly with existing USU systems, allowing professors to log in and generate AI-driven analyses of their IDEA survey reports. Additionally, professors will have the option to ask specific questions to the AI, such as "What do students think about the fairness of my quizzes?" or "How difficult is my class?" to gain deeper insights into student perceptions.

## Purpose of Requirements Document

The purpose of this requirements document is to clearly outline the specifications and expectations for the development of the AI-driven analysis system for IDEA survey reports at Utah State University (USU). This document serves as a comprehensive guide for all developers, faculty members, and Erik Falor ensuring that everyone involved has a clear understanding of the project's objectives, functionalities, and constraints. By detailing the functional, non-functional, technical, and user requirements, this document aims to facilitate effective communication, minimize ambiguities, and provide a solid foundation for the successful implementation and deployment of the system.

# MoSCoW Prioritization of Requirements

*Based on what Erik said in class, I assume we'll delete this section. When moving a requirment to the "Requirements" section, we can remove it from this section. We'll just label each of these requirements with a letter or symbol like "M", "S", "C", or "W" to indicate its priority.*

## Must-Have
- Generate comprehensive summaries of qualitative feedback from IDEA survey reports.
- Implement robust security measures to ensure that each professor has access only to their own IDEA reports.
- Integrate an authentication system utilizing the existing Single Sign-On (SSO) used by Utah State University.
- Enable users to filter feedback by specific classes and time frames for targeted analysis.
- Provide answers to key questions such as “What is the general overview of the comments?”, “What did I do well?”, and “What can I do better?”.
- Allow aggregation of multiple reports to identify trends over time.
- Filter out aggressive or inappropriate comments to protect the emotional well-being of professors.
- Generate an automatic printable report as PDFs based on the specified timeline and selected classes.
- Include the prompt used to generate the initial report for transparency.
- Ensure the system is user-friendly and intuitive for professors who may not be tech-savvy.
- Ensure the system complies with relevant data privacy laws and university policies.

## Should-Have
- Implement a permission system that allows different overseers to access the IDEA reports of the professors they oversee.
- Provide a history of interactions that users have had with the chatbot for reference and review.
- Enable analysis of IDEA survey reports from periods before Fall 2019 to offer a comprehensive historical perspective.
- Allow users to engage in a chat about specific sections of the report, enabling them to ask targeted questions and receive detailed insights.
- Offer the option to download reports in multiple formats, such as PDF, CSV, and DOCX, to cater to different user needs.
- Include citations of specific comments that the AI uses to generate its insights, ensuring transparency and traceability.

## Could-Have
- Provide a detailed analysis of the "Feel and Vibe" of other USU programs to offer comparative insights.
- Suggest additional questions for professors to ask, such as “What do students think about my quizzes?” or “What is the general consensus on my class difficulty level?” to gain more specific feedback.
- Implement mobile support to allow professors to access and interact with the system on-the-go.
- Allow superiors to see which professors are active and using the platform, providing oversight and encouraging engagement.

## Won't-Have
- Students will not have access to the reports.
- General public access to reports will not be provided.
- Quantitative reporting features will not be included.
- Concerns regarding prompt engineering from professors will not be addressed.

# Requirements

## Functional Requirements
- What the system should do; features and functionalities.

1. **Authentication and Access Control**
   - The system shall allow professors to log in using Utah State University's Single Sign-On (SSO) for secure authentication. **(M)**
   - The system shall ensure that professors can only access their own IDEA survey reports after logging in. **(M)**
   - The system shall provide an admin or overseer with permission-based access to the IDEA reports of professors they oversee. **(S)**

2. **AI-Powered Summarization**
   - The system shall generate AI-generated summaries of student feedback from external PDFs, focusing on qualitative comments. **(M)**
   - The system shall provide answers to specific key questions, such as:
     - "What is the general overview of the comments?" **(M)**
     - "What did I do well?" **(M)**
     - "What can I do better?" **(M)**
   - Allow the user to chat directly to the AI/input custom questions. **(C)**

3. **Filtering and Reporting**
   - The system shall allow professors to filter feedback by class and time period. **(M)**
   - The system shall support the aggregation of multiple IDEA reports over different time periods to detect trends. **(M)**
   - The system shall generate a summary report in PDF format based on selected classes and time frames. **(M)**
   - The system shall allow users to download reports in formats like PDF, CSV, and DOCX. **(S)**

4. **Content Moderation and Filtering**
   - The system shall filter out inappropriate or aggressive comments from the AI-generated summaries to protect the emotional well-being of professors. **(M)**
   - Ability to toggle moderation filter **(C)**

5. **Report Generation and Downloading**
   - The system shall generate printable reports that can be downloaded in PDF format. **(M)**
   - The system shall include the initial prompt used to generate each report to maintain transparency. **(M)**

6. **User Interface and Usability**
   - The system shall allow superiors to see which professors are active and using the platform, providing oversight and encouraging engagement. **(C)**


## Non-Functional Requirements

1. **User-Friendly and Accessible**
   - The system will provide an intuitive user interface, making it easy for professors to access, filter, and download their reports without requiring technical expertise. **(M)**
   - The system will provide useful and informative error messsages. Any errors will be handled by the system, and users will be guided to available support resources. **(S)**
   - The system will be accessible as a website that is supported across all major web browsers. Mobile devices will be supported. **(S)**
   - The website will be compliant with all relevant accessiblity standards and guildlines set out by Utah State University. **(S)**

2. **Data Privacy and Data Governance Compliance**
   - The system will comply with relevant data privacy regulations (such as FERPA) and university policies to protect sensitive information. **(M)**

3. **System Security**
   - The system will implement website security measures to ensure no unauthorized access to functions or user data. **(M)**

4. **System Performance**
   - The system will be optimized to provide the user with a smooth and consistent experience. **(S)**

## Business Requirements
- High-level needs of the organization; objectives and strategy.

## User Requirements
- How the system will be experienced by end-users; solutions to user problems.

# Use Cases

- [ ] Create use case diagrams to visually represent the interactions between users and the system.
  - If anyone is familiar with Mermaid, we can include the diagrams directly inside the Markdown.
- [ ] Define and document each use case with a brief description.
- [ ] Outline the main flow and alternative flows for each use case.

# User Stories

*Based on what Erik said in class, I also assume we'll delete this section too. We can move the user stories and associate them with the relevant requirement in the "Requirements" section.*

- As a professor, I want to generate comprehensive summaries of qualitative feedback from my IDEA survey reports so that I can quickly understand overall student feedback.
- As a professor, I want to log in using my university SSO credentials so that I can securely access my IDEA reports without needing to remember another password.
- As a professor, I want to filter feedback by specific classes and time frames so that I can perform targeted analysis on my teaching performance.
- As a professor, I want the system to answer key questions like "What is the general overview of the comments?", "What did I do well?", and "What can I do better?" so that I can quickly understand and improve my teaching.
- As a professor, I want to aggregate multiple reports to identify trends over time so that I can track my teaching progress and make informed decisions.
- As a professor, I want aggressive or inappropriate comments filtered out so that I can review student feedback without unnecessary stress.
- As a professor, I want to generate automatic printable reports as PDFs based on specified timelines and selected classes so that I can easily share or archive my feedback summaries.
- As a professor, I want the system to include the prompt used to generate the initial report so that I can understand how the summary was created.
- As a professor who is not tech-savvy, I want the system to be user-friendly and intuitive so that I can easily navigate and use it without technical difficulties.
- As a department chair, I want to access the IDEA reports of the professors I oversee so that I can monitor their performance and provide support.
- As a professor, I want to view a history of my interactions with the chatbot so that I can reference previous insights and questions.
- As a professor, I want to engage in a chat about specific sections of the report so that I can ask targeted questions and receive detailed insights.
- As a professor, I want to download reports in multiple formats like PDF, CSV, and DOCX so that I can use them in various applications or share with others.
- As a professor, I want the AI to include citations of specific comments it used to generate insights so that I can verify and understand the basis of the analysis.
- As a professor, I want to see the program to have the same "Feel and Vibe" of other USU programs so that it feels familiar and easy to use.
- As a professor, I want the system to suggest additional questions I can ask so that I can gain more specific feedback.
- As a professor, I want to access and interact with the system on my mobile device so that I can review feedback on-the-go.
- As a department chair, I want to see which professors are active and using the platform so that I can provide oversight and encourage engagement.
