var showNotice,adminMenu,columns,validateForm,screenMeta,autofold_menu;(function(a){adminMenu={init:function(){},fold:function(){},restoreMenuState:function(){},toggle:function(){},favorites:function(){}};columns={init:function(){var b=this;a(".hide-column-tog","#adv-settings").click(function(){var d=a(this),c=d.val();if(d.prop("checked")){b.checked(c)}else{b.unchecked(c)}columns.saveManageColumnsState()})},saveManageColumnsState:function(){var b=this.hidden();a.post(ajaxurl,{action:"hidden-columns",hidden:b,screenoptionnonce:a("#screenoptionnonce").val(),page:pagenow})},checked:function(b){a(".column-"+b).show();this.colSpanChange(+1)},unchecked:function(b){a(".column-"+b).hide();this.colSpanChange(-1)},hidden:function(){return a(".manage-column").filter(":hidden").map(function(){return this.id}).get().join(",")},useCheckboxesForHidden:function(){this.hidden=function(){return a(".hide-column-tog").not(":checked").map(function(){var b=this.id;return b.substring(b,b.length-5)}).get().join(",")}},colSpanChange:function(b){var d=a("table").find(".colspanchange"),c;if(!d.length){return}c=parseInt(d.attr("colspan"),10)+b;d.attr("colspan",c.toString())}};a(document).ready(function(){columns.init()});validateForm=function(b){return !a(b).find(".form-required").filter(function(){return a("input:visible",this).val()==""}).addClass("form-invalid").find("input:visible").change(function(){a(this).closest(".form-invalid").removeClass("form-invalid")}).size()};showNotice={warn:function(){var b=commonL10n.warnDelete||"";if(confirm(b)){return true}return false},note:function(b){alert(b)}};screenMeta={element:null,toggles:null,page:null,padding:null,top:null,map:{"wp-admin-bar-screen-options":"screen-options-wrap","wp-admin-bar-help":"contextual-help-wrap"},init:function(){screenMeta.element=a("#screen-meta");screenMeta.toggles=a(".screen-meta-toggle");screenMeta.page=a("#wpcontent");screenMeta.toggles.click(screenMeta.toggleEvent)},toggleEvent:function(c){var b;c.preventDefault();if(!screenMeta.map[this.id]){return}b=a("#"+screenMeta.map[this.id]);if(b.is(":visible")){screenMeta.close(b,a(this))}else{screenMeta.open(b,a(this))}},open:function(b,c){screenMeta.toggles.filter(".selected").click();c.addClass("selected");screenMeta.padding=parseInt(screenMeta.page.css("paddingTop"),10);screenMeta.top=parseInt(screenMeta.element.css("top"),10);b.show();screenMeta.refresh()},refresh:function(b,c){screenMeta.element.css({top:0});screenMeta.page.css({paddingTop:screenMeta.padding+screenMeta.element.outerHeight()})},close:function(b,c){screenMeta.element.css({top:screenMeta.top});screenMeta.page.css({paddingTop:screenMeta.padding});b.hide();c.removeClass("selected")}};a(".contextual-help-tabs").delegate("a","click focus",function(g){var f=a(this),c,d,b;g.preventDefault();if(f.is(".active a")){return false}a(".contextual-help-tabs .active").removeClass("active");f.parent("li").addClass("active");c=a(f.attr("href"));a(".help-tab-content").not(c).removeClass("active").hide();c.addClass("active").show();d=a("#contextual-help-wrap").children();d.height("auto");b=Math.max.apply(null,a.map(d,function(e){return a(e).height()}));d.height(b);screenMeta.refresh()});a(document).ready(function(){var j=false,d,f,k,i,c=a("#adminmenu"),e=a("input.current-page"),g=e.val(),h,b=document.getElementById("ipad-viewportmeta");a("#collapse-menu",c).click(function(){var l=a(document.body);if(l.hasClass("folded")){l.removeClass("folded");deleteUserSetting("mfold")}else{l.addClass("folded");setUserSetting("mfold","f")}return false});a("li.wp-has-submenu",c).hoverIntent({over:function(r){var n,p,s,q,l=a(this).find(".wp-submenu");if(!a(document.body).hasClass("folded")&&a(this).hasClass("wp-menu-open")){return}n=a(this).offset().top+l.height()+1;p=a("#wpwrap").height();s=60+n-p;q=a(window).height()+a(window).scrollTop()-15;if(q<(n-s)){s=n-q}if(s>1){l.css({marginTop:"-"+s+"px"})}else{if(l.css("marginTop")){l.css({marginTop:""})}}l.addClass("sub-open")},out:function(){a(this).find(".wp-submenu").removeClass("sub-open")},timeout:200,sensitivity:7,interval:90});a("div.wrap h2:first").nextAll("div.updated, div.error").addClass("below-h2");a("div.updated, div.error").not(".below-h2, .inline").insertAfter(a("div.wrap h2:first"));screenMeta.init();a("tbody").children().children(".check-column").find(":checkbox").click(function(l){if("undefined"==l.shiftKey){return true}if(l.shiftKey){if(!j){return true}d=a(j).closest("form").find(":checkbox");f=d.index(j);k=d.index(this);i=a(this).prop("checked");if(0<f&&0<k&&f!=k){d.slice(f,k).prop("checked",function(){if(a(this).closest("tr").is(":visible")){return i}return false})}}j=this;return true});a("thead, tfoot").find(".check-column :checkbox").click(function(n){var o=a(this).prop("checked"),m="undefined"==typeof toggleWithKeyboard?false:toggleWithKeyboard,l=n.shiftKey||m;a(this).closest("table").children("tbody").filter(":visible").children().children(".check-column").find(":checkbox").prop("checked",function(){if(a(this).closest("tr").is(":hidden")){return false}if(l){return a(this).prop("checked")}else{if(o){return true}}return false});a(this).closest("table").children("thead,  tfoot").filter(":visible").children().children(".check-column").find(":checkbox").prop("checked",function(){if(l){return false}else{if(o){return true}}return false})});a("#default-password-nag-no").click(function(){setUserSetting("default_password_nag","hide");a("div.default-password-nag").hide();return false});a("#newcontent").bind("keydown.wpevent_InsertTab",function(q){if(q.keyCode!=9){return true}var n=q.target,s=n.selectionStart,m=n.selectionEnd,r=n.value,l,p;try{this.lastKey=9}catch(o){}if(document.selection){n.focus();p=document.selection.createRange();p.text="\t"}else{if(s>=0){l=this.scrollTop;n.value=r.substring(0,s).concat("\t",r.substring(m));n.selectionStart=n.selectionEnd=s+1;this.scrollTop=l}}if(q.stopPropagation){q.stopPropagation()}if(q.preventDefault){q.preventDefault()}});a("#newcontent").bind("blur.wpevent_InsertTab",function(l){if(this.lastKey&&9==this.lastKey){this.focus()}});if(e.length){e.closest("form").submit(function(l){if(a('select[name="action"]').val()==-1&&a('select[name="action2"]').val()==-1&&e.val()==g){e.val("1")}})}a(window).bind("resize.autofold",function(){if(getUserSetting("mfold")=="f"){return}var l=a(window).width();if(l<=800){if(!h){a(document.body).addClass("folded");h=true}}else{if(h){a(document.body).removeClass("folded");h=false}}}).triggerHandler("resize");if(b){document.body.addEventListener("gesturestart",function(){if(b.content.indexOf("maximum-scale=1")!=-1){b.content="width=750px, maximum-scale=5, initial-scale=1"}},false);document.body.addEventListener("gestureend",function(){setTimeout(function(){if(b.content.indexOf("maximum-scale=1")==-1){b.content="width=750px, maximum-scale=1, initial-scale=1"}},2000)},false)}});a(document).bind("wp_CloseOnEscape",function(c,b){if(typeof(b.cb)!="function"){return}if(typeof(b.condition)!="function"||b.condition()){b.cb()}return true})})(jQuery);