
//! ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ mir_toast ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ */
/**
 * @author 2022-09-27 12:12:11 현규
 * 
 * @category mir_toast html
 * 
 * @param {String}    pos        : 토스트 위치 ( bl, br, tl, tr ) 
 * @param {String}    icon       : 아이콘
 * @param {String}    title      : 제목
 * @param {String}    content    : 내용
 * @param {String}    bgc        : 토스트 배경
 * @param {Boolean}   autoClose  : 자동닫기 실행 여부
 * @param {Function}  callBack   : 토스트 클릭시 이벤트
 */
/*
const message = new mirMessage({
    mode          : 'success',
    type          : 'toast',
    title         : '성공!',
    text          : '레이아웃 수정이 완료되었습니다.',
});
message.show();
 */
class mirMessage {
    constructor(obj) {
        this._mode          = this._checkData(obj['mode'], 'success');
        this._type          = this._checkData(obj['type'], 'alert');

        this._icon          = this._checkData(obj['icon'], 'icon');
        this._pos           = this._checkData(obj['pos'], 'bl');
        this._title         = this._checkData(obj['title'], 'Success!');
        this._confirm_title = this._checkData(obj['confirm_title'], '안내');
        this._text          = this._checkData(obj['text'], '메이드인리얼');
        this._cancel_text   = this._checkData(obj['cancel_text'], '취소');
        this._confirm_text  = this._checkData(obj['confirm_text'], '확인');
        this._check_text    = this._checkData(obj['check_text'], '확인');
        this._autoClose     = this._checkData(obj['autoClose'], true);
        this._modalClass    = this._checkData(obj['modalClass'], '');
        this._callBack      = this._checkData(obj['callBack'], null);
        this._cancel_callBack = this._checkData(obj['cancel_callBack'], null);
        this._callBackArgs  = this._checkData(obj['callBackArgs'], null);
        this._customBtn     = this._checkData(obj['customBtn'], null);
        this._closeCallBack = this._checkData(obj['closeCallBack'], null);
        this._pageBack      = this._checkData(obj['pageBack'], false);
        this._input_type    = this._checkData(obj['input_type'], "text");
        this._input_default = this._checkData(obj['input_default'], "");

        this._modeInit(this._mode, obj)
    }

    show() {
        switch(this._type) {
            case "toast":
                this.showToast();
                break;
            case "alert":
                this.showAlert();
                break;
            case "confirm":
                this.showConfirm();
                break;
            case "prompt":
                this.showPrompt();
                break;
            case "grant":
                this.showGrant();
                break;
            default:
                console.log("ERROR: mirMessage 타입 확인 요망");
                break;
        }
    }

    showConfirm() {
        let customBtnWrap = '';
        if(this._customBtn != null) {
            customBtnWrap = document.createElement('div');
            customBtnWrap.className = 'mir_confirm_btn taRight';
            customBtnWrap.insertAdjacentHTML('afterbegin', this._customBtn);
            customBtnWrap = customBtnWrap.outerHTML; 
        }

        const mir_alert = `
            <div class="mir_alert_wrap mir_confirm_wrap ${this._modalClass}">
                <div class="mir_confirm disFlex flex_column ovh">
                    <div class=\"disFlex gap25 flex_column\" style=\"padding: 3.125rem 2.1875rem 2.1875rem 2.1875rem;\">
                        <div class="mir_confirm_title taCenter">${this._confirm_title}</div>
                        <div class="mir_confirm_text taCenter">${this._text}</div>
                    </div>
                    <div class="mir_confirm_btn disFlex">
                        <button class="mir_confirm_btn_cancle flex_1 danger_btn chand">${this._cancel_text}</button>
                        <button class="mir_confirm_btn_ok flex_1 primary_btn chand">${this._confirm_text}</button>
                    </div>
                    ${customBtnWrap}
                </div>
            </div>
            <div id="mir_alert_confirm_float_wrap"></div>
        `;

        document.body.insertAdjacentHTML('beforeend', mir_alert);

        const yes = document.querySelector('.mir_alert_wrap .primary_btn');
        const no  = document.querySelector('.mir_alert_wrap .danger_btn');
        
        const callBack = this._callBack;
        const cancel_callBack = this._cancel_callBack;
        const callBackArgs = this._callBackArgs;

        yes.addEventListener('click', function(e) {
            if(callBack != null) {
                if(typeof callBack == "function") {
                    mir_alert_close();
                    callBack(callBackArgs);
                }
                else {
                    const msg = new mirMessage({
                        type : 'alert',
                        text : 'callback is null or not function'
                    })
                    msg.show();
                }
            }
            else {
                mir_alert_close();
            }
        });
        no.addEventListener('click', function(e) {
            if(cancel_callBack != null) {
                if(typeof cancel_callBack == "function") {
                    mir_alert_close();
                    cancel_callBack(callBackArgs);
                }
                else {
                    const msg = new mirMessage({
                        type : 'alert',
                        text : 'callback is null or not function'
                    })
                    msg.show();
                }
            }
            else {
                mir_alert_close();
            }
        });
    }

