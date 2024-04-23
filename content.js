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
    const childObserver = new MutationObserver(function(mutationsList, observer){
        console.log("child observer");
        console.log(mutationsList);
        //for(const mutation of mutationsList) {
            if(mutationsList[0].target.classList.contains('open')){
                const prButton = document.getElementsByClassName("hx_create-pr-button")[0];
                prButton.disabled = true;
                
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = 'pr-checkbox';
                checkbox.addEventListener('change', function(event){
                    console.log(event.target.checked);
                    prButton.disabled = !event.target.checked;
                });

                const label = document.createElement('label');
                label.htmlFor = 'pr-checkbox';
                label.textContent = 'Label';

                const prForm = document.getElementsByClassName('js-previewable-comment-form')[0];
                prForm.after(label);
                prForm.after(checkbox);
                observer.disconnect();
            }
        //}
    });

    const targetNode = document.getElementsByClassName('js-details-container Details js-compare-pr')[0];
    const config = {attributes: true};

    childObserver.observe(targetNode, config);
});

// ターゲットノードとオプションを渡して監視を開始
observer.observe(targetNode, config);

console.log("observe");