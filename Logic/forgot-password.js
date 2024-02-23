const myForm = document.querySelector('#my-form');
const email = document.getElementById('email');
const msg_email = document.getElementById('msg_email');

myForm.addEventListener('submit', onSubmit);

async function onSubmit(e) {
    try {
        e.preventDefault();

        if (email.value === '') {
            msg_email.style.color = 'chocolate';
            msg_email.style.background = 'beige';
            msg_email.innerHTML = 'Please Enter Email!';
            setTimeout(() => msg_email.remove(), 3000);
        } else {
            // console.log(username.value, email.value, password.value);

            objUser = {
                email: email.value
                // student_parent: studentParentPhone.value
            };

            // console.log(objUser);

            let res = await axios.post('http://localhost:4000/password/forgot-password', objUser);

            console.log(res);
            // console.log(res.data.premium);

            // let prem = res.data.premium ? 1 : 0;

            // alert(res.data.message);

            // localStorage.setItem('token', res.data.token);
            // localStorage.setItem('isPremium', prem);

            // window.location.replace('index.html');

            // username.value = '';
            // email.value = '';
            // password.value = '';
            // studentParentPhone.value = '';
        }



    } catch (err) {
        console.log(err);

        if (err.response.status === 404) {
            msg_dup.style.color = 'chocolate';
            msg_dup.style.background = 'beige';
            msg_dup.innerHTML = 'The Email is not Registered, Please Register!';
            setTimeout(() => msg_dup.remove(), 3000);
        }

        // msg_dup.style.color = 'chocolate';
        // msg_dup.style.background = 'beige';
        // msg_dup.innerHTML = 'Sorry, the Email already Exists!';
        // setTimeout(() => msg_dup.remove(), 3000);
        
    }
}