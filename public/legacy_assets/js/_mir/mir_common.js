// ie8 이하 console 에러를 막기 위한 코드
var console = window.console || { log: function () {} };

// jquery sortable item array injection function do not delete very important
jQuery.fn.extend({
  cycle: function (fn) {
    var args = arguments,
      guid = fn.guid || jQuery.guid++,
      i = 0,
      toggler = function (event) {
        // Figure out which function to execute
        var lastToggle = (jQuery._data(this, "lastToggle" + fn.guid) || 0) % i;
        jQuery._data(this, "lastToggle" + fn.guid, lastToggle + 1);

        // Make sure that clicks stop
        event.preventDefault();

        // and execute the function
        return args[lastToggle].apply(this, arguments) || false;
      };

    // link all the functions, so any of them can unbind this click handler
    toggler.guid = guid;
    while (i < args.length) {
      args[i++].guid = guid;
    }

    return this.click(toggler);
  }
});

// $('img.photo',this).imagesLoaded(myFunction)
// execute a callback when all images have loaded.
// needed because .load() doesn't work on cached images

// Modified with a two-pass approach to changing image
// src. First, the proxy imagedata is set, which leads
// to the first callback being triggered, which resets
// imagedata to the original src, which fires the final,
// user defined callback.

// modified by yiannis chatzikonstantinou.

// original:
// mit license. paul irish. 2010.
// webkit fix from Oren Solomianik. thx!

// callback function is passed the last image to load
//   as an argument, and the collection as `this`

$.fn.imagesLoaded = function (callback) {
  var elems = this.find("img"),
    elems_src = [],
    self = this,
    len = elems.length;

  if (!elems.length) {
    callback.call(this);
    return this;
  }

  elems
    .one("load error", function () {
      if (--len === 0) {
        // Rinse and repeat.
        len = elems.length;
        elems
          .one("load error", function () {
            if (--len === 0) {
              callback.call(self);
            }
          })
          .each(function () {
            this.src = elems_src.shift();
          });
      }
    })
    .each(function () {
      elems_src.push(this.src);
      // webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
      // data uri bypasses webkit log warning (thx doug jones)
      this.src =
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
    });

  return this;
};

