const express= require('express');
const path= require('path');
const port= 8000;
const db= require('');
const Contact= require('./models/Contact');

const app= express();

app.set('view engine',  'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));
// app.use(function(req, res, next){
//     console.log("middleware 1 called");
//     next();
// });
// var contactList=[
// {
//     name: "Jaskiran",
//     phone: "9205013625"
// },
// {
//     name: "Manpreet",
//     phone: "9891675073"
// },
// {
//     name: "Yugraj",
//     phone: " 9560576382"
// }];
// var taskList=[
//     {
//         description: "Birthday",
//         date: "27-12-1998",
//         category: "Personal"
//     },
//     {
//         description: "Birthday",
//         date: "28-12-1998",
//         category: "Personal"
//     }
    
// ];
app.get('/', function(req, res)
{
    // return res.render('home', { title: "contact list", contactList: contactList});
    Contact.find({}, function(err, contacts)
    {
        if(err)
        {
            console.log('Error in fetching contacts from db');
            return;
        }   
        return res.render('home', 
        { 
            title: "contact list", 
            contactList: contacts
        });
 });
});
app.get('/practice', function(req, res)
{
    return res.render('practice', { title: "Let us play with ejs"});
});
app.post('/create-contact', function(req, res)
{
    // return res.redirect('/practice');
    // console.log(req.body);
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });
    Contact.create(
        {
            name: req.body.name,
            phone: req.body.phone
        }, function(err, newContact)
        {
            if(err)
            {
                    console.log("error in creating a contact!");
                    return;
            }
            console.log('********', newContact);
            return res.redirect('back');
        });
});

app.get('/delete-contact', function(req, res)
{
    // console.log(req.params);
    // let phone= req.params.phone;
    // console.log(req.query);
    let id= req.query.id;
    Contact.findByIdAndDelete(id, function(err)
    {
        if(err)
        {
            console.log('error in deleting an object from database');
            return;
        }
        return res.redirect('back');
    });
    // let contactIndex= contactList.findIndex(contact => contact.phone==phone);
    // if(contactIndex!=-1)
    // {
    //     contactList.splice(contactIndex, 1);
    // }
     //brings back to the same page
});

app.listen(port, function(err)
{
    if(err)
    {
        console.log("Error", err);
    }
    console.log("Running successfully on", port);
});