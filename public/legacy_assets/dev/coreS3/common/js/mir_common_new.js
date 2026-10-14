/**
 * @author 2022-06-02 17:35:08 동환
 * 
 * @category 탭
 * 
 * @param {Event}       e
 * @param {String}      btn_class           : tab button 공통 class
 * @param {String}      taget_class         : tab target 공통 class
 * @param {String}      target_id           : tab target id
 * @param {String}      active_class        : tab target,button active class
 * @param {Function}    active_callback     : 활성화 callback
 * @param {Function}    inactive_callback   : 비활성화 callback
 */
function mir_tab(e, btn_class, target_class, target_id, active_class, active_callback, inactive_callback) {
    active_class        = active_class || 'active';
    active_callback     = active_callback || null;
    inactive_callback   = inactive_callback || null;

    var current_btn = e.currentTarget;
    var target      = document.getElementById(target_id);

    current_btn.classList.add(active_class);

    //* 활성화
    if(current_btn.classList.contains(active_class)) {

        target.classList.add(active_class);

        var selected_tab_buttons = document.querySelectorAll('.' + btn_class + '.' + active_class);
        var selected_tab_targets = document.querySelectorAll('.' + target_class + '.' + active_class);

        //* 기존 선택됐던 버튼, 타겟 active_class 해제
        var tab_count = selected_tab_buttons.length;
        for(var i = 0; i < tab_count; i++) {

            var selected_tab_button = selected_tab_buttons[i];
            var selected_tab_target = selected_tab_targets[i];
            
            if(
                selected_tab_button != null 
                && selected_tab_button != current_btn
            ) selected_tab_button.classList.remove(active_class);
    
            if(
                selected_tab_target != null 
                && selected_tab_target.id != target_id
            ) selected_tab_target.classList.remove(active_class);
        }

        if(active_callback) active_callback(e);
    } else { //* 비활성화

        target.classList.remove(active_class);

        if(inactive_callback) inactive_callback(e);
    }
}

function mir_active_tab_wrap(e, active_wrap, common_class){

    e.preventDefault();
    e.stopPropagation();

    const current_active = document.querySelector('.' + common_class + '.active');
    current_active.classList.remove('active');

    const replace_active = document.getElementById(active_wrap);
    replace_active.classList.add('active');
}

/**
 * @author 2022-06-02 18:59:38 동환
 * 
 * @category 모달 닫기
 * 
 * @param {Function} callback
 */
async function mir_close_modal(callback = '') {

    mir_close_modal_func();

    if(callback) {

        if(Object.prototype.toString.call(callback) === "[object AsyncFunction]") {

            await callback();
        } else {

            callback();
        }
    }
}

function mir_close_sub_modal(e) {

    let target = e.currentTarget;
    if (target === null) target = e.target;

    const sub_modal = target.closest('.mir_sub_modal');

    $(sub_modal).html('');
}

async function async_mir_close_modal(callback = '') {

    var sync_check;

    if(callback) {

        if(Object.prototype.toString.call(callback) === "[object AsyncFunction]") {

            sync_check = await callback();
        } else {

            callback();
            sync_check = 'Y';
        }

    } else {

        sync_check = 'Y';
    }

    if(sync_check) mir_close_modal_func();
}

function mir_close_modal_func() {

    var modal_list    = document.querySelectorAll('.mir_modal_wrap');
    var close_modal   = modal_list[modal_list.length - 1];

    //TODO 추후 kb관련코드 분리하기
    //* 플랫 피커 사용시, 생기는 화살표 박스가 모달 바깥에 남기에 해당 오브젝트를 지워준다.
    var cs_kiosk_flatpickr  = document.querySelectorAll('.cs_kiosk_flatpicker');
    var input_count         = cs_kiosk_flatpickr.length;
    var flatpickr_dregs     = document.querySelectorAll(".flatpickr-calendar.animate");

    if(input_count > 0) {
        for(var i = input_count-1; i >= 0; i--) {

            flatpickr_dregs[i].remove();
        }
    }

    //* 키오스크 모달일 경우 소켓 연결 해제
    var ez_adm_cs_center_modal = document.querySelectorAll(".ez_adm_cs_center_modal");
    if(ez_adm_cs_center_modal.length > 0) kiosk_socket_disconnect();

    const module_title_box_list = document.querySelectorAll('.module_title_box');
    for (const module_title_box of module_title_box_list) {
        module_title_box.remove();
    }

    if (close_modal && close_modal.nextElementSibling) {
        if (close_modal.nextElementSibling.id == 'mir_modal_loading_wrap') close_modal.nextElementSibling.remove();
    }
    
    close_modal?.remove();
}

/**
 * @author 2022-12-01 14:13:02 동환
 * 
 * @category 모달 모두닫기
 */
function mir_close_all_modal() {
    const modal_list = document.querySelectorAll('.mir_modal_wrap');

    for (const modal of modal_list) {
        modal.remove();
    }
}

/**
 * @author 2022-11-21 14:21:20 현규
 * 
 * @category 모달 투명도 조절
 * 
 * @param {Event} e
 */
function mir_change_opacity_modal(e) {
    const range = e.currentTarget;
    const this_modal = range.closest('.mir_modal_wrap');

    const value = range.value;
    this_modal.style.opacity = value / 100;
}

/**
 * @category material input
 */
$(document).on('blur', '.mir_input', function(e) {

    var target_input = e.currentTarget;
    var target_label = target_input.parentElement.querySelector('.mir_input_label');

    if(target_label) {

        target_input.setAttribute('value', target_input.value);
    }
});

/**
 * @category ajax 요청 함수
 * 
 * @param {String}      encoded_url 
 * @param {String}      method 
 * @param {String}      secukey 
 * @param {*}           data 
 * @param {Function}    res_func 
 */
function ajax_request(encoded_url, method, secukey, data, res_func) {

    $.ajax({
        type        : method,
        url         : atob(encoded_url),
        data        : { secukey: secukey, secuarrset: JSON.stringify({ secuarr1: JSON.stringify(data) }) },
        async       : true,
        traditional : true,
        cache       : false,
        complete    : function(data) {
            var status      = data.status;
            var res_json    = JSON.parse(data.responseText);
            
            res_func(status, res_json);
        }
    });
}

/**
 * @category 페이지네이션 제작 함수
 * 
 * @param {Number}      target_page : 활성화 페이지
 * @param {Number}      total_count : 총 아이템 갯수
 * @param {Number}      page_count  : 페이지네이션 페이지 갯수
 * @param {Number}      limit       : 한페이지 갯수
 * @param {Function}    event       : 페이지네이션 클릭시 event
 * 
 * @returns {HTMLElement} page_elements
 */
function build_pages(target_page, total_count, page_count, limit, event) {
    const page_elements   = [];
    const total_page      = Math.ceil(total_count / limit);
    const page_group      = Math.ceil(target_page / page_count);

    let first_page  = target_page - (target_page % page_count) + 1;
    let last_page   = page_group * page_count;
    
    if (first_page > target_page) first_page = first_page - page_count;
    if (last_page > total_page) last_page = total_page;

    //* 이전 페이지버튼
    const skip_prev       = target_page - page_count;
    const skip_prev_page  = skip_prev > 0 ? skip_prev : 1;
    const skip_prev_btn   = create_page_btn("keyboard_double_arrow_left", "material-icons", event(skip_prev_page));

    page_elements.push(skip_prev_btn);

    const prev        = target_page - 1;
    const prev_page   = prev > 0 ? prev : 1;
    const prev_btn    = create_page_btn("keyboard_arrow_left", "material-icons", event(prev_page));

    page_elements.push(prev_btn);

    //* 페이지 번호버튼
    for(let page = first_page; page <= last_page; page++) {
        const class_name  = page == target_page ? "page_active" : null;
        const page_btn    = create_page_btn(page, class_name, event(page));

        page_elements.push(page_btn);
    }

    //* 다음페이지 버튼
    const next        = target_page + 1;
    const next_page   = next > total_page ? total_page : next;
    const next_btn    = create_page_btn("keyboard_arrow_right", "material-icons", event(next_page));

    page_elements.push(next_btn);

    const skip_next       = target_page + page_count;
    const skip_next_page  = skip_next > total_page ? total_page : skip_next;
    const skip_next_btn   = create_page_btn("keyboard_double_arrow_right", "material-icons", event(skip_next_page));

    page_elements.push(skip_next_btn);

    return page_elements;
}

function mir_num_build_pages(target_page, total_count, page_count, limit, event) {
    
    const page_elements   = [];
    const total_page      = Math.ceil(total_count / limit);
    const page_group      = Math.ceil(target_page / page_count);

    let first_page  = target_page - (target_page % page_count) + 1;
    let last_page   = page_group * page_count;
    
    if (first_page > target_page) first_page = first_page - page_count;
    if (last_page > total_page) last_page = total_page;

    //* 이전 페이지버튼
    const skip_prev       = target_page - page_count;
    const skip_prev_page  = skip_prev > 0 ? skip_prev : 1;
    const skip_prev_btn   = create_page_btn("keyboard_double_arrow_left", "material-icons", event(skip_prev_page));

    const prev = target_page - 1;
    let prev_page, prev_page_class, prev_pe;
    if (prev > 0) {

        prev_page = prev;

    } else {

        prev_page       = 1;
        prev_pe         = 'peNone';
        prev_page_class = 'cC8C8D2';
    }

    const prev_btn = create_page_btn("keyboard_arrow_left", "material-icons", event(prev_page));
    if (prev_page_class) {

        skip_prev_btn.classList.add(prev_pe);
        skip_prev_btn.classList.add(prev_page_class);
        prev_btn.classList.add(prev_pe);
        prev_btn.classList.add(prev_page_class);
    }

    page_elements.push(skip_prev_btn);
    page_elements.push(prev_btn);

    //* 번호
    const num_span          = document.createElement('span');
    num_span.textContent    = target_page + '/' + total_page;
    num_span.classList.add('snez_subtitle');
    num_span.classList.add('peNone');
    page_elements.push(num_span);

    //* 다음페이지 버튼
    const next = target_page + 1;
    let next_page, next_page_class, next_pe;
    if (next > total_page) {

        next_page       = total_page;
        next_pe         = 'peNone';
        next_page_class = 'cC8C8D2';

    } else {

        next_page = next;
    }

    const next_btn = create_page_btn("keyboard_arrow_right", "material-icons", event(next_page));

    const skip_next       = target_page + page_count;
    const skip_next_page  = skip_next > total_page ? total_page : skip_next;
    const skip_next_btn   = create_page_btn("keyboard_double_arrow_right", "material-icons", event(skip_next_page));

    if (next_page_class) {

        next_btn.classList.add(next_pe);
        next_btn.classList.add(next_page_class);
        skip_next_btn.classList.add(next_pe);
        skip_next_btn.classList.add(next_page_class);
    }

    page_elements.push(next_btn);
    page_elements.push(skip_next_btn);

    return page_elements;
}

function mir_small_build_pages(target_page, total_count, page_count, limit, event) {

    const page_elements   = [];
    const total_page      = Math.ceil(total_count / limit);
    const page_group      = Math.ceil(target_page / page_count);

    let first_page  = target_page - (target_page % page_count) + 1;
    let last_page   = page_group * page_count;
    
    if (first_page > target_page) first_page = first_page - page_count;
    if (last_page > total_page) last_page = total_page;

    //* 이전 페이지버튼
    const prev = target_page - 1;
    let prev_page, prev_page_class, prev_pe;
    if (prev > 0) {

        prev_page = prev;

    } else {

        prev_page       = 1;
        prev_pe         = 'peNone';
        prev_page_class = 'cC8C8D2';
    }

    const prev_btn = create_page_btn("keyboard_arrow_left", "material-icons", event(prev_page));
    if (prev_page_class) {

        prev_btn.classList.add(prev_pe);
        prev_btn.classList.add(prev_page_class);
    }

    page_elements.push(prev_btn);

    //* 다음페이지 버튼
    const next = target_page + 1;
    let next_page, next_page_class, next_pe;
    if (next > total_page) {

        next_page       = total_page;
        next_pe         = 'peNone';
        next_page_class = 'cC8C8D2';

    } else {

        next_page = next;
    }

    const next_btn = create_page_btn("keyboard_arrow_right", "material-icons", event(next_page));
    if (next_page_class) {

        next_btn.classList.add(next_pe);
        next_btn.classList.add(next_page_class);
    }

    page_elements.push(next_btn);

    return page_elements;
}

/**
 * @category 페이지네이션 버튼 생성
 * 
 * @param {HTMLElement} html 
 * @param {String}      class_name 
 * @param {Function}    event 
 * 
 * @returns {HTMLElement}
 */
function create_page_btn(html, class_name, event) {
    var span            = document.createElement("span");
    span.textContent    = html;

    span.addEventListener("click", event);

    if(class_name) span.classList.add(class_name);

    return span;
}

/**
 * @category 자식요소 제거
 * 
 * @param {HTMLElement} target_node 
 */
function remove_all_child_nodes(target_node) {
    
    if(target_node){

        while(target_node.firstChild) {
            
            target_node.removeChild(target_node.lastChild);
        }
    }
}