function encodeAll(s) {
  return encodeURIComponent(s).replace(/[!'()*]/g, escape); // escape시킬 문자를 추가지정
}

function getItems(exampleNr) {
  var columns = [];

  $(exampleNr + " ul.sortable-list").each(function () {
    columns.push($(this).sortable("toArray").join(","));
  });

  return columns.join("|");
}

function printStaff(num, mode) {
  $.ajax({
    type: "POST",
    async: false,
    url: "/_mir.do.sqlexec.php",
    traditional: true,
    cache: false,
    data: {
      keytype: "printStaff",
      secretcode: num,
      prtmode: mode
    },
    success: function (data) {
      $("#printStaff_td").html(data);
    },
    error: function (e) {
      $("#printStaff_td").html("담당자 불러오기 실패");
    },
    timeout: 3000
  });
}

function callexecbox(enkey, datakey) {
  $.ajax({
    type: "POST",
    async: false,
    url: "/_mir.do.sqlexec.php",
    traditional: true,
    cache: false,
    data: {
      secukey: enkey,
      datakey: datakey
    },
    success: function (data) {
      $("#popup_center").html(data);
    },
    error: function (e) {
      alert(
        "[일시적 데이타 통신 실패] 이 메세지가 지속되면 관리자에게 연락바랍니다."
      );
    },
    timeout: 3000
  });
}

function addStaff(enkey) {
  $.ajax({
    type: "POST",
    async: false,
    url: "/_mir.do.sqlexec.php",
    traditional: true,
    cache: false,
    data: {
      keytype: "quickStaffAdd",
      enkey: enkey
    },
    success: function (data) {
      $("div#quickStaffAdd").html(data);
    },
    error: function (e) {
      console.log(msgPrint);
    },
    timeout: 10000
  });
}

/*
	높이 자동 맞춤
*/
function mirEqualHeight(group) {
  var tallest = 0;
  var thisHeight = 0;
  var tallest_bott = 0;
  var tallest_top = 0;
  group.each(function () {
    var thisBottomHeight = $(this)
      .children("div.bottomTextBox")
      .outerHeight(true);
    var thisTopHeight = $(this).find(".subjectTextBox").outerHeight(true);
    //		console.log(thisBottomHeight);
    //		console.log(group.attr("class") + "\r\n/tallest : " + tallest + "\r\n/thisHeight : " + thisHeight);
    if (thisBottomHeight > tallest_bott) {
      tallest_bott = thisBottomHeight;
    }

    if (thisTopHeight > tallest_top) {
      tallest_top = thisTopHeight;
    }
  });
  $($(group).selector)
    .children("div.bottomTextBox")
    .css({ height: tallest_bott + "px" });
  $($(group).selector)
    .find(".subjectTextBox")
    .css({ height: tallest_top + "px" });
  group.each(function () {
    var thisHeight = $(this).outerHeight();
    //		console.log(thisBottomHeight);
    //		console.log(group.attr("class") + "\r\n/tallest : " + tallest + "\r\n/thisHeight : " + thisHeight);
    if (thisHeight > tallest) {
      tallest = thisHeight;
    }
  });
  //	console.log("tallest : " + tallest);
  $($(group).selector).css({ height: tallest + "px" });
}

function mirEqualHeightRt(group) {
  var tallest = 0;
  var thisHeight = 0;
  group.each(function () {
    var thisHeight = $(this).outerHeight(true);
    //		console.log(group.attr("class") + "\r\n/tallest : " + tallest + "\r\n/thisHeight : " + thisHeight);
    if (thisHeight > tallest) {
      tallest = thisHeight;
    }
  });
  //	console.log("tallest : " + tallest);
  return tallest;
}

function convertHex(hex, opacity) {
  hex = hex.replace("#", "");
  r = parseInt(hex.substring(0, 2), 16);
  g = parseInt(hex.substring(2, 4), 16);
  b = parseInt(hex.substring(4, 6), 16);
  result = "rgba(" + r + "," + g + "," + b + "," + opacity / 100 + ")";
  return result;
}

function setColorOpacity(colorStr, opacity) {
  if (colorStr.indexOf("rgb(") == 0) {
    var rgbaCol = colorStr.replace("rgb(", "rgba(");
    rgbaCol = rgbaCol.replace(")", ", " + opacity + ")");
    return rgbaCol;
  }

  if (colorStr.indexOf("rgba(") == 0) {
    var rgbaCol =
      colorStr.substr(0, colorStr.lastIndexOf(",") + 1) + opacity + ")";
    return rgbaCol;
  }

  if (colorStr.length == 6) colorStr = "#" + colorStr;

  if (colorStr.indexOf("#") == 0) {
    var rgbaCol =
      "rgba(" +
      parseInt(colorStr.slice(-6, -4), 16) +
      "," +
      parseInt(colorStr.slice(-4, -2), 16) +
      "," +
      parseInt(colorStr.slice(-2), 16) +
      "," +
      opacity +
      ")";
    return rgbaCol;
  }
  return colorStr;
}

function mirclip(text) {
  var copyElement = document.createElement("input");
  copyElement.setAttribute("type", "text");
  copyElement.setAttribute("value", text);
  copyElement = document.body.appendChild(copyElement);
  copyElement.select();

  try {
    document.execCommand("copy");
    alert("클립보드로 복사 되었습니다.");
  } catch (e) {
    copyElement.remove();
    prompt("Ctrl+C 로 아래 텍스트를 복사하십시오.", text);
  } finally {
    if (typeof e == "undefined") {
      copyElement.remove();
    }
  }
}

function targetSelect(nodename, nodevalue) {
  $("select[name='" + nodename + "'] > option").each(function () {
    if ($(this).val() == nodevalue) {
      $(this).prop("selected", true);
    }
  });
}

function mirlocation(addr) {
  addr.stopPropagation();
  location.href = addr;
}
function mir_selected(vtype, vname, vvalue) {
  switch (vtype) {
    case "checkbox":
      $("input[name='" + vname + "']").each(function () {
        if ($(this).val() == vvalue) {
          $(this).prop("checked", true);
        }
      });
      break;
    case "select":
      $("select[name='" + vname + "'] > option").each(function () {
        if ($(this).val() == vvalue) {
          $(this).prop("selected", true);
        }
      });
      break;
    case "radio":
      $("input[name='" + vname + "']").each(function () {
        if ($(this).val() == vvalue) {
          $(this).prop("checked", true);
        }
      });
      break;
  }
}

function mir_selected_ex(
  vtype,
  vname,
  vvalue,
  dfvar,
  continueuse,
  continuemsg,
  continueval,
  cancelmsg,
  o5
) {
  if (vvalue == "") {
    var vvalue = dfvar;
  }

  switch (vtype) {
    case "check":
      if (continueuse == "Y") {
        var ctn = confirm(continuemsg);
        if (ctn == true) {
        } else {
          alert(cancelmsg);
          $("input[name='" + vname + "']").each(function () {
            if ($(this).val() == continueval) {
              $(this).prop("checked", true);
            }
          });
        }
      }
      break;
    case "select":
      $("select[name='" + vname + "'] > option").each(function () {
        if ($(this).val() == vvalue) {
          $(this).prop("selected", true);
        }
      });
      break;
    case "radio":
      $("input[name='" + vname + "']").each(function () {
        if ($(this).val() == vvalue) {
          $(this).prop("checked", true);
        }
      });
      break;
  }
}

function mir_request_exec(mode1, mode2, printResult, vnkey, key1, f2, f3) {
  var msgPrint =
    "[mir_request_exec]시스템에 일시적인 문제가 발생하였습니다. 고객센터에 문의하여 주시기 바랍니다.";
  // 예약변경을 위한 전용값

  $(printResult).html("loading");
  $.ajax({
    type: "POST",
    async: false,
    url: "/_mir.do.sqlexec.php",
    traditional: true,
    cache: false,
    data: {
      keytype: mode1,
      keyObject: printResult,
      chkkey: key1,
      secretcode: vnkey,
      iskey: mode2
    },
    success: function (data) {
      $(printResult).html(data);
    },
    error: function (e) {
      $(printResult).html(e);
    },
    timeout: 10000
  });
}

function doState(
  inputtype,
  inputEnkey,
  printmethod,
  secretcode,
  f2,
  f3,
  f4,
  printResult
) {
  var msgPrint =
    "[doState]시스템에 일시적인 문제가 발생하였습니다. 고객센터에 문의하여 주시기 바랍니다.";
  // 예약변경을 위한 전용값
  var iskey = $(
    "select[name='mir_content[reserve][state][" + printmethod + "]']"
  ).val();

  $(printResult).html("loading");
  $.ajax({
    type: "POST",
    async: false,
    url: "/_mir.do.sqlexec.php",
    traditional: true,
    cache: false,
    data: {
      keyObject: inputEnkey,
      keytype: inputtype,
      iskey: iskey,
      chkkey: printmethod,
      secretcode: secretcode
    },
    success: function (data) {
      $(printResult).html(data);
    },
    error: function (e) {
      console.log(msgPrint);
    },
    timeout: 10000
  });
}
function doStateAST(
  inputtype,
  inputEnkey,
  printmethod,
  secretcode,
  f2,
  f3,
  f4,
  printResult
) {
  var msgPrint =
    "[doStateAST]시스템에 일시적인 문제가 발생하였습니다. 고객센터에 문의하여 주시기 바랍니다.";
  // 예약변경을 위한 전용값
  var iskey = $(
    "select[name='mir_content[reserve][state][" + printmethod + "]']"
  ).val();

  $(printResult).html(
    "<br>데이타를 실시간으로 수집중입니다.<br>수초~수분이 소요될 수 있습니다."
  );
  $.ajax({
    type: "POST",
    async: true,
    url: "/_mir.do.sqlexec.php",
    traditional: true,
    cache: true,
    data: {
      keyObject: inputEnkey,
      keytype: inputtype,
      iskey: iskey,
      chkkey: printmethod,
      secretcode: secretcode
    },
    success: function (data) {
      $(printResult).html(data);
    },
    error: function (e) {
      console.log(msgPrint);
    }
    //		,timeout: 30000
  });
}

function printResult(
  inputmethod,
  printmethod,
  fct_keyword,
  fct_keytype,
  selectNum,
  unikey,
  method1,
  method2,
  method3,
  method4
) {
  var msgPrint =
    "[printResult]시스템에 일시적인 문제가 발생하였습니다. 고객센터에 문의하여 주시기 바랍니다.";
  $.ajax({
    type: "POST",
    async: false,
    url: "/_mir.do.search.php",
    traditional: true,
    cache: false,
    data: {
      tObject: unikey,
      keyword: fct_keyword,
      keytype: fct_keytype,
      selectNum: selectNum,
      passcode: method1,
      oricode: method2,
      code3: method3,
      code4: method4
    },
    success: function (data) {
      switch (method1) {
        /*case "cmpopen":
					console.log(data);
					break;*/
        case "code_change_append":
          $("tr.default_msg").remove();
          printmethod.append(data);
          break;
        default:
          printmethod.html(data);
          break;
      }
    },
    error: function (e) {
      console.log(msgPrint);
    },
    timeout: 5000
  });
}

function printResult2(
  inputmethod,
  printmethod,
  fct_keyword,
  fct_keytype,
  selectNum,
  unikey,
  method1,
  method2,
  method3,
  method4
) {
  var msgPrint =
    "[pr2]시스템에 일시적인 문제가 발생하였습니다. 고객센터에 문의하여 주시기 바랍니다.";
  $.ajax({
    type: "POST",
    async: false,
    url: "/_mir.do.search.php",
    traditional: true,
    cache: false,
    data: {
      tObject: unikey,
      keyword: fct_keyword,
      keytype: fct_keytype,
      selectNum: selectNum,
      passcode: method1,
      oricode: method2,
      code3: method3,
      code4: method4
    },
    success: function (data) {
      switch (method1) {
        /*case "cmpopen":
					console.log(data);
					break;*/
        case "code_change_append":
          printmethod.append(data);
          break;
        default:
          printmethod.html(data);
          break;
      }
    },
    error: function (e) {
      console.log(msgPrint);
    },
    timeout: 5000
  });
}

function helpinfo(code, f1, f2, f3, f4, f5) {
  alert(code + " 도움말 준비중");
}

function callDynamic(secukey, arr1, arr2, cpinfo, node) {
  var nodeblock = $("#" + node);
  var msgPrint =
    "[cdy]시스템에 일시적인 문제가 발생하였습니다. 고객센터에 문의하여 주시기 바랍니다.";

  if (nodeblock.children("div").hasClass("tBlack") == true) {
    nodeblock.children("div").html("");
  } else {
    nodeblock.html("");
  }
  nodeblock.removeClass("disNone");

  var s_url = atob("L19taXIuZG8uc3FsZXhlYy5waHA=");
  $(".msgsendbox").html("");
  $.ajax({
    type: "POST",
    async: true,
    url: s_url,
    traditional: true,
    cache: false,
    data: {
      secukey: secukey,
      secuarr1: arr1,
      secuarr2: arr2,
      cpinfo: cpinfo,
      node: node
    },
    success: function (data) {
      nodeblock.html(data);
    },
    error: function (e) {
      console.log(msgPrint);
    },
    timeout: 10000
  });
}

function mir_calldynamic(databus_tmp) {
  var jsonTmp = JSON.parse(databus_tmp);
  var databus = jsonTmp[0];
  var nodeblock = $(databus.node);

  if (databus.msgprt) {
    var msgPrint = databus.msgprt;
  } else {
    var msgPrint =
      "통신시간을 초과하였거나 시스템에 일시적인 문제가 발생하였습니다. 고객센터에 문의하여 주시기 바랍니다.";
  }

  switch (databus.mode) {
    default:
      if (nodeblock.children("div").hasClass("tBlack") == true) {
        nodeblock.children("div").html("");
      } else {
        nodeblock.html("");
      }
      break;
    case "save_html":
    case "save_append":
      break;
  }
  nodeblock.removeClass("disNone");
  if (databus.msgsndboxdf == "Y") {
    $(".msgsendbox").html("");
  }
  $.ajax({
    type: "POST",
    async: true,
    url: "/_mir/plugin/_MIR.async.php?key=" + databus.urlparam,
    traditional: true,
    cache: false,
    data: { secukey: databus_tmp },
    success: function (data) {
      switch (databus.mode) {
        default:
        case "html":
          nodeblock.html(data);
          break;
        case "append":
        case "save_append":
          //					console.log(mode);
          nodeblock.append(data);
          break;
        case "value":
          nodeblock.val(data);
          break;
        case "valueprint":
          //					nodeblock.val(data);
          break;
      }
    },
    error: function (e) {
      console.log(msgPrint);
    },
    timeout: databus.timeout
  });
}

function callDynamicEx(secukey, arr1, arr2, cpinfo, node, mode) {
  var nodeblock = $("#" + node);
  var msgPrint =
    "[cdyex] " +
    node +
    " 네트워크 속도 문제로 시스템에 일시적인 문제가 발생하였습니다. 이 메세지가 지속되면 고객센터에 문의하여 주시기 바랍니다. 다음키를 복사해 전달주시면 좋습니다 key: " +
    secukey;
  var s_url = atob("L19taXIuZG8uc3FsZXhlYy5waHA=");

  switch (mode) {
    default:
      if (nodeblock.children("div").hasClass("tBlack") == true) {
        nodeblock.children("div").html("");
      } else {
        nodeblock.html("");
      }
      break;
    case "next_html":
      break;
    case "save_html":
    case "save_append":
      break;
    case "save_append_waypoint":
      $("#smssenderwrap,#smssenderwrapbg,#smssenderScript").remove();
      break;
  }
  nodeblock.removeClass("disNone");

  $(".msgsendbox").html("");
  $.ajax({
    type: "POST",
    async: true,
    url: s_url,
    traditional: true,
    cache: false,
    data: {
      secukey: secukey,
      secuarr1: arr1,
      secuarr2: arr2,
      cpinfo: cpinfo,
      node: node
    },
    success: function (data) {
      switch (mode) {
        default:
        case "html":
          nodeblock.html(data);
          break;
        case "html_en":
          nodeblock.html(atob(data));
          break;
        case "html_fadeIn":
          nodeblock.html(data);
          break;
        case "html_safe":
          var data_safe = data;
          //data_safe = data_safereplace(data_safe,"'","\\'");
          //var data_safe = data.replace(/'/gi,"\\\'");
          //var data_safe = data.replace(/'/gi,"\\\'"');
          //nodeblock.html(encodeAll(data_safe));
          nodeblock.html(data_safe);
          break;
        case "next_html":
          nodeblock.next().html(data);
          break;
        case "append":
        case "save_append":
          //					console.log(mode);
          nodeblock.append(data);
          break;
        case "save_append_waypoint":
          nodeblock.append(data);
          break;
        case "value":
          nodeblock.val(data);
          break;
        case "valueprint":
          //					nodeblock.val(data);
          break;
      }
    },
    error: function (e) {
      console.log(msgPrint);
    },
    timeout: 100000
  });
}

function mir_callDynamicEx(aryData) {
  var node = aryData.node;
  var secukey = aryData.secukey;
  var sType = aryData.sType;
  var mode = aryData.mode;
  var limitout =
    typeof aryData.timeout === "undefined" ? aryData.timeout : 10000;
  var arrset = aryData.arrset;
  var cpinfo = aryData.cpinfo;
  var jarrset = JSON.stringify(arrset);
  var logdata = aryData.logdata;
  var loading_data = aryData.loading_data;
  var afterunlock = aryData.afterunlock;
  var aftertgobj = aryData.aftertgobj;

  if (aryData.success_node == true) {
    var success_node = $("body");
  }
  if (
    mode != "this_html" &&
    mode != "this_append" &&
    mode != "this_replacewith" &&
    mode != "this_appendTo"
  ) {
    var nodeblock = $("#" + node);
  }
  var msgPrint =
    "[cdyex] 네트워크 속도 문제로 시스템에 일시적인 문제가 발생하였습니다. 이 메세지가 지속되면 고객센터에 문의하여 주시기 바랍니다.";
  switch (sType) {
    default:
      var s_url = atob("L19taXIuZG8uc3FsZXhlYy5waHA=");
      break;
  }

  switch (mode) {
    default:
      if (nodeblock.children("div").hasClass("tBlack") == true) {
        nodeblock.children("div").html("");
      } else if (mode != "html") {
        nodeblock.html("");
      }
      break;
    case "this_html":
    case "this_append":
    case "this_replacewith":
    case "this_appendTo":
      break;
    case "next_html":
      break;
    case "save_html":
    case "save_append":
    case "text":
      break;
    case "save_append_waypoint":
      $("#smssenderwrap,#smssenderwrapbg,#smssenderScript").remove();
      break;
    case "popup":
      nodeblock = $("body");
      break;
    case "after":
      break;
  }
  if (
    mode != "this_html" &&
    mode != "this_append" &&
    mode != "this_appendTo" &&
    mode != "this_replacewith"
  ) {
    nodeblock.removeClass("disNone");
    if (loading_data == true) {
      //var nodeHeight = $("#"+node).outerHeight(true);
      //$("#"+node).css({"min-height":nodeHeight+"px"});
      $("#" + node).empty();
      nodeblock.append(
        '\
			<style>\
				.lds-ring {\
					display: inline-block;\
					position: relative;\
					width: 40px;\
					height: 40px;\
					left: 50%;\
					margin-left: -40px;\
					top: 50%;\
					margin-top: -40px;\
				}\
				.lds-ring div {\
					box-sizing: border-box;\
					display: block;\
					position: absolute;\
					width: 64px;\
					height: 64px;\
					margin: 8px;\
					border: 8px solid #f15353;\
					border-radius: 50%;\
					animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;\
					border-color: #f15353 transparent transparent transparent;\
				}\
				.lds-ring div:nth-child(1) {\
					animation-delay: -0.45s;\
				}\
				.lds-ring div:nth-child(2) {\
					animation-delay: -0.3s;\
				}\
				.lds-ring div:nth-child(3) {\
					animation-delay: -0.15s;\
				}\
				@keyframes lds-ring {\
					0% {\
					transform: rotate(0deg);\
					}\
					100% {\
					transform: rotate(360deg);\
					}\
				}</style>\
			<div class="lds-ring"><div></div><div></div><div></div><div></div></div>\
			'
      );
    }
  }
  $(".msgsendbox").html("");
  $.ajax({
    type: "POST",
    async: true,
    url: s_url,
    traditional: true,
    cache: false,
    data: {
      secukey: secukey,
      secuarrset: jarrset,
      cpinfo: cpinfo,
      node: node
    },
    success: function (data) {
      if (loading_data == true) {
        $("#" + node).empty();
      }
      switch (mode) {
        default:
        case "html":
          nodeblock.html(data);
          break;
        case "this_html":
          node.html(data);
          break;
        case "this_appendTo":
          node.append(data);
          break;
        case "this_n_replacewith":
          nodeblock.replaceWith(data);
          break;
        case "this_replacewith":
          node.replaceWith(data);
          break;
        case "this_append":
          node.append(data);
          break;
        case "html_en":
          nodeblock.html(atob(data));
          break;
        case "html_fadeIn":
          nodeblock.html(data);
          break;
        case "html_safe":
          var data_safe = data;
          //data_safe = data_safereplace(data_safe,"'","\\'");
          //var data_safe = data.replace(/'/gi,"\\\'");
          //var data_safe = data.replace(/'/gi,"\\\'"');
          //nodeblock.html(encodeAll(data_safe));
          nodeblock.html(data_safe);
          break;
        case "next_html":
          nodeblock.next().html(data);
          break;
        case "append":
        case "save_append":
          //					console.log(mode);
          if (data == "assist_worker_overlap") {
            alert("이미 추가된 작업자입니다.");
          } else {
            nodeblock.append(data);
          }
          break;
        case "save_append_waypoint":
          nodeblock.append(data);
          break;
        case "value":
          nodeblock.val(data);
          break;
        case "valueprint":
          if (success_node && data != "different_worker") {
            success_node.append(
              '<div id="change_save_alert"><p>변경사항이 저장되었습니다.</p></div>'
            );
            setTimeout(function () {
              $("#change_save_alert").remove();
            }, 3000);
          }

          if (data == "different_worker") {
            alert("본인의 작업만 수정할 수 있습니다.");
          }
          console.log(data);
          //					nodeblock.val(data);
          break;
        case "popup":
          nodeblock.append(data);
          break;
        case "after":
          nodeblock.after(data);
          break;
        case "text":
          if (data == "different_worker") {
            alert("본인의 작업만 수정할 수 있습니다.");
          } else {
            nodeblock.text(data);
          }
          break;
      }
      //console.log(afterunlock);
      if (afterunlock == "Y") {
        aftertgobj.prop("disabled", false);
      }

      if (logdata != undefined && data != "different_worker") {
        mir_callDynamicEx({
          secukey: logdata.log_secukey,
          mode: "html",
          node: "log_wrap_" + logdata.log_idx,
          arrset: { secuarr1: logdata.log_arr }
        });
      }
    },
    beforeSend: function (xhr) {
      if (loading_data == true) {
        if (aryData.keepHeight) {
          var nodeHeight = aryData.keepHeight;
          //var nodeHeight = 0;
          //$("#"+node).children().not(':empty').each(function () {
          //	nodeHeight += $(this).outerHeight(true);
          //});
          $("#" + node).css({ "min-height": nodeHeight + "px" });
        }
        $("#" + node).html(
          '<div class="mds-flex ovh"><div class="w100p tCenter"><img src="/js/_mir/loadingio/svg/obj/loadingbars.svg" border="0" style="width:100%; max-width:1.2rem;"></div></div>'
        );
      }
    },
    error: function (e) {
      //callDynamicEx();
      console.log(msgPrint);
    },
    timeout: limitout
  });
}

async function async_mir_callDynamicEx(aryData) {
  return new Promise((res) => {
    var node = aryData.node;
    var secukey = aryData.secukey;
    var sType = aryData.sType;
    var mode = aryData.mode;
    var limitout =
      typeof aryData.timeout === "undefined" ? aryData.timeout : 10000;
    var arrset = aryData.arrset;
    var cpinfo = aryData.cpinfo;
    var jarrset = JSON.stringify(arrset);
    var logdata = aryData.logdata;
    var loading_data = aryData.loading_data;
    var afterunlock = aryData.afterunlock;
    var aftertgobj = aryData.aftertgobj;

    if (aryData.success_node == true) {
      var success_node = $("body");
    }
    if (
      mode != "this_html" &&
      mode != "this_append" &&
      mode != "this_replacewith" &&
      mode != "this_appendTo"
    ) {
      var nodeblock = $("#" + node);
    }
    var msgPrint =
      "[cdyex] 네트워크 속도 문제로 시스템에 일시적인 문제가 발생하였습니다. 이 메세지가 지속되면 고객센터에 문의하여 주시기 바랍니다.";
    switch (sType) {
      default:
        var s_url = atob("L19taXIuZG8uc3FsZXhlYy5waHA=");
        break;
    }

    switch (mode) {
      default:
        if (nodeblock.children("div").hasClass("tBlack") == true) {
          nodeblock.children("div").html("");
        } else if (mode != "html") {
          nodeblock.html("");
        }
        break;
      case "this_html":
      case "this_append":
      case "this_replacewith":
      case "this_appendTo":
        break;
      case "next_html":
        break;
      case "save_html":
      case "save_append":
      case "text":
        break;
      case "save_append_waypoint":
        $("#smssenderwrap,#smssenderwrapbg,#smssenderScript").remove();
        break;
      case "popup":
        nodeblock = $("body");
        break;
      case "after":
        break;
    }
    if (
      mode != "this_html" &&
      mode != "this_append" &&
      mode != "this_appendTo" &&
      mode != "this_replacewith"
    ) {
      nodeblock.removeClass("disNone");
      if (loading_data == true) {
        $("#" + node).empty();
        nodeblock.append(
          '\
				<style>\
					.lds-ring {\
						display: inline-block;\
						position: relative;\
						width: 80px;\
						height: 80px;\
						left: 50%;\
						margin-left: -40px;\
						top: 50%;\
						margin-top: -40px;\
					}\
					.lds-ring div {\
						box-sizing: border-box;\
						display: block;\
						position: absolute;\
						width: 64px;\
						height: 64px;\
						margin: 8px;\
						border: 8px solid #f15353;\
						border-radius: 50%;\
						animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;\
						border-color: #f15353 transparent transparent transparent;\
					}\
					.lds-ring div:nth-child(1) {\
						animation-delay: -0.45s;\
					}\
					.lds-ring div:nth-child(2) {\
						animation-delay: -0.3s;\
					}\
					.lds-ring div:nth-child(3) {\
						animation-delay: -0.15s;\
					}\
					@keyframes lds-ring {\
						0% {\
						transform: rotate(0deg);\
						}\
						100% {\
						transform: rotate(360deg);\
						}\
					}</style>\
				<div class="lds-ring"><div></div><div></div><div></div><div></div></div>\
				'
        );
      }
    }
    $(".msgsendbox").html("");
    $.ajax({
      type: "POST",
      async: true,
      url: s_url,
      traditional: true,
      cache: false,
      data: {
        secukey: secukey,
        secuarrset: jarrset,
        cpinfo: cpinfo,
        node: node
      },
      success: function (data) {
        if (loading_data == true) {
          $("#" + node).empty();
        }
        switch (mode) {
          default:
          case "html":
            nodeblock.html(data);
            break;
          case "this_html":
            node.html(data);
            break;
          case "this_appendTo":
            node.append(data);
            break;
          case "this_replacewith":
            node.replaceWith(data);
            break;
          case "this_append":
            node.append(data);
            break;
          case "html_en":
            nodeblock.html(atob(data));
            break;
          case "html_fadeIn":
            nodeblock.html(data);
            break;
          case "html_safe":
            var data_safe = data;
            //data_safe = data_safereplace(data_safe,"'","\\'");
            //var data_safe = data.replace(/'/gi,"\\\'");
            //var data_safe = data.replace(/'/gi,"\\\'"');
            //nodeblock.html(encodeAll(data_safe));
            nodeblock.html(data_safe);
            break;
          case "next_html":
            nodeblock.next().html(data);
            break;
          case "append":
          case "save_append":
            //					console.log(mode);
            if (data == "assist_worker_overlap") {
              alert("이미 추가된 작업자입니다.");
            } else {
              nodeblock.append(data);
            }
            break;
          case "save_append_waypoint":
            nodeblock.append(data);
            break;
          case "value":
            nodeblock.val(data);
            break;
          case "valueprint":
            if (success_node && data != "different_worker") {
              success_node.append(
                '<div id="change_save_alert"><p>변경사항이 저장되었습니다.</p></div>'
              );
              setTimeout(function () {
                $("#change_save_alert").remove();
              }, 3000);
            }

            if (data == "different_worker") {
              alert("본인의 작업만 수정할 수 있습니다.");
            }
            console.log(data);
            //					nodeblock.val(data);
            break;
          case "popup":
            nodeblock.append(data);
            break;
          case "after":
            nodeblock.after(data);
            break;
          case "text":
            if (data == "different_worker") {
              alert("본인의 작업만 수정할 수 있습니다.");
            } else {
              nodeblock.text(data);
            }
            break;
        }
        //console.log(afterunlock);
        if (afterunlock == "Y") {
          aftertgobj.prop("disabled", false);
        }

        if (logdata != undefined && data != "different_worker") {
          mir_callDynamicEx({
            secukey: logdata.log_secukey,
            mode: "html",
            node: "log_wrap_" + logdata.log_idx,
            arrset: { secuarr1: logdata.log_arr }
          });
        }

        res("ok");
      },
      error: function (e) {
        //callDynamicEx();
        console.log(msgPrint);
      },
      timeout: limitout
    });
  });
}

function mir_assist_callDynamicEx(aryData) {
  var node = aryData.node;
  var secukey = aryData.secukey;
  var sType = aryData.sType;
  var mode = aryData.mode;
  var limitout =
    typeof aryData.timeout === "undefined" ? aryData.timeout : 10000;
  var arrset = aryData.arrset;
  var cpinfo = aryData.cpinfo;
  var jarrset = JSON.stringify(arrset);

  var logdata = aryData.logdata;

  var loading_data = aryData.loading_data;

  if (aryData.success_node == true) {
    var success_node = $("body");
  }

  var nodeblock = $("#" + node);
  var msgPrint =
    "[cdyex] 네트워크 속도 문제로 시스템에 일시적인 문제가 발생하였습니다. 이 메세지가 지속되면 고객센터에 문의하여 주시기 바랍니다.";
  switch (sType) {
    default:
      var s_url = atob("L19taXIvcGx1Z2luL2Fzc2lzdC5hamF4LmNvcmUucGhw");
      break;
  }

  switch (mode) {
    default:
      if (nodeblock.children("div").hasClass("tBlack") == true) {
        nodeblock.children("div").html("");
      } else if (mode != "html") {
        nodeblock.html("");
      }
      break;
    case "next_html":
      break;
    case "save_html":
    case "save_append":
    case "text":
      break;
    case "save_append_waypoint":
      $("#smssenderwrap,#smssenderwrapbg,#smssenderScript").remove();
      break;
    case "popup":
      nodeblock = $("body");
      break;
    case "after":
      break;
  }
  nodeblock.removeClass("disNone");

  if (loading_data == true) {
    $("#" + node).empty();
    nodeblock.append(
      '\
		<style>\
			.lds-ring {\
				display: inline-block;\
				position: relative;\
				width: 80px;\
				height: 80px;\
				left: 50%;\
				margin-left: -40px;\
				top: 50%;\
				margin-top: -40px;\
			}\
			.lds-ring div {\
				box-sizing: border-box;\
				display: block;\
				position: absolute;\
				width: 64px;\
				height: 64px;\
				margin: 8px;\
				border: 8px solid #f15353;\
				border-radius: 50%;\
				animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;\
				border-color: #f15353 transparent transparent transparent;\
			}\
			.lds-ring div:nth-child(1) {\
				animation-delay: -0.45s;\
			}\
			.lds-ring div:nth-child(2) {\
				animation-delay: -0.3s;\
			}\
			.lds-ring div:nth-child(3) {\
				animation-delay: -0.15s;\
			}\
			@keyframes lds-ring {\
				0% {\
				transform: rotate(0deg);\
				}\
				100% {\
				transform: rotate(360deg);\
				}\
			}</style>\
		<div class="lds-ring"><div></div><div></div><div></div><div></div></div>\
		'
    );
  }
  $(".msgsendbox").html("");
  $.ajax({
    type: "POST",
    async: true,
    url: s_url,
    traditional: true,
    cache: false,
    data: {
      secukey: secukey,
      secuarrset: jarrset,
      cpinfo: cpinfo,
      node: node
    },
    success: function (data) {
      if (loading_data == true) {
        $("#" + node).empty();
      }
      switch (mode) {
        default:
        case "html":
          nodeblock.html(data);
          break;
        case "append":
        case "save_append":
          if (data == "assist_worker_overlap") {
            alert("이미 추가된 작업자입니다.");
          } else {
            nodeblock.append(data);
          }
          break;
        case "value":
          nodeblock.val(data);
          break;
        case "valueprint":
          if (success_node && data != "different_worker") {
            success_node.append(
              '<div id="change_save_alert"><p>변경사항이 저장되었습니다.</p></div>'
            );
            setTimeout(function () {
              $("#change_save_alert").remove();
            }, 3000);
          }

          if (data == "different_worker") {
            alert("본인의 작업만 수정할 수 있습니다.");
          }
          console.log(data);
          //					nodeblock.val(data);
          break;
        case "popup":
          nodeblock.append(data);
          break;
        case "after":
          nodeblock.after(data);
          break;
        case "text":
          if (data == "different_worker") {
            alert("본인의 작업만 수정할 수 있습니다.");
          } else {
            nodeblock.text(data);
          }
          break;
      }

      if (logdata != undefined && data != "different_worker") {
        mir_callDynamicEx({
          secukey: logdata.log_secukey,
          mode: "html",
          node: "log_wrap_" + logdata.log_idx,
          arrset: { secuarr1: logdata.log_arr }
        });
      }
    },
    error: function (e) {
      console.log(msgPrint);
    },
    timeout: limitout
  });
}

function sms_loader(num, node, farr1, farr2, farr3) {
  var nodeblock = $("#" + node);
  nodeblock.removeClass("disNone").addClass("disBlock");

  $(".msgsendbox").html("");
  $.ajax({
    type: "POST",
    async: true,
    url: "/_mir.do.sqlexec.php",
    traditional: true,
    cache: false,
    data: { sndnum: num, secukey: farr1, secuarr1: farr2, cpinfo: farr3 },
    success: function (data) {
      nodeblock.html(data);
    },
    error: function (e) {
      alert(
        "[sld]시스템에 일시적인 문제가 발생하였습니다. 고객센터에 문의하여 주시기 바랍니다."
      );
    },
    timeout: 10000
  });
}

function AddComma(num) {
  var regexp = /\B(?=(\d{3})+(?!\d))/g;
  return num.toString().replace(regexp, ",");
}
function mir_number_addCommas(numStr) {
  return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function addCommas(nStr) {
  nStr += "";
  x = nStr.split(".");
  x1 = x[0];
  x2 = x.length > 1 ? "." + x[1] : "";
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, "$1" + "," + "$2");
  }
  return x1 + x2;
}

function payhistory(dataresult, node) {
  $.ajax({
    type: "POST",
    async: false,
    url: "/_mir.do.sqlexec.php",
    traditional: true,
    cache: false,
    data: { temper: dataresult, keytype: "payhistory" },
    success: function (data) {
      $("#" + node).show();
      $("#" + node).html(data);
    },
    error: function (e) {
      console.log(msgPrint);
    },
    timeout: 10000
  });
}

function result_call(num, node, farr1, farr2, farr3) {
  var nodeblock = $("#" + node);
  var msgPrint =
    "[rc]시스템에 일시적인 문제가 발생하였습니다. 고객센터에 문의하여 주시기 바랍니다.";

  nodeblock.removeClass("disNone").addClass("disBlock");

  if (num == "cancel") {
    var cancelmsg = confirm("취소하시겠습니까? 취소 후 복구는 불가합니다.");
    if (cancelmsg == false) {
      return false;
    }
  }

  $(".msgsendbox").html("");
  $.ajax({
    type: "POST",
    async: false,
    url: "/_mir.do.sqlexec.php",
    traditional: true,
    cache: false,
    data: { sndnum: num, secukey: farr1, secuarr2: farr2, secuarr3: farr3 },
    success: function (data) {
      nodeblock.html(data);
    },
    error: function (e) {
      console.log(msgPrint);
    },
    timeout: 10000
  });
}

function mbid_chk(v) {
  var msgPrint =
    "[midc]시스템에 일시적인 문제가 발생하였습니다. 고객센터에 문의하여 주시기 바랍니다.";
  var valmbid = v.value;
  $.ajax({
    type: "POST",
    async: false,
    url: "/_mir.do.sqlexec.php",
    traditional: true,
    cache: false,
    data: { reg_mb_id: valmbid, keytype: "id_validate" },
    success: function (data) {
      if (data == "") {
        $("span#msg_mb_id").html("아이디를 입력해주세요.");
        $("input[name='mb_id']").addClass("attentionBorder2px");
        $("input[name='mb_id_state']").val("N");
      } else {
        switch (data) {
          default:
            $("span#msg_mb_id").html(data);
            $("input[name='mb_id']").addClass("attentionBorder2px");
            $("input[name='mb_id_state']").val("N");
            break;
          case "noenter":
            $("span#msg_mb_id").html("아이디를 입력해주세요.");
            $("input[name='mb_id']").addClass("attentionBorder2px");
            $("input[name='mb_id_state']").val("N");
            break;
          case "deny":
            $("span#msg_mb_id").html("이미 사용중인 아이디입니다.");
            $("input[name='mb_id']").addClass("attentionBorder2px");
            $("input[name='mb_id_state']").val("N");
            break;
          case "allow":
            $("span#msg_mb_id").html("사용가능한 아이디입니다.");
            $("input[name='mb_id']").removeClass("attentionBorder2px");
            $("input[name='mb_id_state']").val("Y");
            break;
        }
      }
    },
    error: function (e) {
      console.log(msgPrint);
    },
    timeout: 10000
  });
}

function mbnick_chk(v) {
  var msgPrint =
    "시스템에 일시적인 문제가 발생하였습니다. 고객센터에 문의하여 주시기 바랍니다.";
  var valmbid = v.value;
  $.ajax({
    type: "POST",
    async: false,
    url: "/_mir.do.sqlexec.php",
    traditional: true,
    cache: false,
    data: { reg_mb_nick: valmbid, keytype: "nick_validate" },
    success: function (data) {
      if (data == "") {
        $("span#msg_mb_nick").html("닉네임을 입력해주세요.");
        $("input[name='mb_nick']").addClass("attentionBorder2px");
        $("input[name='mb_nick_state']").val("N");
      } else {
        switch (data) {
          case "nick_chk_trim":
            $("span#msg_mb_nick").html(
              "닉네임은 공백없이 한글, 영문, 숫자만 입력 가능합니다."
            );
            $("input[name='mb_nick']").addClass("attentionBorder2px");
            $("input[name='mb_nick_state']").val("N");
            break;
          case "nick_chk_trim2":
            $("span#msg_mb_nick").html(
              "닉네임은 한글 2글자, 영문 4글자 이상 입력 가능합니다."
            );
            $("input[name='mb_nick']").addClass("attentionBorder2px");
            $("input[name='mb_nick_state']").val("N");
            break;
          case "allow":
            $("span#msg_mb_nick").html(
              valmbid + " 이 닉네임은 사용가능합니다."
            );
            $("input[name='mb_nick']").removeClass("attentionBorder2px");
            $("input[name='mb_nick_state']").val("Y");
            break;
          case "deny_use":
            $("span#msg_mb_nick").html("현재 등록된 닉네임과 동일합니다.");
            $("input[name='mb_nick']").removeClass("attentionBorder2px");
            $("input[name='mb_nick_state']").val("Y");
            break;
          case "deny":
            $("span#msg_mb_nick").html("이 닉네임은 이미 사용중입니다.");
            $("input[name='mb_nick']").addClass("attentionBorder2px");
            $("input[name='mb_nick_state']").val("N");
            break;
        }
      }
    },
    error: function (e) {
      console.log(msgPrint);
    },
    timeout: 10000
  });
}

function mir_reg_mb_email_check() {
  var result = "";
  var valmbid = $("#reg_mb_email").val();
  $.ajax({
    type: "POST",
    url: "/_mir.do.sqlexec.php",
    data: {
      reg_mb_email: valmbid,
      keytype: "email_validate_sp"
    },
    cache: false,
    async: false,
    success: function (data) {
      result = data;
    }
  });
  return result;
}

function mbemail_chk(v) {
  var msgPrint =
    "시스템에 일시적인 문제가 발생하였습니다. 고객센터에 문의하여 주시기 바랍니다.";
  var valmbid = v.value;
  $.ajax({
    type: "POST",
    async: false,
    url: "/_mir.do.sqlexec.php",
    traditional: true,
    cache: false,
    data: { reg_mb_email: valmbid, keytype: "email_validate" },
    success: function (data) {
      if (data == "") {
        $("span#msg_mb_email").html("이메일을 입력해주세요.");
        $("input[name='mb_email']").addClass("attentionBorder2px");
        $("input[name='mb_email_state']").val("N");
      } else {
        switch (data) {
          case "allow":
            $("span#msg_mb_email").html(valmbid + " 이 이메일은 가능합니다.");
            $("input[name='mb_email']").removeClass("attentionBorder2px");
            $("input[name='mb_email_state']").val("Y");
            break;
          case "deny_use":
            $("span#msg_mb_email").html("현재 등록된 이메일과 동일합니다.");
            $("input[name='mb_email']").removeClass("attentionBorder2px");
            $("input[name='mb_email_state']").val("Y");
            break;
          case "deny":
            $("span#msg_mb_email").html("이 이메일은 이미 사용중입니다.");
            $("input[name='mb_email']").addClass("attentionBorder2px");
            $("input[name='mb_email_state']").val("N");
            break;
          case "notemail":
            $("span#msg_mb_email").html("이 이메일 형식이 올바르지 않습니다.");
            $("input[name='mb_email']").addClass("attentionBorder2px");
            $("input[name='mb_email_state']").val("N");
            break;
        }
      }
    },
    error: function (e) {
      console.log(msgPrint);
    },
    timeout: 10000
  });
}

function mir_reg_mb_hp_check() {
  var result = "";
  var valmbhp = $("#reg_mb_hp").val();
  $.ajax({
    type: "POST",
    url: "/_mir.do.sqlexec.php",
    data: {
      reg_mb_hp: valmbhp,
      keytype: "hp_validate_sp"
    },
    cache: false,
    async: false,
    success: function (data) {
      result = data;
    }
  });
  return result;
}

function mbhp_chk(v) {
  var msgPrint =
    "시스템에 일시적인 문제가 발생하였습니다. 고객센터에 문의하여 주시기 바랍니다.";
  var valmbid = v.value;
  $.ajax({
    type: "POST",
    async: false,
    url: "/_mir.do.sqlexec.php",
    traditional: true,
    cache: false,
    data: { reg_mb_hp: valmbid, keytype: "hp_validate" },
    success: function (data) {
      if (data == "") {
        $("span#msg_mb_hp").html("");
        $("input[name='mb_hp']").removeClass("attentionBorder2px");
        $("input[name='mb_hp_state']").val("Y");
      } else {
        switch (data) {
          case "allow":
            $("span#msg_mb_hp").html(valmbid + " 이 번호는 사용이 가능합니다.");
            $("input[name='mb_hp']").removeClass("attentionBorder2px");
            $("input[name='mb_hp_state']").val("Y");
            break;
          case "deny":
            $("span#msg_mb_hp").html("이미 사용중인 번호입니다.");
            $("input[name='mb_hp']").addClass("attentionBorder2px");
            $("input[name='mb_hp_state']").val("N");
            break;
          case "deny_use":
            $("span#msg_mb_hp").html("현재 번호와 동일합니다.");
            $("input[name='mb_hp']").removeClass("attentionBorder2px");
            $("input[name='mb_hp_state']").val("Y");
            break;
        }
      }
    },
    error: function (e) {
      console.log(msgPrint);
    },
    timeout: 10000
  });
}

function mir_EmailCheck(email_address) {
  //email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
  //const email_regex = /^(?!.*\.\.)[a-zA-Z0-9]+([._%+-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,63}$/;
  const email_regex =
    /^(?!.*\.\.)[a-zA-Z0-9]+([._%+-]?[a-zA-Z0-9]+)*@([a-zA-Z0-9가-힣-]+(\.[a-zA-Z0-9가-힣-]+)*)\.[a-zA-Z가-힣]{2,63}$/;

  if (!email_regex.test(email_address)) {
    return false;
  } else {
    return true;
  }
}

function mir_hpnum_check(phone_number) {
  const onlyDigits = phone_number.replace(/\D/g, "");
  const mobileRegex = /^010\d{8}$/; // 010 + 8자리 (총 11자리)
  return mobileRegex.test(onlyDigits);
}

function isCellPhone(p) {
  p = p.split("-").join("");
  var regPhone = /^((01[1|6|7|8|9])[1-9]+[0-9]{6,7})|(010[1-9][0-9]{7})$/;
  return regPhone.test(p);
}

function mir_Password_Check(password_key) {
  var encUrl =
    "L21ydy9zZGsvX2NvcmUvc3lzdGVtL2xpYi92YWxpZGF0ZS9wd2QucG9saWN5LmNoZWNrLnBocA==";
  var url = atob(encUrl);

  $.ajax({
    type: "POST",
    async: false,
    url: url,
    traditional: true,
    dataType: "text",
    cache: false,
    data: {
      datakey: password_key
    },
    success: function (data) {
      tmpvar = data;
    },
    error: function (data) {
      mir_minialertbox(
        "",
        "일시적인 통신에러가 발생하였습니다. 잠시후 재시도 바랍니다",
        ""
      );
    },
    timeout: 10000
  });
  return tmpvar;
}

function mir_Nickname_Check(nickname, mode) {
  var encUrl =
    "L21ydy9zZGsvX2NvcmUvc3lzdGVtL2xpYi92YWxpZGF0ZS92YWxpZGF0ZS5hamF4LmFwaS5waHA=";
  var url = atob(encUrl);

  $.ajax({
    type: "POST",
    async: false,
    url: url,
    traditional: true,
    dataType: "text",
    cache: false,
    data: {
      datakey: nickname,
      mode: mode
    },
    success: function (data) {
      tmpvar = data;
    },
    error: function (data) {
      mir_minialertbox(
        "",
        "일시적인 통신에러가 발생하였습니다. 잠시후 재시도 바랍니다",
        ""
      );
    },
    timeout: 10000
  });
  return tmpvar;
}

function checkNumInput(ft, sn, en) {
  var ftval = ft.value;
  if (ftval < sn) {
    ft.value = sn;
    alert(sn + "부터" + en + "까지 입력 가능");
  } else if (ftval > en) {
    ft.value = en;
    alert(sn + "부터" + en + "까지 입력 가능");
  } else {
  }
}

function enable_admPanel(uid) {
  //	e.preventDefault();
  $("li." + uid)
    .find("ul.mir_admpanel")
    .css({ display: "block" });
}
function disable_admPanel(uid) {
  //	e.preventDefault();
  $("li." + uid)
    .find("ul.mir_admpanel")
    .css({ display: "none" });
}

$(document).on("mouseover", ".setLine_s", function () {
  $(this).addClass("df_line_s");
});
$(document).on("mouseleave", ".setLine_s", function () {
  $(this).removeClass("df_line_s");
});

$(document).on("keyup", ".reTyping", function () {
  if ($(this).val().length > 0) {
    $(this).removeClass("bgMint");
  } else if ($(this).val().length == 0) {
    $(this).addClass("bgMint");
  }
});
$(document).on("keyup", ".onlynumber, .kr-mobilephone", function () {
  if ($(this).val().length > 11) {
    mir_minialertbox(
      "",
      "번호 길이를 확인해주세요. 대한민국 핸드폰번호는 최대 11자리입니다.",
      ""
    );
    $(this).val($(this).val().substring(0, 11));
  }
  $(this).val(
    $(this)
      .val()
      .replace(/[^0-9]/g, "")
  );
});
$(document).on("keyup", ".onlyage", function () {
  if ($(this).val().length > 2) {
    if ($(this).val() != 100) {
      alert("99세 이상은 100세로 표기합니다.");
      $(this).val(100);
    }
  }
  $(this).val(
    $(this)
      .val()
      .replace(/[^0-9]/g, "")
  );
});
$(document).on("keyup", ".spacetocomma", function () {
  //	$(this).val($(this).val().replace(/[^ ]/g,","));
  $(this).val($(this).val().replace(" ", ","));
});

$(document).on(
  "blur change input paste",
  'input[type="text"][data-email][req-validate]',
  function () {
    var val = $(this).val().trim();
    if (val.length > 0) {
      var val_result = mir_EmailCheck(val);
      if (val_result === false) {
        $(this)
          .prev(".mds-input-label")
          .removeClass("mismatch match")
          .addClass("disNone");
        $(this)
          .parent()
          .next(".hintbox ")
          .removeClass("disNone")
          .text("이메일 주소 정확히 입력해주세요.");
      } else {
        $(this)
          .prev(".mds-input-label")
          .removeClass("disNone mismatch")
          .addClass("match")
          .text("형식유효");
        $(this)
          .parent()
          .next(".hintbox ")
          .addClass("disNone")
          .text($(this).attr("email-hint"));
      }
    } else {
      $(this)
        .prev(".mds-input-label")
        .removeClass("mismatch match")
        .addClass("disNone")
        .text("");
      if ($(this).is(":focus") === true) {
        $(this)
          .parent()
          .next(".hintbox ")
          .text($(this).attr("email-hint"))
          .removeClass("disNone");
      } else {
        $(this).parent().next(".hintbox ").text($(this).attr("email-hint"));
      }
    }
  }
);

$(document).on("blur", 'input[type="text"][data-email]', function () {
  var val = $(this).val().trim();
  if (val) {
    var blur_result = mir_EmailCheck(val);
    if (blur_result === false) {
      mir_minialertbox(
        "",
        "이메일주소가 정확하고 올바른지 다시 확인해 주세요!",
        ""
      );
      $(this).focus();
      return false;
    }
  }
});

$(document).on(
  "input",
  'input[type="text"][data-cellphone][req-validate]',
  function () {
    //var val = $(this).val().trim();
    let val = $(this).val().replace(/\D/g, ""); // 숫자 외 제거
    if (val.length > 11) val = val.slice(0, 11); // 11자리 초과시 자르기
    if (val.length > 0) {
      var val_result = mir_hpnum_check(val);
      if (val_result === false) {
        $(this)
          .prev(".mds-input-label")
          .removeClass("mismatch match")
          .addClass("disNone");
        $(this)
          .parent()
          .next(".hintbox ")
          .removeClass("disNone")
          .text("모바일번호를 정확히 입력해주세요.(숫자만)");
      } else {
        $(this)
          .prev(".mds-input-label")
          .removeClass("disNone mismatch")
          .addClass("match")
          .text("형식유효");
        $(this)
          .parent()
          .next(".hintbox ")
          .addClass("disNone")
          .text($(this).attr("mobilenum-hint"));
      }
    } else {
      $(this)
        .prev(".mds-input-label")
        .removeClass("mismatch match")
        .addClass("disNone")
        .text("");
      if ($(this).is(":focus") === true) {
        $(this)
          .parent()
          .next(".hintbox ")
          .text($(this).attr("mobilenum-hint"))
          .removeClass("disNone");
      } else {
        $(this).parent().next(".hintbox ").text($(this).attr("mobilenum-hint"));
      }
    }
  }
);

$(document).on("input", 'input[type="text"][data-cellphone]', function () {
  let val = $(this).val().replace(/\D/g, ""); // 숫자 외 제거
  if (val.length > 11) val = val.slice(0, 11); // 11자리 초과시 자르기
  $(this).val(val);
});
$(document).on("blur", 'input[type="text"][data-cellphone]', function () {
  var val = $(this).val().trim();
  if (val) {
    var blur_result = mir_hpnum_check(val);
    if (blur_result === false) {
      mir_minialertbox(
        "",
        "모바일번호가 정확하고 올바른지 다시 확인해 주세요!",
        ""
      );
      $(this).focus();
      return false;
    }
  }
});

$(document).on(
  "blur change input paste",
  'input[type="text"][data-number]',
  function (evvent) {
    mir_eventStop(event);
    var val = mir_strip_number($(this).val().trim());
    $(this).val(val);
  }
);

$(document).on(
  "blur",
  'input[type="text"][data-number][matchkey]',
  function () {
    var val = mir_strip_number($(this).val().trim());
    console.log(val);
    if (val.length !== 6) {
      mir_minialertbox("", "인증번호 6자리를 정확히 입력해주세요", "");
      return false;
    }
  }
);

$(document).on("input", "[data-password]", function (event) {
  mir_eventStop(event);
  if ($(this).val().trim().length == 0) {
    $(this)
      .prev(".mds-input-label")
      .removeClass("disNone")
      .addClass("mismatch")
      .text("미입력");
  } else {
    $(this)
      .prev(".mds-input-label")
      .addClass("disNone")
      .removeClass("mismatch")
      .text("");
  }
});

function retryForm(f) {
  var tmp = $("form#" + f).serialize();
  return tmp;
}

function MirformAjax(fName, secukey, exeKey) {
  var queryString = $("form#form_" + fName).serialize();
  var fNameNum = fName.replace("submit_", "");

  if (
    $(
      "form#form_" +
        fName +
        " input[name='mir_content[requestset][requiredaccept][privicy]"
    ).is(":checked") != true
  ) {
    $("label.policy_" + fNameNum).addClass("bgAttention");
    alert("개인정보취급방침에 동의하셔야 합니다!");
    return false;
  }

  $("form#form_" + fName + " .required").each(function () {
    var thistitle = $(this).attr("title");
    var thisname = $(this).attr("name");
    if ($(this).val() == "") {
      $(this).focus();
      $(this).addClass("bgMint reTyping");
      alert(thistitle + "은 필수입력값 입니다");
      returnNow = true;
      return false;
    } else {
      if (thisname == "wr_1") {
        if ($(this).val().length >= 10 && $(this).val().length <= 11) {
        } else {
          $(this).focus();
          $(this).addClass("bgMint reTyping");
          alert(thistitle + "의 입력길이가 올바르지 않습니다.");
          returnNow = true;
          return false;
        }
      }
      returnNow = false;
    }
  });
  //console.log(returnNow);
  if (returnNow == true) {
    return;
  }

  $.ajax({
    type: "post",
    url: "/_mir.do.sqlexec.php",
    data: {
      secukey: secukey,
      secuStringArr: queryString,
      exeKey: exeKey
    },
    //		,dataType : 'json'
    error: function (xhr, status, error) {
      $("div.prt_" + fName).html("데이타통신에 실패하였습니다" + status);
    },
    success: function (dataResult) {
      var thisNode = $("div.prt_" + fName);

      switch (dataResult) {
        default:
          thisNode.html(dataResult);
          var thisNodeHeight = thisNode.outerHeight(true);
          thisNode.css({ height: thisNodeHeight + "px" });
          $("form#form_" + fName)[0].reset();
          break;
        case "no_privicy":
          alert("개인정보취급방침에 동의하셔야 합니다");
          $("label.policy_" + fNameNum).addClass("bgAttention");
          return false;
          break;
      }
    }
  });
}

$(document).ready(function () {
  $(document).on(
    "change",
    'input[role="switch"][disabled_target]',
    function (event) {
      mir_eventStop(event);

      const disabled_target = $(this).attr("disabled_target");
      const $target = $('[name="' + disabled_target + '"]');

      // 값이 없으면 true
      const active_action = String(
        $target.attr("active-action") || "true"
      ).toLowerCase();
      const isOn = $(this).prop("checked") === true;

      // active_action="true"  → isOn === true 일 때 disabled
      // active_action="false" → isOn === false 일 때 disabled
      const shouldDisable = active_action === "false" ? !isOn : isOn;

      $target
        .removeClass("dfBoxShadow-PP")
        .toggleClass("disabled", shouldDisable)
        .prop("disabled", shouldDisable);
    }
  );

  $(document).on(
    "blur change input paste",
    '.regist_label[fa="req"] input.fc-required',
    function (event) {
      if ($(this).val().length == 0) {
        $(this).addClass("dfBoxShadow-PP");
      } else {
        $(this).removeClass("dfBoxShadow-PP");
      }
    }
  );

  $(".qimg_li").hover(
    function () {
      $(this).children(".qimg_setup").show();
    },
    function () {
      $(this).children(".qimg_setup").hide();
    }
  );

  $("svg").mouseenter(function () {
    $(this)
      .find("*.hover")
      .each(function () {
        var thisConfirmHoverFill = $(this).attr("hoverfill");
        var thisConfirmHoverStroke = $(this).attr("hoverstroke");
        if (thisConfirmHoverFill != "") {
          $(this).css({ fill: thisConfirmHoverFill });
        }
        if (thisConfirmHoverStroke != "") {
          $(this).css({ stroke: thisConfirmHoverStroke });
        }
      });
  });

  $("svg").mouseleave(function () {
    $(this)
      .find("*.hover")
      .each(function () {
        var thisConfirmSaveFill = $(this).attr("savefill");
        var thisConfirmSaveStroke = $(this).attr("savestroke");
        if (thisConfirmSaveFill != "") {
          $(this).css({ fill: thisConfirmSaveFill });
        }
        if (thisConfirmSaveStroke != "") {
          $(this).css({ stroke: thisConfirmSaveStroke });
        }
      });
  });

  $(".mir_button").mouseover(function () {
    var thishoverbgcolor = $(this).attr("hover-background-color");
    var thishovercolor = $(this).attr("hover-color");
    var thishoverBoxShadow = $(this).attr("hover-box-shadow");
    var thishoverOpacity = $(this).attr("hover-opacity");
    var thishoverBorderTop = $(this).attr("hover-border-top");
    var thishoverBorderBottom = $(this).attr("hover-border-bottom");
    var thishoverBorderLeft = $(this).attr("hover-border-left");
    var thishoverBorderRight = $(this).attr("hover-border-right");

    if (thishoverbgcolor != "") {
      $(this).css({ "background-color": thishoverbgcolor });
    }
    if (thishovercolor != "") {
      $(this).css({ color: thishovercolor });
    }
    if (thishoverBoxShadow != "") {
      $(this).css({ "box-shadow": thishoverBoxShadow });
    }
    if (thishoverOpacity != "") {
      $(this).css({ opacity: thishoverOpacity });
    }
    if (thishoverBorderTop != "") {
      $(this).css({ "border-top": thishoverBorderTop });
    }
    if (thishoverBorderBottom != "") {
      $(this).css({ "border-bottom": thishoverBorderBottom });
    }
    if (thishoverBorderLeft != "") {
      $(this).css({ "border-left": thishoverBorderLeft });
    }
    if (thishoverBorderRight != "") {
      $(this).css({ "border-right": thishoverBorderRight });
    }
    $(this)
      .find("svg *.hover")
      .each(function () {
        var thisConfirmHoverFill = $(this).attr("hoverfill");
        var thisConfirmHoverStroke = $(this).attr("hoverstroke");
        if (thisConfirmHoverFill != "") {
          $(this).css({ fill: thisConfirmHoverFill });
        }
        if (thisConfirmHoverStroke != "") {
          $(this).css({ stroke: thisConfirmHoverStroke });
        }
      });
  });

  $(".mir_button").mouseout(function () {
    var thisbgcolor = $(this).attr("background-color");
    var thiscolor = $(this).attr("color");
    var thisBoxShadow = $(this).attr("box-shadow");
    var thisOpacity = $(this).attr("opacity");
    var thisBorderTop = $(this).attr("border-top");
    var thisBorderBottom = $(this).attr("border-bottom");
    var thisBorderLeft = $(this).attr("border-left");
    var thisBorderRight = $(this).attr("border-right");
    if (thisbgcolor != "") {
      $(this).css({ "background-color": thisbgcolor });
    }
    if (thiscolor != "") {
      $(this).css({ color: thiscolor });
    }
    if (thisBoxShadow != "") {
      $(this).css({ "box-shadow": thisBoxShadow });
    }
    if (thisOpacity != "") {
      $(this).css({ opacity: thisOpacity });
    }
    if (thisBorderTop != "") {
      $(this).css({ "border-top": thisBorderTop });
    }
    if (thisBorderBottom != "") {
      $(this).css({ "border-bottom": thisBorderBottom });
    }
    if (thisBorderLeft != "") {
      $(this).css({ "border-left": thisBorderLeft });
    }
    if (thisBorderRight != "") {
      $(this).css({ "border-right": thisBorderRight });
    }
    $(this)
      .find("svg *.hover")
      .each(function () {
        var thisConfirmSaveFill = $(this).attr("savefill");
        var thisConfirmSaveStroke = $(this).attr("savestroke");
        if (thisConfirmSaveFill != "") {
          $(this).css({ fill: thisConfirmSaveFill });
        }
        if (thisConfirmSaveStroke != "") {
          $(this).css({ stroke: thisConfirmSaveStroke });
        }
      });
  });

  $(".anirubberBandOver").on("mouseover", function () {
    $(".anirubberBandOver")
      .stop()
      .css({ "animation-play-state": "running", "animation-name": "none" });
    $(this).stop().css({
      "animation-play-state": "running",
      "animation-duration": "1s",
      "animation-name": "rubberBand",
      "animation-iteration-count": "infinite"
    });
  });
  $(".anirubberBandClick").on("click", function () {
    $(".anirubberBandClick")
      .stop()
      .css({ "animation-play-state": "running", "animation-name": "none" });
    $(this).stop().css({
      "animation-play-state": "running",
      "animation-duration": "1s",
      "animation-name": "rubberBand",
      "animation-iteration-count": "infinite"
    });
  });

  $(".anibounceOver").on("mouseover", function () {
    $(".anibounceOver")
      .stop()
      .css({ "animation-play-state": "running", "animation-name": "none" });
    $(this).stop().css({
      "animation-play-state": "running",
      "animation-duration": "1s",
      "animation-name": "bounce",
      "animation-iteration-count": "infinite"
    });
  });
  $(".aniShakeOver").on("mouseover", function () {
    $(".aniShakeOver")
      .stop()
      .css({ "animation-play-state": "running", "animation-name": "none" });
    $(this).stop().css({
      "animation-play-state": "running",
      "animation-duration": "0.5s",
      "animation-name": "shake",
      "animation-iteration-count": "infinite"
    });
  });
  $(".aniHeartBeatOver").on("mouseover", function () {
    $(".aniHeartBeatOver")
      .stop()
      .css({ "animation-play-state": "running", "animation-name": "none" });
    $(this).stop().css({
      "animation-play-state": "running",
      "animation-duration": "1s",
      "animation-name": "heartBeat",
      "animation-iteration-count": "infinite"
    });
  });

  $(".anibounce1t_click").on("click", function () {
    $(".anibounce1t_click")
      .stop()
      .css({ "animation-play-state": "running", "animation-name": "none" });
    $(this).stop().css({
      "animation-play-state": "running",
      "animation-duration": "1s",
      "animation-name": "bounce",
      "animation-iteration-count": "1"
    });
  });

  $(
    ".anirubberBandOver,.anibounceOver,.aniShakeOver,.aniPulseOver,.aniHeartBeatOver"
  ).on("mouseout", function () {
    $(this)
      .stop()
      .css({ "animation-iteration-count": "1", "animation-name": "none" });
  });

  $(document).on("click", ".admpn_modify", function (e) {
    e.stopPropagation();
    var addr = $(this).attr("rel");
    location.href = addr;
  });

  $(".admpn_close").on("click", function (e) {
    e.stopPropagation();
    $(this).parents().eq(2).addClass("disNone");
  });

  $(".mirpick_datepicker").datepicker({
    changeMonth: true,
    changeYear: true
  });

  $(".mir_admpanel_move").draggable({
    cursor: "move"
  });

  $(".dfLabel input.typeLabel").on("change", function () {
    var thisNum = $(this).attr("id");

    $("label#" + thisNum).removeClass("labelhover");
    if ($("label#" + thisNum).hasClass("labelhover") == false) {
      $("label#" + thisNum).addClass("labelhover");
    } else {
      $("label#" + thisNum).removeClass("labelhover");
    }
  });

  $(document).on(
    "keyup paste input change",
    "input[type=number].underone",
    function () {
      if ($(this).val() < 0 && $(this).val() <= 1) {
        alert("입력값은 0보다 크거나 같아야합니다. 입력값을 확인해주세요.");
        $(this).val("0").focus();
        return;
      } else if ($(this).val() > 0 && $(this).val() >= 1) {
        alert("입력값은 1보다 작거나 같아야합니다. 입력값을 확인해주세요.");
        $(this).val("1").focus();
        return;
      }
    }
  );

  $(document).on(
    "keyup paste input change",
    "input[type=number].minzero,input[type=number].nozero",
    function () {
      if ($(this).val() < 0) {
        alert("입력값은 0보다 커야합니다. 입력값을 확인해주세요.");
        $(this).val("0").focus();
        return;
      }
    }
  );

  $(document).on(
    "keyup paste input change",
    "input[type=number].dfone",
    function () {
      if ($(this).val() < 1) {
        alert("입력값은 1보다 같거나 커야합니다. 입력값을 확인해주세요.");
        $(this).val("1").focus();
        return;
      }
    }
  );
  $(document).on(
    "keyup paste input change",
    "input[type=number].max100",
    function () {
      if ($(this).val() > 100) {
        alert("입력값은 100보다 작아야합니다. 입력값을 확인해주세요.");
        $(this).val("100").focus();
        return;
      }
    }
  );

  $("#mir_quickmenu > ul > li")
    .not(".notatall")
    .on("mouseover", function () {
      $(this).children("div").removeClass("disNone");
    });

  $("#mir_quickmenu > ul > li")
    .not(".notatall")
    .on("mouseleave", function () {
      $(this).children("div").addClass("disNone");
    });

  $("#msgBoxTopWrap").on("click", function () {
    if ($("#msgBoxTop").hasClass("disNone") == true) {
      $("#msgBoxTop").removeClass("disNone");
    } else {
      $("#msgBoxTop").addClass("disNone");
    }
  });
  $(document).on("click", "#msgBoxTopClose", function () {
    $("#popup_center").html("");
    $("#msgBoxTop").addClass("disNone");
  });
  $(".msgBox_memoTopClose").on("click", function () {
    alert(1);
  });

  /*
		ie 9 under placeholer support
	*/
  /*
	if ((document.all && !document.querySelector) || (document.all && document.querySelector && !document.addEventListener) ) {

		if (!("placeholder" in document.createElement("input"))) { 
			jQuery(":input[placeholder]").each(function () {
				var $this = jQuery(this);
				var pos = $this.offset();
				if (!this.id) this.id = "jQueryVirtual_" + this.name;
				if (this.id) {
					if (jQuery.browser.version  < 8) {
						$this.after("<label for='" + this.id + 
							"' id='jQueryVirtual_label_" + this.id + 
							"' class='absolute'>" + $this.attr("placeholder") + 
							"</label>");
						$("#jQueryVirtual_label_" + this.id).
							css({"left":(pos.left+5), "margin-top":3, 
							"width":$this.width()});
					}
					else {
						$this.after("<label for='" + this.id + 
						"' id='jQueryVirtual_label_" + this.id + 
						"' style='left:" + (pos.left+5) + 
						"px;margin-top:2px' class='absolute'>" + 
						$this.attr("placeholder") + "</label>");
					}
				}
			}).focus(function () {
				var $this = jQuery(this);
				$this.addClass("focusbox");
				jQuery("#jQueryVirtual_label_" + $this.attr("id")).hide();
			}).blur(function () {
				var $this = jQuery(this);
				$this.removeClass("focusbox");
				if(!jQuery.trim($this.val())) 
					jQuery("#jQueryVirtual_label_" + $this.attr("id")).show();
				else jQuery("#jQueryVirtual_label_" + $this.attr("id")).hide();
			}).trigger("blur");
		}
	}
	*/

  $("body script.tgDel").remove();
});

function do_msgBox(md, stk, doexec, doarr, uno, uid) {
  $.ajax({
    type: "POST",
    async: true,
    url: "/_mir.do.sqlexec.php",
    traditional: true,
    cache: false,
    dataType: "json",
    data: {
      secukey: md,
      keyObject: stk,
      secretcode: doexec,
      chkkey: doarr,
      iskey: uno,
      iskey2: uid
    },
    success: function (data) {
      $("#popup_center").html(data.tpBackground);
      $("#msgBoxTop").html(data.defaulthtml);
      $(".msgBoxContent").html(data.msgContent);
      if (data.prtmemo) {
        $("#ol_after_memo").append(data.msgView);
      }
      $(".msgBoxContentFoot").html(data.msgContentFoot);
      $(".msgBoxContent_debug").html(data.debug);
      $(".msgCnt").html(data.msgCnt);
    },
    error: function (data) {
      $(".msgBoxContent_debug").html("Error : " + data.debug);
    },
    timeout: 10000
  });
}

function exeSort(key, doNum) {
  $.ajax({
    type: "POST",
    async: true,
    url: "/_mir.do.sqlexec.php",
    traditional: true,
    cache: false,
    data: {
      secukey: key,
      getdata: doNum
    },
    success: function (data) {
      $("#popup_center").html(data);
    },
    error: function (data) {
      //			$(".msgBoxContent_debug").html('Error : '+data.debug);
    },
    timeout: 10000
  });
}

function doSortable(doType, doNum, act, key) {
  switch (doType) {
    case "sortexec":
      $(document).ready(function () {
        $("#sortWrap" + doNum + " .sortable-list")
          .disableSelection()
          .sortable({
            opacity: 0.4,
            placeholder: "placeholder",
            connectWith: "#sortWrap" + doNum + " .sortable-list"
          });

        $(".sort_open" + doNum + "").click(function () {
          $(".sortContainerAll").hide();
          $("#sortContainer" + doNum + "").show();
        });

        $(".sort_close" + doNum + "").click(function () {
          $("#sortContainer" + doNum + "").hide();
        });

        $(".btn_save" + doNum + "").click(function () {
          getSortExec("" + doNum + "", "" + act + "", "" + key + "");
        });
      });
      break;
    case "sortAppend":
      $(document).ready(function () {
        $("#sortWrap_" + doNum + " .sortable-list").append("" + act + "");
      });
      break;
  }
}

/* 숫자만 입력받기 */
function fn_press(event, type) {
  if (type == "numbers") {
    if (event.keyCode < 48 || event.keyCode > 57) {
      return false;
    } else {
    }
    //onKeyDown일 경우 좌, 우, tab, backspace, delete키 허용 정의 필요
  }
}

$(document).on("keyup blur", ".eng_num_validate", function (e) {
  var inputValue = $(this).val();
  var cleanedValue = inputValue;
  // 한글금지
  if (
    (event.keyCode == 8 && inputValue.length > 0) ||
    event.keyCode == 9 ||
    event.keyCode == 37 ||
    event.keyCode == 39 ||
    (event.keyCode == 46 && inputValue.length > 0)
  )
    return;
  //var regExp = /^[A-Za-z][A-Za-z0-9]{0,14}$/gi;
  var regExp = /[^A-Za-z0-9]/gi;

  // 영문자 및 숫자가 아닌 모든 문자를 제거
  if (regExp.test(inputValue)) {
    var cleanedValue = inputValue.replace(regExp, "");
    $(this).attr("data-ready", "off");
    if ($("#popup_center #mini_alertbox #mirAlert").length == 0) {
      if ($("#popup_center #mini_alertbox").length == 0) {
        $("#popup_center").append('<div id="mini_alertbox"></div>');
      }
      $("#popup_center #mini_alertbox").append(
        '<div id="mirAlert" class="dfBoxShadow-PP fix-h-center pd1_2rem fs09rem bgWhite fcBlack dfRound1rem ptd_B mds-flex aitem-center" style="z-index:1000; gap:0.5rem;"><span class="material-icons-outlined fs1rem">sort_by_alpha</span><span>영문 및 숫자만 입력 가능해요!</span></div>'
      );
      $("#mirblind_b").removeClass("disNone");
      $("#mirAlert")
        .stop()
        .css("top", "-2rem") // 위에서 시작
        .show() // 요소 표시
        .animate({ top: "2rem" }, 200, "easeOutBounce")
        .delay(2000) // 2초 대기
        .animate({ top: "2.5rem" }, 200) // 살짝 내려오기
        .animate({ top: "-4rem" }, 100, "easeOutBounce", function () {
          $("#mirblind_b").animate({ opacity: 0 }, 200, function () {
            $(this).css({ opacity: 1 }).addClass("disNone");
          });
          $(this).fadeOut(300, function () {
            $(this).remove();
          });
        });
    }
    return $(this).val(cleanedValue);
  } else {
    $(this).parent().parent().next(".msg_result").html("");
  }
  // 유효한 값을 입력 필드에 설정
  $(this).val(cleanedValue);
  $(this).attr("data-ready", "on");
});

$(document).on("keyup blur", ".uid_validate", function (e) {
  var inputValue = $(this).val();
  var cleanedValue = inputValue;
  // 한글금지
  if (
    (event.keyCode == 8 && inputValue.length > 0) ||
    event.keyCode == 9 ||
    event.keyCode == 37 ||
    event.keyCode == 39 ||
    (event.keyCode == 46 && inputValue.length > 0)
  )
    return;
  //var regExp = /^[A-Za-z][A-Za-z0-9]{0,14}$/gi;
  var regExp = /[^A-Za-z0-9]/gi;

  // 영문자 및 숫자가 아닌 모든 문자를 제거
  if (regExp.test(inputValue)) {
    var cleanedValue = inputValue.replace(regExp, "");
    $(this).attr("data-ready", "off");
    $(this)
      .parent()
      .parent()
      .next(".msg_result")
      .html(
        '<span class="ptd_B fs08rem fcAttention">한글 및 공백,특수문자 입력 불가</span>'
      );
    return $(this).val(cleanedValue);
  } else {
    $(this).parent().parent().next(".msg_result").html("");
  }

  if (inputValue.length == 0) {
    $(this).attr("data-ready", "off");
    $(this)
      .parent()
      .parent()
      .next(".msg_result")
      .html(
        '<span class="ptd_B fs08rem fcAttention">계정명을 입력되지 않음</span>'
      );
    return $(this).val(cleanedValue);
  } else {
    // 첫 글자가 영문자인지 확인
    if (!/^[A-Za-z]/.test(cleanedValue)) {
      $(this).attr("data-ready", "off");
      cleanedValue = "";
      $(this)
        .parent()
        .parent()
        .next(".msg_result")
        .html(
          '<span class="ptd_B fs08rem fcAttention">숫자로 시작할 수 없습니다.</span>'
        );
      return $(this).val(cleanedValue);
    }
  }

  // 최대 길이를 15자로 제한
  if (cleanedValue.length > 15) {
    $(this).attr("data-ready", "off");
    cleanedValue = cleanedValue.substring(0, 15);
    $(this)
      .parent()
      .parent()
      .next(".msg_result")
      .html(
        '<span class="ptd_B fs08rem fcAttention">영문,숫자 최대 15자</span>'
      );
  }

  if (cleanedValue.length < 6) {
    $(this).attr("data-ready", "off");
    $(this)
      .parent()
      .parent()
      .next(".msg_result")
      .html(
        '<span class="ptd_B fs08rem fcAttention">영문,숫자 최소 6자</span>'
      );
    return $(this).val(cleanedValue);
  }

  // 유효한 값을 입력 필드에 설정
  $(this).val(cleanedValue);
  $(this).attr("data-ready", "on");
  $(this).parent().parent().next(".msg_result").html("");
});
$(document).on("keyup blur", ".no_specialkey", function (e) {
  // 한글금지
  if (
    event.keyCode == 8 ||
    event.keyCode == 9 ||
    event.keyCode == 37 ||
    event.keyCode == 39 ||
    event.keyCode == 46
  ) {
    //return;
  }

  var regExp = new RegExp("[^a-z0-9가-힣ㄱ-ㅎ]", "gi");
  var inputValue = $(this).val();
  var cleanedValue = inputValue;

  if (regExp.test(inputValue)) {
    $(this).attr("data-ready", "off");
    var finalvalue = $(this).val($(this).val().replace(regExp, ""));
    var alertmsg = "한글,영문,숫자 입력 가능 최대20자(특수문자,공백불가)";
    $(this)
      .parent()
      .parent()
      .next(".msg_result")
      .html('<span class="ptd_B fs08rem fcAttention">' + alertmsg + "</span>");
    console.log($(this).attr("data-alert"));
    if ($(this).attr("data-alert")) {
      mir_minialertbox("", alertmsg, "");
    }
    return finalvalue;
  } else {
  }

  if (inputValue.length == 0) {
    $(this).attr("data-ready", "off");
    var alertmsg2 = "서비스명(브랜드)가 입력되지 않았습니다.";
    $(this)
      .parent()
      .parent()
      .next(".msg_result")
      .html('<span class="ptd_B fs08rem fcAttention">' + alertmsg2 + "</span>");
    if ($(this).attr("data-alert")) {
      mir_minialertbox("", alertmsg2, "");
    }
    return $(this).val(cleanedValue);
  } else {
  }

  var inputmax = $(this).attr("data-lengthmax")
    ? $(this).attr("data-lengthmax")
    : 20;
  if (inputValue.length > inputmax) {
    $(this).attr("data-ready", "off");
    cleanedValue = cleanedValue.substring(0, 15);
    var alertmsg3 = "한글기준 " + inputmax + "자를 넘을 수 없습니다.";
    $(this)
      .parent()
      .parent()
      .next(".msg_result")
      .html('<span class="ptd_B fs08rem fcAttention">' + alertmsg3 + "</span>");
    if ($(this).attr("data-alert")) {
      mir_minialertbox("", alertmsg3, "");
    }
    return $(this).val(cleanedValue);
  }

  var inputmin = $(this).attr("data-lengthmin")
    ? $(this).attr("data-lengthmin")
    : 6;
  if (cleanedValue.length < inputmin) {
    $(this).attr("data-ready", "off");
    var alertmsg4 = "최소 " + inputmin + "자 이상 입력해주세요.";
    $(this)
      .parent()
      .parent()
      .next(".msg_result")
      .html('<span class="ptd_B fs08rem fcAttention">' + alertmsg4 + "</span>");
    if ($(this).attr("data-alert")) {
      //mir_minialertbox('',alertmsg4,'');
    }
    return $(this).val(cleanedValue);
  }

  $(this).attr("data-ready", "on");
  $(this).parent().parent().next(".msg_result").html("");
});

/* 한글입력 방지 */
function fn_press_han(obj) {
  //좌우 방향키, 백스페이스, 딜리트, 탭키에 대한 예외
  if (
    event.keyCode == 8 ||
    event.keyCode == 9 ||
    event.keyCode == 37 ||
    event.keyCode == 39 ||
    event.keyCode == 46
  )
    return;
  //obj.value = obj.value.replace(/[\a-zㄱ-ㅎㅏ-ㅣ가-힣]/g, '');
  obj.value = obj.value.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/g, "");
}