    showAlert() {
        const callBack = this._callBack;

        // const mir_alert = `
        //     <div class="mir_alert_wrap ${this._modalClass}">
        //         <div class="mir_alert">
        //             <div class="mir_message_wrap">
        //                 <span class="material-icons">check_circle</span> 
        //                 <p class="mir_small_title">${this._text}</p>
        //             </div>
        //             <div class="mir_alert_btn">
        //                 <button class="primary_btn close_btn chand" onclick="mir_alert_close()">CLOSE</button>
        //             </div>
        //         </div>
        //     </div>
        // `;
        const mir_alert = `
            <div class="mir_alert_wrap mir_confirm_wrap ${this._modalClass}">
                <div class="mir_confirm disFlex flex_column ovh">
                    <div class=\"disFlex gap25 flex_column\" style=\"padding: 3.125rem 2.1875rem 2.1875rem 2.1875rem;\">
                        <div class="mir_confirm_text taCenter">${this._text}</div>
                    </div>
                    <div class="mir_confirm_btn disFlex">
                        <button class="mir_confirm_btn_ok flex_1 danger_btn chand" onclick="mir_alert_close()">${this._check_text}</button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', mir_alert);

        // const close = document.querySelector('.mir_alert_wrap .close_btn');

        // close.addEventListener('click', function(e) {
        //     if(callBack != null && typeof callBack == "function") {
        //         callBack();
        //     }
        // });
    }

    showToast() {
        var mir_toast_wrap = document.getElementById(`mir_toast_${this._pos}_wrap`);
        let is_wrap;
        if(!mir_toast_wrap) {
            is_wrap = true;
            mir_toast_wrap = document.createElement('div');
            mir_toast_wrap.className    = 'mir_toast_wrap';
            mir_toast_wrap.id           = `mir_toast_${this._pos}_wrap`;
        }else {
            is_wrap = false;
        }

        //* toast 아이템 조립
        const mir_toast = document.createElement('div');
        mir_toast.className = `mir_toast ${this._pos} ${this._modalClass}`;
        mir_toast.style.backgroundColor = `${this._bgc}`;

        //* toast 커스텀 버튼 (string)
        let customBtnWrap = '';
        if(this._customBtn != null) {
            customBtnWrap = document.createElement('div');
            customBtnWrap.className = 'mir_customBtnWrap taRight';
            customBtnWrap.insertAdjacentHTML('afterbegin', this._customBtn);
            customBtnWrap = customBtnWrap.outerHTML;
        }

        const content_html   = this._text != '' ? `<p class="mir_toast_content">${this._text}</p>` : '';
        const mir_toast_body = `
            <div class="mir_toast_icon">
                <span class="material-icons">${this._icon}</span>
            </div>

            <div class="mir_toast_message">
                <p class="mir_toast_subject">${this._title}</p>
                ${content_html}
                ${customBtnWrap}
            </div>

            <div class="mir_close_message"></div>
            <div class="mir_close_process_bar"></div>

            <span class="material-icons mir_toast_close" onclick="mir_toast_close(event, ${this._closeCallBack})">close</span>
        `;

        //* toast 출력
        if(is_wrap) {
            mir_toast_wrap.appendChild(mir_toast);
            document.body.appendChild(mir_toast_wrap);
        } else {
            if(this._pos == 'bl' || this._pos =='br') {
                mir_toast_wrap.appendChild(mir_toast);
                mir_toast_wrap.insertAdjacentElement('afterbegin', mir_toast);
            } else {
                mir_toast_wrap.insertAdjacentElement('beforeend', mir_toast);
            }
        }
        mir_toast.insertAdjacentHTML('afterbegin', mir_toast_body);

        //* toast 커스텀 버튼이 있으면 버튼에 콜백 바인드
        //* 콜백은 있는데 버튼이 없으면 toast창에 바인드
        const customBtn = mir_toast_wrap.querySelector('.mir_customBtnWrap button');
        if(customBtn) {
            customBtn.addEventListener("click", (e) => {
                if(this._callBack != null && typeof this._callBack == "function") {
                    this._callBack(this._callBackArgs);
                }
                mir_toast_close(e);
            });
        } else {
            if(this._callBack != null && typeof this._callBack == "function") {
                mir_toast.addEventListener("click", (e) => {
                    this._callBack(this._callBackArgs);
                    mir_toast_close(e);
                });
            }
        }

        //* toast 자동닫기 이벤트
        if(this._autoClose) {
            //* 3초 후 닫기멘트 출력
            setTimeout( async () => {
                const toast_wrap = mir_toast.parentElement;
                const close_html = mir_toast.querySelector('.mir_close_message');
                const processbar = mir_toast.querySelector('.mir_close_process_bar');
                processbar.classList.add('animation');
                for(let i=5; i>=1; i--) {
                    close_html.innerHTML = i + '초 후 닫힘';
                    await wait(1);
                }
                mir_toast.remove();
                mir_toast_wrap_check(toast_wrap);

            },3000)
        } else {
            //* 자동닫기가 아닌 애들은 3초 후 둥둥효과
            setTimeout(() => {
                mir_toast.classList.add('mir_toast_bounce');
            }, 3000);
        }
    }

    showPrompt() {
        const mir_prompt = `
            <div class="mir_alert_wrap">
                <div class="mir_alert">
                    <div class="mir_message_wrap">
                        <span class="material-icons">check_circle</span> 
                        <p class="mir_small_title">${this._text}</p>
                    </div>
                    <input type="${this._input_type}" value="${this._input_default}" class="mb10"></textarea>
                    <div class="mir_alert_btn">
                        <button class="cancel_btn chand">${this._cancel_text}</button>
                        <button class="primary_btn chand">${this._confirm_text}</button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', mir_prompt);

        const yes = document.querySelector('.mir_alert_wrap .primary_btn');
        const no  = document.querySelector('.mir_alert_wrap .cancel_btn');
        
        const callBack = this._callBack;
        const callBackArgs = this._callBackArgs;
        yes.addEventListener('click', function(e) {
            if(callBack != null && typeof callBack == "function") {
                const btn = e.currentTarget;
                const value = btn.closest('.mir_alert').querySelector('input').value;
                callBack(value, callBackArgs);
                mir_alert_close();

            } else {
                const msg = new mirMessage({
                    type : 'alert',
                    text : 'callback is null or not function'
                })
                msg.show();
            }
        });
        no.addEventListener('click', function(e) {
            mir_alert_close();
        });
    }