/**
 * @author 2022-06-08 12:56:35 동환
 * 
 * @category active_class toggle
 * 
 * @param {Event}       e
 * @param {String}      active_class 
 * @param {Function}    active_callback 
 * @param {Function}    inactive_callback 
 */
function active_toggle(e, active_class = 'active', active_callback = null, inactive_callback = null, target = null) {
    e.stopPropagation();

    if(target && typeof target == 'string') {

        active_target = document.getElementById(target);
    } else if(target) {

        active_target = target;
    } else {

        active_target = e.currentTarget;
    }

    active_target.classList.toggle(active_class);

    if(active_target.classList.contains(active_class)) {
        
        if(active_callback) active_callback(e);
    } else {
        
        if(inactive_callback) inactive_callback(e);
    }
}

/**
 * @author 2022-06-09 20:05:18 지수
 * 
 * @category 공통 셀렉트 클릭 이벤트 밸류 변경
*/
function mir_common_select_option_select(e, callback = "") {

    const option  = e.currentTarget;
    const value   = option.dataset.value;
    const label   = option.textContent;

    const select_wrap     = option.parentElement.parentElement;
    const select_input    = select_wrap.querySelector(".mir_common_select_input");
    const value_text      = select_wrap.querySelector(".mir_common_select_value_text");

    select_wrap.classList.add("selected");

    //* classList를 늦게 인식하여 remove가 적용되지 않아서 setTimeout을 설정해줌.
    setTimeout(function() {

        select_wrap.classList.remove("active");
    });

    select_input.value      = value;
    value_text.textContent  = label;

    triggerChange(select_input);

    if(callback != "") callback(e);
}

/**
 * @author 2022-09-13 19:16:14 동환
 * 
 * @category change event trigger(mir_common_select change event)
 * 
 * @param {HTMLElement} el 
 */
function triggerChange(el) {
    let changeEvent = new Event('change');

    el.dispatchEvent(changeEvent);
}

/**
 * @author 2022-12-05 15:51:32 동환
 * 
 * @category custom event trigger
 * 
 * @param {HTMLElement} el 
 * @param {String} name 
 */
function triggerCustom(el, name) {
    let custom_event = new Event(name);

    el.dispatchEvent(custom_event);
}

/**
 * @author 2022-09-13 19:16:14 동환
 * 
 * @category input event trigger(mir_common_select input event)
 * 
 * @param {HTMLElement} el 
 */
function triggerInput(el) {
    let inputEvent = new Event('input');

    el.dispatchEvent(inputEvent);
}


/**
 * ------------------------------------- 로딩 후 동작 ---------------------------------------
 */
window.onload = () => {

    /**
     * @author 2022-06-09 20:05:18 지수
     * 
     * @category 공통 셀렉트 클릭 이벤트 바디 클릭 시, 액티브 해제
    */
    document.querySelector('body').addEventListener("click", function() {

        let mir_common_select_click = document.querySelectorAll(".mir_common_select_click.active");
    
        if(mir_common_select_click.length >= 1) {
            
            mir_common_select_click.forEach((el) => {
    
                el.classList.remove("active");
            });
        }
    });
}

//* jquery
$(function() {

    /**
     * @author 2022-06-09 20:05:18 지수
     * 
     * @category 공통 인풋 밸류 체크 
    */
    $(document).on("propertychange change keyup paste input", ".mir_common_input_value_chk", (event) => {
        
        let target = event.currentTarget;
        let value  = target.value;
        
        if(value != ""){

            target.classList.add("is_value");
            return
        }
        target.classList.remove("is_value");
    });

    /**
     * @author 2022-06-09 20:05:18 지수
     * 
     * @category 공통 셀렉트 마우스 이벤트
    */
    $(document).on("mouseenter", ".mir_common_select", function(e) {

        var select = e.currentTarget;

        select.classList.add('active');
    });

    /**
     * @author 2022-06-09 20:05:18 지수
     * 
     * @category 공통 셀렉트 마우스 이벤트
    */ 
    $(document).on("mouseleave", ".mir_common_select", function(e) {

        var select = e.currentTarget;

        select.classList.remove('active');
    });

    /**
     * @author 2022-06-09 20:05:18 지수
     * 
     * @category 공통 셀렉트 클릭 이벤트 액티브 해제
    */
    $(document).on("click", ".mir_common_select_click", function(e) {

        var select = e.currentTarget;

        if(!select.classList.contains("active")) {

            select.classList.add("active");
        }
    });
    
    $(document).on('input', '.snez_input[type="text"]',(e) => {

        const target = e.currentTarget;
        if (target.value.length > 0) target.classList.add('filled');
        else target.classList.remove('filled');
    });

    $(document).on('input', '.snez_search_input[type="text"]',(e) => {

        const input  = e.currentTarget;
        const target = input.closest('.snez_search_input_container') ? input.closest('.snez_search_input_container') : input.closest('.snez_frameless_search_input_container');
        if (input.value.length > 0) target.classList.add('filled');
        else target.classList.remove('filled');
    });
});

/**
 * @author 2022-06-20 12:37:33 동환
 * 
 * @category val이 arr에 있는지 판별
 * 
 * @param {*}       val
 * @param {Array}   arr
 * 
 * @return {Boolean}
 */
function in_array(val, arr) {

    var arr_length = arr.length;

    for(var i = 0; i < arr_length; i++) {

        if(arr[i] == val) return true;
    }

    return false;
}

/**
 * @author 2022-06-20 14:00:45 동환
 * 
 * @category ms 시간 format 변경
 * 
 * @param {Int} ms_date 
 * 
 * @return {String} change_date
 */
function change_format_date(ms_date) {

    var change_date = new Date(ms_date);

    // format : yy-mm-dd hh:mm
    change_date = change_date.getFullYear().toString().slice(-2) + '-' +
                ("00" + (change_date.getMonth() + 1)).slice(-2) + '-' +
                ("00" + change_date.getDate()).slice(-2) + ' ' + 
                ("00" + change_date.getHours()).slice(-2) + ":" + 
                ("00" + change_date.getMinutes()).slice(-2);

    return change_date;
}

/**
 * @category active class toggle & run callback
 * 
 * @param {Event}       e 
 * @param {Function}    callback 
 */
function on_toggle(e, callback = null) {

    const target = e.currentTarget;

    target.classList.toggle('active');

    if(callback != null) callback(e);
}

/**
 * @category 문자열에서 html tag 제거
 * 
 * @param {String} str 
 */
function strip_tags(str = '') {

    const result = str.replace(/(<([^>]+)>)/gi, '');

    return result;
}

/**
 * @author 2022-07-28 16:00:21 현규
 * 
 * @category -------------- new_print_select 관련 이벤트 ------------------------
 */
function on_mir_new_select_wrap(e) {
    const target = e.currentTarget;

    const select = target.querySelector('.mir_new_select');
    select.classList.toggle('active');
}

function on_mir_new_search_select_wrap(e) {
    const target = e.currentTarget;

    const select = target.querySelector('.mir_new_search_select');
    if(!select.classList.contains('active') && !select.classList.contains('deactivate')) select.classList.add('active');

    select.classList.remove('deactivate');
}

function close_mir_new_search_select_wrap(e) {
    const target = e.currentTarget;

    const select = target.closest('.mir_new_search_select');
    if(select.classList.contains('active')){

        select.classList.remove('active');
        select.classList.add('deactivate');
    }
}

var mir_new_search_select_item_timer;
function mir_new_search_select_item(e, data) {

    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    const target        = e.currentTarget;
    const target_wrap   = target.closest('.mir_new_select_wrap');
    const call          = target.value;
    const item_wrap     = target_wrap.querySelector('.mir_new_search_select_item_wrap');

    clearTimeout(mir_new_search_select_item_timer);
    if(!item_wrap.classList.contains('search_loading')) {

        $(item_wrap).addClass('search_loading').html('<div class="mds-flex durmylist" style="flex:1 1 100%; order:1;"><div class=" fs1rem pdt1rem w100p tCenter"><img src="/js/_mir/loadingio/svg/obj/loadingbars.svg" border="0" style="max-width:1.54rem;"><div>타이핑이 끝나면<br> 검색을 시작합니다.</div></div></div>');
    }

    mir_new_search_select_item_timer = setTimeout(() => {

        const core = target.dataset.core;
        const req  = target.dataset.case;

        const send_data = { data, call };
        ajax_request(core, 'POST', req, send_data, (status, data) => {

            if(status == 200){
                
                $(item_wrap).removeClass('search_loading').html(data.print_html);
                return;
            }
        });
    }, 1000);
}

function on_mir_new_select_item(e, callback = null) {
    e.stopPropagation();
    e.preventDefault();

    const target        = e.currentTarget;

    const select_wrap   = target.closest('.mir_new_select_wrap');
    const label         = select_wrap.querySelector('.mir_new_selected_label p');
    const select        = select_wrap.querySelector('.mir_new_select');
    const input         = select_wrap.querySelector('input');

    label.innerHTML     = target.innerHTML;
    input.value         = target.dataset.value;
    
    triggerChange(input);
    
    select.classList.remove('active');

    if(callback != null) callback(e);
}

function on_mir_new_range_change(e, callback = null) {
    e.stopPropagation();
    e.preventDefault();

    const target = e.currentTarget;
    const value = target.value;
    const id = target.id;

    let target_id = '';
    if(id.includes('range')){
        target_id = id.replace('range', 'input');
    }else {
        target_id = id.replace('input', 'range');
    }
    
    const change_target = document.getElementById(target_id);
    change_target.value = value;

    if(callback != null) callback(e);
}
/**
 * ------------------------- new_print_select 관련 이벤트 끝 ------------------------
 */

/**
 * @author 2022-08-31 11:33:39 동환
 * 
 * @category target 이외 영역 클릭시 target 제거해주는 함수
 * 
 * @param {String} target_id 
 * @param {String} type : remove/display/active,,,
 * 
 * @info //g 이 함수를 호출하는곳에서 stopPropagation() 해줄것
 */
function add_remove_event(target_id, type = 'remove') {
    
    function _remove_event(e) {
        const click_el      = e.target;
        const remove_target = document.getElementById(target_id);

        if (!remove_target) return document.removeEventListener('click', _remove_event);

        if (
            !remove_target.contains(click_el) &&
            (
                !remove_target
                || remove_target.classList.contains('disNone')
                || remove_target.classList.contains(type)
            )
        ) document.removeEventListener('click', _remove_event);
        
        if (
            !e.target.closest(`#${target_id}`) 
            && click_el != remove_target 
            && remove_target
        ) {
            if (type == 'remove') {
            remove_target.remove();
            } else if (type == 'disNone') {
            remove_target.classList.add('disNone');
            } else { //g 그외 active class는 제거 해줌
            remove_target.classList.remove(type);
            }
            
            document.removeEventListener('click', _remove_event);
        }

        if(remove_target.classList.contains("new_ez_select_ul")) {
            document.removeEventListener('click', _remove_event);
        }
    }

    document.addEventListener('click', _remove_event);
}

/**
 * @category 검색 요청 데이터 만들어주는 메소드
 * 
 * @param {Number}      page
 * @param {Number}      limit
 * @param {String}      target  module/theme/page
 * @param {Boolean}     main    메인에서 호출한건지 확인
 */
function make_search_config(page, limit, target, main = false) {

    const req_data      = { page, limit };
    const main_class    = main == true ? 'main_' : '';

    if(target == 'page') {

        const active_menu = document.querySelector('.menu_title.active');

        if(active_menu == null) return alert('페이지를 설정할 메뉴를 선택해주세요.');
    
        const menu_idx      = active_menu.dataset.wr_id;
        req_data.menu_idx   = menu_idx;
    }

    //* 카테고리
    const category_config = build_selected_category_config(target, main);
    
    //* 옵션
    const option_wrap               = document.getElementById(`ezs_${main_class}${target}_option_wrap`);
    
    if(option_wrap) {
        const selected_option_inputs    = option_wrap.querySelectorAll('input[name="hrchy_idx"]:checked');
        for(const selected_option_input of selected_option_inputs) {
    
            const hrchy_idx     = selected_option_input.value;
            const target_order  = selected_option_input.parentElement.dataset.order;
            const parent_el     = document.getElementById(`ezs_${main_class}${target}_option_title_${target_order}`);
            const parent_idx    = parent_el.dataset.hrchy_idx;
    
            if(!category_config.hasOwnProperty(parent_idx)) category_config[parent_idx] = [];
            
            category_config[parent_idx].push([hrchy_idx]);
        }
    }

    req_data.categories = category_config;

    return req_data;
}

/**
 * @author 2022-05-19 15:22:56 동환
 * 
 * @category 선택한 분류 config build
 * 
 * @param {String}  target  module/theme
 * @param {Boolean} main    메인에서 호출한건지 확인
 */