/* 특수문자 입력 방지*/
function characterCheck(obj) {
  var regExp = /[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi;
  // 허용할 특수문자는 여기서 삭제하면 됨
  // 지금은 띄어쓰기도 특수문자 처리됨 참고하셈
  if (regExp.test(obj.value)) {
    alert("특수문자와 공백은 입력하실수 없습니다.");
    obj.value = obj.value.substring(0, obj.value.length - 1); // 입력한 특수문자 한자리 지움
  }
}

/* -------------------------------------------------------
 * 1) 공통: 알림 (스팸 방지 - 같은 메시지 연속 최소 600ms)
 * ----------------------------------------------------- */
var mrw_lastAlert = { msg: "", ts: 0 };
function mrw_alert(msg) {
  if (typeof mir_minialertbox !== "function") return;
  var now = +new Date();
  if (mrw_lastAlert.msg === msg && now - mrw_lastAlert.ts < 600) return;
  mrw_lastAlert.msg = msg;
  mrw_lastAlert.ts = now;
  mir_minialertbox("", msg, "");
}

/* -------------------------------------------------------
 * 2) sanitize: class 기반 자동 교정
 * ----------------------------------------------------- */
function mrw_sanitize_input($el) {
  var v = $el.val();
  if (v === null || typeof v === "undefined") v = "";
  v = String(v);

  var msg = "";
  var changed = false;

  // no_space: 공백 제거(스페이스/탭/개행 등)
  if ($el.hasClass("no_space")) {
    var nv = v.replace(/\s+/g, "");
    if (nv !== v) {
      v = nv;
      changed = true;
      if (!msg) msg = "공백 입력할 수 없습니다.";
    }
  }

  // no_number: 숫자 제거
  if ($el.hasClass("no_number")) {
    var nv2 = v.replace(/[0-9]+/g, "");
    if (nv2 !== v) {
      v = nv2;
      changed = true;
      if (!msg) msg = "숫자 입력 불가합니다.";
    }
  }

  // no_special: 특수문자 제거 (한글/영문/숫자/공백 허용)
  if ($el.hasClass("no_special")) {
    var nv3 = v.replace(/[^0-9a-zA-Z가-힣\s]+/g, "");
    if (nv3 !== v) {
      v = nv3;
      changed = true;
      if (!msg) msg = "특수문자 입력 불가합니다.";
    }
  }

  // ★ only_number: 숫자 외 문자 제거 (숫자만 허용)
  // infoalert="true" 속성이 있을 때만 알림 표시
  if ($el.hasClass("only_number")) {
    var nv4 = v.replace(/[^0-9]/g, "");
    if (nv4 !== v) {
      v = nv4;
      changed = true;
      if (!msg && $el.attr("infoalert") === "true") {
        msg = "숫자만 입력 가능합니다.";
      }
    }
  }

  // ★ maxlength: 최대 길이 초과 시 자동 잘라냄
  // (브라우저 기본 maxlength와 별개로 동적 삽입 등에도 대응)
  var maxLen = parseInt($el.attr("maxlength"), 10);
  if (!isNaN(maxLen) && maxLen > 0 && v.length > maxLen) {
    v = v.substring(0, maxLen);
    changed = true;
    if (!msg && $el.attr("infoalert") === "true") {
      msg = "최대 " + maxLen + "자까지 입력 가능합니다.";
    }
  }

  // kr-mobilephone: 숫자만 + 010 시작(4번째부터 검사) + 최대 11자리
  if ($el.hasClass("kr-mobilephone")) {
    // (1) 숫자만
    var onlyNum = v.replace(/[^0-9]/g, "");
    if (onlyNum !== v) {
      v = onlyNum;
      changed = true;
    }

    // (2) 010 시작 강제: 길이 4 이상부터 검사
    if (v.length >= 4) {
      if (v.substring(0, 3) !== "010") {
        var rest = v;
        if (/^0\d{2}/.test(rest)) {
          rest = rest.substring(3);
        }
        v = "010" + rest;
        changed = true;
        if (!msg) msg = "휴대폰 번호는 010으로 시작해야 합니다.";
      }
    }

    // (3) 11자리 제한
    if (v.length > 11) {
      v = v.substring(0, 11);
      changed = true;
      if (!msg)
        msg =
          "번호 길이를 확인해주세요. 대한민국 핸드폰번호는 최대 11자리입니다.";
    }
  }

  if (changed) {
    $el.val(v);
    if (msg) mrw_alert(msg);
  }

  return changed;
}

/* -------------------------------------------------------
 * 3) IME(한글조합) 안정화: 조합중엔 sanitize 하지 않음
 * ----------------------------------------------------- */
var mrwSanitizeSelector =
  "input.no_space, textarea.no_space," +
  "input.no_special, textarea.no_special," +
  "input.no_number, textarea.no_number," +
  "input.kr-mobilephone, textarea.kr-mobilephone," +
  "input.only_number, textarea.only_number"; // ★ only_number 셀렉터 추가

$(document).on("compositionstart", mrwSanitizeSelector, function () {
  $(this).data("mrw_composing", 1);
});

$(document).on("compositionend", mrwSanitizeSelector, function () {
  $(this).data("mrw_composing", 0);
  mrw_sanitize_input($(this));
});

$(document).on("input keyup paste", mrwSanitizeSelector, function (event) {
  var $el = $(this);

  if ($el.data("mrw_composing") === 1) return;

  if (event.type === "paste") {
    setTimeout(function () {
      mrw_sanitize_input($el);
    }, 0);
    return;
  }

  mrw_sanitize_input($el);
});

/* -------------------------------------------------------
 * 4) 검증 유틸: 버튼 클릭 등에서 호출
 * ----------------------------------------------------- */
function mrw_is_required($el) {
  return (
    $el.is("[required]") ||
    $el.hasClass("required") ||
    String($el.attr("data-required")) === "1"
  );
}

function mrw_focus_el($el) {
  try {
    $el.focus();
  } catch (e) {}
}

window.mrw_validate_inputs = function ($scope, opt) {
  opt = opt || {};
  var doFocus = opt.focus !== false;
  var msgRequired = opt.message || "필수 입력값이 입력되지 않았습니다.";

  var $fields = $scope.find("input, textarea, select").filter(function () {
    return !$(this).prop("disabled");
  });

  $fields.each(function () {
    var $el = $(this);
    // ★ only_number 도 sanitize 선행 대상에 포함
    if (
      $el.is(
        ".no_space, .no_special, .no_number, .kr-mobilephone, .only_number"
      )
    ) {
      mrw_sanitize_input($el);
    }
  });

  var failedEl = null;
  var failedMsg = "";

  $fields.each(function () {
    var $el = $(this);
    var val = $.trim($el.val() || "");

    if (mrw_is_required($el)) {
      if (val.length === 0) {
        failedEl = $el;
        failedMsg = msgRequired;
        return false;
      }
    }

    // ★ only_number: 값이 있으면 숫자만인지 검증
    if ($el.hasClass("only_number") && val.length > 0) {
      if (!/^\d+$/.test(val)) {
        failedEl = $el;
        failedMsg = "숫자만 입력 가능합니다.";
        return false;
      }
    }

    // ★ minlength: 최소 길이 검증 (값이 있을 때만, 필수 여부와 무관)
    var minLen = parseInt($el.attr("minlength"), 10);
    if (!isNaN(minLen) && minLen > 0 && val.length > 0 && val.length < minLen) {
      failedEl = $el;
      failedMsg = "최소 " + minLen + "자 이상 입력해주세요.";
      return false;
    }

    if ($el.hasClass("kr-mobilephone") && val.length > 0) {
      if (!/^\d+$/.test(val)) {
        failedEl = $el;
        failedMsg = "숫자만 입력 가능합니다.";
        return false;
      }
      if (val.length >= 4 && val.substring(0, 3) !== "010") {
        failedEl = $el;
        failedMsg = "휴대폰 번호는 010으로 시작해야 합니다.";
        return false;
      }
      if (val.length !== 11) {
        failedEl = $el;
        failedMsg =
          "번호 길이를 확인해주세요. 대한민국 핸드폰번호는 11자리입니다.";
        return false;
      }
    }

    return true;
  });

  if (failedEl) {
    mrw_alert(failedMsg);
    if (doFocus) {
      setTimeout(function () {
        mrw_focus_el(failedEl);
      }, 0);
    }
    return false;
  }

  return true;
};

/* -------------------------------------------------------
 * 5) 버튼 등에서 "클릭 시 검증" 훅
 * ----------------------------------------------------- */
$(document).on("click", "[data-validate-scope]", function (event) {
  var $btn = $(this);
  var scopeSel = $btn.attr("data-validate-scope") || "";
  if (!scopeSel) return;

  var $scope = $btn.closest(scopeSel);
  if ($scope.length === 0) $scope = $(scopeSel).first();

  if (!window.mrw_validate_inputs($scope, { focus: true })) {
    if (event && event.preventDefault) event.preventDefault();
    if (event && event.stopPropagation) event.stopPropagation();
    return false;
  }
});

$(document).on("input", '[type_format="cost_number"]', function () {
  formatCostNumber($(this));
});

// 붙여넣기 시 콤마 포함 텍스트도 정상 처리
$(document).on("paste", '[type_format="cost_number"]', function () {
  setTimeout(() => formatCostNumber($(this)), 0);
});

function formatCostNumber($el) {
  const el = $el[0];
  const selStart = el.selectionStart;
  const oldVal = $el.val();

  // 숫자만 추출 (붙여넣기로 콤마가 들어와도 제거)
  const raw = oldVal.replace(/[^0-9]/g, "");

  if (raw === "") {
    $el.val("");
    setRawValue($el, "");
    return;
  }

  // 3자리 콤마 포맷 (표시용)
  const formatted = raw.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  $el.val(formatted);

  // 실제 값(콤마 없음)을 hidden input에 저장
  setRawValue($el, raw);

  // 커서 위치 보정
  const oldCommas = (oldVal.substring(0, selStart).match(/,/g) || []).length;
  const newCommas = (formatted.substring(0, selStart).match(/,/g) || []).length;
  const newCursor = selStart + (newCommas - oldCommas);
  el.setSelectionRange(newCursor, newCursor);

  // 데모용 표시
  $("#display").text(formatted);
  $("#raw").text(raw);
}

function setRawValue($el) {
  const raw = arguments[1];
  // hidden input 연결: data-raw-target 속성으로 hidden input id 지정 가능
  // 없으면 같은 name에 _raw 붙인 hidden input 자동 탐색
  const targetId = $el.data("raw-target");
  if (targetId) {
    $("#" + targetId).val(raw);
  } else {
    // hidden input이 바로 다음 형제인 경우도 지원
    const $next = $el.next('input[type="hidden"]');
    if ($next.length) $next.val(raw);
  }
  // data 속성에도 함께 저장
  $el.data("raw-value", raw);
}

function validate_hpnum(number) {
  var phoneNum = number;
  if (phoneNum) {
    var patternPhone = /^010[^0][0-9]{2,3}[0-9]{4}/g;
    //var patternPhone = new RegExp("010[^0][0-9]{2,3}[0-9]{4}");
    console.log(!patternPhone.test(phoneNum));
    if (!patternPhone.test(phoneNum)) {
      //alert('핸드폰 번호가 정상적으로 입력되었는지 확인 해주세요. 010으로 시작해야하며, 본인연락처를 기입하셔야 합니다.');
      //return;
    }
  }
}

function fn_onlynum(event, t) {
  var inputVal = t.value;
  return (t.value = inputVal.replace(/[^0-9]/gi, ""));
}

/*
	
*/
var mir_zip = function (
  frm_name,
  frm_zip,
  frm_addr1,
  frm_addr2,
  frm_addr3,
  frm_jibeon
) {
  var Postcode = null;

  if (typeof kakao !== "undefined" && kakao.Postcode) {
    Postcode = kakao.Postcode;
  } else if (typeof daum !== "undefined" && daum.Postcode) {
    Postcode = daum.Postcode;
  } else {
    alert("Kakao 우편번호 postcode.v2.js 파일이 로드되지 않았습니다.");
    return false;
  }

  var zip_case = 1; // 0: 레이어, 1: 페이지 삽입, 2: 새창

  var get_form = function () {
    return document.forms[frm_name] || document[frm_name];
  };

  var set_value = function (form, name, value) {
    if (form && form[name] !== undefined) {
      form[name].value = value || "";
    }
  };

  var complete_fn = function (data) {
    var of = get_form();

    if (!of) {
      alert("주소 입력 form을 찾을 수 없습니다.");
      return false;
    }

    var fullAddr = "";
    var extraAddr = "";

    /*
      최신 Kakao Postcode 기준:
      - data.userSelectedType : 사용자가 선택한 주소 타입 R/J
      - data.userLanguageType : K/E
      - data.address          : 기본 주소
      - data.addressEnglish   : 기본 영문 주소
      - data.roadAddress      : 도로명 주소
      - data.jibunAddress     : 지번 주소
    */

    if (data.userLanguageType === "E") {
      if (data.userSelectedType === "R") {
        fullAddr = data.roadAddressEnglish || data.addressEnglish || "";
      } else {
        fullAddr = data.jibunAddressEnglish || data.addressEnglish || "";
      }
    } else {
      if (data.userSelectedType === "R") {
        fullAddr = data.roadAddress || data.address || "";
      } else {
        fullAddr = data.jibunAddress || data.address || "";
      }
    }

    if (data.userSelectedType === "R") {
      if (data.bname !== "" && /[동로가]$/.test(data.bname)) {
        extraAddr += data.bname;
      }

      if (data.buildingName !== "" && data.apartment === "Y") {
        extraAddr +=
          extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
      }

      extraAddr = extraAddr !== "" ? " (" + extraAddr + ")" : "";
    }

    set_value(of, frm_zip, data.zonecode);
    set_value(of, frm_addr1, fullAddr);
    set_value(of, frm_addr3, extraAddr);

    if (of[frm_jibeon] !== undefined) {
      of[frm_jibeon].value = data.userSelectedType || "";
    }

    if (of[frm_addr2] !== undefined) {
      of[frm_addr2].focus();
    }
  };

  switch (zip_case) {
    case 1:
      var daum_pape_id = "daum_juso_page_" + frm_name + "_" + frm_zip;
      var element_wrap = document.getElementById(daum_pape_id);
      var currentScroll = Math.max(
        document.body.scrollTop,
        document.documentElement.scrollTop
      );

      if (element_wrap === null) {
        element_wrap = document.createElement("div");
        element_wrap.setAttribute("id", daum_pape_id);
        element_wrap.style.cssText =
          "display:none;border:1px solid #ddd;left:0;width:100%;height:300px;margin:5px 0;position:relative;-webkit-overflow-scrolling:touch;";

        element_wrap.innerHTML =
          '<img src="//t1.kakaocdn.net/postcode/resource/images/close.png" ' +
          'style="cursor:pointer;position:absolute;right:0;top:-1px;z-index:1" ' +
          'class="close_daum_juso" alt="접기 버튼">';

        jQuery('form[name="' + frm_name + '"]')
          .find('input[name="' + frm_addr1 + '"]')
          .before(element_wrap);

        jQuery("#" + daum_pape_id)
          .off("click", ".close_daum_juso")
          .on("click", ".close_daum_juso", function (e) {
            e.preventDefault();
            jQuery(this).parent().hide();
          });
      }

      new Postcode({
        oncomplete: function (data) {
          complete_fn(data);
          element_wrap.style.display = "none";
          document.body.scrollTop = currentScroll;
          document.documentElement.scrollTop = currentScroll;
        },
        onresize: function (size) {
          element_wrap.style.height = size.height + "px";
        },
        width: "100%",
        height: "100%",
        maxSuggestItems: 5
      }).embed(element_wrap);

      element_wrap.style.display = "block";
      break;

    case 2:
      new Postcode({
        oncomplete: function (data) {
          complete_fn(data);
        }
      }).open();
      break;

    default:
      var rayer_id = "daum_juso_rayer_" + frm_name + "_" + frm_zip;
      var element_layer = document.getElementById(rayer_id);

      if (element_layer === null) {
        element_layer = document.createElement("div");
        element_layer.setAttribute("id", rayer_id);
        element_layer.style.cssText =
          "display:none;border:5px solid #ddd;position:fixed;width:300px;height:460px;left:50%;margin-left:-155px;top:50%;margin-top:-235px;overflow:hidden;-webkit-overflow-scrolling:touch;z-index:10000;background:#fff;";

        element_layer.innerHTML =
          '<img src="//t1.kakaocdn.net/postcode/resource/images/close.png" ' +
          'style="cursor:pointer;position:absolute;right:-3px;top:-3px;z-index:1" ' +
          'class="close_daum_juso" alt="닫기 버튼">';

        document.body.appendChild(element_layer);

        jQuery("#" + rayer_id)
          .off("click", ".close_daum_juso")
          .on("click", ".close_daum_juso", function (e) {
            e.preventDefault();
            jQuery(this).parent().hide();
          });
      }

      new Postcode({
        oncomplete: function (data) {
          complete_fn(data);
          element_layer.style.display = "none";
        },
        width: "100%",
        height: "100%",
        maxSuggestItems: 5
      }).embed(element_layer);

      element_layer.style.display = "block";
      break;
  }
};

function ChkLen() {
  var pos, pch, ch;
  var msglen = 0;
  var MsgForm = $("#msgform");
  var strData = $("#msgform textarea[name='strData']");
  var strSubject = $("#msgform input[name='strSubject']");
  // 일괄 문구 치환
  //strDataVal = strData.val().replace(/\u200b/g, '');

  var len = strData.val().length;
  for (i = 0; i < len; i++) {
    pos = strData.val().charAt(i);
    if (pos == ".") isNewTitle = false;

    // 자리수 계산.
    ch = escape(pos);
    if (pch == "%0D" && ch == "%0A") {
    } // 2byte enter (\n\r)
    else if (ch.length > 4) msglen += 2;
    else msglen++;
    pch = ch;
  }

  var isNewSubject = true; // 타이틀 자동 생성 여부.

  $("#msgform input[name='strDataCount']").val(msglen);

  if (msglen > 90) {
    $("#maxLength").html("1500");
    $("#divLmsTitle").css({ display: "" });
    if ($("#msgType").html() == "SMS") {
      $("#msgType").html("LMS");
      alert("LMS로 전환합니다");
      if (isNewSubject) {
        strSubject.val(strData.val().slice(0, 30));
      }
    }
    if (msglen > 1500) {
      alert(
        "문자메시지는 1500바이트를 넘을 수 없습니다. 복사붙여넣기를 한 경우 글자수가 상이할 수 있으며 마지막 일정 글자수가 전송되지 않을 수 있습니다."
      );
    }
  } else {
    if ($("#msgType").html() == "LMS") {
      $("#msgType").html("SMS");
      alert("SMS로 전환합니다");
    }
    $("#maxLength").html("90");
    $("#divLmsTitle").css({ display: "none" });
  }
}

function chkTitle() {
  isNewSubject = false;
}

function detailOpener(dataResult) {
  if ($("#tr_" + dataResult).hasClass("disNone") == true) {
    $("#tr_" + dataResult).removeClass("disNone");
  } else {
    $("#tr_" + dataResult).addClass("disNone");
  }
}

function onmenushow(num) {
  var onmenunum = $("#req_onmenu_" + num);
  var onmenubtn = $("#req_btn_" + num);
  if (onmenunum.hasClass("disNone") == true) {
    onmenunum.removeClass("disNone");
    onmenubtn.html("clear");
  } else {
    onmenunum.addClass("disNone");
    onmenubtn.html("more_vert");
  }
}

function gaSwitcher(using, send, event, url, setname, device, mode, jsonp) {
  switch (mode) {
    default:
    case "ga":
      ga(send, event, url, setname, device);
      break;
    case "gtm":
      break;
  }
}

function prt_check_valid(ptype, pthis, jsonp) {
  switch (ptype) {
    case "email":
      p = pthis.val();
      var date_pattern =
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      var alertType = "now";
      var msg =
        $.isEmptyObject(p) == true
          ? "이메일을 입력해주세요."
          : "입력하신 이메일 형식이 올바르지 않습니다.";
      var string = "Y";
      break;
    case "yyyy":
      p = pthis.val();
      var date_pattern = /^(19|20)\d{2}$/;
      var string = "number";
      break;
    case "yy":
      p = pthis.val();
      var date_pattern = /^\d{2}$/;
      var string = "number";
      break;
    case "mm":
      p = pthis.val();
      var date_pattern = /^(0[1-9]|1[0-2])$/;
      var string = "number";
      break;
    case "dd":
      p = pthis.val();
      var date_pattern = /^(0[1-9]|[12][0-9]|3[0-1])$/;
      var string = "number";
      break;
    case "ymd":
      p = pthis.val();
      var date_pattern = /^\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[0-1])$/;
      var string = "number";
      break;
    case "yymd":
      p = pthis.val();
      var date_pattern =
        /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/;
      var string = "number";
      break;
    case "hh":
      p = pthis.val();
      var date_pattern = /^([0-1][0-3])$/;
      if (pthis.val() > 12) {
        alert("12시간제 입니다");
      }
      var string = "number";
      break;
    case "HH":
    case "HH_blur":
      p = pthis.val();
      var alertType = "now";
      var date_pattern = /^([0-9]|0[0-9]|1[0-9]|2[0-3])$/;
      if (pthis.val() > 23) {
        var msg = "시각은 24시를 넘을 수 없습니다.";
        pthis.val("23");
      } else {
        if (pthis.val().length > 2) {
          var msg = "2자리 이상입력할 수 없습니다";
          pthis.val(pthis.val().substring(0, 1));
        } else {
          var msg =
            $.isEmptyObject(p) == true
              ? "시각을 입력해주세요."
              : "시각은 00시~23시까지 입력가능합니다.";
        }
      }
      if (ptype == "HH_blur" && pthis.val() && pthis.val() < 10) {
        pthis.val("0" + pthis.val());
      }
      var string = "number";
      break;
    case "ii":
    case "ii_blur":
      p = pthis.val();
      var alertType = "now";
      var date_pattern = /^([0-5][0-9])$/;
      console.log(pthis.val().length);
      if (pthis.val() > 59) {
        var msg = "분은 59분을 넘을 수 없습니다.";
        pthis.val("59");
      } else {
        if (pthis.val().length > 2) {
          var msg = "2자리 이상입력할 수 없습니다";
          pthis.val(pthis.val().substring(0, 1));
        } else {
          var msg =
            $.isEmptyObject(p) == true
              ? "분을 입력해주세요."
              : "분은 00분~59분까지 입력가능합니다.";
        }
      }
      if (ptype == "ii_blur" && pthis.val() && pthis.val() < 10) {
        pthis.val("0" + pthis.val());
      }
      var string = "number";
      break;
    case "ss":
    case "ss_blur":
      p = pthis.val();
      var alertType = "now";
      var date_pattern = /^([0-5][0-9])$/;
      if (pthis.val() > 59) {
        var msg = "초는 59초을 넘을 수 없습니다.";
        pthis.val("59");
      } else {
        if (pthis.val().length > 2) {
          var msg = "2자리 이상입력할 수 없습니다";
          pthis.val(pthis.val().substring(0, 1));
        } else {
          var msg =
            $.isEmptyObject(p) == true
              ? "초를 입력해주세요."
              : "초는 00초~59초까지 입력가능합니다.";
        }
      }
      if (ptype == "ss_blur" && pthis.val() && pthis.val() < 10) {
        pthis.val("0" + pthis.val());
      }
      var string = "number";
      break;
    case "cellphone":
      var p = pthis.val().split("-").join("");
      var alertType = "now";
      var msg =
        $.isEmptyObject(p) == true
          ? "번호를 입력해주세요."
          : "입력하신 번호 형식이 올바르지 않습니다.";
      var date_pattern =
        /^((01[1|6|7|8|9])[1-9]+[0-9]{6,7})|(010[1-9][0-9]{7})$/;
      var string = "number";
      break;
  }
  var flag = date_pattern.test(p);

  switch (string) {
    case "number":
      pthis.val(pthis.val().replace(/[^0-9]/g, ""));
      //			var msg = "숫자만 사용가능합니다.";
      break;
  }

  if (flag) {
    pthis.removeClass("borderAttention");
    pthis.parent().children("div.alertBox").remove();
  } else {
    if (alertType == "now") {
      pthis.parent().children("div.alertBox").remove();
      pthis.addClass("borderAttention");
      if (pthis.parent().children("div").hasClass("alertBox") == false) {
        pthis
          .parent()
          .prepend(
            '<div class="alertBox"><i class="material-icons">check_circle</i> <span>' +
              msg +
              "</span></div>"
          );
      }
      //			setTimeout(function(){ pthis.focus(); }, 10)
      return flag;
    } else {
      return flag;
    }
  }
}

