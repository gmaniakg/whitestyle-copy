let applied_assets;
let timeOut             = "";
let scroll_fixed        = "";

let element_position_array  = "";
let element_height_array    = "";

function scroll_fixed_init() {
    scroll_fixed = document.querySelectorAll(".scroll_fixed");

    element_position_array  = [];
    element_height_array    = [];

    for(let i = 0; i < scroll_fixed.length; i++) {
        scroll_fixed[i].classList.remove("active");

        let current_element_position    = window.pageYOffset + scroll_fixed[i].getBoundingClientRect().top;
        let current_element_height      = scroll_fixed[i].parentElement.getBoundingClientRect().height;

        element_position_array.push(current_element_position);
        element_height_array.push(current_element_height);
    }
}

scroll_fixed_init();

async function get_adm_ez_module(ez_layout_name, module_idx, is_new_ez=false) {
    const module = document.querySelector(`#box_module_${ez_layout_name}_${module_idx}_wrap`);

    const send_data = { 
        module_idx, is_new_ez,
        is_adm_panel    : true
     };

     ajax_request(ajax_core_request, "POST", get_ez_module_req, send_data, (status, data) => {
        if(status == 200) {
            const print_html = data.module_ui;

            update_ez_module(ez_layout_name, module_idx, print_html);
            target_module_edit_mode_on(ez_layout_name, module_idx);

            return;
        }
        new mirMessage({
            pos     : "br",
            type    : "toast",
            mode    : "fail",
            title   : "실패!",
            text    : "관리자 설정 기능이 동작하지 않습니다. 개발팀에 문의 바랍니다. (ERR_CODE: EZJS_08_47)"
        }).show();
     });
}

function position_sticky(scroll_fixed, element_position_array, element_height_array) {
    let scroll_item_display = false;

    for(let i=0; i<scroll_fixed.length; i++) {
        if(scroll_fixed[i].classList.contains("disBlock")) scroll_item_display = true;
    }

    if(
        scroll_item_display == true
        && scroll_fixed.length == element_position_array.length
        && scroll_fixed.length == element_height_array.length
    ) {
        let current_scroll_position = document.documentElement.scrollTop;

        for(let i=0; i<scroll_fixed.length; i++) {
            let current_element_position        = element_position_array[i];
            let current_element_height          = element_height_array[i];
            let current_element_position_end    = current_element_position + current_element_height;

            if(
                current_element_position - 86 < current_scroll_position
                && current_scroll_position < current_element_position_end - 86
            ) {
                scroll_fixed[i].classList.add("active");
            } else {
                scroll_fixed[i].classList.remove("active");
            }
        }
    }
}

document.addEventListener("scroll", () => {
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
        position_sticky(scroll_fixed, element_position_array, element_height_array);
    }, 150);
});

/** -------------------Config wrap 위치 설정------------------------ */
const ez_config_wrap        = document.querySelector(".ez_layout_config_wrap");
let ez_config_wrap_position = ez_config_wrap
                            ? ez_config_wrap.dataset.position
                            : '';

if(ez_config_wrap_position == "left") {
    ez_config_wrap.classList.add("ez_layout_config_wrap_position_left");
} else if(ez_config_wrap_position == "right") {
    ez_config_wrap.classList.add("ez_layout_config_wrap_position_right");
}
/**------------------------------------------------------------------- */

function button_click_switch(target, click_on) {
    if(click_on) {
        target.style.pointerEvents = "none";
    } else {
        target.style.pointerEvents = "auto";
    }
}

function ez_config_wrap_open(e) {
    e.preventDefault();

    ez_config_wrap_position = ez_config_wrap.dataset.position;
    if(ez_config_wrap_position == "left") {
        ez_config_wrap.classList.add("ez_layout_config_wrap_on_left");
    } else if(ez_config_wrap_position == "right") {
        ez_config_wrap.classList.add("ez_layout_config_wrap_on_right");
    }

    $(".transColor").colorpicker({
        transparentColor    : true,
        defaultPalette      : "web",
        hideButton          : true
    });
}

function ez_config_wrap_close(){
    ez_config_wrap_position = ez_config_wrap.dataset.position;

    if(ez_config_wrap_position == "left"){
        ez_config_wrap.classList.remove("ez_layout_config_wrap_on_left");
        return;
    }
    ez_config_wrap.classList.remove("ez_layout_config_wrap_on_right");
}

function ez_config_wrap_position_left(e) {
    e.preventDefault();

    ez_config_wrap.classList.remove("ez_layout_config_wrap_position_right");
    ez_config_wrap.classList.add("ez_layout_config_wrap_position_left");
    ez_config_wrap.setAttribute("data-position", "left");

    if(ez_config_wrap.classList.contains("ez_layout_config_wrap_on_right")) {
        ez_config_wrap.classList.remove("ez_layout_config_wrap_on_right");
        ez_config_wrap.classList.add("ez_layout_config_wrap_on_left");
    }
}

function ez_config_wrap_position_right(e) {
    e.preventDefault();

    ez_config_wrap.classList.remove("ez_layout_config_wrap_position_left");
    ez_config_wrap.classList.add("ez_layout_config_wrap_position_right");
    ez_config_wrap.setAttribute("data-position", "right");

    if(ez_config_wrap.classList.contains("ez_layout_config_wrap_on_left")) {
        ez_config_wrap.classList.remove("ez_layout_config_wrap_on_left");
        ez_config_wrap.classList.add("ez_layout_config_wrap_on_right");
    }
}


/**-------------------------애셋 관련 메소드-------------------------- */
function on_asset_expand(e) {
    const icon          = e.currentTarget;
    const topping_table = icon.parentElement.parentElement.parentElement.children[1];

    icon.innerHTML  = icon.innerHTML === "expand_more" ? "expand_less" : "expand_more";
    topping_table.classList.contains("open") ? topping_table.classList.remove("open") : topping_table.classList.add("open");
}

//* 에셋 수정하기
function on_edit_asset(e, ez_layout_name, asset_idx, asset_type, event_type, stn) {
    e.preventDefault();

    button_click_switch(e.target, true);

    //* 수정할 에셋 박스
    const asset_box        = e.currentTarget.parentElement.parentElement.parentElement;
    const asset_name       = asset_box.querySelector(".asset_item_name").innerHTML;
    const topping_tbody    = asset_box.querySelector("tbody").cloneNode(true);

    //* 에셋 추가에 복사해 수정 form으로 만들 영역
    const asset_submit_box = document.getElementById(`ez_submit_${event_type}_asset_tab_content`);
    const asset_form       = asset_submit_box.children[0];
    
    //* 복사할 에셋 저장 form (저장 form => 수정 form으로 변경 후 추가하기)
    const clone_asset_form = asset_form.cloneNode(true);
    const clone_name_input = clone_asset_form.querySelector(`input[name=asset_name]`);
    const save_asset_tbody = clone_asset_form.querySelector(`#asset_option_tbody_${event_type}`);
    const save_asset_table = save_asset_tbody.parentElement;
    const submit_btn_box   = clone_asset_form.querySelector(".ez_asset_submit_btn_box");

    //* 수정할 에셋 탭 
    const tab_box          = document.querySelector("#ez_save_asset_tab"); 
    const target_tab       = tab_box.querySelector(`button[data-mode=${event_type}]`);

    clone_name_input.value = asset_name; // 기존 이름 출력

    //* 기존 저장 form에서 수정, 수정 취소 버튼으로 변경
    let is_shared_btn = "";
    if(stn == 1) {

        is_shared_btn = `<button type="submit" value="save" class="ez_button_style ez_asset_save_btn ez_asset_save_btn_${event_type}" data-is_shared="Y">전체공유추가</button>`;
    }
    submit_btn_box.innerHTML = `
        <button type="submit" value="update" class="ez_button_style ez_asset_save_btn ez_asset_save_btn_${event_type}" >수정</button>
        ${is_shared_btn}
        <button type="submit" value="save" class="ez_button_style ez_asset_save_btn ez_asset_save_btn_${event_type}" data-is_shared="N">추가</button>
        <button class="ez_button_style ez_asset_save_btn ez_asset_save_btn_${event_type}" onclick="on_cancel_asset_modification(event, \'${event_type}\')">취소</button>
    `;

    //* 수정할 테이블 데이터에서 토핑 제거 버튼을 추가
    topping_tbody.childNodes.forEach((element) => {

        element.insertAdjacentHTML("beforeend", `
            <td style="text-align:right!important">
                <span class="material-icons-outlined clickable_icon" onclick="on_remove_topping(event)">cancel</span>
            </td>
        `);
    });

    clone_asset_form.setAttribute("onsubmit" , `on_update_form_request(event, "${ez_layout_name}", ${asset_idx}, "${asset_type}", "${event_type}")`);
    clone_asset_form.style.display = "block"; 
    save_asset_table.style.display = "table";
    save_asset_tbody.innerHTML = topping_tbody.innerHTML; //* 수정할 토핑 데이터 삽입
    if (asset_submit_box.children[1]) asset_submit_box.children[0].remove(); //* 기존에 수정하던 에셋 form 제거
    asset_form.style.display = "none"; //* 기존 저장히가 form을 숨기기
    asset_submit_box.prepend(clone_asset_form); //* 수정하기 form을 추가
    ez_config_wrap_open(e); //* 에셋 추가 모달 open
    target_tab.click(); //* 수정 선택한 텝을 focus

    button_click_switch(e.target, false);
}


//* 에셋 옮기는 메소드
function on_move_asset(e, asset_idx, event_type, target_device = "cancel") {
    const icon       = e.currentTarget;
    const icon_wrap  = icon.closest('.asset_move_icon_wrap');
    const is_applied = icon.innerHTML == "cancel"; //* cancel 아이콘이면 적용된 아이콘
    const current    = is_applied ? "applied" : "applicable";
    const target     = is_applied ? "applicable" : "applied";
    const target_asset_item  = document.querySelector(`#${current}_${event_type}_asset_${asset_idx}_box`);
    let target_asset_box     = null;

    

    if(is_applied) {
        icon.closest(".target_asset").remove();
        const applied_asset_pc = document.querySelector(`#applied_${event_type}_asset_pc .target_asset[data-asset_idx="${asset_idx}"]`);
        const applied_asset_mobile = document.querySelector(`#applied_${event_type}_asset_mobile .target_asset[data-asset_idx="${asset_idx}"]`);
        const applicable_asset = document.querySelector(`#applicable_${event_type}_asset .target_asset[data-asset_idx="${asset_idx}"]`);
        
        if(applicable_asset == null){
            target_asset_box = document.querySelector(`#${target}_${event_type}_asset`);
            var clone_item = icon.closest(".target_asset").cloneNode(true);
            var clone_icon_wrap = clone_item.querySelector('.asset_move_icon_wrap');

            clone_icon_wrap.replaceChildren();

            build_icon = asset_move_icon_build(asset_idx, event_type, "pc");
            clone_icon_wrap.insertAdjacentHTML('beforeend', build_icon);
            build_icon = asset_move_icon_build(asset_idx, event_type, "mobile");
            clone_icon_wrap.insertAdjacentHTML('beforeend', build_icon);
            clone_item.id = `${target}_${event_type}_asset_${asset_idx}_box`;

            target_asset_box.prepend(clone_item);
        }
    } else {
        var clone_item = target_asset_item.cloneNode(true);
        var clone_icon_wrap = clone_item.querySelector('.asset_move_icon_wrap');

        clone_icon_wrap.replaceChildren();

        const build_icon = asset_move_icon_build(asset_idx, event_type, "cancel");
        clone_icon_wrap.insertAdjacentHTML('beforeend', build_icon);
        clone_item.id = `${target}_${event_type}_asset_${asset_idx}_box`;
        
        target_asset_box = document.querySelector(`#${target}_${event_type}_asset_${target_device}`);
        is_applied ? target_asset_box.prepend(clone_item) : target_asset_box.append(clone_item);

        const reverse_device = target_device == "pc" ? "mobile" : "pc";
        const reverse_asset = document.querySelector(`#applied_${event_type}_asset_${reverse_device} .target_asset[data-asset_idx="${asset_idx}"]`);
        if(reverse_asset){ 
            //* 양쪽 디바이스에 있으면 삭제
            icon.closest(".target_asset").remove();
        }
    }
}