function build_selected_category_config(target, main = false) {
    const category_config   = {};
    const main_class        = main == true ? 'main_' : '';

    let category_wrap = "";
    if(target == 'header') {
        category_wrap = document.querySelector("#header_change_modal_category_wrap");
    } else {
        //* category
        category_wrap = document.getElementById(`ezs_${main_class}${target}_category_wrap`);
    }


    if(category_wrap == null) return;

    const selected_category_inputs  = category_wrap.querySelectorAll('input[name="hrchy_idx"]:checked');
    
    for(const selected_category_input of selected_category_inputs) {

        const selected_category = selected_category_input.parentElement;
        const child_wrap        = selected_category.nextElementSibling;
        
        let last_depth = true;
        if(child_wrap != null) {

            const child_depth_items = child_wrap.children;

            for(const child_depth_item of child_depth_items) {

                const input = child_depth_item.querySelector("input[name=\'hrchy_idx\']:checked");

                if(input) {

                    last_depth = false;
                    break;
                }
            }
        }

        if(last_depth == false) continue;

        const hrchy_idx = selected_category_input.value;
        build_selected_category_config_tmp(selected_category, hrchy_idx, category_config, []);
    }

    return category_config;
}

/**
 * @author 2022-05-19 17:19:11 동환
 * 
 * @category category_config tmp build
 * 
 * @param {HTMLElement} category_el
 * @param {String}      hrchy_idx           encoded hrchy_idx
 * @param {Object}      category_config
 * @param {Array}       tmp
 */
function build_selected_category_config_tmp(category_el, hrchy_idx, category_config, tmp) {

    const parent_matching_key   = category_el.parentElement.dataset.parent_idx;
    const parent_el             = document.querySelector(`.ezs_category_title_wrap[data-matching_key="${parent_matching_key}"]`);
    const parent_input          = parent_el.querySelector('input[name="hrchy_idx"]');
    const parent_idx            = parent_input.value

    tmp.unshift(hrchy_idx);
    if(parent_el.classList.contains('first_depth')) {

        if(!category_config.hasOwnProperty(parent_idx)) category_config[parent_idx] = [];
        if(tmp.length > 0) category_config[parent_idx].push(tmp);

        return;
    } else {

        build_selected_category_config_tmp(parent_el, parent_idx, category_config, tmp);
    }
}

/**
 * @author 2022-10-04 14:58:21 현규
 * 
 * @category ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ 모듈 사이 바 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
 */

function module_between_bar_init() {
    const bar_list = document.querySelectorAll('.module_bar');
    //* module 바 찾아서 숨김모듈 카운팅 표시
    let order = 1;
    bar_list.forEach((bar) => {
        let hide_count = 0;

        let hide_module = get_check_bar(bar, hide_count);

        const count_text = bar.querySelector('.module_hide_count');
        const insert_btn = bar.querySelector('.insert_btn');
        order = order + hide_module;
        insert_btn.dataset.order = order++;

        if(count_text){
            const module_bar_btn = count_text.closest('.module_bar_btn');
            if(hide_module == 0) {
                module_bar_btn.remove();
            } else {
                const module_bar_btn_tip = module_bar_btn.querySelector('.module_bar_btn_tip');
                module_bar_btn_tip.innerHTML = `${hide_module} 개의 숨겨진 모듈이 존재합니다.`
            }
        }
    });
}
module_between_bar_init();

//* 재귀돌면서 숨김모듈 카운팅
function get_check_bar(target, hide_count) {
    var module = target.nextElementSibling;
    if(module == null) return hide_count;

    if(module.classList.contains('module_bar')) {
        module = module.nextElementSibling;
    }

    if(module.classList.contains('hidden_module_bar')){
        hide_count += 1;
        hide_count = get_check_bar(module, hide_count);
        return hide_count;
    }else {
        return hide_count;
    }
}

//* 숨김모듈 아이콘 클릭
function on_module_visible(e) {
    const btn = e.currentTarget;
    const count = parseInt(btn.querySelector('.module_hide_count').innerHTML);
    if(count == 0) return;

    const bar = btn.closest('.module_bar');
    get_hide_module(bar);
}

//* 2개 이상일 경우 재귀돌면서 모듈 보이게
async function get_hide_module(target) {
    var module = target.nextElementSibling;
    if(module == null || !module.classList.contains('hidden_module_bar')) return;

    get_hide_module(module);

    const module_id = module.id.replace('box_module_', '').replace('_wrap','');

    var regex = /[^0-9]/g;	
    const module_idx = module_id.replace(regex, '');
    const ez_layout_name = module_id.replace('_' + module_idx, '');

    await get_adm_ez_module(ez_layout_name, module_idx, true);

    // 모듈 붙으면 바 삭제 (백에서 지우는게 제일 좋음)
    const hide_module = document.getElementById(`box_module_${ez_layout_name}_${module_idx}_wrap`);
    const hide_module_bar = hide_module.previousElementSibling;
    if(hide_module_bar.classList.contains('module_bar')) {
        hide_module_bar.remove();
    }
    

}
// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ 모듈 사이드바 끝 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

/**
 * @category 모달 드래그
 */
function modal_drag(modal) {
    let X1 = null;
    let Y1 = null;
    let X2 = null;
    let Y2 = null;

    //* 타이틀 부분을 드래그 했을 때 이동되도록
    const modal_title = modal.querySelector("div:first-child");
    modal_title.addEventListener("mousedown", _mouseDown);

    function _mouseDown(e) {
        e = e || window.event;
        e.preventDefault();

        if (modal.classList.contains("active")) return;

        X1 = e.clientX;
        Y1 = e.clientY;

        modal.addEventListener("mousemove", _mouseMove);
        modal.addEventListener("mouseup", _mouseUp);
        modal.addEventListener("mouseleave", _mouseUp);
    }

    function _mouseMove(e) {
        e = e || window.event;
        e.preventDefault();

        X2 = X1 - e.clientX;
        Y2 = Y1 - e.clientY;

        X1 = e.clientX;
        Y1 = e.clientY;

        modal.style.left = (modal.offsetLeft - X2) + 'px';
        modal.style.top = (modal.offsetTop - Y2) + 'px';
    }

    function _mouseUp() {
        modal.removeEventListener("mousemove", _mouseMove);
        modal.removeEventListener("mouseup", _mouseUp);
    }
}

/**
 * @author 2022-11-08 16:46:12 동환
 * 
 * @category category tree accordion
 * 
 * @param {Event} e
 */
function category_tree_accordion(e) {
    const target = e.currentTarget.closest(".mir_category_parent");

    target.classList.toggle("active");
}

/**
 * @autohr 2022-11-09 10:58:51 동환
 * 
 * @category 범용 분류 검색조건(map) 생성
 * 
 * @param {String} category_wrap : category_wrap id
 */
function build_category_config(category_wrap_id) {
    const category_config           = {};
    const category_wrap             = document.getElementById(category_wrap_id);
    const selected_category_inputs  = category_wrap.querySelectorAll('input[name="hrchy_idx"]:checked');

    for (const selected_category_input of selected_category_inputs) {
        const selected_category = selected_category_input.parentElement;
        const child_wrap        = selected_category.nextElementSibling;

        let last_depth = true;
        if (child_wrap) {
            const child_depth_items = child_wrap.querySelectorAll('input[name="hrchy_idx"]:checked');

            if (child_depth_items.length > 0) last_depth = false;
        }

        if (last_depth == false) continue;

        const hrchy_idx = selected_category_input.value;
        build_category_config_tmp(selected_category, hrchy_idx, category_config, []);
    }

    return {...category_config};
}

/**
 * @author 2022-05-19 17:19:11 동환
 * 
 * @category category_config tmp build
 * 
 * @param {HTMLElement} category_el
 * @param {String}      hrchy_idx           encoded hrchy_idx
 * @param {Object}      category_config
 * @param {Array}       tmp
 */
function build_category_config_tmp(category_el, hrchy_idx, category_config, tmp) {
    const parent_matching_key   = category_el.parentElement.dataset.parent_idx;
    const parent_el             = document.querySelector(`.mir_category_title_wrap[data-matching_key="${parent_matching_key}"]`);
    const parent_input          = parent_el.querySelector('input[name="hrchy_idx"]');
    const parent_idx            = parent_input.value;

    tmp.unshift(hrchy_idx);

    if (parent_el.classList.contains('first_depth')) {
        if (!category_config.hasOwnProperty(parent_idx)) category_config[parent_idx] = [];
        if (tmp.length > 0) category_config[parent_idx].push(tmp);

        return;
    } else {
        build_category_config_tmp(parent_el, parent_idx, category_config, tmp);
    }
}

/**
 * @author 2022-11-15 11:00:16 동환
 * 
 * @category 색상 설정 input spectrum 적용
 * 
 * @info data-callback 에 callback함수 넘김
 * @info callback 함수의 인자로 color input 넘김
 */
function mir_color_input_active() {
    const inputs = document.querySelectorAll('.mir_color_input');

    for (const input of inputs) {
        const callback = input.dataset.callback;

        $(input).spectrum({
            showInput   : true,
            showPalette : false,
            move() {
                const input = $(this)[0];

                triggerCustom(input, 'color_change');

                if (callback) {
                    const fn = window[callback];
    
                    if (typeof fn === 'function') {
                        fn(input);
                    }
                }
            }
        });
    }
}
mir_color_input_active();

/**
 * @author 2022-11-15 14:48:30 동환
 * 
 * @category range input active
 * 
 * @info data-callback 에 callback함수 넘김
 * @info callback 함수의 인자로 input value 넘김
 */
function mir_range_input_active() {
    const input_wraps = document.querySelectorAll('.range_input_wrap');

    for (const input_wrap of input_wraps) {
        const range     = input_wrap.querySelector('.range_input__range');
        const input     = input_wrap.querySelector('.range_input__input');
        const callback  = input_wrap.dataset.callback;
        const fn        = window[callback];

        range.addEventListener('input', (e) => {
            e.stopImmediatePropagation();

            const val   = range.value;
            input.value = val;

            triggerInput(input);
            triggerChange(input);
        });

        input.addEventListener('input', (e) => {
            e.stopImmediatePropagation();

            const val   = input.value;
            range.value = val;

            if (typeof fn === 'function') {
                fn(input);
            }
        });
    }
}
mir_range_input_active();

/**
 * @author 2024-03-21 12:04:46 송찬
 * 
 * @category snez checkbox checked attribute 토글용
 */
function toggle_snez_checkbox(e) {
    const current_target    = e.currentTarget;
    const checkbox          = current_target.querySelector('input[type=checkbox].snez_input');

    if(current_target.classList.contains("inactive")) return;

    checkbox.checked=!checkbox.checked;
}

/**
 * @author 2022-11-15 18:00:22 동환
 * 
 * @category 색상 스타일그룹 선택 하나만 되게
 */
function select_color_sg_checkbox(e) {
    const input             = e.currentTarget;
    const wrap              = input.parentElement;
    const selected_inputs    = wrap.querySelectorAll('.color_sg_item:checked');

    for (const selected_input of selected_inputs) {
        if (selected_input != input) selected_input.checked = false;
    }
}

//* 색상스타일그룹 사용하는 색상 설정영역일 경우 기본 인풋값 변경시 스타일그룹 선택해제
$(document).on('change', '.new_ez_color_picker_input', (e) => {
    const el = e.currentTarget;
    const wrap = el.closest('.new_ez_option_group');
    if(wrap){

        const color_sg_inputs = wrap.querySelectorAll('.color_sg_input');
    
        for (const color_sg_input of color_sg_inputs) color_sg_input.checked = false;
    }
});

/**
 * 빈페이지 모듈추가모달 요청함수
 *  
 * @param {String} insert_mode 
 */
function on_new_module_insert_modal(insert_mode) {
    const send_data = { mode: 'insert' };

    ajax_request(ezs_ajax_core, "POST", on_ezs_manager_modal_req, send_data, (status, data) => {
        if(status == 200) {
            $('#new_ez_panel_modal_wrap').html(data.print_html);

            get_insert_module_list(1, 12);

            return;
        }
    });
}

function init_new_page(add_type) {
    const url_params    = new URLSearchParams(window.location.search);
    const mir_code      = url_params.get('mir_code');

    const send_data = { mir_code };
    
    ajax_request(new_ez_ajax_core, "POST", create_new_setbox_layout_req, send_data, (status, data) => {
        if(status==200) {
            window.location.reload();

            return;
        }

        new mirMessage({
            pos         : 'br',
            type        : 'toast',
            mode        : 'fail',
            title       : '실패!',
            text        : data.message
        }).show();
    });
}

function mir_text_length_limit_func(e, target_id = ""){

    const target = e.currentTarget;

    let limit_wrap  = target_id == ""
                    ? target.closest('#mir_text_limit_wrap')
                    : document.getElementById(target_id).querySelector('#mir_text_limit_wrap');
    
    const value_length      = target.value.length;
    const limit_target      = limit_wrap.querySelector('#mir_text_limit_length');
    const default_target    = limit_wrap.querySelector('#mir_text_default_length');
    const current_length    = value_length;
    const limit_length      = default_target.innerText;

    if(current_length > limit_length){

        if(!limit_target.classList.contains('mds_alert_color')) limit_target.classList.add('mds_alert_color');
    } else {

        if(limit_target.classList.contains('mds_alert_color')) limit_target.classList.remove('mds_alert_color');
    }

    limit_target.innerText = value_length;
}

