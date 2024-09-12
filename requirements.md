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

# Requirement Descriptions

## Functional Requirements
- Description of the core functionalities that the system must perform.
- User interactions and system responses.

## Non-Functional Requirements
- Performance criteria such as speed, scalability, and reliability.
- Security requirements and data protection measures.

## Technical Requirements
- Hardware and software specifications.
- Integration with other systems and technologies.

## User Requirements
- User roles and permissions.
- Usability and accessibility considerations.

# Use Cases

- [ ] Create use case diagrams to visually represent the interactions between users and the system.
  - If anyone is familiar with Mermaid, we can include the diagrams directly inside the Markdown.
- [ ] Define and document each use case with a brief description.
- [ ] Outline the main flow and alternative flows for each use case.

# User Stories

- Simple Format: Write user stories in a simple, standardized format.
  - Template: "As a [role], I want to [action] so that [benefit]."
  - Example: "As a power-user, I want to quickly navigate the file system so that I can find the files I want to open."
  - Example: "As a guild captain, I want to choose a righteous quest so that my guild members will be happy with my leadership and not vote me out."
- Define "done": The story describes a complete interaction with the system from start to finish.
- Stick to One Actor: If the user story involves multiple users, consider splitting it into separate stories.
- Review and Update: Continuously review and update user stories as more is learned about the system or the users' needs.
- Keep stories up-to-date to reflect any changes in requirements.
