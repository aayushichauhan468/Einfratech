jQuery(function ($) {

    $('.popup-link').on('click', function () {
        $.ajax({
            url: wp_nuvolo.ajaxurl,
            type: 'POST',
            data: {
                action: 'marketo_data_update',
                post_id: $(this).attr('data-id'),
            },
            beforeSend: function () {
                $('.popup').removeClass('show');
                $('#access-popup .info ul').remove();
            },
            success: function (data) {
                $('#access-popup .info').css('background-image', 'url("' + data.access_popup.image.url + '")');
                $('#access-popup .info h2').html(data.access_popup.title);
                $('#access-popup .info').append(data.access_popup.list);
                $('#access-popup .info p').html(data.access_popup.description);
                $('.popup').addClass('show');
            }
        });
    });

    $('.resource-library-filter select').change(function () {
        const $this = $('.category-select-filter');
        const $this_data = $this.find(':selected').data('cat');
        $this.attr('name', $this_data);
        $this.parents('.main-for-filter').submit();
    })

    function setURLParameter(url, parameter, value) {
        let urls = new URL(url);

        urls.searchParams.set(parameter, value); // setting your param
        let newUrl = urls.href;

        return newUrl;
    }

    $(document).on("click",".industry-link-url", function (e) {
        e.preventDefault();
        // let href = window.location.href;
        let href = $(this).attr('href');

        let data = $(this).data('term');
        location.href = setURLParameter(href, 'industry', data);
    });
    $(document).on("click",".post-type-link-url", function (e) {
        e.preventDefault();
        let prot = location.protocol;
        let href_serv = window.location.hostname;
        let href_path = window.location.pathname;
        // let href = prot + href_serv + href_path;
        let href = $(this).attr('href');

        let data = $(this).data('type');
        let dataN = $(this).data('name');

        location.href = setURLParameter(href, dataN, data);
    });
    $('.webinar-link').on('click', function () {
        $('#register-form .info').css('background-image', 'url("' + $(this).attr('data-popup-image') + '")');
        $('#register-form .info h2').html($(this).attr('data-popup-title'));
        $('#register-form .info ul').html($(this).attr('data-popup-description'));
    });
    let $resource_library = $('.resource-library-list');
    let $resource_max_page = $resource_library.data('paged');
    if ($resource_library.length) {
        let $i = 4;
        let $show = true;
        const params = new URLSearchParams(window.location.search);
        const cat_info = params.get('cat');
        const cat_info2 = params.get('category');
        const cat_info3 = params.get('video-category');
        const story_cat = params.get('story');
        const industry_info = params.get('industry');
        const postType_info = params.get('post-type');
        const solution_info = params.get('solution');
        const post_tp = $resource_library.data('pt');

        $(window).scroll(function () {

            if ($(window).scrollTop() >= 320) {
                $('.resource-library  .filters').addClass('fixed-top');

            } else {
                $('.resource-library  .filters').removeClass('fixed-top');
            }


            if (($(window).scrollTop() >= $resource_library.offset().top + $resource_library.outerHeight() - window.innerHeight) && $show && ($resource_max_page > $i)) {
                $show = false;
                $i++;

                $.ajax({
                    url: wp_nuvolo.ajaxurl,
                    type: 'GET',
                    data: {
                        action: 'resource_library_update',
                        paged: $i,
                        cat: cat_info2,
                        cat_video: cat_info3,
                        industry: industry_info,
                        postType: postType_info,
                        solution: solution_info,
                        story: story_cat,
                        post_tp: post_tp,
                    },
                    beforeSend: function () {
                        $('.load-more').show();
                    },
                    success: function (data) {

                        $resource_library.append(data);
                        $show = true;
                        $('.load-more').hide();
                    }
                });

            }

        });
    }
    $('.term-industry li').click(function () {
        var eid = $(this).attr("data-value");
        var $frm = $('.term-industry-form');
        //set the value of the hidden element
        $frm.find('input[name="industry"]').val(eid);
        //submit the form
        $frm.submit();
    });

});