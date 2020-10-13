/*
*  Material Design UIKit
*  author: JEANVERA
*  Version: MDUIkit 1.5.1
*
* */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.MDUIkit = factory());
}(this, (function () {
    'use strict';

    var MDUIkit = MDUIkit || {};
    var rUIkit,MDCRipple;


    if(typeof require !== "undefined"){
        rUIkit = require('uikit');
        MDCRipple = require('@material/ripple');
    }else{
        rUIkit = UIkit;
        loadScript('assets/js/material-components-web.min.js', onLoadCode);
        
    }
    function onLoadCode() {
     MDCRipple = mdc.ripple.MDCRipple;
     [].map.call(document.querySelectorAll('.ripple-surface:not(.md-icon)'), function (el) {
      return new mdc.ripple.MDCRipple(el);
  });
     const mdIcons = document.querySelectorAll(".md-icon");
        //console.log(mdIcons);
        for (const button of mdIcons) {
            let rippleIcon = mdc.ripple.MDCRipple.attachTo(button);
            rippleIcon.unbounded = true;
        }
    };
    function loadScript(url, callback)
    {
    // Adding the script tag to the head as suggested before
    var head = document.head;
    var script = document.createElement('script');
    script.async = true;
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}
function lsTest() {
    var test = 'test';
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
}
function isTouchDevice() {
    return 'ontouchstart' in document.documentElement;
}
function nextElementSibling(element) {
    do {
        element = element.nextSibling;
    } while (element && element.nodeType !== 1);
    return element;
}
/* Calculate Scrollbar Width (http://chris-spittles.co.uk/jquery-calculate-scrollbar-width/) */
function scrollbarWidth() {
    var a = document.createElement('div');
    a.style.cssText = 'width: 100%; height:200px';
    var b = document.createElement('div');
    b.style.cssText = 'width:200px;height:150px; position: absolute; top: 0; left: 0; visibility: hidden; overflow:hidden;';
    b.appendChild(a);
    var c = a;
    a = b;
    document.body.appendChild(a);
    c = c.offsetWidth;
    b.style.overflow = "scroll";
    a = a.clientWidth;
    b.remove();
    return c - a;
};

var $html = document.querySelector('html');
var $topBar = document.querySelector('#top_bar');
    // 3.5 main sidebar (left)
    var MDUIkit_main_sidebar = {
        init: function () {
            var md_drawer = document.querySelector('#md-drawer');
            if (md_drawer) {
                if (document.documentElement.clientWidth >= 1220) {
                    document.body.classList.add('md-drawer_open');
                    md_drawer.classList.add('fullscreen');
                }
                window.addEventListener('resize', function (e) {
                    e.preventDefault();
                    if (document.documentElement.clientWidth >= 1220) {
                        rUIkit.offcanvas('#md-drawer').hide();
                        if (document.body.classList.contains("md-drawer_open")) {
                            md_drawer.classList.add('fullscreen');
                        }
                    } else {
                        if (md_drawer.classList.contains('fullscreen')) {
                            md_drawer.classList.remove('fullscreen');
                        }
                    }
                });
            }
            if (md_drawer) {
                var md_drawer_toggle = document.querySelector('#md-drawer-toggle');
                md_drawer_toggle.addEventListener("click", function (e) {
                    e.preventDefault();
                    if (document.documentElement.clientWidth >= 1220) {
                        if (md_drawer.classList.contains('fullscreen')) {
                            md_drawer.classList.remove('fullscreen');
                            document.body.classList.remove("md-drawer_open");
                        } else {
                            md_drawer.classList.add('fullscreen');
                            document.body.classList.add("md-drawer_open");
                        }
                    }
                    else {
                        rUIkit.offcanvas('#md-drawer').show();
                    }
                });
                // menu
                MDUIkit_main_sidebar.sidebar_menu();
            }
        },
        sidebar_menu: function () {
            // check for submenu
            var md_drawer = document.querySelector('#md-drawer');
            md_drawer.addEventListener("click", function (event) {
                var uk_active = md_drawer.querySelector('.uk-active');
                console.log("uk_active");
                console.log(uk_active);
                var target = event.target.closest('LI');
                var isMenu = true;
                if (target) {
                    if (target.classList.contains('uk-nav-header')) {
                        isMenu = false;
                    }
                    if (target.classList.contains('uk-nav-divider')) {
                        isMenu = false;
                    }
                    if (isMenu) {
                        if (!(target.classList.contains('uk-parent'))) {
                            if(uk_active != null){
                                if (uk_active.classList.contains('uk-active')) {
                                    uk_active.classList.remove('uk-active');
                                }
                                uk_active.classList.remove('uk-active');
                            }
                            target.classList.add('uk-active');
                            rUIkit.offcanvas('#md-drawer').hide();
                        }
                    }
                }
            }, true);

            var act_item = md_drawer.querySelectorAll('.uk-active');
            act_item
            .forEach(element => {
                let uk_parent = element.closest('.uk-parent')
                if (uk_parent) {
                    uk_parent.classList.add('uk-open');
                }
            });
        }
    };
    // top bar
    var MDUIkit_top_bar = {
        init: function () {
            if ($topBar && $topBar.length) {
                if ($topBar.classList.contains('top_bar_static')) {
                    document.body.classList.add('top_bar_static_active');
                } else {
                    document.body.classList.add('top_bar_active');
                }
            }
            var md_top_app_bar = document.querySelectorAll('header');
            if (md_top_app_bar.length) {
                var sheet = (function () {
                    // Create the <style> tag
                    var style = document.createElement("style");
                    // WebKit hack :(
                    style.appendChild(document.createTextNode(""));
                    // Add the <style> element to the page
                    document.head.appendChild(style);
                    return style.sheet;
                })();
                sheet.insertRule(".uk-notification-top-left,.uk-notification-top-center,.uk-notification-top-right {top: 55px;}", 0);
                sheet.insertRule(`@media (max-width: 639px) {
                    .uk-notification-bottom-left,
                    .uk-notification-bottom-center,
                    .uk-notification-bottom-right {
                        bottom: 64px;
                    }
                }`, 0);
            }
        }
    };
    // material design
    var MDUIkit_core = {
        init: function () {
            console.log("Init Material Components")
            MDUIkit_core.clean_uikit();
            MDUIkit_core.top_app_bar();
            MDUIkit_core.inputs();
            MDUIkit_core.bottom_navigation();
            MDUIkit_core.fab_speed_dial();
            MDUIkit_core.fab_toolbar();
            MDUIkit_core.fab_sheet();
            if(MDCRipple){ MDUIkit_core.material_ripple(); }
            
        },
        clean_uikit: function (parent) {
            document.addEventListener('click', function (e) {
                var uk_inputs = document.querySelectorAll('.uk-input');
                var uk_buttons = document.querySelectorAll('.uk-button');
                uk_inputs.forEach(element => {
                    element.classList.remove("uk-input");
                    element.classList.add("md-input");
                });
                uk_buttons.forEach(element => {
                    element.classList.remove("uk-button");
                    element.classList.add("md-btn", "md-btn-text");
                    if (element.classList.contains("uk-button-primary")) {
                        element.classList.remove("uk-button-primary");
                        element.classList.add("md-btn-primary");
                    }
                });
            });
        },
        top_app_bar: function (parent) {
            let main_top_app_bar = document.querySelector(".uk-navbar-container");
            let md_top_app_bar_container = document.querySelector(".md-top-app-bar-container");

        },
        bottom_navigation: function (parent) {
            var lists = document.querySelectorAll('.md-bottom-navigation__list');
            var activatedClass = 'md-bottom-navigation__list-item--activated';
            for (var i = 0, list; list = lists[i]; i++) {
                list.addEventListener('click', function (event) {
                    var el = event.target;
                    while (!el.classList.contains('md-bottom-navigation__list-item') && el) {
                        el = el.parentNode;
                    }
                    if (el) {
                        var NavList = el.parentNode.children;
                        for (let i = 0; i < NavList.length; i++) {
                            const element_inner = NavList[i];
                            if (element_inner.classList.contains(activatedClass)) {
                                element_inner.classList.remove(activatedClass);
                                break;
                            }
                        }
                        event.target.classList.add(activatedClass);
                    }
                });
            }
            var bottom_navigation_fixed = document.querySelectorAll('.md-bottom-navigation-fixed');
            if (bottom_navigation_fixed.length) {
                var sheet = (function () {
                    // Create the <style> tag
                    var style = document.createElement("style");
                    // WebKit hack :(
                    style.appendChild(document.createTextNode(""));
                    // Add the <style> element to the page
                    document.head.appendChild(style);
                    return style.sheet;
                })();
                sheet.insertRule("#admin-main {padding-bottom: 87px;}", 0);
                sheet.insertRule(".uk-notification-bottom-left,.uk-notification-bottom-center,.uk-notification-bottom-right {bottom: 64px;}", 0);
                sheet.insertRule(`@media (max-width: 639px) {
                    .uk-notification-bottom-left,
                    .uk-notification-bottom-center,
                    .uk-notification-bottom-right {
                      bottom: 64px;
                  }
              }`, 0);
            }
        },
        inputs: function (parent) {
            var $mdInput = (typeof parent === 'undefined') ? document.querySelectorAll('.md-input') : parent.find('.md-input');
            $mdInput.forEach(element => {
                
                if (element.value !== '') {
                    let md_input_wrapper = element.closest('.md-input-wrapper');
                    md_input_wrapper ? md_input_wrapper.classList.add('md-input-filled') : console.log("No md_input_wrapper");
                } 

                element.addEventListener("focus", function (event) {
                    (element.closest('.md-input-wrapper')) ? element.closest('.md-input-wrapper').classList.add('md-input-focus') : console.log();
                }, true);
                element.addEventListener("blur", function (event) {
                    (element.closest('.md-input-wrapper')) ? element.closest('.md-input-wrapper').classList.remove('md-input-focus') : console.log();
                    var ClosestWrapper = element.closest('.md-input-wrapper');
                    if (element.checkValidity()) {
                        if (ClosestWrapper.classList.contains("md-input-danger")) {
                            ClosestWrapper.classList.remove("md-input-danger");
                            ClosestWrapper.classList.remove("md-input-wrapper-with-trailing-icon");
                            ClosestWrapper.removeChild(ClosestWrapper.lastChild);
                        }
                    } else {
                        var ThisElementContainaSpan = false;
                        for (let i = 0; i < ClosestWrapper.children.length; i++) {
                            const element_inner = ClosestWrapper.children[i];
                            if (element_inner.localName === "span" && element_inner.className === "md-input-icon") {
                                ThisElementContainaSpan = true;
                            }
                        }
                        ClosestWrapper.classList.add("md-input-danger");
                        if (!ThisElementContainaSpan) {
                            ClosestWrapper.classList.add("md-input-wrapper-with-trailing-icon");
                            var a = document.createElement('span');
                            a.classList.add('md-input-icon');
                            var b = document.createElement('i');
                            b.classList.add('material-icons');
                            b.innerHTML = "error";
                            a.appendChild(b);
                            ClosestWrapper.appendChild(a);
                        }
                    }
                }, true);
                element.addEventListener("change", function (event) {
                    MDUIkit_core.update_input(element);
                }, true);
            });
        },
        update_input: function (object) {
            let md_input_wrapper = object.closest('.md-input-wrapper');
            (md_input_wrapper) ? md_input_wrapper.classList.remove('md-input-wrapper-danger', 'md-input-wrapper-success', 'md-input-wrapper-disabled') : console.log("No md_input_wrapper");
            if (object.classList.contains('md-input-danger')) {
                if (object.closest('.uk-input-group')) {
                    object.closest('.uk-input-group').classList.add('uk-input-group-danger')
                }
                (md_input_wrapper) ? md_input_wrapper.classList.add('md-input-wrapper-danger') : console.log("No md_input_wrapper");
            }
            if (object.classList.contains('md-input-success')) {
                if (object.closest('.uk-input-group')) {
                    object.closest('.uk-input-group').classList.add('uk-input-group-success')
                }
                (md_input_wrapper) ? md_input_wrapper.classList.add('md-input-wrapper-success') : console.log("No md_input_wrapper");
            }
            if (object.disabled) {
                (md_input_wrapper) ? md_input_wrapper.classList.add('md-input-wrapper-disabled') : console.log("No md_input_wrapper");
            }
            if (object.value !== '') {
                (md_input_wrapper) ? md_input_wrapper.classList.add('md-input-filled') : console.log("No md_input_wrapper");
            } else {
                (md_input_wrapper) ? md_input_wrapper.classList.remove('md-input-filled') : console.log("No md_input_wrapper");
            }
            if (object.classList.contains('label-fixed')) {
                (md_input_wrapper) ? md_input_wrapper.classList.add('md-input-filled') : console.log("No md_input_wrapper");
            }
        },
        fab_speed_dial: function () {
            function activateFAB(obj) {
                obj.closest('.md-fab-wrapper').classList.add('md-fab-active');
                var FABButton = obj.closest('.md-fab-wrapper').children[1];
                var FABButtonIcon = FABButton.children[0];
                FABButtonIcon.style.display = 'none';
                var nextElement = nextElementSibling(FABButtonIcon);
                nextElement.style.display = 'block';
            }
            function deactivateFAB(obj) {
                obj.closest('.md-fab-wrapper').classList.remove('md-fab-active');
                var FABButton = obj.closest('.md-fab-wrapper').children[1];
                var FABButtonIcon = FABButton.children[1];
                console.log('deactivate');
                FABButtonIcon.style.display = 'none';
                var previousSibling = FABButtonIcon.previousSibling;
                previousSibling.style.display = 'block';
            }
            var $fab_basic = document.querySelectorAll('.md-fab-wrapper');
            if ($fab_basic.length) {
                var sheet = (function () {
                    // Create the <style> tag
                    var style = document.createElement("style");
                    // WebKit hack :(
                    style.appendChild(document.createTextNode(""));
                    // Add the <style> element to the page
                    document.head.appendChild(style);
                    return style.sheet;
                })();
                sheet.insertRule(".uk-notification-bottom-right {bottom: 87px;}", 0);
                sheet.insertRule(`@media (max-width: 639px) {
                    .uk-notification-bottom-left,
                    .uk-notification-bottom-center,
                    .uk-notification-bottom-right {
                      bottom: 87px;
                  }
              }`, 0);
            }
            var $fab = document.querySelectorAll('.md-fab-speed-dial,.md-fab-speed-dial-horizontal');

            $fab.forEach(element => {
                var $thisBtn = element.children[1];
                var icon = document.createElement('i');
                icon.innerHTML = "close";
                icon.classList.add('material-icons', 'md-fab-action-close');
                icon.style.display = "none";
                element.children[1].appendChild(icon);
                if (element.getAttribute("data-fab-hover") != null) {
                    var deactiveateFabTimeout;
                    element.addEventListener("mouseenter", function (e) {
                        element.classList.add('md-fab-over');
                        clearTimeout(deactiveateFabTimeout);
                        setTimeout(function () {
                            activateFAB(e.target);
                        }, 100);
                    });
                    element.addEventListener("mouseleave", function (e) {
                        deactivateFAB(e.target);
                        deactiveateFabTimeout = setTimeout(function () {
                            element.classList.remove('md-fab-over');
                        }, 500);
                    });
                } else {
                    $thisBtn.addEventListener("click", function (e) {
                        if (!e.target.closest('.md-fab-wrapper').classList.contains('md-fab-active')) {
                            activateFAB(e.target);
                        } else {
                            deactivateFAB(e.target);
                        }
                    });

                    var mdFabSmallArray = $thisBtn.closest('.md-fab-wrapper').querySelectorAll('.md-fab-small');
                    mdFabSmallArray.forEach(elementFAB => {
                        elementFAB.addEventListener("click", function (e) {
                            deactivateFAB(e.target);
                        });
                    });
                }
            })
        },
        fab_toolbar: function () {
            var $fab_toolbar = document.querySelectorAll('.md-fab-toolbar');
            $fab_toolbar = $fab_toolbar[0]; // Only support one fab_toolbar per page
            if ($fab_toolbar) {
                var icon = $fab_toolbar.children[0];
                icon.addEventListener("click", function (e) {
                    e.preventDefault();
                    var toolbarItems = $fab_toolbar.children[1].children.length;
                    $fab_toolbar.classList.add('md-fab-animated');
                    var FAB_padding = !$fab_toolbar.classList.contains('md-fab-small') ? 16 : 24,
                    FAB_size = !$fab_toolbar.classList.contains('md-fab-small') ? 64 : 44;
                    setTimeout(function () {
                        $fab_toolbar.style.width = (toolbarItems * FAB_size + FAB_padding)
                    }, 140);
                    setTimeout(function () {
                        $fab_toolbar.classList.add('md-fab-active');
                    }, 420);
                });
                ['click', 'scroll'].forEach(evt =>
                    document.addEventListener(evt, function (e) {
                        if ($fab_toolbar.classList.contains('md-fab-active')) {
                            if (evt === "scroll" || (!e.target.closest('.md-fab-toolbar'))) {
                                $fab_toolbar.style.width = '';
                                $fab_toolbar.classList.remove('md-fab-active');

                                setTimeout(function () {
                                    $fab_toolbar.classList.remove('md-fab-animated');
                                }, 140);
                            }
                        }
                    })
                    );
            }
        },
        fab_sheet: function () {
            var $fab_sheet = document.querySelectorAll('.md-fab-sheet');
            $fab_sheet = $fab_sheet[0]; // Only support one fab_toolbar per page
            if ($fab_sheet) {
                var icon = $fab_sheet.children[0];
                icon.addEventListener("click", function (e) {
                    e.preventDefault();
                    var sheetItems = $fab_sheet.children[1].children.length;
                    $fab_sheet.classList.add('md-fab-animated');
                    setTimeout(function () {
                        $fab_sheet.style.width = ('240px');
                        $fab_sheet.style.height = (sheetItems * 40 + 8)
                    }, 140);
                    setTimeout(function () {
                        $fab_sheet.classList.add('md-fab-active');
                    }, 420);
                });
                ['click', 'scroll'].forEach(evt =>
                    document.addEventListener(evt, function (e) {
                        if ($fab_sheet.classList.contains('md-fab-active')) {
                            if (evt === "scroll" || (!e.target.closest('.md-fab-sheet'))) {
                                $fab_sheet.style.width = '';
                                $fab_sheet.style.height = '';
                                $fab_sheet.classList.remove('md-fab-active');

                                setTimeout(function () {
                                    $fab_sheet.classList.remove('md-fab-animated');
                                }, 140);

                            }
                        }
                    })
                    );
            }
        },
        material_ripple: function () {
            /*[].map.call(document.querySelectorAll('.md-btn'), function (el) {
              return new MDCRipple(el);
          });*/
          [].map.call(document.querySelectorAll('.ripple-surface:not(.md-icon)'), function (el) {
              return new MDCRipple.MDCRipple(el);
          });
          const mdIcons = document.querySelectorAll(".md-icon");
        //console.log(mdIcons);
        for (const button of mdIcons) {
            let rippleIcon = MDCRipple.MDCRipple.attachTo(button);
            rippleIcon.unbounded = true;
        }
    }
};
MDUIkit.init = function () {
        // main sidebar
        MDUIkit_main_sidebar.init();

        // top bar
        MDUIkit_top_bar.init();

        // material design
        console.log("Material Init");
        MDUIkit_core.init();
    };
    MDUIkit.drawer = function (id) {
        MDUIkit_main_sidebar.init(id);
    };
    MDUIkit.components = function () {
        MDUIkit_core.init();
    };
    MDUIkit.init();
    return MDUIkit;
})));
