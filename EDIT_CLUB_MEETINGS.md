# Editing Weekly Club Meetings

Edit this file for weekly club meeting points:

`layers/clubmeetings_9.js`

Each meeting is one `Feature` object inside the `"features"` array.

## Fields

- `id`: Unique number as text.
- `club`: Club name.
- `buildname`: Building name.
- `date`: Meeting date in `YYYY-MM-DD` format.
- `time`: Meeting time, such as `9:50 AM - 10:20 AM`.
- `classroom`: Room, station, or area.
- `info`: Extra directions or notes.
- `coordinates`: `[longitude, latitude]`.

## New Meeting Template

```js
{
  "type": "Feature",
  "properties": {
    "id": "3",
    "club": "Example Club",
    "buildname": "Stillman",
    "date": "2026-09-08",
    "time": "9:50 AM - 10:20 AM",
    "classroom": "Room 13",
    "info": "Enter through the north entrance."
  },
  "geometry": {
    "type": "Point",
    "coordinates": [-74.012637030446626, 41.422024072103945]
  }
}
```

Add a comma between meetings, but do not add a comma after the final meeting.
