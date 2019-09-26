const express= require('express');
const app= express();
const port= 8000;
// app listens to the port
app.listen(port, function(err)
{
    if(err)
    {
        // console.log('Error', err);
        // instead it we use interpolation
        console.log(`Error in running the server: ${port}`);
    }
    console.log(`Server is running on port: ${port}`);
});