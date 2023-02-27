const path  = require('path')
const mysql = require('mysql')

const pool = mysql.createPool({
    connectionLimit: '10',
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

exports.view = (req,res) =>{
    pool.getConnection((err,connection)=>{
    if(err) console.log(err);
    else console.log('Connected as ID '+connection.threadId);
    connection.query('select * from user',(err,rows)=>{
        connection.release();
        if(!err){
            imageList = [];
            imageList.push({ src:"public/shivendu-shukla-3yoTPuYR9ZY-unsplash.jpg", name:"image1"});
            res.render('home',{ rows,imageList:imageList });
        }else{
            console.log(err);
        }
    })
})
};

exports.viewusers = (req,res) =>{
    pool.getConnection((err,connection)=>{
    if(err) console.log(err);
    else console.log('Connected as ID '+connection.threadId);
    connection.query('select * from user',(err,rows)=>{
        connection.release();
        if(!err){
            res.render('users',{ rows });
        }else{
            console.log(err);
        }
    })
})
};

exports.login = (req,res) =>{
    res.render('user-login')
}

exports.loginInfo = (req,res) => {
    pool.getConnection((err,connection)=>{
        if(err) console.log(err);
        else console.log('Connected as ID '+connection.threadId);
        let { username,password } = req.body;
        console.log(username,password);
        if( username && password )
        {
            connection.query('select * from user where User_Name=? and Password=?',[username,password],(err,rows)=>{
            connection.release();
            if(!err){
                if( rows.length!=0 ){
                   res.redirect(`/dashboard/${username}`);
                }
                else{
                    res.render('user-login',{ alert: 'Account not found! Create new.'})
                }
            }else{
                console.log(err);
            }
        })}
        else{
            res.render('user-login',{alert: 'Enter the details properly'})
        }
    })
}

// Find user by search
exports.find = (req,res) =>{
    pool.getConnection((err,connection)=>{
        if(err) console.log(err);
        else console.log('Connected as ID '+connection.threadId);
        let searchTerm = req.body.search;
        connection.query('select * from user where F_Name like ? or L_Name like ?',['%'+searchTerm+'%','%'+searchTerm+'%'],(err,rows)=>{
            connection.release();
            if(!err){
                res.render('home',{ rows });
            }else{
                console.log(err);
            }
        })
    })
};

exports.form = (req,res) => {
    res.render('add-user');
}

// To insert user
exports.create = (req,res) => {
    pool.getConnection((err,connection)=>{
        if(err) console.log(err);
        else console.log('Connected as ID '+connection.threadId);
        let { username,password,fname,mname,lname,age,salary,usertype,email,gender } = req.body;
        connection.query('insert into user set User_Name=?,Password=?,User_Type=?,F_Name=?,M_Name=?,L_Name=?,Age=?,Salary=?,Email=?,Gender=?',[username,password,usertype,fname,mname,lname,age,salary,email,gender],(err,rows)=>{
            connection.release();
            if( password.length <= 8 ){
            if(!err){
                if( usertype='O' ){
                    pool.getConnection((err,connection1)=>{
                        if(err) console.log(err);
                        else console.log('Connected as ID '+connection1.threadId);
                        connection1.query('insert into office values(?)',username,(err,rows)=>{
                            connection1.release();
                           if(err) console.log(err);
                        })
                    })
                }
                if( usertype='E' ){
                    res.redirect(`additional/${username}`);
                }
            }else{
                console.log(err);
            }
        }
            else{
                res.render('add-user',{ alert:'Password must be less than 8 characters' });
            } 
        })
    })
};

exports.additional = (req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) console.log(err);
        else console.log('Connected as ID '+connection.threadId);
        connection.query('select * from user where User_Name = ?',[req.params.username],(err,rows)=>{
            connection.release();
            if(!err){
                res.render('additional',{ rows });
            }else{
                console.log(err);
            }
        })
    }) 
};

