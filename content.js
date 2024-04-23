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

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'pr-checkbox';
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
    label.htmlFor = 'pr-checkbox';
    label.textContent = 'Label';

    const prForm = document.getElementsByClassName('js-previewable-comment-form')[0];
    prForm.after(label);
    prForm.after(checkbox);
});

// ターゲットノードとオプションを渡して監視を開始
observer.observe(targetNode, config);

console.log("observe");