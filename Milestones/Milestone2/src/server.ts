// lib/server.ts

import app from "./app";
const PORT = 3000;

app.set('view engine', 'ejs')
app.listen(PORT, () => {
    console.log(`Express server listening http://localhost:${PORT}/`);
})