//기준요일에 따른 주차구하는 함수.
//해당 주차 / 해당주차 시작날짜 / 해당주차 끝나는날짜를 리턴.
function mirCalWeek(standard, date) {
  switch (standard) {
    // 주차 일요일 기준
    default:
    case 0:
      var thisDate = new Date(date); // 입력한 날짜 정보
      var thisDay = thisDate.getDate(); // 입력한 날짜 일수
      var week = ["일", "월", "화", "수", "목", "금", "토"];
      var firstDay = new Date(thisDate.getFullYear(), thisDate.getMonth(), 1); // 입력한 이달의 첫일 정보
      var firstDayArrayNum = firstDay.getDay(); // 입력한 이달의 첫일 배열값
      var lastDay = new Date(
        thisDate.getFullYear(),
        thisDate.getMonth() + 1,
        0
      ); // 입력한 이달의 마지막일 정보
      var lastDate = lastDay.getDate(); // 입력한 이달의 마지막일 일수
      var lastDayArrayNum = lastDay.getDay(); // 입력한 이달의 마지막일 배열값
      var lastWeekStart = lastDate - lastDayArrayNum; // 마지막주 시작 일수

      switch (4 <= firstDayArrayNum) {
        // 입력한 이달의 첫일이 목금토 중에 있으면 첫째주는 저번달 마지막 주로 간주
        case true:
          // 첫번째 주 개수 확인
          var firstWeekNum = 7 - firstDayArrayNum;
          // 입력한 날짜가 첫번째수에 포함되어 있을 경우
          if (thisDay <= firstWeekNum) {
            var prevFirstDay = new Date(
              thisDate.getFullYear(),
              thisDate.getMonth() - 1,
              1
            ); // 입력한 이달의 첫일 정보
            var prevFirstDayArrayNum = prevFirstDay.getDay(); // 입력한 전달의 첫일 배열값
            switch (4 <= prevFirstDayArrayNum) {
              // 이달의 첫번째주가 목금토일 경우
              case true:
                var calWeek = 4;
                break;
              // 이달의 첫번째주가 일월화수일 경우
              case false:
                var calWeek = 5;
                break;
            }
          } else {
            // 입력한 날짜가 마지막주 시작일 보다 작을경우
            if (thisDay < lastWeekStart) {
              var calWeek = Math.ceil((thisDay - firstWeekNum) / 7) + 1;
            } else {
              // 마지막주에 포함 될 경우
              // 마지막주의 개수가 과반수일 경우
              if (3 < lastDayArrayNum) {
                var calWeek = Math.ceil((thisDay - firstWeekNum) / 7) + 1;
              } else {
                // 마지막주의 개수가 과반수가 아닐경우
                var calWeek = 1;
              }
            }
          }
          break;
        // 입력한 이달의 첫일이 일월화수 중에 있으면 첫째주는 이번달 첫째주로 간주
        case false:
          // 첫번째 주 개수 확인
          var firstWeekNum = 7 - firstDayArrayNum;
          // 입력한 날짜가 첫번째수에 포함되어 있을 경우
          if (thisDay <= firstWeekNum) {
            var calWeek = 1;
          } else {
            // 입력한 날짜가 마지막주 시작일 보다 작을경우
            if (thisDay < lastWeekStart) {
              var calWeek = Math.ceil((thisDay - firstWeekNum) / 7) + 1;
            } else {
              // 마지막주에 포함 될 경우
              // 마지막주의 개수가 과반수일 경우
              if (3 < lastDayArrayNum) {
                var calWeek = Math.ceil((thisDay - firstWeekNum) / 7) + 1;
              } else {
                // 마지막주의 개수가 과반수가 아닐경우
                var calWeek = 1;
              }
            }
          }
          break;
      }
      break;
    // 주차 월요일 기준
    case 1:
      var thisDate = new Date(date); // 입력한 날짜 정보
      var thisDay = thisDate.getUTCDate(); // 입력한 날짜 일수
      var week = ["월", "화", "수", "목", "금", "토", "일"];
      var firstDay = new Date(thisDate.getFullYear(), thisDate.getMonth(), 1); // 입력한 이달의 첫일 정보
      var firstDayArrayNum = firstDay.getUTCDay(); // 입력한 이달의 첫일 배열값
      var lastDay = new Date(
        thisDate.getFullYear(),
        thisDate.getMonth() + 1,
        0
      ); // 입력한 이달의 마지막일 정보
      var lastDate = lastDay.getDate(); // 입력한 이달의 마지막일 일수
      var lastDayArrayNum = lastDay.getUTCDay(); // 입력한 이달의 마지막일 배열값
      var lastWeekStart = lastDate - lastDayArrayNum; // 마지막주 시작 일수

      switch (4 <= firstDayArrayNum) {
        case true:
          var firstWeekNum = 7 - firstDayArrayNum;
          if (thisDay <= firstWeekNum) {
            var prevFirstDay = new Date(
              thisDate.getFullYear(),
              thisDate.getMonth() - 1,
              1
            ); // 입력한 이달의 첫일 정보
            var prevFirstDayArrayNum = prevFirstDay.getUTCDay(); // 입력한 전달의 첫일 배열값
            switch (4 <= prevFirstDayArrayNum) {
              case true:
                var calWeek = 4;
                break;
              case false:
                var calWeek = 5;
                break;
            }
          } else {
            if (thisDay < lastWeekStart) {
              var calWeek = Math.ceil((thisDay - firstWeekNum) / 7);
            } else {
              if (3 < lastDayArrayNum) {
                var calWeek = Math.ceil((thisDay - firstWeekNum) / 7);
              } else {
                var calWeek = 1;
              }
            }
          }
          break;
        case false:
          var firstWeekNum = 7 - firstDayArrayNum;
          if (thisDay <= firstWeekNum) {
            var calWeek = 1;
          } else {
            if (thisDay < lastWeekStart) {
              var calWeek = Math.ceil((thisDay - firstWeekNum) / 7);
            } else {
              if (3 < lastDayArrayNum) {
                var calWeek = Math.ceil((thisDay - firstWeekNum) / 7);
              } else {
                var calWeek = 1;
              }
            }
          }
          break;
      }
      break;
  }
  return calWeek;
}

