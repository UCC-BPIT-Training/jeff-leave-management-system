# Leave Management System

## 🎯 Objective

Create a simple Leave Management System that allows anyone to:

- File a leave request
- See the list of request
- Filter them
- Update or cancel (_if pending_)
- Approve or reject requests

## ☀️ Core Features

#### File a Leave Request

- Fields: name, email, leave type (sick/vacation), reason, date from and date to
- Status is `pending` by default

#### View Leave Requests

- Show list of all leave requests
- Display: name, email, type, reason, dates (from & to) and status

#### Filter Requests

- By email
- By status (pending/approved/rejected) can be multiple
- By date range

#### Update a Request

- Only if the request is still pending
- Can update any field except status

#### Cancel a Request

- If status is `pending`, allow deletion

#### Approve or Reject Request

- Action buttons to approve or reject if status is `pending`
- Optional: Add remarks

## 🚥 Suggested Routes

#### For UI

| Path                | Description                        |
| :------------------ | :--------------------------------- |
| `/`                 | List of all leave requests         |
| `/request/new`      | Page to file a new request         |
| `/request/:id/edit` | Page to update an existing request |

> 💡 Hint: You can use [`useParams`](https://reactrouter.com/api/hooks/useParams#useparams)

#### For API

| Method | Endpoint                                                                 | Description                      |
| :----- | :----------------------------------------------------------------------- | :------------------------------- |
| GET    | `/requests`                                                              | Get all leave requests           |
| GET    | `requests?email=x&status=pending+rejected&from=2025-04-01&to=2025-04-10` | Filtered search                  |
| POST   | `/requests`                                                              | Create a new leave request       |
| PUT    | `/requests/:id`                                                          | Update leave (or approve/reject) |
| DELETE | `/requests/:id`                                                          | Cancel a leave request           |

## 🖼️ UI Tips

- Use a simple table to display the list
- Dropdown or select for filtering status
- Date picker or `input type=date` for date range
- Use a modal or a separate page for filing or updating requests

## 👀 Evaluation Focus

- Clear UI and working routing
- Proper use of `useEffect`, `useState` and form handling.
- Filter and conditional buttons (cancel/edit/approve only if pending)
- UI properly calling express endpoints
- Clean code structure and separation
