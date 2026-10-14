/**
 * @author 2023-10-11 ss
 * @category tab toggle
 * @param This event : this
 * ! 임시용
 */
function mir_ca_common_tab_toggle(event) {
    var parent = event.parentNode;
    var child = parent.children;
    var child_cnt = child.length;

    for (var i = 0; i < child_cnt; i++) {
        child[i].classList.remove("active");
    }

    event.classList.add("active");
}

/**
 * @author 2023-09-11 성수
 * @category 범용 modal 닫기
 * @param This event : this
 */
function mir_common_modal_close(e, callback = '') {

    e.preventDefault();
    e.stopPropagation();

    const target = e.currentTarget;
    
    target.closest(".mir_common_modal_wrap").remove();

    if(callback != '') callback(e);
}

/**
 * @author 2023-10-13 15:49:22 지수
 * @category 범용 셀렉트 열기/닫기
*/
function active_mir_common_select_option_wrap(e) {

    const target        = e.currentTarget;
    const outer_line    = target.closest('.mir_common_select_drop_line_data');
    const select_list   = outer_line.querySelector('.mir_ca_common_select_list_data');

    if(select_list.classList.contains('disNone')) {

        const active_select_lists = $('.mir_ca_common_select_list_data').not('.disNone');
        if(active_select_lists.length > 0) active_select_lists[0].classList.add('disNone');
        
        select_list.classList.remove('disNone')
    } else {

        select_list.classList.add('disNone');
    }
}

function select_mir_common_select_option(e) {

    const target = e.currentTarget;
    active_mir_common_select_option_wrap(e);
    if(target.classList.contains("active")) return;

    const outer_line        = target.closest('.mir_common_select_drop_line_data');
    const current_active    = outer_line.querySelector('.mir_common_select_items_data.active');
    current_active.classList.remove('active');
    target.classList.add('active');

    const value         = target.dataset.value;
    const title         = target.title;
    const input         = outer_line.querySelector('.mir_common_select_input');
    const select_title  = outer_line.querySelector('.mir_common_select_drop_wrap_data > p');
    
    input.value = value;
    select_title.textContent = title;
}

function search_mir_common_select_search_items(e) {

    const target = e.currentTarget;
    const list   = target.closest(".mir_ca_common_select_list_data");
    const input  = list.querySelector(".mir_common_search_select_input_data");
    const search = input.value;
    const option = list.querySelectorAll('.mir_common_select_items_data');

    option.forEach(el => {

        const el_title = el.title;
        el_title.includes(search)
        ? el.classList.remove("disNone")
        : el.classList.add("disNone");
    });
}