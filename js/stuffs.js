var secret = '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';
function ValidateEmail(mail) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (mailformat.test(mail)) {
        return true;
    }
    else {
        swal("", "Invalid Email", "error");
        return false;
    }
}

function submitMail() {
    var name = $('#contactformName').val();
    var email = $('#contactformEmail').val();
    var message = $('#contactformMessage').val();
    var subject = $('#contactformSubject').val();
    if (name == '') {
        swal("", "Your Name is required", "info");
        return false;
    }
    if (email == '') {
        swal("", "Email is missing", "info");
        return false;
    }
    if (message == '') {
        swal("", "Message is missing", "info");
        return false;
    }
    if (subject == '') {
        swal("", "Email Subject is missing", "info");
        return false;
    }
    if (ValidateEmail(email)) {
        document.getElementById("sendmailBtn").disabled = true;
        const proxyurl = "https://fathomless-meadow-07949.herokuapp.com/https://api.sendgrid.com/v3/mail/send";
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + secret,
            'Access-Control-Allow-Credentials': 'true',
            'Origin': 'http://127.0.0.1'
        }
        const data = {
            "personalizations": [
                {
                    "to": [
                        {
                            "email": "john.dhara@gmail.com"
                        }
                    ]
                }],
            "from": {
                "email": email,
                "name": name
            },
            "subject": subject,
            "content": [
                { "type": "text/plain", "value": message }
            ]
        }
        axios.post(proxyurl, data, {
            headers: headers
        })
            .then((response) => {
                swal("", "Your email is enroute", "success");
                $('#contactformName').val('');
                $('#contactformEmail').val('');
                $('#contactformMessage').val('');
                $('#contactformSubject').val('');
                document.getElementById("sendmailBtn").disabled = false;
                return true;
            });
    };
}
