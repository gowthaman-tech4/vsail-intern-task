$(document).ready(function () {
    $('#registerForm').submit(function (e) {
        e.preventDefault();

        var email = $('#email').val();
        var password = $('#password').val();
        var confirmPassword = $('#confirmPassword').val();

        if (password !== confirmPassword) {
            $('#message').html('<div class="alert alert-danger">Passwords do not match</div>');
            return;
        }

        $.ajax({
            url: 'php/register.php',
            type: 'POST',
            data: {
                email: email,
                password: password
            },
            success: function (response) {
                try {
                    var res = (typeof response === 'object') ? response : JSON.parse(response);

                    if (res.status == 'success') {
                        $('#message').html('<div class="alert alert-success">' + res.message + ' Redirecting to login...</div>');
                        setTimeout(function () {
                            window.location.href = 'login.html';
                        }, 2000);
                    } else {
                        $('#message').html('<div class="alert alert-danger">' + res.message + '</div>');
                    }
                } catch (e) {
                    $('#message').html('<div class="alert alert-danger">An error occurred parsing response.</div>');
                    console.error(response);
                }
            },
            error: function () {
                $('#message').html('<div class="alert alert-danger">Server error.</div>');
            }
        });
    });
});