function asset_move_icon_build(asset_idx, event_type, mode) {
    let text;
    switch(mode) {
        case "pc":      text = "computer"; break;
        case "mobile":  text = "phone_iphone"; break;
        case "cancel":  text = "cancel"; break;
    }

    return `<span class="material-icons-outlined clickable_icon applicable_asset_icon" onclick="on_move_asset(event, ${asset_idx}, '${event_type}', '${mode}')">${text}</span>`;
}

function on_manage_asset(e, asset_idx) {
    const icon  = e.currentTarget;

    if(icon.innerHTML == "delete") on_remove_asset(e, asset_idx);
    if(icon.innerHTML == "restore_from_trash") on_restore_asset(e, asset_idx);
}


//* 에셋 삭제하기 요청
async function on_remove_asset(e, asset_idx) {
    if (!confirm("선택하신 에셋을 삭제하시겠습니까?")) return;
    const send_data = { asset_idx : asset_idx };
    const response  = await fetch_request(ajax_core_request, "POST", ez_delete_asset_data_req, send_data);

    if (response.status == 200) {
        const asset_items = document.querySelectorAll(`[data-asset_idx="${asset_idx}"]`);
        asset_items.forEach((element) => element.remove())
        return;
    }
    alert("에셋 삭제하는 데 실패했습니다.");
}

async function on_restore_asset(e, asset_idx) {
    if (!confirm("선택하신 에셋을 복구하시겠습니까?")) return;
    const send_data = {asset_idx : asset_idx};
    const response  = await fetch_request(ajax_core_request, "POST", ez_restore_asset_data_req, send_data);
    if (response.status == 200) {
        alert(`이름에 "(복구)"가 추가되어 복구가 완료되었습니다. 해당 에셋을 찾으시면 이름을 수정해주세요.`);
        const asset_items = document.querySelectorAll(`[data-asset_idx="${asset_idx}"]`);
        asset_items.forEach((element) => element.remove());
        return;
    }
    alert(response.data.message);
} 

async function load_mobile_version(module_idx, ez_layout_name = '', is_update = false){
    const mobile_modal_box = document.querySelector("#ez_mobile_view_box");
    const mobile_module    = mobile_modal_box.querySelector(`#box_module_${ez_layout_name}_${module_idx}_wrap`);
    if (is_update && !mobile_module) return;
    const send_data = { module_idx : module_idx, ez_layout_name: ez_layout_name, target_device : "mobile" };
    const response  = await fetch_request(ajax_core_request, "POST", load_mobile_module_req, send_data);

    if (response.status == 200) {
        const pc_setting_tab_box = document.querySelector(`.ez_adm_setting_tab`);
        const active_tab         = pc_setting_tab_box.querySelector(".active");

        $("#ez_mobile_view_box").html(response.data.mobile_view_ui);
            activate_module_adm(mobile_modal_box);
            active_tab.click();
            return;
        }
        alert("모듈의 모바일 버전 보기 기능이 동작하지 않습니다. 개발팀에 문의 바랍니다.");
}

function on_close_theme_sidebar(e){
    const ez_layout_theme_sidebar   = document.getElementById("ez_layout_theme_sidebar");

    ez_layout_theme_sidebar.classList.remove("active");
}

function close_mobile_view(e, ez_layout_name, module_idx){

    const mobile_view_wrap  = document.getElementById(ez_layout_name + "_" + module_idx + "_mobile_view");

    mobile_view_wrap.classList.remove("active");
}

async function request_edit_asset(encoded_ez_layout_config) {
    const data             = { ez_layout_config : encoded_ez_layout_config };
    const response         = await fetch_request(ajax_core_request, "POST", ez_edit_assets_print_req, data);

    if (response.status == 200) {
        const asset_sidebar    = document.querySelector("#ez_layout_asset_list_wrap");
        const topping_sidebar  = document.querySelector("#ez_layout_config_wrap");
        const asset_list_box   = document.querySelector("#asset_list_content");
        const topping_list_box = document.querySelector("#topping_list_content");
        const order_wrap       = $("#ez_layout_order_list_wrap");
        const content_type     = response.data.content_type;
        const asset_events     = ["base", "click", "hover"];

        //* 2021-11-23 12:32:31 동환
        //* 순서변경 사이드바 호출시 숨겼던 버튼, 탭을 다시보이게함
        const topping_sidebar_btn   = document.querySelector(".ez_layout_config_wrap_open");
        const device_tab            = document.querySelector(".ez_layout_asset_list");

        if(topping_sidebar_btn.classList.contains("disNone")) topping_sidebar_btn.classList.remove("disNone");
        if(device_tab.classList.contains("disNone")) device_tab.classList.remove("disNone");
        
        if(!order_wrap.hasClass("disNone")) order_wrap.addClass("disNone");
        if(!asset_sidebar.classList.contains("active")) asset_sidebar.classList.add("active");
        if(!topping_sidebar.classList.contains("active")) topping_sidebar.classList.add("active");

        asset_list_box.innerHTML        = response.data.asset_list_ui;
        topping_list_box.innerHTML      = response.data.topping_list_ui;
        const target_applied_asset_list = $( ".target_applied_asset_list");

        target_applied_asset_list.sortable();

        asset_events.map((event) => {
            request_applicable_assets(event, content_type, 1);
        });

        applied_assets = response.data.applied_idx_list;

        return;
    }
    alert("현재 에셋 사이드바가 동작하지 않습니다. 개발팀에 문의해보세요.");
}

async function request_applicable_assets(event_type, content_type, target_page, search_config = null, event = null) {

    if(event) {
        if (event.currentTarget.classList.contains("page_active")) return;
    }

    const applied_assets_pc   = document.querySelector(`#applied_${event_type}_asset_pc`);
    const applied_assets_mobile   = document.querySelector(`#applied_${event_type}_asset_mobile`);
    const idx_list = [];

    Array.from(applied_assets_pc.children).forEach((element) => idx_list.push(Number(element.dataset.asset_idx)));
    Array.from(applied_assets_mobile.children).forEach((element) => idx_list.push(Number(element.dataset.asset_idx)));
    
    const distinct = new Set(idx_list);
    const filtered = idx_list.filter(item => {
        if(distinct.has(item)) {
            distinct.delete(item);
        } else {
            return item;
        }
    });

    //* 중복 제거된 idx 리스트
    applied_idx_list = [...new Set(filtered)]; 

    const send_data = {
        event_type       : event_type,
        content_type     : content_type,
        applied_idx_list : applied_idx_list,
        page             : target_page,
        limit            : 10,
    };

    if(search_config) {
        send_data.search_word = search_config.word;
        send_data.search_type = search_config.type;
        send_data.conditions  = search_config.conditions;
    }
    
    const response = await fetch_request(ajax_core_request, "POST", ez_get_applicable_assets_req, send_data);
    
    if (response.status == 200) {
        //* "추가 가능한 에셋" 아이템 업데이트
        const applicable_asset_box = document.querySelector(`#applicable_${event_type}_asset`);
        applicable_asset_box.innerHTML = response.data.applicable_assets_ui; 
        
        //* 페이지 생성
        const applicable_page_box  = document.querySelector(`#applicable_${event_type}_asset_page`);
        const total_count          = response.data.total_count;
        const page_event           = (page) => (e) => request_applicable_assets(event_type, content_type, page, search_config, e);
        const page_elements        = build_pages(target_page, total_count, 10, send_data.limit, page_event);

        remove_all_child_nodes(applicable_page_box);
        applicable_page_box.append(...page_elements);
        return;
    }
    alert("추가 가능한 에셋을 가져오는데 문제가 발생했습니다. 개발팀에 문의 바랍니다.");
}

function on_close_sidebar(e) {
    const asset_sidebar    = document.querySelector("#ez_layout_asset_list_wrap");

    if (asset_sidebar.classList.contains("active")) asset_sidebar.classList.remove("active");
    ez_config_wrap_close(e);
}

//* 에셋 검색 요청
async function on_search_assets(e, event_type, content_type) {
    e.preventDefault();
    const search_box            = document.querySelector(`#${event_type}_asset_search_box`);
    const search_params         = search_box.querySelectorAll("[name]");
    const condition_checkboxes  = search_box.querySelectorAll(".checked");
    const conditions            = [];
    const search_config         = {}

    //* 검색 설정 관련 정보 search_config에 넣어주기
    search_params.forEach((element) => search_config[element.name] = element.value.trim())
    condition_checkboxes.forEach((element) => conditions.push(element.dataset.condition_name));
    search_config.conditions    = conditions;
    request_applicable_assets(event_type, content_type, 1, search_config);
}

async function request_copy_item(e, dataBus){
    e.preventDefault;
    button_click_switch(e.target, true);
    const copy_list_sidebar         = document.getElementById("ez_copy_list_sidebar");
    const copy_list_content_wrap    = document.querySelector(".ez_copy_list_content_wrap");
    if(!copy_list_sidebar.classList.contains("active")){
        copy_list_sidebar.classList.add("active");
    }

    const data = {
        module_config   : dataBus,
    };
    const response  = await fetch_request(ajax_core_request, "POST", ez_copy_req, data);

    if(response.status == 200){
        copy_list_content_wrap.innerHTML = response.data.result_html;
        button_click_switch(e.target, false);
        return;
    }
    alert("현재 복사하기 기능이 동작하지 않습니다. 개발팀에 문의바랍니다.");
    button_click_switch(e.target, false);
}

async function request_paste_item_list(e, dataBus) {
    e.preventDefault();
    button_click_switch(e.target, false);
    const copy_list_sidebar         = document.getElementById("ez_copy_list_sidebar");
    const copy_list_content_wrap    = document.querySelector(".ez_copy_list_content_wrap");
    if(!copy_list_sidebar.classList.contains("active")){

        copy_list_sidebar.classList.add("active");
    }

    const data = {
        module_config   : dataBus,
    };

    const response = await fetch_request(ajax_core_request, "POST", ez_paste_list_req, data);

    if(response.status == 200){
        copy_list_content_wrap.innerHTML = response.data.result_html;
        button_click_switch(e.target, false);
        return;
    }
    alert("현재 붙여넣기 기능이 동작하지 않습니다. 개발팀에 문의바랍니다.");
    button_click_switch(e.target, false);
}

function on_close_copy_sidebar(e){
    e.preventDefault();

    const copy_list_sidebar = document.getElementById("ez_copy_list_sidebar");

    if (copy_list_sidebar.classList.contains("active")) copy_list_sidebar.classList.remove("active");
}