/**
 * @category 와이파이 유/무 체크
 * 
 * @return -1: 확인할 수 없는 브라우저
 * @return  0: cellular (모바일 데이터 환경 : 3g, 4g 등)
 * @return  1: cellular or wifi or PC 접속환경이 정확하지는 않으나 데이터 사용 제한
 * @return  2: cellular or wifi or PC 접속환경이 정확하지는 않으나 데이터 제한 안함
 * @return  3: wifi (와이파이)
*/
function is_wifi() {

    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection || 0;
    
    if(!conn) return -1;
    if(typeof(conn.type)!="undefined") {

        switch(conn.type) {
            case "wifi":
                return 3;

            case "cellular":
                return 0;

            default:
                return -1;
        }
    } else if(typeof(conn.saveData)!="undefined") {
        
        if(conn.saveData) {

            return 1;
        } else {

            return 2;
        }
    } else {

        return -1;
    }
}

/**
 * @category 모바일 페이지 뒤로가기 시, 이전 url 기억 후 출력
*/
function mir_mobile_page_back_func() {

    history.pushState(null, null, '');

    window.onpopstate = function() {

        const prev_url = document.referrer;

        location.href = prev_url;
    }
}

/**
 * @category 10보다 작은 숫자 앞에 0 붙이기
 * 
 * @param {String} value 
 * 
 * @returns {String}
 */
function left_pad(value) {
    if (Number(value) >= 10) return value;

    return "0" + value;
}

/**
 * @cateogry 두 개의 오브젝트나 배열이 같은 지, 확인하는 함수
 * @param  {*} obj1 첫번째 아이템
 * @param  {*} obj2 두번째 아이템
 * @return {Boolean} 값이 같으면 true, 다르면 false
 */
function isEqual(obj1, obj2) {

	/**
	 * @category 객체의 유형을 보다 정확하게 확인하기 위한 타입 설정
	 * @param  {Object} 오브젝트 
	 * @return {String} 오브젝트 타입
	 */
	function getType(obj) {
		return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
	}

	function areArraysEqual() {

		//g 길이 확인
		if (obj1.length !== obj2.length) return false;

		//g 개별 요소가 해당 배열에 속했는 지, 확인
		for (let i = 0; i < obj1.length; i++) {
			if (!isEqual(obj1[i], obj2[i])) return false;
		}

		//g 에러가 없을 때, true를 반환
		return true;
	}

	function areObjectsEqual() {

		if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;

		//g 개별 요소가 해당 오브젝트에 속했는 지, 확인
		for (let key in obj1) {
			if (Object.prototype.hasOwnProperty.call(obj1, key)) {
				if (!isEqual(obj1[key], obj2[key])) return false;
			}
		}

		//g 에러가 없을 때, true를 반환
		return true;
	}

	function areFunctionsEqual() {
		return obj1.toString() === obj2.toString();
	}

	function arePrimativesEqual() {
		return obj1 === obj2;
	}

	//g 오브젝트 타입 확인
	let type = getType(obj1);

	//g 만약 비교 요소 두개가 같은 타입이 아니면 false를 반환
	if (type !== getType(obj2)) return false;

	//g 기본 타입을 비교
	if (type === 'array') return areArraysEqual();
	if (type === 'object') return areObjectsEqual();
	if (type === 'function') return areFunctionsEqual();
	return arePrimativesEqual();
}

/**
 * @author 2023-01-06 12:30:17 현규 
 * 
 * @category 에러메시지 출력용
 * 
 * @param {String} meesage
 */
function error_message(message) {
    new mirMessage({
        pos           : 'br',
        type          : 'toast',
        mode          : 'fail',
        title         : '실패!',
        text          : message
    }).show();
}

/**
 * @author 2023-02-09 15:05:44
 * 
 * @detail 권한 없을 때 에러메시지 출력용
 * 
 * @param String message 
 */
function grant_error_message(message, request, pageBack=false) {
    new mirMessage({
        text        : message,
        type        : 'grant',
        pageBack    : pageBack,
        customBtn   : '<button class="new_mir_button mir_button_text grant_btn" style="padding: 8px 12px;" onclick="leave_grant_allow_request(\''+request+'\');">권한 요청하기</button>'
    }).show();
}

function leave_grant_allow_request(request) {
    //TODO 권한 달라고 요청 들어오면 현재 계정이 속한 ATN 오토웍스에 권한달라는 티켓 남기기
    ajax_request(grant_ajax_core, "POST", leave_grant_allow_request_req, {request}, (status, data) => {
        if(status == 200) {

            const siteTokenNum = data.siteTokenNum;
            const encoded_key  = data.encoded_key;

            var kiosk_socket = io.connect('https://mir-node.automedi.co.kr', { transports : ['websocket'] });
            kiosk_socket.emit('kiosk_req_submit',  { siteTokenNum });

            const room_name = `${encoded_key}_detail_room`;
            const comment_type = 1;
            const mention_list = null;
            const request_idx = data.request_idx;
            const comment_idx = data.comment_idx;
            const convert_check = '';
            const convert_idx_arr = [];
            const state_data = 0;
            
            kiosk_socket.emit('new_comment', { room_name, comment_type, encoded_key, mention_list, request_idx, comment_idx, convert_check, convert_idx_arr, state_data });

            success_message("권한 요청이 생성되었습니다.");
            return;
        }
        error_message(data.message)
    });
}

/**
 * @author 2023-01-10 16:03:22 현규 
 * 
 * @category 성공메시지 출력용
 * 
 * @param {String} meesage
 */
function success_message(message) {
    new mirMessage({
        type : 'toast',
        title : '성공!',
        text : message
    }).show();
}

function confirm_message(message, callback_function, cancel_callback_function = null, confirm_title = null, confirm_text = null, options = {}, custom_button = '') {
    let param = {
        type            : "confirm",
        text            : message,
        callBack        : callback_function,
        cancel_callBack : cancel_callback_function,
        confirm_text    : confirm_text,
        confirm_title   : confirm_title,
        customBtn       : custom_button
    };
    param = {...param, ...options};
    new mirMessage(param).show();
}

function prompt_message(message, callback_function, options = {}) {
    let param = {
        type            : "prompt",
        text            : message,
        callBack        : callback_function
    };
    param = {...param, ...options};
    new mirMessage(param).show();
}

/**
 * @author 2023-01-10 16:03:22 현규 
 * 
 * @category 알람메시지 출력용
 * 
 * @param {String} meesage
 */
function mirAlert(message) {
    new mirMessage({ text : message }).show();
}

// check Object
function isObject(value) {
    return (typeof value === 'object' && value !== null && !Array.isArray(value));
}

/**
 * @category 플랫피커에 닫기 버튼 구현 시, 필요한 코드
 * g 사용법은 S:\dev\assist\index.php에서 id = flatpickr_close_btn < 를 가진 요소를 플랫피커가 적용될 인풋 옆에 추가 하면 됩니다.
*/
function add_flatpickr_close_btn(e){

    e.stopPropagation();
    e.preventDefault();

    const target = e.currentTarget;

    if(target.classList.contains('flatpickr-input') && target.classList.contains('active')){

        const open_flatpickr = document.querySelector('.flatpickr-calendar.open');
        const close_btn_chk  = open_flatpickr.querySelector('#calendar_close_btn');
        if(!close_btn_chk){

            const close_btn = document.createElement('div');

            close_btn.textContent   = '닫기';
            close_btn.id            = 'calendar_close_btn';
            close_btn.className     = 'chand gfsM dfRound8p bg000 cw bg000 fs12px taCenter posRel flatpickr_close_btn';

            function close_flatpickr_func(){

                const target_wrap = target.closest('div');
                const close_func  = target_wrap.querySelector('#flatpickr_close_btn');
                close_func.click();
            }

            close_btn.addEventListener('click', () => {close_flatpickr_func()});
            
            open_flatpickr.insertAdjacentElement('beforeend', close_btn);

            open_flatpickr.style.width      = 'calc(' + open_flatpickr.offsetWidth + 'px + 2rem)';
            open_flatpickr.style.padding    = '1rem';
        }
    }
}

function mir_print(e, target) { // 인쇄할 타겟 클래스 or 아이디
    e.preventDefault();
    
    const initBody = document.body.innerHTML;

    const btn = e.currentTarget;
    const new_ez_adm_panel = btn.closest('.new_ez_adm_panel');
    const printNone         = document.querySelectorAll('.printNone');    // 출력안할 div 는 printNone 클래스 넣어주기
    const outlineBlack_All  = document.querySelectorAll('.outlineBlack'); // 용지 크기 미리보기용 보더
    const mir_print_All     = document.querySelectorAll('.mir_print');

    function _beforePrint() {
        // 인쇄 전(+인쇄미리보기) 필요없는 스타일들 제거
        new_ez_adm_panel.classList.add('disNone');
        printNone.forEach((el) => { el.classList.add('disNone') });
        outlineBlack_All.forEach((el) => { el.style.outline = 'initial'; });
        mir_print_All.forEach((el) => { el.style.marginBottom = '0'; });
        const targetElement = document.querySelector(target);
        document.body.innerHTML = targetElement.innerHTML;
        
    }

    function _afterPrint() {
        // 인쇄 후(+인쇄미리보기) 스타일 복구
        printNone.forEach((el) => { el.classList.remove('disNone') });
        outlineBlack_All.forEach((el) => { el.style.outline = '1px solid #000'; });
        mir_print_All.forEach((el) => { el.style.marginBottom = '10px'; });
        new_ez_adm_panel.classList.remove('disNone');
        document.body.innerHTML = initBody;
    }

    window.onbeforeprint = _beforePrint;
    window.onafterprint =  _afterPrint;
    window.print();
}

function splide_slider_toggle_play(e, Splide_item){

    e.stopPropagation();
    e.preventDefault();

    const target    = e.currentTarget;
    const toggle    = target.querySelector('.splide__toggle');
    const play_btn  = toggle.querySelector('.splide__toggle__play');
    const pause_btn = toggle.querySelector('.splide__toggle__pause');
    const auto_play = Splide_item.Components.Autoplay;

    if(play_btn.classList.contains('disNone')){

        play_btn.classList.remove('disNone');
        pause_btn.classList.add('disNone');
        auto_play.pause(99);
    } else {

        play_btn.classList.add('disNone');
        pause_btn.classList.remove('disNone');
        auto_play.play(99);
    }
}

/**
 * @category 코어앱 사이트맵 메뉴 토글
*/
function sitemap_child_toggle(e) {
    e.stopPropagation();

    const childWrap = e.currentTarget.closest('.mir_ca_mypage_table_kind').nextElementSibling;

    childWrap.classList.toggle('active');
}

/**
 * * 배열 순서변경
 * @param {Array}
 * @param {Number}
 * @param {toIndex}
 */
function move_array_value(arr, from_index, to_index) {
    const item = arr.splice(from_index, 1)[0];
    arr.splice(to_index, 0, item);
}

/**
 * * 배열에서 value찾아 지워주는 함수
 * @param {Array} arr 
 * @param {*} value 
 */
function remove_array_value(arr, value) {
    const index = arr.indexOf(value);
    if (index !== -1) arr.splice(index, 1);
}

/**
 * * 뉴이지 select active조절
 * @param {Event} e 
 */
function snez_select_option_click(e, callback = null) {
    const option = e.currentTarget;
    const { dataset: { value } } = option;
    const label_text = option.innerHTML;

    const select        = option.closest('.snez_select_data');
    const input         = select.querySelector('input[type="hidden"]');
    const label         = select.querySelector('.snez_select_text_data:not(.snez_select_option)');
    input.value         = value;

    if (!input.value) select.classList.remove('valid');
    $(label).html(label_text);

    triggerChange(input);

    if (typeof callback === 'function') callback(e);
}

function snez_accordian_select_option_click(e, callback) {

    const option = e.currentTarget;
    const { dataset: { value } } = option;
    
    if (option.classList.contains('active')) return;
    
    const select         = option.closest('.snez_select_data');
    const current_active = select.querySelector('.snez_accordian_select_item_data.active');
    
    if (current_active) current_active.classList.remove('active');

    option.classList.add('active');

    const input  = select.querySelector('input[type="hidden"]');
    input.value  = value;

    if (typeof callback === 'function') callback(e);
}

function snez_accordian_select_wrap_func(e) {

    const target    = e.currentTarget;
    const act       = target.dataset.act;
    const select    = target.closest('.snez_select_data');
    
    if (act == 'up') {
        
        const connect = select.dataset.connect; 
        if (connect != '') {

            const current_active = document.querySelector('.' + connect + '.snez_accordian_select_active');
            if (current_active) {

                const accordian = current_active.querySelector('.snez_accordian_data');
                accordian.click(); 
            }
        }

        select.classList.add('snez_accordian_select_active');
    }
    else select.classList.remove('snez_accordian_select_active');

}

/**
 * * snez select checkbox 클릭
 * @param {Event} e 
 * @param {Function} callback 
 */