exports.additionalform = (req,res)=>{
    let { username,qualification,location,date } = req.body;
    pool.getConnection((err,connection)=>{
        if(err) console.log(err);
        else console.log('Connected as ID '+connection.threadId);
        connection.query('insert into engineer values(?,?,?,?)',[username,qualification,location,date],(err,rows)=>{
            connection.release();
            if(!err){
                pool.getConnection((err,connection)=>{
                    if(err) console.log(err);
                    else console.log('Connected as ID '+connection.threadId);
                    connection.query('select * from engineer where User_Name = ?',[req.params.username],(err,rows)=>{
                        connection.release();
                        if(!err){
                            res.render('additional',{ rows,alert:`Thanks for the additional details` });
                        }else{
                            console.log(err);
                        }
                    })
                })
            }else{
                console.log(err);
            }
        })
    })
};

//To edit user
exports.edit = (req,res) => {
    pool.getConnection((err,connection)=>{
        if(err) console.log(err);
        else console.log('Connected as ID '+connection.threadId);
        connection.query('select * from user where User_Name = ?',[req.params.username],(err,rows)=>{
            connection.release();
            if(!err){
                res.render('edit-user',{ rows });
            }else{
                console.log(err);
            }
        })
    })
};

// Update user
exports.update = (req,res) => {
    let { username,password,fname,mname,lname,age,salary,usertype,email,gender } = req.body;
    pool.getConnection((err,connection)=>{
        if(err) console.log(err);
        else console.log('Connected as ID '+connection.threadId);
        connection.query('update user set Password=?,User_Type=?,F_Name=?,M_Name=?,L_Name=?,Age=?,Salary=?,Email=?,Gender=? where User_Name = ?',[ password,usertype,fname,mname,lname,age,salary,email,gender,req.params.username],(err,rows)=>{
            connection.release();
            if(!err){
                pool.getConnection((err,connection)=>{
                    if(err) console.log(err);
                    else console.log('Connected as ID '+connection.threadId);
                    connection.query('select * from user where User_Name = ?',[req.params.username],(err,rows)=>{
                        connection.release();
                        if(!err){
                            res.redirect(`/dashboard/${username}`);
                        }else{
                            console.log(err);
                        }
                    })
                })
            }else{
                console.log(err);
            }
        })
    })
};

exports.delete = (req,res) => {
    pool.getConnection((err,connection)=>{
        if(err) console.log(err);
        else console.log('Connected as ID '+connection.threadId);
        connection.query('delete from user where User_Name = ?',[req.params.username],(err,rows)=>{
            connection.release();
            if(!err){
                res.redirect('/');
            }else{
                console.log(err);
            }
        })
    })
};

exports.viewall = (req,res) =>{
    pool.getConnection((err,connection)=>{
    if(err) console.log(err);
    else console.log('Connected as ID '+connection.threadId);
    connection.query('select * from user where User_Name = ?',[req.params.username],(err,rows)=>{
        connection.release();
        if(!err){
            res.render('view-user',{ rows });
        }else{
            console.log(err);
        }
    })
})
};

exports.viewtenders = (req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) console.log(err);
        else console.log('Connected as ID '+connection.threadId);
        connection.query('select * from tender where User_Name = ?',[req.params.username],(err,rows)=>{
            connection.release();
            if(!err){
                res.render('tenders',{ rows });
            }else{
                console.log(err);
            }
        })
    }) 
}

exports.addtenders = (req,res)=>{
    res.render('add-tenders');
}

exports.addtenderssuccess = (req,res) => {
    let { company,tender,cost,location,date,info } = req.body;
    pool.getConnection((err,connection)=>{
        if(err) console.log(err);
        else console.log('Connected as ID '+connection.threadId);
        connection.query('insert into tender values(?,?,?,?,?,?,?)',[req.params.username,company,tender,cost,location,date,info],(err,rows)=>{
            connection.release()
            if(!err){
                res.render('add-tenders',{alert: 'Tender added successfully!'})
            }
            else{
                console.log(err);
                res.render('add-tenders',{alert: 'Tender already exists'})
            }
        })   
    })
}

exports.edittenders = (req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) console.log(err);
        else console.log('Connected as ID '+connection.threadId);
        connection.query('select * from tender where Tender_Id = ?',[req.params.tender],(err,rows)=>{
            connection.release();
            if(!err){
                res.render('edit-tenders',{ rows });
            }else{
                console.log(err);
            }
        })
    })
}