async function on_copyprint_request(e, module_idx, paste_module_idx, target_path, paste_target, target_type, ez_layout_name){
    e.preventDefault();
    button_click_switch(e.target, true);

    const url = window.location.href;

    const data = {
        target_path     : target_path,
        target_type     : target_type,
        paste_target    : paste_target,
        paste_module_idx: paste_module_idx,
        module_idx      : module_idx,
        url
    };

    const response = await fetch_request(ajax_core_request, "POST", ez_paste_item_req, data);

    if (response.status == 200) {
        const module_ui = response.data.module_ui;
        update_ez_module(ez_layout_name, paste_module_idx, module_ui);
        button_click_switch(e.target, false);
        return;
    }
    alert("붙여넣기에 실패했습니다. 개발팀에 문의바랍니다.");
    button_click_switch(e.target, false);
}

async function save_layout(e, en_module_idx, target_path, target_key, ez_type) {
    e.preventDefault();

    const data = {
        target_path     : target_path,
        target_key      : target_key,
        ez_type         : ez_type,
        module_idx      : en_module_idx,
    };
    const response = await fetch_request(ajax_core_request, "POST", ez_save_layout_req, data);
    if(response.status == 200) {
        
    }
}

async function preview_copyprint(e, module_id, target_path, target_key) {
    e.preventDefault();

    const data = {
        module_id   : module_id,
        target_key  : target_key
    };
    const response = await fetch_request(ajax_core_request, "POST", ez_preview_copyprint_req, data);

    $("#ez_modal_box").html(response.data.result_html);
    $(".adm_edit_modal").css("z-index","10002");
}

async function request_reorder_sidebar(target_key, titles_config, ez_type) {
    const adm_background = document.querySelector(`#${target_key}_adm_background`);
    const ez_element     = adm_background.parentElement;
    const splide_track   = ez_element.querySelector(".splide__track");
    let is_slider   = false;
    let target_type = "content";
    //TODO 모듈단 슬라이더순서변경만 슬라이더 안꺼도되도록 적용되있음 추후 모든영역에 적용예정
    if (splide_track) {
        is_slider   = true;
        target_type = "object";
    }

    //* 2021-11-23 12:35:18 동환 예외처리
    //* 콘텐츠의 순서변경은 sidebar에서 하기때문에 adm_panel숨길필요없음
    if(ez_type != "ez_box" && is_slider != true) adm_background.style.zIndex  = -1;

    const data = {
        titles_config   : titles_config,
        is_slider       : is_slider,
        target_type     : target_type
    };
    const response  = await fetch_request(ajax_core_request, "POST", ez_titles_order_sidebar_req, data);
    const asset_sidebar    = document.querySelector("#ez_layout_asset_list_wrap");
    const asset_list_box   = document.querySelector("#asset_list_content");
    const topping_list_box = document.querySelector("#topping_list_content");

    //* 2021-11-23 12:32:35 동환
    //* 순서변경 사이드바 위의 mobile,pc 선택탭 안나오게함
    document.querySelector(".ez_layout_config_wrap_open").classList.add("disNone");
    document.querySelector(".ez_layout_asset_list").classList.add("disNone");

    const order_wrap = $("#ez_layout_order_list_wrap");

    if(ez_type=="ez_box" || is_slider == true) {

        if(!asset_sidebar.classList.contains("active")) asset_sidebar.classList.add("active");
        
        asset_list_box.innerHTML    = "";
        topping_list_box.innerHTML  = "";
        order_wrap.removeClass("disNone");
        order_wrap.html(response.data.order_list_ui);
    }
    
    //* 스크립트가 중간에 
    if($("#drag_script").length) {

        $("#drag_script").remove();
        $("body").append(response.data.drag_script);
    } else {

        $("body").append(response.data.drag_script);
    }
}

async function request_item_delete(e, module_config, ez_layout_name, module_idx) {
    button_click_switch(e.target, true);
    let delete_confirm = confirm("정말로 삭제하시겠습니까?");

    if(delete_confirm) {

        const url = window.location.href;

        const data      = { module_config  :  module_config, url };
        const response  = await fetch_request(ajax_core_request, "POST", ez_delete_item_req, data);

        if (response.status == 200) {

            const module_ui = response.data.module_ui;
            update_ez_module(ez_layout_name, module_idx, module_ui);
            button_click_switch(e.target, false);

            return;
        }

        alert("선택하신 콘텐츠를 삭제하는데 실패했습니다. 개발팀에 문의바랍니다.");
        button_click_switch(e.target, false);
    }
}

function request_both_item_delete(e, module_config, ez_layout_name, module_idx, is_new_ez = false, is_panel_modal = false, is_snez_side_panel = false) {
    const current_target = e.currentTarget;
    if(confirm("삭제 시 PC와 모바일 모두 삭제됩니다. 정말로 삭제하시겠습니까?")) {
        const url = window.location.href;
        var send_data = {
            module_config   : module_config,
            url,
            is_new_ez
        };

        if(is_snez_side_panel) crm_loading_toggle(true, "snez_side_panel_loading_box_wrap");
        ajax_request(ajax_core_request, "POST", ez_delete_both_item_req, send_data, function(status, data){
            if(is_snez_side_panel) crm_loading_toggle(true, "snez_side_panel_loading_box_wrap");
            if(status==200) {
                var module_ui = data.module_ui;
                if(is_new_ez){
                    new_update_ez_module(ez_layout_name, module_idx, module_ui);
                } else {
                    update_ez_module(ez_layout_name, module_idx, module_ui);
                }

                if(is_panel_modal) {
                    const remove_target = current_target.closest(".nez_setting_list_item_module_wrap");

                    remove_target.remove();
                }

                if(is_snez_side_panel) on_snez_edit_panel_module_fetch(module_idx, 'Y');
                return;
            }
            console.error(data);
        });
    } else {
        return;
    }
}

//! 실서버 업로드 시, S:\wrapSetupCS2.php < /dev/coreS3/ez_layout/js/index.js?v='.date("YmdHis").'가 되어있어야합니다.
async function request_delete_module(e, module_id, module_type = 'normal', original_data = '') {
    e.preventDefault();

    const delete_btn    = e.currentTarget;
    const url_params    = new URLSearchParams(window.location.search);
    const mir_code      = url_params.get("mir_code");

    if (delete_btn.closest('.splide__slide')) {
        const splide_list = delete_btn.closest('.splide__list');
        const item_cnt = splide_list.querySelectorAll('.splide__slide:not(.splide__slide--clone)').length;

        if (item_cnt <= 2) return alert("슬라이드 안에 두개 이상의 모듈이 존재해야 합니다.");
    }

    if(confirm("정말로 삭제하시겠습니까?")) {
        let data = { module_id, mir_code, module_type, original_data };

        if ((delete_btn.closest('.ts_tab_items') || delete_btn.closest('.splide__list'))) {
            const parent_module_idx = delete_btn.closest('.temp_wrap').id.replace('md_', '');
            const mode = delete_btn.closest('.ts_tab_items') ? 'tab' : 'slide';

            const send_data = {module_idx: module_id, mir_code, parent_module_idx, mode};
            ajax_request(ajax_core_request, 'POST', ts_delete_mirroring_module_req, send_data, (status, data) => {
                if (status == 200) {
                    location.reload();
                    return;
                } else if(status == 403) {
                    grant_error_message(data.message, data.grant);
                    return;
                }

                error_message(data.message);
            });
        } else {
            
            const response = await fetch_request(ajax_core_request, "POST", ez_delete_module_req, data);
            if(response.status == 200 && response.data.result == "SUCCESS") {
                location.reload();
                return;
            } else if(status == 403) {
                grant_error_message(data.message, data.grant);
                return;
            }
            
            error_message(response.data.message);
        }
    }
}

async function on_update_form_request(e, ez_layout_name, asset_idx, content_type, event_type) {
    e.preventDefault();
    button_click_switch(e.target, true);
    const form         = e.currentTarget;
    const request_type = e.submitter.value; //* 신규 저장, 수정인지 체크

    if(request_type == "update") return on_update_asset(e, ez_layout_name, asset_idx, content_type, event_type);

    if(request_type == "save") {

        const status = await save_ez_asset(e, ez_layout_name, event_type, content_type);
        if (status == 200) remove_asset_update_form(event_type);
        button_click_switch(e.target, false);
        return;
    }
    console.error("알 수 없는 SUBMIT 버튼 클릭");
    button_click_switch(e.target, false);
}

async function save_ez_asset(e, ez_layout_name, event_type, content_type) {
    e.preventDefault();

    const save_form         = e.currentTarget;
    const save_btn          = e.submitter;
    const is_shared         = save_btn.dataset.is_shared ? save_btn.dataset.is_shared : "N";
    const asset_form_data   = serialize_asset_form_data(save_form);
    const asset_name        = asset_form_data.asset_name;
    const topping_data      = asset_form_data.topping_data;

    const send_data = {
        ez_layout_name, event_type, content_type, is_shared,
        name           : asset_name,
        topping        : topping_data
    };

    const response = await fetch_request(ajax_core_request, "POST", ez_save_asset_data_req, send_data);
    
    //* 에셋 저장이 완료되면 추가 가능한 에셋에 에셋 추가해주기
    if (response.status == 200 ) {

        //* 저장 후에 테이블 저장에 사용된 토핑 테이블 삭제
        const name_input  = save_form.querySelector("input[name=asset_name]");
        const saved_tbody = save_form.querySelector("tbody");
        const saved_table = saved_tbody.parentElement;
        
        saved_table.style.display = "none";
        name_input.value ="";
        remove_all_child_nodes(saved_tbody);
        //* 저장된 에셋 아이템 추가하기(삭제된 검색 조건에서는 추가 X)
        const applicable_asset_box     = document.querySelector(`#applicable_${event_type}_asset`);

        applicable_asset_box.insertAdjacentHTML("afterbegin", response.data.asset_item_ui); 

        return response.status;
    }

    alert(response.data.message);
    return response.status;
}

async function on_update_asset(e, ez_layout_name, asset_idx, content_type, event_type) {
    e.preventDefault();
    const modify_form     = e.currentTarget;
    const asset_form_data = serialize_asset_form_data(modify_form);
    const asset_name      = asset_form_data.asset_name;
    const topping_data    = asset_form_data.topping_data;
    const asset_items     = document.querySelectorAll(`[data-asset_idx="${asset_idx}"]`);
    const applied_config  = { pc: false, mobile: false };
    asset_items.forEach((element) => {
        if (element.id.includes("applicable")) return;
        element.id.includes("pc") ? applied_config.pc = true : applied_config.mobile = true;
    });
    const send_data       = {
        ez_layout_name : ez_layout_name,
        asset_idx      : asset_idx,
        asset_name     : asset_name,
        event_type     : event_type,
        topping        : topping_data,
        content_type   : content_type,
        applied_config : applied_config
    }
    const response        = await fetch_request(ajax_core_request, "POST", ez_update_asset_data_req, send_data);

    if (response.status == 200) {
        asset_items.forEach((element) => {
            if (element.id.includes("applicable")) element.parentElement.prepend(element);
            element.outerHTML = element.id.includes("pc") ?  response.data.pc_asset_item_ui : response.data.mobile_asset_item_ui;
        })
        remove_asset_update_form(event_type);
        return;
    }
    alert(response.data.message);
}

