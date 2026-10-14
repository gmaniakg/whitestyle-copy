function init_style_group() {
    ajax_request(sg_ajax_core, 'POST', init_style_group_req, {}, (status, data) => {
        if(status == 200) {
            
            success_message("스타일 그룹 초기화에 성공했습니다");

            const sg_sidebar_save_btn = document.querySelector("#sg_sidebar_save_btn");

            sg_sidebar_save_btn.remove();

            get_space_list();
            get_color_sg_list();
            get_sg_list('text');
            get_sg_list('struct');
            return;
        }
        error_response(data.message);
    });
}

/**
 * @author 2022-09-13 11:09:51 동환
 * 
 * @category 스타일그룹 사이드바 요청
 */
function get_sg_sidebar() {

    const sidebar = document.getElementById('sg_sidebar_wrap');

    sidebar.classList.add('active');

    ajax_request(sg_ajax_core, 'POST', check_style_group_exist_req, {}, (status, data) => {
        if(status == 200) {
            
            if(data.has_sg == 'Y') {
                get_space_list();
                get_color_sg_list();
                get_sg_list('text');
                get_sg_list('struct');
            }
            return;
        }
        error_response(data.message);
    });
}

/**
 * @author 2022-09-13 11:31:36 동환
 * 
 * @category 스타일그룹 사이드바 닫기
 */
function close_sg_sidebar() {

    const sidebar = document.getElementById('sg_sidebar_wrap');

    sidebar.classList.remove('active');
}

/**
 * @author 2022-09-13 11:56:50 동환
 * 
 * @category 스타일그룹 list 요청
 * 
 * @param {String}  asset_type  : struct / text
 * @param {Number}  target_page 
 * @param {Number}  limit 
 * 
 * TODO 스타일그룹 타입 확정시 타입 많아질경우 함수분리
 */