function snez_select_checkbox_click(e, callback = null) {
    const current_target            = e.currentTarget;
    const input_wrap                = current_target.closest('.snez_select_option_list');
    const input_list                = input_wrap.querySelectorAll('.snez_select_option_checkbox');
    const not_checked_input_list    = input_wrap.querySelectorAll('.snez_select_option_checkbox:not(:checked)');
    const all_checkbox              = input_wrap.querySelector('.snez_select_option_checkbox[value="all"]');
    let checked_input_list          = input_wrap.querySelectorAll('.snez_select_option_checkbox:checked');
    
    if (not_checked_input_list.length == 1 && not_checked_input_list[0].value == 'all') {
        if (all_checkbox) all_checkbox.checked = true;
        checked_input_list = input_wrap.querySelectorAll('.snez_select_option_checkbox:checked');
    }

    if (input_list.length != checked_input_list.length) {
        if (all_checkbox) all_checkbox.checked = false;
        checked_input_list = input_wrap.querySelectorAll('.snez_select_option_checkbox:checked');
    }

    let select_label = '';
    let selected_count = 0;
    //* select label 변경
    if (checked_input_list.length > 0) {
        for (const input of checked_input_list) {
            const li = input.closest('li');
            const { label } = li.dataset;

            if (label.includes('전체')) {
                select_label = label;
                break;
            } else if (input.value == 'all') {
                select_label = '전체';
                break;
            } else {
                if (select_label) {
                    selected_count++;
                } else {
                    select_label = label;
                }
            }
        }

        if (selected_count > 0) select_label += `외 ${selected_count}개`;
    } else {
        select_label = '선택';
    }
    const snez_select   = e.currentTarget.closest('.snez_select_data');
    const label_el      = snez_select.querySelector('.snez_select_text_data');

    label_el.textContent = select_label;
    if (select_label == '선택') {
        snez_select.classList.remove('valid');
    } else {
        snez_select.classList.add('valid');
    }

    if (typeof callback === 'function') callback();
}

/**
 * * 뉴이지 select 전체 선택
 */
function snez_select_all_option_click(e) {
    const option = e.currentTarget;
    // const { dataset: { value } } = option;
    const label_text = option.dataset.label;

    option_list_wrap    = option.closest(".snez_select_option_list");
    option_list         = option_list_wrap.querySelectorAll("li");

    const select        = option.closest('.snez_select_data');
    const input         = select.querySelector('input[type="hidden"]');
    const label         = select.querySelector('.snez_select_text_data:not(.snez_select_option)');

    const all_selected = option_list[0].querySelector("input").checked;
    option_list.forEach((el) => {
        el.querySelector("input").checked = all_selected;
    });

    // input.value         = value;
    $(label).html(label_text);

    triggerChange(input);
}

/**
 * * 뉴이지 select 외부 이벤트로 select value가 변경되었을경우 label 변경
 * @param {Event} e
 */
function change_snez_select_label(e) {
    const input = e.currentTarget;
    const value = input.value;

    if (value) {
        const select_wrap   = input.closest('.snez_select_data');
        const option        = select_wrap.querySelector(`.snez_select_option[data-value="${value}"]`);
        const option_label  = option.innerHTML;
        const label         = select_wrap.querySelector('.snez_select_text_data:not(.snez_select_option)');

        select_wrap.classList.add('valid');

        $(label).html(option_label);
    }
}

/**
 * * snez_search_input result_wrap 에 결과값 자동으로 넣어주는 함수
 * @param {Event} e
 * @param {Function} callback 
 */
async function display_snez_result(e, callback) {
    if (typeof callback !== 'function') return;

    try {
        const result_data   = await callback();
        const wrap          = e.currentTarget.closest('.snez_search_input_wrap');
        const result_wrap   = wrap.querySelector('.snez_search_result_wrap');

        $(result_wrap).html('');
        if (result_data.length == 0) {
            const item          = document.createElement('div');
            item.className      = 'snez_search_result_item no_item';
            item.textContent    = '입력값에 대한 겸색 결과가 없습니다.';

            result_wrap.appendChild(item);
        } else {
            for (const data of result_data) {
                const item = build_snez_result_item(data);
    
                result_wrap.appendChild(item);
            }
        }

        //* 결과창 닫는부분은 callback에서 처리해줘야합니다.
        result_wrap.classList.remove('disNone');
    } catch (err) {
        error_message(err);
    }
}

/**
 * * snez_search_input 결과 item 만들어주는 함수
 * @param {Object} data 
 * @param {String} data.value
 * @param {String} data.label
 * @param {Function} data.event
 * @returns {HTMLElement} item
 */
function build_snez_result_item(data) {
    const item          = document.createElement('div');
    item.className      = 'snez_search_result_item';
    item.textContent    = data.label;
    item.dataset.value  = data.value;
    item.addEventListener('click', data.event);

    return item;
}

//! display_snez_result 사용예시             
// async function display_snez_result_test() {
//     return new Promise((res, rej) => {
//         if (true) { // ajax 요청 성공
//             res([
//                 {
//                     value: '1',
//                     label: '일',
//                     event: onclick_display_snez_result_test
//                 }
//             ]);
//         } else { // ajax 요청 실패
//             rej('에러 메세지');
//         }

//         //* example
//         // ajax_request(ajax_core, 'POST', test, {}, (status, data) => {
//         //     if (status == 200) {
//         //         res();
//         //         return;
//         //     }

//         //     rej(data.message);
//         // });
//     });
// }
// function onclick_display_snez_result_test(e) {
//     console.log(e.currentTarget.dataset.value);
// }

/**
 * * snez counter 버튼클릭시 숫자증감
 */
var count_timer;
$(document).on('click', '.snez_count_btn', function(e) {
    clearTimeout(count_timer);

    const btn = e.currentTarget;
    count_timer = setTimeout(() => {
        const { mode }  = btn.dataset;
        const input     = btn.parentElement.querySelector('input[type="number"]');
        const number    = Number(input.value);

        const min = input.min;
        const max = input.max;
    
        if (mode == 'plus') {
            input.value = number + 1;

            if (max && number + 1 < max) {
                input.value = number;
            } else {
                input.value = number + 1;
            }
        } else {
            if (min && number - 1 < min) {
                input.value = number;
            } else {
                input.value = number - 1;
            }
        }

        triggerChange(input);
    }, 100);
});

function on_clinic_time_widget_night_using_select(e) {
    const current_target    = e.currentTarget;
    const day_select_wrap   = document.querySelector("#ez_clinic_time_night_time_detail_check");

    if(current_target.dataset.value == 'detail') {
        day_select_wrap.classList.remove("disNone");
        day_select_wrap.classList.add("disFlex");
    } else {
        day_select_wrap.classList.remove("disFlex");
        day_select_wrap.classList.add("disNone");
    }
}

function on_clinic_time_widget_no_lunch_using_select(e) {
    const current_target    = e.currentTarget;
    const day_select_wrap   = document.querySelector("#ez_clinic_time_no_lunch_detail_check");

    if(current_target.dataset.value == 'detail') {
        day_select_wrap.classList.remove("disNone");
        day_select_wrap.classList.add("disFlex");
    } else {
        day_select_wrap.classList.remove("disFlex");
        day_select_wrap.classList.add("disNone");
    }
}

function snez_sub_menu_drop_down_toggle(e) {

    const target        = e.currentTarget;
    const target_wrap   = target.closest('.snez_sub_menu_kind_data');
    const active_wrap   = document.querySelector(".snez_sub_menu_kind_data.active");

    target_wrap.classList.toggle('active');
    
    if(active_wrap && active_wrap != target_wrap) active_wrap.classList.remove('active');
}

function snez_tab_toggle(e, active_target, target_list, callback = '') {

    const tab           = e.currentTarget;
    const wrap          = tab.closest('.snez_tab_wrap_data');
    const current_tab   = wrap.querySelector('.snez_tab_item_data.active');

    if(tab.classList.contains('active')) return;
    
    tab.classList.add('active');
    if (current_tab) current_tab.classList.remove('active');

    if (target_list) {

        const list          = document.querySelector(`.${target_list}.${active_target}`);
        const current_list  = document.querySelector(`.${target_list}.active`);
    
        list.classList.add('active');
        current_list.classList.remove('active');
    }

    if(callback) callback(e);
}

//* 사이트맵 선택 기능에서 하위 메뉴 일괄 선택 기능
function mir_activate_submenu_on_sitemap_func(e) {
    
    const target = e.currentTarget;

    function _mir_activate_submenu_on_sitemap_func() {

        const current_list_wrap = target.closest('.mir_ca_menu_list_data');
        const depth             = Number(current_list_wrap.dataset.depth);
        const depth_wrap        = current_list_wrap.closest('.custom_menu_d' + depth + '_wrap');
        const child_list        = depth_wrap.querySelectorAll('.mir_ca_mypage_table_child_list');
        child_list.forEach(el => {

            if(!el.classList.contains('active')) el.classList.add('active');
        });

        const activate_btn = depth_wrap.querySelectorAll('.mir_sitemap_menu_activate_btn_data');
        activate_btn.forEach(el => {

            const activate_chk = el.querySelector('.material-icons').textContent;
            if(activate_chk != 'visibility') el.click();
        });
    }

    confirm_message('본 메뉴와 하위 메뉴 전체를 활성화 하시겠습니까?', _mir_activate_submenu_on_sitemap_func);
}

/**
 * * 사이트맵 숨김 메뉴 활성/비활성화 기능
 * @String id : 활성 / 비활성을 설정하는 데이터셋을 가진 개체 아이디
*/
function mir_sitemap_hidden_menu_activate(id) {

    const target    = document.getElementById(id);
    const menu_act  = target.dataset.menu_act;
    const list_data = document.querySelectorAll(".mir_ca_menu_list_data");

    if(menu_act == "true") {

        target.dataset.menu_act = "false";
    } else {

        target.dataset.menu_act = "true";
    }

    list_data.forEach(el => {

        const grant     = el.dataset.grant;
        const parent    = el.parentElement;
        if(grant == "비활성"){

            if(menu_act == "true") {
    
                parent.classList.add('disNone');
            } else {
                
                parent.classList.remove('disNone');
            }
        }
    });
}

function snez_tab_scroll(e, scroll_target, target_list) {

    const line = document.querySelector(`.${target_list}.${scroll_target}`);
    line.scrollIntoView({ block: "start", behavior: "smooth" });

    // line.classList.add("mds_highlight_el");
    // setTimeout(() => {
    //     line.classList.remove("mds_highlight_el");
    // }, 3000);
}

/**
 * * snez select 다른곳 클릭시 닫기
 * @param {Event} e
 */
var snez_select_prev_target;
function snez_active_removal_click_another_area(e) {

    const target = e.currentTarget;

    if(
        snez_select_prev_target
        && target != snez_select_prev_target
    ) {

        snez_select_prev_target.classList.remove('active');
        snez_select_prev_target = target;
        return;
    }
    
    function _active_removal_click_another_area_func(ev) {

        const click_target      = ev.currentTarget;
        const is_click_inside   = target.contains(click_target);

        if(!is_click_inside || click_target != target) {

            target.classList.remove('active');
            snez_select_prev_target.classList.remove('active');
        }
    }

    document.addEventListener('click', _active_removal_click_another_area_func);

    snez_select_prev_target = target;
}

/**
 * * 돈 표시 인풋 값 세자리수마다 , 표시
 */
$(document).on('blur', '.snez_input[data-input_type="money"]', function(e) {
    const input = e.currentTarget;
    const { value } = input;

    let num_format = value;
    if (num_format.charAt(0) == '0') num_format = num_format.replace(/^./, ''); // 맨앞 0 제거

    num_format  = num_format.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    input.value = num_format;
});

/**
 * * html element 깊은 복사
*/
function deep_copy_html_el(el) {

    if(el instanceof HTMLElement) {
    
        const el_copy = document.createElement(el.tagName);

        //g 속성 복사
        for (let i = 0; i < el.attributes.length; i++) {

            const attr = el.attributes[i];

            el_copy.setAttribute(attr.name, attr.value);
        }

        //g 자식 요소들 복사
        for (let i = 0; i < el.childNodes.length; i++) {

            const child_copy = deep_copy_html_el(el.childNodes[i]);

            el_copy.appendChild(child_copy);
        }

        return el_copy;

    } else if(el instanceof Text) {

        return document.createTextNode(el.nodeValue);
    }
}

/**
* @author 2024-02-05 ss
* @category snez_toggle 함수 onchange 할때 사용
*/
function snez_toggle(e) {
    var target = e.currentTarget;
    
    if(target.checked) {
        target.value = "Y";
    }
    else {
        target.value = "";
    }
}

/**
 * * 인풋 format 조절
 * @param {Number} val 
 * @param {Boolean} isMinus 
 * @param {Boolean} isFloat 
 * @param {Boolean} isComma 
 * @returns 
 */
function input_number_format(val, isMinus, isFloat, isComma, isZero) {
    var str = val;
    //일단 마이너스, 소수점을 제외한 문자열 모두 제거
    str = str.replace(/[^-\.0-9]/g, '');
    
    if (!isZero && Number(val) === 0) str = '';

    //마이너스
    if (isMinus){
        str = chgMinusFormat(str);   
    } else {
        str = str.replace('-','');
    }
    
    //소수점
    if (isFloat ){
        str = chgFloatFormat(str);       
    } else {
        if (!isMinus ) {
            str = str.replace('-','');
        }

        str = str.replace('.','');

        if (str.length>1) {
            str = Math.floor(str);
            str = String(str);
        }
    }
    
    //콤마처리
    if(isComma){
        var parts = str.toString().split('.');
        if(str.substring(str.length - 1, str.length)=='.'){
            str = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,",") +".";
        } else {
            str = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,",") + (parts[1] ? "." + parts[1] : "");
        }
    }

    return str;
}