async function on_apply_ez_assets(e, ez_layout_name, module_idx, target_path) {
    e.preventDefault();

    const asset_idx_list      = [];
    const new_asset_idx_list  = [];
    const url = window.location.href;
    
    const applied_asset_boxes = document.querySelectorAll(`.applied_asset_box`);
    applied_asset_boxes.forEach((applied_asset_box) => {
        Array.from(applied_asset_box.children).forEach((element) => asset_idx_list.push(Number(element.dataset.asset_idx)));
    })
    const new_asset_list = asset_idx_list.filter((asset_idx) => {
        if (!applied_assets.includes(asset_idx)) new_asset_idx_list.push(asset_idx);
    })

    const pc_asset_idx_list = [];
    const mo_asset_idx_list = [];
    const event_type = ["base", "click", "hover"];
    event_type.forEach((type) => {
        const applied_asset_pc = document.querySelectorAll(`#applied_${type}_asset_pc .target_asset`);
        const applied_asset_mo = document.querySelectorAll(`#applied_${type}_asset_mobile .target_asset`);
        applied_asset_pc.forEach((asset) => { pc_asset_idx_list.push(Number(asset.dataset.asset_idx)); });
        applied_asset_mo.forEach((asset) => { mo_asset_idx_list.push(Number(asset.dataset.asset_idx)); });
    });

    const ez_layout_asset_list_wrap = document.getElementById('ez_layout_asset_list_wrap');
    const is_new_ez = ez_layout_asset_list_wrap.dataset.is_new_ez == 'Y' ? true : false;


    const send_data = {
        module_idx         : module_idx,
        target_path        : target_path,
        pc_asset_idx_list  : pc_asset_idx_list,
        mo_asset_idx_list  : mo_asset_idx_list,
        new_asset_idx_list : new_asset_idx_list,
        is_new_ez          : is_new_ez,
        url
    }

    const response = await fetch_request(ajax_core_request, "POST", ez_apply_assets_individual_req, send_data);
    if (response.status == 200) {
        const module_ui = response.data.module_ui;
        if(is_new_ez) {
            new_update_ez_module(ez_layout_name, module_idx, module_ui);
        } else {
            update_ez_module(ez_layout_name, module_idx, module_ui);
        }
        ez_layout_asset_list_wrap.dataset.is_new_ez == 'N';
        return;
    }
    alert("현재 스타일 에셋 적용 기능이 동작하지 않습니다. 개발팀에 문의 바랍니다.");
}

async function on_apply_all_ez_assets(e, ez_layout_name, object_order, target_device, module_idx, target_path) {
    if (!confirm("해당 스타일을 각 개체마다 적용하시겠습니까?")) return;
    const asset_idx_list = get_applied_assets(target_device);
    const url = window.location.href;
    const send_data = {
        target_device      : target_device,
        module_idx         : module_idx,
        target_path        : target_path,
        object_order       : object_order,
        asset_idx_list     : asset_idx_list,
        url
    }
    const response = await fetch_request(ajax_core_request, "POST", ez_apply_assets_all_req, send_data);
    if (response.status == 200) {
        const module_ui = response.data.module_ui;
        update_ez_module(ez_layout_name, module_idx, module_ui);
        return;
    }
}

function get_applied_assets(target_device) {
    const asset_idx_list      = [];
    
    const applied_asset_boxes = document.querySelectorAll(`.${target_device}_applied_asset_box`);
    applied_asset_boxes.forEach((applied_asset_box) => {
        Array.from(applied_asset_box.children).forEach((element) => asset_idx_list.push(Number(element.dataset.asset_idx)));
    })
    return asset_idx_list;
}

function on_cancel_asset_modification (e, event_type) {
    const submit_box         = document.querySelector(`#ez_submit_${event_type}_asset_tab_content`)
    const save_form          = submit_box.children[1]; // 기존 에셋 저장 form
    const target_cancel_form = submit_box.children[0]; // 수정 취소한 form
    
    save_form.style.display = "block";
    target_cancel_form.remove();
}

function custom_listener(value) {
    $("#custom_input_value").attr("name", value);
}

function on_add_topping(e) {
    e.preventDefault();
    const current_target    = e.currentTarget;
    const current_target_id = current_target.getAttribute("id");
    const tab_box           = document.querySelector("#ez_save_asset_tab");
    const active_tab        = tab_box.querySelector(".active");
    const asset_type        = active_tab.dataset.mode;
    const active_tbody      = document.querySelector(`#asset_option_tbody_${asset_type}`)
    active_tbody.parentElement.style.display="table"; // 테이블 태그 display 보여주기

    const form_data         = $(current_target).serializeArray();

    //* 2021-11-23 13:06:08 동환
    //* topping 추가됐을시 안의 input value 초기화
    const current_topping_input = document.querySelectorAll("#" + current_target_id + " input");
    for(let i = 0; i < current_topping_input.length; i++){
        if (!form_data[i]) {
            continue;
        }
        if(!form_data[i]["name"] == "unit"){
            current_topping_input[i].value = "";
        }
    }
    let topping_name    = "";
    let topping_value   = "";
    let input_html      = "";
    let name;

    let hex_data    = "";
    let alpha_data  = "";

    form_data.map(data => {
        name = data["name"];
        const value = data["value"];
        input_html += `<input name="${name}" value="${value}" />`

        //* 2021-11-05 12:48:52 동환 개별토핑추가시 color, color-opacity 예외처리
        if((!name.includes("-color") && (name.includes("color") || name.includes("-opacity")) && !name.includes("box-shadow"))){

            if(!name.includes("-opacity")){

                topping_name    = name;
                hex_data        = value;
                
            } else {

                alpha_data = value;
            }

            if(alpha_data == 1){

                topping_value = hex_data;
            } else {
                topping_value = ez_hexToRGB(hex_data, alpha_data);
                
                if(topping_value.includes('NaN')) topping_value = hex_data;
            }
        } else {
            if(name.includes("box-shadow-color") && name.includes("box-shadow-color-opacity")){

                alpha_data = value;

                if(alpha_data == 1){
                    topping_value += hex_data;
                } else {
                    hex_data = topping_value.split(" ")[4];
                    topping_value += ez_hexToRGB(hex_data, alpha_data);
                    topping_sp = topping_value.split(" ")[4];
                    topping_remove = topping_sp.substr(0, 7);
                    topping_value = topping_value.replace(topping_remove, "");
                }
                name = data["name"].replace("-color-opacity", "");
                input_html = '<input name="box-shadow" value="'+topping_value+'" />';
            }
            else{
                topping_value += value;
            }

            if (!name.includes("unit") && !name.includes("radius")){
                topping_name = name;
            } else if(name.includes("radius")){
                topping_name = "border-radius";
            }

            //* 2021-10-28 16:54:48 지수 box-shadow 예외처리
            if(name == "box-shadow-color-opacity"){
                topping_name = "box-shadow";
                $(".hex").attr("active", "on");
            }
            else{
                $(".hex").attr("active", "off");
            }
        }
    });

    const duplicate_table = active_tbody.querySelector(`input[name="${name}"]`)
    if (duplicate_table) duplicate_table.parentElement.parentElement.remove();

    active_tbody.insertAdjacentHTML("beforeend", `
        <tr style="width:100%;">
            <th class="w30p no_white_space">${topping_name}</th>
            <td>${topping_value}</td>
            <td style="display:none;">${input_html}</td>
            <td style="text-align:right!important"><span class="material-icons-outlined clickable_icon" onclick="on_remove_topping(event)">cancel</span></td>
        </tr>
    `);
}

function add_all_changed_topping(e, topping_type){
    e.preventDefault();

    const save_form = document.querySelectorAll(".ez_config_" + topping_type + " .ez_topping_form"); //* 현재 설정타입 form모음(ex: 크기설정, 여백설정 등)

    let current_form    = "";
    let current_topping = "";
    let save_topping    = new Array;

    for(let i = 0; i < save_form.length; i++){

        current_form    = save_form[i];
        current_topping = $(current_form).serializeArray();

        let check_result = check_topping_data(current_topping);

        if(check_result == true) save_topping.push(current_topping);
    }

    const tab_box           = document.querySelector("#ez_save_asset_tab");
    const active_tab        = tab_box.querySelector(".active");
    const asset_type        = active_tab.dataset.mode;
    const active_tbody      = document.querySelector(`#asset_option_tbody_${asset_type}`)

    let topping_table = "";

    for(let i = 0; i < save_topping.length; i++){

        topping_table += make_topping_table(save_topping[i]);
    }

    active_tbody.parentElement.style.display="table";
    active_tbody.insertAdjacentHTML("beforeend", topping_table);
}

function check_topping_data(topping){

    let check = true;

    for(let i = 0; i < topping.length; i++){

        if(topping[i].value == "") check = false;
    }

    return check;
}

function make_topping_table(topping){

    let topping_name    = "";
    let topping_value   = "";

    let table_name      = "";
    let table_value     = "";

    //* color 함쳐주기 위함
    let hex_data    = "";
    let alpha_data  = "";
    let color       = "";
    
    let input_html      = "";
    let topping_table   = "";

    for(let i = 0; i < topping.length; i++){

        topping_name    = topping[i].name;
        topping_value   = topping[i].value;

        input_html += `<input name="${topping_name}" value="${topping_value}" />`;

        //* color는 따로 만듬 - rgba를 위함
        if(!topping_name.includes("opacity") && !topping_name.includes("color") || topping_name == "opacity"){

            //* size와 size_unit을 합쳐줌
            if(!topping_name.includes("unit") && !topping_name.includes("radius")){
                table_name = topping_name;
            } else if(topping_name.includes("radius")){
                table_name = "border-radius";
            }
            table_value += topping_value;

            topping_table = `
                <tr style="width:100%;">
                    <th class="w30p no_white_space">${table_name}</th>
                    <td>${table_value}</td>
                    <td style="display:none;">${input_html}</td>
                    <td style="text-align:right!important"><span class="material-icons-outlined clickable_icon" onclick="on_remove_topping(event)">cancel</span></td>
                </tr>
            `;
        } else {

            if(!topping_name.includes("opacity")) table_name = topping_name;
            //* 2021-10-28 16:54:48 지수 box-shadow 예외처리
            if(table_name == "box-shadow-color"){
                table_name = "box-shadow";
            }

            if(topping_name.includes("opacity")){

                alpha_data = topping_value;
            } else if(topping_name.includes("color")){

                hex_data = topping_value;
            }
        }
    }

    if(alpha_data != "1" && hex_data){
        //* 2021-10-28 16:54:48 지수 box-shadow 예외처리
        if(table_name == "box-shadow"){
            table_value = table_value + ez_hexToRGB(hex_data, alpha_data);
            input_html = '<input name="box-shadow" value="'+table_value+'" />';
        }
        else{
            table_value = ez_hexToRGB(hex_data, alpha_data);
        }

    } else if(alpha_data == "1"){
        //* 2021-10-28 16:54:48 지수 box-shadow 예외처리
        if(table_name == "box-shadow"){
            table_value = table_value + hex_data;
        }
        else{
            table_value = hex_data;
        }
    }

    topping_table = `
        <tr style="width:100%;">
            <th class="w30p no_white_space">${table_name}</th>
            <td>${table_value}</td>
            <td style="display:none;">${input_html}</td>
            <td style="text-align:right!important"><span class="material-icons-outlined clickable_icon" onclick="on_remove_topping(event)">cancel</span></td>
        </tr>
    `;

    return topping_table;
}

function ez_hexToRGB(hex, alpha){
    let r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);
        
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
}

function hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
}

