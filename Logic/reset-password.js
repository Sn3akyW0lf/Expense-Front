const myForm = document.querySelector('#my-form');
const email = document.getElementById('password');
const msg_email = document.getElementById('msg_password');

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
            console.log(email.value);

            objUser = {
                email: email.value
                // student_parent: studentParentPhone.value
            };

            // let res = await axios.post('http://localhost:4000/password/update-password', objUser);

            // console.log(res);
        }



    } catch (err) {
        console.log(err);

        if (err.response.status === 404) {
            msg_dup.style.color = 'chocolate';
            msg_dup.style.background = 'beige';
            msg_dup.innerHTML = 'The Email is not Registered, Please Register!';
            setTimeout(() => msg_dup.remove(), 3000);
        }
    }
}