function tgEvt(evtnum) {
  if (
    $("div#evt_" + evtnum)
      .children("div.moreBtn")
      .text() == "닫기"
  ) {
    $("div#evt_" + evtnum)
      .children("div")
      .not(".fst")
      .not(".moreBtn")
      .addClass("disNone");
    $("div#evt_" + evtnum)
      .children("div.moreBtn")
      .html("더보기");
  } else {
    $("div#evt_" + evtnum)
      .children("div")
      .not(".fst")
      .removeClass("disNone");
    $("div#evt_" + evtnum)
      .children("div.moreBtn")
      .html("닫기");
  }
}

function revers_width() {
  var getulwidth = $("#mir_quickmenu_ul_wrap > li").outerWidth(true);
  $("#mir_quickmenu_ul_wrap,#tog_quickmenu,.quickmenu_addmark").width(
    getulwidth
  );
}

function jumbPage(tglink, speed) {
  var thisposition = $(".md_" + tglink + "").offset();
  console.log(thisposition);
  $("html, body").stop().animate({ scrollTop: thisposition.top }, speed);
}

// 첨부파일 확장자 확인
/*
function checkImg(obj, ext){ 
	var check = false; 
	var extName = $(obj).val().substring($(obj).val().lastIndexOf(".")+1).toUpperCase(); 
	var str = ext.split(","); 
	for (var i=0;i<str.length;i++) { 
		if ( extName == $.trim(str[i]) ) { 
			check = true; 
			break; 
		} 
		else check = false; 
	} 
	if(!check){ 
		alert(ext+" 이미지 파일만 업로드 가능합니다."); 
	} 
	return check; 
} 
// 첨부파일 용량 확인 
function checkImgSize(obj, size) { 
	var check = false; 
	if(window.ActiveXObject) {//IE용인데 IE8이하는 안됨...
		var fso = new ActiveXObject("Scripting.FileSystemObject"); 
		//var filepath = document.getElementById(obj).value; 
		var filepath = obj[0].value; 
		var thefile = fso.getFile(filepath); 
		sizeinbytes = thefile.size; 
	} 
	else {//IE 외 
		//sizeinbytes = document.getElementById(obj).files[0].size; 
		sizeinbytes = obj[0].files[0].size; 
	} 
	var fSExt = new Array('Bytes', 'KB', 'MB', 'GB'); 
	var i = 0; 
	var checkSize = size; 
	while(checkSize>900) { 
		checkSize/=1024; 
		i++; 
	} 
	checkSize = (Math.round(checkSize*100)/100)+' '+fSExt[i]; 
	var fSize = sizeinbytes; 
	if(fSize > size) {
		alert("첨부파일은 "+ checkSize + " 이하로 등록가능합니다."); 
		check = false; 
	} 
	else { 
		check = true; 
	} 
	return check; 
}
*/

function uploadImgPreview(upfile) {
  // @breif 업로드 파일 읽기
  let fileInfo = document.getElementById(upfile).files[0];
  let reader = new FileReader();

  // @details INDEX #01 실행 이후, 파일의 업로드( onload )가 확인되고 나서 실행된다.
  reader.onload = function () {
    // @details 업로드한 파일의 URL을 가져온다.
    document.getElementById("preview").src = reader.result;

    // @breif 썸네일 이미지 생성
    let tempImage = new Image(); // @details drawImage 메서드에 넣기 위해 이미지 객체화
    tempImage.src = reader.result; // @details data-uri를 이미지 객체에 주입
    tempImage.addEventListener("load", function () {
      // @breif 캔버스 위에 이미지 그리기
      let canvas = document.getElementById("canvas");
      let canvasContext = canvas.getContext("2d");

      // @breif 캔버스 크기 셋팅
      canvas.width = 240;
      canvas.height = 300;

      // @breif 캔버스 위에 이미지 그리기
      canvasContext.drawImage(
        this, // @details 업로드한 이미지 파일의 정보
        -10, // @details X좌표
        -10, // @details Y좌표
        270, // @details 넣을 이미지의 가로 사이즈( 해당 예제는 변화를 보기위해 살짝 크게 했다. )
        330 // @details 넣을 이미지의 세로 사이즈( 해당 예제는 변화를 보기위해 살짝 크게 했다. )
      );

      // @breif 캔버스 위에 이미지 그리기
      canvasContext.stroke();

      // @breif 캔버스의 이미지 URL 정보를 받아 썸네일 출력
      let dataURI = canvas.toDataURL("image/jpeg");
      document.querySelector("#thumbnail").src = dataURI;
    });
  };

  if (fileInfo) {
    // @details readAsDataURL을 통해 업로드한 파일의 URL을 읽어 들인다.
    reader.readAsDataURL(fileInfo);
  }
}

function imageCenter(t, w, h) {
  var imgWidth = w;
  var imgHeight = h;

  t.addClass("posAbs");
  t.css({
    width: "auto",
    left: "50%",
    top: "50%",
    "margin-left": "-" + imgWidth / 2 + "px",
    "margin-top": "-" + imgHeight / 2 + "px"
  });
}

function mirJS_isMobileDevice() {
  var phoneArray = new Array(
    "samsung-",
    "sch-",
    "shw-",
    "sph-",
    "sgh-",
    "lg-",
    "canu",
    "im-",
    "ev-",
    "iphone",
    "nokia",
    "blackberry",
    "lgtelecom",
    "natebrowser",
    "sonyericsson",
    "mobile",
    "android",
    "ipad"
  );
  for (i = 0; i < phoneArray.length; i++) {
    if (navigator.userAgent.toLowerCase().indexOf(phoneArray[i]) > -1) {
      return true;
    }
  }
  return false;
}

function mirJS_isTabletDevice() {
  if (!mirJS_isMobileDevice()) {
    return false;
  }
  // 태블릿검사
  if (
    navigator.userAgent.toLowerCase().indexOf("ipad") > -1 ||
    (navigator.userAgent.toLowerCase().indexOf("android") > -1 &&
      navigator.userAgent.toLowerCase().indexOf("mobile") == -1)
  ) {
    return true;
  }
  // 갤럭시 탭만을 위한 리다이렉트. Mobile 이라는 단어가 안들어오게 되면 지우셔도 됨
  var galaxyTabModel = new Array("shw-");
  for (i = 0; i < galaxyTabModel.length; i++) {
    if (navigator.userAgent.toLowerCase().indexOf(galaxyTabModel[i]) > -1) {
      return true;
    }
  }
  return false;
}

function loadJavascript(url, callback, charset) {
  var head = document.getElementsByTagName("head")[0];
  var script = document.createElement("script");
  script.type = "text/javascript";
  if (charset != null) {
    script.charset = "euc-kr";
  }
  var loaded = false;
  script.onreadystatechange = function () {
    if (this.readyState == "loaded" || this.readyState == "complete") {
      if (loaded) {
        return;
      }
      loaded = true;
      callback();
    }
  };
  script.onload = function () {
    callback();
  };
  script.src = url;
  head.appendChild(script);
}
/*
2021-02-07-일
다크모드 테스트, 크롬 이외 브라우저 제어 불가.
$(window).load(function() {

	
	var darkmode = window.matchMedia('prefers-color-scheme: dark').matches;
	var bgDarkmode = $("body").css("backgroud-color");
	console.log(bgDarkmode);
	if (darkmode) {
	  // It's a dark theme...
	  $("div#mir_debug").html("dark");
//	  $("body").css({"background-color":"#fefefe"});
	  console.log("dark");
	} else {
	  // It's not a dark theme...
	  $("div#mir_debug").html("light");
	  console.log("light");
	}
});
*/

function mir_yn_show(node, v, setPanel, ext) {
  var nodeSet = $("#" + setPanel + node);
  switch (v) {
    case "Y":
      nodeSet.removeClass("disNone");
      break;
    case "N":
      nodeSet.addClass("disNone");
      break;
  }
}

function mirValidatek(mode, node, tmpary, tmp, cpinfo) {
  callDynamicEx(mode, tmpary, tmp, cpinfo, node, "html");
}

function makeDelay(ms) {
  var timer = 0;
  return function (callback) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
}

function joinCheckAll() {
  var tmp = $(
    "#joinWrap input[type=text],#joinWrap input[type=password]"
  ).filter("[required]");
  tmp.addClass("check_required");
  var checker = $("#joinWrap input.check_required")
    .siblings("span")
    .filter(".check_required");
  //console.log(checker);
  //console.log(tmp.length + ' ' + checker.length);
  if (tmp.length == checker.length) {
    $("#joinConfirmBtn").addClass("bgBlack fcWhite").prop("disabled", false);
  } else {
    $("#joinConfirmBtn").removeClass("bgBlack fcWhite").prop("disabled", true);
  }
  //$prt_html .= '	if($(this).attr(\'required\')==\'required\') {';
  //$prt_html .= '		console.log($(this).attr(\'required\'));';
  //$prt_html .= '	}';
}

function mir_strip_number(str) {
  return str.replace(/[^0-9]/g, "");
}

function mir_addslashes(str) {
  return String(str)
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'")
    .replace(/"/g, '\\"')
    .replace(/\0/g, "\\0");
}

function mir_stripslashes(str) {
  return (str + "").replace(/\\(.?)/g, function (s, n1) {
    switch (n1) {
      case "\\":
        return "\\";
      case "0":
        return "\u0000";
      case "":
        return "";
      default:
        return n1;
    }
  });
}

function mir_rt_style(node, mode) {
  switch (mode) {
    default:
    case "prt_cate":
      $(node).addClass("b1px").removeClass("border0");
      break;
  }
}

function mir_login_oauth(type, ww, wh, urltmp) {
  //	var url = "/_mir/plugin/api/sso/" + type + "-auth.php";
  var url = urltmp;
  var opt =
    "width=" +
    ww +
    ",height=" +
    wh +
    ",left=0,top=0,scrollbars=1,toolbars=no,resizable=yes";
  mir_popup_window(url, type, opt);
}

function mir_popup_window(url, winname, opt) {
  window.open(url, winname, opt);
}

function mirRequest(jsdata, dataArg) {
  var jsdatabus = JSON.stringify(jsdata);
  $.ajax({
    type: "POST",
    async: true,
    url: "/_mir/__do.async.php",
    traditional: true,
    cache: false,
    data: {
      datakey: dataArg,
      jsdata: jsdatabus
    },
    success: function (data) {
      switch (jsdata.argset.act) {
        default:
        case "html":
          $(jsdata.argset.node).html(data);
          break;
        case "html_safe":
          let prthtml = data;
          $(jsdata.argset.node).html(`${prthtml}`);
          break;
        case "html_safe_strip":
          $(jsdata.argset.node).html(mir_stripslashes(data));
          break;
        case "append":
          $(jsdata.argset.node).append(data);
          break;
        case "appendTo":
          $(jsdata.argset.node).appendTo(data);
          break;
        case "after":
          $(jsdata.argset.node).after(data);
          break;
        case "replacewith":
          $(jsdata.argset.node).replaceWith(data);
          break;
      }
    },
    error: function (e) {
      $(jsdata.argset.node).html("통신실패");
      rej("reject");
    },
    timeout: 10000
  });
}

async function async_mirRequest(jsdata, dataArg) {
  var jsdatabus = JSON.stringify(jsdata);
  return await new Promise((res, rej) => {
    $.ajax({
      type: "POST",
      async: true,
      url: "/_mir/__do.async.php",
      traditional: true,
      cache: false,
      data: {
        datakey: dataArg,
        jsdata: jsdatabus
      },
      success: function (data) {
        switch (jsdata.argset.act) {
          default:
          case "html":
            $(jsdata.argset.node).html(data);
            break;
          case "append":
            $(jsdata.argset.node).append(data);
            break;
        }
        res("success");
      },
      error: function (e) {
        $("#mpc").html("통신실패");
        rej("reject");
      },
      timeout: 10000
    });
  });
}

async function mrw_token_js(action) {
  var resp = await fetch(
    atob(
      "L21ydy9zZGsvX2NvcmUvc3lzdGVtL2xpYi9fX2NvbW1vbi9zZWN1cml0eS9hc3luYy10b2tlbi5waHA="
    ),
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: action })
    }
  );

  if (!resp.ok) throw new Error("token issue failed");

  var json = await resp.json();
  return json.token;
}

let mirProcRequestId = 0; // 요청 버전 번호
let mirProcLastXHR = null; // 이전 요청의 XHR 저장
async function mirProc(jsdata, dataArg) {
  // 요청 버전 증가
  mirProcRequestId++;
  const thisRequestId = mirProcRequestId;

  // 이전 요청이 있으면 abort(취소)
  if (mirProcLastXHR) {
    mirProcLastXHR.abort();
  }

  var jsdatabus = JSON.stringify(jsdata);

  if (jsdata.argset.trigger_pos) {
    var switchTrigger = $('[data-pos="' + jsdata.argset.trigger_pos + '"]');
  } else {
    var switchTrigger = $("#" + jsdata.argset.trigger);
  }
  return await new Promise((res, rej) => {
    $.ajax({
      type: "POST",
      async: true,
      url: atob("L19taXIvc2RrL19jb3JlLnJvdXRlLnBocA=="),
      traditional: true,
      cache: false,
      data: {
        datakey: dataArg,
        jsdata: jsdatabus
      },
      success: function (data) {
        // ❗ 요청 버전이 오래된 요청이면 DOM을 갱신하지 않음
        if (thisRequestId !== mirProcRequestId) {
          console.log("[success] request reject");
          return; // 이전 응답은 무시
        }

        switch (jsdata.argset.act) {
          default:
          case "html":
            $(jsdata.argset.node).html(data);
            break;
          case "append":
            $(jsdata.argset.node).append(data);
            break;
          case "prepend":
            $(jsdata.argset.node).prepend(data);
            break;
          case "replace":
            $(jsdata.argset.node).replaceWith(data);
            break;
          case "tg_html":
            $(jsdata.argset.tgnode).html(data);
            break;
          case "tg_append":
            $(jsdata.argset.tgnode).append(data);
            break;
          case "tg_prepend":
            $(jsdata.argset.tgnode).prepend(data);
            break;
        }
        res("success");
        switch (jsdata.argset.end_script_type) {
          default:
            jsdata.argset.end_script;
            break;
          case "encode":
            decodeURIComponent(jsdata.argset.end_script);
            break;
        }
      },
      error: function (e) {
        // abort()로 중단된 요청도 여기로 들어오므로
        if (thisRequestId !== mirProcRequestId) {
          console.log("[error] request reject");
          return; // 이전 요청이면 무시
        }

        $(jsdata.argset.node).html("통신실패");
        rej("reject");
      },
      beforeSend: function (xhr) {
        if (jsdata.argset.keepheight) {
          var currentHeight = jsdata.argset.keepheight;
        } else if (jsdata.argset.keepheight_a === true) {
          var currentHeight = $(jsdata.argset.node)[0].getBoundingClientRect()
            .height;
        }

        if (jsdata.argset.keepwidth) {
          var currentWidth = jsdata.argset.keepwidth;
        } else if (jsdata.argset.keepwidth_a) {
          var currentWidth = $(jsdata.argset.node)[0].getBoundingClientRect()
            .width;
        }

        $(jsdata.argset.node).css({
          "min-width": currentWidth + "px",
          "min-height": currentHeight + "px"
        });
        switch (jsdata.argset.before_ab) {
          case "replace_nopd":
            var __loadingbar =
              '<div class="ldbar-pp"><div class="w100p tCenter"><img src="/js/_mir/loadingio/svg/obj/loadingbars_w.svg" border="0" style="width:100%; max-width:1.2rem;"></div></div>';
            switchTrigger.append(__loadingbar);
            break;
        }
        switch (jsdata.argset.before) {
          default:
            break;
          case "none":
            break;
          case "ccl":
            $(jsdata.argset.node).html(
              '<div class="mds-flex aitem-center dfTransition bgPP boxsize" style="position:fixed; z-index:1002;left:50%; top:50%; width:4rem; height:4rem; transform: translate(-50%,-50%); border-radius:50%;"><div class="pd053rem w100p tCenter"><img src="/js/_mir/loadingio/svg/obj/loadingbars_w.svg" border="0" style="max-width:1.7rem;"></div></div>'
            );
            break;
          case "csl":
            $(jsdata.argset.node).html(
              '<div class="mds-flex aitem-center dfTransition bgPP boxsize" style="position:fixed; z-index:1002;left:50%; top:50%; width:4rem; height:4rem; transform: translate(-50%,-50%); aspect-ratio: 4 / 4; border-radius:0.8rem;"><div class="pd053rem w100p tCenter"><img src="/js/_mir/loadingio/svg/obj/loadingbars_w.svg" border="0" style="max-width:1.7rem;"></div></div>'
            );
            break;
          case "blind_a":
            $(jsdata.argset.node).html(
              '<div class="nodrag boxsize dfRound05rem" style="position:fixed;width:100%; height:100%; z-index:99999; background-color:rgba(98,34,181,0.41); left:0; top:0;"><div class="mds-flex aitem-center dfTransition bgPP boxsize" style="position:fixed; z-index:1002;left:50%; top:50%; width:4rem; height:4rem; transform: translate(-50%,-50%); aspect-ratio: 4 / 4; border-radius:0.8rem;"><div class="pd053rem w100p tCenter"><img src="/js/_mir/loadingio/svg/obj/loadingbars_w.svg" border="0" style="max-width:1.7rem;"></div></div></div>'
            );
            break;
          case "blind":
            $(jsdata.argset.node).html(
              '<div class="nodrag boxsize dfRound05rem" style="position:fixed;width:100%; height:100%; z-index:99999; background-color:rgba(98,34,181,0.41);"><div class="mds-flex aitem-center dfTransition bgPP boxsize" style="position:fixed; z-index:1002;left:50%; top:50%; width:4rem; height:4rem; transform: translate(-50%,-50%); aspect-ratio: 4 / 4; border-radius:0.8rem;"><div class="pd053rem w100p tCenter"><img src="/js/_mir/loadingio/svg/obj/loadingbars_w.svg" border="0" style="max-width:1.7rem;"></div></div></div>'
            );
            break;
          case "replace":
            $(jsdata.argset.node).html(
              '<div class="mds-flex pd1rem ovh"><div class="pd053rem w100p tCenter"><img src="/js/_mir/loadingio/svg/obj/loadingbars.svg" border="0" style="width:100%; max-width:1.2rem;"></div></div>'
            );
            break;
          case "replace_nopd":
            $(jsdata.argset.node).html(
              '<div class="mds-flex ovh"><div class="w100p tCenter"><img src="/js/_mir/loadingio/svg/obj/loadingbars.svg" border="0" style="width:100%; max-width:1.2rem;"></div></div>'
            );
            break;
          case "replace_nopdw":
            $(jsdata.argset.node).html(
              '<div class="mds-flex ovh pd0 mg0 fs0 w100p"><div class="w100p tCenter pd0 mg0"><img src="/js/_mir/loadingio/svg/obj/loadingbars_w.svg" border="0" style="width:100%; max-width:0.9rem; height:auto; font-size:initial;"></div></div>'
            );
            break;
          case "line_loading":
            $(jsdata.argset.node).html("로딩중");
            break;
        }
      },
      complete: function () {
        // 성공여부 무관 실행
        if (jsdata.argset.before_ab) {
          switchTrigger.prop("disabled", false);
          $(".ldbar-pp").remove();
        }
      },
      timeout: 500000
    });
  });
}

$(document).on("click", ".switchPasswordPreview", function (event) {
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();

  if ($(this).siblings("input[type=password]").attr("type") == "password") {
    $(this).siblings("input[type=password]").attr("type", "text");
    $(this).text("visibility").attr("title", "비밀번호 가리기");
  } else {
    $(this).siblings("input[type=text]").attr("type", "password");
    $(this).text("visibility_off").attr("title", "비밀번호 보기");
  }
});

function newregisterChecker() {
  var reqTotalCnt = $(".agree_group input.required_set").length;
  var reqCheckCnt = $(".agree_group input.required_set:checked").length;

  var passwordCheck = $("#formWrap_new_regist input.password_certi_done").attr(
    "datalabel"
  );
  var emailChecker = $(".certicode").attr("type_label");

  if (
    reqTotalCnt == reqCheckCnt &&
    passwordCheck == "done" &&
    emailChecker == "certicode"
  ) {
    $("#dataSender").prop("disabled", false).css({ opacity: "1" });
  } else {
    $("#dataSender").prop("disabled", true).css({ opacity: "0.41" });
  }
}