function get_sg_list(asset_type, target_page = 1, limit = 10) {

    const sg_text_list_inner    = document.getElementById('sg_text_list_inner');
    const loading               = document.querySelector('#sg_text_list .mir_loading_box')

    remove_all_child_nodes(sg_text_list_inner);
    loading.classList.remove('disNone');

    const send_data = { page : target_page, limit, asset_type };
    ajax_request(sg_ajax_core, 'POST', get_sg_list_req, send_data, (status, data) => {

        loading.classList.add('disNone');

        if(status == 200) {

            if(asset_type == 'text') {

                $(sg_text_list_inner).html(data.print_html);

                const pagination    = document.getElementById('sg_text_list_pagination');
                const total_count   = data.total_count;
    
                //g 페이지네이션
                const page_event = function(page) {
    
                    return function() {
    
                        get_sg_list(asset_type, page, limit);
                    };
                };
    
                const pages         = build_pages(target_page, total_count, 10, limit, page_event);
                const pages_count   = pages.length;
    
                remove_all_child_nodes(pagination);
                for(let i = 0; i < pages_count; i++) {
    
                    pagination.appendChild(pages[i]);
                }
            } else if(asset_type == 'struct') {

                //g 모듈넓이 인풋, idx 적용
                const module_width_data       = data.module_width;
                const module_width_idx        = module_width_data.idx;
                const module_width            = module_width_data.topping.width;
                const module_width_mirroring  = module_width_data.mirroring;
                
                const module_width_input        = document.getElementById('sg_module_width_input');
                const module_width_item         = module_width_input.parentElement.parentElement;
                module_width_input.value        = module_width;
                module_width_item.dataset.idx   = module_width_idx;
                if(module_width_mirroring == 'Y') module_width_item.classList.add('mirroring');

                //g pc 모듈패딩 인풋, idx 적용
                const pc_module_padding_data        = data.pc_module_padding;
                const pc_module_padding_idx         = pc_module_padding_data.idx;
                const pc_module_padding_top         = pc_module_padding_data.topping['padding-top'];
                const pc_module_padding_right       = pc_module_padding_data.topping['padding-right'];
                const pc_module_padding_bottom      = pc_module_padding_data.topping['padding-bottom'];
                const pc_module_padding_left        = pc_module_padding_data.topping['padding-left'];
                const pc_module_padding_mirroring   = pc_module_padding_data.mirroring;

                const pc_module_padding_wrap            = document.getElementById('sg_module_padding_pc');
                const pc_module_padding_item            = pc_module_padding_wrap.querySelector('.sg_item');
                const pc_module_padding_top_input       = pc_module_padding_wrap.querySelector('#sg_module_padding_top_input');
                const pc_module_padding_right_input     = pc_module_padding_wrap.querySelector('#sg_module_padding_right_input');
                const pc_module_padding_bottom_input    = pc_module_padding_wrap.querySelector('#sg_module_padding_bottom_input');
                const pc_module_padding_left_input      = pc_module_padding_wrap.querySelector('#sg_module_padding_left_input');
                pc_module_padding_top_input.value       = pc_module_padding_top;
                pc_module_padding_right_input.value     = pc_module_padding_right;
                pc_module_padding_bottom_input.value    = pc_module_padding_bottom;
                pc_module_padding_left_input.value      = pc_module_padding_left;
                pc_module_padding_item.dataset.idx      = pc_module_padding_idx;
                if(pc_module_padding_mirroring == 'Y') pc_module_padding_item.classList.add('mirroring');

                //g mobile 모듈패딩 인풋, idx 적용
                const mo_module_padding_data        = data.mo_module_padding;
                const mo_module_padding_idx         = mo_module_padding_data.idx;
                const mo_module_padding_top         = mo_module_padding_data.topping['padding-top'];
                const mo_module_padding_right       = mo_module_padding_data.topping['padding-right'];
                const mo_module_padding_bottom      = mo_module_padding_data.topping['padding-bottom'];
                const mo_module_padding_left        = mo_module_padding_data.topping['padding-left'];
                const mo_module_padding_mirroring   = mo_module_padding_data.mirroring;

                const mo_module_padding_wrap            = document.getElementById('sg_module_padding_mobile');
                const mo_module_padding_item            = mo_module_padding_wrap.querySelector('.sg_item');
                const mo_module_padding_top_input       = mo_module_padding_wrap.querySelector('#sg_module_padding_top_input');
                const mo_module_padding_right_input     = mo_module_padding_wrap.querySelector('#sg_module_padding_right_input');
                const mo_module_padding_bottom_input    = mo_module_padding_wrap.querySelector('#sg_module_padding_bottom_input');
                const mo_module_padding_left_input      = mo_module_padding_wrap.querySelector('#sg_module_padding_left_input');
                mo_module_padding_top_input.value       = mo_module_padding_top;
                mo_module_padding_right_input.value     = mo_module_padding_right;
                mo_module_padding_bottom_input.value    = mo_module_padding_bottom;
                mo_module_padding_left_input.value      = mo_module_padding_left;
                mo_module_padding_item.dataset.idx      = mo_module_padding_idx;
                if(mo_module_padding_mirroring == 'Y') mo_module_padding_item.classList.add('mirroring');
            }

            return;
        }

        console.error(data);
    });
}

/**
 * @author 2022-10-18 12:37:58 동환
 * 
 * @category 색상 스타일그룹 요청
 */
function get_color_sg_list() {

    const sg_color_list_inner   = document.getElementById('sg_color_list_inner');
    const loading               = document.querySelector('#sg_color_list .mir_loading_box');

    remove_all_child_nodes(sg_color_list_inner);
    loading.classList.remove('disNone');

    const send_data = { asset_type : 'color' };
    ajax_request(sg_ajax_core, 'POST', get_sg_list_req, send_data, (status, data) => {

        loading.classList.add('disNone');

        if(status == 200) {

            $(sg_color_list_inner).html(data.print_html);

            return;
        }

        console.error(data);
    });
}

/**
 * @author 2022-09-13 15:43:02 동환
 * 
 * @category 스타일그룹 수정 모달 요청
 * 
 * @param {Event} e 
 * @param {String} asset_type
 */
