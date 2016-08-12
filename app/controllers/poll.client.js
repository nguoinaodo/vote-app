function drawGoogleChart(voteResult) {
    google.charts.load('current', {
      'packages': ['corechart']
    });
    
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
      var n = voteResult.length;
      
      for (var i = 1; i < n; ++i) {
          voteResult[i][1] = Number(voteResult[i][1]);
      }
      console.log(voteResult);
      
      var data = google.visualization.arrayToDataTable(voteResult);
      
      var options = {
        colors: ['#aabbcc', '#888', '#446699', '#996', "#cc3"],
        sliceVisibilityThreshold: 0,
        fontSize: 16,
        backgroundColor: '#ddd',
        legend: {
          position: 'bottom'
        }
      };

      var chart = new google.visualization.PieChart(document.getElementById('piechart'));

      chart.draw(data, options);
      window.onresize = function() {
        chart.draw(data, options);
      }
    }
}

function main() {
    var pollId = window.location.pathname.substr(7);
    //
    ajaxRequest('GET', '/api/polls/' + pollId, function(options) {
        
        var n = options.length;
        
        // tạo các option cho form select
        for (var i = 1; i < n; ++i) {
            var node = document.createElement('option');
            var textNode = document.createTextNode(options[i][0]);
            
            node.setAttribute('value', i);
            node.appendChild(textNode);
            document.getElementById('choose').appendChild(node);
        }
        // vẽ biểu đồ
        drawGoogleChart(options);
    });
    
    //
    document.getElementById('choose').onchange = function() {
        console.log(this.value);
        var customInput = document.getElementById('customInput');
        var node, textNode;
        
        if (this.value === '') {
            //
            node = document.createElement('b');
            textNode = document.createTextNode('Vote with my own option:');
            node.appendChild(textNode);
            customInput.appendChild(node);
            //
            customInput.appendChild(document.createElement('br'));
            //
            node = document.createElement('input');
            customInput.appendChild(node);
        } else {
            customInput.innerHTML = '';
        }
    };
    ////
    document.querySelector('#vote').addEventListener('click', function() {
        var vote = document.getElementById('choose').value;
        
        
        if (vote === ' ')
            alert('You must choose which option to vote for.');
        else if (vote === '') 
            ajaxPost('/api/polls/' + pollId, 'option=' + document.querySelector('#customInput input').value, drawGoogleChart);
        else 
            ajaxPost('/api/polls/' + pollId, 'vote=' + vote, drawGoogleChart);   
    });
}

ready(main);