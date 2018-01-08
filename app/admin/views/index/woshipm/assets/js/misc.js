"use strict";
+function (a) {
  function t() {
    l.addClass("is-loadingApp")
  }

  function e() {
    l.removeClass("is-loadingApp")
  }

  function s(a) {
    var t = '<article class="stream-list-item"><div class="stream-list-image"><a href="' + a.permalink + '" target="_blank"><img src="' + a.image + '" width=202 height=145></a></div><div class="stream-list-content"><h2 class="stream-list-title"><a target="_blank" href="' + a.permalink + '">' + a.title + '</a></h2><div class="stream-list-snipper">' + a.snipper + '</div><footer class="stream-list-footer stream-list-footer--event"><div class="event-time"><span class="iconfont icon-time"></span>' + a.event_info.date + '</div><div class="event-location"><span class="iconfont icon-location"></span>' + a.event_info.location + "</div>" + a.event_info.button + "</footer></div></article>";
    return t
  }

  function i(a) {
    var t = a.author, e = '<span class="avatar-inline"><a target="_blank" href="' + t.link + '">' + t.avatar + '</a></span><span class="author"><a target="_blank" href="' + t.link + '">' + t.name + "</a></span>", s = '<article class="u-clearfix stream-list-item"><div class="stream-list-image"><a href="' + a.permalink + '" target="_blank"><img src="' + a.image + '" height="145" width="202"></a><div class="stream-list-category">' + a.category + '</div></div><div class="stream-list-content"><h2 class="stream-list-title"><a target="_blank" href="' + a.permalink + '">' + a.title + '</a></h2><div class="stream-list-meta">' + e + '<span class="dot"></span><time>' + a.date + '</time></div><div class="stream-list-snipper">' + a.snipper + '</div><footer class="stream-list-footer"><span class="post-views"><span class="iconfont icon-view"></span>阅读 ' + a.view + '</span><span class="post-marks"><span class="iconfont icon-heart"></span>收藏 ' + a.bookmark + '</span><span class="post-likes"><span class="iconfont icon-zan"></span>被赞 ' + a.like + "</span></footer></div></article>";
    return s
  }

  function n(t) {
    var e = 0;
    a.each(t, function (a, t) {
      var s = parseInt(t);
      e = s > e ? s : e
    }), e = e < 5 ? 5 : e, console.log(e);
    for (var s = 1; e / s >= 10;)s *= 10;
    for (var i = e, n = 6, o = 4, r = 0, l = 0, c = !0; c;) {
      for (var d = n; d >= o; d--) {
        var u = i / d;
        if (i % d == 0 && (u == 1 * s || u == .2 * s || u == .5 * s || u == 2 * s || u == 5 * s)) {
          c = !1, r = u, l = d;
          break
        }
      }
      i++
    }
    i--, l--;
    var p = r;
    return l = Math.ceil(e / p), console.log(p), l * p
  }

  function o(a) {
    for (var t = "", e = a / 5, s = 0; s < 6; s++) {
      var i = -8 + 44 * s, n = e * s;
      t += '<span class="bargraph-y-axis-item" style="bottom:' + i + 'px;">' + n + "</span>"
    }
    return t
  }

  function r(t) {
    var e = t, s = "", i = n(e);
    console.log(i);
    var r = o(i);
    a(".bargraph-y-axis").html(r), a.each(e, function (a, t) {
      var e = Math.floor(220 * t / i), n = 50 + 36 * a, o = 220 - e;
      s += '<div class="bargraph-bar" data-action="stat-posts" data-action-value="' + a + '" title="' + t + '" style="width: 31px; left: ' + n + "px; top: " + o + "px; height: " + e + 'px;"></div>'
    }), a(".bargraph-bars").html(s)
  }

  var l = a("body"), c = PURE.restapi + "v1/", d = !1;
  a(document).on("click", '[data-action="add-to-bookmarks"]', function (s) {
    s.preventDefault();
    var i = a(this), n = i.data("id"), o = i.find(".count"), r = parseInt(o.html());
    t(), a.ajax({
      url: c + "post/" + n + "/bookmarks",
      type: "PUT",
      headers: {"X-WP-Nonce": PURE.nonce},
      dataType: "json",
      success: function (a) {
        200 == a.status ? (o.html(r + 1), i.attr("data-action", "remove-from-bookmarks"), i.addClass("is-active"), createButterbar("收藏成功")) : createButterbar(a.data, !0), e()
      }
    })
  }), a(document).on("click", '[data-action="remove-from-bookmarks"]', function (s) {
    s.preventDefault();
    var i = a(this), n = i.data("id"), o = i.find(".count"), r = parseInt(o.html());
    t(), a.ajax({
      url: c + "post/" + n + "/bookmarks",
      type: "DELETE",
      headers: {"X-WP-Nonce": PURE.nonce},
      dataType: "json",
      success: function (a) {
        200 == a.status ? (o.html(r - 1), i.attr("data-action", "add-to-bookmarks"), createButterbar("取消收藏成功"), i.addClass("is-active")) : createButterbar(a.data, !0), e()
      }
    })
  }), a(document).on("click", '[data-action="uplike"]', function (t) {
    t.preventDefault();
    var e = a(this), s = e.data("id");
    return e.hasClass("is-active") ? createButterbar("您已经赞过了", !0) : (e.addClass("is-active"), void a.ajax({
      url: c + "post/" + s + "/like",
      type: "POST",
      headers: {"X-WP-Nonce": PURE.nonce},
      dataType: "json",
      success: function (a) {
        e.find(".count").html(a.likes)
      }
    }))
  }), PURE.is_user_logged_in && a.ajax({
    url: c + "activity-status",
    type: "GET",
    headers: {"X-WP-Nonce": PURE.nonce},
    dataType: "json",
    success: function (t) {
      var e = t.data, s = t.wen;
      if (e > 0 || s > 0) {
        var i = parseInt(e) + parseInt(s);
        a(".message--link").append('<span class="message-count">' + i + "</span>").addClass("has-message")
      }
      s > 0 && a(".wen-nav").addClass("has-unread"), e > 0 && a(".system-nav").addClass("has-unread")
    }
  }), PURE.is_singular && a(window).on("scroll", function () {
    if (a(".support-author").length) {
      var t = a(".support-author").offset().top, e = a(".sidebar"), s = e.offset().top;
      a(this).scrollTop() > s + e.height() && a(".site-footer").offset().top > a(this).scrollTop() + a(window).height() ? a(".fixed-sidebar-id").addClass("is-fixed") : a(".fixed-sidebar-id").removeClass("is-fixed"), a(this).scrollTop() + a(window).height() > t && 0 == d && (d = !0, a.ajax({
        url: c + "post/" + PURE.id + "/read",
        type: "POST",
        headers: {"X-WP-Nonce": PURE.nonce},
        dataType: "json",
        success: function (a) {
        }
      }))
    }
  }), a(".widget-author-list").length > 0 && a.ajax({
    url: c + "user-follow-suggestions",
    type: "GET",
    headers: {"X-WP-Nonce": PURE.nonce},
    dataType: "json",
    success: function (t) {
      if ("true" == t.success) {
        var e = "";
        a.each(t.payload, function (a, t) {
          e += '<li class="widget-author-list-item u-clearfix"><a href="' + t.link + '" target="_blank">' + t.avatar + '</a><div class="widget-author-list-content"><h4><a href="' + t.link + '" target="_blank">' + t.name + '<span class="iconfont icon-labelv"></span></a></h4><p>' + t.recommend_words + "</p></div></li>"
        }), a(".widget-author-list").html(e)
      }
    }
  }), a(".stream-list-topic").length > 0 && a.ajax({
    url: c + "topic-suggestions",
    type: "GET",
    headers: {"X-WP-Nonce": PURE.nonce},
    dataType: "json",
    success: function (t) {
      if (t) {
        var e = "";
        a.each(t, function (a, t) {
          e += '<a target="_blank" href="' + t.link + '"><div class="stream-img-pad" style="background-image: url(' + t.image + ');"><div class="mark">专题</div><div class="info"><div class="title">' + t.name + '</div><div class="desc">' + t.description + '</div><div class="stream-topic-meta">' + t.views + '人已学习<span class="middotDivider"></span>' + t.count + "篇文章</div></div></div></a>"
        }), a(".stream-list-topic").html(e)
      }
    }
  }), a(document).on("click", ".hot-nav span", function (s) {
    s.preventDefault();
    var i = a(this);
    return !i.hasClass("is-active") && (a(".hot-nav span").removeClass("is-active"), i.addClass("is-active"), t(), void a.ajax({
        url: c + "widget-posts",
        type: "GET",
        dataType: "json",
        data: {orderby: i.data("action")},
        success: function (t) {
          if ("true" == t.success) {
            var s = t.payload, i = "";
            a.each(s, function (a, t) {
              var e = a + 1;
              i += '<li class="hot-question-item"><span class="num">' + e + '</span><a class="link" href="' + t.permalink + '" target="_blank">' + t.title + "</a></li>"
            }), a(".widget-posts-list").html(i)
          } else createButterbar("网络错误", !0);
          e()
        }
      }))
  });
  var u = !0;
  a(window).on("scroll", function () {
    if (a(".loadmore-home").length) {
      var n = a(".loadmore-home"), o = n.offset().top, r = a(".loadmore");
      if (a(this).scrollTop() + a(window).height() > o && 1 == u && n.data("paged") < 4) {
        t(), r.html("加载中");
        var l = a(".loadmore").data("paged");
        r.addClass("is-active"), u = !1, a.ajax({
          url: c + "stream-list",
          type: "GET",
          dataType: "json",
          data: r.data(),
          success: function (t) {
            if ("true" == t.success && t.payload) {
              var n = "";
              a.each(t.payload, function (a, t) {
                n += t.is_event ? s(t) : i(t)
              }), a(".homeGroup").append(n), r.data("paged", l + 1), r.removeClass("is-active"), r.html("加载更多"), u = !0
            } else r.remove();
            e()
          }
        })
      }
    }
  }), a(document).on("click", ".loadmore", function (n) {
    n.preventDefault();
    var o = a(this), r = o.data("paged");
    return o.hasClass("is-active") ? createButterbar("您点的也太快了", !0) : (o.addClass("is-active"), t(), void a.ajax({
      url: c + "stream-list",
      type: "GET",
      dataType: "json",
      data: o.data(),
      success: function (t) {
        if ("true" == t.success && t.payload) {
          var n = "";
          a.each(t.payload, function (a, t) {
            n += t.is_event ? s(t) : i(t)
          }), a(".homeGroup").append(n), o.data("paged", r + 1), o.removeClass("is-active"), o.html("加载更多")
        } else o.remove();
        e()
      }
    }))
  });
  var p = 10;
  a(document).on("click", ".add_qidianla_class", function (t) {
    t.preventDefault();
    var e = "qidianla_classes";
    a(".qidianla-classes-ul").append('<li class="qidianla-classes-item"><label for="' + e + "[" + p + '][name]"><span>课程标题</span><input class="admin-textInput"  id="' + e + "[" + p + '][name]" name="' + e + "[" + p + '][name]" value="" type="text" /></label><label for="' + e + "[" + p + '][link]"><span>课程链接</span><input class="admin-textInput" name="' + e + "[" + p + '][link]" value="" type="text" /></label><label for="' + e + "[" + p + '][image]"><span>课程图片</span><input class="admin-textInput" name="' + e + "[" + p + '][image]" value="" type="text" /></label></li>'), p++
  }), a(document).on("click", '[data-action="qidianla_classes-delete"]', function (t) {
    t.preventDefault();
    var e = a(this);
    e.parent().parent().remove()
  }), a(document).on("submit", ".qidianla-classes-form", function (t) {
    t.preventDefault(), a.ajax({
      url: PURE.ajax_url,
      type: "POST",
      data: a(this).serialize() + "&action=qidianla_classes",
      success: function (a) {
        alert("保存成功")
      }
    })
  });
  var v = function (a) {
    return a = a ? new Date(a) : new Date, console.log(a), new Date(a.getFullYear(), a.getMonth(), a.getDate(), 0, 0, 0).getTime()
  };
  a(document).on("click", '[data-action="stat-posts"]', function (t) {
    var e = a(this), s = e.data("action-value"), i = v() / 1e3 - 24 * (20 - s) * 3600;
    t.preventDefault(), a.ajax({
      url: c + "stats/posts/date/" + i, type: "GET", success: function (t) {
        if ("true" == t.success) {
          var e = t.payload, s = "";
          a.each(e, function (a, t) {
            s += '<tr class="sortableTable-row js-statsTableRow"><td class="sortableTable-rowTitle"><h2 class="sortableTable-title">' + t.title + "</h2></td><td>" + t.view + "</td><td>" + t.read + "</td><td>" + Math.ceil(t.read / t.view * 100) + "</td><td>" + t.like + "</td><td>" + t.bookmark + "</td></tr>"
          }), a(".user-list-all").html(s), a("table").tablesort().data("tablesort")
        }
      }
    })
  }), a(".bargraph").length > 0 && a.ajax({
    url: c + "stats/view/" + (v() / 1e3 - 2332800) + "/" + v() / 1e3,
    type: "GET",
    dataType: "json",
    success: function (a) {
      "true" == a.success && r(a.payload)
    }
  }), a(".stats-post-list").length > 0 && a.ajax({
    url: c + "stats/posts/view/" + v() / 1e3,
    type: "GET",
    dataType: "json",
    success: function (t) {
      if ("true" == t.success) {
        var e = t.payload, s = "";
        a.each(e, function (a, t) {
          s += '<div><a href="' + t.link + '">' + t.title + " | " + t.value + "</a></div>"
        }), a(".stats-post-list").html(s)
      }
    }
  });
  var m = "";
  a(document).on("click", '[data-action="switch-graph"]', function (t) {
    t.preventDefault();
    var e = a(this);
    if (!e.hasClass("is-active")) {
      a('[data-action="switch-graph"]').removeClass("is-active"), e.addClass("is-active");
      var s = e.data("action-value");
      m && m.abort(), m = a.ajax({
        url: c + "stats/" + s + "/" + (v() / 1e3 - 2332800) + "/" + v() / 1e3,
        type: "GET",
        dataType: "json",
        success: function (a) {
          "true" == a.success && r(a.payload)
        }
      }), a.ajax({
        url: c + "stats/posts/" + s + "/" + v() / 1e3, type: "GET", dataType: "json", success: function (t) {
          if ("true" == t.success) {
            var e = t.payload, s = "";
            a.each(e, function (a, t) {
              s += '<div><a href="' + t.link + '">' + t.title + " | " + t.value + "</a></div>"
            }), a(".stats-post-list").html(s)
          }
        }
      })
    }
  })
}(jQuery), +function (a) {
  function t(a) {
    var t, e = new RegExp("(^| )" + a + "=([^;]*)(;|$)");
    return (t = document.cookie.match(e)) ? unescape(t[2]) : null
  }

  function e() {
    return !!(window.ActiveXObject || "ActiveXObject" in window)
  }

  function s(a) {
    return null != a.match(/\.(jpeg|jpg|gif|png)$/)
  }

  function i(a) {
    var t = a.url, e = a.image, s = '<div class="overlay overlay--dark">';
    s += '<div class="overlay-ad overlay-dialog--animate"><a class="close-btn-2" data-action="overlay-close" href="javascript:;"></a><a href="' + t + '" target="_blank"><img src="' + e + '"></</div>', s += "</div>", n.append(s)
  }

  var n = a("body");
  t("overlayShow") || e() || a.ajax({
    url: PURE.ajax_url,
    type: "POST",
    dataType: "json",
    data: {action: "isHasOverlay", isHome: PURE.is_home},
    success: function (a) {
      if (200 == a.status) {
        var t = a.d, e = '<div class="overlay overlay--dark">';
        e += '<div class="overlay-ad overlay-dialog--animate"><a class="close-btn-2" data-action="overlay-close" href="javascript:;"></a><a class="overlayAdlink" data-id="' + t.id + '" href="' + t.link + '" target="_blank"><img src="' + t.image + '"></</div>', e += "</div>", n.append(e)
      }
    }
  }), a(document).on("click", '[data-action="overlay-preview"]', function (t) {
    var e = a(".overlayImage--input").val();
    if (!s(e))return createButterbar("图片地址参数错误", !0), void a(".overlayImage--input").focus();
    var n = "", o = {url: n, image: e};
    i(o)
  }), a(".overlayImage--input").bind("input propertychange", function () {
    var t = a(this), e = t.val();
    s(e) && a(".js-image").attr("src", e)
  }), a(document).on("change", '[action="show-activeAd"]', function (t) {
    var e = a(this);
    e.is(":checked") ? a(".overlay-list-item:not(.is-active)").addClass("u-hide") : a(".overlay-list-item:not(.is-active)").removeClass("u-hide")
  }), a(document).on("click", ".overlayAdlink", function (t) {
    var e = a(this), s = e.data("id");
    a.ajax({
      url: PURE.ajax_url,
      type: "POST",
      dataType: "json",
      data: {action: "overlayClick", id: s},
      success: function (a) {
      }
    })
  }), a(document).on("change", ".showEverywhere--check", function (t) {
    var e = a(this);
    e.is(":checked") ? (a(".form-row-cities,.form-row-provices").addClass("u-hide"), a(".form-row-cities,.form-row-provices").find(".demo--radio").removeAttr("checked")) : a(".form-row-cities,.form-row-provices").removeClass("u-hide")
  }), a(document).on("click", '[data-action="save-collection"]', function (t) {
    t.preventDefault();
    var e = a(this);
    if (!e.hasClass("is-active")) {
      e.addClass("is-active");
      var s = a(".form").serialize() + "&action=add_overlay";
      a.ajax({
        url: PURE.ajax_url, type: "POST", data: s, success: function (a) {
          createButterbar("创建成功"), e.removeClass("is-active")
        }
      })
    }
  })
}(jQuery);