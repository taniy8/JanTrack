
# JanTrack

Transparent Government Complaint Tracking System

## Overview

JanTrack is a digital platform designed to track government complaints end-to-end, from submission to resolution. Unlike existing complaint systems where citizens have no visibility once a complaint is filed, JanTrack makes the entire lifecycle transparent and accountable.

## Problem Statement

Citizens routinely file complaints with government offices for civic issues such as damaged roads, non-functional street lights, water supply problems, garbage collection, electricity faults, illegal construction, and delayed pensions or scholarships.

While complaint filing systems already exist, they generally fail to provide:

- Visibility into the current status of a complaint
- Information on which officer or department is handling it
- The duration a complaint has remained pending
- Reasons for delay
- Verification that action was actually taken before closure

## Solution

JanTrack replaces the opaque process of:

```
Complaint Filed -> ? -> Solution
```

with a defined, visible pipeline:

```
Submitted -> Verified -> Assigned to Department -> Assigned Officer
-> Work Started -> Proof Uploaded -> Citizen Feedback -> Closed
```

Citizens can view the status of their complaint at every stage.

## User Roles

### Citizen Dashboard

- Submit a complaint with category, description, photo or video, and location
- Receive a unique complaint ID (e.g. JT202600123)
- Track complaint status in real time
- Provide feedback after resolution; reopen the complaint if unresolved

### Officer Dashboard

- View assigned complaints with ID, location, category, priority, and deadline
- Update status: Received, Under Review, Field Visit Scheduled, Work in Progress, Completed
- Upload before and after proof of work to prevent closure without resolution

### Admin Dashboard

- View department-wise statistics: total, pending, and resolved complaints
- Monitor average resolution time
- Track escalations

## Key Features

- **AI Complaint Categorization**: Automatically classifies complaint category, priority, and responsible department based on the description
- **Duplicate Complaint Detection**: Identifies and merges complaints referring to the same issue
- **Auto Escalation**: Notifies higher authorities and the citizen if a complaint is not resolved within a defined period
- **Public Transparency Dashboard**: Displays anonymized, department-wise statistics publicly
- **Citizen Feedback System**: Allows complaints to be reopened if marked unresolved by the citizen

## Database Design

**Users**
`user_id, name, email, phone, role`

**Complaints**
`complaint_id, user_id, category, description, location, image, status, created_date, deadline, assigned_officer`

**Status History**
`history_id, complaint_id, old_status, new_status, updated_by, timestamp`

**Feedback**
`feedback_id, complaint_id, rating, comment`

## Tech Stack

- Frontend: React.js, Tailwind CSS
- Backend: Node.js with Express, or FastAPI
- Database: PostgreSQL or MongoDB
- Authentication: JWT
- Media Storage: Cloudinary
- Maps: Google Maps API
- AI/NLP: Complaint classification and duplicate detection

## Comparison with Existing Systems

| Existing Systems | JanTrack |
|---|---|
| Complaint submission only | End-to-end status tracking |
| No officer accountability | Officer accountability with proof of resolution |
| No verification before closure | Proof-based resolution (before/after images) |
| Manual categorization | AI-based classification |
| No public visibility | Public transparency dashboard |
| No performance insights | Department-wise analytics |

## Scope and Limitations

JanTrack does not guarantee that complaints will never be delayed. It ensures that:

- Pending complaints remain visible
- Delays are tracked
- Responsible departments are identifiable
- Escalation is possible when required

## Future Scope

- Mobile application for citizens
- SMS or WhatsApp notifications
- Multi-language support
- Integration with existing government portals such as CPGRAMS
- Predictive analytics for high-complaint areas


>>>>>>> a681e2d3acab11a6a0fc1767e92192d90c8c8ad9
