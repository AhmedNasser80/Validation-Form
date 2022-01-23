let userNameInput = document.getElementById("userName");
let userEmailInput = document.getElementById("email");
let userPasswordInput = document.getElementById("password");

let userInfo;
if(localStorage.getItem("users")==null)
{
    userInfo=[];
}
else
{
   userInfo = JSON.parse(localStorage.getItem("users"));
}



//for signUp Button
function signUp()
{
    userValidation();
    isExist();
     if(userValidation()==true && isExist()== false)
     {
        var user={
            name:userNameInput.value,
            email:userEmailInput.value,
            password:userPasswordInput.value
        };
        userInfo.push(user);
        localStorage.setItem("users",JSON.stringify(userInfo));
        document.getElementById("signin").style.display="block";
     }
    
}



// validation For form
function userNameValidation()
{
    let usernameAlert=document.getElementById("usernameAlert");
    let regex=/^[A-Za-z]{3,10}(\s?[A-Za-z]{3,10})?$/
    
     if(regex.test(userNameInput.value)==true &&userNameInput.value!="")
    {
        document.getElementById("usernameForm").classList.add("success");
        document.getElementById("usernameForm").classList.remove("error");
        usernameAlert.style.visibility= "hidden";
        return true;
    }
    else if(userNameInput.value == "")
    {
        document.getElementById("usernameForm").classList.add("error");
        document.getElementById("usernameForm").classList.remove("success");
        return false
    }
    else
    {
        document.getElementById("usernameForm").classList.add("error"); 
        document.getElementById("usernameForm").classList.remove("success");      
        usernameAlert.style.visibility= "visible";
        return false
    }
}


function userPasswordValidation()
{
    let userPasswordAlert= document.getElementById("userpasswordAlert");
    let regex= /^.{8,20}$/;
    
     if(regex.test(userPasswordInput.value)==true && userPasswordInput.value!="")
     {
        document.getElementById("passwordForm").classList.add("success");
        document.getElementById("passwordForm").classList.remove("error");
        userPasswordAlert.style.visibility= "hidden";
        return true;
     }
     else if(userPasswordInput.value=="")
    {
        document.getElementById("passwordForm").classList.add("error");
        document.getElementById("passwordForm").classList.remove("success");
        return false;
    }
    else
    {
        document.getElementById("passwordForm").classList.add("error");    
        document.getElementById("passwordForm").classList.remove("success");    
        userPasswordAlert.style.visibility= "visible";
        return false
    }
}


function useremailValidation()
{
    let useremailAlert= document.getElementById("useremailAlert");
    let regex= /@[A-Za-z]{5,20}(\.com)$/;
    if(regex.test(userEmailInput.value)==true && userEmailInput.value!="")
    {
        document.getElementById("emailForm").classList.add("success");
        document.getElementById("emailForm").classList.remove("error");
        useremailAlert.style.visibility= "hidden";

        return true
    }
    else if(userEmailInput.value=="")
    {
        document.getElementById("emailForm").classList.add("error");
        document.getElementById("emailForm").classList.remove("success");

        return false
    }
    else
    {
        document.getElementById("passwordForm").classList.add("error"); 
        document.getElementById("emailForm").classList.remove("success");       
        useremailAlert.style.visibility= "visible";
        return false
    }
}

function userValidation()
{
    userNameValidation();
    userPasswordValidation();
    useremailValidation();
    if(userNameValidation()==true && userPasswordValidation()==true && useremailValidation()==true )
    {
        return true;
    }
    else
    {
         return false;
    }
}


//is email is exist
function isExist()
{
   let existAlert= document.getElementById("existAlert");
   if(userInfo=[])
   {
         return false;

   }
   for(let i=0 ;i<userInfo.length;i++)
   {
       if(userInfo[i].email.toLowerCase()== userEmailInput.value.toLowerCase())
       {
        document.getElementById("emailForm").classList.add("error");
        existAlert.style.display="block";
        return true;
       }
       else
       {
           return false;
       }
   }
}

let SessionUsername=localStorage.getItem("username");
//for login
function logIn()
{ 
    let emailLogin=document.getElementById("loginEmail");
    let passwordLogin=document.getElementById("loginPassword");
    let loginBtn=document.getElementById("loginBtn");
    if(emailLogin.value == "" || passwordLogin.value == "")
    {
        document.getElementById("emailLog").classList.add("error");
        document.getElementById("passwordLog").classList.add("error");
        document.getElementById("fill").style.display="block";
        document.getElementById("invalid").style.display="none";

    }
    for(let i =0;i<userInfo.length;i++)
    {
        if(userInfo[i].email.toLowerCase()==emailLogin.value.toLowerCase() 
           && 
           userInfo[i].password.toLowerCase()==passwordLogin.value.toLowerCase())
        
           {
               localStorage.setItem("username",userInfo[i].name)
               loginBtn.setAttribute("href","html/welcome.html")
               
           }
           else
           {
            document.getElementById("emailLog").classList.add("error");
            document.getElementById("passwordLog").classList.add("error");
            document.getElementById("fill").style.display="none";
            document.getElementById("invalid").style.display="block";
        }
    }
}

//welcome 
function displayWelcome()
{
    document.getElementById("welcome").innerHTML= `welcome ${SessionUsername}`;
}
function logout()
{
    localStorage.removeItem('SessionUsername');
}