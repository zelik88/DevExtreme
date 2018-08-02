var $ = require("jquery"),
    NavBar = require("ui/nav_bar");

QUnit.module("badge builtin");

var TABS_ITEM_BADGE_CLASS = "dx-tabs-item-badge",
    NAVBAR_ITEM_BADGE_CLASS = "dx-navbar-item-badge";

QUnit.test("badge should be rendered correctly with value = 22", function(assert) {
    var widget = new NavBar($("<div>"), {
            items: [{ badge: 22 }]
        }),
        $item = widget.itemElements().eq(0);

    var $badge = $item.children().eq(-1);
    assert.ok(!$badge.hasClass(TABS_ITEM_BADGE_CLASS) && $badge.hasClass(NAVBAR_ITEM_BADGE_CLASS), "badge created correctly");
    assert.equal($badge.text(), "22", "badge has correct text");
});

QUnit.test("badge should be rendered correctly after value changed", function(assert) {
    var widget = new NavBar($("<div>"), {
            items: [{ badge: 22 }]
        }),
        $item = widget.itemElements().eq(0);

    widget.option("items[0].badge", null);

    var $badge = $item.children("." + NAVBAR_ITEM_BADGE_CLASS);
    assert.ok(!$badge.length);
});