async function get_sg_edit_modal(e, asset_type = '') {

    const item  = e.currentTarget;
    const idx   = item.dataset.idx;

    if(item.classList.contains('mirroring')) {

        if(confirm('미러링을 해제한 후 스타일 수정이 가능합니다. 미러링을 해제하시겠습니까?')) {

            await sg_mirroring_control_promise(e);
        } else {

            return;
        }
    }

    const send_data = { idx, asset_type };
    ajax_request(sg_ajax_core, 'POST', get_sg_edit_modal_req, send_data, (status, data) => {

        if(status == 200) {

            $('#ez_modal_box').html(data.print_html);

            $('.color_input').spectrum({
                showInput   : false,
                showPalette : false,
                move        : function() {
                    
                    confirm_sg();
                }
            });

            const inputs = document.querySelectorAll('.sg_setting_data');

            for(const input of inputs) {

                if(!input.classList.contains('color_input')) {

                    input.addEventListener('change', (e) => {
                        e.stopImmediatePropagation();
    
                        confirm_sg();
                    });
                }
            }

            return;
        } else if(data.message == 'mirroring') {

            return alert('미러링중인 스타일그룹입니다. 미러링을 해제한 후 다시 시도해주세요.');
        }

        console.error(data);
    });
}

/**
 * @author 2022-09-13 17:19:23 동환
 * 
 * @category 미러링이 해제된 후 수정할수 있게 하기위한 Promise
 * 
 * @param {Event} e 
 * 
 * @return {Promise}
 */
async function sg_mirroring_control_promise(e) {

    return new Promise((res, rej) => {

        sg_mirroring_control(e, res, rej);
    });
}

/**
 * @author 2022-09-13 15:51:54 동환
 * 
 * @category 스타일그룹 미러링 조절
 * 
 * @param {Event}       e
 * @param {Function}    res : Promise에서 호출할 경우 callback
 * @param {Function}    rej : Promise에서 호출할 경우 callback
 */
function sg_mirroring_control(e, res = null, rej = null) {
    e.stopPropagation();

    const btn = e.currentTarget.classList.contains('material-icons') ? e.currentTarget : null;
    if(btn) btn.disabled = true;

    const item  = e.currentTarget.classList.contains('sg_item')
                ? e.currentTarget 
                : e.currentTarget.closest('.sg_item');
    const idx   = item.dataset.idx;
    const mode  = item.classList.contains('mirroring') ? 'N' : 'Y'; //g 미러링 사용여부

    const send_data = { idx, mode };
    ajax_request(sg_ajax_core, 'POST', sg_mirroring_control_req, send_data, (status, data) => {

        if(btn) btn.disabled = false;

        if(status == 200) {

            refresh_asset_change_module(idx);

            const topping       = JSON.parse(data.topping);
            const topping_arr   = Object.entries(topping);

            let mirroring_display = true;

            //TODO asset_type 많아지면 switch로 변경
            if(data.asset_type == 'color') {

                item.style = '';

                for(const [key, value] of topping_arr) {

                    item.style.background = value;
                }
            } else if(data.asset_type == 'struct' && btn?.classList.contains('module_width_mirroring_btn')) {

                const width_input = document.getElementById('sg_module_width_input');
                width_input.value = topping.width;
                mirroring_display = false;
            }

            if(mode == 'N') {

                item.classList.remove('mirroring');

                const mirroring_display = item.querySelector('.sg_mirroring_display');
                mirroring_display?.remove();
            } else if(mode == 'Y') {

                item.classList.add('mirroring');

                if(mirroring_display) {

                    const mirroring_display     = document.createElement('div');
                    mirroring_display.className = 'sg_mirroring_display posAbs mir_border p5';
    
                    const mirroring_text        = document.createElement('p');
                    mirroring_text.className    = 'mir_small_title fz12';
                    mirroring_text.textContent  = '미러링';
                    
                    mirroring_display.appendChild(mirroring_text);
                    item.appendChild(mirroring_display);
                }
            }

            if(res) res();

            return;
        }

        console.error(data);
        
        if(rej) rej();
    });
}

function sg_preview_setting_modal(e, idx, asset_type) {
    e.preventDefault();
    e.stopPropagation();

    const send_data = {
        idx,
        asset_type
    };

    ajax_request(sg_ajax_core, 'POST', sg_preview_setting_modal_req, send_data, (status, data) => {
        if(status == 200) {
            $("#ez_modal_box").html(data.print_html);

            return;
        }

        error_message(data.message);
    });
}

/**
 * @author 2022-09-13 18:43:54 동환
 * 
 * @category 스타일그룹 스타일변경 미리보기 적용
 */