exports.edittenderssuccess = (req,res)=>{
    let { company,tender,cost,location,date,info } = req.body;
    pool.getConnection((err,connection)=>{
        if(err) console.log(err);
        else console.log('Connected as ID '+connection.threadId);
        connection.query('update tender set Company_Name=?,Estimated_Cost=?,Location=?,Start_Date=?,Tender_Info=? where Tender_Id=?',[company,cost,location,date,info,req.params.tender],(err,rows)=>{
            connection.release()
            if(!err){
                res.redirect(`/tenders/${req.params.username}`);
            }
            else{
                console.log(err);
                res.render('edit-tenders',{alert: 'Fill the details properly'})
            }
        })   
    })
}

exports.deletetenders = (req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) console.log(err);
        else console.log('Connected as ID '+connection.threadId);
        connection.query('delete from tender where Tender_Id = ?',[req.params.tender],(err,rows)=>{
            connection.release();
            if(!err){
                res.redirect(`/tenders/${req.params.username}`);
            }else{
                console.log(err);
            }
        })
    })
}

exports.tenders = (req,res) => {
    pool.getConnection((err,connection)=>{
        if(err) console.log(err);
        else console.log('Connected as ID '+connection.threadId);
        connection.query('select a.Company_Name,a.Location,a.Tender_Info,a.Tender_Id,b.F_Name,b.L_Name from tender as a join user as b on a.User_Name = b.User_Name',(err,rows)=>{
            connection.release();
            if(!err){
                res.render('alltenders2',{ rows });
            }else{
                console.log(err);
            }
        })
    })
}

exports.selectprojects = (req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) console.log(err);
        else console.log('Connected as ID '+connection.threadId);
        connection.query('select a.Company_Name,a.Location,a.Tender_Info,a.Tender_Id,b.F_Name,b.L_Name from tender as a join user as b on a.User_Name = b.User_Name',(err,rows)=>{
            connection.release();
            if(!err){
                res.render('alltenders',{ rows });
            }else{
                console.log(err);
            }
        })
    })
}

exports.addprojects = (req,res) =>{
    res.render('add-project');
}

exports.addprojectssuccess = (req,res)=>{
    let { project,username,site,deadline } = req.body;
    pool.getConnection((err,connection)=>{
        if(err) console.log(err);
        else console.log('Connected as ID '+connection.threadId);
        connection.query('insert into project values(?,?,?,?,?)',[project,deadline,site,req.params.tender,username],(err,rows)=>{
            connection.release()
            if(!err){
                res.render('add-project',{alert: 'Project added successfully!'})
            }
            else{
                console.log(err);
                res.render('add-project',{alert: 'Project already exists'})
            }
        })   
    })
}

exports.particulartender = (req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) console.log(err);
        else console.log('Connected as ID '+connection.threadId);
        connection.query('select * from tender where Tender_Id=?',[req.params.tender],(err,rows)=>{
            connection.release();
            if(!err){
                res.render('particular-tender',{ rows });
            }else{
                console.log(err);
            }
        })
    })
}

exports.viewprojects = (req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) console.log(err);
        else console.log('Connected as ID '+connection.threadId);
        connection.query('select a.Project_Id,a.Engineer_Id,b.Company_Name,b.Start_Date,a.Project_Deadline,a.Site,b.Estimated_Cost,b.Tender_Info from project as a join tender as b on a.Tender_Id = b.Tender_Id where Engineer_Id=?',[req.params.username],(err,rows)=>{
            connection.release();
            if(!err){
                res.render('projects',{ rows });
            }else{
                console.log(err);
            }
        })
    })
}

exports.editprojects = (req,res) => {
    pool.getConnection((err,connection)=>{
        if(err) console.log(err);
        else console.log('Connected as ID '+connection.threadId);
        connection.query('select * from project where Project_Id = ?',[req.params.project],(err,rows)=>{
            connection.release();
            if(!err){
                res.render('edit-projects',{ rows });
            }else{
                console.log(err);
            }
        })
    })
}

exports.editprojectssuccess = (req,res) => {
    let { username,deadline } = req.body;
    pool.getConnection((err,connection)=>{
        if(err) console.log(err);
        else console.log('Connected as ID '+connection.threadId);
        connection.query('update project set Project_Deadline=? where Project_Id=?',[deadline,req.params.project],(err,rows)=>{
            connection.release()
            if(!err){
                res.redirect(`/projects/${req.params.username}`);
            }
            else{
                console.log(err);
                res.render('edit-projects',{alert: 'Fill the details properly'})
            }
        })   
    })
}

