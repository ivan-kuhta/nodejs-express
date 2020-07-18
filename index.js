const express = require('express');

const app = express();


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is runnung http://127.0.0.1:${PORT}`);
})