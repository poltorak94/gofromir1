$(document).ready(function () {
    //блок портфолио 
    setTimeout(function () {
        $('.port-container').masonry({
            // options
            itemSelector: '.port-item',
            // columnWidth: 200
        });
    }, 5000)

    //слайдер главной страницы
    var mainSlider = new Swiper(".main-slider__swiper", {
        // autoHeight: true,
        pagination: {
            el: ".main-slider__pagination",
            clickable: true
        },
    });

    //слайдер товаров
    $('.products-preview-slider').each(function () {
        let sliderContainer = $(this).parent();
        let next = sliderContainer.find('.boxes__slider-next')[0];
        let prev = sliderContainer.find('.boxes__slider-prev')[0];
        var productSlider = new Swiper($(this)[0], {
            slidesPerView: 4,
            spaceBetween: 20,
            navigation: {
                nextEl: next,
                prevEl: prev,
            },
            breakpoints: {
                // when window width is >= 320px
                320: {
                    slidesPerView: 2,
                    spaceBetween: 10
                },
                // when window width is >= 769
                769: {
                    slidesPerView: 3,
                    spaceBetween: 20
                },
                // when window width is >= 1366
                1366: {
                    slidesPerView: 4,
                    spaceBetween: 20
                }
            }
        });
    })


    //слайдер команды 
    var teamSlider = new Swiper(".team__slider", {
        slidesPerView: 3,
        spaceBetween: 55,
        navigation: {
            nextEl: ".team__slider-next",
            prevEl: ".team__slider-prev",
        },
        breakpoints: {
            // when window width is >= 320px
            320: {
                slidesPerView: 1,
                spaceBetween: 10
            },
            // when window width is >= 769
            769: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            // when window width is >= 1366
            1366: {
                slidesPerView: 3,
                spaceBetween: 20
            }
        }
    });

    //стечик карточки товара + -
    if ($('.product-preview__custom-input__field').val() >= 1000) {
        $('.product-cart .add-file-button').removeClass('button--orange-disabled');
        $('.product-cart .add-file-button').addClass('button--orange-active');
        // $('.calculator__form-help-block').hide();
    }
    $('.product-preview__custom-input__field').each(function () {
        let defaultVal = parseInt($(this).attr('data-min-count'));
        $(this).val(defaultVal)
    })
    let changeInput = function (val) {
        if (val >= 1000) {
            $('.product-cart .add-file-button').removeClass('button--orange-disabled');
            $('.product-cart .add-file-button').addClass('button--orange-active');
            // $('.calculator__form-help-block').hide();
        } else {
            $('.product-cart .add-file-button').addClass('button--orange-disabled');
            $('.product-cart .add-file-button').removeClass('button--orange-active');
            // $('.calculator__form-help-block').show();
        }
    }
    $(document).on('click', '.input-minus:not([disabled])', function (e) {
        e.preventDefault();
        let $input = $(this).parent().find('.custom-input__field');
        let step = $input.attr('data-step');
        let count = parseInt($input.val()) - step;
        // count = count < 1 ? 1 : count;
        count = count < parseInt($input.data('min-count')) ? parseInt($input.data('min-count')) : count;
        $input.val(count);
        changeInput($input.val())
        $input.trigger('change');
    });
    $(document).on('click', '.input-plus:not([disabled])', function (e) {
        e.preventDefault();
        let $input = $(this).parent().find('.custom-input__field');
        let step = parseInt($input.attr('data-step'));
        let count = parseInt($input.val()) + step;
        count = count > parseInt($input.data('max-count')) ? parseInt($input.data('max-count')) : count;
        $input.val(parseInt(count));
        changeInput($input.val())
        $input.trigger('change');
    });
    $('.product-preview__custom-input__field').on('keyup', function () {
        let $input = $(this);
        let $val = $(this).val();
        let max = parseInt($(this).attr('data-max-count'));
        let min = parseInt($(this).attr('data-min-count'));
        changeInput($input.val())
        if ($val > max) {
            $input.val(max)
        }
        if ($val < min) {
            $input.val(min)
        }
    });
    $('.product-preview__custom-input__field').on('change', function () {
        let $input = $(this);
        let $val = $(this).val();
        let min = parseInt($(this).attr('data-min-count'));
        if ($val < min) {
            $input.val(min)
        }
    })

    //навигация изображений в карточках товара
    $('.images__nav-item').on('mouseover', function () {
        let container = $(this).closest('.images__nav');
        let navSrc = $(this).attr('data-image');
        let bigImage = $(this).closest('.product-thumbs').find('.image-holder__src');
        if (!$(this).hasClass('images__nav-item--active')) {
            container.find('.images__nav-item').removeClass('images__nav-item--active');
            $(this).addClass('images__nav-item--active');
            bigImage.attr('src', navSrc);
        }
    })
    $('.nav-thumb').on('mouseover', function () {
        let container = $(this).closest('.product-thumbs');
        let navSrc = $(this).attr('data-image');
        let bigImage = $(this).closest('.product-thumbs').find('.image-holder__src');
        bigImage.attr('src', navSrc);
        let activeTab = $(this);
        container.find('.nav-thumb').removeClass('nav-thumb--active');
        activeTab.addClass('nav-thumb--active');
        let activeTabAttr = container.find('.nav-thumb--active').attr('data-image');
        container.find('.images__nav-item').removeClass('images__nav-item--active');
        container.find('.images__nav-item').each(function () {
            if ($(this).attr('data-image') == activeTabAttr) {
                $(this).addClass('images__nav-item--active')
            }
        });
    })

    //поля ввода
    $('.custom-input__field').each(function () {
        if ($(this).val() !== '') {
            $(this).closest('.custom-input--custom-placeholder').addClass('custom-input--active');
        }
    });

    $('.custom-input__field').on('focus', function () {
        $(this).closest('.custom-input--custom-placeholder').addClass('custom-input--active');
    });

    $('.custom-input__field').on('focusout', function () {
        let $input = $(this);
        if ($input.val() == '') {
            $input.closest('.custom-input--custom-placeholder').removeClass('custom-input--active');
        }
    });

    $('.custom-input--custom-placeholder').on('click', function () {
        $(this).find('input').focus()
    });

    //табы на главной (дизайн коробок)
    $('.custom-design__tab').on('mouseover', function () {
        $(this).closest('.custom-design__tabs').find('.custom-design__tab').removeClass('custom-design__tab--active');
        $(this).toggleClass('custom-design__tab--active');
    });

    //развенуть текст
    $('.show-all--text').on('click', function (e) {
        e.preventDefault();
        let container = $(this).closest('.seo-text');
        if (container.hasClass('seo-text--active')) {
            container.removeClass('seo-text--active')
        } else {
            container.addClass('seo-text--active')
        }
    });
    //копирование емаила в буфер
    $('.header__email-copy').on('click', function (e) {
        e.preventDefault();
        let textarea = $('<textarea></textarea>');
        let email = $(this).closest('.header__email').find('.email-link').text();
        $('body').append(textarea);
        textarea.text(email);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
    });

    //подъем сайта вверх по кнопке
    let $win = $(window);
    let $winH = $win.height();
    let $up = $('.to-up');

    if ($win.scrollTop() > $winH) {
        $up.addClass('to-up--active');
    } else {
        $up.removeClass('to-up--active');
    }
    $win.on("scroll", function () {
        if ($(this).scrollTop() > $winH) {
            $up.addClass('to-up--active');
        } else {
            $up.removeClass('to-up--active');
        }
    });

    $up.on('click', function (e) {
        e.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, '400');
    });

    //кастомный скролбар
    $(".dropdown__categories-container, .calc-modal").overlayScrollbars({});

    //видеоплеер ютуб
    $('.production__video-play').on('click', function (e) {
        e.preventDefault();
        let container = $(this).closest('.production__vedio-holder');
        container.find('.prodaction__video-holder-image').hide()
        container.find('.production__video-iframe').show();
        $(this).hide();
        let video = container.find('.production__video-iframe');
        let videoURL = video.prop('src');
        videoURL += "&autoplay=1";
        video.prop('src', videoURL);

    })

    //частые вопросы 
    $('.faq__header').on('click', function () {
        let container = $(this).closest('.faq__item');
        container.find('.faq__answer').slideToggle();
        container.toggleClass('faq__item--opened')
    })

    $('.faq__group-item').on('click', function (e) {
        e.preventDefault();
        let parentId = $(this).closest('.faq__group').attr('data-id');
        let linkId = $(this).attr('data-id');
        let title = $(this).closest('.faq__group').find('.faq__group-title').text();
        $('.faq__title').text(title);

        $(this).addClass('faq__group-item--active');
        $(this).closest('.faq__group').addClass('faq__group--active')

        $(this).closest('.faq__nav').find('.faq__group').each(function () {
            let groupId = $(this).attr('data-id');
            if (groupId !== parentId) {
                $(this).find('.faq__group-item').removeClass('faq__group-item--active')
                $(this).removeClass('faq__group--active');
            } else {
                $('.faq__body-group').each(function () {
                    $(this).addClass('faq__body-group--hidden');
                    let bodyGroup = $(this);
                    let bodyId = $(this).attr('data-id');
                    if (bodyId == parentId) {
                        $(this).removeClass('faq__body-group--hidden');
                        $(this).find(".faq__body-group-item[data-id='" + linkId + "']").addClass('faq__body-group-item--active');
                        $('html, body').animate({
                            scrollTop: $(this).find(".faq__body-group-item[data-id='" + linkId + "']").offset().top - 100
                        }, 500);
                    } else {
                        bodyGroup.find('.faq__body-group-item').removeClass('faq__body-group-item--active')
                    }
                })
            }
        })

    })
    $('.faq__body-group-item').on('click', function (e) {
        e.preventDefault();
        let itemId = $(this).attr('data-id');
        let parentId = $(this).closest('.faq__body-group').attr('data-id');
        let item = $(this);
        let navGroup = $('.faq__group[data-id="' + parentId + '"]');
        if (item.hasClass('faq__body-group-item--active')) {
            item.removeClass('faq__body-group-item--active');
            navGroup.find('.faq__group-item[data-id="' + itemId + '"]').removeClass('faq__group-item--active');
        } else {
            item.addClass('faq__body-group-item--active');
            navGroup.addClass('faq__group--active');
            navGroup.find('.faq__group-item[data-id="' + itemId + '"]').addClass('faq__group-item--active');
        }
    })

    //фильтр каталога и новостей
    $('.catalog-filter__group-title').on('click', function (e) {
        e.preventDefault();
        $(this).closest('.catalog-filter__group').toggleClass('catalog-filter__group--opened');
    })
    $('.blog__tag').on('click', function (e) {
        e.preventDefault();
        if ($(this).hasClass('blog__tag--active')) {
            $(this).removeClass('blog__tag--active');
        } else {
            $(this).addClass('blog__tag--active');
        }
    })
    $('.catalog-items__tag-more').on('click', function (e) {
        e.preventDefault();
        $(this).closest('.catalog-items__tags').find('.catalog-items__tags-hidden').addClass('catalog-items__tags--visible');
        $(this).closest('.blog__tags').find('.blog__tags-hidden').addClass('blog__tags-hidden--visible')
        $(this).addClass('catalog-items__tag-more--hidden');
        $(this).closest('.catalog-items__tags').find('.catalog-items__tag-hide').addClass('catalog-items__tag-hide--visible')
        $(this).closest('.blog__tags').find('.catalog-items__tag-hide').addClass('catalog-items__tag-hide--visible')
    })
    $('.catalog-items__tag-hide').on('click', function (e) {
        e.preventDefault();
        $(this).removeClass('catalog-items__tag-hide--visible');
        $(this).closest('.catalog-items__tags').find('.catalog-items__tag-more').removeClass('catalog-items__tag-more--hidden');
        $(this).closest('.blog__tags').find('.catalog-items__tag-more').removeClass('catalog-items__tag-more--hidden')
        $(this).closest('.catalog-items__tags').find('.catalog-items__tags-hidden').removeClass('catalog-items__tags--visible');
        $(this).closest('.blog__tags').find('.blog__tags-hidden').removeClass('blog__tags-hidden--visible')
    })

    //select
    $('.select').each(function () {
        let select = $(this);
        if (select.hasClass('select--images')) {
            select.find('.select__field').select2({
                minimumResultsForSearch: -1,
                templateResult: formatState,
                templateSelection: formatState
            });
        } else {
            select.find('.select__field').select2({
                minimumResultsForSearch: -1,
            });
        }
    });
    function formatState(state) {
        if (!state.id) {
            return state.text;
        }
        var $state = $(
            '<span class="select__option">' + state.text + ' <img src="' + state.element.dataset.image + '" class="select__option-icon" /> </span>'
        );
        return $state;
    };

    //прием макулатуры карта
    let lat = $('.map__waste').attr('data-lat');
    let long = $('.map__waste').attr('data-long');
    if ($('*').is('#map')) {
        setTimeout(function () {
            ymaps.ready(function () {
                var myMap = new ymaps.Map('map', {
                    center: [lat, long - 0.5],
                    zoom: 9
                }, {
                    searchControlProvider: 'yandex#search'
                }),
                    myPlacemark = new ymaps.Placemark([lat, long], {
                    }, {
                        iconLayout: 'default#image',
                        iconImageHref: './assets/images/map-loc.png',
                        iconImageSize: [66, 66],
                        iconImageOffset: [-15, 25]
                    })
                myMap.geoObjects
                    .add(myPlacemark)
            });
        }, 1000);
    }

    //скрывать-показывать хедер при скролле
    let topMenu = $('.header__top'),
        scrollPrev = 0;

    $(window).scroll(function () {
        if ($(window).width() > 1365) {
            var scrolled = $(window).scrollTop();

            if (scrolled > 200 && scrolled > scrollPrev) {
                topMenu.addClass('header--hidden');
            } else {
                topMenu.removeClass('header--hidden');
            }
            scrollPrev = scrolled;
        }
    });

    //энциклопедя фикc меню
    // let stickyOffset = $('.handbook-nav--fix').offset().top;

    // $(window).scroll(function () {
    //     let sticky = $('.handbook-nav--fix'),
    //         scroll = $(window).scrollTop();

    //     if (scroll >= stickyOffset) sticky.addClass('fixed');
    //     else sticky.removeClass('fixed');
    // });

    //отображения элементов каталога плитка-список
    $('.catalog-view__item').on('click', function (e) {
        e.preventDefault();
        let container = $(this).closest('.catalog-view');
        let linkId = $(this).attr('data-id');
        let catalog = $(this).closest('.catalog-container');
        container.find('.catalog-view__item').removeClass('catalog-view__item--active');
        $(this).addClass('catalog-view__item--active');
        if (linkId == 'list') {
            catalog.addClass('catalog-container--list');
        } else {
            catalog.removeClass('catalog-container--list')
        }
    })

    //карточка товара галерея 
    $('.product-cart__gallery-nav-item').on('click', function (e) {
        e.preventDefault();
        let container = $(this).closest('.product-cart__gallery-nav');
        let mainContainer = $(this).closest('.product-cart__gallery');
        let navSrc = $(this).attr('data-src');
        let galleryHolder = mainContainer.find('.product-cart__gallery-main-photo');

        container.find('.product-cart__gallery-nav-item').removeClass('product-cart__gallery-nav-item--active');

        $(this).addClass('product-cart__gallery-nav-item--active');

        if ($(this).hasClass('product-cart__gallery-nav-item--video')) {
            mainContainer.find('.product-cart__gallery-main-photo').hide();
            mainContainer.find('.product-cart__video').show();
            mainContainer.find('.product-cart__video').attr('src', navSrc);
        }
        else {
            galleryHolder.attr('src', navSrc);
            mainContainer.find('.product-cart__video').hide();
            mainContainer.find('.product-cart__video').attr('src', '');
            mainContainer.find('.product-cart__gallery-main-photo').show();
        };
    })

    //выбор цены карточка товара
    $('.product-cart__price-item').on('click', function (e) {
        e.preventDefault();
        let container = $(this).closest('.product-cart__price-list');
        container.find('.product-cart__price-item').removeClass('product-cart__price-item--active');
        $(this).addClass('product-cart__price-item--active');
    })

    //карточка товара, табы доставок
    $('.product-cart__tabs-header-item').on('click', function (e) {
        e.preventDefault();
        let container = $(this).closest('.product-cart__tabs-header');
        let mainContainer = $(this).closest('.product-cart__tabs-container')
        container.find('.product-cart__tabs-header-item').removeClass('product-cart__tabs-header-item--active');
        $(this).addClass('product-cart__tabs-header-item--active');
        let navId = $(this).attr('data-id');
        mainContainer.find('.product-cart__tab').each(function () {
            let tabId = $(this).attr('data-id');
            $(this).addClass('product-cart__tab--hidden');
            if (tabId == navId) {
                $(this).removeClass('product-cart__tab--hidden');
            }
        })
    });

    //faq в табах карточки товара
    $('.product-cart__tab-faq-item-title').on('click', function () {
        $(this).toggleClass('product-cart__tab-faq-item-title--active');
        $(this).closest('.product-cart__tab-faq-item').find('.product-cart__tab-faq-answer').slideToggle();
    })

    //табы доставка и самовывоз
    $('.catalog-header-nav--delivery .catalog-header-nav__item').on('click', function (e) {
        e.preventDefault();
        let container = $(this).closest('.catalog-header-nav');
        container.find('.catalog-header-nav__item').removeClass('catalog-header-nav__item--active');
        $(this).addClass('catalog-header-nav__item--active');
        let mainContainer = $(this).closest('.delivery-pickup');
        let navId = $(this).attr('data-id');
        mainContainer.find('.delivery-pickup__tab').each(function () {
            $(this).addClass('delivery-pickup__tab--hidden');
            let tabId = $(this).attr('data-id');
            if (tabId == navId) {
                $(this).removeClass('delivery-pickup__tab--hidden')
            }
        })
    })

    //карты доставка и самовывоз
    let lat2 = $('#map-pickup').attr('data-lat');
    let long2 = $('#map-pickup').attr('data-long');
    if ($('*').is('#map-pickup')) {
        setTimeout(function () {
            ymaps.ready(function () {
                var mapPickup = new ymaps.Map('map-pickup', {
                    center: [lat2, long2],
                    zoom: 13
                }, {
                    searchControlProvider: 'yandex#search'
                }),
                    myPlacemark = new ymaps.Placemark([lat2, long2], {
                    }, {
                        iconLayout: 'default#image',
                        iconImageHref: './assets/images/map-loc.png',
                        iconImageSize: [66, 66],
                        iconImageOffset: [-15, 25]
                    })
                mapPickup.geoObjects
                    .add(myPlacemark)
            });
        }, 1000);
    }

    let lat3 = $('#map-pickup-2').attr('data-lat');
    let long3 = $('#map-pickup-2').attr('data-long');
    if ($('*').is('#map-pickup-2')) {
        setTimeout(function () {
            ymaps.ready(function () {
                var mapPickup = new ymaps.Map('map-pickup-2', {
                    center: [lat3, long3],
                    zoom: 13
                }, {
                    searchControlProvider: 'yandex#search'
                }),
                    myPlacemark = new ymaps.Placemark([lat3, long3], {
                    }, {
                        iconLayout: 'default#image',
                        iconImageHref: './assets/images/map-loc.png',
                        iconImageSize: [66, 66],
                        iconImageOffset: [-15, 25]
                    })
                mapPickup.geoObjects
                    .add(myPlacemark)
            });
        }, 1000);
    }

    //range slider фильтр каталога
    $('.custom-input--range').each(function () {
        let input = $(this).find('.custom-input__field');
        let minVal = parseFloat(input.attr('data-min'));
        let maxVal = parseFloat(input.attr('data-max'));
        let startVal = input.attr('data-value');
        let rangeSlider = $(this).find('.js-range-slider');
        rangeSlider.ionRangeSlider({
            min: minVal,
            max: maxVal,
            from: startVal,
            onChange: function (data) {
                input.val(data.from)
                input.trigger('keyup');
            },
        });
        input.on('change', function () {
            let $input = $(this);
            if ($input.val() < minVal) {
                $input.val(minVal)
            } else if ($input.val() > maxVal) {
                $input.val(maxVal)
            }
            rangeSlider.data("ionRangeSlider").update({
                from: $input.val(),
            });
        })

    })

    //калькулятор
    $('.custom-radio__print').on('change', function () {
        let radioId = $(this).attr('data-id');
        let container = $(this).closest('.calculator__form');
        container.find('.custom-radio__print-type').each(function () {
            let printType = $(this);
            if (radioId == 1) {
                printType.attr('disabled', false);
                printType.closest('.custom-radio').removeClass('custom-radio--disabled');
                // if ($('.product-cart .product-preview__custom-input input').val() >= 1000) {
                //     $('.add-file-button').removeClass('button--orange-disabled');
                //     $('.add-file-button').addClass('button--orange-active');
                // }

            } else {
                printType.attr('disabled', true);
                printType.prop('checked', false);
                printType.closest('.custom-radio').addClass('custom-radio--disabled');
                $('.add-file-button').addClass('button--orange-disabled');
                $('.add-file-button').removeClass('button--orange-active');
            }
        })
    });
    $('.calculator__form-group').on('click', '.button--orange-disabled', function (e) {
        e.preventDefault();
    })

    $('.calculator__design-item').on('click', function (e) {
        e.preventDefault();
        if ($(this).hasClass('calculator__design-item--modal')) {
            $('.calc-modal').trigger('open.modal')
        }
    });
    $('.calculator__form-link').on('click', function (e) {
        e.preventDefault();
        $('.calc-modal').trigger('open.modal')
    })
    $('.calculator-config__header').on('click', function (e) {
        e.preventDefault();
        let container = $(this).closest('.calculator-config__group');
        if (container.hasClass('calculator-config__group--active')) {
            container.removeClass('calculator-config__group--active');
        } else {
            container.addClass('calculator-config__group--active');
        }
    })
    $('.calculator-config-product').on('click', function (e) {
        e.preventDefault();
        $('.calc-modal').trigger('close.modal')
    })
    $('.calculator-add-file').on('click', function (e) {
        e.preventDefault();
        $(this).closest('.calculator__form-group').find('.calculator-input-file').click();
    })
    $('.calculator-input-file').on('change', function () {
        let container = $(this).closest('.calculator__form');
        container.addClass('calculator--added-file');
        var inputValue = $(this).val();
        var inputValueStr = inputValue.lastIndexOf('\\');
        var fileName = inputValue.substring(inputValueStr + 1);

        let fileSize = parseFloat(this.files[0].size);
        function formatBytes(bytes, decimals = 2) {
            if (bytes === 0) {
                return '0';
            } else {
                var k = 1024;
                var dm = decimals < 0 ? 0 : decimals;
                var sizes = ['байт', 'КБ', 'МБ', 'ГБ', 'ТБ'];
                var i = Math.floor(Math.log(bytes) / Math.log(k));
                return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
            }
        }
        container.find('.added-file-name').text(fileName)
        container.find('.added-file-size').text(formatBytes(fileSize))
    });
    $('.added-file-remove').on('click', function (e) {
        e.preventDefault();
        let container = $(this).closest('.calculator__form');
        container.removeClass('calculator--added-file');
        container.find('.calculator-input-file').val('');
    })
    //открытие модального окна
    $('.modal').on('open.modal', function () {
        let modal = $(this)
        modal.removeClass('modal--hidden');
        modal.arcticmodal({
            afterClose: function () {
                modal.addClass('modal--hidden');
            }
        });
    });

    //закрытие модального окна
    $('.modal').on('close.modal', function () {
        let modal = $(this);
        modal.arcticmodal('close');
    });

    $('body').on('close.modal', function () {
        $.arcticmodal('close');
    });

    //корзина 
    $(document).on('keyup', '.cart-form-aside__custom-input input', function () {
        let container = $(this).closest('.cart-form-aside__custom-input');
        container.addClass('custom-input--change');
        if ($(this).val() == '') {
            container.removeClass('custom-input--change');
        }
    });
    $('.remove-promo').on('click', function (e) {
        e.preventDefault();
        let container = $(this).closest('.cart-form-aside__custom-input');
        container.removeClass('cart-form-aside__custom-input--active');
        container.find('input').val('');
        container.find('input').attr('placeholder', 'Введите промокод');
        $(this).remove();
    })
    $('.custom-checkbox__skid input').on('change', function () {
        let $input = $(this);
        let container = $(this).closest('.order__form-groups');
        let firstInput = container.find('input[data-id=1]');
        let secondInput = container.find('input[data-id=2]');
        let floorCkeckbox = container.find('.order__form-group--floor');
        if (firstInput.prop('checked') == true) {
            floorCkeckbox.removeClass('order__form-group--floor--disabled');
            floorCkeckbox.find('input').attr('disabled', false);
        } else {
            floorCkeckbox.addClass('order__form-group--floor--disabled');
            floorCkeckbox.find('input').attr('disabled', true);
            floorCkeckbox.find('input').prop('checked', false);
        }
        if (secondInput.prop('checked') == true) {
            floorCkeckbox.addClass('order__form-group--active');
        } else {
            floorCkeckbox.removeClass('order__form-group--active');
        }
    })
    $('.payment-method').on('click', function () {
        let container = $(this).closest('.order__form-groups--payment');
        let paymentId = $(this).attr('data-id');
        container.find('.payment-method').removeClass('payment-method--active');
        $(this).addClass('payment-method--active');
        $('.order__payment-input').val(paymentId)
    })

    $('.custom-radio__order-type').on('change', function () {
        let radioId = $(this).attr('data-id');
        let container = $(this).closest('.order-form');
        container.find('.order__tab').each(function () {
            $(this).addClass('order__tab--hidden');
            let tabId = $(this).attr('data-id');
            if (tabId == radioId) {
                $(this).removeClass('order__tab--hidden')
            }
        });
        if (radioId == 2) {
            $('.order__form-group__cashless').removeClass('order__form-group--hidden');
        } else {
            $('.order__form-group__cashless').addClass('order__form-group--hidden');
        }
    })
    $('.custom-radio__delivery').on('change', function () {
        let radioId = $(this).attr('data-id');
        let container = $(this).closest('.order__group');
        container.find('.delivery-tab').each(function () {
            $(this).addClass('delivery-tab--hidden');
            let tabId = $(this).attr('data-id');
            if (tabId == radioId) {
                $(this).removeClass('delivery-tab--hidden')
            }
        })
    })
    $('.custom-radio__address').on('change', function () {
        let radioId = $(this).attr('data-id');
        let container = $(this).closest('.delivery-tab');
        container.find('.delivery-tab__address').each(function () {
            $(this).addClass('delivery-tab__address--hidden');
            let tabId = $(this).attr('data-id');
            console.log(tabId)
            if (tabId == radioId) {
                $(this).removeClass('delivery-tab__address--hidden')
            }
        })
    })

    //cookie
    $('.cookie-note__button').on('click', function (e) {
        e.preventDefault();
        $(this).closest('.cookie-container').remove()
    })
    //маска телефона
    $('.tel-mask').mask('+7 (999) 999-99-99');

    //модальные окна
    //обратный звонок
    $('.header__callback, .cooperation__button').on('click', function (e) {
        e.preventDefault();
        $('.modal-callback').trigger('open.modal')
    })

    //получить консультацию
    $('.main-slider__consultation-button, .sms-calc__consultation-button, .calculator__design-item-consultation').on('click', function (e) {
        e.preventDefault();
        $('.modal-consultation').trigger('open.modal')
    })
    //звонок с макетом 
    $('.help-button').on('click', function (e) {
        e.preventDefault();
        $('.modal-call-manager').trigger('open.modal')
    })
    //прайс лист
    $('.price-list__button').on('click', function (e) {
        e.preventDefault();
        $('.modal-universal').trigger('open.modal')
    })
    //расчет по смс
    // $('.main-slider__sms-button, .sms-calc__main-button').on('click', function (e) {
    //     e.preventDefault();
    //     $('.modal-sms').trigger('open.modal')
    // })
    //выбор города
    $('.header__current-location').on('click', function (e) {
        e.preventDefault();
        $('.modal-city').trigger('open.modal')
    });
    //сообщить о поступлении
    $('.product-cart__not-aviability').on('click', function (e) {
        e.preventDefault();
        $('.modal-admission').trigger('open.modal')
    })
    $('.modal-city__item').on('click', function (e) {
        e.preventDefault();
        $(this).closest('.modal-city__items').find('.modal-city__item').removeClass('modal-city__item--active');
        $(this).addClass('modal-city__item--active');
        setTimeout(function () {
            $('.modal-city').trigger('close.modal');
        }, 2000)
    })

    if ($('*').is('#mapDelivery')) {
        ymaps.ready(init);

        function init() {
            var mapDelivery = new ymaps.Map('mapDelivery', {
                center: [55.801648, 37.632351],
                zoom: 9,

                // 55.801648, 37.632351
                controls: ['geolocationControl', 'searchControl']
            }),
                deliveryPoint = new ymaps.GeoObject({
                    geometry: { type: 'Point' },
                    properties: { iconCaption: 'Адрес' }
                }, {
                    preset: 'islands#blackDotIconWithCaption',
                    draggable: true,
                    iconCaptionMaxWidth: '215'
                }),
                searchControl = mapDelivery.controls.get('searchControl');
            searchControl.options.set({ noPlacemark: true, placeholderContent: 'Введите адрес доставки' });
            mapDelivery.geoObjects.add(deliveryPoint);

            function onZonesLoad(json) {
                // Добавляем зоны на карту.
                var deliveryZones = ymaps.geoQuery(json).addToMap(mapDelivery);
                // Задаём цвет и контент балунов полигонов.
                deliveryZones.each(function (obj) {
                    obj.options.set({
                        fillColor: obj.properties.get('fill'),
                        fillOpacity: obj.properties.get('fill-opacity'),
                        strokeColor: obj.properties.get('stroke'),
                        strokeWidth: obj.properties.get('stroke-width'),
                        strokeOpacity: obj.properties.get('stroke-opacity')
                    });
                    obj.properties.set('balloonContent', obj.properties.get('description'));
                });

                // Проверим попадание результата поиска в одну из зон доставки.
                searchControl.events.add('resultshow', function (e) {
                    highlightResult(searchControl.getResultsArray()[e.get('index')]);
                });

                // Проверим попадание метки геолокации в одну из зон доставки.
                mapDelivery.controls.get('geolocationControl').events.add('locationchange', function (e) {
                    highlightResult(e.get('geoObjects').get(0));
                });

                // При перемещении метки сбрасываем подпись, содержимое балуна и перекрашиваем метку.
                deliveryPoint.events.add('dragstart', function () {
                    deliveryPoint.properties.set({ iconCaption: '', balloonContent: '' });
                    deliveryPoint.options.set('iconColor', 'black');
                });

                // По окончании перемещения метки вызываем функцию выделения зоны доставки.
                deliveryPoint.events.add('dragend', function () {
                    highlightResult(deliveryPoint);
                });

                function highlightResult(obj) {
                    // Сохраняем координаты переданного объекта.
                    var coords = obj.geometry.getCoordinates(),
                        // Находим полигон, в который входят переданные координаты.
                        polygon = deliveryZones.searchContaining(coords).get(0);

                    if (polygon) {
                        // Уменьшаем прозрачность всех полигонов, кроме того, в который входят переданные координаты.
                        deliveryZones.setOptions('fillOpacity', 0.4);
                        polygon.options.set('fillOpacity', 0.8);
                        // Перемещаем метку с подписью в переданные координаты и перекрашиваем её в цвет полигона.
                        deliveryPoint.geometry.setCoordinates(coords);
                        deliveryPoint.options.set('iconColor', polygon.properties.get('fill'));
                        // Задаем подпись для метки.
                        if (typeof (obj.getThoroughfare) === 'function') {
                            setData(obj);
                        } else {
                            // Если вы не хотите, чтобы при каждом перемещении метки отправлялся запрос к геокодеру,
                            // закомментируйте код ниже.
                            ymaps.geocode(coords, { results: 1 }).then(function (res) {
                                var obj = res.geoObjects.get(0);
                                setData(obj);
                            });
                        }
                    } else {
                        // Если переданные координаты не попадают в полигон, то задаём стандартную прозрачность полигонов.
                        deliveryZones.setOptions('fillOpacity', 0.4);
                        // Перемещаем метку по переданным координатам.
                        deliveryPoint.geometry.setCoordinates(coords);
                        // Задаём контент балуна и метки.
                        deliveryPoint.properties.set({
                            iconCaption: 'Доставка транспортной компанией',
                            balloonContent: 'Cвяжитесь с оператором',
                            balloonContentHeader: ''
                        });
                        // Перекрашиваем метку в чёрный цвет.
                        deliveryPoint.options.set('iconColor', 'black');
                    }

                    function setData(obj) {
                        var address = [obj.getThoroughfare(), obj.getPremiseNumber(), obj.getPremise()].join(' ');
                        if (address.trim() === '') {
                            address = obj.getAddressLine();
                        }
                        var price = polygon.properties.get('description');
                        price = price.match(/<strong>(.+)<\/strong>/)[1];
                        deliveryPoint.properties.set({
                            iconCaption: address,
                            balloonContent: address,
                            balloonContentHeader: price
                        });
                    }
                }
            }

            $.ajax({
                url: 'data.geojson.json',
                dataType: 'json',
                success: onZonesLoad
            });
        }
    }

    if ($('*').is('#contactsMap1')) {
        setTimeout(function () {
            ymaps.ready(function () {
                var myMap = new ymaps.Map('contactsMap1', {
                    center: [55.863980, 37.483849],
                    zoom: 12
                }, {
                    searchControlProvider: 'yandex#search'
                }),
                    myPlacemark = new ymaps.Placemark([55.863980, 37.483849], {
                    }, {
                        iconLayout: 'default#image',
                        iconImageHref: './assets/images/map-loc.png',
                        iconImageSize: [66, 66],
                        iconImageOffset: [-15, 25]
                    })
                myMap.geoObjects
                    .add(myPlacemark)
            });
        }, 1000);
    }
    if ($('*').is('#contactsMap2')) {
        setTimeout(function () {
            ymaps.ready(function () {
                var myMap = new ymaps.Map('contactsMap2', {
                    center: [59.926034, 30.326046],
                    zoom: 12
                }, {
                    searchControlProvider: 'yandex#search'
                }),
                    myPlacemark = new ymaps.Placemark([59.926034, 30.326046], {
                    }, {
                        iconLayout: 'default#image',
                        iconImageHref: './assets/images/map-loc.png',
                        iconImageSize: [66, 66],
                        iconImageOffset: [-15, 25]
                    })
                myMap.geoObjects
                    .add(myPlacemark)
            });
        }, 1000);
    }
    if ($('*').is('#contactsMap3')) {
        setTimeout(function () {
            ymaps.ready(function () {
                var myMap = new ymaps.Map('contactsMap3', {
                    center: [51.695322, 39.271622],
                    zoom: 12
                }, {
                    searchControlProvider: 'yandex#search'
                }),
                    myPlacemark = new ymaps.Placemark([51.695322, 39.271622], {
                    }, {
                        iconLayout: 'default#image',
                        iconImageHref: './assets/images/map-loc.png',
                        iconImageSize: [66, 66],
                        iconImageOffset: [-15, 25]
                    })
                myMap.geoObjects
                    .add(myPlacemark)
            });
        }, 1000);
    }
    if ($('*').is('#contactsMap4')) {
        setTimeout(function () {
            ymaps.ready(function () {
                var myMap = new ymaps.Map('contactsMap4', {
                    center: [47.201027, 39.686204],
                    zoom: 12
                }, {
                    searchControlProvider: 'yandex#search'
                }),
                    myPlacemark = new ymaps.Placemark([47.201027, 39.686204], {
                    }, {
                        iconLayout: 'default#image',
                        iconImageHref: './assets/images/map-loc.png',
                        iconImageSize: [66, 66],
                        iconImageOffset: [-15, 25]
                    })
                myMap.geoObjects
                    .add(myPlacemark)
            });
        }, 1000);
    };
    $('.contacts-nav').on('click', 'a', function (e) {
        e.preventDefault();
        let container = $(this).closest('.contacts');
        let navId = $(this).attr('data-id');
        container.find('.catalog-header-nav__item').removeClass('catalog-header-nav__item--active');
        $(this).addClass('catalog-header-nav__item--active');
        container.find('.contacts__tab').addClass('contacts__tab--hidden');
        container.find('.contacts__tab').each(function () {
            let tabId = $(this).attr('data-id');
            if (tabId == navId) {
                $(this).removeClass('contacts__tab--hidden')
            }
        })
    })

    //имитация клика в поиске 
    $('.search-input__link:not(.filter-search-variable-button)').on('click', function (e) {
        e.preventDefault();
        let container = $(this).closest('.custom-input__search');
        container.find('.search-input__submit').click();
    })
    //моблильное меню
    $('.header__burger').on('click', function (e) {
        e.preventDefault();
        $('.header__mobile').slideToggle();
        $('.header .dropdown').hide();
        $(this).toggleClass('header__burger--active');
    })
    $('.dropdown__button').on('click', function (e) {
        e.preventDefault();
        let container = $(this).closest('.header__nav-item-group');
        let mainContainer = $(this).closest('.header');
        mainContainer.find('.dropdown__categories').hide();
        container.toggleClass('header__nav-item-group--active');
        container.find('.dropdown-mobile').slideToggle();
    });
    $('.dropdown__category-button').on('click', function (e) {
        e.preventDefault();
        let container = $(this).closest('.dropdown');
        // container.find('.dropdown__item-parent').removeClass('dropdown__item-parent--active');
        // container.find('.dropdown__categories').hide();
        $(this).closest('.dropdown__item-parent').toggleClass('dropdown__item-parent--active');
        $(this).closest('.dropdown__item-parent').find('.dropdown__categories').slideToggle();
    })
    $('.dropdown__button-sub').on('click', function (e) {
        e.preventDefault();
        let container = $(this).closest('.header__nav-item-group');
        container.toggleClass('header__nav-item-group--active');
        container.find('.dropdown').slideToggle();
    })
    $('.footer-nav-group-arrow').on('click', function (e) {
        e.preventDefault();
        $(this).closest('.footer__nav-group ').toggleClass('footer__nav-group--active');
    })

    //мобильный фильтр
    $('.catalog-filter-button').on('click', function (e) {
        e.preventDefault();
        let container = $(this).closest('.catalog-container');
        let filter = container.find('.catalog-filter');
        filter.fadeIn();
    })

    $('.catalog-close').on('click', function (e) {
        e.preventDefault();
        let container = $(this).closest('.catalog-filter');
        container.fadeOut()
    })

    //корзина

    // $('.product-preview-cart__remove').on('click', function (e) {
    //     e.preventDefault();
    //     $(this).closest('.product-preview-cart').remove();
    // });
    // $('.cart__control-link--remove').on('click', function (e) {
    //     e.preventDefault();
    //     let container = $(this).closest('.cart__inner');
    //     container.find('.cart__products .product-preview-cart').remove()
    // });

    //показать еще главное меню
    $('.dropdown__show-more-items').on('click', function (e) {
        e.preventDefault();
        let container = $(this).closest('.dropdown__category');
        if ($(this).hasClass('dropdown__show-more-item--active')) {
            $(this).removeClass('dropdown__show-more-item--active');
        } else {
            $(this).addClass('dropdown__show-more-item--active')
        }
        container.find('.hidden-items').slideToggle()
    })

    //слайдер страница печати
    var swiper = new Swiper(".mySwiper", {
        loop: false,
        spaceBetween: 15,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true,
    });
    var swiper2 = new Swiper(".mySwiper2", {
        loop: false,
        spaceBetween: 0,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        thumbs: {
            swiper: swiper,
        },
    });

    var swiper3 = new Swiper(".mySwiper3", {
        loop: false,
        spaceBetween: 15,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true,
    });
    var swiper4 = new Swiper(".mySwiper4", {
        loop: false,
        spaceBetween: 0,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        thumbs: {
            swiper: swiper3,
        },
    });

    //фильтр по отраслям, показать еще
    if (location.hostname == 'gofrofront.0vds.ru') {
        $('.catalog__filter-show-more').on('click', function (e) {
            e.preventDefault();
            let container = $(this).closest('.catalog-filter');
            let items = $('.template-block').html();
            if ($(this).hasClass('catalog__filter-show-more--opened')) {
                $(this).removeClass('catalog__filter-show-more--opened')
                $(this).text('Еще категории')
                container.find('.hidden-filter-items').slideToggle()
                setTimeout(function () {
                    container.find('.hidden-filter-items').remove()
                }, 300)
            } else {
                $(this).addClass('catalog__filter-show-more--opened');
                $(this).text('Свернуть')
                container.find('.catalog__filter-show-more').before(items);
                container.find('.hidden-filter-items').slideToggle()
            }
        });
    }

})