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
        for(const mutation of mutationsList) {
            if(mutation.target.classList.contains('open')){
                const prButton = document.getElementsByClassName("hx_create-pr-button")[0];
                prButton.setAttribute('disabled', true);
                observer.disconnect();
            }
        }
    });

    const targetNode = document.getElementsByClassName('js-details-container Details js-compare-pr')[0];
    const config = {attributes: true};

    childObserver.observe(targetNode, config);
});

// ターゲットノードとオプションを渡して監視を開始
observer.observe(targetNode, config);

console.log("observe");