// MutationObserverのコールバック関数を定義
const callback = function(mutationsList, observer) {
    // 監視対象のクラスを持つ要素がDOMに追加されたときに発火する
    for(const mutation of mutationsList) {
        if (mutation.type === "attributes") {
            if(mutation.target.classList.contains('open')){
                const prButton = document.getElementsByClassName("hx_create-pr-button")[0];
                prButton.setAttribute('disabled', true);
                observer.disconnect();
            }
        }
    }
};

// 監視するターゲットの設定
const targetNode = document.getElementsByClassName('js-details-container Details js-compare-pr')[0];

// オプションの設定
const config = { attributes: true };

// MutationObserverのインスタンスを生成し、コールバック関数とオプションを渡す
const observer = new MutationObserver(callback);

// ターゲットノードとオプションを渡して監視を開始
observer.observe(targetNode, config);