function chgFloatFormat(str){
    var idx = str.indexOf('.');  
    if(idx<0){  
        return str;
    } else if(idx>0){
        var tmpStr = str.substr(idx+1);    
    if(tmpStr.length>1){             
        if(tmpStr.indexOf('.')>=0){        
            tmpStr =  tmpStr.replace(/[^\d]+/g, '');                  
            str = str.substr(0,idx+1) + tmpStr;
        }
    }    
    } else if(idx==0){
        str = '0'+str;
    }
    return str;  
}
    
function chgMinusFormat(str) {
    var idx = str.indexOf('-');
    if (idx == 0) {
    var tmpStr = str.substr(idx+1);
        //뒤에 마이너스가 또 있는지 확인
        if(tmpStr.indexOf('-')>=0){
            tmpStr = tmpStr.replace('-','');
            str = str.substr(0,idx+1) + tmpStr;  
        }
    } else if (idx > 0) {
        str = str.replace('-','');
    } else if (idx < 0) {
        return str;
    }

    return str;
}

/**
 * * 표준명 표기 toggle
 * @param {Event} e
 * @param {String} type
 */
function base_title_toggle(e, type) {
    const checkbox      = e.currentTarget;
    const display       = checkbox.checked;
    const child_wrap    = checkbox.closest('.crm_list_child_wrap');
    const items         = child_wrap 
                        ? child_wrap.querySelectorAll(`.crm_list_item[data-type="${type}"]`) 
                        : document.querySelectorAll(`.crm_list_item[data-type="${type}"]`);

    if (display) {
        for (const item of items) {
            item.classList.add('base_title');
        }
    } else {
        for (const item of items) {
            item.classList.remove('base_title');
        }
    }
}

var alert_cnt = 0;
var tab_title = document.title;
function update_browser_tab_title(set_cnt=-1) {
    if(set_cnt!==-1) alert_cnt = set_cnt;
    else alert_cnt++;

    if(alert_cnt === 0) var new_tab_title = `${tab_title}`;
    else var new_tab_title = `(${alert_cnt}) ${tab_title}`;
    document.title = new_tab_title;
}

function snez_select_multi_checkbox_click(e) {
    const checkbox      = e.currentTarget;
    const is_checked    = checkbox.querySelector("input[type=checkbox]").checked;
    var { dataset: { value } } = checkbox;
    const parent_select         = checkbox.parentElement.parentElement.parentElement;
    const selected_items_input  = parent_select.querySelector(".snez_select_hidden_input");
    const select_label          = parent_select.querySelector("span.snez_select_text_data");
    const select_all_wrap       = parent_select.querySelector(".snez_checkbox_wrap");
    const select_all_input      = select_all_wrap.querySelector("input[type=checkbox]");
    const select_all_text       = select_all_wrap.querySelector(".snez_multi_select_all_checkbox_span").innerText;
    var selected_items          = JSON.parse(selected_items_input.value);
    const label_list            = JSON.parse(selected_items_input.dataset.label_list);
    const value_list            = JSON.parse(selected_items_input.dataset.value_list);

    if(is_checked) {
        selected_items.push(value);
    } else {
        var index = selected_items.indexOf(value);
        if (index !== -1) {
            selected_items.splice(index, 1);
        }
    }

    var select_text = "선택해주세요";
    if(selected_items.length > 0) {
        select_cnt = selected_items.length;
        first_label = label_list[value_list.indexOf(selected_items[0])];

        if(value_list.length == select_cnt) {
            select_text = select_all_text;
            select_all_input.checked = true;
        } else if(selected_items.length === 1) {
            select_text = `${first_label}`;
            select_all_input.checked = false;
        } else if(selected_items.length > 1) {
            select_text = `${first_label} 외 ${selected_items.length - 1}개`;
            select_all_input.checked = false;
        }
    }

    selected_items = JSON.stringify(selected_items);

    selected_items_input.value = selected_items;
    select_label.innerText = select_text;
}

function snez_select_multi_select_all(e) {
    const all_checkbox_wrap     = e.currentTarget;
    const all_checkbox          = all_checkbox_wrap.querySelector("input[type=checkbox]");
    const select_all_text       = all_checkbox_wrap.querySelector(".snez_multi_select_all_checkbox_span").innerText;
    const parent_wrap           = all_checkbox_wrap.parentElement.parentElement.parentElement;
    const selected_items_input  = parent_wrap.querySelector(".snez_select_hidden_input");
    const select_label          = parent_wrap.querySelector("span.snez_select_text_data");
    const checkbox_wrap         = document.querySelector("#snez_multi_select_checkbox_list_wrap");
    const checkbox_list         = checkbox_wrap.querySelectorAll(".snez_checkbox_wrap");
    const all_checked           = all_checkbox.checked;
    var selected_items          = [];

    var select_text = "선택해주세요";
    checkbox_list.forEach((checkbox) => {
        const input = checkbox.querySelector("input[type=checkbox]");
        var { dataset: { value } } = checkbox;

        if(all_checked) {
            input.checked = true;
            selected_items.push(value);
            select_text = select_all_text;
        }
        else input.checked = false;
    });

    selected_items = JSON.stringify(selected_items);

    selected_items_input.value = selected_items;
    select_label.innerText = select_text;
}

function snez_multi_pagination_select(e, wrap_id="snez_multi_select_checkbox_list_wrap", search_id="snez_multi_checkbox_search_input") {
    const current_pagination    = e.currentTarget;
    const current_page          = parseInt(current_pagination.innerText);
    const pagination_wrap       = current_pagination.parentElement;
    const pagination_list       = pagination_wrap.querySelectorAll(".snez_multi_select_pagination");
    const pagination_limit      = current_page * 5;
    const pagination_limit_end  = (current_page - 1) * 5;
    const parent_wrap           = pagination_wrap.parentElement.parentElement.parentElement;
    const checkbox_wrap         = parent_wrap.querySelector("#" + wrap_id);
    const checkbox_list         = checkbox_wrap.querySelectorAll(".snez_checkbox_wrap");
    const search_input          = document.querySelector("#" + search_id);
    const search_word           = search_input.value;

    pagination_list.forEach((el, idx) => {
        if(el === current_pagination) el.classList.add("active");
        else el.classList.remove("active");
    });

    var match_cnt = 0;
    checkbox_list.forEach((el, idx) => {
        const input = el.querySelector("input[type=checkbox]");

        if(input.dataset.page == 'all') return;

        if(search_word == '') {
            if(input.dataset.page == current_page) el.classList.remove("disNone");
            else el.classList.add("disNone");
        } else {
            const checkbox_label    = el.querySelector("label span.snez_normal_gray_text");
            const label             = checkbox_label.innerText;

            if(label.includes(search_word)) {
                
                if(match_cnt >= pagination_limit || match_cnt < pagination_limit_end) {
                    el.classList.add("disNone");
                }
                else el.classList.remove("disNone");

                match_cnt++;
            } else el.classList.add("disNone");
        }
    });
}

function snez_search_pagination_select(e, limit) {
    e.preventDefault();
    e.stopPropagation();

    const current_pagination    = e.currentTarget;
    const current_page          = current_pagination.dataset.page;
    const pagination_wrap       = current_pagination.parentElement;
    const prev_pagination       = pagination_wrap.querySelector('.snez_multi_select_pagination.active');
    const pagination_limit      = current_page * limit;
    const pagination_limit_end  = (current_page - 1) * limit;
    const parent_wrap           = pagination_wrap.closest('.snez_select_data');
    const select_wrap           = parent_wrap.querySelector("#snez_select_option_list");
    const select_list           = select_wrap.querySelectorAll(".snez_select_option");
    const search_input          = parent_wrap.querySelector("#snez_dom_select_search_hid_data");
    const search_word           = search_input.value;

    if (prev_pagination) prev_pagination.classList.remove('active');
    current_pagination.classList.add('active');

    let match_cnt = 0;
    select_list.forEach((el, idx) => {

        const el_page = el.dataset.page;

        if(search_word == '') {

            if(el_page == current_page) el.classList.remove("disNone");
            else el.classList.add("disNone");

        } else {

            const label = el.textContent;

            if(label.includes(search_word)) {
                
                if(match_cnt >= pagination_limit || match_cnt < pagination_limit_end) el.classList.add("disNone");
                else el.classList.remove("disNone");

                match_cnt++;

            } else el.classList.add("disNone");
        }
    });
}

function snez_search_dom_select(e, limit, page_limit) {
    const current_target        = e.currentTarget;
    const select_wrap           = current_target.closest(".snez_select_data");
    const search_el             = select_wrap.querySelector("#snez_dom_select_search_input");
    const search_word           = search_el.value;
    const search_input          = select_wrap.querySelector("#snez_dom_select_search_hid_data");
    const select_list_wrap      = select_wrap.querySelector("#snez_select_option_list");
    const select_list           = select_list_wrap.querySelectorAll(".snez_select_option");
    const no_result             = select_list_wrap.querySelector("#snez_select_no_result");
    const pagination_wrap       = select_wrap.querySelector("#snez_multi_select_pagination_wrap");
    const pagination_inner_wrap = pagination_wrap.querySelector("ul.snez_multi_select_pagination_wrap");
    const pagination_list       = pagination_inner_wrap.querySelectorAll(".snez_multi_select_pagination_data");
    const pagination_limit      = limit;
    const prev_pagination       = pagination_wrap.querySelector('.snez_multi_select_pagination.active');
    const list_cnt_el           = select_wrap.querySelector('#snez_select_list_cnt_hid_data');

    if (prev_pagination) prev_pagination.classList.remove('active');
    pagination_list[0].classList.add("active");

    search_input.value = search_word;

    let match_cnt = 0;
    select_list.forEach((el, idx) => {

        const label = el.textContent;

        if(label.includes(search_word)) {

            if(match_cnt >= pagination_limit) el.classList.add("disNone"); 
            else el.classList.remove("disNone");

            match_cnt++;

        } else el.classList.add("disNone");
    });

    if(match_cnt === 0) no_result.classList.remove("disNone");
    else {

        no_result.classList.add("disNone");

        const page_cnt = Math.ceil(match_cnt / limit);

        pagination_list.forEach((el, idx) => {
            
            const page = idx + 1;

            if (page > page_limit || page > page_cnt) el.classList.add('disNone');
            else el.classList.remove('disNone'); 
        });
    }

    list_cnt_el.value = match_cnt;
}

function snez_search_dom_select_arrow_func(e, limit, page_limit) {
    e.preventDefault();
    e.stopPropagation();

    const current_target        = e.currentTarget;
    const pos                   = current_target.dataset.pos;
    const select_wrap           = current_target.closest(".snez_select_data");
    const pagination_wrap       = select_wrap.querySelector("#snez_multi_select_pagination_wrap");
    const pagination_inner_wrap = pagination_wrap.querySelector("ul.snez_multi_select_pagination_wrap");
    const pagination_list       = pagination_inner_wrap.querySelectorAll(".snez_multi_select_pagination_data");
    const prev_pagination       = pagination_wrap.querySelector('.snez_multi_select_pagination.active');
    const prev_page             = prev_pagination.dataset.page;
    const list_cnt_el           = select_wrap.querySelector('#snez_select_list_cnt_hid_data');
    const list_cnt              = list_cnt_el.value;
    const page_cnt              = Math.ceil(list_cnt / limit);

    if (prev_pagination) prev_pagination.classList.remove('active');

    let next_page;
    if (pos == 'next') {

        if (prev_page == page_cnt) {

            prev_pagination.classList.add('active');
            return;
        }

        next_page = Number(prev_page) + 1;

    } else {

        if (prev_page == 1) {

            prev_pagination.classList.add('active');
            return;
        }

        next_page = Number(prev_page) - 1;
    }

    if (!next_page) return;

    const next_pagination = pagination_wrap.querySelector(`.snez_multi_select_pagination[data-page="${next_page}"]`);
    const page_active_idx = Math.ceil(next_page / page_limit);

    pagination_list.forEach(el => {

        const el_page       = el.dataset.page;
        const el_active_idx = Math.ceil(el_page / page_limit);

        if (el_active_idx == page_active_idx && page_cnt >= el_page) el.classList.remove('disNone');
        else el.classList.add('disNone');
    });

    next_pagination.click();
}

function snez_multi_search(e) {
    const current_target        = e.currentTarget;
    const multi_select_wrap     = document.querySelector(".snez_multi_select.active");
    const search_input          = multi_select_wrap.querySelector("#snez_multi_checkbox_search_input");
    const search_word           = search_input.value;
    const checkbox_list_wrap    = multi_select_wrap.querySelector("#snez_multi_select_checkbox_list_wrap");
    const checkbox_list         = checkbox_list_wrap.querySelectorAll(".snez_checkbox_wrap");
    const no_result             = checkbox_list_wrap.querySelector("#snez_multi_no_result");
    const pagination_wrap       = multi_select_wrap.querySelector("#snez_multi_select_pagination_wrap");
    const pagination_inner_wrap = pagination_wrap.querySelector("ul.snez_multi_select_pagination_wrap");
    const pagination_list       = pagination_inner_wrap.querySelectorAll(".snez_multi_select_pagination");
    const pagination_limit      = 5;

    pagination_list.forEach((el, idx) => {
        if(idx === 1) el.classList.add("active");
        else el.classList.remove("active");
    });

    var match_cnt = 0;
    checkbox_list.forEach((el, idx) => {
        const checkbox_label    = el.querySelector("label span.snez_normal_gray_text");
        const label             = checkbox_label.innerText;

        if(label.includes(search_word)) {
            if(match_cnt >= pagination_limit) {
                el.classList.add("disNone");
            }
            else  el.classList.remove("disNone");

            match_cnt++;

        } else el.classList.add("disNone");
    });

    if(match_cnt === 0) {
        no_result.classList.remove("disNone");
    } else {
        no_result.classList.add("disNone");
    }
}

