window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
console.log(recognition);
let box = document.querySelector('section.box');
let paragraph = document.createElement('p');
let span = document.createElement('span');
paragraph.setAttribute('contenteditable', 'true');
let btn = document.querySelectorAll('.btn-lang');
btn.forEach(item => {
    item.addEventListener('click', function(e) {
        let btnId = item.getAttribute('id');
        if ( btnId === 'persian' ) {
            recognition.stop();
            transcript = "";
            paragraph = document.createElement('p');
            paragraph.setAttribute('contenteditable', 'true');
            paragraph.setAttribute('dir', 'rtl');
            box.appendChild(paragraph);
            recognition.lang = "fa-IR";
            recognition.interimResults = true;
            recognition.start();
            recognition.addEventListener('end', recognition.start);
            recognition.addEventListener("result" , function(e) {
                box.appendChild(paragraph);
                let transcript = Array.from(e.results , result => result[0]).map(item => item.transcript).join(" ");

                if ( transcript.includes("پس زمینه سبز") ) {
                    document.body.classList.remove('blue');
                    document.body.classList.remove('black');
                    document.body.classList.add('teal');
                }

                if ( transcript.includes("پس زمینه آبی"|| "پس سزمینه ابی") ) {
                    document.body.classList.remove('black');
                    document.body.classList.remove('teal');
                    document.body.classList.add('blue');
                }

                if ( transcript.includes("پس زمینه اصلی") ) {
                    document.body.classList.remove('blue');
                    document.body.classList.remove('teal');
                    document.body.classList.remove('black');
                }

                if ( transcript.includes("پس زمینه سیاه") ) {
                    document.body.classList.remove('blue');
                    document.body.classList.remove('teal');
                    document.body.classList.add('black');
                }

                if ( transcript.includes('علامت سوال') ) {
                    transcript = transcript.replace('علامت سوال', '؟');
                };

                if ( transcript.includes('ویرگول') ) {
                    transcript = transcript.replace('ویرگول' , '،');
                };

                if ( transcript.includes('علامت تعجب') ) {
                    transcript = transcript.replace('علامت تعجب' , '!');
                }

                if ( transcript.includes('نقطه') ) {
                    transcript = transcript.replace('نقطه' , '.');
                }

                if ( transcript.includes('خط بعد برو') && e.results[0].isFinal ) {
                    transcript = "";
                    paragraph = document.createElement('p');
                    paragraph.setAttribute('contenteditable', 'true');
                    box.appendChild(paragraph);
                }

                if ( transcript.includes('صفحه پاک شود') && e.results[0].isFinal ) {
                    transcript = "";
                    box.innerHTML = "";
                    paragraph.innerHTML = "";
                    
                }
                
                span.textContent = transcript + " ";
                paragraph.appendChild(span);
                if ( e.results[0].isFinal ) {
                    span = document.createElement("span");
                    paragraph.appendChild(span);
                }
            });

        } else if ( btnId === 'english' ) {
            recognition.stop();
            transcript = "";
            paragraph = document.createElement('p');
            paragraph.setAttribute('contenteditable', 'true');
            paragraph.setAttribute('dir', 'ltr');
            box.appendChild(paragraph);
            recognition.lang = "en-US";
            recognition.interimResults = true;
            recognition.start();
            recognition.addEventListener('end', recognition.start);
            recognition.addEventListener("result" , function(e) {
                box.appendChild(paragraph);
                let transcript = Array.from(e.results , (result) => result[0]).map(item => item.transcript).join(" ");

                if ( transcript.includes( "green background" ) ) {
                    document.body.classList.remove('blue');
                    document.body.classList.remove('black');
                    document.body.classList.add('teal');
                }

                if ( transcript.includes( "blue background" ) ) {
                    document.body.classList.remove('black');
                    document.body.classList.remove('teal');
                    document.body.classList.add('blue');
                }

                if ( transcript.includes( "default background" ) ) {
                    document.body.classList.remove('blue');
                    document.body.classList.remove('teal');
                    document.body.classList.remove('black');
                }

                if ( transcript.includes( "black background" ) ) {
                    document.body.classList.remove('blue');
                    document.body.classList.remove('teal');
                    document.body.classList.add('black');
                }

                if ( transcript.includes('question mark') ) {
                    transcript = transcript.replace('question mark', '?');
                };

                if ( transcript.includes('comma') ) {
                    transcript = transcript.replace('comma', ',');
                };

                if ( transcript.includes('exclamation point') ) {
                    transcript = transcript.replace('exclamation point' , '!')
                }

                if ( transcript.includes('end para') ) {
                    transcript = transcript.replace('end para' , '.')
                }

                if ( transcript.includes('next line') && e.results[0].isFinal ) {
                    transcript = "";
                    paragraph = document.createElement('p');
                    paragraph.setAttribute('contenteditable', 'true');
                    paragraph.setAttribute('dir', 'ltr');
                    box.appendChild(paragraph);
                }

                if ( transcript.includes('clear box') && e.results[0].isFinal ) {
                    transcript = "";
                    box.innerHTML = "";
                    paragraph.innerHTML = "";
                    
                }
                console.log(e.results[0].isFinal);
                span.textContent = transcript + " ";
                paragraph.appendChild(span);
                if ( e.results[0].isFinal ) {
                    span = document.createElement("span");
                    paragraph.appendChild(span);

                }
            });
        }
    })
})













