const form = document.querySelector("form");
eField = form.querySelector(".email");
    eInput = eField.querySelector("input");
    pField = form.querySelector(".password");
    pInput = pField.querySelector("input");

//Here if using onsubmit event handler it works directly i am not using html submitform()
form.onsubmit= (e)=>{
    e.preventDefault(); //preventing from form submitting
    //check email
    (eInput.value == "")? eField.classList.add("shake","error") : checkEmail();
    (pInput.value == "")? pField.classList.add("shake","error") : checkPass();

    setTimeout(() => { //remove shake class after 500ms
        eField.classList.remove("shake");
        pField.classList.remove("shake");
    }, 500);

    eInput.onkeyup = () => { checkEmail(); } //calling checkEmail function on email input keyup
    pInput.onkeyup = () => { checkPass(); } //calling checkPassword function on pass input keyup

    function checkEmail(){
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;   //pattern for email
    if(!eInput.value.match(pattern)){   //if pattern not matched then add error and remove valid class
        eField.classList.add("error");
        eField.classList.remove("valid")   //valid class is used in css directly and it is not used in html
        let errorTxt = eField.querySelector(".error-txt");
        //if email value is not empty then show please enter valid email else show Email can't be blank
        (eInput.value != "") ? errorTxt.innerText = "Enter a valid email address" : errorTxt.innerText = "Email can't be blank";
        }else{  //if pattern matched then remove error and add valid class
            pField.classList.remove("error");
            pField.classList.add("valid");
        }
    }

    function checkPass(){
        if(pInput.value == ""){
            pField.classList.add("error");
            pField.classList.remove("valid");
        }else{
            pField.classList.remove("error");
            pField.classList.add("valid");
        }
    }


    if(!eField.classList.contains("error") && !pField.classList.contains("error")){

        let form = document.querySelector("form");
        form.submit();
    }
}