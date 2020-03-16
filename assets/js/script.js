$(function() {

  // for IE & Edge

  var userAgent = window.navigator.userAgent.toLowerCase();
  if ( userAgent.indexOf( 'msie' ) !== -1 || userAgent.indexOf( 'trident' ) !== -1 ) {
    $("body").addClass("ie");
  } else if (userAgent.indexOf( 'edge' ) !== -1) {
    $("body").addClass("edge");
  }


  // enlarging on wide window

  enlargeView();

  $(window).on('resize', function() {
    enlargeView();
  });

  function enlargeView() {
    if ($(window).width() > 1150) {
      document.body.style.zoom = 1.1;
    } else {
      document.body.style.zoom = 1;
    }
  }


  // showing web fonts after loading

  var counter = 0;

  var showWebFonts = setInterval(findWebFonts, 10);

  function findWebFonts() {
    counter++;

    if ($('html').hasClass("wf-active") || counter > 100) {
      $('.wf').css({
        visibility: "visible"
      });
      $('#overlay_wipe_in').addClass('overlay_wipe_in');
      clearInterval(showWebFonts);
    }
  }


  // 句読点の余白

  if ($('p.content').length) {
    console.log('true');
    var html = $('p.content').html();
    html = html.replace(/。/g, '<span class="period">。</span>');
    html = html.replace(/、/g, '<span class="comma">、</span>');
    html = html.replace(/――/g, '<span class="dash">──</span>');
    // html = html.replace(/英単語/g, '<span class="en">英単語</span>'); をやりたかったがタグを避けれなかった
    $('p.content').html(html);
  }


  // 「もどる」をヒストリバックに

  $('a.history-back').on('click', function() {
    history.back();
  });


  // メールアドレスのクローラ避け

  if ($('#mail-adress')) {
    var new_address = $('#mail-adress').text().replace("[-]", "@");
    $('#mail-adress').text(new_address);
    $('#mail-adress').attr('href', "mailto:" + new_address);
  }


  // モバイルのアドレスバー対策

  var vh = window.innerHeight * 0.01;
  if (window.innerWidth > window.innerHeight) {
    vh = window.innerWidth * 0.01;
  }
  document.documentElement.style.setProperty('--vh', vh + 'px');


  // ルートディレクトリで h1 を押したときにここがルートやをやる

  $('h1#root_h1').on('click', function() {
    $('section').addClass('here_is_root');
    setTimeout(function() {
      $('section').removeClass('here_is_root');
    }, 800);
  });
});
