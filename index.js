// what is a web frame work
//express js is a web framework built over node js it manages all the files 
// express is unopinionated --it does not force you to make  a given structure

const express  = require('express');
const port = 4000; // server runs on a port 
const app = express(); // this app has all functionality of express
const path = require('path') // inbuilt module in express or node 
const connectToMongo =require('./db')
connectToMongo();
const Contact = require('./models/Contact')
//we are telling express that ejs is used as a template engine 
app.set('view engine','ejs');// app has multiple property , so by set method or function we are setting the property view engine to ejs 

app.set('views',path.join(__dirname , 'views'));//we are setting propert views -- 
app.use(express.urlencoded());//middleware 




// //Middleware 1
// app.use(function(req,res,next){
//     console.log("Middleware 1 called ");
//     next();
// })
// //Middleware 2
// app.use(function(req,res,next){
//     console.log("Middleware 2 is called ");
//     next();
// })



app.use(express.static('assets'));

var contactList = [
    {
        "name":"Aryan Tiwari",
        "number":1234567890
    },
    {
        "name":"Saket Tiwari",
        "number":12345674560
    },
    {
        "name":"Ananya Tiwari",
        "number":123334567890
    }
]
app.listen(port,function(err){
    if(err){
        console.log(err);
    }
     console.log("server is running on port " + port );
})


//returning the response -- 
app.get('/',function(req,res){
    res.send("Hello This is Aryan!");
})
app.get('/home',function(req,res){
    return res.render('home',{ title:"My contacts "});
})
app.get('/practice',function(req,res){
    return res.render('practice',{
        title:"let's play with ejs"
    })
})
app.get('/contacts',function(req,res){
        Contact.find({},function(err,contactList){
            if(err){
                console.log('error in fetching contacts')
                return;
            }
            return res.render('contact',{
                title:"Contact-List",
                contact_list : contactList
            })
             
        })
   
})
app.post('/create-contact',function(req,res){
   
    console.log(req.body);
    // contactList.push({
    //     name:req.body.name,
    //     number:req.body.number
    // })
    // return res.redirect('/contacts');
Contact.create({
    name:req.body.name,
    number:req.body.number
},function(err,newContact){
    if(err){
        console.log("Error in creating contact");
        return;
    }
    console.log('*********',newContact);
    return res.redirect('back')
})
// return res.redirect('back')
})
app.get('/delete_contact/:id',function(req,res){
    // console.log(req.params);
    // let phone = req.params.phone;
    // console.log(phone);
    // let contactIndex = contactList.findIndex( contact =>contact.number== phone);
    // if(contactIndex!=-1){
    //     contactList.splice(contactIndex ,1);
    // }else{
    //     console.log("Does not exist");
    // }
    // return res.redirect('back')

    let id = req.params.id;
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log("there is error ");
            return;
        }
        return res.redirect('back')
    })
})