function on_remove_topping(e) {
    const target_topping = e.currentTarget.parentElement.parentElement; //* topping <tr> 태그
    const target_tbody   = target_topping.parentElement; //* topping들을 감싸는 <tbody> 태그
    
    target_topping.remove();
    if (target_tbody.children.length == 0) target_tbody.parentElement.style.display = "none";
}

function add_ez_layout(e, secukey, setboxLoad, secuarr, siteTokenNum){
    e.preventDefault();
    
    var ez_total_layout_wrap  = document.querySelector("#ez_total_layout");
    var theme_sidebar         = document.getElementById("ez_layout_theme_sidebar");
    ez_total_layout_wrap.style.left = "0px";
    theme_sidebar.classList.remove("active");
    
    mir_assist_callDynamicEx({'secukey': secukey,'mode':'html','node':'ez_total_layout','cpinfo': siteTokenNum,'arrset':{'secuarr1': secuarr}});
}

function close_ez_layout(e, setboxLoad){
    e.preventDefault();

    const ez_total_layout_wrap          = document.querySelector(".ez_total_layout");
    const ez_layout_version_wrap        = document.querySelector(".ez_layout_ver");
    const ez_layout_sub_version_wrap    = document.querySelector(".ez_layout_sub_ver");
    const ez_total_layout_btn 	        = document.querySelector(`.total_layout_btn_${setboxLoad}`);
    const ez_adm_setting_box            = document.querySelector(".mir_admpanel.ez_adm_setting_box.scroll_fixed");

    ez_total_layout_btn.removeAttribute("disabled");
    ez_total_layout_wrap.style.left = "-220px";
    ez_layout_sub_version_wrap.style.left = "-1020px";
    ez_adm_setting_box.classList.add("disBlock");
    ez_layout_version_wrap.style.left = "-340px";
}

function serialize_asset_form_data(form_element) {
    const form_data  = $(form_element).serializeArray();
    let asset_name;
    const topping_data = {};

    //* 토핑이 없는 경우
    if (form_data.length === 1) {
        confirm("토핑을 추가해주세요.");
        return;
    }

    form_data.map((data) => {
        const name = data["name"];
        const value = data["value"];
        if (name == "asset_name") {
            asset_name = value;
            return;
        }
        topping_data[name] = data["value"];
    })
    return {asset_name : asset_name, topping_data: topping_data};
}

function box_sizing_prefix(e){
    e.preventDefault();

    const webkit    = document.getElementById("box_sizing_webkit");
    const moz       = document.getElementById("box_sizing_moz");

    let value = e.currentTarget.value;

    webkit.setAttribute("value", value);
    moz.setAttribute("value", value);
}

function update_ez_module(ez_layout_name, module_idx, module_ui) {
    let module          = document.querySelector(`#box_module_${ez_layout_name}_${module_idx}_wrap`);

    $(module).replaceWith(module_ui);
    exec_script(module_ui);
    module              = document.querySelector(`#box_module_${ez_layout_name}_${module_idx}_wrap`);
    activate_module_adm(module);
    load_mobile_version(module_idx, ez_layout_name, true);
    move_mir_adm_panel_wrap();
}

function move_mir_adm_panel_wrap() {
    const mir_admpanel_list = document.querySelectorAll(".mir_admpanel.mir_admpanel.adm_panel_wrap");
    mir_admpanel_list.forEach((item) => {
        const item_x = item.getBoundingClientRect().x;
        if(item_x < 44) {
            item.style.left = "50px";
        }
    });
}

function add_ez_module(layout_idx, module_ui) {
    const layout = document.querySelector(`#layout_${layout_idx}`);

    $(layout).append(module_ui);
    const module = layout.lastChild;
    activate_module_adm(layout.lastChild);
}

function activate_module_adm(module) {

    const mir_admpanels = module.querySelectorAll(".mir_admpanel");
    const adm_tab_box   = document.getElementById("ez_adm_setting_tab_box");
    const active_tab    = adm_tab_box.querySelector(".active");

    active_tab.click();
    mir_admpanels.forEach((element) => {
        if (!element.classList.contains("disBlock")) element.classList.add("disBlock");
    });
}

function remove_ez_edit_modal() {
    const modal_box = document.querySelector("#ez_modal_box");
    remove_all_child_nodes(modal_box);
}

function remove_asset_update_form(event_type) {
    const asset_submit_box = document.querySelector(`#ez_submit_${event_type}_asset_tab_content`);
    asset_submit_box.children[1].style.display = "block";
    asset_submit_box.children[0].remove();
}

function topping_unit_change(e, device){
    e.preventDefault();

    const ez_unit_select = document.querySelectorAll(".ez_unit_select");

    for(let i = 0; i < ez_unit_select.length; i++){

        if(device == "mobile"){

            ez_unit_select[i].options.selectedIndex = 2;
        } else if(device == "pc"){
            
            ez_unit_select[i].options.selectedIndex = 0;
        }
    }
}

function on_image_file_select(e, module_idx, device="pc") {
    e.preventDefault();

    var tgt = e.target || window.event.srcElement,
    files = tgt.files;

    if (FileReader && files && files.length) {
        var fr = new FileReader();
        fr.onload = function () {
            if(document.getElementById("edit_modal_image_preview_image_" + module_idx) == null) {
                if(device=="pc") {
                    document.querySelector(".edit_modal_image_preview_" + module_idx).setAttribute("data-idx", "");
                    document.querySelector(".edit_modal_image_preview_" + module_idx + " > img").src = fr.result;
                } else {
                    document.querySelectorAll(".edit_modal_image_preview_" + module_idx)[1].setAttribute("data-idx", "");
                    document.querySelectorAll(".edit_modal_image_preview_" + module_idx + " > img")[1].src = fr.result;
                }
            } else {
                if(device=="pc") {
                    document.getElementById("edit_modal_image_preview_image_" + module_idx).src = fr.result;
                } else {
                    document.getElementById("edit_modal_image_preview_image_" + module_idx)[1].src = fr.result;
                }
            }
        }
        
        fr.readAsDataURL(files[0]);
    }
}

async function addImageLoad(e, module_idx, target){
    e.preventDefault();

    let call_danamic_target = target.replace("#", "");
    let node = document.querySelector(target);

    const  data = {
        module_idx  : module_idx,
        target      : target
    }
    const response = await fetch_request(ajax_core_request, "POST", ez_add_image_req, data, false);
    $("#ez_modal_box").append(response.data);
}

function on_image_active(e, module_idx){
    e.preventDefault();

    const add_image_line = document.querySelectorAll(".add_image_line_" + module_idx);

    for(let i = 0; i < add_image_line.length; i++){
        add_image_line[i].classList.remove("image_active");
    }

    e.currentTarget.classList.add("image_active");

    let file_path           = e.currentTarget.dataset.file_path;
    let file_size           = e.currentTarget.dataset.file_size;
    let file_source_name    = e.currentTarget.dataset.source_name;

    const add_image_data_input = document.getElementById("add_image_data_input");

    const add_image_source_name = document.querySelector(".add_image_source_name");
    const add_image_path        = document.querySelector(".add_image_path");
    const add_image_size        = document.querySelector(".add_image_size");

    add_image_data_input.dataset.file_path          = file_path;
    add_image_data_input.dataset.file_size          = file_size;
    add_image_data_input.dataset.file_source_name   = file_source_name;

    add_image_source_name.innerHTML = file_source_name;
    add_image_path.innerHTML        = file_path;
    add_image_size.innerHTML        = file_size;
}

async function on_add_slider_page_modal(module_idx, ez_layout_name, target_key, encoded_data) {
    const mobile_modal_box = document.querySelector("#ez_mobile_view_box");
    const mobile_module    = mobile_modal_box.querySelector(`#box_module_${ez_layout_name}_${module_idx}_wrap`);
    const module_box       = mobile_module ? mobile_modal_box : document;
    const pagination_box = module_box.querySelector(`.splide_pagination_${target_key}`);
    const pages          = pagination_box.querySelectorAll(".splide__pagination__page");
    const custom_pages   = pagination_box.querySelectorAll(".pagination_custom_unset");
    
    if (custom_pages.length >= pages.length) {
        alert("현재 슬라이드 페이지 보다 커스텀 페이지 개수가 많습니다.\n 커스텀 페이지 순서를 변경해보세요.");
        return;
    }
    const response = await fetch_request(ajax_core_request, "POST", ez_add_slider_page_modal_req, encoded_data);
    
    if (response.status == 200) {
        const modal_ui  = response.data.modal_ui;
        $("#ez_modal_box").html(modal_ui);
        return;
    }
    alert("커스텀 페이지네이션 추가 기능이 동작하지 않습니다. 개발팀에 문의바랍니다.");
}

function on_edit_pagination_asset(module_idx, ez_layout_name, target_key, encoded_data) {
    const mobile_modal_box = document.querySelector("#ez_mobile_view_box");
    const mobile_module    = mobile_modal_box.querySelector(`#box_module_${ez_layout_name}_${module_idx}_wrap`);
    const module_box       = mobile_module ? mobile_modal_box : document;
    const pagination_box = module_box.querySelector(`.splide_pagination_${target_key}`);
    const custom_pages   = pagination_box.querySelectorAll(".pagination_custom_unset");
    
    if (custom_pages.length == 0) {
        alert("커스텀 페이지네이션의 에셋을 수정하기 위해서는 페이지(불릿)을 최소 1개 이상 추가해야합니다.");
        return;
    }
    request_edit_asset(encoded_data);
}

function on_module_list_view_change(event, fetch_type){

    const view_btn              = document.querySelectorAll(".module_list_view_btn");
    const module_item_list_wrap = document.querySelectorAll(".module_item_list_wrap");
    const visible_adm_panel     = document.querySelector(".ez_visible");

    if(visible_adm_panel) visible_adm_panel.classList.remove("ez_visible");

    for(let i = 0; i < view_btn.length; i++){
        view_btn[i].dataset.fetch_type = fetch_type;
    }

    for(let i = 0; i < module_item_list_wrap.length; i++){
        if(!module_item_list_wrap[i].classList.contains("disNone"))module_item_list_wrap[i].classList.add("disNone");
    }
}

async function on_module_item_list_print(e, module_idx, target_device){
    e.preventDefault();

    const fetch_type            = e.currentTarget.dataset.fetch_type;

    if(fetch_type == "module" || e.currentTarget.classList.contains("active")){

        e.currentTarget.classList.remove("active");

        const module_item_list_wrap = document.getElementById("module_item_list_" + module_idx);

        module_item_list_wrap.classList.add("disNone");
    } else {

        e.currentTarget.classList.add("active");

        if(fetch_type != ""){
            const module_item_wrap = document.getElementById("module_item_list_" + module_idx);

            module_item_wrap.classList.remove("disNone");

            let data = {
                module_id       : module_idx,
                target_device   : target_device,
                fetch_type      : fetch_type
            }

            const response = await fetch_request(ajax_core_request, "POST", ez_fetch_all_req, data);

            if(response.status == 200){

                $(module_item_wrap).html(response.data.print_result);
            }
        }
    }
}

function on_module_item_enter(target_key){

    let target = document.querySelector("#" + target_key + ">.adm_panel_background");

    target.classList.add("ez_setting_active");
    target.style.visibility = "visible";
    target.style.opacity = 1;
}

function on_module_item_leave(target_key){

    let target = document.querySelector("#" + target_key + ">.adm_panel_background");

    target.removeAttribute("style");
}