function confirm_sg() {
    const preview_item  = document.getElementById('sg_edit_modal_preivew_item');
    const inputs        = document.querySelectorAll('.sg_setting_data');

    preview_item.style = '';
    for(const input of inputs) {

        let key         = input.name;
        let value       = input.value == '0' ? 0 : input.value;

        if(
            ((input.type == 'radio' || input.type == 'checkbox') 
            && input.checked == false)
            || input.disabled == true
        ) continue;

        if(key.includes('-unit')) continue;
        if(key == 'border-key') continue;

        if(value) {

            let unit_input  = document.querySelector(`[name="${key}-unit"]`);
            let unit        = unit_input ? unit_input.value : null;

            if(unit == 'px2rem') {

                unit    = 'rem';
                value   = Number(value) / 15;
            }

            //g unit 예외처리
            if(
                (key.includes('border') && key.includes('radius') && value != '50%')
                || key == 'border-width'
            ) {
        
                unit = 'px';
            }

            //g border 예외처리
            if(key.includes('border') && !key.includes('radius')) {

                const border_key_inputs = document.querySelectorAll('.sg_setting_data[name="border-key"]:checked');

                if(border_key_inputs.length == 0) continue;

                for(const border_key_input of border_key_inputs) {

                    const border_key    = border_key_input.value;
                    const change_key    = border_key + key.replace('border', '');
                    const change_value  = unit ? `${value}${unit}` : value;

                    //g 미리보기 적용
                    preview_item.style[change_key] = change_value;
                }
            } else {

                if(unit) value = `${value}${unit}`;
    
                //g 미리보기 적용
                preview_item.style[key] = value;
            }
        }
    }
}

/**
 * @author 2022-09-13 18:38:40 동환
 * 
 * @category 스타일그룹 저장
 * 
 * @param {Boolean} cs : 기준스타일그룹 수정인지 판별
 */
function update_sg(cs = false) {
    const name              = document.getElementById('sg_name_input').value;
    const idx               = document.getElementById('sg_idx_input').value;
    const asset_type        = document.getElementById('sg_asset_type_input').value;
    const setting_inputs    = document.querySelectorAll('.sg_setting_data');
    const setting_data      = {};

    for(const setting_input of setting_inputs) {

        if(
            ((setting_input.type == 'radio' || setting_input.type == 'checkbox') 
            && setting_input.checked == false)
            || setting_input.disabled == true
        ) continue;

        let { name : key, value } = setting_input;

        value = value == '0' ? 0 : value;

        if(key.includes('-unit')) continue;
        if(key == 'border-key') {

            if(!setting_data.hasOwnProperty(key)) {

                setting_data[key] = [];
            }
        }

        if(value) {

            let unit_input  = document.querySelector(`[name="${key}-unit"]`);
            let unit        = unit_input ? unit_input.value : null;

            //g unit 예외처리
            //* border, border-radius
            if(
                (key.includes('border') && key.includes('radius') && value != '50%')
                || key == 'border-width'
            ) {
        
                unit = 'px';
            } else if(key.includes('border') && key.includes('radius') && value == '50%') {

                value   = 50;
                unit    = '%';
            }

            //g border 예외처리
            if(key.includes('border') && !key.includes('radius')) {

                if(key != 'border-key') {

                    const border_key_inputs = document.querySelectorAll('.sg_setting_data[name="border-key"]:checked');
    
                    if(border_key_inputs.length == 0) continue;
    
                    for(const border_key_input of border_key_inputs) {
    
                        const border_key = border_key_input.value;
                        const change_key = border_key + key.replace('border', '');
    
                        //g 저장할 key, value
                        setting_data[change_key] = value;
            
                        //g unit 있을경우 추가
                        if(unit) setting_data[`${change_key}-unit`] = unit;
                    }
                } else {

                    setting_data[key].push(value);
                }
            } else {

                //g 저장할 key, value
                setting_data[key] = value;
    
                //g unit 있을경우 추가
                if(unit) setting_data[`${key}-unit`] = unit;
            }
        }
    }

    const send_data = { name, topping : JSON.stringify(setting_data), idx, cs };

    ajax_request(sg_ajax_core, 'POST', update_sg_req, send_data, (status, data) => {

        if(status == 200) {

            if (asset_type != 'space') {
                refresh_asset_change_module(idx);
            } else {
                refresh_space_sg_change_module(idx);
            }

            mir_close_modal();
            get_sg_list(asset_type);
            get_space_list();

            return;
        }

        console.error(data);
    });
}

