$('body')
    .on('mousemove', 'header', function (e) {
        if (scmt.is_mobile) {
            return;
        }
        var x = e.pageX;
        var tl = new TimelineMax();
        tl.to('#bump path', 2.8, {
            scaleY: 0.7,
            scaleX: 2,
            svgOrigin: '200 0',
            transformOrigin: '50% top',
            ease: Back.easeOut,
        });
        tl.to('#bump path', 2.8, {
            scaleX: 2,
            svgOrigin: '200 0',
            transformOrigin: '50% top',
        }, 0)
            .to('#bump', 0.8, {
                left: x,
                ease: Back.easeOut,
            }, 0);
    });
$('body')
    .on('mouseleave', 'header', function () {
        if (scmt.is_mobile) {
            return;
        }
        var x = ($('header > nav a.slctd').length) ? $('header > nav a.slctd').offset().left : $('#logo').offset().left;
        var hw = ($('header > nav a.slctd').length) ? $('header > nav a.slctd').outerWidth() * 0.5 : $('#logo').outerWidth() * 0.5;
        var tl = new TimelineMax();
        tl.to('#bump path', 1.8, {
            scaleY: 1,
            svgOrigin: '200 0',
            transformOrigin: '50% top',
            ease: Elastic.easeOut.config(0.9, 0.2),
        })
            .to('#bump path', 0.8, {
                scaleX: 1,
                transformOrigin: '50% top',
            }, 0)
            .to('#bump', 0.8, {
                left: x + hw,
                ease: Back.easeOut,
            }, 0)
        return !1
    });
