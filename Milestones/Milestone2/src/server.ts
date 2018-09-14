import app from "./app";
const PORT = 3000;

//Get the server running
app.listen(PORT, () => {
    console.log(`Express server listening http://localhost:${PORT}/`);
})