//  =========cdn import firebase without install ==========
//  import{app, auth,db,storage} from "./firebase.js",
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import{getAuth,createUserWithEmailAndPassword,onAuthStateChanged ,signInWithEmailAndPassword,sendEmailVerification,signOut } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
 import {getFirestore,doc, setDoc,updateDoc,collection, addDoc,onSnapshot } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
 import { getStorage,ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js";


 const firebaseConfig = {
  apiKey: "AIzaSyCWlX5JNC6gtx2a-Bgja3HxOiCrEdlGWGU",
  authDomain: "hackathon-project-d6b9f.firebaseapp.com",
  projectId: "hackathon-project-d6b9f",
  storageBucket: "hackathon-project-d6b9f.appspot.com",
  messagingSenderId: "374750011616",
  appId: "1:374750011616:web:fb7ff685aed713f08cb085",
  measurementId: "G-WPXV9YQB54"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);




  //============ new User add work=========

  let signUpEmail = document.querySelectorAll(".sigup-email")[0];
  let signUpPassword = document.querySelectorAll(".sigup-password")[0];
  let signUpBtn = document.querySelectorAll(".sigup")[0];
  let errorMsg = document.querySelectorAll(".error-msg")[0];
  let firstName = document.querySelectorAll(".first-name")[0];
  let lastName = document.querySelectorAll(".last-name")[0];
  

  
  
  let newUser = ()=>{
    
    if(firstName.value.trim()&&lastName.value.trim()){
      let margeName= firstName.value + " " + lastName.value;
      console.log(margeName)
      createUserWithEmailAndPassword(auth, signUpEmail.value, signUpPassword.value)
      
      .then(async(res) => {
        const user = res.user;
        
        window.open("home.html")

        // await setDoc(doc(db, "blogs", user.uid), {
           
        //       name:margeName,
        //       uid:user.uid
            
        //     });
            
      })
      

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        
        if(errorCode==='auth/invalid-email'){
            errorMsg.innerHTML='Invalid-Email'
          }
          else if(errorCode==='auth/weak-password'){
            errorMsg.innerHTML='Weak-Password'
          }
          else if(errorCode==='auth/email-already-in-use'){
            errorMsg.innerHTML='Email-already-in-use'
          }
          setTimeout(function(){
                errorMsg.innerHTML=''
          },3000)
             console.log(errorCode)
      });
    }
    else{
      errorMsg.innerHTML='Enter a Name';
      setTimeout(function(){
        errorMsg.innerHTML=''
  },3000)
      
    }

    
    signUpEmail.value='';
    signUpPassword.value='';
    firstName.value='';
    lastName.value='';

}

signUpBtn&&signUpBtn.addEventListener('click',newUser)



// ============log in work=============

let logInEmail = document.querySelectorAll(".login-email")[0];
let logInPassword = document.querySelectorAll(".login-password")[0];
let logInBtn = document.querySelectorAll(".log")[0];
let err = document.querySelectorAll(".err-msg")[0];
let verify = document.querySelectorAll(".Data")[0];
let main = document.querySelectorAll(".main")[0];
let verifyBtn = document.querySelectorAll(".verify-btn")[0];
let Symbol = document.querySelectorAll(".Symbol")[0];
// let firstName = document.querySelectorAll(".first-name")[0];

let userLogin = ()=>{
  signInWithEmailAndPassword(auth, logInEmail.value, logInPassword.value)
  .then(async(res)  => {
    
    const user = res.user;
    console.log(user.uid)
    window.open("home.html")
    
  })
  
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    if(errorCode==='auth/wrong-password'){
      err.innerHTML='Wrong-Password'
    }
    
    else if(errorCode==='auth/invalid-email'){
     err.innerHTML='Invalid-Email'
   }

   else if(errorCode==='auth/user-not-found'){
     err.innerHTML='User-Not-Found' 
    }
    
    else if (errorCode==='auth/network-request-failed'){
      err.innerHTML ='network-request-failed'
    }
    
    setTimeout(function(){
      err.innerHTML=''
    },3000)
    console.log(errorCode)
  });
  
  logInEmail.value='';
  logInPassword.value='';
}

logInBtn &&logInBtn.addEventListener('click',userLogin)



// ==============sign out work==============

let logout = document.querySelectorAll(".log-out")[0];


logout&&logout.addEventListener('click' ,()=>{
  
  signOut(auth).then(() => {
    // console.log('gaya')
    verify.style.display='none'
    main.style.display='block'
    
  }).catch((error) => {
    console.log(error)
  });
  
})

// const users = auth.currentUser.uid;
// console.log(users)


// let file = document.querySelectorAll(".file")[0];
let uploadBTn= document.querySelectorAll(".Update-btn")[0];

const uploadFile = (file) => {
  return new Promise((resolve,reject)=>{

     const mountainsRef = ref(storage, `image/${file.name}`);
     const uploadTask = uploadBytesResumable(mountainsRef, file);
     uploadTask.on('state_changed',
     (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
         switch (snapshot.state) {
              case 'paused':
               console.log('Upload is paused');
                  break;
                 case 'running':
                  console.log('Upload is running');
                       break;
                           }
              },
            (error) => {
             reject(error)
           console.log(error)
            },
             () => {
             getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);
                        resolve(downloadURL);
            })
             }
        );



  });
         
         
     }
     
     uploadBTn &&uploadBTn.addEventListener('click', async () => {
      try {
          let file = document.querySelectorAll("#file")[0];
          console.log(file.files[0])

           const res = await uploadFile(file.files[0])
           console.log("image url --->", res);

        } catch (error) {
           console.log(error)
       }

})


let contain = document.querySelectorAll(".contain-home")[0];
let btn = document.querySelectorAll(".btn")[0];
let tittle = document.querySelectorAll(".tittle")[0];
let textarea = document.querySelectorAll("#text-area")[0];
let tittlvalue =document.querySelectorAll(".tittl-value")[0];
let contain2 =document.querySelectorAll(".contain-2")[0];

btn.addEventListener('click',async()=>{
  const docRef = await addDoc(collection(db, "blogs"), {
 tittle:tittle.value,
 text:textarea.value
  });
  console.log("Document written with ID: ", docRef.id);
  

  tittle.value='';
  textarea.value='';
})

let realTime =()=>{

  onSnapshot(collection(db, "blogs"), (data) => {
    data .docChanges().forEach((change) => {
      console.log(change.doc.data())
  contain.innerHTML+=`
  
  <div class="contain-1">
    <div class="img-container">
        <img src="./images/—Pngtree—avatar icon profile icon member_5247852.png" alt="">
    </div>
    <div>
        <h3${change.doc.data().tittle}</h3>
        <div><span>mansoor alam - agust 16th,2023</span></div>
    </div>
</div>

<div class="contain-2">
  ${change.doc.data().text}
</div>
<button>Delete</button>
<button>Edit</button>
</div>
  `
  
  
  
    })
       
  });
}
realTime()