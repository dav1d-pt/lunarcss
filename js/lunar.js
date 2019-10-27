let lunar = {};

lunar.initFormFields = function() {
    let $groups = $('.form-group');

    $groups.each(function() {
        let $this = $(this),
            $input = $this.find('.form-input');

        if ($input.length > 0) {
            let $inputContainer = $('<div class="form-input-container"></div>').appendTo($this);

            $input.appendTo($inputContainer);
            if ($input.is('[type="password"]')) {
                $inputContainer.append('<button type="button" class="show-password"><i class="fas fa-eye"></i></button>');
                $input.addClass('input-password');
            }
        }
    });

    $groups.find('.form-input').keyup(function() {
        let $this = $(this),
            $group = $this.closest('.form-group');

        if ($this.val().length > 0) {
            $group.addClass('filled');
        } else {
            $group.removeClass('filled');
        }
    });

    $groups.find('.show-password').click(function() {
        let $this = $(this),
            $input = $this.prev('.form-input'),
            type = $input.attr('type');

        $input.attr('type', ((type === 'text') ? 'password' : 'text'));
        $this.find('i').toggleClass('fa-eye fa-eye-slash');
    });
};

lunar.initRippleEffect = function() {
    let $elements = $('.ripple-effect'),
        ua = navigator.userAgent,
        eventName = (ua.match(/iPad/i)) ? 'touchstart' : 'mousedown';

    $elements.unbind().on(eventName, function(e) {
        let $this = $(this),
            $rippleContainer = $('<div class="ripple-container"></div>'),
            $ripple = $('<div class="ripple"></div>'),
            width = $this.outerWidth(),
            height = $this.outerHeight(),
            rippleMaxWidth = Math.max(width, height) * 2;

        $rippleContainer.css({
            'width': width,
            'height': height,
            'border-radius': $this.css('borderTopLeftRadius')
        });
        $ripple.css({
            'left': e.offsetX.toString() + 'px',
            'top': e.offsetY.toString() + 'px',
        });
        $rippleContainer.appendTo($this);
        $ripple.appendTo($rippleContainer);

        $ripple.stop().animate({
            'border-width': rippleMaxWidth,
            'opacity': 0
        }, Math.sqrt(rippleMaxWidth / 2) * 70, function () {
            $rippleContainer.remove();
        });
    })
};

lunar.initAlertsCloseButtons = function() {
    let $elements = $('.alert.alert-closable');

    $elements.each(function() {
        var $alert = $(this);

        $alert.append('<button class="alert-close"><i class="fas fa-times"></i></button>');

        $alert
            .find('.alert-close')
            .on('click', function () {
                $alert.fadeOut(200, function() {
                    remove();
                });
            });
    });
};

$(() => {
    lunar.initFormFields();
    lunar.initRippleEffect();
    lunar.initAlertsCloseButtons();
});