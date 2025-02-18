const button = document.getElementById("generate-button");

const content = document.getElementById("content");

async function uploadImage() {
    const fileInput = document.getElementById('input-box');
    const file = fileInput.files[0];

    if (!file) {
        return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
        const response = await fetch('https://api.imgbb.com/1/upload?key=2ba05e78b401067675227685335ffc2d', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            const imageLink = document.getElementById('imageLink');
            const inputLink = document.createElement('input');
            inputLink.id = "input-link";
            inputLink.type = "text"; 
            inputLink.value = data.data.url;
            imageLink.appendChild(inputLink);
            inputLink.readOnly = true;
            const copyButton = document.createElement('button');
            copyButton.id = "copyButton";
            copyButton.innerHTML = "Copy link"
            content.appendChild(copyButton);
            copyButton.addEventListener("click", copyText);

        } else {
            return;
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert('Une erreur s\'est produite.');
    }
}

function copyText() {
    // Get the text field
    var imageLink = document.getElementById("input-link");
    imageLink.select();
    imageLink.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(imageLink.value);
}

button.addEventListener("click", uploadImage);