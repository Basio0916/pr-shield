// 監視するターゲットの設定
const targetNode = document.body;

// オプションの設定
const config = { childList: true, subtree: true };

let lastUrl = '';

// MutationObserverのインスタンスを生成し、コールバック関数とオプションを渡す
const observer = new MutationObserver(function(mutationsList, observer){
    if(lastUrl === window.location.href){
        return;
    }
    lastUrl = window.location.href;
    console.log("observer");
    const prButton = document.getElementsByClassName("hx_create-pr-button")[0];
    if(prButton === undefined){
        return;
    }
    prButton.disabled = true;

    const div = document.createElement('div');
    div.id = 'pr-shield-container'

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'pr-shield-checkbox'
    checkbox.addEventListener('change', function(event){
        if(checkbox.checked){
            prButton.disabled = false;
        }
        else{
            // 下記2つを組み合わせないとdisabledにならない
            prButton.disabled = true;
            setTimeout(function(){
                prButton.disabled = true;
            }, 1);
        }
    });

    const label = document.createElement('label');
    label.htmlFor = 'pr-shield-checkbox'
    label.className = 'pr-shield-label'

    const text1 = document.createElement('span');
    text1.className = 'pr-shield-span'
    text1.textContent = 'このプルリクエストは';

    const text2 = document.createElement('span');
    text2.textContent = 'を'
    text2.className = 'pr-shield-span'
    
    const text3 = document.createElement('span');
    text3.textContent = 'にマージします。'
    text3.className = 'pr-shield-span'


    const base = document.createElement('span');
    base.id = 'pr-shield-base';
    base.className = 'pr-shield-span'
    base.textContent = document.getElementById('base-ref-selector').getElementsByClassName('css-truncate css-truncate-target')[0].textContent;
    
    const head = document.createElement('span');
    head.id = 'pr-shield-head';
    head.className = 'pr-shield-span'
    head.textContent = document.getElementById('head-ref-selector').getElementsByClassName('css-truncate css-truncate-target')[0].textContent;

    label.appendChild(text1);
    label.appendChild(head);
    label.appendChild(text2);
    label.appendChild(base);
    label.appendChild(text3);

    div.appendChild(checkbox);
    div.appendChild(label);

    const prForm = document.getElementsByClassName('js-previewable-comment-form')[0];
    prForm.after(div);
});

// ターゲットノードとオプションを渡して監視を開始
observer.observe(targetNode, config);

console.log("observe");