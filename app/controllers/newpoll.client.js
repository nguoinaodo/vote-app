function main() {
    var makeBtn = document.getElementById('make'),
        title = document.getElementById('title'),
        options = document.getElementById('options'),
        postData;
    
    makeBtn.onclick = function() {
        if (title.value === '')
            alert('Enter the title');
        else if (options.value === '')
            alert('Enter the options');
    };
}

ready(main);