function snez_two_depth_multi_search(e) {
    const multi_select_two_depth_wrap   = document.querySelector(".snez_multi_select_two_depth.active");
    const search_input                  = multi_select_two_depth_wrap.querySelector("#snez_two_depth_checkbox_search_input");
    const search_word                   = search_input.value;
    const first_checkbox_list_wrap      = multi_select_two_depth_wrap.querySelector("#snez_two_depth_first_depth_wrap");
    const second_checkbox_list_wrap     = multi_select_two_depth_wrap.querySelector("#snez_two_depth_second_depth_wrap");
    const first_checkbox_list           = first_checkbox_list_wrap.querySelectorAll(".snez_checkbox_wrap");
    const second_checkbox_list          = second_checkbox_list_wrap.querySelectorAll(".snez_checkbox_wrap");
    const first_no_result               = first_checkbox_list_wrap.querySelector("#snez_two_depth_first_depth_no_result");
    const second_no_result              = second_checkbox_list_wrap.querySelector("#snez_two_depth_second_depth_no_result");
    const first_pagination_wrap         = multi_select_two_depth_wrap.querySelector("#snez_multi_two_depth_first_pagination_wrap");
    const first_pagination_list         = first_pagination_wrap.querySelectorAll(".snez_multi_select_pagination");
    const second_pagination_wrap        = multi_select_two_depth_wrap.querySelector("#snez_multi_two_depth_second_pagination_wrap");
    const second_pagination_list        = second_pagination_wrap.querySelectorAll(".snez_multi_select_pagination");
    const pagination_limit              = 10;

    first_pagination_list.forEach((el, idx) => {
        if(idx === 1) el.classList.add("active");
        else el.classList.remove("active");
    });

    second_pagination_list.forEach((el, idx) => {
        if(idx === 1) el.classList.add("active");
        else el.classList.remove("active");
    });

    var first_match_cnt = 0;
    first_checkbox_list.forEach((el, idx) => {
        if(el.querySelector(".snez_input[type=checkbox]").dataset.page=='all') {
            return;
        }

        const checkbox_label    = el.querySelector("label span.snez_normal_gray_text");
        const label             = checkbox_label.innerText;

        if(label.includes(search_word)) {
            if(first_match_cnt >= pagination_limit) {
                el.classList.add("disNone");
            }
            else  el.classList.remove("disNone");

            first_match_cnt++;

        } else el.classList.add("disNone");
    });

    var second_match_cnt = 0;
    second_checkbox_list.forEach((el, idx) => {
        const checkbox_label    = el.querySelector("label span.snez_normal_gray_text");
        const label             = checkbox_label.innerText;

        if(label.includes(search_word)) {
            if(second_match_cnt >= pagination_limit) {
                el.classList.add("disNone");
            }
            else  el.classList.remove("disNone");

            second_match_cnt++;

        } else el.classList.add("disNone");
    });

    if(first_match_cnt === 0) {
        first_no_result.classList.remove("disNone");
    } else {
        first_no_result.classList.add("disNone");
    }

    if(second_match_cnt === 0) {
        second_no_result.classList.remove("disNone");
    } else {
        second_no_result.classList.add("disNone");
    }
}

/**
 * @author 2023-06-01 성수
 * @category 범용 sub menu drop down toggle
 * @param This event : this
 */
function mir_ca_common_sub_menu_drop_down_toggle(event) {
    var drop_down = document.querySelectorAll(".mir_ca_common_sub_menu_kind_drop_down_wrap");
    var drop_down_cnt = drop_down.length;

    if (event != null) {
        for (var i = 0; i < drop_down_cnt; i++) {
            var parent = drop_down[i].parentElement;

            if (event.parentElement == parent) {
                mir_ca_toggle(event.parentElement);
            }
            else if (parent.classList.contains("active")) {
                parent.classList.remove("active");
            }
        }
    }
    else {
        for (var i = 0; i < drop_down_cnt; i++) {
            var parent = drop_down[i].parentElement;

            parent.classList.remove("active");
        }
    }
}

/**
 * @author 2023-01-31 성수
 * @category 범용 toggle
 * @param String target : id 로 active 할떄
 * @param Object target : this, event 로 active 할떄
 * @param Boolean state : null, undefined = active toggle, true = active 추가, false = active 삭제
 */
function mir_ca_toggle(target, state = null) {
    var type = typeof (target);

    if (type == "string" || type == "object") {
        var doc = null;

        if (type == "string") {
            doc = document.getElementById(target);
        }
        else if (type == "object") {
            doc = target;
        }

        if (doc) {

            if (state == null || state == "undefined") {
                doc.classList.toggle("active");
            }
            else if (state) {
                doc.classList.add("active");
            }
            else {
                doc.classList.remove("active");
            }
        }
    }
    else {
        mir_ca_error_print("toggle error");
    }
}

/**
 * @author 2023-07-14 성수
 * @category 범용 modal 닫기
 * @param This event : this
 */
function mir_ca_common_modal_close(event) {
    event.closest(".mir_ca_common_modal_wrap").remove();
}

/**
 * @author 2024-05-03 15:44:41 지수
 * @category form 없이 input name으로 데이터 형식 만들기
 * @param Array data
*/
function make_mir_input_serialize(input_datas) {

    if (1 > input_datas.length) return;

    let data = {};
    input_datas.forEach(el => {

        const name  = el.name;
        const value = el.value;

        const keys = name.match(/[\w\d]+/g);
        
        let temp = data;
        for (var i = 0; i < keys.length - 1; i++) {

            const key   = keys[i];
            temp[key]   = temp[key] || {};
            temp        = temp[key];
        }

        temp[keys[keys.length - 1]] = value;
    });

    return data;
}

/**
 * @author 2024-06-13 14:02:11 지수
 * @category 특정 스크립트 로딩 후 실행 되어야 하는 기능이 있을 경우 사용
*/
function mir_load_script(src, opt = {},  callback = '') {

    var check_script = document.querySelector('script[src="' + src + '"]');
    if (check_script) {
        
        callback();
        return false;
    }

    const script    = document.createElement('script');
    script.src      = src;
    script.onload   = callback;
    
    if (opt.defer == true) script.defer = true;

    document.head.appendChild(script);
}

//* 위아래 아코디언
function snez_upNdown_accordian_func(e, id, type = 'up', callBack = '') {

    e.preventDefault();
    e.stopPropagation();

    const target        = e.currentTarget ? e.currentTarget : e.target;
    const act           = target.dataset.act;
    const fix_height    = target.dataset.fix_height;
    const transition    = target.dataset.tr;
    const acd_item      = document.getElementById(id);
    
    if (!acd_item.style.transition) {

        acd_item.style.transition = transition + 's';
    }

    if (fix_height != '') {

        const fix_height_target = document.getElementById(fix_height);

        fix_height_target.style.display = 'block';

        if (act != 'down') {

            fix_height_target.style.display = 'none';
        }
    }

    let pos;
    if (type == 'up') {

        if (act == 'up') {
    
            acd_item.classList.add('snez_up_accordian_style');
            pos = 'down';
    
        } else {
    
            acd_item.classList.remove('snez_up_accordian_style');
            pos = 'up';
        }

    } else {

        if (act == 'right') {
    
            acd_item.classList.add('snez_right_accordian_style');
            pos = 'left';

        } else {
    
            acd_item.classList.remove('snez_right_accordian_style');
            pos = 'right';
        }
    }

    if (target.textContent.includes('keyboard_arrow_')) target.textContent = 'keyboard_arrow_' + pos;
    else target.classList.toggle('active');
    target.dataset.act = pos;

    if (callBack) callBack(e);
}

function mir_format_rrn(rrn) {
    //* rrn = resident registration number
    rrn = rrn.replace(/\D/g, '');
    rrn = rrn.replace(/(\d{6})(\d{1,7})?/, '$1-$2');

    if (rrn.length > 14) rrn = rrn.slice(0, -1);

    return rrn;
}

function mir_input_num_format_type(e, type) {

    const target    = e.currentTarget;
    const value     = target.value;

    let format;
    if (type == 'rrn') {

        format = mir_format_rrn(value);

    } else if (type == 'phn') {

        format = mir_format_phn(value);
    }


    target.value = format; 
}

function mir_format_phn(phn) {
    //* phn = phone number
    phn = phn.replace(/\D/g, '');

    if (phn.length <= 7 && phn.length > 3) phn = phn.replace(/(\d{3})(\d{1,4})?/, '$1-$2');
    else if (phn.length > 7) phn = phn.replace(/(\d{3})(\d{1,4})(\d{1,4})?/, '$1-$2-$3');

    if (phn.length > 13) phn = phn.slice(0, -1);

    return phn;
}

function input_min_max_limit_check(e, target_id, type) {
    const current_target    = e.currentTarget;
    const limit_target      = document.querySelector("#" + target_id);

    const current_value = current_target.value;
    const limit_value   = limit_target.value;
    

    if(type == 'max') {
        limit_target.max = current_value;

        if(!limit_value || !current_value) return;
        if(limit_value && current_value < limit_value) return error_message('입력값이 최소값보다 작을 수 없습니다');
    } else {
        limit_target.min = current_value;

        if(!limit_value || !current_value) return;
        if(limit_value && current_value > limit_value) return error_message('입력값이 최대값보다 클 수 없습니다');
    }
}

function crm_loading_toggle(use_bg = true, loading_wrap_id = "crm_page_loading_box_wrap") {
    const loading_wrap  = document.querySelector("#" + loading_wrap_id);
    if (use_bg) var loading_box = loading_wrap?.querySelector('.mir_loading_box');
    const bg_wrap = loading_wrap?.querySelector('.loading_bg');

    loading_box?.classList.toggle('disNone');
    if (use_bg) bg_wrap?.classList.toggle('disNone');
}

var check_input_text_value_time;
function check_input_text_value(e, callback = '') {

    const target = e.currentTarget;
    const value  = target.value;

    clearTimeout(check_input_text_value_time);
    check_input_text_value_time = setTimeout(() => {

        if (value != '') target.classList.remove('empty');
        else target.classList.add('empty');

        if (callback) callback(e);
    }, 100);
}

function snez_drop_down_func(e) {

    const target = e.currentTarget;

    if (target.classList.contains('active')) {

        target.classList.remove('active');

    } else {

        target.classList.add('active');
    }
}