/**
 * @author 2022-09-14 16:29:12 동환
 * 
 * @category 스타일그룹 스타일수정영역 display 조절
 * 
 * @param {Event} e
 */
function display_sg_setting_option(e) {
    const title     = e.currentTarget;
    const container = title.closest('.sg_edit_modal_setting_container');

    container.classList.toggle('active');
}

/**
 * @author 2022-09-14 18:21:56 동환
 * 
 * @category border-radius 둥글게 설정했을경우 이외 border-radius 값 무시, 넓이, 높이 설정 활성화
 */
function border_radius_disabled() {
    const br_50_input           = document.getElementById('br_50_input');
    const border_radius_input   = document.querySelectorAll('.border_radius_input');

    const width_setting     = document.getElementById('sg_width_setting');
    const height_setting    = document.getElementById('sg_height_setting');
    
    if(br_50_input.checked) {

        for(const input of border_radius_input) {
    
            input.disabled = true;
        }
        width_setting.classList.remove('disNone');
        height_setting.classList.remove('disNone');
    } else {

        for(const input of border_radius_input) {
    
            input.disabled = false;
        }

        const width_input   = document.getElementById('sg_width_input');
        const height_input  = document.getElementById('sg_height_input');
    
        width_setting.classList.add('disNone');
        height_setting.classList.add('disNone');
        
        width_input.value   = '';
        height_input.value  = '';

        triggerChange(width_input);
        triggerChange(height_input);
    }
}

/**
 * @author 2022-09-16 12:08:48 동환
 * 
 * @category 색상 수정 모달 요청
 * 
 * @param {Event} e
 */
async function get_color_sg_edit_modal(e) {

    const item  = e.currentTarget;
    const idx   = item.dataset.idx;

    if(item.classList.contains('mirroring')) {

        if(confirm('미러링을 해제한 후 스타일 수정이 가능합니다. 미러링을 해제하시겠습니까?')) {

            await sg_mirroring_control_promise(e);
        } else {

            return;
        }
    }

    const send_data = { idx };
    ajax_request(sg_ajax_core, 'POST', get_color_sg_edit_modal_req, send_data, (status, data) => {

        if(status == 200) {

            $('#ez_modal_box').html(data.print_html);

            $('.color_input').spectrum({
                showInput   : false,
                showPalette : false
            });

            return;
        } else if(data.message == 'mirroring') {

            return alert('미러링중인 스타일그룹입니다. 미러링을 해제한 후 다시 시도해주세요.');
        }

        console.error(data);
    });
}

/**
 * @author 2022-09-16 12:48:10 동환
 * 
 * @category 색상 스타일그룹 update
 * 
 * @param {Boolean} cs : 기준 스타일그룹 수정인지 판별
 */
function update_color_sg(cs = false) {

    const color     = document.getElementById('sg_color_input').value;
    const color_key = document.getElementById('sg_color_key_input').value;
    const idx       = document.getElementById('sg_idx_input').value;

    const send_data = { color, color_key, idx, cs };
    ajax_request(sg_ajax_core, 'POST', update_color_sg_req, send_data, (status, data) => {

        if(status == 200) {

            refresh_asset_change_module(idx);
            mir_close_modal();
            get_color_sg_list();

            return;
        }

        console.error(data);
    });
}

/**
 * @author 2022-10-18 18:17:01 동환
 * 
 * @category 모듈 넓이 저장
 */
async function update_module_width_sg(e) {

    const module_width_input    = document.getElementById('sg_module_width_input');
    const module_width_item     = module_width_input.parentElement.parentElement;
    const module_width          = module_width_input.value;
    const idx                   = module_width_item.dataset.idx;

    if(module_width_item.classList.contains('mirroring')) {

        if(!confirm('미러링을 먼저 해제해야합니다. 해제하시겠습니까?')) return;

        await sg_mirroring_control_promise(e);
    }

    const module_list   = [];
    const temp_wraps    = document.querySelectorAll('.temp_wrap');
    for(const temp_wrap of temp_wraps) {

        const id            = temp_wrap.id;
        const module_idx    = id.replace('md_', '');

        module_list.push(module_idx);
    }

    const send_data = { module_width, idx, module_list, type : 'width' };
    ajax_request(sg_ajax_core, 'POST', update_module_style_sg_req, send_data, (status, data) => {

        if(status == 200) {

            change_module_ui_style(data.module_ui);
            return;
        }

        console.error(data);
    });
}

