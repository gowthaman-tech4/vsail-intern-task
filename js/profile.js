$(document).ready(function () {
    var token = localStorage.getItem('session_token');

    if (!token) {
        window.location.href = 'login.html';
        return;
    }


    $.ajax({
        url: 'php/profile.php',
        type: 'GET',
        headers: {
            'Authorization': token
        },
        success: function (response) {
            try {
                var res = (typeof response === 'object') ? response : JSON.parse(response);

                if (res.status == 'success') {
                    if (res.data) {
                        $('#name').val(res.data.name || '');
                        $('#city').val(res.data.city || '');
                        $('#destination').val(res.data.destination || '');
                        $('#age').val(res.data.age);
                        $('#dob').val(res.data.dob);
                        $('#contact').val(res.data.contact);
                        if (res.data.profile_pic) {
                            $('#profilePreview').attr('src', res.data.profile_pic);
                        }
                    }
                } else {
                    console.warn("Profile fetch failed:", res.message);
                    if (res.message === 'Invalid session' || res.message === 'Unauthorized') {
                        localStorage.removeItem('session_token');
                        window.location.href = 'login.html';
                    }
                }
            } catch (e) {
                console.error(response);
            }
        },
        error: function () {
            localStorage.removeItem('session_token');
            window.location.href = 'login.html';
        }
    });


    $('#profileForm').submit(function (e) {
        e.preventDefault();

        var formData = new FormData();
        formData.append('name', $('#name').val());
        formData.append('city', $('#city').val());
        formData.append('destination', $('#destination').val());
        formData.append('age', $('#age').val());
        formData.append('dob', $('#dob').val());
        formData.append('contact', $('#contact').val());

        var fileInput = $('#profilePic')[0];
        if (fileInput.files && fileInput.files[0]) {
            formData.append('profile_pic', fileInput.files[0]);
        }

        $.ajax({
            url: 'php/profile.php',
            type: 'POST',
            headers: {
                'Authorization': token
            },
            data: formData,
            contentType: false, // Required for FormData
            processData: false, // Required for FormData
            success: function (response) {
                try {
                    var res = (typeof response === 'object') ? response : JSON.parse(response);
                    if (res.status == 'success') {
                        $('#message').html('<div class="alert alert-success">Profile updated successfully!</div>');
                        if (res.profile_pic_url) {
                            $('#profilePreview').attr('src', res.profile_pic_url);
                        }
                    } else {
                        $('#message').html('<div class="alert alert-danger">' + res.message + '</div>');
                    }
                } catch (e) {
                    $('#message').html('<div class="alert alert-danger">An error occurred.</div>');
                }
            },
            error: function () {
                $('#message').html('<div class="alert alert-danger">Server error.</div>');
            }
        });
    });

    $("#profilePic").change(function () {
        readURL(this);
    });

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#profilePreview').attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    $('#logoutBtn').click(function () {
        localStorage.removeItem('session_token');
        window.location.href = 'index.html';
    });
});
