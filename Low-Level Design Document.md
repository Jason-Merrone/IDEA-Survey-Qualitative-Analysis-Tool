# Low-Level Design Document Outline

## 1. Introduction
- Brief overview of the project.
- Purpose of the low-level design document.

![Diagram](images/InformationFlowchart.png)

## 2. Module Breakdown

### 2.1. User Interface (UI/UX)
#### 2.1.1. Description
- Define how the user interface will provide intuitive interactions for professors with minimal technical expertise.

#### 2.1.2. Key Considerations
1. **Performance:**
   - Ensure lightweight, responsive design.
   - Use efficient rendering frameworks (e.g., React, Angular) to minimize load times and improve speed.

2. **Maintainability:**
   - Modular design for UI components, allowing for easy updates without disrupting other parts.
   - Use component-based architecture (e.g., reusable widgets) to simplify future updates.

3. **Integration:**
   - Ensure smooth integration with the authentication system (SSO).
   - Embed report generation and data display seamlessly within the UI to avoid manual processes.

4. **Complexity:**
   - Limit unnecessary complexity; keep the UI straightforward.
   - Implement navigation menus, buttons, and filters that allow professors to easily find and analyze feedback.

5. **Object-Oriented Design:**
   - Break the UI down into objects like `LoginPage`, `Dashboard`, `ReportViewer`, and `SettingsPanel`.
   - Each object/class represents a part of the user flow, ensuring cohesion between visual elements.

---

### 2.2. Security
#### 2.2.1. Description
- Explain the security protocols implemented to protect user data and maintain access control.

#### 2.2.2. Key Considerations
1. **Performance:**
   - Use lightweight encryption algorithms and minimize security-related bottlenecks (e.g., secure token caching).
   - Optimize secure database queries to avoid performance hits when authenticating users.

2. **Maintainability:**
   - Ensure security measures, like token authentication and password policies, are modular and upgradable without needing extensive codebase rewrites.
   - Implement role-based access control to adjust permissions easily.

3. **Integration:**
   - Seamless integration with the university's Single Sign-On (SSO) system.
   - Link to data governance tools and alert systems for unauthorized access detection.

4. **Complexity:**
   - Simplify security checks by grouping similar functionality into distinct modules (e.g., an `AuthorizationModule` that handles all permission checks).
   - Keep security policies centralized to avoid redundant code and scattered logic.

5. **Object-Oriented Design:**
   - Encapsulate security-related functions in classes like `AuthManager`, `SessionHandler`, and `PermissionValidator`.
   - Abstract sensitive data handling into private methods to enforce encapsulation.

---

### 2.3. Database Normalization
#### 2.3.1. Description
- Detail how the database schema is designed to ensure data consistency, avoid redundancy, and maintain integrity.

#### 2.3.2. Key Considerations
1. **Performance:**
   - Use optimized database queries and indexes to speed up lookups.
   - Ensure that normalized data structures (e.g., relational models) do not result in slow join operations by designing efficient keys.

2. **Maintainability:**
   - Design the database schema with third normal form (3NF) to reduce redundancy.
   - Simplify schema updates by using clear foreign key relationships and appropriate constraints.

3. **Integration:**
   - Ensure that the database integrates well with both the AI summarization engine and the user interface.
   - Link to external systems, such as the SSO service, for seamless data sharing and access logging.

4. **Complexity:**
   - Keep database design straightforward, focusing on clear relationships (e.g., between classes, professors, and reports).
   - Reduce unnecessary complexity by avoiding deep nesting and focusing on simple, readable tables.

5. **Object-Oriented Design:**
   - Use Object-Relational Mapping (ORM) tools (e.g., Hibernate) to model database tables as classes, making interaction with the database easier through object instances.
   - Define classes like `Professor`, `Report`, `Comment`, and `Department` that correspond to tables and relationships in the database.

---

## 3. Module Focus on Key Design Elements

### 3.1 PDF Parsing Module
- **Description**: This module will handle the extraction of text from uploaded PDF documents, converting them into strings that can be processed by other components of the system (e.g., for AI-based summarization).

#### 3.1.1. Key Considerations

1. **Performance:**
   - Use efficient libraries (e.g., `PyPDF2`, `PDFBox`, or `Tika`) to quickly extract text from PDFs.
   - Implement batch processing for multiple PDF uploads to avoid performance bottlenecks.
   - Cache extracted text for larger PDFs to reduce repeated parsing time.