exports.deleteproject = (req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) console.log(err);
        else console.log('Connected as ID '+connection.threadId);
        connection.query('delete from project where Project_Id = ?',[req.params.project],(err,rows)=>{
            connection.release();
            if(!err){
                res.redirect(`/projects/${req.params.username}`);
            }else{
                console.log(err);
            }
        })
    })
}

exports.viewsupplies = (req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) console.log(err);
        else console.log('Connected as ID '+connection.threadId);
        let project = req.params.project;
        connection.query('select * from supplies where Project_Id = ?',[req.params.project],(err,rows)=>{
            connection.release();
            if(!err){
                res.render('supplies',{ rows });
            }else{
                console.log(err);
            }
        })
})
}

exports.addsupplies = (req,res) => {
    res.render('add-supplies');
}

exports.addsuppliessuccess = (req,res) => {
    let { project,item,quantity,itemid,price } = req.body;
    pool.getConnection((err,connection)=>{
        if(err) console.log(err);
        else console.log('Connected as ID '+connection.threadId);
        connection.query('insert into supplies values(?,?,?,?,?)',[project,item,quantity,price,itemid],(err,rows)=>{
            connection.release()
            if(!err){
                res.render(`add-supplies`)
            }
            else{
                res.render('add-supplies',{alert:'Enter new item id'})
                console.log(err);
            }
        })   
    })
}

exports.editsupplies = (req,res) => {
    pool.getConnection((err,connection)=>{
        if(err) console.log(err);
        else console.log('Connected as ID '+connection.threadId);
        connection.query('select * from supplies where Item_Id = ?',[req.params.item],(err,rows)=>{
            connection.release();
            if(!err){
                res.render('edit-supplies',{ rows });
            }else{
                console.log(err);
            }
        })
    })
}
exports.editsuppliessuccess = (req,res) => {
    let { project,item,quantity,itemid,price } = req.body;
    pool.getConnection((err,connection)=>{
        if(err) console.log(err);
        else console.log('Connected as ID '+connection.threadId);
        connection.query('update supplies set Quantity=?,Item=?,Price=? where Item_Id=?',[quantity,item,price,req.params.item],(err,rows)=>{
            connection.release()
            if(!err){
                res.redirect(`/supplies/${project}`);
            }
            else{
                console.log(err);
                res.render('edit-supplies',{alert: 'Fill the details properly'})
            }
        })   
    }) 
}

exports.deletesupplies = (req,res) => {
    pool.getConnection((err,connection)=>{
        if(err) console.log(err);
        else console.log('Connected as ID '+connection.threadId);
        connection.query('delete from supplies where Item_Id = ?',[req.params.item],(err,rows)=>{
            connection.release();
            if(!err){
                res.redirect(`/supplies/${req.params.project}`);
            }else{
                console.log(err);
            }
        })
    })
}

exports.viewlabour = (req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) console.log(err);
        else console.log('Connected as ID '+connection.threadId);
        let project = req.params.project;
        connection.query('select * from labour where Project_Id = ?',[req.params.project],(err,rows)=>{
            connection.release();
            if(!err){
                res.render('labour',{ rows });
            }else{
                console.log(err);
            }
        })
})
}

exports.addlabour = (req,res) => {
    res.render('add-labour');
}

exports.addlaboursuccess = (req,res) => {
    let { project,name,work,wage } = req.body;
    pool.getConnection((err,connection)=>{
        if(err) console.log(err);
        else console.log('Connected as ID '+connection.threadId);
        connection.query('insert into labour values(?,?,?,?)',[project,name,work,wage],(err,rows)=>{
            connection.release()
            if(!err){
                res.render(`add-supplies`)
            }
            else{
                res.render('add-supplies',{alert:'Enter new item id'})
                console.log(err);
            }
        })   
    })
}

exports.allprojects = (req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) console.log(err);
        else console.log('Connected as ID '+connection.threadId);
        connection.query('select a.Company_Name,a.Location,a.Tender_Info,a.Tender_Id,b.F_Name,b.L_Name from project as c join tender as a on c.Tender_Id = a.Tender_Id join user as b on c.Engineer_Id = b.User_Name',(err,rows)=>{
            connection.release();
            if(!err){
                console.log(rows);
                res.render('allprojects',{ rows });
            }else{
                console.log(err);
            }
        })
    })
}