function download_media(url, file_name) {
    var link = document.createElement('a');
    link.href = url;
    link.download = file_name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function create_short_url(url) {
    const send_data = {
        url
    };

    ajax_request(new_ez_ajax_core, 'POST', create_short_url_req, send_data, (status, data) => {
        if(status == 200) {
            const short_link = data.url;

            const input     = document.createElement("input");
        
            document.body.appendChild(input);
            input.value = short_link;
            input.select();
            document.execCommand("copy");
            document.body.removeChild(input);
            
            success_message("주소가 복사 되었습니다.");
            return;
        }

        error_message(data.message);
    });
}

function snez_select_first_depth_checkbox_click(e) {
    const current_target    = e.currentTarget;
    const current_input     = current_target.querySelector("input[type=checkbox]");
    const snez_two_depth_first_depth_wrap   = document.querySelector("#snez_two_depth_first_depth_wrap");
    const first_depth_checkbox_list         = snez_two_depth_first_depth_wrap.querySelectorAll(".snez_checkbox_wrap");
    const snez_two_depth_second_depth_wrap  = document.querySelector("#snez_two_depth_second_depth_wrap");
    const second_depth_checkbox_list        = snez_two_depth_second_depth_wrap.querySelectorAll(".snez_checkbox_wrap");

    const first_depth_all_checkbox = first_depth_checkbox_list[0].querySelector("input");
    const target_list = JSON.parse(current_input.dataset.target_list);

    first_depth_all_checkbox.checked = false;
    second_depth_checkbox_list.forEach((el) => {
        const value = parseInt(el.dataset.value);

        if(target_list.includes(value)) el.classList.remove("disNone");
        else el.classList.add("disNone");
    });
}

function snez_two_depth_first_depth_show_all() {
    const snez_two_depth_first_depth_wrap   = document.querySelector("#snez_two_depth_first_depth_wrap");
    const first_depth_checkbox_list         = snez_two_depth_first_depth_wrap.querySelectorAll(".snez_checkbox_wrap");
    const snez_two_depth_second_depth_wrap  = document.querySelector("#snez_two_depth_second_depth_wrap");
    const second_depth_checkbox_list        = snez_two_depth_second_depth_wrap.querySelectorAll(".snez_checkbox_wrap");

    first_depth_checkbox_list.forEach((el, idx) => {
        if(idx === 0) el.querySelector("input").checked = true;
        else el.querySelector("input").checked = false;
    });
    second_depth_checkbox_list.forEach((el) => {
        el.classList.remove("disNone");
    });
}

function snez_two_depth_view_btn_toggle(e, mode) {
    const snez_two_depth_first_depth_wrap   = document.querySelector("#snez_two_depth_first_depth_wrap");
    const first_depth_checkbox_list         = snez_two_depth_first_depth_wrap.querySelectorAll(".snez_checkbox_wrap");
    const snez_two_depth_second_depth_wrap  = document.querySelector("#snez_two_depth_second_depth_wrap");
    const second_depth_checkbox_list        = snez_two_depth_second_depth_wrap.querySelectorAll(".snez_checkbox_wrap");
    const snez_two_depth_select_view_btn    = document.querySelector("#snez_two_depth_select_view_btn");
    const snez_two_depth_all_view_btn       = document.querySelector("#snez_two_depth_all_view_btn");

    first_depth_checkbox_list.forEach((el, idx) => {
        
    });

    second_depth_checkbox_list.forEach((el, idx) => {
        const input = el.querySelector("input[type=checkbox]");

        if(mode == 'select') {
            if(input.checked) el.classList.remove("disNone");
            else el.classList.add("disNone");
        } else if(mode == 'all') {
            el.classList.remove("disNone");
        }
    });

    switch(mode) {
        case "select":
            snez_two_depth_select_view_btn.classList.add("disNone");
            snez_two_depth_all_view_btn.classList.remove("disNone");
            break;
        case "all":
            snez_two_depth_select_view_btn.classList.remove("disNone");
            snez_two_depth_all_view_btn.classList.add("disNone");
            break;
    }
}

function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

function snez_dropdown_item_select(e) {
    const current_target    = e.currentTarget;
    const list_wrap         = current_target.parentElement;
    const list_items        = list_wrap.querySelectorAll(".snez_drop_down_list_items");

    list_items.forEach((list_item) => {
        if(list_item==current_target) list_item.classList.add("active");
        else list_item.classList.remove("active");
    });
}

function close_snez_multi_select_two_depth(e) {

    const target    = e.currentTarget;
    const wrap_el   = target.closest('.snez_select_data');

    wrap_el.classList.remove('active');
}

function mir_check_max_byte_length(str, max_bytes = 1200) {

    const encoder  = new TextEncoder();
    const str_byte = encoder.encode(str).length;

    return str_byte > max_bytes;
}

function check_snez_multi_filter_drop_down(e, callback = null) {
    e.stopPropagation();
    e.preventDefault();

    const current_target    = e.currentTarget;
    const checkbox          = current_target.querySelector('input[type=checkbox].snez_input');

    if(current_target.classList.contains("inactive")) return;

    checkbox.checked=!checkbox.checked;

    if (typeof callback === 'function') callback(e);
}

function remove_snez_imagebox_image(e) {
    e.stopPropagation();
    e.preventDefault();

    const current_target    = e.currentTarget;
    const parent_wrap       = current_target.parentElement;

    const image_wrap        = parent_wrap.querySelector("img.snez_imagebox_img");
    const image_input       = parent_wrap.querySelector("input.snez_imagebox_input");

    image_wrap.src = "";
    image_input.value = "";
    image_input.dataset.path = "";

    const img_target    = parent_wrap.querySelector(".snez_imagebox_img");
    const label_wrap    = parent_wrap.querySelector(".snez_imagebox_noimage_label_span");
    const icon_wrap     = parent_wrap.querySelector(".snez_imagebox_label_icon");
    const delete_wrap   = parent_wrap.querySelector(".snez_imagebox_delete_icon");

    img_target.classList.add("disNone");

    label_wrap.classList.add("disFlex");
    label_wrap.classList.remove("disNone");

    icon_wrap?.classList.add("disNone");
    icon_wrap?.classList.remove("disFlex");

    delete_wrap.classList.remove("active");
}

$.fn.detail_serializeControls = function() {
    var data = {};

    function buildInputObject(arr, val) {
        if (arr.length < 1) return val;
        
        var objkey = arr[0];
        if (objkey.slice(-1) == "]") {
            objkey = objkey.slice(0,-1);
        }

        var result = {};
        if (arr.length == 1){
            result[objkey] = val;
        } else {
            arr.shift();
            var nestedVal = buildInputObject(arr,val);
            result[objkey] = nestedVal;
        }
        return result;
    }

    $.each(this.serializeArray(), function() {
        var val = this.value;
        var c   = this.name.split("[");
        var a   = buildInputObject(c, val);
        $.extend(true, data, a);
    });

    $.each(this.find('input[type="checkbox"]'), function() {

        if(this.checked) {
            var val = this.dataset.check ? this.dataset.check : 1;
        } else {
            var val = this.dataset.no_check ? this.dataset.no_check : 0;
        }

        var c   = this.name.split("[");
        var a   = buildInputObject(c, val);
        $.extend(true, data, a);
    });
    
    return data;
}

function on_snez_imagebox_image_select(e, target_id) {
    const current_target    = e.currentTarget;
    const parent_wrap       = current_target.parentElement;

    var tgt = e.target || window.event.srcElement,
    files = tgt.files;

    if (FileReader && files && files.length) {
        var fr = new FileReader();
        fr.onload = function () {
            const img_target    = parent_wrap.querySelector(".snez_imagebox_img");
            const label_wrap    = parent_wrap.querySelector(".snez_imagebox_noimage_label_span");
            const icon_wrap     = parent_wrap.querySelector(".snez_imagebox_label_icon");
            const delete_wrap   = parent_wrap.querySelector(".snez_imagebox_delete_icon");

            img_target.classList.remove("disNone");

            label_wrap.classList.remove("disFlex");
            label_wrap.classList.add("disNone");

            icon_wrap?.classList.remove("disNone");
            icon_wrap?.classList.add("disFlex");

            delete_wrap.classList.add("active");
            
            img_target.src = fr.result;
        }
        
        fr.readAsDataURL(files[0]);
    }
}

var current_lang;
var translate_result;
var skip_idx;
var text_el_list = [];
function translate_request_test(request_core, translate_req, lang_code) {
    if(text_el_list.length == 0) text_el_list = document.querySelectorAll(".ez_translate_target");

    if(lang_code == 'cookie') {
        get_cookie = document.cookie.match(new RegExp('(^| )ez_translate_target_lang=([^;]+)'));
        lang_code = get_cookie ? decodeURIComponent(get_cookie[2]) : 'ko';
    }
    if(!translate_result) translate_result = [];
    if(!current_lang) current_lang = 'ko';
    if(!skip_idx) skip_idx = [];
    
    if(current_lang == lang_code) return;


    if(Array.isArray(translate_result[lang_code])) {
        var translate_text_list = translate_result[lang_code];

        var idx_sub = 0;
        text_el_list.forEach((text_el, idx) => {
            pos_idx = idx - idx_sub;
            if(skip_idx.includes(idx)) {
                idx_sub++;
            } else {
                text_el.innerHTML = translate_text_list[pos_idx].replace(/\\(.)/mg, "$1");
            }
        });

        current_lang = lang_code;

        let expires = "";
        const date = new Date();
        date.setTime(date.getTime() + (24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
        document.cookie = "ez_translate_target_lang" + "=" + encodeURIComponent(lang_code) + expires + "; path=/";

        translate_set_lang_session(lang_code);
    } else {
        const text_list = Array.isArray(translate_result['ko']) ? translate_result['ko'] : [];
        if(!Array.isArray(translate_result['ko'])) translate_result['ko'] = [];

        if(!Array.isArray(translate_result['ko']) || translate_result['ko'].length === 0) {
            skip_idx = [];
            text_el_list.forEach((text_el, idx) => {
                const text_content = sanitizeContent(text_el.innerHTML);
        
                if(text_content !== '') {
                    text_list.push(text_content);
                } else {
                    skip_idx.push(idx);
                }
            });
        }

        if(current_lang == 'ko' && Array.isArray(translate_result['ko']) && translate_result['ko'].length === 0) translate_result['ko'] = text_list;

        const send_data = {
            'text_list' : translate_result['ko'],
            lang_code,
            current_lang
        };

        crm_loading_toggle(true, "all_page_loading_wrap");
        ajax_request(request_core, 'POST', translate_req, send_data, (status, data) => {
            crm_loading_toggle(true, "all_page_loading_wrap");
            if(status == 200) {
                translate_text_list = data.translate_list;

                var idx_sub = 0;
                const tr_text_list = [];
                text_el_list.forEach((text_el, idx) => {
                    pos_idx = idx - idx_sub;
                    if(skip_idx.includes(idx)) {
                        idx_sub++;
                    } else {
                        parse_str = $("<textarea/>").html(translate_text_list[pos_idx]).text();
                        
                        text_el.innerHTML = parse_str.replace(/\\(.)/mg, "$1");
                        tr_text_list.push(parse_str);
                    }
                });
    
                translate_result[data.current_lang] = tr_text_list;
                current_lang = data.current_lang;

                let expires = "";
                const date = new Date();
                date.setTime(date.getTime() + (24*60*60*1000));
                expires = "; expires=" + date.toUTCString();
                document.cookie = "ez_translate_target_lang" + "=" + encodeURIComponent(current_lang) + expires + "; path=/";
                return;
            }
    
            error_message(data.message);
        });
    }
}

function translate_set_lang_session(lang_code) {
    ajax_request(new_ez_ajax_core, 'POST', translate_set_lang_session_req, { lang_code }, (status, data) => {
        if(status != 200) error_message(data.message);
    });
}

function sanitizeContent(html) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    function clean(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            return node.textContent;
        }

        if (node.nodeName.toLowerCase() === "br") {
            return "<br>";
        }

        if (node.nodeName.toLowerCase() === "em") {
            let inner = "";
            node.childNodes.forEach(child => {
                inner += clean(child);
            });

            // Keep style attribute if present
            const style = node.getAttribute("style");
            return style ? `<em style="${style}">${inner}</em>` : `<em>${inner}</em>`;
        }

        // Strip other tags, keep only their children
        let inner = "";
        node.childNodes.forEach(child => {
            inner += clean(child);
        });
        return inner;
    }

    let result = "";
    tempDiv.childNodes.forEach(child => {
        result += clean(child);
    });

    return result;
}

/**
* @author 2023-07-19 성수
* @category skeleton 삭제
* @param Element target
* @param String print_html
*/
function mir_ca_common_skeleton_remove(target, print_html) {
    target.style.opacity = "0";

    // setTimeout(() => {
        $(target).html(print_html);
        target.style.removeProperty("opacity");
    // }, 200);
}

function mir_crm_alarm_toggle(e, append_target="#mir_ca_layout_alarm") {
    const current_target = e ? e.parentElement : document.querySelector("#mir_ca_layout_alarm_btn");

    if(current_target && current_target.classList.contains("active")) {

    } else {
        crm_loading_toggle(true, "mir_crm_alarm_modal_loading_wrap");
        ajax_request(mir_ca_core_path, "POST", mir_crm_alarm_toggle_req, {}, (status, data) => {
            crm_loading_toggle(true, "mir_crm_alarm_modal_loading_wrap");
            if(status == 200) {
                const body_target = document.querySelector(append_target);

                body_target.parentElement.parentElement.classList.add("active");
                mir_ca_common_skeleton_remove(body_target, data.print_html);

                const total_cnt = data.total_cnt;
                const page_event = function(page) {
                    return () => {
                        mir_crm_get_alarm_list(page, limit);
                    }
                }

                const pagination_wrap   = document.querySelector("#mir_crm_alarm_modal_pagination_wrap");
                const pages             = build_pages(1, total_cnt, 5, 10, page_event);
                remove_all_child_nodes(pagination_wrap);
                for(const page of pages) {
                    pagination_wrap.appendChild(page);
                }

                const alarm_wrap = document.querySelector("#mir_ca_common_sub_menu_kind_drop_down_wrap");

                document.addEventListener('click', (event) => {
                    if(!alarm_wrap.contains(event.target)) {
                        alarm_wrap.classList.remove("active");
                    }
                });
                return;
            }

            error_message(data.message);
        });
    }
}

function isInIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

function snez_jump_to_item(target_id, highlight = false) {
    const jump_target  = $("#" + target_id);
    const jump_offset  = jump_target.offset();
    const target_height = jump_target.outerHeight();
    const viewport_height = $(window).height();

    const scroll_position = jump_offset.top - (viewport_height / 2) + (target_height / 2);

    $("html, body").stop().animate({ scrollTop: scroll_position }, 400);

    if(highlight) {
        jump_target.addClass("mds_highlight_el");

        setTimeout(() => {
			jump_target.removeClass("mds_highlight_el");
		}, 3000);
    }
}

function on_snez_sync_toggle_click(e) {
    e.stopPropagation();
    e.preventDefault();

    const current_target    = e.currentTarget;
    const parent_wrap       = current_target.parentElement;
    const icon_wrap         = parent_wrap.querySelector("span.material-icons");

    const on_icon   = current_target.dataset.on_icon;
    const off_icon  = current_target.dataset.off_icon;

    if(current_target.checked) {
        icon_wrap.innerText = on_icon;
        icon_wrap.classList.add('green');
        icon_wrap.classList.remove('red');
    } else {
        icon_wrap.innerText = off_icon;
        icon_wrap.classList.add('red');
        icon_wrap.classList.remove('green');
    }
}