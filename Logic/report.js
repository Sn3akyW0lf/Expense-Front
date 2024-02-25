const tblMonth = document.getElementById('tblMonth');
const tblYear = document.getElementById('tblYear');
const dlReport = document.getElementById('dlReport');
const token = localStorage.getItem('token');

var expArr = [];

// myForm.addEventListener('submit', onSubmit);

// records.addEventListener('click', remExp);
// records.addEventListener('click', editExp);

// Get Existing data from the database and populate the table with that data

window.addEventListener('DOMContentLoaded', async () => {
    try {

        const isPremium = localStorage.getItem('isPremium');

        console.log(isPremium == 0);

        if (isPremium == true) {
            premiumMessage();
        }

        if (isPremium == 0) {
            dlReport.className = 'd-none';
        }


        // let data = response.data.allExpDetails;

        // data.forEach(d => {
        //     let tr = document.createElement('tr');
        //     let td1 = document.createElement('td');
        //     let td2 = document.createElement('td');
        //     let td3 = document.createElement('td');
        //     let td4 = document.createElement('td');
        //     let td5 = document.createElement('td');


        //     td1.appendChild(document.createTextNode(`${d.id}`));
        //     td1.className = 'd-none';
        //     td2.appendChild(document.createTextNode(`${d.amount}`));
        //     td3.appendChild(document.createTextNode(`${d.description}`));
        //     td4.appendChild(document.createTextNode(`${d.category}`));

        //     let del = document.createElement('button');
        //     del.className = 'btn btn-danger btn-sm float-right delete';
        //     del.appendChild(document.createTextNode('Delete Expense'));
        //     del.addEventListener('click', function () {
        //         deleteExp(td1);
        //     });

        //     let edit = document.createElement('button');
        //     edit.className = 'btn btn-info btn-sm float-right edit';
        //     edit.appendChild(document.createTextNode('Edit'));

        //     td5.appendChild(del);
        //     // td5.appendChild(edit);

        //     tr.appendChild(td1);
        //     tr.appendChild(td2);
        //     tr.appendChild(td3);
        //     tr.appendChild(td4);
        //     tr.appendChild(td5);
        //     tblExpense.appendChild(tr);

        //     expObj = {
        //         expense: d.amount,
        //         exp_desc: d.description,
        //         exp_type: d.expType,
        //         id: d.id
        //     };
        //     expArr.push(expObj);
        // });
    } catch (err) {
        console.log(err);
    }

    // console.log(expObj);

})

//Deleting the Expense Data from UL as well as Local Storage after Confirmation from the User

async function deleteExp(e) {
    try {
        // console.log(e);

        let tr = e.parentElement;
        let tbl = tr.parentElement;
        let expense = expArr.find(u => u.id == e.innerHTML);
        // console.log(expense);
        const token = localStorage.getItem('token');

        console.log(token);

        const expenseObj = {
            id: expense.id
        };

        let res = await axios.post(`http://localhost:4000/expense/delete-expense`, expenseObj, {
            headers: {
                'Authorization': token
            }
        });
        console.log(res);
        tbl.removeChild(tr);
    } catch (err) {
        console.log(err);
    }

}


document.getElementById('razorPremium').onclick = async function (e) {
    // const token = localStorage.getItem('token');

    const response = await axios.get('http://localhost:4000/purchase/purchase-membership', {
        headers: {
            'Authorization': token
        }
    });

    console.log(response);

    let options = {
        'key': response.data.key_id,
        'order_id': response.data.order.id,
        'handler': async function (response) {
            await axios.post('http://localhost:4000/purchase/update-transaction-status', {
                order_id: options.order_id,
                payment_id: response.razorpay_payment_id
            }, {
                headers: {
                    'Authorization': token
                }
            })

            alert('Congratulations! You are Now a Premium Member!');

            localStorage.setItem('isPremium', 1);

            razorPremium.className = 'd-none';
            msg_premium.style.color = 'chocolate';
            msg_premium.style.color = 'chocolate';
            msg_premium.innerHTML = 'You Are a Premium Member!';
        }
    };

    const rzpl = new Razorpay(options);
    rzpl.open();
    e.preventDefault();

    rzpl.on('payment.failed', async function (response) {
        console.log(response);
        await axios.post('http://localhost:4000/purchase/failed-transaction', {
            order_id: options.order_id
        }, {
            headers: {
                'Authorization': token
            }
        })

        alert('Something Went Wrong!');
    })
};

function premiumMessage() {
    razorPremium.className = 'd-none';
    msg_premium.style.color = 'chocolate';
    msg_premium.innerHTML = 'You Are a Premium Member!';
    // btnLeader.className = 'btn btn-warning btn-sm btn-outline-dark p-3 m-3';
}

dlReport.addEventListener('click', async () => {
    try {
        let response = await axios.get('http://localhost:4000/expense/download', {
            headers: {
                'Authorization': token
            }
        });
        console.log(response.data);

        if (response.status === 200) {
            let a = document.createElement('a');
            a.href = response.data.fileURL;
            a.download = 'myexpense.csv';
            a.click();
        } else {
            throw new Error(response.data.message);
        }
    } catch (err) {
        console.log(err);
    }

});