function mir_minialertbox(type, text, icon) {
  if ($("#popup_center #mini_alertbox").length == 0) {
    $("#popup_center").append('<div id="mini_alertbox"></div>');
  }
  switch (icon) {
    default:
      var icon = icon ? icon : "error_outline";
      break;
  }
  if ($("#popup_center #mini_alertbox #mirAlert").length == 0) {
    $("#popup_center #mini_alertbox").append(
      '<div id="mirAlert" class="dfBoxShadow-PP fix-h-center pd1_2rem fs09rem bgWhite fcBlack dfRound1rem ptd_B mds-flex posFixed" style="z-index:99999 !important; gap:0.5rem;"><span class="material-icons-outlined fs1rem">' +
        icon +
        "</span><span>" +
        text +
        "</span></div>"
    );
    $("#mirblind_b").removeClass("disNone");
    $("#mirAlert")
      .stop()
      .css("top", "-2rem") // 위에서 시작
      .show() // 요소 표시
      .animate({ top: "2rem" }, 200, "easeOutBounce")
      .delay(2000) // 2초 대기
      .animate({ top: "2.5rem" }, 200) // 살짝 내려오기
      .animate({ top: "-4rem" }, 100, "easeOutBounce", function () {
        $("#mirblind_b").animate({ opacity: 0 }, 200, function () {
          $(this).css({ opacity: 1 }).addClass("disNone");
        });
        $(this).fadeOut(300, function () {
          $(this).remove();
        });
      });
  }
}

$(document).on("change", ".checkall > input[type=checkbox]", function (event) {
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
  var inputAllCnt = $(".checkall > input[type=checkbox]").not(
    ".input_all"
  ).length;
  var inputCheckedCnt = $(".checkall > input[type=checkbox]:checked").not(
    ".input_all"
  ).length;
  if (inputAllCnt == inputCheckedCnt) {
    $(".checkall > input[type=checkbox]")
      .not(".input_all")
      .prop("checked", false);
    $(".checkall > input[type=checkbox].input_all").prop("checked", true);
  } else {
    $(this)
      .parent()
      .find("input[type=checkbox].input_all")
      .prop("checked", false);
  }
});

function mir_eventStop(event) {
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
}

function mir_eventStop_safe(e) {
  // checkbox/radio는 기본동작(체크 토글)을 막으면 안 됨
  var t = e.target;
  if (t && t.tagName === "INPUT") {
    var type = (t.type || "").toLowerCase();
    if (type === "checkbox" || type === "radio") {
      e.stopPropagation();
      return;
    }
  }
  // 기존 로직
  mir_eventStop(e);
}

function formatPhoneNumber(input) {
  let numbers = input.value.replace(/\D/g, ""); // 모든 비숫자 문자 제거
  let formattedNumber = "";

  // 12자리 전화번호 형식
  if (numbers.length === 12) {
    formattedNumber = `${numbers.slice(0, 4)}-${numbers.slice(4, 8)}-${numbers.slice(8)}`;
  }
  // 9자리 또는 10자리 전화번호 형식
  else if (numbers.length === 9) {
    formattedNumber = `${numbers.slice(0, 2)}-${numbers.slice(2, 5)}-${numbers.slice(5)}`;
  } else if (numbers.length === 10) {
    formattedNumber = `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6)}`;
  }
  // 11자리 전화번호 형식
  else if (numbers.length > 10) {
    formattedNumber = `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
  } else {
    formattedNumber = numbers;
  }

  input.value = formattedNumber;
}

$(document).on(
  "keyup paste input change",
  'input[type="number"],input[type_label=number]',
  function (event) {
    const $input = $(this);

    const rawMinus = $input.attr("minus_limit");
    const rawStep = $input.attr("step_limit");
    const rawZero = $input.attr("zerofill_limit");

    const minusLimit = rawMinus === "1" || rawMinus === "true"; // - 금지
    const stepLimit = rawStep === "1" || rawStep === "true"; // 소수점 금지
    const zeroFill = rawZero === "1" || rawZero === "true"; // 앞자리 0 제거

    if (event.type === "paste") {
      setTimeout(handleInput, 0);
    } else {
      handleInput();
    }

    function handleInput() {
      let val = $input.val();
      const orig = val;
      let changedByFilter = false;

      // 1) 허용 문자 1차 필터링
      if (stepLimit) {
        // 소수점 금지
        if (minusLimit) {
          // 정수만 (0, 1, 2, ...)
          val = val.replace(/[^0-9]/g, "");
        } else {
          // 음수 정수 허용 (-10, 0, 3 ...)
          val = val.replace(/[^0-9-]/g, "");
        }
      } else {
        // 소수점 허용
        if (minusLimit) {
          // 음수 금지: 0.1, 10.23 등만
          val = val.replace(/[^0-9.]/g, "");
        } else {
          // 음수 + 소수 허용: -0.1, -10.23, 3.14 등
          val = val.replace(/[^0-9.-]/g, "");
        }
      }

      // 2) 마이너스(-) 정리
      if (!minusLimit) {
        let negative = false;

        if (val.indexOf("-") !== -1) {
          negative = true;
        }

        val = val.replace(/-/g, "");

        if (negative) {
          val = "-" + val;
        }
      } else {
        // minus_limit = true → - 제거
        val = val.replace(/-/g, "");
      }

      // 3) 소수점(.) 정리
      if (!stepLimit) {
        const parts = val.split(".");
        if (parts.length > 1) {
          const integerPart = parts.shift();
          const decimalPart = parts.join("");
          const isNegative = integerPart[0] === "-";
          let pureInteger = integerPart;

          if (isNegative) {
            pureInteger = integerPart.substring(1);
          }

          let newVal = pureInteger;
          if (decimalPart !== "") {
            newVal = pureInteger + "." + decimalPart;
          }

          if (isNegative) {
            newVal = "-" + newVal;
          }

          val = newVal;
        }
      } else {
        // stepLimit=true → 소수점 제거
        val = val.replace(/\./g, "");
      }

      // 4) zerofill_limit: 앞자리 0 제거
      if (zeroFill) {
        let t = val;

        // 공백, 단독 '-', '.', '-.' 등은 그대로 둠
        if (t !== "" && t !== "-" && t !== "." && t !== "-.") {
          let isNegative = t[0] === "-";
          if (isNegative) {
            t = t.slice(1);
          }

          // 정수/소수 분리
          let intPart = t;
          let decPart = "";
          const dotPos = t.indexOf(".");

          if (dotPos !== -1) {
            intPart = t.slice(0, dotPos);
            decPart = t.slice(dotPos + 1);
          }

          // 앞자리 0 제거 (모두 0이면 0 유지)
          intPart = intPart.replace(/^0+(?=\d)/, "");
          if (intPart === "") intPart = "0";

          let newVal = intPart;

          if (!stepLimit && decPart !== "") {
            newVal += "." + decPart;
          }

          if (isNegative && newVal !== "0") {
            newVal = "-" + newVal;
          }

          val = newVal;
        }
      }

      // 5) 필터링으로 값이 바뀐 경우 알림
      if (val !== orig) {
        $input.val(val);
        changedByFilter = true;

        let msg = "숫자만 입력 가능합니다."; // 기본

        if (!stepLimit && !minusLimit) {
          msg = "숫자, 소수점(.), 음수(-)만 입력 가능합니다.";
        } else if (!stepLimit && minusLimit) {
          msg = "숫자와 소수점(.)만 입력 가능합니다.";
        } else if (stepLimit && !minusLimit) {
          msg = "정수와 음수(-)만 입력 가능합니다.";
        } else if (stepLimit && minusLimit) {
          msg = "정수(0 이상의 숫자)만 입력 가능합니다.";
        }

        mir_minialertbox("", msg, "");
      }

      // 6) minnum / maxnum 범위 체크 (벗어나면 최소/최대로 보정)
      const rawMin = $input.attr("minnum");
      const rawMax = $input.attr("maxnum");

      if (
        (rawMin != null && rawMin !== "") ||
        (rawMax != null && rawMax !== "")
      ) {
        const numVal = parseFloat(val);

        // 숫자로 변환 가능한 경우에만 체크
        if (!isNaN(numVal)) {
          let min = null;
          let max = null;

          if (rawMin != null && rawMin !== "" && !isNaN(parseFloat(rawMin))) {
            min = parseFloat(rawMin);
          }
          if (rawMax != null && rawMax !== "" && !isNaN(parseFloat(rawMax))) {
            max = parseFloat(rawMax);
          }

          let corrected = numVal;
          let outOfRange = false;

          if (min !== null && corrected < min) {
            corrected = min;
            outOfRange = true;
          }
          if (max !== null && corrected > max) {
            corrected = max;
            outOfRange = true;
          }

          if (outOfRange) {
            // 보정된 값을 문자열로
            let newVal = String(corrected);

            // stepLimit=true 인데 min/max 에 소수점이 있다면
            // 정수만 남기고 싶다면 아래 한 줄을 켜면 됩니다.
            // if (stepLimit) newVal = String(parseInt(corrected, 10));

            $input.val(newVal);

            let rangeMsg = "";
            if (min !== null && max !== null) {
              rangeMsg = min + " 이상 " + max + " 이하만 입력할 수 있습니다.";
            } else if (min !== null) {
              rangeMsg = min + " 이상만 입력할 수 있습니다.";
            } else if (max !== null) {
              rangeMsg = max + " 이하만 입력할 수 있습니다.";
            }

            mir_minialertbox(
              "",
              rangeMsg + " 범위를 벗어나 최대/최소 값으로 자동 보정되었습니다.",
              ""
            );
          }
        }
      }
    }
  }
);

$(document).on("keyup paste", "input[type_label=hp_number]", function (event) {
  var $input = $(this);

  if (event.type === "paste") {
    setTimeout(function () {
      handleInput($input);
    }, 0);
  } else {
    handleInput($input);
  }

  function handleInput($input) {
    var v = $input.val() || "";

    // 숫자만
    var cleaned = v.replace(/[^0-9]/g, "");
    if (cleaned !== v) {
      $input.val(cleaned);
      mir_minialertbox("", "숫자만 입력 가능합니다.", "");
      v = cleaned;
    }

    // 빈값이면 끝
    if (v.length === 0) return;

    // ✅ 1~3자리 입력 중에는 검사하지 않음 (0/01/010 진행 허용)
    if (v.length < 4) return;

    // ✅ 4번째부터 prefix 검사
    if (v.substr(0, 3) !== "010") {
      mir_minialertbox("", "휴대폰 번호는 010으로 시작해야 합니다.", "");
      $input.val(""); // (권장) 완전히 리셋
      $input.focus();
      return;
      // 또는: $input.val('010'); 로 강제 교정하고 계속 입력하게 할 수도 있음
    }

    // ✅ 010이면 11자리 제한
    if (v.length > 11) {
      $input.val(v.substr(0, 11));
      mir_minialertbox("", "휴대폰 번호는 11자리 입니다.", "");
      return;
    }
  }
});

$(document).on(
  "keyup paste focusout focus",
  "input.koreng_only",
  function (event) {
    const input = $(this);
    const val = input.val();
    const max = parseInt(input.attr("maxlength"), 10);

    if (typeof val !== "string" || val === "") return;

    let regExp;
    if (event.type === "focusout") {
      regExp = /[^가-힣a-zA-Z]/g; // 자음·모음 단독 제거 포함
      validate_msg = "한글 초성입력은 불가합니다.";
    } else {
      regExp = /[^ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z]/g;
      validate_msg = "한글 또는 영문만 입력 가능합니다.";
    }

    if (regExp.test(val)) {
      const cleaned = val.replace(regExp, "");
      input.val(cleaned);
      mir_minialertbox("", validate_msg, "");
    }

    // 모든 이벤트에서 maxlength 검사
    if (!isNaN(max) && val.length > max) {
      input.val(val.slice(0, max));
      mir_minialertbox("", `최대 ${max}자까지 입력 가능합니다.`, "");
    }
  }
);

let punycodeLoaded = false;
$(document).on(
  "keyup paste input change focusout",
  "input[type_label=domain]",
  function (event) {
    mir_loadJS(
      "https://cdnjs.cloudflare.com/ajax/libs/punycode/1.4.1/punycode.min.js",
      "head"
    );
    const input = $(this);
    let inputValue = input.val();
    let savedValue = input.data("savedValue") || "";

    const validPattern = /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣\.\-]+$/;
    const startsWithSymbol = /^[\.\-]/;

    if (event.type === "paste") {
      setTimeout(() => validateInput(), 0);
      return;
    }

    validateInput();

    function validateInput() {
      inputValue = input.val();
      if (!inputValue) return;

      // 특수문자로 시작하는 경우 롤백
      if (startsWithSymbol.test(inputValue)) {
        input.val(savedValue);
        mir_minialertbox(
          "",
          "도메인의 첫 글자에는 특수문자를 사용할 수 없습니다.",
          ""
        );
        return;
      }

      // 허용된 문자 이외가 포함된 경우
      if (!validPattern.test(inputValue)) {
        input.val(savedValue);
        mir_minialertbox(
          "",
          "영문, 숫자, 한글, 점(.)과 하이픈(-)만 입력 가능합니다.",
          ""
        );
        return;
      }

      // 유효하면 저장
      input.data("savedValue", inputValue);
    }

    // focusout 또는 blur 시 punycode 변환
    if (event.type === "focusout") {
      if (/[가-힣]/.test(inputValue)) {
        // punycode가 로드되지 않았다면 동적 로드
        if (!punycodeLoaded) {
          punycodeLoaded = true;

          // 로드 직후 다시 blur 트리거 (재시도)
          setTimeout(() => input.trigger("focusout"), 100);
          return;
        }

        // punycode가 이미 로드된 경우 변환
        let domainParts = inputValue.split(".");
        let convertedParts = domainParts.map((part) => {
          return /[가-힣]/.test(part) ? "xn--" + punycode.encode(part) : part;
        });
        const convertedDomain = convertedParts.join(".");
        input.val(convertedDomain);
        input.data("savedValue", convertedDomain);

        // 한글도메인을 punycode로 변환하였음을 알림.
        mir_minialertbox("", "한글도메인은 punycode로 변환합니다.", "");
      }
    }
  }
);

$(document).on("change", ".mds-toggle-sw > label > input", function (event) {
  var afterLabelName = $(this)
    .next("span[datalabel='labelname']")
    .attr("aflabel");
  var beforeLabelName = $(this)
    .next("span[datalabel='labelname']")
    .attr("bflabel");
  var currentState = $(this).is(":checked");
  switch (currentState) {
    case false:
      $(this).next("span[datalabel='labelname']").html(beforeLabelName);
      break;
    case true:
      $(this).next("span[datalabel='labelname']").html(afterLabelName);
      break;
  }
});

function validateBizNumber(bizNum) {
  if (bizNum.length !== 10) return false;
  const weights = [1, 3, 7, 1, 3, 7, 1, 3, 5, 1];
  let sum = 0;

  for (let i = 0; i < 9; i++) {
    sum += bizNum[i] * weights[i];
  }
  sum += Math.floor((bizNum[8] * 5) / 10);

  let checkDigit = (10 - (sum % 10)) % 10;
  return checkDigit === parseInt(bizNum[9]);
}

// 클립보드 복사 함수
function copyTextAndRun(targetId, callback) {
  const element = document.getElementById(targetId);
  if (!element) {
    console.error(`Element with ID "${targetId}" not found.`);
    return;
  }

  const text = element.textContent || element.innerText;

  // 최신 브라우저용: Clipboard API
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        if (typeof callback === "function") callback();
      })
      .catch((err) => {
        mir_minialertbox("", "클립보드 복사 실패.", "error_outline");
        console.error("클립보드 복사 실패:", err);
      });
  } else {
    // Fallback: execCommand 방식
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed"; // iOS에서도 스크롤 방지
    textArea.style.opacity = 0;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand("copy");
      if (successful) {
        if (typeof callback === "function") callback();
      } else {
        mir_minialertbox("", "execCommand 복사 실패.", "error_outline");
        console.error("execCommand 복사 실패");
      }
    } catch (err) {
      mir_minialertbox("", "execCommand 오류.", "error_outline");
      console.error("execCommand 오류:", err);
    }

    document.body.removeChild(textArea);
  }
}

// 복사 후 실행할 사용자 정의 함수
function afterCopyCallback() {
  //alert("텍스트가 복사되었습니다!");
  mir_minialertbox("", "클립보드에 복사가 완료되었습니다.", "error_outline");
}

function mir_basetime_diff(ymdhis) {
  const year = parseInt(ymdhis.slice(0, 4));
  const month = parseInt(ymdhis.slice(4, 6)) - 1; // JS 월은 0~11
  const day = parseInt(ymdhis.slice(6, 8));
  const hour = parseInt(ymdhis.slice(8, 10));
  const minute = parseInt(ymdhis.slice(10, 12));
  const second = parseInt(ymdhis.slice(12, 14));

  const baseTime = new Date(year, month, day, hour, minute, second);
  const now = new Date();
  const diffMs = now - baseTime;
  const diffSeconds = diffMs / 1000;

  return diffSeconds;
}

function mir_basetime_now() {
  const now = new Date();
  const ymdhis =
    now.getFullYear().toString() +
    String(now.getMonth() + 1).padStart(2, "0") +
    String(now.getDate()).padStart(2, "0") +
    String(now.getHours()).padStart(2, "0") +
    String(now.getMinutes()).padStart(2, "0") +
    String(now.getSeconds()).padStart(2, "0");

  const timestamp = parseInt(ymdhis); // 숫자화

  return timestamp;
}

function mir_loadCSS(url) {
  if (document.querySelector(`link[href="${url}"]`)) return; // 이미 로드된 경우 방지
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = url;
  document.head.appendChild(link);
}

function mir_loadJS(url, position = "body", callback) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${url}"]`)) {
      if (callback) callback();
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = url;
    script.async = true;

    script.onload = () => {
      if (callback) callback();
      resolve();
    };

    script.onerror = () => {
      console.error("JS 로드 실패:", url);
      reject(new Error(`Failed to load script: ${url}`));
    };

    if (position === "head") {
      document.head.appendChild(script);
    } else {
      document.body.appendChild(script);
    }
  });
}

function mir_loadJS_ex(url, position = "body", callback, afterLabel = null) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${url}"]`)) {
      if (callback) callback();
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = url;
    script.async = true;

    script.onload = () => {
      if (callback) callback();
      resolve();
    };

    script.onerror = () => {
      console.error("JS 로드 실패:", url);
      reject(new Error(`Failed to load script: ${url}`));
    };

    let parent = position === "head" ? document.head : document.body;

    if (afterLabel) {
      // stdlabel이 있는 태그 뒤에 삽입
      const refNode = parent.querySelector(`script[stdlabel="${afterLabel}"]`);
      if (refNode && refNode.parentNode) {
        refNode.parentNode.insertBefore(script, refNode.nextSibling);
        return;
      }
      // label 못 찾으면 기본 위치에 append
    }

    parent.appendChild(script);
  });
}

function mir_loadJSQueue(urls) {
  return urls.reduce((promise, url) => {
    return promise.then(() => mir_loadJS(url));
  }, Promise.resolve());
}

/**
 * JS 파일을 DOM에 로드하고, 재시도 및 실패 시 웹훅 호출 로직을 수행합니다.
 *
 * @param {string} url 로드할 JS 파일 URL
 * @param {object} options 설정 옵션
 * @param {'head'|'body'} [options.position='body'] 스크립트 삽입 위치
 * @param {string} [options.afterUrl=null]  이전에 로드된 특정 JS 파일의 URL 뒤에 삽입
 * @param {object} [options.attributes={}]  `<script>` 태그에 부여할 커스텀 속성
 * @param {number} [options.maxRetries=3] 로드 실패 시 최대 재시도 횟수 (총 시도 횟수 = 1 + maxRetries)
 * @param {string} [options.webhookUrl=null]  최종 로드 실패 시 호출할 웹훅 URL
 * @returns {Promise<void>} 로드 성공 시 resolve
 */
function mrw_loadJS(url, options = {}) {
  const defaults = {
    position: "body",
    afterUrl: null,
    attributes: {},
    maxRetries: 3,
    webhookUrl: null
  };
  const config = { ...defaults, ...options };

  // 로드 여부 확인 헬퍼 함수
  function isScriptLoaded(checkUrl) {
    // 정확히 해당 src를 가진 스크립트가 DOM에 있는지 확인합니다.
    return document.querySelector(`script[src="${checkUrl}"]`) !== null;
  }

  if (isScriptLoaded(url)) {
    return Promise.resolve();
  }

  // 로드 및 재시도를 처리하는 내부 비동기 함수
  const attemptLoad = (currentAttempt) => {
    return new Promise((resolve, reject) => {
      if (isScriptLoaded(url)) {
        return resolve();
      }

      const script = document.createElement("script");
      script.src = url;
      script.async = true;

      //  커스텀 속성 부여
      Object.keys(config.attributes).forEach((key) => {
        script.setAttribute(key, config.attributes[key]);
      });
      // 로드된 스크립트 추적을 위한 고유 속성 부여
      script.setAttribute("data-mrw-url", url);

      // 로드 성공 핸들러
      script.onload = () => resolve();

      // 로드 실패 핸들러
      script.onerror = () => {
        const errorMsg = `JS 로드 실패 (시도 ${currentAttempt}/${config.maxRetries + 1}): ${url}`;
        console.error(errorMsg);

        // 실패한 스크립트 태그를 DOM에서 제거하여 깨끗한 재시도를 준비
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }

        //  재시도 로직
        if (currentAttempt < config.maxRetries + 1) {
          // 재시도가 필요하다는 특별한 메시지를 reject
          reject("RETRY_NEEDED");
        } else {
          // 최종 실패
          reject(
            new Error(
              `Failed to load script after ${config.maxRetries + 1} attempts: ${url}`
            )
          );
        }
      };

      //  특정 위치 삽입 처리
      let parent = config.position === "head" ? document.head : document.body;

      if (config.afterUrl) {
        // afterUrl을 가진 스크립트를 찾아 그 뒤에 삽입합니다.
        const refNode = parent.querySelector(
          `script[data-mrw-url="${config.afterUrl}"], script[src="${config.afterUrl}"]`
        );

        if (refNode && refNode.parentNode) {
          refNode.parentNode.insertBefore(script, refNode.nextSibling);
        } else {
          // 참조 노드를 찾지 못하면 기본 위치(body/head의 끝)에 append
          parent.appendChild(script);
        }
      } else {
        parent.appendChild(script);
      }
    });
  };

  // Main execution logic with retry loop
  return (async () => {
    for (let attempt = 1; attempt <= config.maxRetries + 1; attempt++) {
      try {
        await attemptLoad(attempt);
        return; // 성공 시 함수 종료
      } catch (error) {
        if (error === "RETRY_NEEDED") {
          // 재시도 시 짧은 지연 시간(500ms * (시도 횟수 - 1)) 후 다음 루프로 이동
          await new Promise((r) => setTimeout(r, 500 * (attempt - 1)));
          continue;
        } else {
          // 최종 실패 시 웹훅 호출
          if (config.webhookUrl) {
            console.warn("최종 로드 실패. 웹훅 호출 시도...");
            await callWebhook(url, config.webhookUrl);
          }
          throw error; // 최종 오류 던지기
        }
      }
    }
  })();
}

/**
 * 로드 실패 시 웹훅을 호출하고 고유 키를 포함시킵니다.
 */
async function callWebhook(failedUrl, webhookUrl) {
  if (!webhookUrl) return;

  try {
    const uniqueKey = generateUniqueKey(failedUrl);

    // 최종 웹훅 URL에 고유 키와 실패 URL을 포함
    const finalWebhookUrl = `${webhookUrl}?key=${uniqueKey}&failed_url=${encodeURIComponent(failedUrl)}`;

    // fetch API를 사용하여 웹훅 호출
    await fetch(finalWebhookUrl, {
      method: "GET", // 로깅용은 일반적으로 GET을 사용
      mode: "no-cors" // CORS 정책 무시 (로깅 목적이므로)
    });
    console.log("웹훅 호출 성공 (로깅 완료). Key:", uniqueKey);
  } catch (e) {
    console.error("웹훅 호출 실패:", e.message);
    // 웹훅 호출 실패는 메인 로드 실패와 별개이므로 오류를 던지지 않습니다.
  }
}

/**
 * 로드 실패 이벤트를 추적하기 위한 고유 키를 생성합니다.
 * (주의: 브라우저 환경에서는 요청자의 IP 주소 접근이 불가능합니다.
 * 대신 User-Agent, Hostname, 타임스탬프 등을 사용하여 고유성을 확보합니다.
 * IP 주소는 서버 측 웹훅 수신 로직에서 추가해야 합니다.)
 */
function generateUniqueKey(url) {
  const userAgent = navigator.userAgent || "unknown_agent";
  const location = window.location.href || "unknown_location"; // Hostname 포함
  const timestamp = Date.now();
  const uniqueId = Math.random().toString(36).substring(2, 9);

  // 식별 정보를 조합하여 단일 문자열로 생성
  const identifyingString = `${timestamp}|${location}|${userAgent}|${uniqueId}|${url}`;

  // URL-safe Base64로 인코딩하여 고유 키 반환
  return btoa(unescape(encodeURIComponent(identifyingString)));
}

/**
 * 주어진 목록의 JS 파일을 순서대로 로드합니다.
 *
 * @param {Array<{url: string, options?: object}>} loadList 로드할 파일 목록.
 * 각 항목은 url과 mir_loadJS_v2에 전달할 options 객체를 가집니다.
 * @returns {Promise<void>} 모든 스크립트 로드가 완료되면 resolve
 */
async function mrw_loadJS_sequential(loadList) {
  if (!Array.isArray(loadList) || loadList.length === 0) {
    console.warn("순차 로드 목록이 비어 있습니다.");
    return;
  }

  //console.log('=== JS 순차 로드 시작 ===');

  // for...of 루프와 await을 사용하여 순차적 로딩을 강제합니다.
  for (const item of loadList) {
    try {
      //console.log(`[순차 로드] ${item.url} 시작...`);
      // await이 완료될 때까지 다음 스크립트로 넘어가지 않습니다.
      await mrw_loadJS(item.url, item.options);
      //console.log(`[순차 로드] ${item.url} 완료.`);
    } catch (error) {
      console.error(
        `[순차 로드 중단] ${item.url} 로드 실패로 인해 순차 로드를 중단합니다.`,
        error
      );
      // 하나라도 실패하면 전체 순차 로드를 중단하고 오류를 던집니다.
      throw error;
    }
  }

  //console.log('=== 모든 JS 파일 순차 로드 성공 ===');
}

function mir_serializeFormObject($form) {
  var obj = {};
  var arr = $form.serializeArray();

  arr.forEach(function (item) {
    // name 파싱 ex: conn_state[abc123] -> ['conn_state', 'abc123']
    var keys = item.name.split(/\[|\]/).filter(function (k) {
      return k !== "";
    });
    var current = obj;

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];

      if (i === keys.length - 1) {
        // 마지막 키
        if (current[key] !== undefined) {
          // 이미 값이 있으면 배열로 변환
          if (!Array.isArray(current[key])) {
            current[key] = [current[key]];
          }
          current[key].push(item.value);
        } else {
          current[key] = item.value;
        }
      } else {
        // 중간 객체가 없으면 생성
        if (!current[key]) {
          current[key] = {};
        }
        current = current[key];
      }
    }
  });

  return obj;
}