    showGrant() {
        let customBtnWrap = '';
        const pageBack = this._pageBack;

        if(this._customBtn != null) {
            customBtnWrap = document.createElement('div');
            customBtnWrap.className = 'mir_customBtnWrap taRight';
            customBtnWrap.insertAdjacentHTML('afterbegin', this._customBtn);
            customBtnWrap = customBtnWrap.outerHTML;
        }

        const mir_alert = `
            <div class="mir_alert_wrap ${this._modalClass}">
                <div class="mir_confirm">
                    <div class="mir_message_wrap">
                        <span class="material-icons">warning</span> 
                        <p class="mir_small_title">${this._text}</p>
                    </div>
                    <div class="mir_alert_btn">
                        <button class="cancel_btn chand">돌아가기</button>
                        ${customBtnWrap}
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', mir_alert);

        const yes = document.querySelector('.mir_alert_wrap .grant_btn');
        const no  = document.querySelector('.mir_alert_wrap .cancel_btn');
        
        yes.addEventListener('click', function(e) {
            msg = new mirMessage({
                type : 'alert',
                text : '권한 요청이 성공적으로 전송되었습니다.',
                callBack    : () => {
                    if(pageBack) history.back();
                }
            }).show();
        });
        no.addEventListener('click', function(e) {
            console.log(pageBack);
            mir_alert_close();
            if(pageBack) history.back();
        });
    }
    

    _modeInit(mode, obj) {
        //* mode 를 지정했지만 option 에 값이 있으면 option 값 우선
        switch(mode) {
            case "success":
                this._icon = this._checkData(obj['icon'], 'check_circle');
                this._bgc  = this._checkData(obj['bgc'], '#28a745');
                break;
            case "fail":
                this._icon = this._checkData(obj['icon'], 'cancel');
                this._bgc  = this._checkData(obj['bgc'], '#dc3545');
                break;
            case "info":
                this._icon = this._checkData(obj['icon'], 'info');
                this._bgc  = this._checkData(obj['bgc'], '#17a2b8');
                break;
            case "warning":
                this._icon = this._checkData(obj['icon'], 'report');
                this._bgc  = this._checkData(obj['bgc'], '#ffc107');
                break;
            default :
                break;
        }
    }

    _checkData(data, def) {
        return data == null ? def : data;
    }

}

//* sleep()
function wait(sec) {
    return new Promise(resolve => setTimeout(resolve, sec * 1000))
}

//* 토스트 영역 안 아이템이 모두 사라지면 영역도 삭제
function mir_toast_wrap_check(targetWrap = null) {
    if (targetWrap) {
        const children = targetWrap.querySelectorAll('.mir_toast');
    
        if (children) {
            if (children.length > 0 ) {
                return;
            }
        } else {
            targetWrap.remove();
        }
    }
}

//* 토스트 삭제
function mir_toast_close(e, callBack) {
    e.preventDefault();

    const btn        = e.currentTarget;
    const toast      = btn.closest('.mir_toast');
    const toast_wrap = toast.parentElement;

    toast.remove();
    if(toast_wrap) mir_toast_wrap_check(toast_wrap);

    if(callBack != null && typeof callBack == 'function') {

        callBack(e);
    }
}

function mir_alert_close() {
    const mir_alert_wrap = document.querySelector('.mir_alert_wrap');
    mir_alert_wrap.remove();
}

