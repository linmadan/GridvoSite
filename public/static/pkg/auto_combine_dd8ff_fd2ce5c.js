!function (n) {
    n.fn.multislider = function (i) {
        var e, t = 1, a = 1, r = 0, s = n(this), o = 0, d = {
            RTL: {"z-index": 1, width: 0, right: 0, left: "auto"},
            LTR: {"z-index": 1, width: 0, right: "auto", left: 0}
        }, c = {
            width: 1920,
            dots: !0,
            number: !1,
            color: "#e6e6e6",
            highlight: "#e63939",
            verticalDuring: 1e3,
            aDuring: 3500,
            aBack: !0,
            aDirection: "RTL"
        }, l = {
            init: function () {
                o = c.banners.length, l.renderMainLayout(), c.dots ? l.renderNaviLi() : "", l.excuteAfterLoaded()
            }, excuteAfterLoaded: function () {
                var i = '<div class="loading"><div class="spin"><div class="load"><span></span><span></span><span></span></div></div></div>', e = [];
                s.prepend(i).find("img").each(function () {
                    var i = n.Deferred();
                    n(this).bind("load", function () {
                        i.resolve()
                    }).bind("error", function () {
                        console.log(IOT.tr("图片路径出错！或者网络问题！"))
                    }), this.complete && setTimeout(function () {
                        i.resolve()
                    }, 1e3), e.push(i)
                }), n.when.apply(null, e).done(function () {
                    r = e.length, s.find(".loading").remove(), l.startAnimation(t), l.bindHoverImage(), c.dots ? l.bindDotsClick() : ""
                })
            }, renderMainLayout: function () {
                for (var n = [], i = 0, e = o; e > i; i++) {
                    var t = c.banners[i], a = "string" == typeof t.name ? t.name : t.name.step1;
                    n.push('<div class="outer"><div class="inner">' + (c.aBack && t.name.step2label ? '<img src="' + a + '" alt=""/>' : '<a href="' + t.link + '" target="' + (t.target || "") + '"><img src="' + a + '" alt=""/></a>') + "</div>" + (c.aBack && t.name.step2label ? '<a target="' + (t.target || "") + '" href="' + t.link + '" class="inner-slider"><div class="inner-slider-img"><img src="' + t.name.step2 + '" /></div>' + (t.name.step2label ? "<button>" + t.name.step2label + "</button>" : "") + "</a>" + (void 0 !== t.name.step3 && "" !== t.name.step3 && t.name.step2label ? '<div class="inner-line"><img src="' + t.name.step3 + '" alt=""/></div>' : "") : "") + "</div>")
                }
                s.append(n.join(""))
            }, renderNaviLi: function () {
                for (var n = [], i = 0, e = o; e > i; i++)n.push('<li data-no="' + (i + 1) + '">' + (c.number ? i + 1 : "") + "</li>");
                var t = '<ol class="banner-icon">' + n.join("") + "</ol>";
                s.append(t)
            }, setNaviLi: function (i) {
                n("li", n(".banner-icon", s)).css("background-color", c.color).eq(i).css("background-color", "").css("background-color", c.highlight)
            }, startAnimation: function (n) {
                t = n, c.dots ? l.setNaviLi(n - 1) : "", l.bgAnimate()
            }, initBanner: function () {
                var i = n(".outer", s).find(".inner"), e = n(".outer", s).find(".inner-line"), t = s.find(".outer");
                t.css(d[c.aDirection]).stop(!0, !0), i.css({width: c.width}), e.css({width: c.width})
            }, bindDotsClick: function () {
                n("li", n(".banner-icon", s)).click(function () {
                    clearTimeout(e);
                    var i = n(this), a = i.attr("data-no"), r = s.find(".outer");
                    l.initBanner(), l.setNaviLi(a - 1), r.eq(t - 2).css({
                        width: "100%",
                        "z-index": 2
                    }).stop(!0, !0), l.animation(a - 1), t = i.attr("data-no") > o - 1 ? 1 : parseInt(i.attr("data-no")) + 1, e = setTimeout(function () {
                        l.startAnimation(t)
                    }, c.aDuring)
                })
            }, bindHoverImage: function () {
                n(".outer").off("mouseover").on("mouseover", function () {
                    clearTimeout(e)
                }).off("mouseleave").on("mouseleave", function () {
                    e = setTimeout(function () {
                        l.startAnimation(t)
                    }, c.aDuring)
                })
            }, getImgOffset: function () {
                var i = s.parent().innerWidth(), e = n(".inner", s).find("img").innerWidth(), t = parseInt(e) - parseInt(i);
                return t > 0 ? t / 2 : 0
            }, bgAnimate: function () {
                var i = n(".outer", s).find(".inner"), d = n(".outer", s).find(".inner-line"), u = i.parent();
                l.initBanner();
                var f = l.getImgOffset();
                1 === r ? (i.css({right: -f}), u.eq(0).css({width: "100%"})) : ("RTL" === c.aDirection ? (i.css({right: -f}), d.css({right: -f})) : (i.css({left: -f}), d.css({left: -f})), 1 === t && 1 === a ? u.eq(0).css({width: "100%"}) : u.eq(t - 2).css({width: "100%"}), l.animation(t - 1), t = t + 1 > o ? 1 : t + 1, a++, e = setTimeout(function () {
                    l.startAnimation(t)
                }, c.aDuring))
            }, animation: function (n) {
                s.find(".outer").eq(n).css({"z-index": 3}).stop(!0, !0).animate({width: "100%"}, c.verticalDuring).find(".inner img").css({
                    width: 1.25 * c.width,
                    left: -150,
                    top: -20
                }).stop(!0, !0).animate({
                    width: c.width,
                    left: "+=150",
                    top: "+=20"
                }, c.verticalDuring, c.aBack ? l.animationCallBack : "")
            }, animationCallBack: function () {
                var i = n(".inner-slider", s), e = n(this).parents(".outer");
                i.removeClass("visible"), e.find(".inner-slider").addClass("visible"), e.find(".inner-line").addClass("animate-line"), setTimeout(function () {
                    e.find(".inner-line").removeClass("animate-line")
                }, c.aDuring)
            }
        };
        c = n.extend(c, i), l.init()
    }
}(jQuery);
;
!function () {
    function n() {
        var n, i = document.createElement("fakeelement"), e = {
            animation: "animationend",
            OAnimation: "oAnimationEnd",
            MozAnimation: "animationend",
            WebkitAnimation: "webkitAnimationEnd"
        };
        for (n in e)if (e.hasOwnProperty(n) && void 0 !== i.style[n])return e[n]
    }

    var i = {
        bindHoverForCloud: function () {
            var n = $(".cloud", $(".c-function")), i = n.find(".cloud-info-forIE");
            n.hover(function () {
                $("http://open.iot.10086.cn/static/pkg/img, .word", i).addClass("hover")
            }, function () {
                $("http://open.iot.10086.cn/static/pkg/img, .word", i).removeClass("hover")
            })
        }, bindUnHoverForApp: function () {
            var i = $(".app", $(".c-function")), e = $(".inner .flight-path", i), a = $(".bg-flight", i), t = $(".bg-app", i), s = $(".bg-word, .front, .inner-front", i);
            i.mouseleave(function () {
                e.removeClass("hover"), !a.hasClass("unhover") && a.hasClass("hover") && a.addClass("unhover"), setTimeout(function () {
                    t.addClass("hidden")
                }, 300), s.removeClass("hover")
            }).mouseenter(function () {
                e.addClass("hover"), a.hasClass("hover") || (a.addClass("hover"), setTimeout(function () {
                    a.css("opacity", 1)
                }, 500)), t.removeClass("hidden"), s.addClass("hover")
            });
            var o = n();
            o && a[0].addEventListener(o, function () {
                a.hasClass("hover") && a.hasClass("unhover") && setTimeout(function () {
                    a.animate({opacity: 0}, 300, function () {
                        a.removeClass("hover unhover")
                    })
                }, 300)
            })
        }, bindHoverForData: function () {
            var n = $(".data", $(".c-function")), i = $(".data-word", n);
            n.mouseenter(function () {
                i.addClass("hover")
            }).mouseleave(function () {
                i.removeClass("hover")
            })
        }, chipsHover: function () {
            $(".j_chips").find("li").hover(function () {
                $(this).find(".identifier").slideDown(400)
            }, function () {
                $(this).find(".identifier").slideUp(400)
            })
        }
    };
    $(".sliders").multislider("en_US" === IOT.i18n ? {
        dots: !0,
        aDuring: 3e3,
        aBack: !1,
        banners: [{
            name: "/static/files/i18n/en_US/index/en0112_1.jpg",
            link: IOT.i18nS + "/"
        }, {
            name: "../files/i18n/en_US/index/en0112_2.jpg"/*tpa=http://open.iot.10086.cn/static/files/i18n/en_US/index/en0112_2.jpg*/,
            link: IOT.i18nS + "/device/add"
        }, {
            name: "../files/i18n/en_US/index/en0108_3.jpg"/*tpa=http://open.iot.10086.cn/static/files/i18n/en_US/index/en0108_3.jpg*/,
            link: IOT.i18nS + "/discover"
        }, {
            name: "../files/i18n/en_US/index/en0107_4.jpg"/*tpa=http://open.iot.10086.cn/static/files/i18n/en_US/index/en0107_4.jpg*/,
            link: "javascript:;"
        }, {
            name: "../files/i18n/en_US/index/en0107_5.jpg"/*tpa=http://open.iot.10086.cn/static/files/i18n/en_US/index/en0107_5.jpg*/,
            link: "http://ioteams.com/",
            target: "_blank"
        }]
    } : "de_DE" === IOT.i18n ? {
        dots: !0,
        aDuring: 3e3,
        aBack: !1,
        banners: [{
            name: "/static/files/i18n/de_DE/index/de0217_1.jpg",
            link: IOT.i18nS + "/"
        }, {
            name: "../files/i18n/de_DE/index/de0222_2.jpg"/*tpa=http://open.iot.10086.cn/static/files/i18n/de_DE/index/de0222_2.jpg*/,
            link: IOT.i18nS + "/"
        }, {
            name: "../files/i18n/de_DE/index/de0222_4.jpg"/*tpa=http://open.iot.10086.cn/static/files/i18n/de_DE/index/de0222_4.jpg*/,
            link: IOT.i18nS + "/"
        }]
    } : "ja_JP" === IOT.i18n ? {
        dots: !0,
        aDuring: 3e3,
        aBack: !1,
        banners: [{
            name: "/static/files/i18n/ja_JP/index/banner01_Ja.jpg",
            link: IOT.i18nS + "/"
        }, {
            name: "../files/i18n/ja_JP/index/banner02_Ja.jpg"/*tpa=http://open.iot.10086.cn/static/files/i18n/ja_JP/index/banner02_Ja.jpg*/,
            link: IOT.i18nS + "/"
        }, {
            name: "../files/i18n/ja_JP/index/banner03_Ja.jpg"/*tpa=http://open.iot.10086.cn/static/files/i18n/ja_JP/index/banner03_Ja.jpg*/,
            link: IOT.i18nS + "/"
        }, {
            name: "../files/i18n/ja_JP/index/banner04_Ja.jpg"/*tpa=http://open.iot.10086.cn/static/files/i18n/ja_JP/index/banner04_Ja.jpg*/,
            link: IOT.i18nS + "/"
        }]
    } : "ko_KR" === IOT.i18n ? {
        dots: !0,
        aDuring: 3e3,
        aBack: !1,
        banners: [{
            name: "/static/files/i18n/ko_KR/index/banner0524_01_Ko.jpg",
            link: IOT.i18nS + "/"
        }, {
            name: "../files/i18n/ko_KR/index/banner02_ko.jpg"/*tpa=http://open.iot.10086.cn/static/files/i18n/ko_KR/index/banner02_ko.jpg*/,
            link: IOT.i18nS + "/"
        }, {
            name: "../files/i18n/ko_KR/index/banner03_ko.jpg"/*tpa=http://open.iot.10086.cn/static/files/i18n/ko_KR/index/banner03_ko.jpg*/,
            link: IOT.i18nS + "/"
        }, {
            name: "../files/i18n/ko_KR/index/banner04_ko.jpg"/*tpa=http://open.iot.10086.cn/static/files/i18n/ko_KR/index/banner04_ko.jpg*/,
            link: IOT.i18nS + "/"
        }]
    } : "ru_RU" === IOT.i18n ? {
        dots: !0,
        aDuring: 3e3,
        aBack: !1,
        banners: [{
            name: "/static/files/i18n/ru_RU/index/ru0217_1.jpg",
            link: IOT.i18nS + "/"
        }, {
            name: "../files/i18n/ru_RU/index/ru0222_2.jpg"/*tpa=http://open.iot.10086.cn/static/files/i18n/ru_RU/index/ru0222_2.jpg*/,
            link: IOT.i18nS + "/"
        }, {
            name: "../files/i18n/ru_RU/index/ru0222_4.jpg"/*tpa=http://open.iot.10086.cn/static/files/i18n/ru_RU/index/ru0222_4.jpg*/,
            link: IOT.i18nS + "/"
        }]
    } : {
        dots: !0,
        aDuring: 3e3,
        aBack: !1,
        banners: [{
            name: "/static/files/index/banner20160520_1.jpg",
            link: IOT.i18nS + "/trend/details?id=18",
            target: "_blank"
        }, {
            name: "/static/files/index/banner20160422_2.jpg",
            link: IOT.i18nS + "/"
        }, {
            name: "/static/files/index/banner20160422_3.jpg",
            link: IOT.i18nS + "/trend/appPK",
            target: "_blank"
        }, {
            name: "/static/files/index/banner20160422_4.jpg",
            link: "http://ioteams.com/",
            target: "_blank"
        }]
    }), i.bindHoverForCloud(), i.bindUnHoverForApp(), i.bindHoverForData(), i.chipsHover()
}();