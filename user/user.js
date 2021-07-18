const express = require('express')
const router = express.Router();
const db =  require('../db/db')

router.post('/signup', (req, res) => {

    //get data  from user 



    //SELECT B.* FROM Titles A INNER JOIN TitleDetails B ON A.id = B.title_id WHERE A.id = 2;


    var name = req.param('user_name');
    var phone = req.param('phone')
    var email = req.param('email')

    var password = req.param('password')
    var address = req.param('address')
    
    var country = req.param('country_id')


    //send data to mysql

    db.query('insert into   user  (user_name         ,password ,phone ,address,  email   ,  country_id  )  values (? ,? ,? ,?, ?,?)', [
        name, password, phone, address, email, country

    ],

        (err, result) => {


            if (err) {

                console.log(err)
                if (err.code == 1062){
                    res.status(403).json({
                        "status": false,
                        "message": "phone number already taken"
                    })
                }  
                
              
            }

           console.log(result)
            res.status(200).json({
                "status": true,
                "msg": "signup done succesfullty ",
            })


        })

 


});
router.get('/users' ,  (req, res) =>{
    db.query('select * from user', (err, result)=>{
if (err) {
    throw err;
}

        console.log(result);
    } )

})

router.get('/login', (req, res) => {

    //get user data
    var phone = req.query.phone;
    var password = req.query.password;


console.log(phone)
    //send data to mysql

    db.query('select * from user where phone =? AND password =? ', [phone ,  password], (error, results, fields) => {

        if (error) {
           res.status(500).json({
               "message" :  "server error  ,  plz try later"
           })
        }

        if (results.length > 0) {
            

            res.status(200).json({
                "status": true,
                "msg": "login done succesfullty " ,
                "data" :  results
            })


        } else {
res.status(404).json({
    "status" :  false  ,
    "msg" :"password/email not correct"
})
        }


    })




})


module.exports = router