function on_module_item_adm_panel_view(e, target_key, module_id){

    const visible_adm_panel = document.querySelector(".ez_visible");

    if(visible_adm_panel) visible_adm_panel.classList.remove("ez_visible");

    let target = document.querySelector("#" + target_key + ">.new_admpanel");

    if(!e.currentTarget.classList.contains("active")){
        const active_module_item = document.querySelector(".module_item_key.active");
        if(active_module_item) active_module_item.classList.remove("active");

        e.currentTarget.classList.add("active");
        target.classList.add("ez_visible");
    } else {
        e.currentTarget.classList.remove("active");
        target.classList.remove("ez_visible");
    }
}

function check_target_device(module_idx) {
    const mobild_modal = document.querySelector("#ez_mobile_view_box");
    const mobild_module = mobild_modal.querySelector(`#ez_edit_modal_${module_idx}_wrap`);
    return mobild_module ? "mobile" : "pc";
}

function display_module_title_setting_modal(e) {
    e.preventDefault();
    e.stopPropagation();

    const btn   = e.currentTarget;
    const modal = btn.parentElement.querySelector(".module_title_setting_modal");

    modal.classList.toggle("disNone");
}

function update_module_title(e, module_idx) {
    e.preventDefault();
    e.stopPropagation();

    const btn           = e.currentTarget;

    btn.disabled = true;

    const input         = btn.parentElement.querySelector(".mir_input[name=\'module_title\']");
    const module_title  = input.value;
    const before_value  = input.dataset.before_value;

    if(module_title == before_value) {

        btn.disabled = false;
        
        return alert("기존 모듈이름과 같습니다");
    }

    const url           = window.location.search;
    const url_params    = new URLSearchParams(url);
    const mir_code = url_params.get("mir_code");

    const send_data = { module_title, mir_code, module_idx };
    ajax_request(ajax_core_request, "POST", update_module_title_req, send_data, (status, data) => {

        btn.disabled = false;

        if(status == 200) {

            alert("모듈 이름이 수정되었습니다");

            return;
        }

        console.error("모듈 이름 변경 실패");
        console.error(data);
    });
}

function on_setbox_copy(menucode){
    var target = prompt("복사할 세트박스 번호를 입력해주세요", "ex)394129");

    var data = {
        menucode : menucode,
        target_setbox : target
    }

    ajax_request(ajax_core_request, "POST", setbox_copy_req, data, function (status, data){
        if (status == 200) {
            window.location.reload()
            alert("붙여넣기 완료");
            return;
        }
        alert(data.message);
    });
}

function on_setbox_save_modal(wr_id){

    if(wr_id == "") return alert("세트박스 번호가 존재하지 않습니다.");

    var module_list = document.querySelectorAll('.layout_content>div');
    var images = {};
    var regex = /[^0-9]/g; 
    var processed = 0;
    var module_idx;

    const tez_setting_menu  = document.querySelectorAll('.tez_setting_menu');
    const mir_admpanel      = document.querySelectorAll('.adm_mode_btn');
    const ez_devive_list_module_setting = document.querySelectorAll('.ez_devive_list_module_setting');
    for(let el of tez_setting_menu){
        el.style.display = "none";
    }
    for(let el of mir_admpanel){
        el.classList.remove("disBlock");
    }
    for(let el of ez_devive_list_module_setting){
        el.style.display = "none";
    }

    module_list.forEach((module) => { //* 각 모듈별로 썸네일 생성
        html2canvas(module, {
            windowWidth: document.documentElement.offsetWidth,
            windowHeight: document.documentElement.offsetHeight

        }).then(function(canvas) {
            
            module_idx = module.id.replace(regex,"");
            images[module_idx] = canvas.toDataURL();
            processed++;
            
            if(processed === module_list.length) { //* 모든 썸네일이 만들어지면

                for(let el of tez_setting_menu){
                    el.style.display = "block";
                }
                for(let el of mir_admpanel){
                    el.classList.add("disBlock");
                }
                for(let el of ez_devive_list_module_setting){
                    el.style.display = "block";
                }

                const data = {
                    wr_id : wr_id,
                    images : images
                };

                ajax_request(ajax_core_request, "POST", on_setbox_save_modal_req, data, function (status, data){
                    if (status == 200) {
                        $('#ez_modal_box').html(data.print_html);
                        return;
                    }
                    alert("세트박스 저장 기능이 작동하지 않습니다. 개발팀에 문의바랍니다.");
                });
            }
        });
    });
    
}

