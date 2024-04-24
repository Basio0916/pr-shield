let lastPrUrl = '';

const prObserver = new MutationObserver(function(mutationsList, observer){
    // URLの変更を検出する
    if(lastPrUrl === window.location.href){
        return;
    }
    lastPrUrl = window.location.href;

    const prButton = document.getElementsByClassName('hx_create-pr-button')[0];
    if(prButton === undefined){
        return;
    }
    prButton.disabled = true;

    const baseName = document.getElementById('base-ref-selector').getElementsByClassName('css-truncate css-truncate-target')[0].textContent;
    const headName = document.getElementById('head-ref-selector').getElementsByClassName('css-truncate css-truncate-target')[0].textContent;
    const target = document.getElementsByClassName('js-previewable-comment-form')[0];
    insertConfirmation(baseName, headName, target);

    const prButtonObserver = new MutationObserver(function(mutationsList, observer){
        observer.disconnect();
        setPrButtonStatus();
        observer.observe(prButton, {attributes: true});
    });
    prButtonObserver.observe(prButton, {attributes: true});

    const title = document.getElementsByClassName('title')[0];
    const titleObserver = new MutationObserver(function(mutationsList, observer){
        setPrButtonStatus();
    });
    titleObserver.observe(title, {childList: true})
});

let lastMergeUrl = '';
const mergeObserver = new MutationObserver(function(mutationsList, observer){
    // Mergeボタンが現れたときに1度だけ処理をする
    const mergeButton = document.getElementsByClassName('btn-group-merge')[0];
    const squashButton = document.getElementsByClassName('btn-group-squash')[0];
    const rebaseButton = document.getElementsByClassName('btn-group-rebase')[0];
    if(mergeButton === undefined){
        return;
    }
    if(lastMergeUrl === window.location.href){
        return;
    }

    if(mergeButton.disabled || squashButton.disabled || rebaseButton.disabled){
        return;
    }
    mergeButton.disabled = true;
    squashButton.disabled = true;
    rebaseButton.disabled = true;

    const baseName = document.getElementsByClassName('commit-ref')[0].outerText;
    const headName = document.getElementsByClassName('commit-ref')[1].outerText;
    const branchActionItems = document.getElementsByClassName('branch-action-item');
    const target = branchActionItems[branchActionItems.length - 1];
    insertConfirmation(baseName, headName, target);

    lastMergeUrl = window.location.href;

});

const targetNode = document.body;
const config = { childList: true, subtree: true };
prObserver.observe(targetNode, config);
mergeObserver.observe(targetNode, config)

function setPrButtonStatus(){
    const checkbox = document.getElementById('pr-shield-checkbox');
    const prButton = document.getElementsByClassName('hx_create-pr-button')[0];
    const title = document.getElementsByClassName('title')[0];
    if(title.value === ''){
        prButton.disabled = true;
        return;
    }
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
};

function setMergeButtonsStatus(){
    const checkbox = document.getElementById('pr-shield-checkbox');
    const mergeButton = document.getElementsByClassName('btn-group-merge')[0];
    const squashButton = document.getElementsByClassName('btn-group-squash')[0];
    const rebaseButton = document.getElementsByClassName('btn-group-rebase')[0];    

    if(checkbox.checked){
        mergeButton.disabled = false;
        squashButton.disabled = false;
        rebaseButton.disabled = false;
    }
    else{
        // 下記2つを組み合わせないとdisabledにならない
        mergeButton.disabled = true;
        squashButton.disabled = true;
        rebaseButton.disabled = true;
        setTimeout(function(){
            mergeButton.disabled = true;
            squashButton.disabled = true;
            rebaseButton.disabled = true;
        }, 1);
    }
}

function insertConfirmation(baseName, headName, target){
    const container = document.createElement('div');
    container.id = 'pr-shield-container'

    const div1 = document.createElement('div');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'pr-shield-checkbox';

    const label = document.createElement('label');
    label.htmlFor = 'pr-shield-checkbox'
    label.className = 'pr-shield-label'
    label.textContent = '確認しました'

    
    const div2 = document.createElement('div');
    div2.id = 'pr-shield-label-container';

    const text1 = document.createElement('span');
    text1.className = 'pr-shield-span'
    text1.textContent = 'このプルリクエストは';

    const text2 = document.createElement('span');
    text2.textContent = 'を'
    text2.className = 'pr-shield-span'
    
    const text3 = document.createElement('span');
    text3.textContent = 'にマージします'
    text3.className = 'pr-shield-span'

    const base = document.createElement('span');
    base.id = 'pr-shield-base';
    base.className = 'pr-shield-span'
    base.textContent = baseName;
    
    const head = document.createElement('span');
    head.id = 'pr-shield-head';
    head.className = 'pr-shield-span'
    head.textContent = headName;

    div1.appendChild(text1);
    div1.appendChild(head);
    div1.appendChild(text2);
    div1.appendChild(base);
    div1.appendChild(text3);

    div2.appendChild(checkbox);
    div2.appendChild(label);

    container.appendChild(div1);
    container.appendChild(div2);

    target.after(container);

    checkbox.addEventListener('change', setMergeButtonsStatus);
}