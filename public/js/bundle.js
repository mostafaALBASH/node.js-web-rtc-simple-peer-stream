navigator.getUserMedia({ video: true, audio: true }, function (stream) {
    var p = new SimplePeer({ initiator: location.hash === '#1',
        trickle: false,
        stream: stream})

    p.on('error', function (err) { console.log('error', err) })

    p.on('signal', function (data) {
        console.log('SIGNAL', JSON.stringify(data))
        document.querySelector('#outgoing').textContent = JSON.stringify(data)
    })

    document.getElementById('form1').addEventListener('submit', function (ev) {
        ev.preventDefault()
        p.signal(JSON.parse(document.querySelector('#incoming').value))
    })

    p.on('connect', function () {
        console.log('CONNECT')
    })

    p.on('data', function (data) {
        console.log('data: ' + data)
    })

    p.on('stream', function (stream) {
        var video = document.createElement('video')
        document.body.appendChild(video)

        video.src = window.URL.createObjectURL(stream)
        video.play()
        console.log('im peer?!')
    })

    document.getElementById('form2').addEventListener('submit', function (ev) {
        ev.preventDefault();


        p.send(document.getElementById('textArea').value);

        // p.on('data', function (data) {
        //     document.getElementById("demo").innerHTML = data;
        // })
    })
}, function (err) {
    console.log(err)
})










// document.getElementById('form2').addEventListener('submit', function (ev) {
//     ev.preventDefault();
//
//
//     p.send(document.getElementById('textArea').value);
//
//     p.on('data', function (data) {
//         var li = document.createElement("LI");
//         li.innerHTML = data;
//         var ul = document.getElementById('ul');
//         ul.appendChild(li);
//     })
// });




// p.send('whatever' + Math.random())
//
// p.on('data', function (data) {
//     console.log('data: ' + data)
// })