function ez_DragModal(modal) {
    let X1 = null;
    let Y1 = null;
    let X2 = null;
    let Y2 = null;

    //* 타이틀 부분을 드래그 했을 때 이동되도록
    const modal_title = modal.querySelector("div:first-child");
    modal_title.addEventListener("mousedown", _mouseDown);

    function _mouseDown(e) {
        e.preventDefault();
        e.stopPropagation();

        X1 = e.clientX;
        Y1 = e.clientY;

        modal.addEventListener("mousemove", _mouseMove);
        modal.addEventListener("mouseup", _mouseUp);
    }

    function _mouseMove(e) {
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

function get_save_ez_struct_modal(e, adm_panel_data) {

    const btn = e.currentTarget;
    close_new_ez_adm_panel(e);

    button_click_switch(btn, true);

    const send_data = { adm_panel_data };

    ajax_request(ajax_core_request, "POST", get_save_ez_struct_modal_req, send_data, (status, data) => {

        button_click_switch(btn, false);

        if(status == 200) {

            $("#ez_modal_box").html(data.print_html);

            return;
        }

        console.error(data);
    });
}

function save_ez_struct(e, adm_panel_data, is_shared, target, module_idx, layout_name, ez_type, module_division) {

    const struct_name = document.getElementById("ez_struct_name_input").value;
    
    if(!struct_name) return alert("구조 이름을 입력해주세요.");

    const formData = new FormData();

    //g categories
    const selected_categories_list = document.querySelectorAll(".selected_struct_categories_item input");
    for(const selected_categories of selected_categories_list) {

        const categories = selected_categories.value;

        formData.append("categories[]", categories);
    }

    const save_tag_wrap = document.querySelector("#save_ez_struct_tag_list_wrap");
    const tag_item_list = save_tag_wrap.querySelectorAll(".ez_struct_tag_wrap");

    const tag_list = [];
    tag_item_list.forEach((el) => {
        tag_list.push(el.dataset.tag_name);
    });

    formData.append("tag_list", JSON.stringify(tag_list));

    let hW = 0;
    let cW = 0;
    let capture_target;
    //g capture
    if(ez_type == 'object' || ez_type == 'module') {
        capture_target = document.querySelector("#" + target);
    } else {
        capture_target = document.querySelector("#" + module_division + '_' + target);
    }

    if(capture_target) {
        cW = capture_target.offsetWidth;
    } else {
        capture_target = document.querySelector("#md_" + module_idx);
        capture_target = document.querySelector("#box_module_" + layout_name + "_" + module_idx + "_wrap");

        // 모듈 크기 캡쳐 1400 고정
        cW = capture_target.offsetWidth;
        if(cW > 1400) {
            hW = (cW - 1400) / 2;
            cW = 1400;
        }
    }

    close_new_ez_adm_panel(e);

    html2canvas(capture_target, {
        scrollX         : -hW,
        scrollY         : -window.scrollY,
        width           : cW,
        windowWidth     : document.documentElement.offsetWidth,
        windowHeight    : document.documentElement.offsetHeight,
        useCORS         : true
    }).then(function(canvas) {
        formData.append("pc_thumbnail", canvas.toDataURL());
        formData.append("secukey", ez_save_new_struct_req);
        formData.append("custom_name", struct_name);
        formData.append("is_shared", is_shared);
        formData.append("adm_panel_data", adm_panel_data);

        //g 모바일 캡쳐 함수
        let mobile_callback = function(mutationList, observer) {

            let mob_capture_target = document.querySelector("#ez_mobile_view_box #" + target);
            if(!mob_capture_target) mob_capture_target = document.querySelector("#ez_mobile_view_box #box_module_" + layout_name + "_" + module_idx + "_wrap");

            html2canvas(mob_capture_target, {
                scrollX     : -8,
                scrollY     : 0,
                useCORS     : true
            }).then(function(mcanvas){
                formData.append("mobile_thumbnail", mcanvas.toDataURL());
                $.ajax({
                    url         : "/_mir/plugin/assist.ajax.core.php",
                    type        : "POST",
                    data        : formData,
                    processData : false,
                    contentType : false,
                    async       : true,
                    cache       : false
                }).complete(function(data) {
                    observer.disconnect();
        
                    new mirMessage({
                        pos     : "br",
                        mode    : "success",
                        type    : "toast",
                        title   : "성공!",
                        text    : "저장이 완료되었습니다."
                    }).show();
        
                    $("#ez_mobile_view_box").html("");
                    mir_close_modal();
                });
            });
        };

        //g pc 캡쳐 후 mobile observer 적용, 모바일버전 load
        const mb_target         = document.querySelector("#ez_mobile_view_box");
        const obs_config        = {childList: true};
        const observer          = new MutationObserver(mobile_callback);

        observer.observe(mb_target, obs_config);
        load_mobile_version(module_idx, layout_name);
    });
}

function display_add_struct_category_modal(mode) {

    const modal                         = document.getElementById("add_struct_category_modal");
    const overlay                       = document.getElementById("add_struct_category_modal_overlay");
    const search_input                  = document.getElementById("ez_struct_category_search_input");
    const hrchy_order_title             = document.getElementById("struct_hrchy_order_title");
    const selected_category_item_wrap   = document.getElementById("selected_struct_category_item_wrap");
    const loading                       = modal.querySelector(".mir_loading_box");
    const category_target               = modal.dataset.category_target;
    const category_type                 = category_target == "object" ? 5 : 6;

    if(mode == "on") {

        modal.classList.remove("disNone")
        overlay.classList.remove("disNone");
        loading.classList.remove("disNone");

        //* 모달 초기화
        search_input.placeholder           = "1차 분류 입력 후 Enter";
        search_input.dataset.parent_idx    = "";
        search_input.dataset.hrchy_order   = 1;

        //* hrchy_order title 초기화
        hrchy_order_title.textContent = "1차 분류";

        //* 선택한 분류영역 초기화
        remove_all_child_nodes(selected_category_item_wrap);

        //* 분류 검색
        get_ez_struct_category(1, 10, category_type);
    } else {

        modal.classList.add("disNone");
        overlay.classList.add("disNone");
        loading.classList.add("disNone");
    }
}

function get_ez_struct_category(target_page = 1, limit = 10, module_type = 5) {

    const input         = document.getElementById("ez_struct_category_search_input");
    const name          = input.value;
    const hrchy_order   = input.dataset.hrchy_order;
    const parent_idx    = input.dataset.parent_idx;

    const pagination    = document.getElementById("ez_struct_category_search_result_pagination");
    const search_result = document.getElementById("ez_struct_category_search_result");
    const loading       = document.querySelector("#ez_struct_category_search_result_wrap .mir_loading_box");

    remove_all_child_nodes(pagination);
    remove_all_child_nodes(search_result);
    loading.classList.remove("disNone");

    const send_data = { name, hrchy_order, page: target_page, limit, parent_idx, module_type };
    ajax_request(ajax_core_request, "POST", get_ez_struct_category_req, send_data, (status, data) => {

        loading.classList.add("disNone");

        switch(status) {
            case 200:
                $(search_result).html(data.print_html);

                const total_count = data.total_count;

                //* 페이지네이션
                const page_event = function(page) {

                    return function() {

                        get_ez_struct_category(page, limit);
                    };
                };
                const pages         = build_pages(target_page, total_count, limit, limit, page_event);
                const pages_count   = pages.length;

                for(var i = 0; i < pages_count; i++) {

                    pagination.appendChild(pages[i]);
                }

                break;

            case 404:
                //* 404 메시지
                $(search_result).html(data.message);

                break;

            default:
                alert("분류 검색 기능이 동작하지 않습니다. 고객센터에 문의 바랍니다.");

                break;
        }
    });
}

function confirm_ez_struct_category(category_target) {

    const module_type = category_target == "object" ? 5 : 6;
    const categories                        = document.querySelectorAll(".ez_struct_category_item.active");
    const categories_count                  = categories.length;
    const ez_struct_category_search_input   = document.getElementById("ez_struct_category_search_input");
    const hrchy_order_title                 = document.getElementById("struct_hrchy_order_title");

    ez_struct_category_search_input.value = "";

    for(const category of categories) {

        const matching_key  = category.dataset.matching_key;
        const hrchy_idx     = category.dataset.hrchy_idx;
        const category_name = category.textContent;
        const hrchy_order   = Number(category.dataset.hrchy_order);
    
        //g 상위분류 여러개 선택시 input 활성화 조절
        if(categories_count <= 1) {
    
            //* input data setting
            ez_struct_category_search_input.dataset.hrchy_order   = hrchy_order + 1;
            ez_struct_category_search_input.dataset.parent_idx    = hrchy_idx;
            ez_struct_category_search_input.placeholder           = `${(hrchy_order + 1)}차 분류 입력 후 Enter`;
            ez_struct_category_search_input.disabled              = false;

            //* hrchy_order title
            hrchy_order_title.textContent = `${hrchy_order + 1}차 분류`;
    
            get_ez_struct_category(1, 10, module_type);
        } else {
    
            //* 인풋 검색불가능
            ez_struct_category_search_input.placeholder   = "하위 분류 선택 불가";
            ez_struct_category_search_input.disabled      = true;
            
            hrchy_order_title.textContent = "상위분류가 여러개 선택됐을 경우 하위분류 선택이 불가능합니다.";
            
            //* 결과영역 초기화
            const search_result = document.getElementById("ez_struct_category_search_result");
            remove_all_child_nodes(search_result);
        }
    
        const selected_category_item_wrap   = document.getElementById("selected_struct_category_item_wrap");
        const selected_category_item        = create_selected_struct_category_item(hrchy_idx, category_name, hrchy_order, category_target, matching_key);
    
        selected_category_item_wrap.appendChild(selected_category_item);
    }
}

function create_selected_struct_category_item(hrchy_idx, category_name, hrchy_order, list_target , matching_key) {

    const create_div = document.createElement("div");
    create_div.className            = "selected_struct_category_item posRel chand";
    create_div.dataset.hrchy_idx    = hrchy_idx;
    create_div.dataset.hrchy_order  = hrchy_order;
    create_div.dataset.matching_key = matching_key;
    
    const create_p = document.createElement("p");
    create_p.textContent    = category_name;
    create_p.className      = "mir_caption";

    const create_span = document.createElement("span");
    create_span.className   = "material-icons fz18 posAbs";
    create_span.textContent = "close";

    create_div.appendChild(create_p);
    create_div.appendChild(create_span);

    create_div.addEventListener("click", (e) => {

        const target                = e.currentTarget;
        const target_hrchy_order    = Number(target.dataset.hrchy_order);

        target.remove();

        const selected_categories               = document.querySelectorAll(".selected_struct_category_item");
        const same_depth                        = document.querySelectorAll(".selected_struct_category_item[data-hrchy_order=\'${target_hrchy_order}\']");
        const ez_struct_category_search_input   = document.getElementById("ez_struct_category_search_input");
        const hrchy_order_title                 = document.getElementById("struct_hrchy_order_title");

        //g 같은 depth 아이템 1개 남았을경우 해당 아이템 검색결과 display
        if(same_depth.length == 1) {
            
            //* 한개남은 같은 depth의 category hrchy_idx를 기준으로 검색
            const same_depth_hrchy_idx = same_depth[0].hrchy_idx;

            //* input data setting
            ez_struct_category_search_input.dataset.hrchy_order   = hrchy_order + 1;
            ez_struct_category_search_input.dataset.parent_idx    = same_depth_hrchy_idx;
            ez_struct_category_search_input.placeholder           = `${(hrchy_order + 1)}차 분류 입력 후 Enter`;
            ez_struct_category_search_input.disabled              = false;

            //* hrchy_order title
            hrchy_order_title.textContent = `${hrchy_order + 1}차 분류`;

        } else if(same_depth.length == 0) { //g 같은 depth 아이템 모두 지웠을경우

            //* 하위 depth 아이템 모두 삭제
            for(const selected_category of selected_categories) {

                const current_hrchy_order = selected_category.dataset.hrchy_order;

                if(Number(current_hrchy_order) > target_hrchy_order) selected_category.remove();
            }

            //* depth1이 아니고 parent_category가 있을경우 부모분류검색결과 display
            if(target_hrchy_order != 1) {

                const parent_category   = document.querySelector(`.selected_struct_category_item[data-hrchy_order="${(target_hrchy_order - 1)}"]`);
                const parent_idx        = parent_category.dataset.hrchy_idx;

                ez_struct_category_search_input.dataset.parent_idx = parent_idx;
            } else {
                
                ez_struct_category_search_input.dataset.parent_idx = "";
            }

            //* input data setting
            ez_struct_category_search_input.dataset.hrchy_order   = hrchy_order;
            ez_struct_category_search_input.placeholder           = `${(hrchy_order)}차 분류 입력 후 Enter`;
            ez_struct_category_search_input.disabled              = false;
            
            //* hrchy_order title
            hrchy_order_title.textContent = `${hrchy_order}차 분류`;
        }
        
        const module_type = list_target == "object" ? 5 : 6;
        get_ez_struct_category(1, 10, module_type);
    });

    return create_div;
}

function add_selected_struct_categories_item() {

    const selected_categories = document.querySelectorAll(".selected_struct_category_item");

    if(selected_categories.length == 0) return alert("추가할 분류를 선택해주세요.");

    const biggest_order = Number(selected_categories[selected_categories.length - 1].dataset.hrchy_order);

    //g 선택한 categories 아이템 생성
    create_selected_struct_categories_item(biggest_order);
}

function create_selected_struct_categories_item(biggest_order) {

    const biggest_order_items                   = document.querySelectorAll(`.selected_struct_category_item[data-hrchy_order="${biggest_order}"]`);
    const ez_struct_selected_categories_wrap    = document.getElementById("ez_struct_selected_categories");

    for(const biggest_order_item of biggest_order_items) {

        const hrchy_idx             = biggest_order_item.dataset.hrchy_idx;
        const matching_key          = biggest_order_item.dataset.matching_key;
        const category_name         = biggest_order_item.querySelector(".mir_caption").textContent;

        let selected_category_str   = category_name;
        let hrchy_idx_arr           = [hrchy_idx];
        let matching_key_arr        = [matching_key];

        //* 분류 필터아이템 생성
        for(let i = biggest_order - 1; i >= 1; i--) {

            const parent_category       = document.querySelector(`.selected_struct_category_item[data-hrchy_order="${i}"]`);
            const parent_idx            = parent_category.dataset.hrchy_idx;
            const parent_matching_key   = parent_category.dataset.matching_key;
            const parent_name           = parent_category.querySelector(".mir_caption").textContent;

            selected_category_str = `${parent_name} > ${selected_category_str}`;

            hrchy_idx_arr.unshift(parent_idx);
            matching_key_arr.unshift(parent_matching_key);
        }
        const hrchy_idx_arr_str     = JSON.stringify(hrchy_idx_arr);
        const matching_key_arr_str  = JSON.stringify(matching_key_arr);
        const same_item             = ez_struct_selected_categories_wrap.querySelector(`input[data-matching_key=\'${matching_key_arr_str}\']`);

        //* 중복된 검색분류 추가 불가
        if(same_item != null) continue;

        const create_div = document.createElement("div");
        create_div.className = `selected_struct_categories_item posRel chand mr10 mt5 mb5`;

        const create_input = document.createElement("input");
        create_input.type                   = "hidden";
        create_input.name                   = "categories";
        create_input.value                  = hrchy_idx_arr_str;
        create_input.dataset.matching_key   = matching_key_arr_str;

        const create_p = document.createElement("p");
        create_p.textContent    = selected_category_str;
        create_p.className      = "mir_normal_text";

        const create_span = document.createElement("span");
        create_span.textContent = "close";
        create_span.className   = "material-icons posAbs fz18";

        create_div.appendChild(create_p);
        create_div.appendChild(create_span);
        create_div.appendChild(create_input);

        //* 분류 필터 제거시 리스트 새로고침
        create_div.addEventListener("click", (e) => {

            e.currentTarget.remove();
        });

        ez_struct_selected_categories_wrap.appendChild(create_div);
    }
}

function get_add_on_modal(struct_type, mode, adm_panel_data, is_new_ez = false, is_snez_side_panel = false) {

    const send_data = { 
        struct_type, mode, adm_panel_data,
        target_page : 1,
        limit       : 10,
        is_new_ez,
        is_snez_side_panel
    };
    ajax_request(ajax_core_request, "POST", get_add_on_modal_req, send_data, (status, data) => {

        if(status == 200) {

            $("#ez_modal_box").html(data.print_html);

            const pagination_box    = document.getElementById("add_on_pagination_box");
            const total_count       = data.total_count;

            const page_event = (page) => {

                return () => {

                    get_add_on_content_list(page, 10, mode);
                }
            }

            const pages         = build_pages(1, total_count, 10, 10, page_event);
            const pages_count   = pages.length;
            remove_all_child_nodes(pagination_box);

            for(let i = 0; i < pages_count; i++) {

                pagination_box.appendChild(pages[i]);
            }
            return;
        }

        console.error(data);
    });
}


function get_add_on_content_list(target_page = 1, limit = 10, mode = "both") {

    const pagination_box                    = document.getElementById("add_on_pagination_box");
    const add_on_modal_content_list_inner   = document.getElementById("add_on_modal_content_list_inner");
    const loading                           = document.querySelector(".add_on_modal_content_list_wrap .mir_loading_box");

    loading.classList.remove("disNone");
    remove_all_child_nodes(pagination_box);
    remove_all_child_nodes(add_on_modal_content_list_inner);

    const send_data = build_add_on_search_config(target_page, limit, mode);
    ajax_request(ajax_core_request, "POST", get_add_on_content_list_req, send_data, (status, data) => {

        loading.classList.add("disNone");

        if(status == 200) {

            $("#add_on_modal_content_list_inner").html(data.print_html);

            //g 선택했던 컨텐츠 활성화
            const add_struct_btn        = document.getElementById("ez_add_struct_btn");
            const selected_matching_key = add_struct_btn.dataset.matching_key;
            const selected_content      = document.querySelector(`.add_on_modal_content[data-matching_key="${selected_matching_key}"]`);

            if(selected_content) selected_content.classList.add("active");

            const total_count = data.total_count;

            const page_event = (page) => {

                return () => {

                    get_add_on_content_list(page, 10, mode);
                }
            }

            const pages         = build_pages(target_page, total_count, 10, 10, page_event);
            const pages_count   = pages.length;
            remove_all_child_nodes(pagination_box);

            for(let i = 0; i < pages_count; i++) {

                pagination_box.appendChild(pages[i]);
            }
            return;
        }

        console.error(data);
    });
}

function build_add_on_search_config(target_page, limit, mode) {

    const struct_type       = document.getElementById("add_on_modal_struct_type_input").value;
    const send_data         = { target_page, limit, mode, struct_type };
    const category_config   = build_selected_struct_category_config();
    send_data.categories    = category_config;

    return send_data;
}

function build_selected_struct_category_config() {

    const category_config           = {};
    const category_wrap             = document.getElementById("add_on_category_wrap");
    const selected_category_inputs  = category_wrap.querySelectorAll("input[name='hrchy_idx']:checked");

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
        build_selected_struct_category_config_tmp(selected_category, hrchy_idx, category_config, []);
    }

    return category_config;
}

function build_selected_struct_category_config_tmp(category_el, hrchy_idx, category_config, tmp) {

    const parent_matching_key   = category_el.parentElement.dataset.parent_idx;
    const parent_el             = document.querySelector(`.add_on_category_title_wrap[data-matching_key="${parent_matching_key}"]`);
    const parent_input          = parent_el.querySelector("input[name='hrchy_idx']");
    const parent_idx            = parent_input.value

    tmp.unshift(hrchy_idx);
    if(parent_el.classList.contains("first_depth")) {

        if(!category_config.hasOwnProperty(parent_idx)) category_config[parent_idx] = [];
        if(tmp.length > 0) category_config[parent_idx].push(tmp);

        return;
    } else {

        build_selected_struct_category_config_tmp(parent_el, parent_idx, category_config, tmp);
    }
}

function add_on_content_stn_filter(e, mode) {

    const selected_btn                  = document.querySelector(".add_on_content_stn_btn_wrap .new_mir_button.active");
    const btn                           = e.currentTarget;
    
    if(selected_btn && selected_btn != btn) selected_btn.classList.remove("active");
    btn.classList.toggle("active");

    if(btn.classList.contains("active")) {

        if(mode == "shared") {

            get_add_on_content_list(1, 10, 'shared');
        } else if(mode == "stn") {

            get_add_on_content_list(1, 10, 'stn');
        }
    } else {

        get_add_on_content_list(1, 10, 'both');
    }
}

function select_add_on_content(e) {

    const struct            = e.currentTarget;
    const selected_target   = document.querySelector(".add_on_modal_content.active");
    
    if(selected_target && struct != selected_target) selected_target.classList.remove("active");

    struct.classList.toggle("active");

    const add_struct_btn = document.getElementById("ez_add_struct_btn");

    if(struct.classList.contains("active")) {

        const struct_idx        = struct.dataset.struct_idx;
        const matching_key      = struct.dataset.matching_key;

        add_struct_btn.dataset.struct_idx   = struct_idx;
        add_struct_btn.dataset.matching_key = matching_key;
    } else {

        add_struct_btn.dataset.struct_idx   = "";
        add_struct_btn.dataset.matching_key = "";
    }
}

function ez_add_struct(e, adm_panel_data, is_new_ez = false, is_snez_side_panel = false) {

    const btn           = e.currentTarget;
    const struct_idx    = btn.dataset.struct_idx;
    const struct_type   = document.getElementById("add_on_modal_struct_type_input").value;
    const url           = window.location.href;

    const send_data = { adm_panel_data, struct_idx, is_new_ez, url };
    
    let request;
    switch (struct_type) {
        case "object": request  = ez_add_object_req; break;
        case "ez_box": request  = ez_add_box_req; break;
        case "content": request = new_ez_add_content_req; break;
    }
                    
    ajax_request(ajax_core_request, "POST", request, send_data, (status, data) => {

        if(status == 200) {

            const ez_layout_name  = data.ez_layout_name;
            const module_idx      = data.module_idx;
            const module_ui       = data.module_ui;

            if(is_new_ez){
                new_update_ez_module(ez_layout_name, module_idx, module_ui);
            } else {
                update_ez_module(ez_layout_name, module_idx, module_ui);
            }
            
            if(is_snez_side_panel) on_snez_edit_panel_module_fetch(module_idx, 'Y');
            mir_close_modal();

            return;
        }

        console.error(data);
    });
}

function on_add_on_menu_accordion(e) {

    const target = e.currentTarget.closest(".add_on_category_parent");

    target.classList.toggle("active");
}

function get_adm_panel(e, adm_panel_data, style_list = "", is_active = "N") {

    const btn       = e.currentTarget;
    const wrap      = btn.parentElement;
    const adm_panel = wrap.querySelector(".adm_panel_wrap");

    if(!adm_panel) {

        btn.style.pointerEvents = 'none';

        const send_data = { adm_panel_data, style_list, is_active };
        ajax_request(ajax_core_request, "POST", get_adm_panel_req, send_data, (status, data) => {

            btn.style.pointerEvents = 'auto';
            if(status == 200) {

                $(wrap).append(data.print_html);
                return;
            }

            console.error(data);
        });
    } else {

        //* 비동기 패널 토글이벤트
        const remove_target = wrap.querySelector(".adm_panel_wrap");
                
        remove_target.classList.contains("disNone")
        ? remove_target.classList.remove("disNone")
        : remove_target.classList.add("disNone");
    }
}

async function on_save_new_layout_version_modal(e, adm_data) {
    const target_btn    = e.currentTarget;
    const module_idx    = target_btn.dataset.module_idx;
    const target_wrap   = document.getElementById("save_new_layout_setting_wrap_" + module_idx);

    if(target_wrap.classList.contains('active')) {
        target_wrap.classList.remove('active');
    } else {
        target_wrap.classList.add('active');
    }

    if(target_btn.getAttribute('active') == 'active') return; 

    const response = await fetch_request(ajax_core_request, 'POST', save_new_layout_version_req, adm_data);
    if(response.status == 200) {
        const print_html = response.data.print_html;

        if(target_btn.getAttribute('active') != 'active') $(target_wrap).html(print_html);
        target_btn.setAttribute('active', 'active'); 
    }
}

function on_layout_name_select(e, module_idx) {
    e.preventDefault();

    const current_target = e.currentTarget;

    const data = {
        module_idx,
        layout_name : current_target.value
    };

    ajax_request(ajax_core_request, 'POST', ez_fetch_version_list_req, data, function(status, data) {
        if(status == 200) {
            const select_html       = data.select_html;
            const version_select    = document.querySelector("#ez_layout_version_select_" + module_idx);

            version_select.innerHTML = select_html;
            return;
        }
        new mirMessage({
            pos     : "br",
            type    : "toast",
            mode    : "fail",
            title   : "실패!",
            text    : "버젼 리스트 호출에 실패했습니다. (ERROR_CODE: EZJS_08_2402)"
        }).show();
    });
}

async function on_save_new_layout_version(e, target_key){

    const current_target          = e.currentTarget;
    const module_idx              = current_target.dataset.module_idx;
    const adm_panel_data          = current_target.dataset.panel_data;
    const target_select           = document.getElementById("ez_layout_name_select_" + module_idx);
    const target_layout_name      = target_select.value;
    const version_select          = document.getElementById("ez_layout_version_select_" + module_idx);
    const version_idx             = version_select.value;

    const capture_target          = document.querySelector("." + target_key);
    const ez_layout_custom_name   = document.getElementById("ez_layout_custom_name_input_" + module_idx).value;
    const save_layout_wrap_bind   = document.querySelector(".save_layout_radio_wrap_" + module_idx);
    const save_layout_bind_radio  = save_layout_wrap_bind.querySelector("input[name=\"layout_save_type_"+module_idx+"\"]:checked").value;

    current_target.classList.add('peNone');

    var module_btns = ["tez_setting_menu", "module_list_view_btn", "mobile_view_btn", "change_theme_btn"];
    for(var i = 0; i< module_btns.length; i ++) {
        document.querySelectorAll('#' + module_btns[i]).forEach(function(param) {
            param.style.opacity = "0";
        });
    }

    let cW = capture_target.offsetWidth;
    let hW = 0;
    if(cW > 1400) {
        hW = (cW - 1400) / 2;
    }

    html2canvas(capture_target, {
        scrollX         : -hW,
        width           : 1400,
        scrollY         : -window.scrollY,
        windowWidth     : document.documentElement.offsetWidth,
        windowHeight    : document.documentElement.offsetHeight,
        useCORS         : true
    }).then(function(canvas) {
        
        var formData = new FormData();
        formData.append("image", canvas.toDataURL());
        formData.append("filename", "ez_layout_save.png");
        formData.append("is_base64", "Y");
        formData.append("save_path", "ez_layout_img");
        
        var send_data = {
            adm_panel_data : adm_panel_data,
            ez_layout_name : target_layout_name,
            custom_name    : ez_layout_custom_name,
            version        : version_idx,
            is_share       : save_layout_bind_radio
        }

        var mobile_view_btn = document.querySelector(".mobile_view_btn_" + module_idx);

        var mobile_callback = function(mutationList, observer) {
            var mob_capture_target = document.querySelector("#ez_mobile_view_box #" + target_key);

            html2canvas(mob_capture_target, {
                scrollX         : -8,
                scrollY         : 0,
                useCORS         : true
            }).then(function(canvas) {
                var m_formData = new FormData();
                m_formData.append("image", canvas.toDataURL());
                m_formData.append("filename", "ez_layout_save_m.png");
                m_formData.append("is_base64", "Y");
                m_formData.append("save_path", "ez_layout_img");

                $.ajax({
                    url         : "/_mir/plugin/AES.MIR.async.file_upload.php",
                    type        : "POST",
                    processData : false,
                    contentType : false,
                    data        : m_formData,
                    success     : function(file_path) {
                        send_data['thumbnail_path_m'] = file_path;

                        ajax_request(ajax_core_request, 'POST', ez_save_layout_struct_req, send_data, function(status, data){
                            if(status==200) {
                                observer.disconnect();
                                document.getElementById('ez_edit_modal_'+module_idx+'_wrap').remove();
                                current_target.classList.remove('peNone');
                                alert("레이아웃이 저장되었습니다");
                                return;
                            }
                        });
                    },
                    error       : function(data) {
                        observer.disconnect();
                    },
                    timeout     : 10000
                });
            });
        };

        var mob_target  = document.getElementById('ez_mobile_view_box');
        var obs_config  = {childList: true};
        var observer    = new MutationObserver(mobile_callback);

        observer.observe(mob_target, obs_config);
        
        $.ajax({
            url         : "/_mir/plugin/AES.MIR.async.file_upload.php",
            type        : "POST",
            processData : false,
            contentType : false,
            data        : formData,
            success     : function(file_path) {
                send_data['thumbnail_path'] = file_path;
                
                mobile_view_btn.click();
            },
            error       : function(data) {
                console.error(data);
            },
            timeout     : 10000
        });
    });

    /**
    * @author 2022-06-22 11:33:09 김성수
    * @category 모듈 저장 이후 버튼 보이게 하기
    */
    for(var i = 0; i< module_btns.length; i ++) {
        document.querySelectorAll('#' + module_btns[i]).forEach(function(param) {
            param.style.opacity = "1";
        });
    }
}

function request_view_page_modal(e, adm_data) {
    const data = {
        adm_data
    };

    ajax_request(ajax_core_request, "POST", view_page_modal_req, data, (status, data) => {
        if(status == 200) {
            const print_html = data.print_html;

            $("#ez_modal_box").html(print_html);
            return;
        }
    });
}