/**
 * @author 2022-11-30 18:37:15 지수
 * 
 * @category 모듈 패딩 저장
 */
async function update_module_padding_sg(e, type) {

    //g 패딩 저장 형식 새로 만들기
    const module_padding_wrap   = document.getElementById('sg_module_padding_'+type);
    const module_padding_top    = module_padding_wrap.querySelector('#sg_module_padding_top_input').value;
    const module_padding_right  = module_padding_wrap.querySelector('#sg_module_padding_right_input').value;
    const module_padding_bottom = module_padding_wrap.querySelector('#sg_module_padding_bottom_input').value;
    const module_padding_left   = module_padding_wrap.querySelector('#sg_module_padding_left_input').value;
    const module_padding_item   = module_padding_wrap.querySelector('.sg_item');
    const idx                   = module_padding_item.dataset.idx;

    if(module_padding_item.classList.contains('mirroring')) {

        if(!confirm('미러링을 먼저 해제해야합니다. 해제하시겠습니까?')) return;

        await sg_mirroring_control_promise(e);
    }

    const module_list   = [];
    const temp_wraps    = document.querySelectorAll('.temp_wrap');
    for(const temp_wrap of temp_wraps) {

        const id            = temp_wrap.id;
        const module_idx    = id.replace('md_', '');

        module_list.push(module_idx);
    }

    const send_data = { 
        'padding' : {
            module_padding_top, module_padding_right, module_padding_bottom, module_padding_left
        }, 
        idx, 
        module_list,
        type : 'padding'
    };
    ajax_request(sg_ajax_core, 'POST', update_module_style_sg_req, send_data, (status, data) => {

        if(status == 200) {

            change_module_ui_style(data.module_ui);
            return;
        }

        console.error(data);
    });
}

/**
 * * 모듈 새로고침
 * 
 * @param {Object} module_ui_data 
 */
function change_module_ui_style(module_ui_data) {
    new mirMessage({
        mode    : 'success',
        type    : 'toast',
        pos     : 'br',
        title   : '성공!',
        text    : '변경사항이 저장되었습니다.'
    }).show();

    //g 기존스타일그룹 css 제거
    document.querySelector('.sg_style')?.remove();

    for(const [ module_idx, module_ui ] of Object.entries(module_ui_data)) {

        const temp_wrap     = document.getElementById(`md_${module_idx}`);
        const module_wrap   = temp_wrap.parentElement;

        $(module_wrap).replaceWith(module_ui);
        exec_script(module_ui);

        ez_order_data       = {};
        ez_from_path_data   = {};

        on_new_ez_move_mode(null, 'on');
    }
}

/**
 * @author 2023-01-26 19:02:42 동환
 * 
 * @category 모듈 개별여백 리스트
 */
function get_space_list(target_page = 1, limit = 5) {
    const sg_space_list_inner    = document.getElementById('sg_space_list_inner');
    const loading               = document.querySelector('#sg_space_list .mir_loading_box')

    remove_all_child_nodes(sg_space_list_inner);
    loading.classList.remove('disNone');

    const send_data = { page : target_page, limit, asset_type: 'space' };
    ajax_request(sg_ajax_core, 'POST', get_sg_list_req, send_data, (status, data) => {

        loading.classList.add('disNone');

        if(status == 200) {
            $(sg_space_list_inner).html(data.print_html);

            const pagination    = document.getElementById('sg_space_list_pagination');
            const total_count   = data.total_count;

            //g 페이지네이션
            const page_event = function(page) {

                return function() {

                    get_space_list(page, limit);
                };
            };

            const pages         = build_pages(target_page, total_count, 10, limit, page_event);
            const pages_count   = pages.length;

            remove_all_child_nodes(pagination);
            for(let i = 0; i < pages_count; i++) {

                pagination.appendChild(pages[i]);
            }

            return;
        }

        console.error(data);
    });
}