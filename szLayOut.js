/*jslint browser: true, this, for */
/*global document, XMLHttpRequest, console, window, $, Hammer, szAppConfig */

var szLayOut_north = document.getElementById("szLayOut_north");
var szLayOut_west = document.getElementById("szLayOut_west");
var szLayOut_east = document.getElementById("szLayOut_east");
var szLayout_content = document.getElementById("szLayout_content");

var szLayOutstopAt = 0;

var setDisplay = function (w) {
    "use strict";
    szLayOut_west.style.width = szAppConfig.layout.szLayOut_SideNavWidth + "px";
    $("#szLayOut_west").removeClass("slideInLeft");
    $("#szLayOut_west").removeClass("slideOutLeft");
    if (w > szAppConfig.layout.szLayOut_middleScreen) {
        $("#szLayOut_west").addClass("slideInLeft");
        if (w > szAppConfig.layout.szLayOut_wideScreen) {
            szLayOut_west.style.width = szAppConfig.layout.szLayOut_SideNavWidth + "px";
            $(".sz-sideNav-icon").show();
            $("body").css("font-size", szAppConfig.layout.szLayOut_wideScreenFs);
        }
        if (w > szAppConfig.layout.szLayOut_middleScreen && w < szAppConfig.layout.szLayOut_wideScreen - 1) {
            szLayOut_west.style.width = szAppConfig.layout.szLayOut_SideNavWidth - 70 + "px";
            $(".sz-sideNav-icon").hide();
            $("body").css("font-size", szAppConfig.layout.szLayOut_middleScreenFs);
        }
        szLayout_content.style.marginLeft = szLayOut_west.style.width;
    } else {
        $("#szLayOut_west").addClass("slideOutLeft");
        szLayOut_west.style.width = szAppConfig.layout.szLayOut_SideNavWidth - 110 + "px";
        $(".sz-sideNav-icon").hide();

        szLayout_content.style.marginLeft = 0;
        $("body").css("font-size", szAppConfig.layout.szLayOut_smallScreenFs);
    }
    szLayOut_west.style.height = window.innerHeight - szLayOut_north.offsetHeight + "px";
    szLayOut_east.style.height = szLayOut_west.style.height;
    if (!$("table").hasClass("table-responsive")) {
        $("table").addClass("table-responsive");
    }
    var szLayOutTotalTopMenuLength = 0;
    $("#szLayOut_north ul li").each(function () {
        szLayOutTotalTopMenuLength = szLayOutTotalTopMenuLength + parseInt($(this).width());
    });
    var szLayout_topmenuListWidth = document.getElementById("szLayout_topmenuList").offsetWidth - 200;
    var szLayout_northWidth = document.getElementById("szLayOut_north").offsetWidth;
    document.getElementById("szLayout_navSelect").style.width = (document.getElementById("szLayOut_north").offsetWidth - 250) + "px";

    if (szLayOutTotalTopMenuLength + 100 < szLayout_topmenuListWidth && szLayOutstopAt === 0) {
        szLayOutstopAt = szLayOutTotalTopMenuLength;
    }

    if (szLayOutTotalTopMenuLength < szLayout_topmenuListWidth) {
        $("#szLayout_navSelect").hide();
        $("#szLayout_topmenuList").show();
    } else {
        if (szLayOutstopAt > 0 && szLayOutstopAt < szLayout_northWidth - 300) {
            $("#szLayout_navSelect").hide();
            $("#szLayout_topmenuList").show();
        } else {
            if (szLayOutstopAt === 0) {
                szLayOutstopAt = 600;
            }
            $("#szLayout_navSelect").show();
            $("#szLayout_topmenuList").hide();
        }
    }
};

var szLayout_setWestEastTopPositions = function () {
    "use strict";

    szLayOut_west.style.top = szAppConfig.layout.szLayOut_headerheight + "px";
    szLayOut_east.style.top = szLayOut_west.style.top;
    szLayout_content.style.marginTop = szLayOut_west.style.top;
    setDisplay(window.innerWidth);
};
szLayout_setWestEastTopPositions();
var szLayoutSideNavIsHidden = true;

function szLayout_shMenu_changeSlide(v) {
    "use strict";
    if (v === 1) {
        $("#szLayOut_west").removeClass("slideInLeft");
        $("#szLayOut_west").addClass("slideOutLeft");
    } else {
        $("#szLayOut_west").removeClass("slideOutLeft");
        $("#szLayOut_west").addClass("slideInLeft");
    }

    $("#szLayout_content").hide();
    $("#szLayout_content").fadeIn(1000);
}