2. **Maintainability:**
   - Design the PDF parsing functionality as a service that can be easily updated or replaced without disrupting other system modules.
   - Isolate parsing logic from other business logic to ensure updates in parsing libraries do not affect other components.

3. **Integration:**
   - Ensure seamless integration with the user-upload functionality and the AI Summarization Module.
   - Parsed text should be directly passed to the AI summarization system or stored in the database for future use.

4. **Complexity:**
   - Keep the PDF parsing logic simple by modularizing it—handle different types of PDF structures (e.g., text-heavy, image-heavy) in separate components.
   - Minimize the number of dependencies and library configurations needed to extract text.

5. **Object-Oriented Design:**
   - Create distinct classes like `PDFParser`, `DocumentProcessor`, and `TextExtractor` to encapsulate PDF parsing logic.
   - The `PDFParser` class should handle PDF file input and coordinate with `TextExtractor` to output strings.
   - Ensure that `DocumentProcessor` can extend functionality, allowing additional document types (e.g., Word, images with OCR) to be parsed in the future.
---

# 4 API Design

Below this is portrayed a representation of the different components of the system and their relations to each other. Some sort of API exists where lines are drawn between system modules (not including the relationship between the user and the client). This means that there will essentially be 3 APIs:
- Client-Server API
- Server-Database API
- Server-AI API

Each of the following APIs will be described in detail in the following sections.

![System Organization](images/TechStack.png)

## 4.1 API Descriptions

### 4.1.1 Client-Server API
- **Description**: This API will handle the communication between the client-side UI and the server-side application, allowing professors to interact with the system and view feedback reports. Luckily for us, since we are using Next.JS, we can take advantage of the built in structure provided to us to fulfill the requirements of this API. Our client will use React, but with Next.JS, this entire layer will be abstracted away from us using the magic of server side rendering.

### 4.1.2 Server-Database API
- **Description**: This API will manage the interaction between the server application and the database, handling data retrieval, storage, and updates. This API will be also be primarily abstracted away from us by using Next.JS and Prisma. Prisma is an ORM that will handle all of the database interactions for us. A reference from a server-side function to a Prisma query will look like this:

```javascript
export async function getStaticProps() {
  const prisma = new PrismaClient()
  const report = await prisma.reports.findFirst(
    where: {
      professor: {
        id: 1
      },
      course:
      {
        id: 1
      },
      semester:
      {
        id: 1
      }
    }
  )

  return {
    props : { posts }
  }
}
```

This will return the report for the professor with the id of 1, the course with the id of 1, and the semester with the id of 1. This is a very simple example, but it shows how easy it is to interact with the database using Prisma inside of a component.

### 4.1.3 Server-AI API

- **Description**: This API will facilitate communication between the server application and the AI Summarization Module, allowing for the summarization of feedback reports. This API will be the most complex because there needs to be some communication layer between the server and a Python handled AI server.

#### 4.1.3.1 Semantic Analysis API

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

#### 4.1.3.2 Report Summarization API

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

## 4.2 Error Handling

### 4.2.1 Error Codes
The following error codes may be returned by the API:
- `400 Bad Request`: Invalid input parameters.
- `401 Unauthorized`: User is not authenticated.
- `403 Forbidden`: User does not have permission to access the resource.
- `404 Not Found`: Resource not found.
- `500 Internal Server Error`: Unexpected server error.

### 4.2.2 Priority of Error Handling
- **Authorization Errors**: Unauthorized errors should be handled first to ensure data security. This means that the an unauthenticated user can not determine what resource exists on a server or not by probing for 403 and 404 errors.

- **Validation Errors**: Bad request errors should be handled next to ensure that the user is aware of the invalid input parameters.

- **Permission Errors**: Forbidden errors should be handled next. This ensures that an authenticated user cannot probe around the server to find existing resources that they do not have access to.

- **Not Found Errors**: Not found errors should be handled next. This should only be returned if an authenticated user is trying to access their own resources that do not exist.

- **Server Errors**: Internal server errors should be handled last as they are unexpected and should be logged for debugging purposes.

---

## 5. Conclusion
- Summary of how the design meets the project goals of UI/UX, Security, and Database Normalization.
- Emphasize how performance, maintainability, integration, complexity, and object-oriented principles are applied throughout the system.
