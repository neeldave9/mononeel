---
title: "LiteCrack"
description: "Distributed hash cracking system"
date: "November 20 2023"
repoURL: "https://github.com/neeldave9/litecrack-fullstack"
---
![LiteCrack Home](/litecrack-home.png)


LiteCrack is a password-cracking application that utilizes John the Ripper to perform heavy computational tasks. The application is designed with scalability in mind, using AWS SQS to manage the queue of cracking requests, and EC2 instances to perform the actual computations. The front-end, built with React, provides an interface for users to submit password-cracking jobs and view the results.


## 📋 Features

- Scalable Password Cracking: The application scales the number of EC2 workers based on the volume of password-cracking requests.
- Real-Time Updates: Users can submit password-cracking jobs and receive real-time updates on the status of their requests.
- Efficient Queue Management: SQS is used to manage the queue of cracking requests, ensuring that each request is processed efficiently.
- Responsive UI: The React front-end provides a responsive and user-friendly interface for interacting with the application.

## 🧱 Architecture

The LiteCrack application follows a microservices architecture, where each component is designed to perform a specific task. The key components are:

- EC2 Worker: The core computation unit responsible for running John the Ripper to crack passwords. The worker is designed to scale based on the traffic, with the help of SQS.
- SQS (Simple Queue Service): Manages the queue of password-cracking requests, ensuring that each request is handled efficiently without overwhelming the EC2 workers.
- S3 (Simple Storage Service): Used to store the results of the password-cracking process and any other necessary files.
- Front-End (React): The user interface for the application, allowing users to submit password-cracking requests and view results.
- Back-End (Node.js): Handles API requests from the front-end and interacts with the SQS and EC2 workers.

![LiteCrack Architecture](/litecrack-architecture.png)