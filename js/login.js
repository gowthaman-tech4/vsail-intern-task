$(document).ready(function () {
    $('#loginForm').submit(function (e) {
        e.preventDefault();

        var email = $('#email').val();
        var password = $('#password').val();

        $.ajax({
            url: 'php/login.php',
            type: 'POST',
            data: {
                email: email,
                password: password
            },
            success: function (response) {
                try {
                    var res = (typeof response === 'object') ? response : JSON.parse(response);

                    if (res.status == 'success') {
                        localStorage.setItem('session_token', res.token);
                        $('#message').html('<div class="alert alert-success">Login successful! Redirecting...</div>');
                        setTimeout(function () {
                            window.location.href = 'profile.html';
                        }, 1000);
                    } else {
                        $('#message').html('<div class="alert alert-danger">' + res.message + '</div>');
                    }
                } catch (e) {
                    console.error(response);
                    $('#message').html('<div class="alert alert-danger">An error occurred.</div>');
                }
            },
            error: function () {
                $('#message').html('<div class="alert alert-danger">Server error.</div>');
            }
        });
    });
});
