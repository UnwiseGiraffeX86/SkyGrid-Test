document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('fileUploadForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        var fileInput = document.getElementById('file');
        var descriptionInput = document.getElementById('description');
        var formData = new FormData();

        // Check if a file is selected
        if (fileInput.files.length > 0) {
            formData.append('file', fileInput.files[0]);
            formData.append('description', descriptionInput.value);

            fetch('C:/Users/stefa/OneDrive/Documents/GitHub/SkyGrid-Test/backend/models/train data', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // Handle response data
            })
            .catch(error => {
                console.error('Error:', error);
            });
        } else {
            alert('Please select a file to upload.');
        }
    });
});