/**
 * 지정한 컨테이너(폼이 아니어도 됨) 내부의 모든 필드 값을 수집
 * - input/select/textarea 포함
 * - file 포함(FormData에 File 객체로 append)
 * - checkbox/radio는 체크된 것만(옵션으로 미체크 포함 가능)
 * - name이 a[b][c] 구조면 obj로도 중첩 변환
 *
 * @param {string|Element|jQuery} rootSel 컨테이너 셀렉터 또는 엘리먼트
 * @param {Object} opt 옵션
 * @returns {{formData: FormData, obj: Object}}
 */
function mir_collectContainerForm(rootSel, opt) {
  opt = opt || {};

  var options = {
    includeDisabled: !!opt.includeDisabled,
    includeUnchecked: !!opt.includeUnchecked,
    uncheckedValue: opt.uncheckedValue !== undefined ? opt.uncheckedValue : "",
    skipEmpty: !!opt.skipEmpty,
    trim: !!opt.trim,

    // file object 저장 방식
    // 'meta'  : obj에는 파일 메타만 저장
    // 'file'  : obj에도 File 객체 저장
    // 'both'  : obj에는 메타, __files에는 File 객체
    // false   : obj에는 파일 정보 미저장, __files에만 저장
    fileObjectMode:
      opt.fileObjectMode !== undefined ? opt.fileObjectMode : "meta",

    // select[multiple] 미선택 포함 여부
    includeEmptyMultiSelect: !!opt.includeEmptyMultiSelect,

    // root 자신도 포함
    includeRoot: opt.includeRoot !== false,

    // checkbox unchecked 값을 name마다 다르게 줄 수 있게 함수 허용
    uncheckedValueResolver:
      typeof opt.uncheckedValueResolver === "function"
        ? opt.uncheckedValueResolver
        : null
  };

  var root = rootSel instanceof jQuery ? rootSel : $(rootSel);

  var obj = {};
  var fd = new FormData();

  // 디버깅/추후 chunk 업로드용 파일 큐
  var files = [];

  var $fields = options.includeRoot
    ? root
        .filter("input, select, textarea")
        .add(root.find("input, select, textarea"))
    : root.find("input, select, textarea");

  // radio 그룹 중복처리 방지
  var handledRadioNames = {};

  $fields.each(function () {
    var el = this;
    var $el = $(el);

    var name = $el.attr("name");
    if (!name) return;

    if (!options.includeDisabled && el.disabled) return;

    var tag = (el.tagName || "").toLowerCase();
    var type = (el.type || "").toLowerCase();

    // -------------------------------------------------
    // radio
    // -------------------------------------------------
    if (type === "radio") {
      if (handledRadioNames[name]) return;
      handledRadioNames[name] = true;

      var $group = $fields.filter(
        'input[type="radio"][name="' + escapeAttr(name) + '"]'
      );
      var $checked = $group.filter(":checked").first();

      if ($checked.length) {
        appendValue(name, normalizeValue($checked.val()));
      } else if (options.includeUnchecked) {
        appendValue(name, resolveUncheckedValue(name, el, $el));
      }
      return;
    }

    // -------------------------------------------------
    // checkbox
    // -------------------------------------------------
    if (type === "checkbox") {
      if (!el.checked) {
        if (options.includeUnchecked) {
          appendValue(name, resolveUncheckedValue(name, el, $el));
        }
        return;
      }

      appendValue(name, normalizeValue($el.val()));
      return;
    }

    // -------------------------------------------------
    // file
    // -------------------------------------------------
    if (type === "file") {
      collectFileField(el, name);
      return;
    }

    // -------------------------------------------------
    // select multiple
    // -------------------------------------------------
    if (tag === "select" && el.multiple) {
      var vals = $el.val() || [];

      if (!vals.length) {
        if (options.includeEmptyMultiSelect) {
          appendValue(name, []);
        } else if (options.includeUnchecked) {
          appendValue(name, resolveUncheckedValue(name, el, $el));
        }
        return;
      }

      for (var i = 0; i < vals.length; i++) {
        appendValue(name, normalizeValue(vals[i]));
      }
      return;
    }

    // -------------------------------------------------
    // 일반 field
    // -------------------------------------------------
    var val = normalizeValue($el.val());

    if (options.skipEmpty && isEmptyValue(val)) return;

    appendValue(name, val);
  });

  return {
    formData: fd,
    obj: obj,
    files: files,
    toJSON: function () {
      return JSON.stringify(obj);
    }
  };

  // =================================================
  // 내부 함수
  // =================================================

  function normalizeValue(val) {
    if (typeof val === "string" && options.trim) {
      return $.trim(val);
    }
    return val;
  }

  function isEmptyValue(val) {
    return val === "" || val === null || val === undefined;
  }

  function resolveUncheckedValue(name, el, $el) {
    if (options.uncheckedValueResolver) {
      return options.uncheckedValueResolver(name, el, $el, options);
    }
    return options.uncheckedValue;
  }

  function appendValue(name, value) {
    appendToFormData(fd, name, value);
    setStructuredValue(obj, name, value);
  }

  function appendToFormData(formData, name, value) {
    // 배열이면 내부 요소 각각 append
    if ($.isArray(value)) {
      if (value.length === 0) {
        // 빈 배열도 의미 보존용으로 남기고 싶으면 여기 정책 수정 가능
        formData.append(name, "");
        return;
      }

      for (var i = 0; i < value.length; i++) {
        formData.append(name, value[i]);
      }
      return;
    }

    formData.append(name, value);
  }

  function collectFileField(input, name) {
    var fileList = input.files;

    if (!fileList || !fileList.length) {
      return;
    }

    for (var i = 0; i < fileList.length; i++) {
      var file = fileList[i];
      var meta = makeFileMeta(file, name, i, input);

      // 전송용 FormData
      fd.append(name, file);

      // 파일 큐
      files.push({
        fieldName: name,
        file: file,
        meta: meta,
        input: input,
        index: i
      });

      // obj 반영
      if (options.fileObjectMode === "meta") {
        setStructuredValue(obj, name, meta);
      } else if (options.fileObjectMode === "file") {
        setStructuredValue(obj, name, file);
      } else if (options.fileObjectMode === "both") {
        setStructuredValue(obj, name, meta);

        if (!obj.__files) obj.__files = [];
        obj.__files.push({
          fieldName: name,
          file: file,
          meta: meta
        });
      } else if (options.fileObjectMode === false) {
        if (!obj.__files) obj.__files = [];
        obj.__files.push({
          fieldName: name,
          file: file,
          meta: meta
        });
      }
    }
  }

  function makeFileMeta(file, fieldName, index, input) {
    return {
      fieldName: fieldName,
      index: index,
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified || null,
      multiple: !!input.multiple
    };
  }

  // ---------------------------------------------
  // name 파싱
  // tags[]                -> ["tags", ""]
  // user[profile][name]   -> ["user","profile","name"]
  // items[0][id]          -> ["items","0","id"]
  // ---------------------------------------------
  function parseInputName(name) {
    var keys = [];
    String(name).replace(/([^[\]]+)|(\[\])/g, function (m, key, arr) {
      if (arr === "[]") {
        keys.push("");
      } else {
        keys.push(key);
      }
    });
    return keys;
  }

  function isNumericKey(key) {
    return /^[0-9]+$/.test(String(key));
  }

  function setStructuredValue(target, name, value) {
    var keys = parseInputName(name);

    if (!keys.length) return;

    setByKeys(target, keys, value);
  }

  function setByKeys(container, keys, value) {
    var cur = container;

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var isLast = i === keys.length - 1;
      var nextKey = !isLast ? keys[i + 1] : null;

      // 마지막 처리
      if (isLast) {
        if (key === "") {
          // 예: tags[]
          if (!$.isArray(cur)) {
            // 이 상황은 상위 단계에서 배열로 만들어져 있어야 자연스럽다.
            // 비정상 구조 방지용 fallback
            if (typeof cur === "object") {
              if (!cur.__arr) cur.__arr = [];
              cur.__arr.push(value);
            }
          } else {
            cur.push(value);
          }
        } else {
          if (cur[key] === undefined) {
            cur[key] = value;
          } else {
            if (!$.isArray(cur[key])) {
              cur[key] = [cur[key]];
            }
            cur[key].push(value);
          }
        }
        return;
      }

      // 중간 단계
      if (key === "") {
        // 예: items[][id] 같은 구조
        if (!$.isArray(cur)) {
          // fallback
          if (!cur.__arr) cur.__arr = [];
          cur = cur.__arr;
        }

        // 배열 마지막 요소 재사용 조건:
        // 마지막 요소가 object이고, 다음 key가 아직 비어있을 때만 재사용
        var lastIdx = cur.length - 1;
        var reusable = null;

        if (
          lastIdx >= 0 &&
          typeof cur[lastIdx] === "object" &&
          cur[lastIdx] !== null &&
          !$.isArray(cur[lastIdx])
        ) {
          if (cur[lastIdx][nextKey] === undefined) {
            reusable = cur[lastIdx];
          }
        }

        if (!reusable) {
          reusable = nextKey === "" || isNumericKey(nextKey) ? [] : {};
          cur.push(reusable);
        }

        cur = reusable;
      } else {
        if (cur[key] === undefined) {
          if (nextKey === "") {
            cur[key] = [];
          } else if (isNumericKey(nextKey)) {
            cur[key] = [];
          } else {
            cur[key] = {};
          }
        } else if (nextKey === "" && !$.isArray(cur[key])) {
          // 기존 값이 객체/문자열인데 배열이어야 하는 상황 보정
          cur[key] = [cur[key]];
        }

        cur = cur[key];
      }
    }
  }

  function escapeAttr(str) {
    return String(str).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  }
}

function mirFormChecker(formname) {
  let isValid = true;

  formname.find("input, select, textarea").each(function () {
    const $el = $(this);
    const isRequired = $el.hasClass("required") || $el.prop("required");

    if (!isRequired) return; // 필수 요소가 아니면 패스

    const type = $el.attr("type");

    if (type === "checkbox") {
      const name = $el.attr("name");
      // 같은 name의 체크박스 중 하나라도 체크되어 있는지 확인
      if ($(`input[name="${name}"]:checked`).length === 0) {
        isValid = false;
        $el.focus();
        return false; // .each 종료
      }
    } else if (type === "radio") {
      const name = $el.attr("name");
      // 같은 name의 라디오 중 하나라도 선택되었는지 확인
      if ($(`input[name="${name}"]:checked`).length === 0) {
        isValid = false;
        $el.focus();
        return false;
      }
    } else {
      // 텍스트 등 기타 input, select, textarea
      if (!$el.val().trim()) {
        isValid = false;
        $el.focus();
        return false;
      }
    }
  });

  if (!isValid) {
    mir_minialertbox("", "모든 필수 항목을 입력해주세요.", "");
    return false; // submit 방지용
  }

  // 이 시점에서 유효성 통과
  return true;
}

function mir_uniq_idx() {
  const randomStr = Math.random().toString(36).substr(2, 9);
  const timestamp = Date.now();
  return "temp_" + md5(randomStr + timestamp);
}

function mir_input_tg_toggle(triggerNode, targetParents) {
  $(document).on("change", triggerNode, function (event) {
    mir_eventStop(event);

    var $ul = $(this).closest("ul,div");
    var groupname = $ul.attr("mir-group"); // print

    if (!groupname) {
      console.warn("mir-group 속성 없음");
      return;
    }

    // 대상 전체 (제작요청 영역 제외)
    var $targets = $(
      'ul[mir-group="' + groupname + '"],div[mir-group="' + groupname + '"]'
    )
      .closest(targetParents)
      .not($ul.closest(targetParents));

    switch ($(this).val()) {
      case "req":
        $targets
          .removeClass("disNone")
          .find("input, select, textarea, button")
          .prop("disabled", false);
        break;

      case "no_req":
        $targets
          .addClass("disNone")
          .find("input, select, textarea, button")
          .prop("disabled", true);
        break;
    }
  });
  $(triggerNode + ":checked").trigger("change");
}

function mir_counter_num_rand(targetId, startNum, endNum, options = {}) {
  const container = document.getElementById(targetId);
  if (!container) return;

  const rollDuration = options.rollDuration ?? 1000;
  const onComplete =
    typeof options.onComplete === "function" ? options.onComplete : null;

  const start = parseInt(String(startNum).replace(/,/g, ""), 10);
  const end = parseInt(String(endNum).replace(/,/g, ""), 10);

  const startDigits = String(start).split("");
  const endDigits = String(end).split("");
  const maxLen = Math.max(startDigits.length, endDigits.length);

  const paddedStart = startDigits.join("").padStart(maxLen, "0").split("");
  const paddedEnd = endDigits.join("").padStart(maxLen, "0").split("");

  container.innerHTML = "";
  const digitSpans = [];

  for (let i = 0; i < maxLen; i++) {
    const span = document.createElement("span");
    span.dataset.type = "digit";
    span.textContent = paddedStart[i];

    // 자리수가 늘어난 부분은 opacity 0부터 시작
    if (i < maxLen - startDigits.length && maxLen > startDigits.length) {
      span.style.opacity = "0";
    } else {
      span.style.opacity = "1";
    }

    container.appendChild(span);
    digitSpans.push(span);

    if ((maxLen - i - 1) % 3 === 0 && i !== maxLen - 1) {
      const comma = document.createElement("span");
      comma.textContent = ",";
      comma.dataset.type = "comma";

      // 증가하는 자리의 쉼표도 같이 opacity 0부터 시작
      if (i < maxLen - startDigits.length && maxLen > startDigits.length) {
        comma.style.opacity = "0";
      } else {
        comma.style.opacity = "1";
      }

      container.appendChild(comma);
    }
  }

  const allSpans = [...container.querySelectorAll("span")];

  const startTime = performance.now();
  const stopTimes = [];
  for (let i = 0; i < maxLen; i++) {
    stopTimes[i] = startTime + rollDuration * (0.1 + Math.random() * 1);
  }

  let animationEnded = false;

  function animate() {
    const now = performance.now();
    const progress = Math.min((now - startTime) / rollDuration, 1);
    let allStopped = true;

    for (let i = 0, digitIndex = 0; i < allSpans.length; i++) {
      const span = allSpans[i];

      if (span.dataset.type === "digit") {
        const endDigit = paddedEnd[digitIndex];
        if (now < stopTimes[digitIndex]) {
          span.textContent = Math.floor(Math.random() * 10);
          span.style.opacity = "0.61";
          allStopped = false;
        } else {
          span.textContent = endDigit;

          if (digitIndex < maxLen - endDigits.length) {
            // 자리수가 줄어드는 자리 fade-out
            const fadeStart = 0.3;
            let fadeProgress = (progress - fadeStart) / (1 - fadeStart);
            fadeProgress = Math.min(Math.max(fadeProgress, 0), 1);
            let opacity = 1 - fadeProgress;
            opacity = Math.min(Math.max(opacity, 0), 1);
            opacity = +opacity.toFixed(3);
            if (opacity < 1) {
              opacity = 0;
              span.style.display = "none";
            }
            span.style.opacity = opacity.toString();

            // 쉼표도 fade-out
            if (
              i + 1 < allSpans.length &&
              allSpans[i + 1].dataset.type === "comma"
            ) {
              allSpans[i + 1].style.opacity = opacity.toString();
              allSpans[i + 1].style.display = "none";
            }
          } else if (
            digitIndex >= maxLen - startDigits.length &&
            maxLen > startDigits.length
          ) {
            // 자리수가 늘어난 자리 fade-in
            const fadeEnd = 0.1;
            let fadeProgress = progress / fadeEnd;
            fadeProgress = Math.min(Math.max(fadeProgress, 0), 1);
            let opacity = fadeProgress;
            opacity = Math.min(Math.max(opacity, 0), 1);
            opacity = +opacity.toFixed(3);
            if (opacity > 0 && opacity < 0.3) {
              opacity = 0;
              span.style.display = "none";
              allSpans[i + 1].style.display = "none";
            }
            span.style.opacity = opacity.toString();

            // 쉼표도 fade-in
            if (
              i + 1 < allSpans.length &&
              allSpans[i + 1].dataset.type === "comma"
            ) {
              allSpans[i + 1].style.display = "inline-flex";
              allSpans[i + 1].style.opacity = opacity.toString();
            }
          } else {
            // 그 외 자리 opacity 1 유지
            span.style.opacity = "1";
            span.style.display = "inline-flex";
            if (
              i + 1 < allSpans.length &&
              allSpans[i + 1].dataset.type === "comma"
            ) {
              allSpans[i + 1].style.opacity = "1";
              allSpans[i + 1].style.display = "inline-flex";
            }
          }
        }
        digitIndex++;
      }
    }

    if (!allStopped) {
      requestAnimationFrame(animate);
    } else if (!animationEnded) {
      animationEnded = true;
      if (onComplete) onComplete();
    }
  }

  requestAnimationFrame(animate);
}

function formatFileSize(bytes) {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let i = 0;

  while (bytes >= 1000 && i < units.length - 1) {
    bytes /= 1000;
    i++;
  }

  return `${bytes.toFixed(2)} ${units[i]}`;
}

$(function () {
  function checkPasswordMatch(tparam, event) {
    const password = $("[data-password]").val();
    const confirm = $("[data-password-check]").val();
    const $label1 = $("#pwd-match-label");
    const $label2 = $("#pwd-match-label-confirm");

    if (password.trim().length == 0) {
      //console.log(6);
      $(tparam).val("");
      $label1.removeClass("match disNone").addClass("mismatch").text("미입력");
      $label2.removeClass("match disNone").addClass("mismatch").text("불일치");
      mir_minialertbox(
        "",
        "비밀번호 일치확인을 위해 비밀번호를 먼저 입력해주세요",
        ""
      );
      return false;
    }

    if ($(tparam).is("[data-password]") && password.trim().length > 0) {
      //console.log(1);
      $label1.text("").removeClass("mismatch match").addClass("disNone");
    }

    if (!password && !confirm) {
      //console.log(2);
      $label1.text("").addClass("disNone");
      $label2.text("").addClass("disNone");
      return;
    }

    if (password === confirm) {
      //console.log(3);
      //$label1.text('일치').removeClass('mismatch disNone').addClass('match');
      $label2.text("일치").removeClass("mismatch disNone").addClass("match");
    } else {
      //console.log(4);
      //$label1.text('불일치').removeClass('match disNone').addClass('mismatch');
      if ($label2.val().trim().length === 0) {
        $label2
          .text("미입력")
          .removeClass("match disNone")
          .addClass("mismatch");
      } else {
        $label2
          .text("불일치")
          .removeClass("match disNone")
          .addClass("mismatch");
      }
    }
  }

  // 입력 시 검증
  $(document).on(
    "input change paste keyup",
    "input[data-password]",
    function (event) {
      mir_eventStop(event);
      if ($("input[data-password-check]").val().length > 0) {
        checkPasswordMatch(this, event);
      } else {
        checkPasswordMatch(this, event);
      }

      if (typeof mir_forms_all_required_ok === "function") {
        mir_forms_all_required_ok();
      }
    }
  );

  $(document).on(
    "input change blur paste",
    "[data-password-check]",
    function (event) {
      mir_eventStop(event);
      checkPasswordMatch(this, event);
      if (typeof mir_forms_all_required_ok === "function") {
        mir_forms_all_required_ok();
      }
    }
  );

  // 눈 아이콘 토글
  $(document).on("click", ".toggle-password", function (event) {
    mir_eventStop(event);
    const targetType =
      $(this).data("target") === "password"
        ? "[data-password]"
        : "[data-password-check]";
    const $input = $(targetType);
    const type = $input.attr("type") === "password" ? "text" : "password";
    $input.attr("type", type);

    // 아이콘 교체 (원하면)
    $(this).text(type === "password" ? "👁️" : "🙈");
  });

  $(document).on("blur", "[data-password]", function (event) {
    mir_eventStop(event);
    const $input = $(this);
    const value = $input.val();

    if (value.trim().length > 0) {
      const result = mir_Password_Check(value);

      if (result != true) {
        mir_minialertbox("", result, "");
        $input.focus();
        return false;
      } else {
        $input
          .prev(".mds-input-label")
          .removeClass("disNone mismatch")
          .addClass("match")
          .text("유효");
      }

      if (
        $input.is("[data-password]") &&
        $("input[data-password-check]").val().length > 0
      ) {
        checkPasswordMatch();
      } else if ($input.is("[data-password-check]")) {
        checkPasswordMatch();
      }
    }

    // 통과 시 추가 동작 가능
    if (typeof mir_forms_all_required_ok === "function") {
      mir_forms_all_required_ok();
    }
  });

  $(document).on("blur", "[data-nickname]", function (event) {
    mir_eventStop(event);
    const $input = $(this);
    const value = $input.val();
    const mode = $input.data("nickname-valid-mode")
      ? $input.data("nickname-valid-mode")
      : null;

    if (!mode) {
      mir_minialertbox(
        "",
        "[Error] The nickname parameter is missing. Unable to proceed.",
        ""
      );
      return false;
    }

    if (value.trim().length > 0) {
      const result = mir_Nickname_Check(value, mode);

      if (result != true) {
        mir_minialertbox("", result, "");
        $input.focus();
        $input
          .prev(".mds-input-label")
          .removeClass("disNone match")
          .addClass("mismatch")
          .text("불가");
        if (typeof mir_forms_all_required_ok === "function") {
          mir_forms_all_required_ok();
        }
        return false;
      } else {
        $input
          .prev(".mds-input-label")
          .removeClass("disNone mismatch")
          .addClass("match")
          .text("가능");
      }
    } else if ($input.attr("required") !== undefined) {
      const result = mir_Nickname_Check(value, mode);
      mir_minialertbox("", result, "");
      $input
        .prev(".mds-input-label")
        .removeClass("disNone match")
        .addClass("mismatch")
        .text("미입력");
      $input.focus();
    }

    // 통과 시 추가 동작 가능
    if (typeof mir_forms_all_required_ok === "function") {
      mir_forms_all_required_ok();
    }
  });
});
/*
$(document).on('click','.attentionBorder1way',function(event)
{
	mir_eventStop(event);
	$(this).removeClass('attentionBorder1way');
});
*/

$(document).on("click", ".mds-checkbox + label", function (event) {
  $(this).css({ "border-color": "" });
});

