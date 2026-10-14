/**
 * 어드민 아니여도 작동
 */

/**
 * @author 2022-09-28 12:28:02 동환
 * 
 * @category ts 탭 스크립트
 * 
 * @param {Event}     e
 * @param {String}    target : target id
 */
function ts_tab(e, target) {
    const btn           = e.currentTarget;
    const tab_idx       = btn.dataset.tab_idx;
    const module_idx    = btn.id.replace('ts_tab_title_', '').replace('_' + tab_idx, '');
    const tab_title     = btn.dataset.title;
    const btn_wrap      = btn.parentElement;
    const tab_wrap      = btn_wrap.parentElement.parentElement;
    const animation     = tab_wrap.dataset.animation;
    const selected_btn  = btn_wrap.querySelector('.ts_tab_title.active');

    if(selected_btn && btn != selected_btn) {

        const selected_tab_idx = selected_btn.dataset.tab_idx;
        selected_btn.classList.remove('active');

        if(animation == 'toggle') { //g 토글 animation

            btn_wrap.classList.remove('tab_' + selected_tab_idx);
            btn_wrap.classList.add('tab_' + tab_idx);
            btn_wrap.dataset.title = tab_title;
        }

        const search 		= location.search;
        const tab_name 		= search.substring(location.search.indexOf("tab_name")).split("&")[0];
        const url           = new URL(window.location.href);
        const url_params    = new URLSearchParams(url.search);
        const state_data    = module_idx + "_" + tab_title;

        //g 현 url 파라미터에 tab_name이 있는 지 검사
        if(!tab_name.includes("tab_name")){

            //g 파라미터가 없을 때, tab_name값을 url에 추가
            url_params.set("tab_name", state_data);
            history.pushState(null, null, "?" + url_params.toString());
        } else {

            const tab_state		= tab_name.replace("tab_name=", "");
            let new_tab_state	= "";

            //g tab_name에 해당 module idx가 있는 지 검사
            if(tab_name.includes(module_idx)){

                //g 있으면 tab_state값을 재조립하여 넣어준다.
                const split_tab_name 	= tab_state.split(module_idx + "_");
                const split_prev 		= split_tab_name[0];
                const split_next		= split_tab_name[1];
                const remove_param 		= split_next.split("@")[0];

                const new_split_next 	= split_next.replace(remove_param, tab_title);

                new_tab_state 			= split_prev + module_idx + "_" + new_split_next;
            
            } else {

                //g 없으면 새로운 tab_state값을 더하여 넣어준다.
                new_tab_state = tab_state + "@" + state_data;
            }

            url_params.set("tab_name", new_tab_state);
            history.pushState(null, null, "?" + decodeURIComponent(url_params.toString()));
        }
    }

    if(!btn.classList.contains('active')) {

        btn.classList.add('active');
        
        const selected_items_wrap = tab_wrap.querySelector('.ts_tab_items.active');
        const tab_children = tab_wrap.children;
        for (const child of tab_children) {
            if (child.classList.contains('active')) child.classList.remove('active');
        }

        const target_el = document.getElementById(target);
        target_el.classList.add('active');
    }
}

/**
 * @author 2022-10-11 16:01:08 동환
 * 
 * @category url param에 tab_active 가 있을경우 tab active
 */
$(function() {

    const search = location.search;
    if(search) {

        const tab_name = search.substring(location.search.indexOf('tab_name')).split("&")[0];

        if(!tab_name.includes("tab_name")) return;

        const url_params_arr    = JSON.parse( //g url_param -> arr로 변환
            '[' + tab_name.replace(/[@]/g, '","').replace(/tab_name=/g,'"') + '"]', 
            function(key, value) { 

                return key === "" ? value : decodeURIComponent(value);
            }
        );

        for(const el of url_params_arr) {

            const module_idx = el.split("_")[0];
            let   tab_title  = el.split("_")[1];
            const temp_wrap  = document.getElementById("md_" + module_idx);

            if(temp_wrap == null) continue;

            if(tab_title.includes("+")) tab_title = tab_title.replaceAll("+", " ");

            const module_class_name = temp_wrap.firstElementChild.classList.value;

            let tab_wrap        = "";
            let tab_animation   = "";
            let selected_tab    = "";
            let active_target   = "";
            let title_wrap      = "";

            switch(true) {
                
                //g ts tab
                case module_class_name.includes("ts_tab"):

                    tab_wrap      = document.getElementById('ts_tab_wrap_' + module_idx);
                    tab_animation = tab_wrap.dataset.animation;
                    selected_tab  = tab_wrap.querySelector('.ts_tab_title.active');
                    active_target = tab_wrap.querySelector('.ts_tab_title[data-title="' + tab_title + '"]');
                    title_wrap    = tab_wrap.querySelector('.ts_tab_title_wrap');
                    break;
                
                //g 장비리스트 탭
                case module_class_name.includes("Device_list"):
                    
                    tab_wrap      = document.getElementById('ez_device_list_tab_title_wrap_' + module_idx);
                    tab_animation = tab_wrap.dataset.animation;
                    selected_tab  = tab_wrap.querySelector('.ez_device_list_tab_title_data.active');
                    active_target = tab_wrap.querySelector('.ez_device_list_tab_title_data[data-tab_value="' + tab_title + '"]');
                    title_wrap    = tab_wrap;
                    break;
            }

            if (active_target) {
                if(selected_tab != active_target) {
                    //TODO 더 많아지면 switch로 변경
                    if(tab_animation == 'toggle' && active_target) {
    
                        const active_tab_idx    = active_target.dataset.tab_idx;
                        const selected_tab_idx  = selected_tab.dataset.tab_idx;
    
                        title_wrap.classList.remove('tab_' + selected_tab_idx);
                        title_wrap.classList.add('tab_' + active_tab_idx);              
                    }
    
                    if(module_class_name.includes("ts_tab") || module_class_name.includes("Device_list")) {
                        if (active_target) active_target.click();
                    }
                
                    selected_tab.classList.remove('active');
                    if (active_target) active_target.classList.add('active');
                }
            }
        };
    }
});