## Demo Video

Link: https://drive.google.com/file/d/1yYkfYRCucE_9L5NuUS1ScBIQbW3zyTN1/view?usp=sharing

## Stage 1

In Stage 1, the goal was to fetch and process notifications from the given API.

### Approach

- Notifications are fetched from the API using an authenticated request.
- The response is processed to extract notification data.

### Sorting Logic

Notifications are sorted based on:

1. Priority:
   - Placement (highest)
   - Result
   - Event (lowest)

2. Recency:
   - More recent notifications appear first.

### Output

- Top 10 notifications are selected after sorting.
- Output is displayed in the console.

### Logging

- Logging middleware is used to log:
  - API request initiation
  - API response received
  - Data processing steps
  - Error handling
 
## Stage 2

In Stage 2, a full frontend application was built using React and Material UI to display and interact with notifications.

### Features Implemented

- Display of:
  - All notifications
  - Priority notifications (Top N)

### Filtering

- Users can filter notifications by type:
  - Event
  - Result
  - Placement
  - All

### Pagination

- API-based pagination is implemented using:
  - Page number
  - Limit
- Users can navigate through pages using buttons.

### Priority Handling

- Notifications are sorted using:
  - Priority (Placement > Result > Event)
  - Timestamp (latest first)

### Viewed vs New

- Clicking a notification marks it as "viewed".
- Viewed notifications are visually distinguished from new ones using UI styling.

### UI Design

- Built using Material UI components.
- Clean dashboard layout with:
  - Sections for Priority and All notifications
  - Responsive design for desktop and mobile

### Logging

- Logging is integrated for:
  - API calls
  - State updates
  - Error handling

### Additional Improvements

- Proxy configuration used to handle CORS issues.
- Environment variables used to securely store API tokens.