function szLayout_shMenu(v) {
    "use strict";

    if (v === 1) {
        if (window.innerWidth > szAppConfig.layout.szLayOut_middleScreen) {
            if ($("#szLayOut_west").hasClass("slideInLeft")) {
                szLayout_shMenu_changeSlide(1);
                szLayout_content.style.marginLeft = 0;
            } else {
                szLayout_shMenu_changeSlide(2);
                if (window.innerWidth > szAppConfig.layout.szLayOut_middleScreen) {
                    $("#szLayout_content").hide();
                    szLayout_content.style.marginLeft = szLayOut_west.style.width;
                    $("#szLayout_content").fadeIn(1000);
                }
            }
        } else {
            szLayout_content.style.marginLeft = 0;
            $("#szLayOut_west").removeClass("slideInLeft");
            $("#szLayOut_west").removeClass("slideOutLeft");
            if (szLayoutSideNavIsHidden === true) {
                $("#szLayOut_west").addClass("slideInLeft");
                szLayoutSideNavIsHidden = false;
            } else {
                $("#szLayOut_west").addClass("slideOutLeft");
                szLayoutSideNavIsHidden = true;
            }
        }
    }

    if (v === 2) {
        if (szLayOut_east.style.display === "block") {
            $("#szLayOut_east").fadeOut("slow");
        } else {
            szLayOut_east.style.width = szLayOut_west.style.width;
            $("#szLayOut_east").fadeIn("slow");
        }
    }
}

var goTop = function () {
    "use strict";
    $("html, body").animate({ scrollTop: 0 }, "slow");
};

window.onresize = function () {
    "use strict";
    setDisplay(window.innerWidth);
};

function getScrollPercent() {
    "use strict";
    var h = document.documentElement;
    var b = document.body;
    var st = "scrollTop";
    var sh = "scrollHeight";
    return (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
}

window.onscroll = function () {
    "use strict";
    document.getElementById("szLayout_heightIndicator").style.width = getScrollPercent() + "%";
    var t = window.pageYOffset || document.documentElement.scrollTop;
    if (t < szAppConfig.layout.szLayOut_scrollUp) {
        $("#szLayout_goTop").hide();
    } else {
        $("#szLayout_goTop").show();
    }

    if (t > szAppConfig.layout.szLayOut_diveToHide) {
        $("#szLayOut_north").slideUp();

        szLayOut_west.style.top = 0;
    } else {
        szLayOut_west.style.top = szAppConfig.layout.szLayOut_headerheight + "px";
        $("#szLayOut_north").slideDown();
    }
};

var mc = new Hammer(document.body);
mc.on("panleft panright", function (ev) {
    "use strict";
    //console.log(szLayOut_west.classList);
    if (window.innerWidth < 1200) {
        //$("#szLayOut_west").removeClass("slideInLeft"); $("#szLayOut_west").removeClass("slideOutLeft");
        if (ev.type === "panright" && parseInt(ev.center.x) < 150 && (parseInt(window.innerHeight) - parseInt(ev.center.y)) > 40) {
            $("#szLayOut_west").removeClass("slideOutLeft");
            $("#szLayOut_west").addClass("slideInLeft");
        }
        if (ev.type === "panleft") {
            $("#szLayOut_west").removeClass("slideInLeft");
            $("#szLayOut_west").addClass("slideOutLeft");
        }
    }
});

var szLayout_cutString = function (val, string) {
    "use strict";
    if (string.length > val - 3) {
        string = string.substring(0, val - 3) + "...";
    }
    return string;
};
//this function should be trrigered every time when top menu changes
var szLayout_topMenuDrpdownItems = function () {
    "use strict";
    document.getElementById("szLayout_navSelect").innerHTML = "";
    $("<option />", {
        "selected": "selected",
        "value": "",
        "text": "..."
    }).appendTo("nav select");

    // Populate dropdown with menu items
    $("nav a").each(function () {
        var el = $(this);
        $("<option />", {
            "value": el.attr("href"),
            "text": szLayout_cutString(25, el.text()),
            "style": "font-size:1.2rem"
        }).appendTo("nav select");
    });
    $("nav select").change(function () {
        window.location = $(this).find("option:selected").val();
    });
};
szLayout_topMenuDrpdownItems();

$(".sz-sideNav-listGroup a").click(function () {
    "use strict";
    $(".sz-sideNav-listGroup a").removeClass("sz-sideNav-listGroup-selected");
    $(this).addClass("sz-sideNav-listGroup-selected");
});

$("#szLayout_topmenuList li").click(function () {
    "use strict";
    $("#szLayout_topmenuList li").removeClass("sz-sideNav-topListGroup-selected");
    $(this).addClass("sz-sideNav-topListGroup-selected");
});