$(document).on("input blur", ".kakao_verificate_key", function (event) {
  if ($(this).data("kakao_key_processing")) return;
  $(this).data("kakao_key_processing", true);

  var val = $(this).val() || "";
  var newVal = val.replace(/^#DaumWebMasterTool:/, "").replace(/\s+/g, "");

  if (val !== newVal) {
    $(this).val(newVal);
    // 치환 후에 딱 한 번 input 이벤트 트리거
    $(this).trigger("input");
  }

  $(this).data("kakao_key_processing", false);
});

/**
 * 안전한 웹 스토리지 헬퍼
 * localStorage / sessionStorage 선택 지원
 * 스토리지 불가 시 쿠키로 대체
 *
 * @param {string} key        저장/조회할 키
 * @param {*}      value      저장할 값 (null/undefined면 읽기 모드)
 * @param {object} options    { storage: 'local'|'session', remove: false, days: 7 }
 * @returns {*} 읽기 시 값, 저장 시 true
 *
 * mir_bStorage('token', {jwt: 'abcd1234'}, {storage: 'session'});
 */
function mir_bStorage(key, value, options = {}) {
  const storageType =
    options.storage === "session" ? "sessionStorage" : "localStorage";
  const remove = options.remove || false;
  const days = options.days || 7; // 쿠키 저장 기간

  // 스토리지 사용 가능 여부 확인
  function storageAvailable(type) {
    try {
      const storage = window[type];
      const testKey = "__test__";
      storage.setItem(testKey, "1");
      storage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  // 쿠키 저장
  function setCookie(name, val, expDays) {
    const d = new Date();
    d.setTime(d.getTime() + expDays * 24 * 60 * 60 * 1000);
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(val)};expires=${d.toUTCString()};path=/`;
  }

  // 쿠키 읽기
  function getCookie(name) {
    const match = document.cookie.match(
      new RegExp("(^| )" + encodeURIComponent(name) + "=([^;]+)")
    );
    return match ? decodeURIComponent(match[2]) : null;
  }

  // 쿠키 삭제
  function removeCookie(name) {
    document.cookie = `${encodeURIComponent(name)}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
  }

  const hasStorage = storageAvailable(storageType);

  // 읽기 모드
  if (value === null || value === undefined) {
    if (hasStorage) {
      let data = window[storageType].getItem(key);
      try {
        data = JSON.parse(data);
      } catch (e) {}
      if (remove) window[storageType].removeItem(key);
      return data;
    } else {
      const data = getCookie(key);
      try {
        return JSON.parse(data);
      } catch (e) {
        return data;
      }
    }
  }

  // 저장 모드
  if (typeof value === "object") value = JSON.stringify(value);

  if (hasStorage) {
    window[storageType].setItem(key, value);
  } else {
    setCookie(key, value, days);
  }

  return true;
}

// 삭제 전용 함수
function mir_bStorageRemove(key, storage = "local") {
  const storageType = storage === "session" ? "sessionStorage" : "localStorage";
  function removeCookie(name) {
    document.cookie = `${encodeURIComponent(name)}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
  }
  try {
    window[storageType].removeItem(key);
  } catch (e) {
    removeCookie(key);
  }
}

function initCustomScroll(scrollEl) {
  const track = scrollEl.querySelector(".mrwScroll-track");
  const content = scrollEl.querySelector(".mrwScroll-content");
  const thumb = scrollEl.querySelector(".mrwScroll-thumb");

  if (!track || !content || !thumb) return; // 필수 요소 없으면 종료

  function updateThumb() {
    const contentHeight = content.scrollHeight;
    const containerHeight = scrollEl.clientHeight;
    const trackHeight = track.clientHeight;

    // 스크롤 필요 여부
    if (contentHeight <= containerHeight) {
      thumb.style.opacity = "0";
      return;
    } else {
      thumb.style.opacity = "1";
    }

    const ratio = containerHeight / contentHeight;
    const thumbHeight = Math.max(ratio * trackHeight, 20);
    const maxThumbTop = trackHeight - thumbHeight;
    const thumbTop =
      (content.scrollTop / (contentHeight - containerHeight)) * maxThumbTop;

    thumb.style.height = thumbHeight + "px";
    thumb.style.top = thumbTop + "px";
  }

  // 이벤트 바인딩
  content.addEventListener("scroll", updateThumb);
  window.addEventListener("resize", updateThumb);

  // DOM 로딩 및 동적 로딩 후에도 반영
  updateThumb();
  requestAnimationFrame(updateThumb);
  setTimeout(updateThumb, 100); // DOM 레이아웃 완료 후 보정

  const observer = new MutationObserver(updateThumb);
  observer.observe(content, { childList: true, subtree: true });
}

// 모든 .mrwScroll 자동 초기화
document.querySelectorAll(".mrwScroll").forEach(initCustomScroll);

$(".mrw-tab-wrap .tab").click(function () {
  $(".mrw-tab-wrap .tab").removeClass("active");
  $(this).addClass("active");
  let index = $(this).data("index");
  $(".mrw-tab-wrap  .tab-slider").css({
    transform: `translateX(${index * 100}%)`
  });
});

function initDetailScroll(selector, options = {}) {
  const el =
    typeof selector === "string" ? document.querySelector(selector) : selector;
  if (!el) return null;

  const opt = Object.assign(
    {
      minThumb: 20,
      thumbWidth: 6, // 기본 두께
      hoverWidth: 15, // hover 시 두께
      autoHide: true, // 자동 숨김 여부
      thumbOpacity: 1, // 기본 opacity
      hoverThumbOpacity: 1, // hover 시 opacity
      visibleRetry: 12
    },
    options
  );

  // DOM 구조 생성
  if (!el.classList.contains("mrwScroll")) el.classList.add("mrwScroll");
  if (!el.querySelector(".mrwScroll-content")) {
    const content = document.createElement("div");
    content.className = "mrwScroll-content";
    while (el.firstChild) content.appendChild(el.firstChild);
    el.appendChild(content);
  }
  if (!el.querySelector(".mrwScroll-track")) {
    const track = document.createElement("div");
    track.className = "mrwScroll-track";
    const thumb = document.createElement("div");
    thumb.className = "mrwScroll-thumb";
    track.appendChild(thumb);
    el.appendChild(track);
  }

  const content = el.querySelector(".mrwScroll-content");
  const track = el.querySelector(".mrwScroll-track");
  const thumb = el.querySelector(".mrwScroll-thumb");

  track.style.pointerEvents = "auto";
  thumb.style.pointerEvents = "auto";

  // CSS transition 적용
  thumb.style.transition =
    "width 0.2s ease, opacity 0.2s ease, background 0.2s ease";

  // width와 opacity 동시에 적용
  function applyThumb(width, opacity) {
    if (width !== undefined) thumb.style.width = width + "px";
    if (opacity !== undefined) thumb.style.opacity = opacity;
    requestAnimationFrame(updateThumb);
  }

  // thumb 위치/크기 업데이트
  function updateThumb() {
    const contentHeight = content.scrollHeight;
    const containerHeight = content.clientHeight;
    const trackHeight = track.offsetHeight;

    if (contentHeight <= containerHeight) {
      thumb.style.height = "0px";
      thumb.style.opacity = "0"; // 스크롤 필요 없으면 숨김
      return;
    }

    const ratio = containerHeight / contentHeight;
    const thumbHeight = Math.max(ratio * trackHeight, opt.minThumb);
    const maxThumbTop = trackHeight - thumbHeight;
    const thumbTop =
      (content.scrollTop / (contentHeight - containerHeight)) * maxThumbTop;

    thumb.style.height = thumbHeight + "px";
    thumb.style.top = thumbTop + "px";

    // opacity 재설정 (hover 시 적용되어 있으면 그대로, 아니면 기본)
    if (!thumb.matches(":hover") && !track.matches(":hover")) {
      thumb.style.opacity = opt.thumbOpacity;
    }
  }

  // Hover 시 width + opacity 변경
  track.addEventListener("mouseenter", () =>
    applyThumb(opt.hoverWidth, opt.hoverThumbOpacity)
  );
  track.addEventListener("mouseleave", () =>
    applyThumb(opt.thumbWidth, opt.thumbOpacity)
  );

  // Drag 기능
  let dragging = false,
    startY = 0,
    startScroll = 0;
  function onThumbDown(e) {
    dragging = true;
    startY = e.touches ? e.touches[0].clientY : e.clientY;
    startScroll = content.scrollTop;
    document.addEventListener("mousemove", onThumbMove);
    document.addEventListener("mouseup", onThumbUp);
    document.addEventListener("touchmove", onThumbMove, { passive: false });
    document.addEventListener("touchend", onThumbUp);
    e.preventDefault();
  }
  function onThumbMove(e) {
    if (!dragging) return;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const dy = clientY - startY;
    const trackH = track.offsetHeight;
    const thumbH = thumb.offsetHeight;
    const maxThumbTop = trackH - thumbH;
    const scrollable = content.scrollHeight - content.clientHeight;
    const scrollDelta = (dy / maxThumbTop) * scrollable;
    content.scrollTop = startScroll + scrollDelta;
    e.preventDefault();
  }
  function onThumbUp() {
    dragging = false;
    document.removeEventListener("mousemove", onThumbMove);
    document.removeEventListener("mouseup", onThumbUp);
    document.removeEventListener("touchmove", onThumbMove);
    document.removeEventListener("touchend", onThumbUp);
  }
  thumb.addEventListener("mousedown", onThumbDown);
  thumb.addEventListener("touchstart", onThumbDown, { passive: false });

  // Track 클릭 시 이동
  track.addEventListener("mousedown", (e) => {
    if (e.target === thumb) return;
    const rect = track.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const ratio = clickY / rect.height;
    const newTop = ratio * (content.scrollHeight - content.clientHeight);
    content.scrollTop = newTop;
  });

  content.addEventListener("scroll", updateThumb);
  // 수정
  window.addEventListener("resize", () => {
    // 레이아웃 안정화 후 thumb 업데이트
    requestAnimationFrame(updateThumb);
    setTimeout(updateThumb, 50); // 추가 보정
  });

  // 초기화
  applyThumb(opt.thumbWidth, opt.thumbOpacity);
  updateThumb();
  requestAnimationFrame(updateThumb);
  setTimeout(updateThumb, 80);

  return { update: updateThumb };
}

function initTabSlider(selector) {
  if (!selector) {
    alert("오류");
    return false;
  }

  let tabsPadding = parseFloat($(selector).css("padding-right")) || 0;
  $(selector)
    .find(".tab-slider")
    .css({ left: tabsPadding + "px", top: tabsPadding + "px" });
  const $container = $(selector);
  const $tabs = $(selector).find(".tab");
  const $slider = $(selector).find(".tab-slider");
  const tabCount = $tabs.length;

  $(selector)
    .children(".tab")
    .each(function () {
      const tabCountGrid = $tabs.length <= 4 ? $tabs.length : 4;
      $(selector).css({
        "grid-template-columns": "repeat(" + tabCountGrid + ", 1fr)"
      });

      const columns = 4; // grid-template-columns repeat(4, 1fr)
      const rowHeight = $(this).outerHeight(true) || 40;

      let index_add = $tabs.index(this);

      let row = Math.floor(index_add / tabCountGrid); // 몇 번째 줄
      let col = index_add % tabCountGrid; // 몇 번째 칸

      // 슬라이더 width를 탭 갯수에 맞게 조절
      if (tabCountGrid > 1) {
        $slider.css({
          width: `calc(${100 / tabCountGrid}% - ${(tabsPadding / tabCountGrid) * 2}px)`,
          height: rowHeight + "px"
        });
      } else {
        $slider.css({
          width: `calc(${100 / tabCountGrid}% - ${tabsPadding * 2}px)`,
          height: rowHeight + "px"
        });
      }

      // 클릭 이벤트
      $(this).click(function () {
        $tabs.removeClass("active");
        $(this).addClass("active");

        let tg_index = $(this).data("index");
        let index = $tabs.index(this);
        let row = Math.floor(index / tabCountGrid); // 몇 번째 줄
        let col = index % tabCountGrid; // 몇 번째 칸

        if (tabCountGrid > 1) {
          $slider.css({
            width: `calc(${100 / tabCountGrid}% - ${(tabsPadding / tabCountGrid) * 2}px)`,
            height: rowHeight + "px",
            transform: `translate(${col * 100}%, ${row * rowHeight}px)`
          });
        } else {
          $slider.css({
            width: `calc(${100 / tabCountGrid}% - ${(tabsPadding / tabCountGrid) * 2}px)`,
            height: rowHeight + "px",
            transform: `translate(0, 0)`
          });
        }

        // tab slide 위치 이동 끝.
        if ($(this).parents(".mrw-tab-wrap").attr("dpmode") == "tab-control") {
          $("#operateinfo_wrap > div[data-tab-index]").addClass("disNone");
          $(
            '#operateinfo_wrap > div[data-tab-index="' + tg_index + '"]'
          ).removeClass("disNone");
        }

        initTabSlider(
          '[data-tab-index="' +
            tg_index +
            '"] .mrw-tab-wrap[tab-label="tempholiday"] .tab-container'
        );
      });
    });
}

/**
 * SQLi에 악용되기 쉬운 토큰/패턴을 "입력 문자열"에서 제거합니다.
 * - lenient: 주석/세미콜론/제어문자/널바이트 위주 제거 (권장 기본)
 * - strict : 따옴표/역슬래시/위험 키워드까지 더 적극적으로 제거
 * ※ 서버 쿼리는 반드시 Prepared Statement로 처리하세요.
 */
function mrw_sql_risk_remove(input, opts) {
  opts = opts || {};
  var mode = opts.mode || "lenient"; // 'lenient' | 'strict'

  var s = input == null ? "" : String(input);

  // 1) 제어문자/널바이트 제거 (MySQL에서 문제 유발 가능)
  s = s.replace(/[\u0000-\u001F\u007F]/g, "");

  // 2) SQL 주석 제거: /* ... */, -- ... (라인), # ... (라인)
  s = s.replace(/\/\*[\s\S]*?\*\//g, "");
  s = s.replace(/(^|\s)--.*$/gm, "$1"); // 공백 뒤의 -- 주석
  s = s.replace(/(^|\s)#.*$/gm, "$1"); // # 주석

  // 3) statement separator 제거
  s = s.replace(/;/g, "");

  if (mode === "strict") {
    // 4) 쿼리 탈출에 쓰이는 문자 제거
    s = s.replace(/[\'\"\\]/g, "");

    // 5) 대표적인 위험 키워드(단어 경계) 제거
    // (일반 텍스트에서 이런 단어가 실제로 필요하면 strict를 피하세요)
    s = s.replace(
      /\b(union|select|insert|update|delete|drop|alter|create|truncate|replace|exec|execute|sleep|benchmark|load_file|outfile)\b/gi,
      ""
    );

    // 6) 흔한 “조건 우회” 패턴의 일부 제거(너무 공격적이지 않게 최소화)
    s = s.replace(/\b(or|and)\b\s+\d+\s*=\s*\d+/gi, "");
    s = s.replace(/\b(or|and)\b\s+[a-z_]+\s*=\s*[a-z_]+/gi, "");
  }

  // 7) 공백 정리
  s = s.replace(/\s{2,}/g, " ").trim();

  return s;
}

function mrw_sql_risk_remove_push(input, opts) {
  opts = opts || {};
  var mode = opts.mode || "lenient"; // 'lenient' | 'strict'
  var alertpush = opts.alert || "";
  var original = input == null ? "" : String(input);
  var s = original;

  // 규칙 목록(탐지되면 제거) - 너무 과격하지 않게 “위협적인” 것 위주
  var rules = [
    {
      key: "control_chars",
      label: "제어문자/널바이트 제거",
      re: /[\u0000-\u001F\u007F]/g,
      rep: ""
    },

    // SQL 주석
    {
      key: "block_comment",
      label: "블록 주석(/* ... */) 제거",
      re: /\/\*[\s\S]*?\*\//g,
      rep: ""
    },
    {
      key: "dash_comment",
      label: "라인 주석(-- ...) 제거",
      re: /(^|\s)--.*$/gm,
      rep: "$1"
    },
    {
      key: "hash_comment",
      label: "라인 주석(# ...) 제거",
      re: /(^|\s)#.*$/gm,
      rep: "$1"
    },

    // statement separator
    { key: "semicolon", label: "세미콜론(;) 제거", re: /;/g, rep: "" }
  ];

  // strict 모드면 더 공격적으로 제거
  if (mode === "strict") {
    rules.push(
      {
        key: "quotes",
        label: "따옴표/역슬래시 제거",
        re: /[\'\"\\]/g,
        rep: ""
      },
      {
        key: "danger_keywords",
        label: "보안 위협 키워드 제거",
        re: /\b(union|select|insert|update|delete|drop|alter|create|truncate|replace|exec|execute|sleep|benchmark|load_file|outfile)\b/gi,
        rep: ""
      }
    );
  }

  // 적용 + 이슈 수집
  var issues = [];
  for (var i = 0; i < rules.length; i++) {
    var r = rules[i];
    if (r.re.test(s)) {
      // test() 때문에 lastIndex 이슈 방지용 reset (g 플래그 있을 때)
      try {
        r.re.lastIndex = 0;
      } catch (e) {}
      issues.push({ key: r.key, label: r.label });
      s = s.replace(r.re, r.rep);
    } else {
      try {
        r.re.lastIndex = 0;
      } catch (e) {}
    }
  }

  // 공백 정리
  s = s.replace(/\s{2,}/g, " ").trim();

  if (alertpush === true && issues && issues.length) {
    mir_minialertbox("", issues[0].label, "");
  }

  return {
    original: original,
    value: s,
    changed: original !== s,
    issues: issues
  };
}

// 레이아웃 안정화 측정.
function measureWithObserver($wrap, measureFn, settleMs) {
  settleMs = settleMs || 120;
  var el = $wrap[0];
  if (!el || !window.ResizeObserver) {
    // fallback
    setTimeout(measureFn, 0);
    return;
  }

  var timer = null;
  var ro = new ResizeObserver(function () {
    clearTimeout(timer);
    timer = setTimeout(function () {
      ro.disconnect();
      measureFn();
    }, settleMs); // 변화가 멈춘 뒤 settleMs 후에 최종 측정
  });

  ro.observe(el);

  // 최초 1회
  measureFn();
}

function mrw_modal_autoheight(pvd_code) {
  var $modalwrap = $("#pvd_pop_" + pvd_code);
  measureWithObserver(
    $modalwrap,
    function () {
      var mixheight = 5;
      if ($modalwrap.find(".pop_title").length > 0) {
        var modaltitle_height = $modalwrap
          .find(".pop_title")[0]
          .getBoundingClientRect().height;
        mixheight += mixheight + modaltitle_height || 0;
      }
      if ($modalwrap.find(".ctrlbar").length > 0) {
        var modalbar_height = $modalwrap
          .find(".ctrlbar")[0]
          .getBoundingClientRect().height;
        mixheight += modalbar_height || 0;
      }
      if ($modalwrap.find('[data-pos="regist-btn"]').length > 0) {
        var modalsubmit = $modalwrap
          .find('[data-pos="regist-btn"]')[0]
          .getBoundingClientRect().height;
        mixheight += modalsubmit || 0;
      }
      if ($modalwrap.find(".pop_content_body").length > 0) {
        var modalbody_height = $modalwrap
          .find(".pop_content_body")[0]
          .getBoundingClientRect().height;
        mixheight += modalbody_height || 0;
      }
      $modalwrap.stop(true).animate({ "max-height": mixheight + "px" }, 100);

      // 최종 측정 + animate
    },
    120
  );
}

function startCountdown(targetId, minutes = 5, seconds = 0, onComplete = null) {
  const targetElement = document.getElementById(targetId);

  if (!targetElement) {
    console.error("타겟 요소를 찾을 수 없습니다: " + targetId);
    return;
  }

  let totalSeconds = minutes * 60 + seconds;

  // 시간 포맷팅 함수
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

  // 초기 표시
  targetElement.textContent = formatTime(totalSeconds);

  // 인터벌 시작
  const intervalId = setInterval(function () {
    totalSeconds--;

    if (totalSeconds >= 0) {
      targetElement.textContent = formatTime(totalSeconds);
    } else {
      clearInterval(intervalId);
      targetElement.textContent = "00:00";

      // 완료 콜백 실행
      if (typeof onComplete === "function") {
        onComplete();
      }
    }
  }, 1000);

  // 타이머 중지 함수 반환
  return {
    stop: function () {
      clearInterval(intervalId);
    },
    reset: function (newMinutes = 5, newSeconds = 0) {
      clearInterval(intervalId);
      startCountdown(targetId, newMinutes, newSeconds, onComplete);
    }
  };
}

function mir_validate_container($container) {
  var result = {
    ok: true,
    msg: "",
    $field: null
  };

  $container.find("input, select, textarea").each(function () {
    var $field = $(this);

    if ($field.is(":disabled") || $field.is("[readonly]")) {
      return true;
    }

    var check = mir_validate_field($field);

    if (!check.ok) {
      result.ok = false;
      result.msg = check.msg;
      result.$field = $field;
      return false;
    }
  });

  return result;
}

function mir_validate_field($field) {
  var value = $.trim($field.val());
  var label =
    $field.attr("data-label") || $field.attr("placeholder") || "입력값";
  var required = $field.is("[data-required]");

  if (required && value === "") {
    return {
      ok: false,
      msg: label + "을(를) 입력해주세요."
    };
  }

  if (value === "") {
    return {
      ok: true,
      msg: ""
    };
  }

  var type = $field.attr("data-type");

  if (type) {
    return mir_validate_field_type(type, value, $field);
  }

  return {
    ok: true,
    msg: ""
  };
}

function mir_validate_field_type(type, value, $field) {
  var label =
    $field.attr("data-label") || $field.attr("placeholder") || "입력값";

  switch (type) {
    case "date":
      var format = $field.attr("data-format") || "YYYY-MM-DD";

      if (!mir_is_valid_date_format(value, format)) {
        return {
          ok: false,
          msg: label + "은(는) " + format + " 형식으로 입력해주세요."
        };
      }
      break;

    case "money":
      if (!/^\d+$/.test(value)) {
        return {
          ok: false,
          msg: label + "은(는) 숫자만 입력해주세요."
        };
      }

      if (/^0\d+/.test(value)) {
        return {
          ok: false,
          msg: label + "은(는) 0으로 시작할 수 없습니다."
        };
      }
      break;

    default:
      break;
  }

  return {
    ok: true,
    msg: ""
  };
}

function mir_is_valid_date_format(value, format) {
  var tokenRegex = /(YYYY|YY|MM|M|DD|D)/g;
  var tokens = format.match(tokenRegex);

  if (!tokens) {
    return false;
  }

  var regexPattern = "";
  var lastIndex = 0;
  var match;

  while ((match = tokenRegex.exec(format)) !== null) {
    regexPattern += mir_escape_regex(format.slice(lastIndex, match.index));

    switch (match[0]) {
      case "YYYY":
        regexPattern += "\\d{4}";
        break;
      case "YY":
        regexPattern += "\\d{2}";
        break;
      case "MM":
        regexPattern += "\\d{2}";
        break;
      case "M":
        regexPattern += "\\d{1,2}";
        break;
      case "DD":
        regexPattern += "\\d{2}";
        break;
      case "D":
        regexPattern += "\\d{1,2}";
        break;
    }

    lastIndex = match.index + match[0].length;
  }

  regexPattern += mir_escape_regex(format.slice(lastIndex));

  return new RegExp("^" + regexPattern + "$").test(value);
}

function mir_escape_regex(str) {
  return String(str).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * 확인/취소 커스텀 알림
 *
 * @param {String|HTMLElement|jQuery} content
 *        일반 문자열, HTML 문자열, rawurlencode된 HTML,
 *        HTMLElement, jQuery 객체
 * @param {Function} confirm_callback 확인 클릭 후 실행할 함수
 * @param {Function} cancel_callback  취소 클릭 후 실행할 함수
 * @param {String}   icon              Material Icons 아이콘명
 */
function mrw_confirm_alert(content, confirm_callback, cancel_callback, icon) {
  // 중복 confirm 방지
  if ($("#mrw_confirm_alert").length) return;

  icon = icon || "help_outline";

  var $mount = $("#popup_center");

  // popup_center가 없는 페이지에서도 사용할 수 있도록 처리
  if ($mount.length === 0) {
    $mount = $("body");
  }

  var before_focus = document.activeElement;
  var closed = false;

  var is_jquery_object = content && content.jquery;

  var is_dom_object = content && content.nodeType;

  var html_content = content;

  /*
   * PHP rawurlencode()로 전달된 HTML 자동 디코딩
   *
   * 예:
   * %3Cdiv%3E...%3C%2Fdiv%3E
   */
  if (!is_jquery_object && !is_dom_object) {
    html_content =
      content === undefined || content === null ? "" : String(content);

    var encoded_html_check =
      /%3C/i.test(html_content) && /%3E/i.test(html_content);

    if (encoded_html_check) {
      try {
        /*
         * rawurlencode는 공백을 %20으로 처리하지만,
         * urlencode 방식의 + 공백도 함께 지원
         */
        html_content = decodeURIComponent(html_content.replace(/\+/g, "%20"));
      } catch (decode_error) {
        console.error("mrw_confirm_alert HTML 디코딩 실패", decode_error);
      }
    }
  }

  var $wrap = $("<div>", {
    id: "mrw_confirm_alert",
    role: "presentation"
  }).css({
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 100000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
    boxSizing: "border-box",
    background: "rgba(0, 0, 0, 0.35)",
    opacity: 0
  });

  /*
   * 기존 클래스와 모션 스타일 유지
   */
  var $box = $("<div>", {
    class:
      "dfBoxShadow-PP " +
      "pd1_2rem " +
      "fs09rem " +
      "bgWhite " +
      "fcBlack " +
      "dfRound1rem " +
      "ptd_B",
    role: "dialog",
    "aria-modal": "true",
    "aria-describedby": "mrw_confirm_alert_content"
  }).css({
    width: "26rem",
    maxWidth: "100%",
    maxHeight: "calc(100vh - 2rem)",
    boxSizing: "border-box",
    marginTop: "-1rem",
    overflow: "hidden",
    opacity: 0
  });

  var $message = $("<div>").css({
    display: "flex",
    alignItems: "flex-start",
    gap: "0.6rem",
    minWidth: 0
  });

  var $icon = $("<span>", {
    class: "material-icons-outlined fs1rem",
    text: icon,
    "aria-hidden": "true"
  }).css({
    flexShrink: 0
  });

  /*
   * 기존 span.text() 대신 HTML을 담을 수 있는 div 사용
   */
  var $content = $("<div>", {
    id: "mrw_confirm_alert_content",
    class: "mrw_confirm_alert_content"
  }).css({
    flex: "1 1 auto",
    width: "100%",
    minWidth: 0,
    maxWidth: "100%",
    wordBreak: "keep-all",
    overflowWrap: "anywhere",
    overflowX: "auto",
    overflowY: "auto",
    boxSizing: "border-box"
  });

  /*
   * HTML 문자열, HTMLElement, jQuery 객체 지원
   */
  if (is_jquery_object || is_dom_object) {
    $content.append(html_content);
  } else {
    $content.html(html_content);
  }

  /*
   * HTML 안에 포함된 이미지와 미디어의 모바일 반응형 처리
   */
  $content.find("img, video, canvas, svg").css({
    display: "block",
    maxWidth: "100%",
    height: "auto",
    boxSizing: "border-box"
  });

  $content.find("iframe").css({
    display: "block",
    width: "100%",
    maxWidth: "100%",
    boxSizing: "border-box",
    border: 0
  });

  $content.find("pre").css({
    maxWidth: "100%",
    overflowX: "auto",
    whiteSpace: "pre-wrap",
    boxSizing: "border-box"
  });

  var $button_wrap = $("<div>").css({
    display: "flex",
    justifyContent: "flex-end",
    flexWrap: "wrap",
    gap: "0.5rem",
    marginTop: "1.2rem"
  });

  var button_css = {
    flex: "0 1 auto",
    minWidth: "5rem",
    padding: "0.65rem 1rem",
    border: 0,
    borderRadius: "0.5rem",
    fontFamily: "inherit",
    fontWeight: 700,
    cursor: "pointer"
  };

  var $cancel_button = $("<button>", {
    type: "button",
    text: "취소",
    "data-pos": "mrw_confirm_cancel"
  }).css(
    $.extend({}, button_css, {
      background: "#f1f3f5",
      color: "#222"
    })
  );

  var $confirm_button = $("<button>", {
    type: "button",
    text: "확인",
    "data-pos": "mrw_confirm_ok"
  }).css(
    $.extend({}, button_css, {
      background: "var(--mir-primary-color, #111)",
      color: "var(--mir-primary-text-color, #fff)"
    })
  );

  $message.append($icon, $content);

  $button_wrap.append($cancel_button, $confirm_button);

  $box.append($message, $button_wrap);

  $wrap.append($box);
  $mount.append($wrap);

  function stop_confirm_event(event) {
    if (typeof mir_eventStop === "function") {
      mir_eventStop(event);
      return;
    }

    event.preventDefault();
    event.stopPropagation();
  }

  function close_confirm(is_confirm) {
    if (closed) return;

    closed = true;

    $(document).off("keydown.mrw_confirm_alert");

    /*
     * 중복 클릭 방지
     */
    $confirm_button
      .add($cancel_button)
      .prop("disabled", true)
      .css("cursor", "default");

    /*
     * 기존 종료 모션 유지
     */
    $box.stop(true).animate(
      {
        marginTop: "-1rem",
        opacity: 0
      },
      120
    );

    $wrap.stop(true).animate(
      {
        opacity: 0
      },
      120,
      function () {
        $wrap.remove();

        if (
          before_focus &&
          typeof before_focus.focus === "function" &&
          document.documentElement.contains(before_focus)
        ) {
          before_focus.focus();
        }

        if (is_confirm && typeof confirm_callback === "function") {
          confirm_callback();
        }

        if (!is_confirm && typeof cancel_callback === "function") {
          cancel_callback();
        }
      }
    );
  }

  $confirm_button.one("click.mrw_confirm_alert", function (event) {
    stop_confirm_event(event);
    close_confirm(true);
  });

  $cancel_button.one("click.mrw_confirm_alert", function (event) {
    stop_confirm_event(event);
    close_confirm(false);
  });

  // ESC 입력은 취소 처리
  $(document).on("keydown.mrw_confirm_alert", function (event) {
    if (event.keyCode === 27) {
      event.preventDefault();
      close_confirm(false);
    }
  });

  /*
   * 기존 진입 모션 유지
   */
  $wrap.animate(
    {
      opacity: 1
    },
    150
  );

  $box.animate(
    {
      marginTop: 0,
      opacity: 1
    },
    180
  );

  setTimeout(function () {
    $confirm_button.focus();
  }, 0);
}
