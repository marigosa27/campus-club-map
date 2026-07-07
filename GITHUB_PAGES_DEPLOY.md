# GitHub Pages Deploy Checklist

1. Create a new GitHub repository, for example `campus-club-map`.
2. Upload every file and folder from this qgis2web export into the repository root.
3. Make sure `index.html` is at the root, not inside a subfolder.
4. In GitHub, open Settings > Pages.
5. Under "Build and deployment", choose "Deploy from a branch".
6. Select branch `main` and folder `/root`.
7. Save.
8. Wait for GitHub Pages to finish publishing.

The public URL will usually be:

`https://YOUR-USERNAME.github.io/campus-club-map/`

After publishing, test the map on a phone. Browser geolocation works best from HTTPS, which GitHub Pages provides automatically.
