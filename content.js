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

    const text1 = document.createElement('span');
    text1.textContent = 'This pull request goes into ';

    const base = document.createElement('span');
    base.id = 'pr-shield-base';
    base.textContent = document.getElementById('base-ref-selector').getElementsByClassName('css-truncate css-truncate-target')[0].textContent;

    const text2 = document.createElement('span');
    text2.textContent = ' from '

    const head = document.createElement('span');
    head.id = 'pr-shield-head';
    head.textContent = document.getElementById('head-ref-selector').getElementsByClassName('css-truncate css-truncate-target')[0].textContent;

    div.appendChild(checkbox);
    div.appendChild(text1);
    div.appendChild(base);
    div.appendChild(text2);
    div.appendChild(head);

    const prForm = document.getElementsByClassName('js-previewable-comment-form')[0];
    prForm.after(div);
});

// ターゲットノードとオプションを渡して監視を開始
observer.observe(targetNode, config);

console.log("observe");