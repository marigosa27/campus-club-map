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

## Move a Club Meeting Point

1. Open the map in a browser.
2. Hold `Shift` and click the exact campus location where the club meets.
3. The map will show the point coordinates and try to copy them automatically.
4. Open `layers/clubmeetings_9.js`.
5. Find the meeting you want to move.
6. Replace the existing `coordinates` value with the copied coordinates.

Example:

```js
"coordinates": [-74.012637030446626, 41.422024072103945]
```

Coordinates must stay in this order:

```text
[longitude, latitude]
```

Do not reverse them. Latitude/longitude in the wrong order will place the point far away from campus.

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

## Add a New Club Meeting Point

1. Open the map.
2. Hold `Shift` and click the meeting location.
3. Copy the coordinates shown by the map.
4. Copy the template above.
5. Paste it inside the `"features"` array in `layers/clubmeetings_9.js`.
6. Change the `id`, `club`, `buildname`, `date`, `time`, `classroom`, and `info`.
7. Replace the template coordinates with the coordinates from the map.
8. Save the file and refresh the browser.
