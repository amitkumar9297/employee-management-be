<https://drive.google.com/file/d/1cAJv6IiMZ5KDwQyDX_vB-gS1qyI7BfK9/view?usp=sharing>
[Download File](https://drive.google.com/file/d/1cAJv6IiMZ5KDwQyDX_vB-gS1qyI7BfK9/view?usp=sharing)

[▶ Click to Play Video](https://drive.google.com/file/d/1cAJv6IiMZ5KDwQyDX_vB-gS1qyI7BfK9/view?usp=sharing)




# Project Title

## Overview

This is the backend of the Employee Management System, built with **Node.js**, **Express.js**, and **TypeScript**. It provides APIs for **employee management**, **attendance tracking**, **leave management**, **notifications**, and more.

---



## Features

- **Authentication** : Secure login and registration with JWT.
- **Employee Management** : CRUD operations for employees.
- **Group Management** : Create groups of employees.
- **Broadcast Emails** : Send emails to groups or based on conditions.
- **Notifications** : Alerts for employee birthdays and work anniversaries.
- **Attendance Tracking** : Log in and out times for employees.
- **Leave Management** : Track leave and absence status.
- **Export Data** : Generate CSV/Excel reports for attendance.

---

## Technologies Used

- **Node.js**: Backend runtime.
- **TypeScript**: For strong typing and maintainability.
- **Express.js**: Web framework for APIs.
- **MongoDB & Mongoose**: NoSQL database and ODM.
- **JWT & bcryptjs**: Secure authentication.
- **Nodemailer**: Email notifications.
- **Socket.io**: Real-time notifications.
- **Multer**: File uploads (profile pictures, documents).
- **Day.js**: Date and time management.
- **Winston**: Logging and error tracking.
- **ExcelJS & json2csv**: Exporting reports to CSV/Excel.

---

## Folder Structure

```plaintext
src/
  employees/
    employee.routes.ts
    employee.controller.ts
    employee.service.ts
    employee.dto.ts
    employee.model.ts
  groups/
    group.routes.ts
    group.controller.ts
    group.service.ts
    group.dto.ts
    group.model.ts
  attendance/
    attendance.routes.ts
    attendance.controller.ts
    attendance.service.ts
    attendance.dto.ts
    attendance.model.ts
  notifications/
    notification.routes.ts
    notification.controller.ts
    notification.service.ts
    notification.dto.ts
    notification.model.ts
  user/
    user.routes.ts
    user.controller.ts
    user.service.ts
    user.dto.ts
    user.model.ts
    user.middleware.ts
  leaves/
    leave.routes.ts
    leave.controller.ts
    leave.service.ts
    leave.dto.ts
    leave.model.ts
  logs/
    log.routes.ts
    log.controller.ts
    log.service.ts
    log.dto.ts
    log.model.ts
  email/
    email.service.ts
    email.template.ts
  exports/
    export.service.ts
    export.utils.ts
  helpers/
    imports.helper.ts
    utils.ts
  app.ts
  index.ts

```

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/amitkumar9297/employee-management-be.git
   ```

2. Navigate to the project directory:

   ```bash
   cd quiz_backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file for environment variables:

   ```plaintext
   PORT=5000
   DATABASE_URL=mongodb://localhost:27017/quizApp
   JWT_SECRET=your_jwt_secret
   RATE_LIMIT_WINDOW=15 * 60 * 1000
   RATE_LIMIT_MAX=100
   ```

5. Start the development server:
   ```bash
   npm run local
   ```

---

## ER-Diagram

![ER-Diagram](https://github.com/user-attachments/assets/be21914f-8e8e-45f7-8cdd-93633d598ab7)



## DFD-Diagram

![DFD](https://github.com/user-attachments/assets/b0152119-9d00-4b52-94e2-a45bee258717)


