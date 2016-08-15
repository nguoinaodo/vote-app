function main() {
    ajaxRequest('GET', '/api/mypolls', function(polls) {
        var n = polls.length;
        console.log(n);
        var list = document.querySelector('.main .list ul');
        var liNode, aNode, textNode;
        
        for (var i = 0; i < n; ++i) {
            liNode = document.createElement('li');
            aNode = document.createElement('a');
            textNode = document.createTextNode(polls[i].title);
            
            aNode.appendChild(textNode);
            aNode.setAttribute('href', '/polls/' + polls[i].id);
            liNode.appendChild(aNode);
            list.appendChild(liNode);
        } 
    });
}

ready(main);